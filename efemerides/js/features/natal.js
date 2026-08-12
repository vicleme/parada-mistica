// ============================================================================
// features/natal.js
// Formulário de dados de nascimento (com persistência em localStorage e
// import/export JSON), busca de cidade (Nominatim/OpenStreetMap), e o cálculo
// + renderização do mapa natal em si. Expõe natalChart, lido (nunca alterado)
// por outras features que precisam da posição natal (trânsitos, sinastria
// reaproveita seu próprio estado — synChartA/B — mas o mesmo formato).
// ============================================================================

import { toJD, dateToJD_UT } from '../core/time.js';
import { computeDayPositions } from '../core/ephemeris.js';
import { ascMC, wholeSignCusps, equalCusps, placidusCusps, obliquity, houseOf, degMinStr, signOf } from '../core/houses.js';
import { angleLon } from '../core/aspects.js';
import { TRANSIT_BODIES, PLANET_GLYPH, PLANET_LABEL, SIGN_GLYPH, SIGNS } from '../core/constants.js';

export function collectNatalInput(){
  return {
    nome: document.getElementById('natalName').value || null,
    sigla: document.getElementById('natalSigla').value || null,
    cidade: document.getElementById('citySearch').value || null,
    data_nascimento: document.getElementById('natalDate').value || null,
    hora_nascimento: document.getElementById('natalTime').value || null,
    fuso_horario: document.getElementById('natalTz').value !== '' ? parseFloat(document.getElementById('natalTz').value) : null,
    latitude: document.getElementById('natalLat').value !== '' ? parseFloat(document.getElementById('natalLat').value) : null,
    longitude: document.getElementById('natalLon').value !== '' ? parseFloat(document.getElementById('natalLon').value) : null,
    sistema_casas: document.getElementById('houseSystem').value
  };
}

// ---------- persistência local (localStorage) ----------
export const NATAL_STORAGE_KEY = 'efemeride_natal_dados_v1';
export function saveNatalToStorage(){
  try{ localStorage.setItem(NATAL_STORAGE_KEY, JSON.stringify(collectNatalInput())); }
  catch(e){ /* localStorage indisponível (aba anônima, etc.) — segue sem salvar */ }
}
export function loadNatalFromStorage(){
  try{
    const raw = localStorage.getItem(NATAL_STORAGE_KEY);
    if(!raw) return false;
    applyNatalInput(JSON.parse(raw));
    return true;
  }catch(e){ return false; }
}
export function clearNatalStorage(){
  try{ localStorage.removeItem(NATAL_STORAGE_KEY); }catch(e){}
  setNatalMsg('Dados salvos neste navegador foram apagados. Os campos acima continuam preenchidos até você recarregar a página.', '');
}
export function exportNatalInput(){
  const data = collectNatalInput();
  const text = JSON.stringify(data, null, 2);
  const blob = new Blob([text], {type:'application/json'});
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'mapa-natal-dados.json';
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}
export function toggleImportBox(){
  const box = document.getElementById('importBox');
  box.style.display = (box.style.display==='none' || !box.style.display) ? 'block' : 'none';
}
export function applyNatalInput(data){
  if(data.nome) document.getElementById('natalName').value = data.nome;
  if(data.sigla) document.getElementById('natalSigla').value = data.sigla;
  document.getElementById('citySearch').value = data.cidade || '';
  if(data.data_nascimento) document.getElementById('natalDate').value = data.data_nascimento;
  if(data.hora_nascimento) document.getElementById('natalTime').value = data.hora_nascimento;
  if(data.fuso_horario!==null && data.fuso_horario!==undefined) document.getElementById('natalTz').value = data.fuso_horario;
  if(data.latitude!==null && data.latitude!==undefined) document.getElementById('natalLat').value = data.latitude;
  if(data.longitude!==null && data.longitude!==undefined) document.getElementById('natalLon').value = data.longitude;
  if(data.sistema_casas) document.getElementById('houseSystem').value = data.sistema_casas;
}
export function importNatalInput(){
  const statusEl = document.getElementById('importStatus');
  const fileInput = document.getElementById('importJsonFile');
  const textVal = document.getElementById('importJsonText').value.trim();
  function handleText(txt){
    try{
      const data = JSON.parse(txt);
      applyNatalInput(data);
      statusEl.textContent = 'Dados carregados. Clique em "Calcular mapa natal" para atualizar.';
    }catch(e){
      statusEl.textContent = 'JSON inválido: '+e.message;
    }
  }
  if(fileInput.files && fileInput.files[0]){
    const reader = new FileReader();
    reader.onload = ()=>handleText(reader.result);
    reader.onerror = ()=>{ statusEl.textContent='Não foi possível ler o arquivo.'; };
    reader.readAsText(fileInput.files[0]);
  } else if(textVal){
    handleText(textVal);
  } else {
    statusEl.textContent = 'Cole um JSON ou selecione um arquivo primeiro.';
  }
}

