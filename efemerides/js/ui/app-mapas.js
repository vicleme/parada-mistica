// ============================================================================
// ui/app-mapas.js
// Ponto de entrada da página mapas.html (Mapa Natal / Sinastria / Composto /
// Pessoas). Ver comentário original em app.js (agora
// efemerides/js/ui/app-efemerides.js) sobre por que as funções são expostas
// em window.*.
// ============================================================================

import {
  applyNatalInput, calcNatal, clearNatalStorage, collectNatalInput, exportNatalInput, fillNow, fillPreset,
  importNatalInput, pickCity, searchCity, setMode, toggleImportBox, updateRangeWarn,
  loadNatalFromStorage,
} from '../features/natal.js';

import {
  applySynInput, calcSynPerson, calcSynastry, clearSynStorage, copyForSinastriaCalc, copySynForAI,
  exportSynCsv, exportSynInput, exportSynJson, importSynInput, openInSinastriaCalc, pickCityFor,
  renderSynAspectsTable, searchCityFor, toggleSynImportBox, loadSynFromStorage,
} from '../features/synastry.js';

import {
  calcComposite,
} from '../features/composite.js';

import { savePessoa } from '../../../assets/js/pessoas.js';
import { attachPessoaSelect, injectStyles as injectPessoaPickerStyles, openPessoaModal, renderPessoasList } from '../../../assets/js/pessoa-picker.js';

// ---------- troca de aba (Mapa Natal / Sinastria / Composto / Pessoas) ----------
export function setView(v) {
  document.getElementById('tabNatal').classList.toggle('active', v === 'natal');
  document.getElementById('tabSinastria').classList.toggle('active', v === 'sinastria');
  document.getElementById('tabComposto').classList.toggle('active', v === 'composto');
  document.getElementById('tabPessoas').classList.toggle('active', v === 'pessoas');
  document.getElementById('viewNatal').style.display = v === 'natal' ? '' : 'none';
  document.getElementById('viewSinastria').style.display = v === 'sinastria' ? '' : 'none';
  document.getElementById('viewComposto').style.display = v === 'composto' ? '' : 'none';
  document.getElementById('viewPessoas').style.display = v === 'pessoas' ? '' : 'none';
  if (v === 'pessoas') {
    renderPessoasList(document.getElementById('pessoasListContainer'), { onChange: refreshAllPessoaSelects });
  }
  if (history.replaceState) history.replaceState(null, '', '#' + v);
}

// ---------- cadastro de pessoas: seletores das abas Mapa Natal e Sinastria ----------
// Cada seletor, ao escolher uma pessoa, preenche o formulário correspondente
// (sem calcular sozinho — a pessoa ainda clica em "Calcular..." como sempre).
// "+ Nova pessoa" abre o mesmo modal usado na aba Pessoas, pré-preenchido com
// o que já estiver digitado ali na hora (getPrefill), pra não perder o que a
// pessoa já tinha começado a preencher manualmente.
const natalPessoaSelectEl = document.getElementById('natalPessoaSelect');
const synAPessoaSelectEl = document.getElementById('synAPessoaSelect');
const synBPessoaSelectEl = document.getElementById('synBPessoaSelect');

function refreshAllPessoaSelects() {
  [natalPessoaSelectEl, synAPessoaSelectEl, synBPessoaSelectEl].forEach((el) => {
    if (!el) return;
    const current = el.value;
    attachPessoaSelect(el, el._pmOnSelect ? { onSelect: el._pmOnSelect, getPrefill: el._pmGetPrefill } : {});
    if (current && current !== '__nova__') el.value = current;
  });
}

natalPessoaSelectEl._pmOnSelect = (pessoa) => { if (pessoa) applyNatalInput(pessoa); };
natalPessoaSelectEl._pmGetPrefill = () => collectNatalInput();
attachPessoaSelect(natalPessoaSelectEl, { onSelect: natalPessoaSelectEl._pmOnSelect, getPrefill: natalPessoaSelectEl._pmGetPrefill });

