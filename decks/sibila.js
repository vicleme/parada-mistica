// =============================================================
//  Baralho: Vera Sibilla Italiana
//  Para editar as cartas ou significados, mexa apenas neste arquivo.
// =============================================================

const sibila = {
    id: "sibila",
    nome: "Vera Sibilla",
    imagemPasta: "sibila",
    imagemExtensao: ".jpg",
    aceitaInversao: false,

    cartas: [
        // ── OUROS ───────────────────────────────────────────
        "Stanza",
        "La Lettera",
        "Presente di Pietre Preziose",
        "Falsità",
        "Malinconia",
        "Il Pensiero",
        "Bambino",
        "La Donna di Servizio",
        "I Delirant",
        "Il Ladro",
        "Messagiere",
        "Dona Maritata",
        "Mercante",

        // ── ESPADAS ─────────────────────────────────────────
        "Dispiacere",
        "Vecchia Signora",
        "Vedovo",
        "Ammalato",
        "Morte",
        "Sospiri",
        "Disgrazia",
        "Gelosia",
        "Prigione",
        "Militare",
        "Il Nemico",
        "Nemica",
        "Sacerdote",

        // ── COPAS ───────────────────────────────────────────
        "La Conversazione",
        "Casa",
        "Belvedere",
        "Amore",
        "Allegrezza di Cuore",
        "Denaro",
        "Letterato",
        "Speranza",
        "Fedeltà",
        "Costanza",
        "L'Amante",
        "L'Amante — Consulente",
        "Gran Signore",

        // ── PAUS ────────────────────────────────────────────
        "Imeneo",
        "La Superbia",
        "Viaggio",
        "L'Amica",
        "Fortuna",
        "Consolante Sorpresa",
        "Gran Consolazione",
        "La Riunione",
        "L'Allegria",
        "La Leggerezza",
        "Domestico",
        "Giovine Fanciulla",
        "Dottore",
    ],

    significados: {
        // ── OUROS ───────────────────────────────────────────
        "Stanza":                      { significado: "Lugar, ambiente, espaço íntimo ou de trabalho. Indica o cenário onde algo ocorre — conversa reservada, reunião privada, intimidade. As cartas ao redor revelam o contexto." },
        "La Lettera":                  { significado: "Notícia, mensagem, informação chegando. O conteúdo — bom ou ruim — é definido pelas cartas ao redor." },
        "Presente di Pietre Preziose": { significado: "Presente, ganho, benefício material. Pode indicar generosidade genuína ou interesse velado, dependendo do contexto." },
        "Falsità":                     { significado: "Mentira, falsidade, traição, fofoca. Carta negativa — indica engano, má-fé ou autossabotagem no ambiente da consulta." },
        "Malinconia":                  { significado: "Tristeza, melancolia, desânimo, fadiga emocional. Indica um momento de baixa — passageiro, mas real. Luto, dependência, vazio." },
        "Il Pensiero":                 { significado: "Pensamentos, intenções, estratégia mental. A mente em atividade — pode ser planejamento inteligente ou indecisão paralisante." },
        "Bambino":                     { significado: "Criança, novo começo, algo frágil no início. Indica inocência, gravidez, projeto nascente — requer cuidado." },
        "La Donna di Servizio":        { significado: "Pessoa prestativa, serviço, ajuda concreta. Figura feminina dedicada ao trabalho e ao cuidado dos outros." },
        "I Delirant":                  { significado: "Más influências, irresponsabilidade, excesso. Indica companhias prejudiciais, falta de noção, comportamento imprudente." },
        "Il Ladro":                    { significado: "Roubo, sabotagem, perda por descuido alheio. Alguém tira vantagem — promessas não cumpridas, traição velada." },
        "Messagiere":                  { significado: "Mensageiro, notícias dadas pessoalmente, intermediário. Pode indicar mediação, entregas, contas ou dívidas." },
        "Dona Maritata":               { significado: "Mulher casada, figura materna, responsabilidade doméstica. Representa obrigação, rotina familiar, influência feminina estabelecida." },
        "Mercante":                    { significado: "Comércio, negócios, carreira, homem ligado ao trabalho e ao dinheiro. Figura prática e orientada a resultados." },

        // ── ESPADAS ─────────────────────────────────────────
        "Dispiacere":                  { significado: "Más notícias, desgosto, fracasso, tristeza. Carta pesada — nega o resultado positivo das cartas ao redor." },
        "Vecchia Signora":             { significado: "Mulher idosa, algo que diminui ou se esgota progressivamente. O que está chegando ao fim — apego ao passado, o que é velho ou ultrapassado." },
        "Vedovo":                      { significado: "Luto, perda traumática, separação, solidão. Homem solitário — viúvo, separado. Indica afastamento forçado ou ritual de encerramento." },
        "Ammalato":                    { significado: "Doença, estagnação, desgaste. Indica fraqueza física ou emocional, algo que consome lentamente." },
        "Morte":                       { significado: "Término, interrupção definitiva. Não é metáfora — indica fim real de algo. Nega a sequência das cartas ao redor." },
        "Sospiri":                     { significado: "Espera, ansiedade, instabilidade psicológica. O que ainda não chegou e gera angústia — atraso, suspense, agora não." },
        "Disgrazia":                   { significado: "Desgraça, acidente, ruptura violenta. Discussão acalorada, queda, dano físico ou emocional súbito." },
        "Gelosia":                     { significado: "Ciúme, crise, desespero, perdas. Momento crítico de instabilidade emocional — inveja, lágrimas, disputa." },
        "Prigione":                    { significado: "Bloqueio, prisão, situação forçada. O que prende ou obriga — estagnação imposta, gravidez não planejada, limitação." },
        "Militare":                    { significado: "Violência, conflito, agressividade. Pessoa fardada, lugares hostis, violência psicológica ou física." },
        "Il Nemico":                   { significado: "Inimigo declarado, homem que age contra o consulente. Pode indicar autodestrutividade, vício ou sigilo prejudicial." },
        "Nemica":                      { significado: "Mulher que trabalha contra o consulente, geralmente às escondidas. Rival, invejosa, figura hostil feminina." },
        "Sacerdote":                   { significado: "Lei, tribunal, advogado, autoridade do Estado. Homem frio e distante — pode representar o sistema jurídico ou um parceiro inflexível." },

        // ── COPAS ───────────────────────────────────────────
        "La Conversazione":            { significado: "Palavras, conversa, troca de informações. Carta neutra — o tom da conversa depende das cartas ao redor." },
        "Casa":                        { significado: "Lar, família, construção, solidez. O núcleo do assunto — a base, o por quê de algo. Carta positiva." },
        "Belvedere":                   { significado: "O que se aproxima, algo chegando em direção ao consulente. Boa notícia, expectativa, movimento positivo. Carta positiva." },
        "Amore":                       { significado: "Amor, paixão, atração, força expansiva. Pode ser novo amor ou promoção — uma força que chega com intensidade, nem sempre racional." },
        "Allegrezza di Cuore":         { significado: "Alegria, felicidade, noivado, envolvimento romântico. Resultado feliz, ainda que possa ser breve." },
        "Denaro":                      { significado: "Dinheiro, riqueza, o que vem do passado ou por interesse. Pode indicar ganho real ou ação motivada por lucro." },
        "Letterato":                   { significado: "Homem intelectual, advogado, contador, conselheiro. Figura preparada e influente — pode ser aliado ou manipulador, conforme o contexto." },
        "Speranza":                    { significado: "Esperança, proteção, investimento. Carta positiva — indica fé, amparo, algo que vale a pena aguardar." },
        "Fedeltà":                     { significado: "Fidelidade, lealdade, amor correspondido. O que está de acordo com o plano — relação sólida, cumprimento do combinado." },
        "Costanza":                    { significado: "Firmeza, estabilidade, tudo que dura. Bom resultado após esforço — o que não cede, o que resiste ao tempo." },
        "L'Amante":                    { significado: "Jovem solteiro, artístico, sincero, apaixonado. Figura masculina jovem e romântica." },
        "L'Amante — Consulente":       { significado: "A consulente, mulher solteira, fiel. Representa a própria pessoa que consulta, ou sua melhor amiga." },
        "Gran Signore":                { significado: "Homem maduro, confiável, pai, chefe, protetor. Figura de autoridade afetiva — sábio, encantador, muito cortejado." },

        // ── PAUS ────────────────────────────────────────────
        "Imeneo":                      { significado: "Casamento, contrato, união, tudo que une formalmente. Parceria, assinatura, fertilidade — o que compromete." },
        "La Superbia":                 { significado: "Oportunidade favorável colocada pelo destino. Melhora cartas positivas ao redor, atenua as negativas — uma espécie de amuleto." },
        "Viaggio":                     { significado: "Viagem, movimento, mudança de rumo, novo projeto. Meios de transporte, deslocamento físico ou mental." },
        "L'Amica":                     { significado: "Amiga, figura feminina útil e bem-intencionada. Companhia, sociedade, apoio genuíno." },
        "Fortuna":                     { significado: "Sorte, realização material, sucesso que vem de fora do esforço pessoal. Boa sorte — situação além do controle do consulente, favorável." },
        "Consolante Sorpresa":         { significado: "Surpresa positiva, resultado inesperadamente bom. Esforço mínimo com excelente resultado — algo que muda favoravelmente sem aviso." },
        "Gran Consolazione":           { significado: "Grande recuperação, bem-estar, estabilidade após dúvidas. Dificuldades que se dissipam — momento de alívio real." },
        "La Riunione":                 { significado: "Reencontro, reunião, reconciliação. Voltar ao passado para resolver algo — restaurar vínculos, cura, mais de uma pessoa envolvida." },
        "L'Allegria":                  { significado: "Alegria, bom humor, realização pessoal. Franqueza nas relações — momento de leveza genuína." },
        "La Leggerezza":               { significado: "Leveza, imprudência, coisas efêmeras. Carta que enfraquece o peso das cartas ao redor — positivas e negativas. O que é frágil e passageiro." },
        "Domestico":                   { significado: "Pessoa prestativa, discreta, cheia de segredos. Educada e aparentemente inofensiva — mas a lealdade não é garantida." },
        "Giovine Fanciulla":           { significado: "Jovem mulher obediente, doce, inexperiente. Filha, irmã, parente jovem — figura confiável mas ingênua." },
        "Dottore":                     { significado: "Homem maduro e influente, profissional, conselheiro. Quem tem a resposta certa — advogado, médico, juiz. Não é velho, mas é experiente." },
    }
};
DECKS.registrar(sibila);