// ---------- preencher data/hora atuais (trânsito de data única) ----------
export function fillNow(){
  const now = new Date();
  const y = now.getFullYear();
  const mo = String(now.getMonth()+1).padStart(2,'0');
  const d = String(now.getDate()).padStart(2,'0');
  const hh = String(now.getHours()).padStart(2,'0');
  const mm = String(now.getMinutes()).padStart(2,'0');
  document.getElementById('singleDate').value = y+'-'+mo+'-'+d;
  document.getElementById('singleTime').value = hh+':'+mm;
  document.getElementById('singleTz').value = -now.getTimezoneOffset()/60;
}

export function toDateInputValue(dt){
  return dt.getFullYear()+'-'+String(dt.getMonth()+1).padStart(2,'0')+'-'+String(dt.getDate()).padStart(2,'0');
}
export function fillPreset(kind){
  const now = new Date();
  let start, end;
  if(kind==='hoje'){
    start = new Date(now.getFullYear(),now.getMonth(),now.getDate());
    end = start;
  } else if(kind==='semana'){
    // semana domingo a sábado
    const dow = now.getDay(); // 0=domingo..6=sábado
    start = new Date(now.getFullYear(),now.getMonth(),now.getDate()-dow);
    end = new Date(start.getFullYear(),start.getMonth(),start.getDate()+6);
  } else if(kind==='mes'){
    start = new Date(now.getFullYear(),now.getMonth(),1);
    end = new Date(now.getFullYear(),now.getMonth()+1,0);
  } else if(kind==='semestre'){
    const semStartMonth = now.getMonth()<6 ? 0 : 6;
    start = new Date(now.getFullYear(),semStartMonth,1);
    end = new Date(now.getFullYear(),semStartMonth+6,0);
  } else if(kind==='ano'){
    start = new Date(now.getFullYear(),0,1);
    end = new Date(now.getFullYear(),11,31);
  } else return;

  setMode('range');
  document.getElementById('rangeStart').value = toDateInputValue(start);
  document.getElementById('rangeEnd').value = toDateInputValue(end);
  updateRangeWarn();
}

export function updateRangeWarn(){
  const warnEl = document.getElementById('rangeWarn');
  const s = document.getElementById('rangeStart').value;
  const en = document.getElementById('rangeEnd').value;
  const step = Math.max(1, parseInt(document.getElementById('rangeStep').value)||1);
  if(!s || !en){ warnEl.textContent=''; return; }
  const [sy,smo,sd] = s.split('-').map(Number);
  const [ey,emo,ed] = en.split('-').map(Number);
  const jdStart = toJD(sy,smo,sd,12), jdEnd = toJD(ey,emo,ed,12);
  if(jdEnd<jdStart){ warnEl.textContent=''; return; }
  const spanDays = jdEnd-jdStart;
  const numDates = Math.floor(spanDays/step)+1;
  if(numDates>700){
    const suggested = Math.max(step+1, Math.ceil(spanDays/400));
    warnEl.innerHTML = '<span style="color:var(--gold-dim);">Intervalo grande:</span> '+numDates+' datas com o passo atual — pode demorar alguns segundos. Um passo de '+suggested+' dias (em vez de '+step+') fica bem mais rápido e raramente perde eventos, já que a tabela mostra o início e o fim de cada janela, não só o dia exato.';
  } else {
    warnEl.textContent='';
  }
}

