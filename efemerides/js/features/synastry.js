// ============================================================================
// features/synastry.js
// Sinastria (aba "Sinastria"): mapa de Pessoa A e Pessoa B, aspectos entre os
// dois mapas com o sistema de pesos dedicado (core/synastry-weights.js),
// filtros, exportação JSON/CSV, texto para IA e o texto no formato de
// exportação do Astro-seek para colar na Calculadora de Sinastria.
// ============================================================================

import { dateToJD_UT } from '../core/time.js';
import { computeDayPositions } from '../core/ephemeris.js';
import { ascMC, vertexLon, wholeSignCusps, equalCusps, placidusCusps, obliquity, houseOf, degMinStr, signOf } from '../core/houses.js';
import { ASPECTS, angleLon, orbFromAspect } from '../core/aspects.js';
import { impactScoreSynastry, ASPECT_GROUPS_SYN, aspectMatchesFilterSyn } from '../core/synastry-weights.js';
import {
  TRANSIT_BODIES, SYN_ANGLE_POINTS, PLANET_GLYPH, PLANET_LABEL, SIGN_GLYPH, SIGNS,
  SIGNS_EN, PLANET_EN, ASPECT_EN
} from '../core/constants.js';
import { impactBar } from '../ui/render-helpers.js';
import { downloadBlob } from '../shared/download.js';
import { readDateParts } from './natal.js';

let _synCityResults = {};
export async function searchCityFor(searchId, resultsId, latId, lonId, prefix){
  const q = document.getElementById(searchId).value.trim();
  const resultsEl = document.getElementById(resultsId);
  if(!q){ resultsEl.innerHTML=''; return; }
  resultsEl.innerHTML = '<div class="hint" style="padding:6px 2px;">Buscando…</div>';
  try{
    const resp = await fetch('https://nominatim.openstreetmap.org/search?format=json&addressdetails=0&limit=6&q='+encodeURIComponent(q));
    if(!resp.ok) throw new Error('resposta '+resp.status);
    const data = await resp.json();
    _synCityResults[prefix] = data;
    if(!data.length){ resultsEl.innerHTML = '<div class="hint" style="padding:6px 2px;">Nenhum resultado. Tente incluir estado/país ou preencha manualmente.</div>'; return; }
    resultsEl.innerHTML = data.map((d,idx)=>'<div class="cityOption" onclick="pickCityFor('+idx+',\''+prefix+'\',\''+latId+'\',\''+lonId+'\',\''+resultsId+'\')">'+d.display_name+'</div>').join('');
  }catch(e){
    resultsEl.innerHTML = '<div class="hint" style="padding:6px 2px;">Não foi possível buscar agora (sem conexão ou serviço indisponível). Preencha lat/long manualmente.</div>';
  }
}
export function pickCityFor(idx, prefix, latId, lonId, resultsId){
  const d = (_synCityResults[prefix]||[])[idx];
  if(!d) return;
  document.getElementById(latId).value = parseFloat(d.lat).toFixed(4);
  document.getElementById(lonId).value = parseFloat(d.lon).toFixed(4);
  document.getElementById(resultsId).innerHTML = '<div class="hint" style="padding:6px 2px;">Selecionado: '+d.display_name+'. Confirme o fuso horário no campo abaixo (atenção ao horário de verão vigente na data, se houver).</div>';
}

// ---------- state ----------
// synChartA/B são reaproveitados por features/double-transits.js e
// features/composite.js (mesmo formato de natalChart, com vertex além de asc/mc).
export let synChartA = null, synChartB = null;
export let synData = null; // {aspectRows}

export function synPointList(chart){
  const pts = TRANSIT_BODIES.slice();
  if(chart.hasHouses) pts.push(...SYN_ANGLE_POINTS);
  return pts;
}
export function synPointLon(chart, name){
  return angleLon(chart, name);
}

