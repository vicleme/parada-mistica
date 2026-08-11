// =============================================================
//  Baralho: Sensitiva Lenormand
//  Versão alternativa do Petit Lenormand com nomes e atmosfera
//  adaptados ao estilo Sensitiva — mais informal e direto.
//  36 cartas, sem inversão.
// =============================================================

const sensitivalenormand = {
    id: "sensitivalenormand",
    nome: "Sensitiva Lenormand",
    imagemPasta: "sensitivalenormand",
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
        "O Cavaleiro":  { significado: "Notícia vindo aí — rápida, boa ou ruim dependendo do que tá do lado. O mensageiro chegando." },
        "O Trevo":      { significado: "Uma sorte pequenininha, um respiro. Não é grande coisa, mas é um alívio no caminho." },
        "O Navio":      { significado: "Viagem, o que tá longe, negócio com estrangeiro. Movimento para fora — distância, horizonte." },
        "A Casa":       { significado: "Lar, família, o que é seu mesmo. Ambiente seguro, o território do consulente." },
        "A Árvore":     { significado: "Saúde, raízes, crescimento lento. Mostra como tá a vida no geral — quando vem com coisa ruim, aponta problema de saúde." },
        "As Nuvens":    { significado: "Confusão, coisa obscura, situação turva. Indica dúvida, pessoa duvidosa, o que tá encoberto." },
        "A Serpente":   { significado: "Falsidade, traição, rival. Alguém que envolve, seduz ou engana. Também pode ser desejo e complicação amorosa." },
        "O Caixão":     { significado: "Fim, encerramento, coisa pesada. Indica conclusão definitiva ou período de baixa intensa." },
        "As Flores":    { significado: "Alegria, presente, convite, celebração. Momento agradável, boa recepção, ser reconhecido." },
        "A Foice":      { significado: "Corte súbito, acidente, algo brusco e inesperado. Ruptura abrupta, muitas vezes dolorosa." },
        "O Chicote":    { significado: "Briga repetida, discussão, agressão verbal ou física. Padrão de conflito que se repete." },
        "O Pássaro":    { significado: "Conversas, fofoca, nervosismo. Dois pássaros = par romântico. Comunicação intensa, pode ser rumor." },
        "A Criança":    { significado: "Criança real, novo começo, algo pequeno e inocente. O que ainda tá no início — frágil e recente." },
        "A Raposa":     { significado: "Engano, astúcia, alguém agindo por interesse próprio. Trapaça, fraude, pessoa não confiável." },
        "O Urso":       { significado: "Força, poder, figura de autoridade — chefe, figura materna dominante. Proteção ou controle excessivo." },
        "A Estrela":    { significado: "Esperança, fé, algo bom no horizonte. O caminho iluminado." },
        "A Cegonha":    { significado: "Mudança, chegada de algo novo. Pode ser gravidez, mudança de fase ou renovação." },
        "O Cão":        { significado: "Amigo leal, pessoa de confiança, apoio. Relação de fidelidade — amizade sólida ou aliado próximo." },
        "A Torre":      { significado: "Solidão, isolamento, instituição — hospital, repartição, empresa grande. Distância emocional." },
        "O Jardim":     { significado: "Espaço público, eventos sociais, grupos. O que é coletivo — festa, rede de contatos." },
        "A Montanha":   { significado: "Obstáculo, bloqueio, coisa difícil de superar. Resistência, demora, barreira pesada." },
        "O Caminho":    { significado: "Escolha, bifurcação, alternativas. Decisão necessária — dois caminhos, nenhum claramente melhor." },
        "O Rato":       { significado: "Perda, desgaste, algo corroendo por dentro. Deterioração, desperdício, subtração lenta." },
        "O Coração":    { significado: "Amor, sentimentos, afeto, desejo. O que o coração quer." },
        "O Anel":       { significado: "Compromisso, contrato, aliança. Casamento, parceria, promessa, ciclo." },
        "O Livro":      { significado: "Segredo, conhecimento oculto, estudo. O que ainda não foi revelado." },
        "A Carta":      { significado: "Mensagem, documento, notícia escrita. O que chega formalmente — e-mail, contrato, comunicado." },
        "O Homem":      { significado: "Homem importante na consulta — parceiro, pai, figura masculina central. O consultante quando é homem." },
        "A Mulher":     { significado: "Mulher importante na consulta — parceira, mãe, figura feminina central. A consultante quando é mulher." },
        "O Lírio":      { significado: "Maturidade, paz, sexualidade, pureza. Figura paterna, homem mais velho. Serenidade — ou rigidez." },
        "O Sol":        { significado: "Sucesso, energia, clareza, vitória. Carta muito positiva — ilumina e fortalece o que tá ao redor." },
        "A Lua":        { significado: "Emoções, intuição, reconhecimento. Vida emocional intensa — sonhos, instinto, o que vem de dentro." },
        "A Chave":      { significado: "Solução, resposta, acesso, certeza. Algo se abre, a resposta tá disponível." },
        "Os Peixes":    { significado: "Dinheiro, negócios, abundância, fluxo financeiro. Questões materiais — lucro ou dispersão de recursos." },
        "A Âncora":     { significado: "Estabilidade, perseverança, o que permanece. Segurança conquistada com esforço." },
        "A Cruz":       { significado: "Destino, sofrimento, karma, fardo. Algo inevitável, uma provação que precisa ser atravessada." },
    }
};
DECKS.registrar(sensitivalenormand);