// ---------- busca de cidade (geocodificação) ----------
let _cityResults = [];
export async function searchCity(){
  const q = document.getElementById('citySearch').value.trim();
  const resultsEl = document.getElementById('cityResults');
  if(!q){ resultsEl.innerHTML=''; return; }
  resultsEl.innerHTML = '<div class="hint" style="padding:6px 2px;">Buscando…</div>';
  try{
    const resp = await fetch('https://nominatim.openstreetmap.org/search?format=json&addressdetails=0&limit=6&q='+encodeURIComponent(q));
    if(!resp.ok) throw new Error('resposta '+resp.status);
    const data = await resp.json();
    _cityResults = data;
    if(!data.length){ resultsEl.innerHTML = '<div class="hint" style="padding:6px 2px;">Nenhum resultado. Tente incluir estado/país ou preencha manualmente.</div>'; return; }
    resultsEl.innerHTML = data.map((d,idx)=>'<div class="cityOption" onclick="pickCity('+idx+')">'+d.display_name+'</div>').join('');
  }catch(e){
    resultsEl.innerHTML = '<div class="hint" style="padding:6px 2px;">Não foi possível buscar agora (sem conexão ou serviço indisponível). Preencha lat/long manualmente.</div>';
  }
}
export function pickCity(idx){
  const d = _cityResults[idx];
  if(!d) return;
  document.getElementById('natalLat').value = parseFloat(d.lat).toFixed(4);
  document.getElementById('natalLon').value = parseFloat(d.lon).toFixed(4);
  document.getElementById('citySearch').value = d.display_name;
  document.getElementById('cityResults').innerHTML = '<div class="hint" style="padding:6px 2px;">Selecionado: '+d.display_name+'. Confirme o fuso horário no campo abaixo (atenção ao horário de verão vigente na data, se houver).</div>';
}

// ---------- state ----------
// Estado do mapa natal calculado (compartilhado com features/transits.js, que só
// lê este valor — nunca o reatribui). transitData (estado da aba Trânsitos) mora
// em features/transits.js.
export let natalChart = null; // {positions:{}, cusps:[], asc, mc, hasHouses:bool}

export function setMode(m){
  document.getElementById('modeSingleBtn').classList.toggle('active', m==='single');
  document.getElementById('modeRangeBtn').classList.toggle('active', m==='range');
  document.getElementById('singleFields').style.display = m==='single' ? '' : 'none';
  document.getElementById('rangeFields').style.display = m==='range' ? '' : 'none';
}

export function readDateParts(dateStr, timeStr, defaultHour){
  if(!dateStr) return null;
  const [y,mo,d] = dateStr.split('-').map(Number);
  let hour = defaultHour;
  if(timeStr){ const [hh,mm]=timeStr.split(':').map(Number); hour = hh + mm/60; }
  return {y,mo,d,hour};
}

export function setNatalMsg(msg, level){
  const el = document.getElementById('natalMsg');
  el.textContent = msg;
  el.style.color = level==='error' ? 'var(--rose)' : level==='warn' ? 'var(--gold-dim)' : '';
}
export function setTransitStatus(msg, isError){
  const el = document.getElementById('transitStatus');
  el.textContent = msg;
  el.style.color = isError ? 'var(--rose)' : '';
}

export function calcNatal(){
  setNatalMsg('', '');
  const dp = readDateParts(document.getElementById('natalDate').value, document.getElementById('natalTime').value, 12);
  if(!dp){ setNatalMsg('Informe ao menos a data de nascimento.', 'error'); return; }
  const tz = parseFloat(document.getElementById('natalTz').value)||0;
  const lat = parseFloat(document.getElementById('natalLat').value);
  const lon = parseFloat(document.getElementById('natalLon').value);
  const hasTime = !!document.getElementById('natalTime').value;
  const hasLoc = !isNaN(lat) && !isNaN(lon);

  const jd = dateToJD_UT(dp.y,dp.mo,dp.d,dp.hour,tz);
  const T = (jd-2451545.0)/36525;
  const positions = computeDayPositions(T);

  let cusps=null, asc=null, mc=null, hasHouses=false;
  if(hasTime && hasLoc){
    const r = ascMC(jd,T,lat,lon);
    asc=r.asc; mc=r.mc;
    const sys = document.getElementById('houseSystem').value;
    if(sys==='whole') cusps = wholeSignCusps(asc);
    else if(sys==='placidus'){
      cusps = placidusCusps(asc,mc,r.ramc,lat,obliquity(T));
      if(!cusps){
        setNatalMsg('Placidus não pôde ser calculado nessa latitude (muito próxima dos polos). Usando Casas Iguais como alternativa.', 'warn');
        cusps = equalCusps(asc);
      }
    } else {
      cusps = equalCusps(asc);
    }
    hasHouses = true;
  }

  natalChart = {positions, cusps, asc, mc, hasHouses, jd, T};
  renderNatal();
  saveNatalToStorage();
}