export function calcSynPerson(who){
  const p = 'syn'+who; // 'synA' ou 'synB'
  const msgEl = document.getElementById(p+'Msg');
  msgEl.textContent=''; msgEl.style.color='';
  const dp = readDateParts(document.getElementById(p+'Date').value, document.getElementById(p+'Time').value, 12);
  if(!dp){ msgEl.textContent='Informe ao menos a data de nascimento.'; msgEl.style.color='var(--rose)'; return; }
  const tz = parseFloat(document.getElementById(p+'Tz').value)||0;
  const lat = parseFloat(document.getElementById(p+'Lat').value);
  const lon = parseFloat(document.getElementById(p+'Lon').value);
  const hasTime = !!document.getElementById(p+'Time').value;
  const hasLoc = !isNaN(lat) && !isNaN(lon);

  const jd = dateToJD_UT(dp.y,dp.mo,dp.d,dp.hour,tz);
  const T = (jd-2451545.0)/36525;
  const positions = computeDayPositions(T);

  let cusps=null, asc=null, mc=null, hasHouses=false, vertex=null;
  if(hasTime && hasLoc){
    const r = ascMC(jd,T,lat,lon);
    asc=r.asc; mc=r.mc;
    vertex = vertexLon(jd,T,lat,lon);
    const sys = document.getElementById(p+'House').value;
    if(sys==='whole') cusps = wholeSignCusps(asc);
    else if(sys==='placidus'){
      cusps = placidusCusps(asc,mc,r.ramc,lat,obliquity(T));
      if(!cusps){
        msgEl.textContent = 'Placidus não pôde ser calculado nessa latitude (muito próxima dos polos). Usando Casas Iguais como alternativa.';
        msgEl.style.color='var(--gold-dim)';
        cusps = equalCusps(asc);
      }
    } else {
      cusps = equalCusps(asc);
    }
    hasHouses = true;
  }

  const chart = {positions, cusps, asc, mc, vertex, hasHouses, jd, T};
  if(who==='A') synChartA = chart; else synChartB = chart;
  renderSynPerson(who, chart);
  saveSynToStorage();
}

