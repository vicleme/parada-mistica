// ============================================================================
// core/aspects.js
// Tabela de aspectos maiores/menores, tetos de orbe por tipo de ponto, cálculo
// de orbe/peso/pontuação de impacto para trânsitos, e os pontos derivados
// (Parte da Fortuna, Parte do Espírito, Asc/MC/DSC/IC) via angleLon.
// ============================================================================

import { normDeg } from './time.js';
import { houseOf } from './houses.js';
import { OUTER, SOCIAL, CENTAUR, PERSONAL } from './constants.js';

export const ASPECTS = [
 {name:"Conjunção", glyph:"☌", angle:0, orb:8, w:1.0},
 {name:"Oposição", glyph:"☍", angle:180, orb:8, w:0.9},
 {name:"Quadratura", glyph:"□", angle:90, orb:7, w:0.85},
 {name:"Trígono", glyph:"△", angle:120, orb:7, w:0.6},
 {name:"Sextil", glyph:"⚹", angle:60, orb:5, w:0.45},
 {name:"Quincúncio", glyph:"⚻", angle:150, orb:3, w:0.3},
 {name:"Semissextil", glyph:"⚺", angle:30, orb:2, w:0.15},
 {name:"Semiquadratura", glyph:"∠", angle:45, orb:2, w:0.2},
 {name:"Sesquiquadratura", glyph:"⚼", angle:135, orb:2, w:0.2}
];
// Teto de orbe por tipo de astro/ponto: o teto acima (aspect.orb) é o mesmo pra
// qualquer ponto, mas a própria tradição de sinastria/trânsito não trata todo mundo
// como igualmente "presente" num aspecto — luminares, planetas pessoais/sociais e os
// ângulos (Asc/MC/DSC/IC) mantêm tolerância cheia (multiplicador 1.0); Urano/Netuno/
// Plutão, por serem mais lentos e geracionais, ficam um degrau mais apertados; Quíron,
// Nodo, Vértice e Parte da Fortuna são pontos derivados/discutidos, não planetas no
// sentido clássico, e pedem orbe bem mais estreito; Lilith (apogeu lunar médio) é
// puramente um ponto matemático, o mais conservador de todos. Isso não é um desconto
// de PESO (isso já existe via planetWeight/AXIS_BOOST) — é um teto de EXATIDÃO: além
// dele, o aspecto deixa de ser considerado, do jeito que boa parte da literatura trata
// esses pontos (fora do orbe apertado, é como se o aspecto nem existisse). Quando os
// dois lados do aspecto pertencem a categorias diferentes, vale o multiplicador MENOR
// dos dois — o elo mais frágil decide até onde o aspecto ainda "existe".
export const ORB_TYPE_MULT = {
  Urano: 0.75, Netuno: 0.75, Plutao: 0.75,
  Quiron: 0.35, NodoNorte: 0.35, Vertice: 0.35, Fortuna: 0.35, Espirito: 0.35,
  Lilith: 0.25,
};
export function orbTypeMultiplier(name){ return ORB_TYPE_MULT[name] ?? 1.0; }
export function effectiveMaxOrb(asp, nameA, nameB){
  return asp.orb * Math.min(orbTypeMultiplier(nameA), orbTypeMultiplier(nameB));
}
// Parte da Fortuna: Asc + Lua − Sol (mapa diurno) ou Asc + Sol − Lua (mapa noturno).
// "Diurno"/"noturno" é definido pelo Sol estar acima (casas 7–12) ou abaixo (casas 1–6)
// do horizonte — convenção tradicional, independe do sistema de casas escolhido (Signos
// Inteiros/Iguais/Placidus sempre numeram 1–6 abaixo do horizonte e 7–12 acima).
export function fortunaLon(chart){
  const sol = chart.positions.Sol, lua = chart.positions.Lua;
  const sunHouse = houseOf(sol, chart.cusps);
  const isDay = sunHouse>=7 && sunHouse<=12;
  return isDay ? normDeg(chart.asc + lua - sol) : normDeg(chart.asc + sol - lua);
}
// Parte do Espírito (Daimon): o complemento clássico da Fortuna — mesma tríade
// Asc/Sol/Lua, com Sol e Lua invertidos em relação à fórmula da Fortuna. Asc + Sol − Lua
// (mapa diurno) ou Asc + Lua − Sol (mapa noturno). Onde a Fortuna lê o corpo/circunstância
// (trajetória vivida, "sorte"), o Espírito lê a intenção/vontade consciente por trás dela
// (Firmicus/Valens; Lilly traz como Parte do Demônio) — por isso reaproveita a mesma seita
// (isDay, a partir da posição do Sol) em vez de recalculá-la. Os dois pontos só coincidem
// no caso degenerado de Sol e Lua conjuntos (Lua Nova) — a distinção "sorte do corpo" vs.
// "sorte da alma" desaparece a cada Lua Nova, como esperado.
export function espiritoLon(chart){
  const sol = chart.positions.Sol, lua = chart.positions.Lua;
  const sunHouse = houseOf(sol, chart.cusps);
  const isDay = sunHouse>=7 && sunHouse<=12;
  return isDay ? normDeg(chart.asc + sol - lua) : normDeg(chart.asc + lua - sol);
}
// Resolve a longitude de qualquer ponto do mapa, incluindo os ângulos derivados
// (Asc/MC/DSC/IC/Fortuna/Espirito) que não ficam em chart.positions — usada por natalLon
// e synPointLon (mesma lógica, chart aqui é natalChart, synChartA/B ou compositeChart).
export function angleLon(chart, name){
  if(name==='Asc') return chart.asc;
  if(name==='MC') return chart.mc;
  if(name==='DSC') return normDeg(chart.asc+180);
  if(name==='IC') return normDeg(chart.mc+180);
  if(name==='Fortuna') return fortunaLon(chart);
  if(name==='Espirito') return espiritoLon(chart);
  if(name==='Vertice') return chart.vertex;
  return chart.positions[name];
}
export function orbFromAspect(lonT,lonN,angle){
  let diff=Math.abs(normDeg(lonT-lonN));
  if(diff>180) diff=360-diff;
  return Math.abs(diff-angle);
}
export function planetWeight(transitName,natalName){
  const isSlowT = OUTER.includes(transitName) || SOCIAL.includes(transitName) || CENTAUR.includes(transitName);
  const natalPersonal = PERSONAL.includes(natalName);
  let w;
  if(isSlowT && natalPersonal) w=1.0;
  else if(isSlowT && !natalPersonal) w=0.55;
  else if(!isSlowT && natalPersonal) w=0.45;
  else w=0.3;
  if(natalName==='Asc'||natalName==='MC'||natalName==='DSC'||natalName==='IC') w*=1.15;
  if(natalName==='Quiron'||natalName==='Lilith') w*=1.1;
  return w;
}
// Teto teórico do score bruto: aspecto 1.0 (conjunção) x peso do planeta 1.15 (bônus máx. Asc/MC) x orbe exato 1.0 x retrógrado 1.04
export const IMPACT_MAX_RAW = 1.0 * 1.15 * 1.0 * 1.04;
export function impactScore(aspect,orb,transitName,natalName,retro){
  const orbFactor = Math.max(0,(1 - orb/effectiveMaxOrb(aspect,transitName,natalName)));
  let score = aspect.w * planetWeight(transitName,natalName) * orbFactor;
  if(retro) score*=1.04;
  return Math.round((score/IMPACT_MAX_RAW)*100);
}