export function renderNatal(){
  const el = document.getElementById('natalOutput');
  if(!natalChart){ el.innerHTML='<div class="empty">Calcule o mapa natal.</div>'; return; }
  let rows='';
  TRANSIT_BODIES.forEach(name=>{
    const lon = natalChart.positions[name];
    const sIdx = signOf(lon);
    const house = natalChart.hasHouses ? houseOf(lon,natalChart.cusps) : '—';
    rows += '<tr><td><span class="glyph natal">'+PLANET_GLYPH[name]+'</span>'+PLANET_LABEL[name]+'</td><td>'+SIGN_GLYPH[sIdx]+' '+SIGNS[sIdx]+'</td><td>'+degMinStr(lon%30)+'</td><td>'+(house!=='—'?('Casa '+house):'—')+'</td></tr>';
  });
  if(natalChart.hasHouses){
    const ascS=signOf(natalChart.asc), mcS=signOf(natalChart.mc);
    const dscLon=angleLon(natalChart,'DSC'), icLon=angleLon(natalChart,'IC'), fortLon=angleLon(natalChart,'Fortuna');
    const dscS=signOf(dscLon), icS=signOf(icLon), fortS=signOf(fortLon);
    rows += '<tr><td><span class="glyph natal">Asc</span>Ascendente</td><td>'+SIGN_GLYPH[ascS]+' '+SIGNS[ascS]+'</td><td>'+degMinStr(natalChart.asc%30)+'</td><td>Casa 1</td></tr>';
    rows += '<tr><td><span class="glyph natal">MC</span>Meio do Céu</td><td>'+SIGN_GLYPH[mcS]+' '+SIGNS[mcS]+'</td><td>'+degMinStr(natalChart.mc%30)+'</td><td>Casa 10*</td></tr>';
    rows += '<tr><td><span class="glyph natal">Dsc</span>Descendente</td><td>'+SIGN_GLYPH[dscS]+' '+SIGNS[dscS]+'</td><td>'+degMinStr(dscLon%30)+'</td><td>Casa 7</td></tr>';
    rows += '<tr><td><span class="glyph natal">IC</span>Fundo do Céu</td><td>'+SIGN_GLYPH[icS]+' '+SIGNS[icS]+'</td><td>'+degMinStr(icLon%30)+'</td><td>Casa 4*</td></tr>';
    rows += '<tr><td><span class="glyph natal">'+PLANET_GLYPH.Fortuna+'</span>Parte da Fortuna</td><td>'+SIGN_GLYPH[fortS]+' '+SIGNS[fortS]+'</td><td>'+degMinStr(fortLon%30)+'</td><td>Casa '+houseOf(fortLon,natalChart.cusps)+'</td></tr>';
  }
  let warn = natalChart.hasHouses ? '' : '<div class="hint" style="margin-bottom:10px;"><span class="badge-required">Sem hora/local completos:</span> Ascendente e Casas não foram calculados — apenas signo e grau dos planetas.</div>';
  el.innerHTML = warn + '<table id="natalSummary"><thead><tr><th>Ponto</th><th>Signo</th><th>Grau</th><th>Casa</th></tr></thead><tbody>'+rows+'</tbody></table>'
    + (natalChart.hasHouses ? '<div class="hint" style="margin-top:8px;">*MC nem sempre cai exatamente na cúspide da Casa 10 no sistema de Signos Inteiros — isso é esperado.</div>' : '');
}