function collectSynInputLocal(who) {
  const p = 'syn' + who;
  return {
    nome: document.getElementById(p + 'Name').value || null,
    sigla: document.getElementById(p + 'Sigla').value || null,
    cidade: document.getElementById(p + 'CitySearch').value || null,
    data_nascimento: document.getElementById(p + 'Date').value || null,
    hora_nascimento: document.getElementById(p + 'Time').value || null,
    fuso_horario: document.getElementById(p + 'Tz').value !== '' ? parseFloat(document.getElementById(p + 'Tz').value) : null,
    latitude: document.getElementById(p + 'Lat').value !== '' ? parseFloat(document.getElementById(p + 'Lat').value) : null,
    longitude: document.getElementById(p + 'Lon').value !== '' ? parseFloat(document.getElementById(p + 'Lon').value) : null,
    sistema_casas: document.getElementById(p + 'House').value,
  };
}

synAPessoaSelectEl._pmOnSelect = (pessoa) => { if (pessoa) applySynInput('A', pessoa); };
synAPessoaSelectEl._pmGetPrefill = () => collectSynInputLocal('A');
attachPessoaSelect(synAPessoaSelectEl, { onSelect: synAPessoaSelectEl._pmOnSelect, getPrefill: synAPessoaSelectEl._pmGetPrefill });

synBPessoaSelectEl._pmOnSelect = (pessoa) => { if (pessoa) applySynInput('B', pessoa); };
synBPessoaSelectEl._pmGetPrefill = () => collectSynInputLocal('B');
attachPessoaSelect(synBPessoaSelectEl, { onSelect: synBPessoaSelectEl._pmOnSelect, getPrefill: synBPessoaSelectEl._pmGetPrefill });

// ---------- salvar os dados atuais do Mapa Natal como pessoa cadastrada ----------
function salvarNatalNoCadastro() {
  const msgEl = document.getElementById('natalPessoaMsg');
  const data = collectNatalInput();
  if (!data.nome) { msgEl.textContent = 'Preencha o campo Nome antes de salvar no cadastro.'; msgEl.style.color = 'var(--rose)'; return; }
  if (!data.data_nascimento) { msgEl.textContent = 'Preencha ao menos a data de nascimento.'; msgEl.style.color = 'var(--rose)'; return; }
  const selectedId = natalPessoaSelectEl.value && natalPessoaSelectEl.value !== '__nova__' ? natalPessoaSelectEl.value : undefined;
  const pessoa = savePessoa({ id: selectedId, ...data });
  refreshAllPessoaSelects();
  natalPessoaSelectEl.value = pessoa.id;
  msgEl.style.color = '';
  msgEl.textContent = (selectedId ? 'Cadastro de "' : 'Nova pessoa "') + pessoa.nome + '" salvo. Já disponível nas outras ferramentas do site.';
}

// ---------- aba Pessoas: botão "+ Nova pessoa" ----------
function abrirNovaPessoa() {
  openPessoaModal({
    onSave: () => {
      refreshAllPessoaSelects();
      renderPessoasList(document.getElementById('pessoasListContainer'), { onChange: refreshAllPessoaSelects });
    },
  });
}

// ---------- ponte com os atributos onclick/oninput do HTML ----------
Object.assign(window, {
  // natal
  calcNatal, clearNatalStorage, exportNatalInput, fillNow, fillPreset,
  importNatalInput, pickCity, searchCity, setMode, toggleImportBox, updateRangeWarn,
  salvarNatalNoCadastro,
  // sinastria
  calcSynPerson, calcSynastry, clearSynStorage, copyForSinastriaCalc, copySynForAI,
  exportSynCsv, exportSynInput, exportSynJson, importSynInput, openInSinastriaCalc, pickCityFor,
  renderSynAspectsTable, searchCityFor, toggleSynImportBox,
  // composto
  calcComposite,
  // pessoas
  abrirNovaPessoa,
  // navegação entre abas
  setView,
});

// ---------- inicialização: recarrega dados salvos localmente, e abre a aba
// indicada na URL (ex: mapas.html#sinastria), se houver ----------
(function init() {
  injectPessoaPickerStyles();
  if (loadNatalFromStorage()) {
    calcNatal();
  }
  if (loadSynFromStorage()) {
    calcSynPerson('A');
    calcSynPerson('B');
  }
  const hash = (location.hash || '').replace('#', '');
  if (['natal', 'sinastria', 'composto', 'pessoas'].includes(hash)) {
    setView(hash);
  }
})();
