// =============================================================
//  BARALHO: Oracle of the Radiant Sun
//
//  84 cartas — 7 naipes planetários (Sol, Lua, Mercúrio, Vênus,
//  Marte, Júpiter, Saturno) x 12 signos do zodíaco (Áries a Peixes).
//  Baseado em astrologia horária; não usa os planetas exteriores.
//
//  Ordem das imagens (1.jpg a 84.jpg): segue a ordem dos naipes
//  abaixo, e dentro de cada naipe a ordem Áries → Peixes.
// =============================================================

const radiantsun = {
    id:              "radiantsun",
    nome:            "Oracle of the Radiant Sun",
    imagemPasta:     "radiantsun",
    imagemExtensao:  ".jpg",
    aceitaInversao:  false,

    cartas: [
        // ── SOL (Fortuna) — 1 a 12 ──────────────────────────────
        "Sol em Áries — Assertion",
        "Sol em Touro — Acquisition",
        "Sol em Gêmeos — Versatility",
        "Sol em Câncer — Resourcefulness",
        "Sol em Leão — Fortune",
        "Sol em Virgem — Health",
        "Sol em Libra — Harmony",
        "Sol em Escorpião — Endurance",
        "Sol em Sagitário — Enthusiasm",
        "Sol em Capricórnio — Achievement",
        "Sol em Aquário — Idealism",
        "Sol em Peixes — Vision",

        // ── LUA (Segurança) — 13 a 24 ────────────────────────────
        "Lua em Áries — Protection",
        "Lua em Touro — Exhaltation",
        "Lua em Gêmeos — Adaptability",
        "Lua em Câncer — Friendship",
        "Lua em Leão — Appreciation",
        "Lua em Virgem — Order",
        "Lua em Libra — Companionship",
        "Lua em Escorpião — Power",
        "Lua em Sagitário — Optimism",
        "Lua em Capricórnio — Practicality",
        "Lua em Aquário — Independence",
        "Lua em Peixes — Empathy",

        // ── MERCÚRIO (Mudança) — 25 a 36 ─────────────────────────
        "Mercúrio em Áries — Restlessness",
        "Mercúrio em Touro — Resistance",
        "Mercúrio em Gêmeos — Excitement",
        "Mercúrio em Câncer — Intuition",
        "Mercúrio em Leão — Drama",
        "Mercúrio em Virgem — Caution",
        "Mercúrio em Libra — Influence",
        "Mercúrio em Escorpião — Extremism",
        "Mercúrio em Sagitário — Discovery",
        "Mercúrio em Capricórnio — Organization",
        "Mercúrio em Aquário — Originality",
        "Mercúrio em Peixes — Inspiration",

        // ── VÊNUS (Amor) — 37 a 48 ───────────────────────────────
        "Vênus em Áries — Lust",
        "Vênus em Touro — Romance",
        "Vênus em Gêmeos — Flattery",
        "Vênus em Câncer — Birth",
        "Vênus em Leão — Affair",
        "Vênus em Virgem — Discrimination",
        "Vênus em Libra — Indecision",
        "Vênus em Escorpião — Secrets",
        "Vênus em Sagitário — Flirtation",
        "Vênus em Capricórnio — Convention",
        "Vênus em Aquário — Detachment",
        "Vênus em Peixes — Submission",

        // ── MARTE (Ação) — 49 a 60 ───────────────────────────────
        "Marte em Áries — Impulsiveness",
        "Marte em Touro — Defence",
        "Marte em Gêmeos — Decision",
        "Marte em Câncer — Quarrel",
        "Marte em Leão — Egotism",
        "Marte em Virgem — Criticism",
        "Marte em Libra — Choice",
        "Marte em Escorpião — Revenge",
        "Marte em Sagitário — Domination",
        "Marte em Capricórnio — Authority",
        "Marte em Aquário — Rebellion",
        "Marte em Peixes — Escape",

        // ── JÚPITER (Ganho) — 61 a 72 ────────────────────────────
        "Júpiter em Áries — Enterprise",
        "Júpiter em Touro — Status",
        "Júpiter em Gêmeos — Bluff",
        "Júpiter em Câncer — Speculation",
        "Júpiter em Leão — Publicity",
        "Júpiter em Virgem — Patience",
        "Júpiter em Libra — Negotiation",
        "Júpiter em Escorpião — Manipulation",
        "Júpiter em Sagitário — Principle",
        "Júpiter em Capricórnio — Control",
        "Júpiter em Aquário — Innovation",
        "Júpiter em Peixes — Seduction",

        // ── SATURNO (Ambição) — 73 a 84 ──────────────────────────
        "Saturno em Áries — Risk",
        "Saturno em Touro — Ostentation",
        "Saturno em Gêmeos — Concentration",
        "Saturno em Câncer — Charity",
        "Saturno em Leão — Generosity",
        "Saturno em Virgem — Isolation",
        "Saturno em Libra — Devotion",
        "Saturno em Escorpião — Inheritance",
        "Saturno em Sagitário — Fulfillment",
        "Saturno em Capricórnio — Riches",
        "Saturno em Aquário — Eccentricity",
        "Saturno em Peixes — Loss",
    ],

    // ─────────────────────────────────────────────────────────
    //  SIGNIFICADOS
    //  ATENÇÃO: estes textos são interpretações próprias, breves,
    //  combinando a natureza do planeta com a do signo — não são
    //  uma reprodução do livro original (que é protegido por
    //  direitos autorais). Para a interpretação oficial completa,
    //  consulte o guia físico do baralho.
    // ─────────────────────────────────────────────────────────
    significados: {
        "Sol em Áries — Assertion":            { significado: "A vontade própria se afirma sem pedir licença. Energia de iniciativa, coragem para começar e dizer o que se quer." },
        "Sol em Touro — Acquisition":          { significado: "Construção paciente de segurança material. O brilho aqui vem do que se conquista e se mantém com constância." },
        "Sol em Gêmeos — Versatility":         { significado: "Capacidade de se adaptar a vários papéis e contextos ao mesmo tempo. Curiosidade e leveza diante da mudança." },
        "Sol em Câncer — Resourcefulness":     { significado: "Engenhosidade nascida da necessidade de proteger o que é querido. Soluções criativas vindas do instinto de cuidado." },
        "Sol em Leão — Fortune":               { significado: "Momento de sorte e reconhecimento. As coisas tendem a se alinhar a favor de quem ousa brilhar." },
        "Sol em Virgem — Health":              { significado: "Atenção ao corpo, à rotina e aos detalhes como forma de cuidado de si. Equilíbrio que vem da disciplina." },
        "Sol em Libra — Harmony":              { significado: "Busca de equilíbrio nas relações e no ambiente. Diplomacia e senso estético como caminho para a paz." },
        "Sol em Escorpião — Endurance":        { significado: "Força para atravessar períodos difíceis sem se quebrar. Resistência que vem da profundidade emocional." },
        "Sol em Sagitário — Enthusiasm":       { significado: "Entusiasmo contagiante por novos horizontes. Fé no futuro e vontade de expandir os próprios limites." },
        "Sol em Capricórnio — Achievement":    { significado: "Resultado concreto de esforço sustentado. Reconhecimento que vem do trabalho bem feito ao longo do tempo." },
        "Sol em Aquário — Idealism":           { significado: "Visão voltada para o coletivo e para o futuro. Convicções fortes sobre como o mundo poderia ser melhor." },
        "Sol em Peixes — Vision":              { significado: "Sensibilidade para enxergar além do óbvio. Imaginação, intuição e abertura ao plano espiritual." },

        "Lua em Áries — Protection":           { significado: "Instinto de defesa rápido e direto. Reação emocional imediata diante de qualquer ameaça ao que importa." },
        "Lua em Touro — Exhaltation":          { significado: "Bem-estar emocional ligado ao conforto, à estabilidade e aos prazeres simples e sensoriais." },
        "Lua em Gêmeos — Adaptability":        { significado: "Emoções que se ajustam rápido a novos cenários. Facilidade para conversar sobre o que se sente." },
        "Lua em Câncer — Friendship":          { significado: "Vínculos afetivos profundos e duradouros. O lar emocional encontrado na companhia de quem se confia." },
        "Lua em Leão — Appreciation":          { significado: "Necessidade emocional de ser visto e valorizado. Generosidade afetiva quando reconhecida." },
        "Lua em Virgem — Order":               { significado: "Conforto emocional encontrado na organização e na rotina. Cuidado expresso através de ações práticas." },
        "Lua em Libra — Companionship":        { significado: "Bem-estar emocional ligado à parceria e ao equilíbrio nas relações próximas." },
        "Lua em Escorpião — Power":            { significado: "Intensidade emocional que busca controle sobre o próprio destino. Sentimentos profundos e pouco superficiais." },
        "Lua em Sagitário — Optimism":         { significado: "Disposição emocional leve, voltada à esperança e à confiança no que está por vir." },
        "Lua em Capricórnio — Practicality":   { significado: "Emoções contidas e canalizadas para soluções concretas. Segurança buscada através da estrutura." },
        "Lua em Aquário — Independence":       { significado: "Necessidade emocional de espaço e autonomia. Vínculos baseados em liberdade mútua." },
        "Lua em Peixes — Empathy":             { significado: "Sensibilidade que absorve o que os outros sentem. Compaixão profunda, às vezes sem limites claros." },

        "Mercúrio em Áries — Restlessness":    { significado: "Mente acelerada, impaciente por respostas rápidas. Pensamento que age antes de terminar de pensar." },
        "Mercúrio em Touro — Resistance":      { significado: "Raciocínio lento e teimoso, que só muda de ideia diante de provas concretas." },
        "Mercúrio em Gêmeos — Excitement":     { significado: "Curiosidade vibrante, mente que salta de assunto em assunto em busca de estímulo." },
        "Mercúrio em Câncer — Intuition":      { significado: "Comunicação guiada mais pelo sentir do que pela lógica. Memória emocional forte." },
        "Mercúrio em Leão — Drama":            { significado: "Expressão teatral e convincente. Ideias comunicadas com paixão e desejo de impressionar." },
        "Mercúrio em Virgem — Caution":        { significado: "Análise cuidadosa antes de qualquer decisão. Atenção a detalhes que outros deixam passar." },
        "Mercúrio em Libra — Influence":       { significado: "Persuasão sutil, palavras escolhidas para convencer com charme em vez de força." },
        "Mercúrio em Escorpião — Extremism":   { significado: "Pensamento que não admite meio-termo. Investigação profunda de motivos ocultos." },
        "Mercúrio em Sagitário — Discovery":   { significado: "Mente aberta a novas ideias e filosofias. Aprendizado através da exploração e da experiência." },
        "Mercúrio em Capricórnio — Organization": { significado: "Pensamento estruturado, voltado a planos práticos e de longo prazo." },
        "Mercúrio em Aquário — Originality":   { significado: "Ideias fora do comum, soluções inesperadas vindas de uma mente independente." },
        "Mercúrio em Peixes — Inspiration":    { significado: "Comunicação intuitiva, quase poética. Pensamentos que vêm de imagens e sensações mais do que de lógica." },

        "Vênus em Áries — Lust":               { significado: "Atração imediata e intensa. Desejo que age sem rodeios nem espera." },
        "Vênus em Touro — Romance":            { significado: "Afeto sensorial, que se expressa através do toque, do prazer e da constância." },
        "Vênus em Gêmeos — Flattery":          { significado: "Sedução através da palavra. Charme leve, jogo de conversa e troca de ideias como flerte." },
        "Vênus em Câncer — Birth":             { significado: "Amor que cria e nutre algo novo. Vínculo profundo, quase familiar, com quem se ama." },
        "Vênus em Leão — Affair":              { significado: "Paixão que busca ser vista e celebrada. Romance vivido com intensidade e generosidade." },
        "Vênus em Virgem — Discrimination":    { significado: "Critério apurado na escolha de parceiros. Amor que se mostra através do cuidado prático." },
        "Vênus em Libra — Indecision":         { significado: "Dificuldade em escolher entre opções afetivas. Busca por equilíbrio que às vezes trava a decisão." },
        "Vênus em Escorpião — Secrets":        { significado: "Intimidade guardada, paixão que prefere o segredo à exposição." },
        "Vênus em Sagitário — Flirtation":     { significado: "Atração leve e aventureira, sem compromisso imediato — o prazer do jogo do flerte." },
        "Vênus em Capricórnio — Convention":   { significado: "Afeto expresso dentro de estruturas reconhecidas — compromisso, responsabilidade, tradição." },
        "Vênus em Aquário — Detachment":       { significado: "Amor que precisa de liberdade. Vínculos baseados em amizade e respeito à individualidade." },
        "Vênus em Peixes — Submission":        { significado: "Entrega afetiva quase total, dissolução dos próprios limites em nome do amor ou da compaixão." },

        "Marte em Áries — Impulsiveness":      { significado: "Ação imediata, sem cálculo prévio. Energia que precisa de movimento agora." },
        "Marte em Touro — Defence":            { significado: "Força usada para proteger o que já é seu. Resistência firme diante de ameaças à própria estabilidade." },
        "Marte em Gêmeos — Decision":          { significado: "Necessidade de decidir rápido entre opções. Ação que se apoia na informação disponível no momento." },
        "Marte em Câncer — Quarrel":           { significado: "Conflitos ligados a família, laços afetivos ou pertencimento. Defesa do território emocional." },
        "Marte em Leão — Egotism":             { significado: "Ação movida pela vontade de afirmar a própria importância. Orgulho que pode gerar atrito." },
        "Marte em Virgem — Criticism":         { significado: "Energia direcionada para apontar falhas e buscar correção. Pode pesar para o lado do julgamento." },
        "Marte em Libra — Choice":             { significado: "Tensão entre agir e manter a harmonia. Decisões que pesam o impacto sobre o outro." },
        "Marte em Escorpião — Revenge":        { significado: "Vontade de reparar uma injustiça sentida profundamente. Energia intensa, difícil de esquecer." },
        "Marte em Sagitário — Domination":     { significado: "Ação voltada a expandir território ou influência. Confiança que pode beirar a arrogância." },
        "Marte em Capricórnio — Authority":    { significado: "Força disciplinada, usada para construir e comandar com método." },
        "Marte em Aquário — Rebellion":        { significado: "Ação contra regras consideradas injustas. Energia voltada à ruptura de padrões antigos." },
        "Marte em Peixes — Escape":            { significado: "Energia que prefere se retirar do confronto a enfrentá-lo de frente." },

        "Júpiter em Áries — Enterprise":       { significado: "Iniciativa ousada, vontade de começar algo grande sem hesitar." },
        "Júpiter em Touro — Status":           { significado: "Expansão através do acúmulo de recursos e reconhecimento material." },
        "Júpiter em Gêmeos — Bluff":           { significado: "Confiança exagerada na própria capacidade de argumentar — às vezes além do que se sabe de fato." },
        "Júpiter em Câncer — Speculation":     { significado: "Aposta guiada pela intuição e pelo desejo de segurança futura." },
        "Júpiter em Leão — Publicity":         { significado: "Expansão através da visibilidade. Generosidade que também busca ser reconhecida." },
        "Júpiter em Virgem — Patience":        { significado: "Crescimento construído aos poucos, com método e atenção aos detalhes." },
        "Júpiter em Libra — Negotiation":      { significado: "Expansão através de acordos justos. Habilidade de encontrar o ponto de equilíbrio entre partes." },
        "Júpiter em Escorpião — Manipulation": { significado: "Influência exercida nos bastidores. Poder usado de forma estratégica, nem sempre transparente." },
        "Júpiter em Sagitário — Principle":    { significado: "Crescimento guiado por valores e ética. Fé inabalável em ideais maiores." },
        "Júpiter em Capricórnio — Control":    { significado: "Expansão conquistada através de estrutura, planejamento e disciplina." },
        "Júpiter em Aquário — Innovation":     { significado: "Crescimento através de ideias originais que rompem com o convencional." },
        "Júpiter em Peixes — Seduction":       { significado: "Expansão através do encanto e da capacidade de tocar emocionalmente o outro." },

        "Saturno em Áries — Risk":             { significado: "Limite testado através da ousadia. Lição aprendida ao agir antes de estar totalmente pronto." },
        "Saturno em Touro — Ostentation":      { significado: "Tensão entre a necessidade de mostrar status e o medo de não ter o suficiente." },
        "Saturno em Gêmeos — Concentration":   { significado: "Disciplina mental, foco exigido para dominar um assunto com profundidade." },
        "Saturno em Câncer — Charity":         { significado: "Responsabilidade exercida através do cuidado com quem precisa — dever que nasce do afeto." },
        "Saturno em Leão — Generosity":        { significado: "Maturidade que aprende a doar sem esperar aplausos em troca." },
        "Saturno em Virgem — Isolation":       { significado: "Necessidade de se afastar para reorganizar a própria rotina e exigências internas." },
        "Saturno em Libra — Devotion":         { significado: "Compromisso sério e duradouro, construído com responsabilidade mútua." },
        "Saturno em Escorpião — Inheritance":  { significado: "Lições e recursos transmitidos de uma geração para outra, nem sempre fáceis de carregar." },
        "Saturno em Sagitário — Fulfillment":  { significado: "Realização que vem depois de uma longa busca por sentido e verdade." },
        "Saturno em Capricórnio — Riches":     { significado: "Recompensa concreta de anos de trabalho disciplinado e paciente." },
        "Saturno em Aquário — Eccentricity":   { significado: "Aceitação madura da própria diferença, mesmo que isso afaste do convencional." },
        "Saturno em Peixes — Loss":            { significado: "Lição aprendida através de uma despedida ou de algo que precisou ser deixado para trás." },
    }
};

// Registra o baralho no sistema — não remova esta linha
DECKS.registrar(radiantsun);
