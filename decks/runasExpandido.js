// =============================================================
//  Baralho: Runas Expandido (Futark Antigo + Anglo-Saxônicas)
//
//  33 runas no total:
//    - 24 do Futark Antigo (Elder Futhark), nas três Aetts
//    - 9 do Futhorc Anglo-Saxão, incorporadas por volta do séc. V
//
//  IMPORTANTE: imagemPasta aponta para "runas" — a MESMA pasta
//  usada pelo baralho "runas.js" (24 cartas). As imagens 1.jpg a
//  24.jpg são reaproveitadas automaticamente porque a ordem das
//  24 primeiras cartas abaixo é idêntica à do baralho original.
//  Você só precisa adicionar 9 imagens NOVAS em images/runas/,
//  numeradas de 25.jpg a 33.jpg, na ordem das anglo-saxônicas
//  listadas logo abaixo das 24 primeiras.
//
//  Para editar as cartas ou significados, mexa apenas neste arquivo.
// =============================================================

const runasExpandido = {
    id:              "runasExpandido",
    nome:            "Runas — Futark Antigo + Anglo-Saxônicas (33)",
    imagemPasta:     "runas",   // ← mesma pasta do baralho de 24, não crie uma nova
    imagemExtensao:  ".jpg",
    aceitaInversao:  true,

    cartas: [
        // ── AETT DE FREYR — 1 a 8 ───────────────────────────────
        "Fehu", "Uruz", "Thurisaz", "Ansuz", "Raidho", "Kenaz", "Gebo", "Wunjo",
        // ── AETT DE HEIMDALL — 9 a 16 ────────────────────────────
        "Hagalaz", "Nauthiz", "Isa", "Jera", "Eihwaz", "Perthro", "Algiz", "Sowilo",
        // ── AETT DE TYR — 17 a 24 ────────────────────────────────
        "Tiwaz", "Berkana", "Ehwaz", "Mannaz", "Laguz", "Ingwaz", "Dagaz", "Othala",
        // ── ANGLO-SAXÔNICAS — 25 a 33 (imagens novas) ────────────
        "Ear", "Ac", "Ior", "Os", "Yr", "Cweorth", "Chalc", "Stan", "Gar"
    ],

    significados: {
        "Fehu":     { direta: "Riqueza conquistada, prosperidade, novos recursos, gado — bens que se movem e se multiplicam.", invertida: "Perda material, ganância, escassez, dependência financeira de outros." },
        "Uruz":     { direta: "Força bruta, vitalidade, resistência física, coragem diante de um desafio que precisa ser enfrentado.", invertida: "Fraqueza, oportunidade perdida por hesitação, impulsividade sem direção." },
        "Thurisaz": { direta: "Força reativa e protetora, ruptura necessária, o poder de dizer não e se defender.", invertida: "Perigo, decisão precipitada, vulnerabilidade, conflito que se volta contra quem o provocou." },
        "Ansuz":    { direta: "Comunicação, mensagem importante, sabedoria recebida, conselho que chega na hora certa.", invertida: "Mal-entendido, palavra usada para manipular, vaidade, bloqueio na comunicação." },
        "Raidho":   { direta: "Jornada, movimento, ritmo de vida em curso — deslocamento físico ou uma virada de rumo interior.", invertida: "Atraso na caminhada, desordem, crise de direção, sensação de estar parado no lugar errado." },
        "Kenaz":    { direta: "A tocha acesa — criatividade, conhecimento revelado, clareza que nasce de dentro para fora.", invertida: "Perda de direção, criatividade bloqueada, exposição indesejada, instabilidade emocional." },
        "Gebo":     { direta: "Troca justa, parceria, dádiva, equilíbrio entre dar e receber — um vínculo que fortalece os dois lados.", invertida: "Troca desequilibrada, generosidade que vira obrigação, dependência ou dívida emocional." },
        "Wunjo":    { direta: "Alegria, harmonia, realização — a recompensa depois de um esforço sustentado.", invertida: "Tristeza, desarmonia, atraso na conquista, isolamento em meio à busca por pertencimento." },
        "Hagalaz":  { direta: "Ruptura súbita, força inevitável que desestrutura o que já não sustenta — a crise que abre caminho.", invertida: "A mesma força, mas represada: resistência à mudança necessária, crise interna que se arrasta." },
        "Nauthiz":  { direta: "Necessidade, restrição, aprendizado através da falta — o que resiste te ensina a se fortalecer.", invertida: "Privação extrema, desespero, padrões que se repetem e se tornam autodestrutivos." },
        "Isa":      { direta: "Gelo, pausa, imobilidade que traz clareza — um momento em que esperar é a ação certa.", invertida: "Estagnação prolongada, frieza emocional, isolamento, sensação de bloqueio total." },
        "Jera":     { direta: "Colheita, ciclo que se completa no tempo certo — a recompensa de um esforço bem semeado.", invertida: "Colheita adiada, ciclo interrompido, impaciência, esforço que ainda não retornou." },
        "Eihwaz":   { direta: "O teixo — eixo entre vida e morte, resiliência, transformação profunda ao atravessar um obstáculo difícil.", invertida: "Medo da mudança, obstáculo que paralisa, confusão sobre o próprio propósito." },
        "Perthro":  { direta: "Mistério, sorte, o desconhecido — segredos e possibilidades que se revelam no tempo certo.", invertida: "Segredos que prejudicam, azar, estagnação por recusa em arriscar." },
        "Algiz":    { direta: "Proteção, conexão espiritual, instinto de autopreservação — o guardião que vela pelo caminho.", invertida: "Vulnerabilidade, proteção rompida, alerta ignorado, exposição a riscos evitáveis." },
        "Sowilo":   { direta: "O sol — sucesso, vitalidade plena, clareza total, força vital em expansão.", invertida: "Otimismo ilusório, esgotamento, sucesso adiado, algo que ainda está ofuscado." },
        "Tiwaz":    { direta: "O guerreiro justo — vitória através de sacrifício consciente, honra, liderança com integridade.", invertida: "Injustiça, derrota, desequilíbrio de poder, conflito mal conduzido." },
        "Berkana":  { direta: "Nascimento, novo começo, crescimento — energia fértil que nutre o que está brotando.", invertida: "Crescimento estagnado, dificuldades familiares, projeto que ainda não floresce." },
        "Ehwaz":    { direta: "Movimento em parceria, confiança mútua, progresso gradual e sustentado — como cavalo e cavaleiro avançando juntos.", invertida: "Parceria instável, mudança precipitada, falta de confiança no processo ou no outro." },
        "Mannaz":   { direta: "A humanidade — o eu em relação aos outros, cooperação, autoconhecimento.", invertida: "Isolamento, egoísmo, desconexão social, autossabotagem." },
        "Laguz":    { direta: "Água — fluxo intuitivo, emoções profundas, o inconsciente pedindo para ser ouvido.", invertida: "Confusão emocional, intuição distorcida, medo de mergulhar no próprio interior." },
        "Ingwaz":   { direta: "Potencial acumulado, gestação silenciosa — força interna pronta para se manifestar.", invertida: "Potencial estagnado, energia represada, dificuldade em concretizar o que já amadureceu." },
        "Dagaz":    { direta: "O despertar — virada decisiva, clareza repentina, transformação positiva e definitiva.", invertida: "Resistência a uma mudança boa que já está batendo à porta; a virada ainda não foi aceita." },
        "Othala":   { direta: "Herança, lar ancestral, valores de família — patrimônio espiritual ou material que sustenta.", invertida: "Rompimento com as próprias raízes, perda de herança, apego prejudicial ao passado." },

        "Ear":      { direta: "A terra que recebe o que se foi — encerramento definitivo, luto necessário, a aceitação de que algo chegou ao fim e agora vira memória.", invertida: "Resistência ao encerramento, apego ao que já não existe mais, dificuldade em processar uma perda ou virar a página." },
        "Ac":       { direta: "O carvalho — resistência silenciosa, potencial que cresce devagar e com raízes profundas, força que se prova ao longo do tempo.", invertida: "Potencial desperdiçado, teimosia sem propósito, esforço mal direcionado que não encontra terreno para crescer." },
        "Ior":      { direta: "A criatura de duas naturezas — adaptação, capacidade de transitar entre mundos diferentes, versatilidade diante do imprevisto.", invertida: "Estagnação disfarçada de flexibilidade, indecisão entre caminhos opostos, necessidades em excesso que travam o movimento." },
        "Os":       { direta: "A boca do divino — poder da palavra, oratória, poesia e canto como veículos de verdade, mensagem que carrega autoridade.", invertida: "Palavra usada para enganar, promessa vazia, voz calada no momento em que mais precisava ser ouvida." },
        "Yr":       { direta: "O arco — precisão, domínio técnico, habilidade lapidada pela prática, o alvo certo alcançado com foco total.", invertida: "Falta de mira, esforço disperso, habilidade ainda não desenvolvida, ação apressada que erra o objetivo." },
        "Cweorth":  { direta: "O fogo ritual — purificação, renascimento através da dor necessária, transformação profunda que consome o velho para abrir espaço ao novo.", invertida: "Mudança evitada, dor não processada, ciclo de transformação interrompido antes de completar sua purificação." },
        "Chalc":    { direta: "O cálice sagrado — busca por algo maior, jornada de descoberta espiritual, a recompensa que vem de perseverar até o fim da travessia.", invertida: "Busca sem direção, desilusão na procura pelo sagrado, jornada abandonada antes de revelar seu propósito." },
        "Stan":     { direta: "A pedra — fundação sólida, o centro inegociável de uma questão, força que sustenta mesmo quando tudo ao redor se move.", invertida: "Bloqueio rígido, obstáculo imóvel, uma base que virou peso morto e impede o avanço." },
        "Gar":      { direta: "O ponto de convergência — mistério que une todas as coisas, encruzilhada de caminhos, um enigma que só se resolve quando se aceita não entender tudo de imediato.", invertida: "Confusão sem resolução, caminhos que se recusam a convergir, um enigma que se torna obstáculo por resistência em soltar o controle." }
    }
};
DECKS.registrar(runasExpandido);