// ---------- persistência local da Sinastria (Pessoa A e B) ----------
export function collectSynInput(who){
  const p = 'syn'+who;
  return {
    nome: document.getElementById(p+'Name').value || null,
    sigla: document.getElementById(p+'Sigla').value || null,
    data_nascimento: document.getElementById(p+'Date').value || null,
    hora_nascimento: document.getElementById(p+'Time').value || null,
    fuso_horario: document.getElementById(p+'Tz').value !== '' ? parseFloat(document.getElementById(p+'Tz').value) : null,
    latitude: document.getElementById(p+'Lat').value !== '' ? parseFloat(document.getElementById(p+'Lat').value) : null,
    longitude: document.getElementById(p+'Lon').value !== '' ? parseFloat(document.getElementById(p+'Lon').value) : null,
    sistema_casas: document.getElementById(p+'House').value
  };
}
export const SYN_STORAGE_KEY = 'efemeride_sinastria_dados_v1';
export function saveSynToStorage(){
  try{ localStorage.setItem(SYN_STORAGE_KEY, JSON.stringify({pessoa_a: collectSynInput('A'), pessoa_b: collectSynInput('B')})); }
  catch(e){ /* localStorage indisponível — segue sem salvar */ }
}
export function applySynInput(who, data){
  if(!data) return;
  const p = 'syn'+who;
  if(data.nome) document.getElementById(p+'Name').value = data.nome;
  if(data.sigla) document.getElementById(p+'Sigla').value = data.sigla;
  if(data.data_nascimento) document.getElementById(p+'Date').value = data.data_nascimento;
  if(data.hora_nascimento) document.getElementById(p+'Time').value = data.hora_nascimento;
  if(data.fuso_horario!==null && data.fuso_horario!==undefined) document.getElementById(p+'Tz').value = data.fuso_horario;
  if(data.latitude!==null && data.latitude!==undefined) document.getElementById(p+'Lat').value = data.latitude;
  if(data.longitude!==null && data.longitude!==undefined) document.getElementById(p+'Lon').value = data.longitude;
  if(data.sistema_casas) document.getElementById(p+'House').value = data.sistema_casas;
}
export function loadSynFromStorage(){
  try{
    const raw = localStorage.getItem(SYN_STORAGE_KEY);
    if(!raw) return false;
    const data = JSON.parse(raw);
    applySynInput('A', data.pessoa_a);
    applySynInput('B', data.pessoa_b);
    return true;
  }catch(e){ return false; }
}
export function clearSynStorage(){
  try{ localStorage.removeItem(SYN_STORAGE_KEY); }catch(e){}
  const statusEl = document.getElementById('synStatus');
  statusEl.textContent = 'Dados salvos neste navegador foram apagados. Os campos acima continuam preenchidos até você recarregar a página.';
  statusEl.style.color = '';
}
export function exportSynInput(){
  const data = {pessoa_a: collectSynInput('A'), pessoa_b: collectSynInput('B')};
  downloadBlob(JSON.stringify(data, null, 2), 'sinastria-dados.json', 'application/json');
}
export function toggleSynImportBox(){
  const box = document.getElementById('synImportBox');
  box.style.display = (box.style.display==='none' || !box.style.display) ? 'block' : 'none';
}
export function importSynInput(){
  const statusEl = document.getElementById('synImportStatus');
  const fileInput = document.getElementById('synImportJsonFile');
  const textVal = document.getElementById('synImportJsonText').value.trim();
  function handleText(txt){
    try{
      const data = JSON.parse(txt);
      applySynInput('A', data.pessoa_a);
      applySynInput('B', data.pessoa_b);
      statusEl.textContent = 'Dados carregados. Clique em "Calcular mapa de A" e "Calcular mapa de B" para atualizar.';
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

export function renderSynPerson(who, chart){
  const el = document.getElementById('syn'+who+'Output');
  let rows='';
  TRANSIT_BODIES.forEach(name=>{
    const lon = chart.positions[name];
    const sIdx = signOf(lon);
    const house = chart.hasHouses ? houseOf(lon,chart.cusps) : '—';
    rows += '<tr><td><span class="glyph natal">'+PLANET_GLYPH[name]+'</span>'+PLANET_LABEL[name]+'</td><td>'+SIGN_GLYPH[sIdx]+' '+SIGNS[sIdx]+'</td><td>'+degMinStr(lon%30)+'</td><td>'+(house!=='—'?('Casa '+house):'—')+'</td></tr>';
  });
  if(chart.hasHouses){
    const ascS=signOf(chart.asc), mcS=signOf(chart.mc);
    const dscLon=angleLon(chart,'DSC'), icLon=angleLon(chart,'IC'), fortLon=angleLon(chart,'Fortuna');
    const dscS=signOf(dscLon), icS=signOf(icLon), fortS=signOf(fortLon);
    rows += '<tr><td><span class="glyph natal">Asc</span>Ascendente</td><td>'+SIGN_GLYPH[ascS]+' '+SIGNS[ascS]+'</td><td>'+degMinStr(chart.asc%30)+'</td><td>Casa 1</td></tr>';
    rows += '<tr><td><span class="glyph natal">MC</span>Meio do Céu</td><td>'+SIGN_GLYPH[mcS]+' '+SIGNS[mcS]+'</td><td>'+degMinStr(chart.mc%30)+'</td><td>Casa 10*</td></tr>';
    rows += '<tr><td><span class="glyph natal">Dsc</span>Descendente</td><td>'+SIGN_GLYPH[dscS]+' '+SIGNS[dscS]+'</td><td>'+degMinStr(dscLon%30)+'</td><td>Casa 7</td></tr>';
    rows += '<tr><td><span class="glyph natal">IC</span>Fundo do Céu</td><td>'+SIGN_GLYPH[icS]+' '+SIGNS[icS]+'</td><td>'+degMinStr(icLon%30)+'</td><td>Casa 4*</td></tr>';
    rows += '<tr><td><span class="glyph natal">'+PLANET_GLYPH.Fortuna+'</span>Parte da Fortuna</td><td>'+SIGN_GLYPH[fortS]+' '+SIGNS[fortS]+'</td><td>'+degMinStr(fortLon%30)+'</td><td>Casa '+houseOf(fortLon,chart.cusps)+'</td></tr>';
    const vtxLon=chart.vertex, vtxS=signOf(vtxLon);
    rows += '<tr><td><span class="glyph natal">'+PLANET_GLYPH.Vertice+'</span>Vértice</td><td>'+SIGN_GLYPH[vtxS]+' '+SIGNS[vtxS]+'</td><td>'+degMinStr(vtxLon%30)+'</td><td>Casa '+houseOf(vtxLon,chart.cusps)+'</td></tr>';
  }
  let warn = chart.hasHouses ? '' : '<div class="hint" style="margin-bottom:10px;"><span class="badge-required">Sem hora/local completos:</span> Ascendente e Casas não foram calculados — apenas signo e grau dos planetas.</div>';
  el.innerHTML = warn + '<table><thead><tr><th>Ponto</th><th>Signo</th><th>Grau</th><th>Casa</th></tr></thead><tbody>'+rows+'</tbody></table>'
    + (chart.hasHouses ? '<div class="hint" style="margin-top:8px;">*MC nem sempre cai exatamente na cúspide da Casa 10 no sistema de Signos Inteiros — isso é esperado.</div>' : '');
}

export function calcSynastry(){
  const statusEl = document.getElementById('synStatus');
  if(!synChartA || !synChartB){ statusEl.textContent='Calcule o mapa de A e o mapa de B primeiro.'; statusEl.style.color='var(--rose)'; return; }
  statusEl.textContent='Calculando...'; statusEl.style.color='';
  setTimeout(()=>{
    const ptsA = synPointList(synChartA);
    const ptsB = synPointList(synChartB);
    const rows = [];
    ptsA.forEach(aName=>{
      const aLon = synPointLon(synChartA, aName);
      ptsB.forEach(bName=>{
        const bLon = synPointLon(synChartB, bName);
        ASPECTS.forEach(asp=>{
          const orb = orbFromAspect(aLon,bLon,asp.angle);
          if(orb<=asp.orb){
            const score = impactScoreSynastry(asp,orb,aName,bName);
            rows.push({
              a:aName, b:bName, aspect:asp, orb, score,
              aSign: signOf(aLon), bSign: signOf(bLon),
              aInB: synChartB.hasHouses ? houseOf(aLon, synChartB.cusps) : null,
              bInA: synChartA.hasHouses ? houseOf(bLon, synChartA.cusps) : null
            });
          }
        });
      });
    });
    synData = {aspectRows: rows};
    renderSynResults();
    statusEl.textContent = rows.length+' aspecto(s) encontrado(s).';
  }, 30);
}

export function renderSynResults(){
  document.getElementById('synResultsPanel').style.display='';

  const fA=document.getElementById('synFA'), fB=document.getElementById('synFB'), fAspect=document.getElementById('synFAspect');
  fA.innerHTML='<option value="">Todos</option>'+synPointList(synChartA).map(n=>'<option value="'+n+'">'+PLANET_LABEL[n]+'</option>').join('');
  fB.innerHTML='<option value="">Todos</option>'+synPointList(synChartB).map(n=>'<option value="'+n+'">'+PLANET_LABEL[n]+'</option>').join('');
  fAspect.innerHTML='<option value="">Todos</option>'
    +'<optgroup label="Grupos">'+Object.keys(ASPECT_GROUPS_SYN).map(g=>'<option value="grupo:'+g+'">'+g+'</option>').join('')+'</optgroup>'
    +'<optgroup label="Aspectos individuais">'+ASPECTS.map(a=>'<option value="'+a.name+'">'+a.name+'</option>').join('')+'</optgroup>';

  [fA,fB,fAspect].forEach(f=>f.onchange=renderSynAspectsTable);
  document.getElementById('synFImpact').oninput=renderSynAspectsTable;

  renderSynAspectsTable();
}

export function getFilteredSynRows(){
  const fA=document.getElementById('synFA').value;
  const fB=document.getElementById('synFB').value;
  const fAspect=document.getElementById('synFAspect').value;
  const fImpact=parseInt(document.getElementById('synFImpact').value)||0;
  const showZeroed = document.getElementById('synShowZeroed').checked;
  let rows = synData.aspectRows.filter(r=>{
    if(fA && r.a!==fA) return false;
    if(fB && r.b!==fB) return false;
    if(!aspectMatchesFilterSyn(r.aspect.name,fAspect)) return false;
    if(r.score<fImpact) return false;
    if(!showZeroed && r.score===0) return false;
    return true;
  });
  rows.sort((a,b)=>b.score-a.score);
  return rows;
}

export function synRowHtml(r){
  const nameA = document.getElementById('synAName').value.trim() || 'A';
  const nameB = document.getElementById('synBName').value.trim() || 'B';
  return '<tr>'
    +'<td>'+impactBar(r.score)+' <span class="hint">'+r.score+'</span></td>'
    +'<td><span class="glyph">'+PLANET_GLYPH[r.a]+'</span>'+PLANET_LABEL[r.a]+' '+SIGN_GLYPH[r.aSign]+'</td>'
    +'<td>'+r.aspect.glyph+' '+r.aspect.name+'</td>'
    +'<td><span class="glyph natal">'+PLANET_GLYPH[r.b]+'</span>'+PLANET_LABEL[r.b]+' '+SIGN_GLYPH[r.bSign]+'</td>'
    +'<td>'+r.orb.toFixed(2)+'°</td>'
    +'<td>'+(r.aInB?('Casa '+r.aInB+' de '+nameB):'—')+'</td>'
    +'<td>'+(r.bInA?('Casa '+r.bInA+' de '+nameA):'—')+'</td>'
    +'</tr>';
}

export function renderSynAspectsTable(){
  const rows = getFilteredSynRows();
  document.getElementById('synResultCount').textContent = rows.length+' de '+synData.aspectRows.length+' aspecto(s) encontrado(s)';
  const table = document.getElementById('synAspectsTable');
  table.querySelector('thead').innerHTML = '<tr><th>Impacto</th><th>Ponto A</th><th>Aspecto</th><th>Ponto B</th><th>Orbe</th><th>A cai em (B)</th><th>B cai em (A)</th></tr>';
  table.querySelector('tbody').innerHTML = rows.map(synRowHtml).join('') || '<tr><td colspan="7" class="empty">Nenhum aspecto com os filtros atuais.</td></tr>';
}

export function synRowToPlainObject(r){
  return {
    ponto_a: PLANET_LABEL[r.a], signo_a: SIGNS[r.aSign],
    aspecto: r.aspect.name,
    ponto_b: PLANET_LABEL[r.b], signo_b: SIGNS[r.bSign],
    orbe_graus: Number(r.orb.toFixed(2)),
    casa_de_a_no_mapa_de_b: r.aInB || null,
    casa_de_b_no_mapa_de_a: r.bInA || null,
    impacto: r.score
  };
}

export function exportSynJson(){
  if(!synData){ return; }
  const nameA = document.getElementById('synAName').value.trim() || 'Pessoa A';
  const nameB = document.getElementById('synBName').value.trim() || 'Pessoa B';
  const rows = getFilteredSynRows();
  const data = {
    gerado_em: new Date().toISOString(),
    pessoa_a: nameA,
    mapa_a: synPointList(synChartA).map(name=>{
      const lon = synPointLon(synChartA,name);
      const house = synChartA.hasHouses ? houseOf(lon,synChartA.cusps) : null;
      return { ponto: PLANET_LABEL[name], signo: SIGNS[signOf(lon)], grau: degMinStr(lon%30), casa: house };
    }),
    pessoa_b: nameB,
    mapa_b: synPointList(synChartB).map(name=>{
      const lon = synPointLon(synChartB,name);
      const house = synChartB.hasHouses ? houseOf(lon,synChartB.cusps) : null;
      return { ponto: PLANET_LABEL[name], signo: SIGNS[signOf(lon)], grau: degMinStr(lon%30), casa: house };
    }),
    aspectos: rows.map(synRowToPlainObject)
  };
  downloadBlob(JSON.stringify(data, null, 2), 'sinastria-resultado.json', 'application/json');
}

export function exportSynCsv(){
  if(!synData){ return; }
  const rows = getFilteredSynRows();
  const header = ['Impacto','Ponto A','Signo A','Aspecto','Ponto B','Signo B','Orbe(°)','Casa de A em B','Casa de B em A'];
  const lines = [header.join(';')];
  function csvEscape(v){
    v = String(v==null?'':v);
    return /[;"\n]/.test(v) ? '"'+v.replace(/"/g,'""')+'"' : v;
  }
  rows.forEach(r=>{
    lines.push([
      r.score, PLANET_LABEL[r.a], SIGNS[r.aSign], r.aspect.name, PLANET_LABEL[r.b], SIGNS[r.bSign],
      r.orb.toFixed(2), r.aInB||'—', r.bInA||'—'
    ].map(csvEscape).join(';'));
  });
  downloadBlob('\uFEFF'+lines.join('\n'), 'sinastria-resultado.csv', 'text/csv;charset=utf-8');
}

export function copySynForAI(btn){
  if(!synData) return;
  const nameA = document.getElementById('synAName').value.trim() || 'Pessoa A';
  const nameB = document.getElementById('synBName').value.trim() || 'Pessoa B';

  let text = 'MAPA DE '+nameA.toUpperCase()+'\n';
  synPointList(synChartA).forEach(name=>{
    const lon = synPointLon(synChartA,name);
    const house = synChartA.hasHouses ? houseOf(lon,synChartA.cusps) : null;
    text += "- "+PLANET_LABEL[name]+": "+SIGNS[signOf(lon)]+" "+degMinStr(lon%30)+(house?(", Casa "+house):"")+"\n";
  });

  text += '\nMAPA DE '+nameB.toUpperCase()+'\n';
  synPointList(synChartB).forEach(name=>{
    const lon = synPointLon(synChartB,name);
    const house = synChartB.hasHouses ? houseOf(lon,synChartB.cusps) : null;
    text += "- "+PLANET_LABEL[name]+": "+SIGNS[signOf(lon)]+" "+degMinStr(lon%30)+(house?(", Casa "+house):"")+"\n";
  });

  const rows = getFilteredSynRows();
  text += '\nASPECTOS ENTRE OS DOIS MAPAS (ordenados por impacto, '+rows.length+' de '+synData.aspectRows.length+')\n';
  rows.forEach((r,idx)=>{
    let line = (idx+1)+'. '+PLANET_LABEL[r.a]+' de '+nameA+' ('+SIGNS[r.aSign]+') forma '+r.aspect.name.toLowerCase()+' (orbe '+r.orb.toFixed(2)+'°) com '+PLANET_LABEL[r.b]+' de '+nameB+' ('+SIGNS[r.bSign]+')';
    if(r.aInB) line += ' — '+PLANET_LABEL[r.a]+' de '+nameA+' cai na Casa '+r.aInB+' de '+nameB;
    if(r.bInA) line += (r.aInB?'; ':' — ')+PLANET_LABEL[r.b]+' de '+nameB+' cai na Casa '+r.bInA+' de '+nameA;
    line += '. [impacto '+r.score+'/100]';
    text += line+'\n';
  });

  text += '\nPor favor, interprete essa sinastria entre '+nameA+' e '+nameB+', considerando os aspectos acima ordenados por impacto e as casas em que os planetas de um caem no mapa do outro.';

  const box = document.getElementById('synCopyBox');
  box.textContent = text;
  box.style.display='block';
  const ta = document.getElementById('synCopyArea');
  ta.value = text;
  ta.select();
  try{
    navigator.clipboard.writeText(text);
  }catch(e){
    document.execCommand('copy');
  }
  if(btn){
    const original = btn.textContent;
    btn.textContent = 'Copiado ✓';
    btn.disabled = true;
    setTimeout(()=>{ btn.textContent = original; btn.disabled = false; }, 1600);
  }
}

// sufixo ordinal em inglês (1st, 2nd, 3rd, 4th... 11th, 12th) — exigido pelo formato de
// casas que a Calculadora de Sinastria espera ("in the 7th Nome's house")
export function ordinalSuffixEn(n){
  const rem100 = n % 100;
  if(rem100>=11 && rem100<=13) return 'th';
  switch(n%10){
    case 1: return 'st';
    case 2: return 'nd';
    case 3: return 'rd';
    default: return 'th';
  }
}

// Gera o texto no formato de exportação "AI-ChatGPT" do Astro-seek (o mesmo que a
// Calculadora de Sinastria já sabe ler colando manualmente ou via extensão), a partir dos
// dois mapas já calculados aqui. Isso evita o passo de ir até o Astro-seek: os aspectos e
// casas usados são os mesmos calculados nesta aba, só traduzidos pro vocabulário/sintaxe
// em inglês que o parser da Calculadora reconhece (ver ASPECT_EN/PLANET_EN/SIGNS_EN acima).
// Sigla de cada pessoa pro texto pra Calculadora de Sinastria — é ela quem vira o
// identificador antes do "'s" em cada linha (ex: "VL's Sun..."), igual ao Astro-seek e ao
// que a aba Dicionário da Calculadora já espera. Sem sigla preenchida, cai pro Nome.
export function synSigla(who){
  const sigla = document.getElementById('syn'+who+'Sigla').value.trim();
  if(sigla) return sigla;
  return document.getElementById('syn'+who+'Name').value.trim() || who;
}

export function copyForSinastriaCalc(btn){
  if(!synData){ return; }
  const nameA = document.getElementById('synAName').value.trim() || 'Pessoa A';
  const nameB = document.getElementById('synBName').value.trim() || 'Pessoa B';
  const siglaA = synSigla('A');
  const siglaB = synSigla('B');

  let text = 'Sinastria — '+nameA+' ('+siglaA+') & '+nameB+' ('+siglaB+')\n\n';

  // aspectos: uma linha por aspecto, na sintaxe "A's Planet in Sign Aspect B's Planet in Sign (Orb: D°M'"
  const rows = getFilteredSynRows();
  rows.forEach(r=>{
    const aspectWord = ASPECT_EN[r.aspect.name] || r.aspect.name;
    const planetA = PLANET_EN[r.a] || r.a;
    const planetB = PLANET_EN[r.b] || r.b;
    const signA = SIGNS_EN[r.aSign];
    const signB = SIGNS_EN[r.bSign];
    const deg = Math.floor(r.orb);
    const min = Math.round((r.orb - deg) * 60);
    text += siglaA+"'s "+planetA+' in '+signA+' '+aspectWord+' '+siglaB+"'s "+planetB+' in '+signB+' (Orb: '+deg+'°'+min+"')\n";
  });

  // casas: todos os pontos de A na casa em que caem no mapa de B, e vice-versa —
  // independente de formarem aspecto ou não, igual ao que o Astro-seek exporta.
  if(synChartA.hasHouses || synChartB.hasHouses){
    text += '\n';
    if(synChartB.hasHouses){
      synPointList(synChartA).forEach(name=>{
        const lon = synPointLon(synChartA, name);
        const house = houseOf(lon, synChartB.cusps);
        const planet = PLANET_EN[name] || name;
        text += siglaA+"'s "+planet+' in the '+house+ordinalSuffixEn(house)+' '+siglaB+"'s house\n";
      });
    }
    if(synChartA.hasHouses){
      synPointList(synChartB).forEach(name=>{
        const lon = synPointLon(synChartB, name);
        const house = houseOf(lon, synChartA.cusps);
        const planet = PLANET_EN[name] || name;
        text += siglaB+"'s "+planet+' in the '+house+ordinalSuffixEn(house)+' '+siglaA+"'s house\n";
      });
    }
  }

  const box = document.getElementById('synCopyBox');
  box.textContent = text;
  box.style.display='block';
  const ta = document.getElementById('synCopyArea');
  ta.value = text;
  ta.select();
  try{
    navigator.clipboard.writeText(text);
  }catch(e){
    document.execCommand('copy');
  }
  if(btn){
    const original = btn.textContent;
    btn.textContent = 'Copiado ✓';
    btn.disabled = true;
    setTimeout(()=>{ btn.textContent = original; btn.disabled = false; }, 1600);
  }
}

