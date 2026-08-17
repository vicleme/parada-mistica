// ============================================================================
// core/synastry-weights.js
// Sistema de pesos dedicado à Sinastria (aba "Sinastria"), portado da
// Calculadora de Sinastria original: peso por PAR específico de pontos
// (AXIS_BOOST_SYN, calibrado tier a tier) x decaimento de orbe exponencial que
// varia por tipo de aspecto (ORB_DECAY_DIVISOR_SYN). Trânsitos, Trânsitos
// duplos e Composto usam impactScore (core/aspects.js) — este arquivo só
// entra em uso via features/synastry.js/calcSynastry.
// ============================================================================

import { ASPECTS, effectiveMaxOrb } from './aspects.js';
import { ASPECT_EN } from './constants.js';

// ---------- Peso de sinastria: portado da Calculadora de Sinastria (index.html) ----------
// Primeira versão (substituída) corrigia só a assimetria de ordem A/B, mas continuava
// usando a classificação genérica OUTER/SOCIAL/CENTAUR vs PERSONAL — pensada pra
// trânsito (planeta lento tocando ponto pessoal), sem relação direta com o que a
// literatura de sinastria realmente prioriza (pares ESPECÍFICOS: Sol-Lua, Vênus-Marte,
// Saturno-pessoal, Nodo-pessoal, contatos angulares...). Esta versão porta o sistema
// dedicado da Calculadora de Sinastria: peso por PAR específico de pontos (AXIS_BOOST,
// calibrado tier a tier na literatura clássica) x decaimento de orbe exponencial que
// varia por tipo de aspecto (ORB_DECAY_DIVISOR — maior/mais lento pra conjunção/oposição,
// menor/mais rápido pra sextil/quincúncio/semis). Só entra em uso na aba Sinastria
// (calcSynastry) — Trânsitos/Trânsitos duplos/Composto continuam com impactScore
// original, que tem lógica própria de trânsito real.
//
// Nomes deste arquivo (PT) -> chaves EN usadas no AXIS_BOOST de origem.
export const PT_TO_EN_POINT = {
  Sol:'Sun', Lua:'Moon', Mercurio:'Mercury', Venus:'Venus', Marte:'Mars',
  Jupiter:'Jupiter', Saturno:'Saturn', Urano:'Uranus', Netuno:'Neptune', Plutao:'Pluto',
  Quiron:'Chiron', NodoNorte:'Node', Lilith:'Lilith',
  Asc:'Ascendant', MC:'MC', DSC:'DSC', IC:'IC', Fortuna:'Fortune', Espirito:'Spirit', Vertice:'Vertex'
};
// Mesma tabela AXIS_BOOST da Calculadora de Sinastria (index.html), tier a tier. Vértice
// agora é calculado por este arquivo (ver vertexLon) e por isso os pares Vértice foram
// incluídos abaixo, igual ao de origem. Pares que dependem de Nodo Sul continuam
// omitidos: este arquivo ainda não calcula Nodo Sul (só o Nodo Norte médio), então essas
// entradas nunca teriam correspondente aqui — omiti-las não muda nenhum resultado, só
// evita chaves mortas.
// Auditoria de simetria Asc/Desc (portada do index.html — ver comentário lá em
// axisBoost()): conjunção, oposição e quadratura são geometricamente forçadas a valer
// o mesmo dos dois lados do eixo Ascendente-Descendente, então usam o mesmo tier do
// Ascendente quando o par é DSC-pessoal. Trígono/sextil/quincúncio etc. não são
// forçados (viram outro aspecto do outro lado do eixo), então ficam num tier
// intermediário entre o antigo 1.20 (MC/IC) e o 1.35 do Ascendente.
export const DSC_ASC_SYMMETRIC_ASPECTS_SYN = new Set(['Conjunction','Opposition','Square']);
export const DSC_ASC_INTERMEDIATE_TIER_SYN = 1.28;
export const DSC_PERSONAL_PLANETS_SYN = new Set(['Sun','Moon','Venus','Mars','Mercury']);
export const AXIS_BOOST_SYN = new Map([
  // Tier 1 (1.35) — os quatro eixos clássicos (Sol-Lua, Vênus-Marte, Mercúrio-pessoal,
  // Saturno-pessoal) e os auto-pares dos pessoais entre si:
  ['Moon-Sun',1.35],['Mars-Venus',1.35],['Mars-Mars',1.35],['Venus-Venus',1.35],
  ['Moon-Moon',1.35],['Sun-Sun',1.35],['Ascendant-Sun',1.35],['Ascendant-Moon',1.35],
  ['Ascendant-Venus',1.35],['Ascendant-Mars',1.35],['Mercury-Mercury',1.35],
  ['Mercury-Sun',1.35],['Mercury-Moon',1.35],['Ascendant-Mercury',1.35],
  ['Saturn-Sun',1.35],['Moon-Saturn',1.35],['Saturn-Venus',1.35],['Mars-Saturn',1.35],
  ['Mercury-Saturn',1.35],['Ascendant-Saturn',1.35],['MC-Saturn',1.35],['IC-Saturn',1.35],
  ['DSC-Saturn',1.35],['Saturn-Saturn',1.35],
  // Tier 2 (1.30) — eixo do destino (Nodo Norte):
  ['Node-Sun',1.30],['Moon-Node',1.30],['Node-Venus',1.30],['Mars-Node',1.30],
  ['Node-Node',1.30],['Mercury-Node',1.30],
  ['Ascendant-Node',1.30],['MC-Node',1.30],['IC-Node',1.30],['DSC-Node',1.30],
  // Correção de auditoria #6 (calibrado com o usuário, revisão Vértice vs. Nodo —
  // portada do index.html, ver comentário lá): Vértice deixou de dividir o tier 1.30 do
  // Nodo. Nodo (eixo lunar) tem uso consolidado na sinastria cármica moderna, leitura
  // relativamente estável entre escolas. Vértice é um ponto puramente geométrico
  // (interseção da eclíptica com o vertical principal), sem consenso de uso, e muito
  // mais sensível a erro de horário de nascimento que o Nodo (que se move devagar e
  // independe da hora). Rebaixado pro mesmo tier de Quíron/Lilith (1.10) — sinal
  // narrativo real, mas ponto moderno/disputado, não equivalente a um eixo cármico de
  // leitura consensual como o Nodo. Nodo-Vértice (ponto-com-ponto, tiers vizinhos
  // diferentes) fica na média exata dos dois, 1.20 — mesmo critério já usado em
  // Quíron-Nodo logo abaixo. SouthNode-Vertex fica de fora (Nodo Sul não é calculado
  // aqui, ver comentário no topo do PT_TO_EN_POINT/AXIS_BOOST_SYN).
  ['Moon-Vertex',1.10],['Sun-Vertex',1.10],['Venus-Vertex',1.10],['Mars-Vertex',1.10],
  ['Ascendant-Vertex',1.10],['MC-Vertex',1.10],['IC-Vertex',1.10],['DSC-Vertex',1.10],
  ['Vertex-Vertex',1.10],['Node-Vertex',1.20],['Mercury-Vertex',1.10],
  // Tier 3 (1.20) — eixos pessoais secundários, MC/IC/DSC, Quíron/Lilith tocando
  // pessoal, transpessoais tocando Vênus/Marte/Sol/Lua/Mercúrio, Júpiter:
  ['Sun-Venus',1.20],['Moon-Venus',1.20],['Mars-Sun',1.20],['Mars-Moon',1.20],
  ['MC-Sun',1.20],['MC-Moon',1.20],['MC-Venus',1.20],['MC-Mars',1.20],
  ['IC-Sun',1.20],['IC-Moon',1.20],['IC-Venus',1.20],['IC-Mars',1.20],
  // DSC-Sol/Lua/Vênus/Marte saíram do valor fixo aqui — ver
  // DSC_ASC_SYMMETRIC_TIER/DSC_ASC_INTERMEDIATE_TIER e axisBoostSynastry() abaixo
  // (auditoria de simetria Asc/Desc, portada do index.html).
  // Quíron/Lilith tocando pessoal: um tier abaixo de MC/IC/DSC (1.10, não 1.20) — mesma
  // revisão feita no index.html (ver comentário lá): ângulo é geometria estrutural do
  // mapa, Quíron/Lilith são pontos modernos/discutidos, não equivalentes.
  ['Chiron-Sun',1.10],['Chiron-Moon',1.10],['Chiron-Venus',1.10],['Chiron-Mars',1.10],
  ['Chiron-Mercury',1.10],
  // Nodo Norte tocando Quíron (calibrado com o usuário, portado do index.html — ver
  // comentário lá): ponto-com-ponto, nenhum dos dois pessoal, então nem tier 2 (Nodo-
  // pessoal, 1.30) nem tier 3 padrão de Quíron-pessoal (1.10) — 1.20 é a média exata dos
  // dois, que já é o tier 3 padrão usado por MC/IC/DSC-pessoal etc. Nodo Sul-Quíron fica
  // de fora porque este arquivo não calcula Nodo Sul (ver comentário no topo do
  // AXIS_BOOST_SYN sobre PT_TO_EN_POINT).
  ['Chiron-Node',1.20],
  ['Mars-Neptune',1.20],['Mars-Uranus',1.20],['Mars-Pluto',1.20],
  ['Neptune-Venus',1.20],['Uranus-Venus',1.20],['Pluto-Venus',1.20],
  ['Lilith-Sun',1.10],['Lilith-Moon',1.10],['Lilith-Venus',1.10],['Lilith-Mars',1.10],
  ['Lilith-Mercury',1.10],
  ['Mars-Mercury',1.20],['Mercury-Venus',1.20],['MC-Mercury',1.20],['IC-Mercury',1.20],
  // DSC-Mercúrio: mesmo caso do DSC-Sol/Lua/Vênus/Marte acima — ver axisBoostSynastry().
  ['Mercury-Uranus',1.20],['Mercury-Neptune',1.20],['Mercury-Pluto',1.20],
  ['Jupiter-Sun',1.20],['Jupiter-Moon',1.20],['Jupiter-Venus',1.20],['Jupiter-Mars',1.20],
  ['Jupiter-Mercury',1.20],['Jupiter-Jupiter',1.20],
  // Júpiter/Netuno tocando MC/IC (auditoria de coesão, portada do index.html): mesma
  // lacuna que Saturno/Nodo/Vértice já tiveram fechada — só o Ascendente tinha entrada,
  // MC/IC caíam no genérico 1.0. DSC já herda via axisBoostSynastry() nos aspectos
  // simétricos (conjunção/oposição/quadratura).
  ['MC-Jupiter',1.20],['IC-Jupiter',1.20],['Ascendant-Jupiter',1.20],
  ['Neptune-Sun',1.20],['Sun-Uranus',1.20],['Pluto-Sun',1.20],
  ['Moon-Neptune',1.20],['Moon-Pluto',1.20],['Moon-Uranus',1.20],
  ['MC-Neptune',1.20],['IC-Neptune',1.20],['Ascendant-Neptune',1.20],
  // Casos deliberadamente ABAIXO do genérico (0.6) — Ascendente-Ascendente (leitura
  // menos unânime na literatura) e Fortuna/Espírito tocando pessoal (pontos derivados,
  // não corpos reais; peso baixo pra não deixar 1 contato dominar sozinho). Espírito
  // entra no mesmo tier de Fortuna — mesmo estatuto (tríade Asc/Sol/Lua), sem razão
  // astrológica pra pesar diferente aqui:
  ['Ascendant-Ascendant',0.6],['Fortune-Sun',0.6],['Fortune-Moon',0.6],
  ['Fortune-Mercury',0.6],['Fortune-Venus',0.6],['Fortune-Mars',0.6],
  ['Spirit-Sun',0.6],['Spirit-Moon',0.6],['Spirit-Mercury',0.6],
  ['Spirit-Venus',0.6],['Spirit-Mars',0.6],
  // DSC-DSC (auditoria de simetria Asc/Desc, portada do index.html): mesmo peso
  // reduzido do Ascendente-Ascendente — não havia entrada aqui, então caía no
  // genérico 1.0, maior que o 0.6 do Asc-Asc sem razão astrológica pra isso.
  ['DSC-DSC',0.6],
]);
export function axisBoostSynastry(nameA,nameB,aspectEn){
  const enA = PT_TO_EN_POINT[nameA] || nameA;
  const enB = PT_TO_EN_POINT[nameB] || nameB;

  // Ver comentário em axisBoost() do index.html: conjunção/oposição/quadratura ao
  // Descendente são geometricamente idênticas ao mesmo aspecto com o Ascendente, pra
  // qualquer planeta/ponto — não só os pessoais. Herda o peso do Ascendente com aquele
  // planeta nesses três casos.
  if (DSC_ASC_SYMMETRIC_ASPECTS_SYN.has(aspectEn)){
    const p1 = enA === 'DSC' ? 'Ascendant' : enA;
    const p2 = enB === 'DSC' ? 'Ascendant' : enB;
    const pair = [p1,p2].sort().join('-');
    return AXIS_BOOST_SYN.get(pair) || 1.0;
  }

  const isDscPersonal = (enA === 'DSC' && DSC_PERSONAL_PLANETS_SYN.has(enB))
    || (enB === 'DSC' && DSC_PERSONAL_PLANETS_SYN.has(enA));
  if (isDscPersonal) return DSC_ASC_INTERMEDIATE_TIER_SYN;

  const pair = [enA,enB].sort().join('-');
  return AXIS_BOOST_SYN.get(pair) || 1.0;
}
// Mesmo ORB_DECAY_DIVISOR do index.html: decaimento exponencial do peso conforme o
// orbe cresce, mais rápido pra aspectos menores (sextil/quincúncio/semis) do que pros
// maiores clássicos (conjunção/oposição), que toleram orbe mais largo sem perder muita
// força — diferente do decaimento linear-até-zero (1 - orb/orbeMáximo) usado em
// impactScore/planetWeight (versão de trânsito), que trata todo tipo de aspecto igual.
export const ORB_DECAY_DIVISOR_SYN = {
  Conjunction:3.0, Opposition:3.0, Trine:2.5, Square:2.5,
  Sextile:1.8, Quincunx:1.8, Semisextile:1.5, Semisquare:1.5, Sesquiquadrate:1.5,
};
// Correção de auditoria (portada do index.html, ver ASPECT_CATEGORY_MULT lá): até aqui,
// a única coisa que diferenciava aspecto maior de menor no score de Sinastria era a
// velocidade de decaimento por orbe acima — sem multiplicador de base por categoria, um
// aspecto menor muito exato (ex.: semiquadratura a 0,13°) podia superar um aspecto maior
// com orbe só moderadamente mais largo (ex.: oposição a 0,40°) no mesmo par bonificado.
// 0.6 é correção moderada (restaura a ordem maior > menor no mesmo par/orbe), não uma
// réplica da escala do motor de trânsito original (ASPECTS.w acima, que chega a 5x de
// diferença) — os menores continuam contando, só um degrau abaixo por natureza.
export const MINOR_ASPECTS_SYN = new Set(['Quincunx','Semisextile','Semisquare','Sesquiquadrate']);
// Correção de auditoria #2 (calibrado com o usuário, caso Nodo-Quíron — portada do
// index.html, ver comentário lá em ASPECT_CATEGORY_MULT): o 0.6 acima resolvia a
// inversão de ordem maior-vs-menor NO MESMO orbe, mas não segurava o caso em que dois
// fatores fracos se empilham — um aspecto MENOR formado entre dois pontos NENHUM dos
// quais é planeta pessoal (Sol/Lua/Mercúrio/Vênus/Marte) é um sinal duplamente
// auxiliar. Com orbe quase exato, esse duplo-auxiliar ainda alcançava ~72% do teto de
// um par tier 1 (Lua-Lua etc.) — suficiente pra ultrapassar um trígono de Lua-Lua com
// orbe moderadamente aberto (~1.6°).
//
// Correção de auditoria #3 (calibrado com o usuário, caso Lua-Quíron — portada do
// index.html): a divisão acima era binária (0 pessoais vs "pelo menos 1" → mesmo 0.6),
// tratando Lua-Quíron (só um lado pessoal) igual a Sol-Marte (os dois lados pessoais).
// Lua semiquadratura Quíron a 0.13° ainda superava Mercúrio-Mercúrio trígono a 2.14°
// (0.605 vs 0.574). Terceiro degrau: minorOnePersonal (0.45, entre 0.6 e 0.35) —
// empurra esse empate de ~2.00° pra ~2.73°.
export const PERSONAL_PLANETS_SYN = new Set(['Sol','Lua','Mercurio','Venus','Marte']);
export const ASPECT_CATEGORY_MULT_SYN = { major: 1.0, minorBothPersonal: 0.6, minorOnePersonal: 0.45, minorNonPersonal: 0.35, majorNonPersonalUncurated: 0.75 };
// Correção de auditoria #5 (calibrado com o usuário, caso Saturno-Lilith / Lilith-Plutão
// — portada do index.html, ver comentário lá em ASPECT_CATEGORY_MULT): as três correções
// acima só se aplicavam a MINOR_ASPECTS_SYN — um aspecto MAIOR (quadratura, sextil,
// trígono, oposição, conjunção) entre dois pontos NENHUM dos quais é planeta pessoal
// sempre recebia catMult=1.0 (major) cheio, mesmo quando o par também não tinha nenhuma
// entrada específica em AXIS_BOOST_SYN (nem pessoal, nem eixo tradicionalmente citado
// como Nodo-Nodo/Saturno-Saturno/MC-Nodo, que o próprio AXIS_BOOST_SYN já reconhece e
// pesa mesmo sem pessoal). boost===1.0 aqui funciona como proxy de "par sem entrada
// curada" (axisBoostSynastry já retorna 1.0 nesse caso) — pares que o sistema já decidiu
// pesar mesmo sem pessoal (boost>1.0) continuam de fora dessa penalidade, de propósito.
// 0.75 é mais suave que o 0.6 do minorBothPersonal (aspecto MAIOR ainda carrega mais peso
// estrutural que um menor, mesmo sem pessoal/eixo), mas suficiente pra tirar esses pares
// do caminho de Lua-Lua/Sol-Sol em orbes comparáveis.
export function aspectCategoryMultSyn(aspectEn, nameA, nameB, boost){
  const personalCount = (PERSONAL_PLANETS_SYN.has(nameA) ? 1 : 0) + (PERSONAL_PLANETS_SYN.has(nameB) ? 1 : 0);
  if (!MINOR_ASPECTS_SYN.has(aspectEn)){
    if (personalCount === 0 && boost === 1.0) return ASPECT_CATEGORY_MULT_SYN.majorNonPersonalUncurated;
    return ASPECT_CATEGORY_MULT_SYN.major;
  }
  if (personalCount === 2) return ASPECT_CATEGORY_MULT_SYN.minorBothPersonal;
  if (personalCount === 1) return ASPECT_CATEGORY_MULT_SYN.minorOnePersonal;
  return ASPECT_CATEGORY_MULT_SYN.minorNonPersonal;
}
// Agrupamento "Aspectos maiores"/"Aspectos menores" pro select de filtro da Sinastria
// (mesmo padrão de optgroup já usado em PLANET_GROUPS pro filtro de planeta). Reaproveita
// MINOR_ASPECTS_SYN em vez de duplicar a lista maior/menor separada — assim os dois
// agrupamentos (peso e filtro) nunca podem ficar dessincronizados se um aspecto novo for
// adicionado a ASPECTS no futuro.
export const ASPECT_GROUPS_SYN = {
  "Aspectos maiores": ASPECTS.map(a=>a.name).filter(n => !MINOR_ASPECTS_SYN.has(ASPECT_EN[n]||n)),
  "Aspectos menores": ASPECTS.map(a=>a.name).filter(n => MINOR_ASPECTS_SYN.has(ASPECT_EN[n]||n)),
};
export function aspectMatchesFilterSyn(aspectName, fAspect){
  if(!fAspect) return true;
  if(fAspect.startsWith('grupo:')){
    const group = fAspect.slice(6);
    return (ASPECT_GROUPS_SYN[group]||[]).includes(aspectName);
  }
  return aspectName===fAspect;
}
// Correção de auditoria #4 (calibrado com o usuário, caso Plutão-Plutão — portada do
// index.html): Urano/Netuno/Plutão mútuos entre si são o exemplo clássico de "falso
// sinal" em sinastria — planeta lento, então qualquer par de idade parecida tem esse
// aspecto; ele mede geração, não o vínculo específico entre as duas pessoas. O
// index.html já tinha esse desconto (generationalDiscount, 0.3×) na Harmonia geral, mas
// não estava portado pra cá — sem ele, Plutão-Plutão conjunção a 2.36° (boost genérico
// 1.0, sem entrada em AXIS_BOOST_SYN) empatava/superava Lua semiquadratura Quíron quase
// exata (0.455 vs 0.454).
export const TRANSPERSONAL_PLANETS_SYN = new Set(['Urano','Netuno','Plutao']);
// Teto teórico do score bruto: orbe exato (orbW=1, e^0) x maior tier de AXIS_BOOST_SYN
// (1.35) x multiplicador de aspecto maior (1.0, ver aspectCategoryMultSyn acima). Sem
// bônus de retrógrado aqui — natal-vs-natal não tem "planeta em trânsito" pra estar
// retrógrado no sentido em que impactScore usa isso.
export const IMPACT_MAX_RAW_SYN = 1.35;
export function impactScoreSynastry(aspect,orb,nameA,nameB){
  const aspectEn = ASPECT_EN[aspect.name] || aspect.name;
  const divisor = ORB_DECAY_DIVISOR_SYN[aspectEn] || 2.5;
  // decaimento exponencial normal (nunca chega a zero sozinho) + teto rígido por tipo
  // de astro (effectiveMaxOrb, ver ASPECTS acima): além dele, zera de vez — Quíron/
  // Lilith/Nodo/Vértice/Fortuna/Espírito não "esmaecem", deixam de contar.
  const orbW = orb <= effectiveMaxOrb(aspect,nameA,nameB) ? Math.exp(-orb/divisor) : 0;
  const bothOuter = TRANSPERSONAL_PLANETS_SYN.has(nameA) && TRANSPERSONAL_PLANETS_SYN.has(nameB);
  const generationalDiscount = bothOuter ? 0.3 : 1.0;
  // boost calculado uma vez e reaproveitado no catMult (correção de auditoria #5 —
  // mesma sincronização feita no index.html): precisa do mesmo boost pra distinguir par
  // sem pessoal MAS com eixo curado (boost>1.0) de par sem pessoal E sem eixo nenhum
  // (boost genérico 1.0).
  const boost = axisBoostSynastry(nameA,nameB,aspectEn);
  const score = orbW * boost * aspectCategoryMultSyn(aspectEn, nameA, nameB, boost) * generationalDiscount;
  return Math.round((score/IMPACT_MAX_RAW_SYN)*100);
}
