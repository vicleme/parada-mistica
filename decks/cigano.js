// =============================================================
//  Baralho: Baralho Cigano (Lenormand)
//  Para editar as cartas ou significados, mexa apenas neste arquivo.
// =============================================================

const cigano = {
    id: "cigano",
    nome: "Petit Lenormand",
    imagemPasta: "cigano",
    imagemExtensao: ".jpg",
    aceitaInversao: false,

    cartas: [
        "O Cavaleiro", "O Trevo", "O Navio", "A Casa", "A Árvore",
        "As Nuvens", "A Serpente", "O Caixão", "As Flores", "A Foice",
        "O Chicote", "O Pássaro", "A Criança", "A Raposa", "O Urso",
        "A Estrela", "A Cegonha", "O Cão", "A Torre", "O Jardim",
        "A Montanha", "O Caminho", "O Rato", "O Coração", "O Anel",
        "O Livro", "A Carta", "O Homem", "A Mulher", "O Lírio",
        "O Sol", "A Lua", "A Chave", "Os Peixes", "A Âncora", "A Cruz"
    ],

    significados: {
        "O Cavaleiro":  { significado: "Notícias chegando rapidamente, movimento em direção ao consulente. O que vem — bom ou ruim depende das cartas ao redor." },
        "O Trevo":      { significado: "Pequena sorte, oportunidade passageira, alívio momentâneo. Não é grande fortuna — é um respiro, uma chance que aparece brevemente." },
        "O Navio":      { significado: "Viagem, distância, comércio, o que está longe ou se afasta. Movimento para fora — mudança, horizonte, estrangeiro." },
        "A Casa":       { significado: "Lar, família, propriedade, segurança. O ambiente doméstico e o que é familiar ao consulente. Carta estável e positiva." },
        "A Árvore":     { significado: "Saúde, crescimento lento, raízes. Indica o estado geral da vida — quando negativa ao redor, aponta para doença ou estagnação." },
        "As Nuvens":    { significado: "Confusão, obscuridade, situação turva. Carta negativa — indica dúvida, pessoa duvidosa, falta de clareza. O que está encoberto." },
        "A Serpente":   { significado: "Falsidade, traição, rival. Pessoa que envolve, seduz ou engana. Pode indicar também desejo e complicação em relações." },
        "O Caixão":     { significado: "Fim, encerramento, doença grave, o que termina. Carta pesada — indica conclusão definitiva ou período de baixa intensa." },
        "As Flores":    { significado: "Alegria, beleza, presente, convite, reconhecimento. Carta positiva — indica momento agradável, celebração, boa recepção." },
        "A Foice":      { significado: "Corte súbito, acidente, perigo, algo inesperado e brusco. Não é só decisão — é ruptura abrupta, muitas vezes dolorosa." },
        "O Chicote":    { significado: "Conflito repetido, discussão, agressão verbal ou física. Indica padrão de briga, abuso ou tensão que se repete." },
        "O Pássaro":    { significado: "Conversas, rumores, nervosismo, casais. Dois pássaros indicam par romântico. A comunicação é intensa — pode ser fofoca ou notícia." },
        "A Criança":    { significado: "Criança real, novo começo, algo pequeno e inocente. O que está no início — frágil, recente, ainda sem forma definida." },
        "A Raposa":     { significado: "Engano, astúcia, falsidade, alguém que age por interesse próprio. Indica trapaça, fraude ou pessoa não confiável. No trabalho, pode ser colega mal-intencionado." },
        "O Urso":       { significado: "Força, poder, figura de autoridade — chefe, figura materna dominante. Pode indicar proteção ou controle excessivo, dependendo do contexto." },
        "A Estrela":    { significado: "Esperança, orientação, fé, inspiração. Carta positiva — indica que o caminho está sendo iluminado, que algo bom está no horizonte." },
        "A Cegonha":    { significado: "Mudança, transformação, chegada de algo novo. Pode indicar gravidez, mudança de fase ou renovação de situação." },
        "O Cão":        { significado: "Amigo leal, pessoa de confiança, apoio. Indica relação de fidelidade — amizade sólida ou aliado próximo." },
        "A Torre":      { significado: "Solidão, isolamento, instituição — hospital, repartição, prisão, empresa grande. Indica distância emocional ou estrutura burocrática." },
        "O Jardim":     { significado: "Espaço público, eventos sociais, encontros, grupos. O que é coletivo — festa, rede de contatos, aparência social." },
        "A Montanha":   { significado: "Obstáculo, bloqueio, algo que impede o avanço. Indica resistência, demora, barreira difícil de superar." },
        "O Caminho":    { significado: "Escolha, bifurcação, alternativas. Indica decisão necessária — dois caminhos à frente, nenhum claramente melhor." },
        "O Rato":       { significado: "Perda, desgaste, roubo, algo que corrói lentamente. Carta negativa — indica deterioração, desperdício, algo sendo subtraído aos poucos." },
        "O Coração":    { significado: "Amor, sentimentos, afeto, desejo. Indica emoções envolvidas na questão — paixão, cuidado, o que o coração quer." },
        "O Anel":       { significado: "Compromisso, contrato, aliança, ciclo. Indica acordo formal ou informal — casamento, parceria, promessa." },
        "O Livro":      { significado: "Segredo, conhecimento oculto, estudo. O que não é revelado — mistério, aprendizado, algo que ainda está escondido." },
        "A Carta":      { significado: "Mensagem, documento, notícia escrita. O que chega formalmente — e-mail, contrato, comunicado oficial." },
        "O Homem":      { significado: "Homem importante para a consulta — parceiro, pai, figura masculina central. Representa o consulente quando é homem." },
        "A Mulher":     { significado: "Mulher importante para a consulta — parceira, mãe, figura feminina central. Representa a consulente quando é mulher." },
        "O Lírio":      { significado: "Maturidade, paz, sexualidade, pureza. Figura paterna, homem mais velho. Indica serenidade — ou rigidez, quando negativo ao redor." },
        "O Sol":        { significado: "Sucesso, energia, clareza, vitória. Carta muito positiva — ilumina e fortalece o que está ao redor." },
        "A Lua":        { significado: "Emoções, intuição, reconhecimento, fama. Indica vida emocional intensa — sonhos, instinto, o que vem de dentro." },
        "A Chave":      { significado: "Solução, resposta, acesso, certeza. Carta positiva — indica que algo se abre, que a resposta está disponível." },
        "Os Peixes":    { significado: "Dinheiro, negócios, abundância, fluxo financeiro. Indica questões materiais — pode ser lucro ou dispersão de recursos." },
        "A Âncora":     { significado: "Estabilidade, perseverança, o que permanece. Indica algo sólido e duradouro — segurança conquistada com esforço." },
        "A Cruz":       { significado: "Destino, sofrimento, karma, fardo. Carta pesada — indica algo inevitável, provação que precisa ser atravessada." },
    }
};
DECKS.registrar(cigano);
