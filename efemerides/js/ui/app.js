// ============================================================================
// ui/app.js
// Ponto de entrada da aplicação (importado como <script type="module"> pelo
// index.html). Duas responsabilidades:
//
//   1. setView(): troca entre as três abas (Trânsitos individuais / Sinastria /
//      Composto).
//   2. Expor no objeto `window` todas as funções que o HTML chama via atributos
//      onclick="..."/oninput="..." (e via onclick construído dinamicamente em
//      pickCity/pickCityFor). Isso evita reescrever ~640 linhas de markup para
//      addEventListener só por causa da migração para ES modules — os módulos
//      continuam encapsulados, só a "borda" com o HTML existente fica exposta
//      aqui, num único lugar fácil de auditar.
//
// Se algum dia o HTML for reescrito para não usar mais onclick inline, esta
// lista de window.* pode simplesmente ser apagada e trocada por
// addEventListener nos módulos de feature.
// ============================================================================

import {
  calcNatal, clearNatalStorage, exportNatalInput, fillNow, fillPreset,
  importNatalInput, pickCity, searchCity, setMode, toggleImportBox, updateRangeWarn,
  loadNatalFromStorage,
} from '../features/natal.js';

import {
  calcTransits, copyForAI, exportResultsCsv, exportResultsJson, renderAspectsTable,
} from '../features/transits.js';

import {
  calcSynPerson, calcSynastry, clearSynStorage, copyForSinastriaCalc, copySynForAI,
  exportSynCsv, exportSynInput, exportSynJson, importSynInput, pickCityFor,
  renderSynAspectsTable, searchCityFor, toggleSynImportBox, loadSynFromStorage,
} from '../features/synastry.js';

import {
  calcDoubleTransits, copyDoubleForAI, dtFillNow, dtFillPreset, dtSetMode,
  dtUpdateRangeWarn, exportDoubleCsv, exportDoubleJson, renderDoubleTable,
} from '../features/double-transits.js';

import {
  calcComposite, calcCompositeTransits, coFillNow, coFillPreset, coSetMode,
  coUpdateRangeWarn, copyCompositeForAI, exportCompositeCsv, exportCompositeJson,
  renderCompositeAspectsTable,
} from '../features/composite.js';

// ---------- troca de aba (Trânsitos individuais / Sinastria / Composto) ----------
export function setView(v) {
  document.getElementById('tabTransitos').classList.toggle('active', v === 'transitos');
  document.getElementById('tabSinastria').classList.toggle('active', v === 'sinastria');
  document.getElementById('tabComposto').classList.toggle('active', v === 'composto');
  document.getElementById('viewTransitos').style.display = v === 'transitos' ? '' : 'none';
  document.getElementById('viewSinastria').style.display = v === 'sinastria' ? '' : 'none';
  document.getElementById('viewComposto').style.display = v === 'composto' ? '' : 'none';
}

// ---------- ponte com os atributos onclick/oninput do HTML (ver comentário acima) ----------
Object.assign(window, {
  // natal
  calcNatal, clearNatalStorage, exportNatalInput, fillNow, fillPreset,
  importNatalInput, pickCity, searchCity, setMode, toggleImportBox, updateRangeWarn,
  // trânsitos individuais
  calcTransits, copyForAI, exportResultsCsv, exportResultsJson, renderAspectsTable,
  // sinastria
  calcSynPerson, calcSynastry, clearSynStorage, copyForSinastriaCalc, copySynForAI,
  exportSynCsv, exportSynInput, exportSynJson, importSynInput, pickCityFor,
  renderSynAspectsTable, searchCityFor, toggleSynImportBox,
  // trânsitos duplos
  calcDoubleTransits, copyDoubleForAI, dtFillNow, dtFillPreset, dtSetMode,
  dtUpdateRangeWarn, exportDoubleCsv, exportDoubleJson, renderDoubleTable,
  // composto
  calcComposite, calcCompositeTransits, coFillNow, coFillPreset, coSetMode,
  coUpdateRangeWarn, copyCompositeForAI, exportCompositeCsv, exportCompositeJson,
  renderCompositeAspectsTable,
  // navegação entre abas
  setView,
});

// ---------- inicialização: recarrega dados salvos localmente, se houver ----------
(function init() {
  if (loadNatalFromStorage()) {
    calcNatal();
  }
  if (loadSynFromStorage()) {
    calcSynPerson('A');
    calcSynPerson('B');
  }
})();
