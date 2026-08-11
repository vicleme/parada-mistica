// =============================================================
//  BARALHO: Oráculo de Belline
//
//  53 cartas — síntese de Tarot e astrologia, criada por Edmond
//  Lemoine no séc. XIX e popularizada por Belline. 49 cartas se
//  dividem em 7 grupos de 7, ligados aos 7 planetas clássicos
//  (Sol, Lua, Mercúrio, Vênus, Marte, Júpiter, Saturno). As 3
//  cartas iniciais (Destino, Estrela do Homem, Estrela da Mulher)
//  não têm regência planetária e costumam ter peso especial na
//  leitura. A 53ª, Carta Azul, também não tem regência — é uma
//  carta de proteção/bom augúrio.
//
//  O oráculo sempre se lê ao direito (sem inversão): se sair
//  invertida, apenas recoloque-a na posição normal.
//
//  Ordem das imagens (1.jpg a 53.jpg): segue exatamente a ordem
//  numerada abaixo.
// =============================================================

const belline = {
    id: "belline",
    nome: "Oráculo de Belline",
    imagemPasta: "belline",
    imagemExtensao: ".jpg",
    aceitaInversao: false,

    cartas: [
        // ── CARTAS ESPECIAIS (sem regência planetária) ──────────
        "01 - Destino",
        "02 - Estrela do Homem",
        "03 - Estrela da Mulher",

        // ── SOL — 04 a 10 ────────────────────────────────────────
        "04 - Nascimento",
        "05 - Sucesso",
        "06 - Elevação",
        "07 - Honras",
        "08 - Amizade",
        "09 - Campo e Saúde",
        "10 - Presentes",

        // ── LUA — 11 a 17 ────────────────────────────────────────
        "11 - Traição",
        "12 - Partida",
        "13 - Inconstância",
        "14 - Descoberta",
        "15 - Água",
        "16 - Casa",
        "17 - Doença",

        // ── MERCÚRIO — 18 a 24 ───────────────────────────────────
        "18 - Mudança",
        "19 - Dinheiro",
        "20 - Inteligência",
        "21 - Perda",
        "22 - Projeto",
        "23 - Tráfego",
        "24 - Notícias",

        // ── VÊNUS — 25 a 31 ──────────────────────────────────────
        "25 - Prazeres",
        "26 - Paz",
        "27 - União",
        "28 - Família",
        "29 - Amor",
        "30 - Mesa",
        "31 - Paixões",

        // ── MARTE — 32 a 38 ──────────────────────────────────────
        "32 - Maldade",
        "33 - Processo",
        "34 - Despotismo",
        "35 - Inimigo",
        "36 - Negociações",
        "37 - Fogo",
        "38 - Acidente",

        // ── JÚPITER — 39 a 45 ────────────────────────────────────
        "39 - Apoio",
        "40 - Beleza",
        "41 - Herança",
        "42 - Sabedoria",
        "43 - Fama",
        "44 - Casualidade",
        "45 - Felicidade",

        // ── SATURNO — 46 a 52 ────────────────────────────────────
        "46 - Infortúnio",
        "47 - Esterilidade",
        "48 - Fatalidade",
        "49 - Graça",
        "50 - Ruína",
        "51 - Atraso",
        "52 - Claustro",

        // ── CARTA ESPECIAL FINAL ─────────────────────────────────
        "53 - Carta Azul",
    ],

    significados: {
        "01 - Destino":            { significado: "Carta de maior peso do oráculo. Indica que os acontecimentos seguem um curso traçado, além do controle do consulente — força maior, karma ou desígnio. Costuma dominar a leitura e colorir o sentido das cartas ao redor." },
        "02 - Estrela do Homem":   { significado: "Representa o consulente ou uma figura masculina central na questão. Marca a influência, o caminho e as energias que atuam sobre esse homem no momento da consulta." },
        "03 - Estrela da Mulher":  { significado: "Representa a consulente ou uma figura feminina central na questão. Marca a influência, o caminho e as energias que atuam sobre essa mulher no momento da consulta." },

        "04 - Nascimento":         { significado: "Começo, gestação de algo novo, potencial que desabrocha. Pode ser um nascimento literal ou o início simbólico de um projeto, uma fase ou uma relação." },
        "05 - Sucesso":            { significado: "Conquista, êxito, objetivo alcançado. Indica que o esforço empregado está — ou vai ser — recompensado. Carta francamente positiva." },
        "06 - Elevação":           { significado: "Ascensão, promoção, reconhecimento crescente. Indica subida de posição — social, profissional ou pessoal — de forma gradual e sólida." },
        "07 - Honras":             { significado: "Reconhecimento público, prestígio, distinção. Indica que o mérito do consulente será notado e celebrado por outros." },
        "08 - Amizade":            { significado: "Vínculo leal, apoio sincero, companheirismo. Indica uma relação de confiança que sustenta o consulente — presente ou por vir." },
        "09 - Campo e Saúde":      { significado: "Vitalidade, natureza, equilíbrio físico. Indica bem-estar recuperado ou mantido, e também tudo o que se relaciona à terra, ao trabalho rural ou ao descanso ao ar livre." },
        "10 - Presentes":          { significado: "Generosidade, dádiva, recompensa inesperada. Indica algo bom que chega sem grande esforço — presente material ou gesto de carinho." },

        "11 - Traição":            { significado: "Deslealdade, engano, confiança quebrada. Carta de alerta — indica que alguém próximo pode não estar agindo de boa-fé." },
        "12 - Partida":            { significado: "Afastamento, viagem, separação física. Indica movimento de saída — de um lugar, de uma pessoa ou de uma fase da vida." },
        "13 - Inconstância":       { significado: "Instabilidade, indecisão, mudanças de humor ou de rumo. Indica falta de firmeza — em uma pessoa, em uma situação ou nos próprios sentimentos do consulente." },
        "14 - Descoberta":         { significado: "Revelação, verdade que vem à tona, segredo desvendado. Indica que algo antes oculto será esclarecido — para o bem ou para o mal, conforme as cartas vizinhas." },
        "15 - Água":               { significado: "Emoção, fluidez, sensibilidade. Pode indicar também viagem por mar, ambiente úmido ou uma situação que exige adaptação e delicadeza." },
        "16 - Casa":               { significado: "Lar, família, base de estabilidade. Indica assuntos domésticos, mudança de residência ou o próprio ambiente familiar do consulente." },
        "17 - Doença":             { significado: "Enfermidade, fragilidade física ou emocional. Convida a cuidar da saúde — própria ou de alguém próximo — antes que o quadro se agrave." },

        "18 - Mudança":            { significado: "Transformação, virada de página, transição de fase. Indica que algo está se movendo — emprego, relação, cenário — abrindo espaço para o novo." },
        "19 - Dinheiro":           { significado: "Recursos financeiros, ganho material, estabilidade econômica. Indica entrada de dinheiro ou uma fase de maior segurança financeira." },
        "20 - Inteligência":       { significado: "Raciocínio, clareza mental, capacidade de resolver problemas com lógica. Indica que a mente está afiada — bom momento para decisões e estudos." },
        "21 - Perda":              { significado: "Prejuízo, algo que escapa das mãos, oportunidade perdida. Convida à cautela com bens, tempo ou relações que estejam se esvaindo." },
        "22 - Projeto":            { significado: "Planejamento, ideia em construção, iniciativa em andamento. Indica que algo está sendo arquitetado — ainda não realizado, mas em curso." },
        "23 - Tráfego":            { significado: "Movimento intenso, deslocamentos, trânsito de pessoas ou informações. Indica agenda cheia, correria ou negociações em andamento." },
        "24 - Notícias":           { significado: "Mensagem, informação que chega, comunicação importante. O tom da notícia — boa ou ruim — é revelado pelas cartas ao redor." },

        "25 - Prazeres":           { significado: "Satisfação, diversão, momentos de leveza. Indica ocasiões de desfrute pessoal — sociais, sensoriais ou de lazer." },
        "26 - Paz":                { significado: "Harmonia, tranquilidade, resolução de conflitos. Indica um período de calma restabelecida, tanto interna quanto nas relações." },
        "27 - União":              { significado: "Aliança, casamento, parceria consolidada. Indica compromisso firmado — afetivo, comercial ou familiar." },
        "28 - Família":            { significado: "Vínculos de sangue, herança afetiva, dinâmica do núcleo familiar. Indica assuntos que envolvem parentes próximos." },
        "29 - Amor":               { significado: "Sentimento, romance, afeto verdadeiro. Uma das cartas mais favoráveis do oráculo para questões do coração." },
        "30 - Mesa":               { significado: "Convivência, celebração, encontros sociais em torno da comida e da conversa. Indica reuniões, festas ou negociações feitas em ambiente cordial." },
        "31 - Paixões":            { significado: "Intensidade emocional, desejo forte, envolvimento apaixonado. Pode indicar tanto arrebatamento amoroso quanto excesso que precisa de equilíbrio." },

        "32 - Maldade":            { significado: "Má intenção, hostilidade, ação de má-fé. Carta de alerta sobre energias ou pessoas nocivas ao redor do consulente." },
        "33 - Processo":           { significado: "Disputa, questão legal, conflito formal. Indica processo judicial, litígio ou uma questão que se arrasta e exige resolução formal." },
        "34 - Despotismo":         { significado: "Autoritarismo, abuso de poder, imposição. Indica alguém — ou uma situação — que tenta controlar de forma rígida e unilateral." },
        "35 - Inimigo":            { significado: "Oposição declarada, rival, adversário. Indica presença de alguém contrário aos interesses do consulente." },
        "36 - Negociações":        { significado: "Acordos, tratativas, discussões em busca de consenso. Indica processo de negociação em curso — comercial, jurídico ou pessoal." },
        "37 - Fogo":               { significado: "Energia intensa, paixão, impulso — mas também risco de descontrole. Pode indicar entusiasmo transformador ou perigo de destruição, conforme o contexto." },
        "38 - Acidente":           { significado: "Imprevisto, contratempo súbito, evento fora do controle. Convida à atenção redobrada e à prudência nos próximos passos." },

        "39 - Apoio":              { significado: "Suporte, proteção, alguém que ampara o consulente. Indica ajuda concreta chegando — de uma pessoa, instituição ou circunstância favorável." },
        "40 - Beleza":             { significado: "Estética, charme, valorização da aparência ou da arte. Indica atração, admiração ou um momento de brilho pessoal." },
        "41 - Herança":            { significado: "Bens recebidos, legado, ganho vindo de gerações anteriores. Pode ser herança material ou um traço, valor e talento transmitido." },
        "42 - Sabedoria":          { significado: "Discernimento, maturidade, conhecimento adquirido pela experiência. Indica boas decisões guiadas por reflexão e ponderação." },
        "43 - Fama":               { significado: "Notoriedade, reconhecimento amplo, exposição pública. Indica que o nome do consulente ganha destaque — para o bem, em geral." },
        "44 - Casualidade":        { significado: "Acaso, coincidência, evento fortuito. Indica que fatores fora do planejamento vão influenciar o desfecho da questão." },
        "45 - Felicidade":         { significado: "Contentamento, realização, alegria genuína. Uma das cartas mais favoráveis do oráculo — indica bem-estar duradouro." },

        "46 - Infortúnio":         { significado: "Azar, contratempo, período difícil. Indica obstáculos surgindo — convida à paciência e ao cuidado redobrado." },
        "47 - Esterilidade":       { significado: "Estagnação, falta de frutos, esforço que não avança. Indica período em que os resultados demoram a aparecer, exigindo perseverança." },
        "48 - Fatalidade":         { significado: "Desfecho inevitável, destino marcado, evento de grande peso. Uma das cartas mais fortes e sérias do oráculo — costuma anular influências positivas próximas." },
        "49 - Graça":              { significado: "Bênção, favor recebido, proteção espiritual. Indica auxílio que chega de forma quase inesperada, aliviando um momento difícil." },
        "50 - Ruína":              { significado: "Colapso, perda estrutural, desmoronamento de algo que parecia sólido. Indica necessidade de reconstrução após uma queda significativa." },
        "51 - Atraso":             { significado: "Demora, obstáculo temporário, adiamento. Indica que os planos vão se concretizar, mas não no ritmo esperado — pede paciência." },
        "52 - Claustro":           { significado: "Isolamento, recolhimento, retiro voluntário ou imposto. Pode indicar necessidade de introspecção, ou situação de confinamento e limitação." },

        "53 - Carta Azul":         { significado: "Carta de proteção e bom augúrio, sem regência planetária. Anuncia que a situação em questão terá desfecho positivo — e que eventuais dificuldades serão superadas. Funciona como um talismã dentro da leitura." },
    }
};

// Registra o baralho no sistema — não remova esta linha
DECKS.registrar(belline);
