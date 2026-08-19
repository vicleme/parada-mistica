// ============================================================================
// ui/app-efemerides.js
// Ponto de entrada da página efemerides.html (Trânsitos individuais /
// Trânsitos duplos / Sobre o composto). Trânsitos duplos e Sobre o composto
// não têm formulário de Pessoa A/B próprio — os dados vêm do que já foi
// calculado em mapas.html > Sinastria, lidos do localStorage
// (loadSynChartsFromStorageOnly, em features/synastry.js).
// ============================================================================

import {
  applyNatalInput, calcNatal, clearNatalStorage, collectNatalInput, exportNatalInput, fillNow, fillPreset,
  importNatalInput, pickCity, searchCity, setMode, toggleImportBox, updateRangeWarn,
  loadNatalFromStorage,
} from '../features/natal.js';

import {
  calcTransits, copyForAI, exportResultsCsv, exportResultsJson, renderAspectsTable,
} from '../features/transits.js';

import {
  calcDoubleTransits, copyDoubleForAI, dtFillNow, dtFillPreset, dtSetMode,
  dtUpdateRangeWarn, exportDoubleCsv, exportDoubleJson, renderDoubleTable, dtInitFromStorage,
} from '../features/double-transits.js';

import {
  calcCompositeTransits, coFillNow, coFillPreset, coSetMode,
  coUpdateRangeWarn, copyCompositeForAI, exportCompositeCsv, exportCompositeJson,
  renderCompositeAspectsTable, coInitFromStorage, coRecomputeFromStorage,
} from '../features/composite.js';

import { savePessoa } from '../../../assets/js/pessoas.js';
import { attachPessoaSelect, injectStyles as injectPessoaPickerStyles } from '../../../assets/js/pessoa-picker.js';

// ---------- cadastro de pessoas: seletor da aba Trânsitos individuais ----------
// Só preenche o formulário de Mapa natal (referência) — a pessoa ainda clica
// em "Calcular mapa natal" como sempre. "+ Nova pessoa" abre o mesmo modal
// usado em mapas.html, pré-preenchido com o que já estiver digitado aqui.
const natalPessoaSelectEl = document.getElementById('natalPessoaSelect');
if (natalPessoaSelectEl) {
  natalPessoaSelectEl._pmOnSelect = (pessoa) => { if (pessoa) applyNatalInput(pessoa); };
  natalPessoaSelectEl._pmGetPrefill = () => collectNatalInput();
  attachPessoaSelect(natalPessoaSelectEl, { onSelect: natalPessoaSelectEl._pmOnSelect, getPrefill: natalPessoaSelectEl._pmGetPrefill });
}

// ---------- salvar os dados atuais do Mapa natal (referência) como pessoa cadastrada ----------
function salvarNatalNoCadastro() {
  const msgEl = document.getElementById('natalPessoaMsg');
  const data = collectNatalInput();
  if (!data.nome) { msgEl.textContent = 'Preencha o campo Nome antes de salvar no cadastro.'; msgEl.style.color = 'var(--rose)'; return; }
  if (!data.data_nascimento) { msgEl.textContent = 'Preencha ao menos a data de nascimento.'; msgEl.style.color = 'var(--rose)'; return; }
  const selectedId = natalPessoaSelectEl.value && natalPessoaSelectEl.value !== '__nova__' ? natalPessoaSelectEl.value : undefined;
  const pessoa = savePessoa({ id: selectedId, ...data });
  attachPessoaSelect(natalPessoaSelectEl, { onSelect: natalPessoaSelectEl._pmOnSelect, getPrefill: natalPessoaSelectEl._pmGetPrefill });
  natalPessoaSelectEl.value = pessoa.id;
  msgEl.style.color = '';
  msgEl.textContent = (selectedId ? 'Cadastro de "' : 'Nova pessoa "') + pessoa.nome + '" salvo. Já disponível nas outras ferramentas do site.';
}

// ---------- troca de aba (Trânsitos individuais / Trânsitos duplos / Sobre o composto) ----------
export function setView(v) {
  document.getElementById('tabTransitos').classList.toggle('active', v === 'transitos');
  document.getElementById('tabDuplos').classList.toggle('active', v === 'duplos');
  document.getElementById('tabComposto').classList.toggle('active', v === 'composto');
  document.getElementById('viewTransitos').style.display = v === 'transitos' ? '' : 'none';
  document.getElementById('viewDuplos').style.display = v === 'duplos' ? '' : 'none';
  document.getElementById('viewComposto').style.display = v === 'composto' ? '' : 'none';
  if (history.replaceState) history.replaceState(null, '', '#' + v);
  // Os resumos de A/B (Duplos e Sobre o composto) dependem do que está salvo
  // no momento — recarrega toda vez que a aba é aberta, caso o usuário tenha
  // recalculado a Sinastria em outra aba do navegador nesse meio tempo.
  if (v === 'duplos') dtInitFromStorage();
  if (v === 'composto') coInitFromStorage();
}

// ---------- ponte com os atributos onclick/oninput do HTML ----------
Object.assign(window, {
  // natal (referência para trânsitos individuais)
  calcNatal, clearNatalStorage, exportNatalInput, fillNow, fillPreset,
  importNatalInput, pickCity, searchCity, setMode, toggleImportBox, updateRangeWarn,
  salvarNatalNoCadastro,
  // trânsitos individuais
  calcTransits, copyForAI, exportResultsCsv, exportResultsJson, renderAspectsTable,
  // trânsitos duplos
  calcDoubleTransits, copyDoubleForAI, dtFillNow, dtFillPreset, dtSetMode,
  dtUpdateRangeWarn, exportDoubleCsv, exportDoubleJson, renderDoubleTable,
  // sobre o composto
  calcCompositeTransits, coFillNow, coFillPreset, coSetMode,
  coUpdateRangeWarn, copyCompositeForAI, exportCompositeCsv, exportCompositeJson,
  renderCompositeAspectsTable, coRecomputeFromStorage,
  // navegação entre abas
  setView,
});

// ---------- inicialização: recarrega o mapa natal (referência) salvo
// localmente, e abre a aba indicada na URL (ex: efemerides.html#duplos) ----------
(function init() {
  injectPessoaPickerStyles();
  if (loadNatalFromStorage()) {
    calcNatal();
  }
  const hash = (location.hash || '').replace('#', '');
  if (['transitos', 'duplos', 'composto'].includes(hash)) {
    setView(hash);
  } else {
    // aba padrão já está visível no HTML, mas os resumos de A/B ainda não
    // foram carregados — nada a fazer aqui, eles só carregam quando a aba é aberta
  }
})();
