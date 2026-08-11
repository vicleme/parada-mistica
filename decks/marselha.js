// =============================================================
//  Baralho: Tarot de Marselha
//  Sistema clássico francês, séculos XVII–XVIII.
//  78 cartas com nomes tradicionais da tradição marselhesa.
// =============================================================

const marselha = {
    id: "marselha",
    nome: "Tarot de Marselha",
    imagemPasta: "marselha",
    imagemExtensao: ".jpg",
    aceitaInversao: true,

    cartas: [
        // Arcanos Maiores
        "Le Mat (O Louco)", "Le Bateleur (O Mago)", "La Papesse (A Papisa)", "L'Impératrice (A Imperatriz)", "L'Empereur (O Imperador)", "Le Pape (O Papa)",
        "L'Amoureux (Os Amantes)", "Le Chariot (O Carro)", "La Justice (A Justiça)", "L'Ermite (O Eremita)", "La Roue de Fortune (Roda da Fortuna)",
        "La Force (A Força)", "Le Pendu (O Enforcado)", "L'Arcane sans Nom (A Morte)", "Tempérance (Temperança)", "Le Diable (O Diabo)",
        "La Maison Dieu (A Torre)", "L'Étoile (A Estrela)", "La Lune (A Lua)", "Le Soleil (O Sol)", "Le Jugement (O Julgamento)", "Le Monde (O Mundo)",
        // Copas
        "Ás de Copas", "2 de Copas", "3 de Copas", "4 de Copas", "5 de Copas",
        "6 de Copas", "7 de Copas", "8 de Copas", "9 de Copas", "10 de Copas",
        "Valete de Copas", "Cavaleiro de Copas", "Rainha de Copas", "Rei de Copas",
        // Ouros
        "Ás de Ouros", "2 de Ouros", "3 de Ouros", "4 de Ouros", "5 de Ouros",
        "6 de Ouros", "7 de Ouros", "8 de Ouros", "9 de Ouros", "10 de Ouros",
        "Valete de Ouros", "Cavaleiro de Ouros", "Rainha de Ouros", "Rei de Ouros",
        // Paus
        "Ás de Paus", "2 de Paus", "3 de Paus", "4 de Paus", "5 de Paus",
        "6 de Paus", "7 de Paus", "8 de Paus", "9 de Paus", "10 de Paus",
        "Valete de Paus", "Cavaleiro de Paus", "Rainha de Paus", "Rei de Paus",
        // Espadas
        "Ás de Espadas", "2 de Espadas", "3 de Espadas", "4 de Espadas", "5 de Espadas",
        "6 de Espadas", "7 de Espadas", "8 de Espadas", "9 de Espadas", "10 de Espadas",
        "Valete de Espadas", "Cavaleiro de Espadas", "Rainha de Espadas", "Rei de Espadas"
    ],

    significados: {
        "Le Mat (O Louco)":                    { direta: "Liberdade, espontaneidade, início de jornada sem mapa. O que está fora do sistema — impulso puro, aventura, o passo antes do primeiro.", invertida: "Imprudência, irresponsabilidade, fuga da realidade" },
        "Le Bateleur (O Mago)":                { direta: "Habilidade manual, astúcia, iniciativa. O que está nas mãos — poder de agir, manipular o ambiente, jogo de presença.", invertida: "Charlatanismo, manipulação, dispersão de energia" },
        "La Papesse (A Papisa)":               { direta: "Saber guardado, interioridade, silêncio fértil. O livro fechado — conhecimento que ainda não se revelou, gestação do sentido.", invertida: "Segredo prejudicial, negação, bloqueio do saber" },
        "L'Impératrice (A Imperatriz)":        { direta: "Fecundidade, beleza, vida que transborda. Natureza, amor sensível, o feminino em expansão.", invertida: "Excesso, dependência afetiva, bloqueio criativo" },
        "L'Empereur (O Imperador)":            { direta: "Estrutura, domínio, poder estabelecido. Lei, ordem, aquele que delimita e protege.", invertida: "Rigidez, tirania, controle que sufoca" },
        "Le Pape (O Papa)":                    { direta: "Tradição, transmissão, mediação. A ponte entre o alto e o baixo — ensino, rito, voz da instituição.", invertida: "Dogmatismo, obediência cega, autoridade opressora" },
        "L'Amoureux (Os Amantes)":             { direta: "Escolha, cruzamento, atração. O momento da bifurcação — o coração decide o que a mente ainda não sabe.", invertida: "Indecisão paralisante, conflito entre desejo e dever" },
        "Le Chariot (O Carro)":                { direta: "Vitória em movimento, conquista, controle das forças opostas. A vontade que avança.", invertida: "Derrota, perda de direção, forças que se anulam" },
        "La Justice (A Justiça)":              { direta: "Equilíbrio, exatidão, julgamento frio. A espada corta e a balança pesa — sem misericórdia, sem erro.", invertida: "Injustiça, parcialidade, desequilíbrio nas decisões" },
        "L'Ermite (O Eremita)":                { direta: "Recolhimento, busca interior, sabedoria conquistada em solidão. A lanterna ilumina apenas o próximo passo.", invertida: "Isolamento estéril, recusa ao mundo, falta de guia" },
        "La Roue de Fortune (Roda da Fortuna)":{ direta: "Ciclo, mudança de fase, força do destino. O que sobe e desce — o momento em que o giro favorece.", invertida: "Má sorte, resistência ao ciclo, momento desfavorável" },
        "La Force (A Força)":                  { direta: "Domínio suave, coragem que não força. A boca do leão aberta — poder pela presença, não pela violência.", invertida: "Fraqueza, brutalidade, medo disfarçado de força" },
        "Le Pendu (O Enforcado)":              { direta: "Suspensão, perspectiva invertida, sacrifício voluntário. O que para para ver melhor — pausa necessária.", invertida: "Estagnação sem sentido, recusa a ceder, martírio inútil" },
        "L'Arcane sans Nom (A Morte)":         { direta: "Corte, ceifa, transformação radical. O que termina para que algo novo possa começar — sem exceções.", invertida: "Resistência ao fim, medo da mudança, demora em soltar" },
        "Tempérance (Temperança)":             { direta: "Fluxo, combinação, alquimia do cotidiano. O que se mistura e se equilibra — paciência, arte de dosar.", invertida: "Excesso, desequilíbrio, conflito de forças opostas" },
        "Le Diable (O Diabo)":                 { direta: "Matéria, pulsão, o que acorrenta pelo desejo. Força bruta, sexualidade, prazer que prende.", invertida: "Libertação das amarras, clareza sobre vícios, recusa ao apego" },
        "La Maison Dieu (A Torre)":            { direta: "Ruptura súbita, queda do que foi construído sobre base falsa. O raio revela — e o que cai era frágil desde sempre.", invertida: "Desastre evitado, mudança lenta, resistência ao colapso" },
        "L'Étoile (A Estrela)":                { direta: "Renovação, fé serena, fluxo restaurador. A água que corre e os astros que orientam — esperança concreta.", invertida: "Desânimo, ilusão, fé sem fundamento" },
        "La Lune (A Lua)":                     { direta: "Profundeza, instinto, o que emerge do inconsciente. As marés da psique — sonho, medo, o que não se vê à luz do dia.", invertida: "Ilusão, engano, confusão que paralisa" },
        "Le Soleil (O Sol)":                   { direta: "Clareza, alegria plena, energia vital que ilumina. O que floresce à luz — sucesso, saúde, verdade revelada.", invertida: "Arrogância, superficialidade, energia mal aproveitada" },
        "Le Jugement (O Julgamento)":          { direta: "Chamado, despertar, avaliação final. A trombeta soa — o que estava morto ressurge, o que estava escondido aparece.", invertida: "Autocrítica destrutiva, julgamento distorcido, negação do chamado" },
        "Le Monde (O Mundo)":                  { direta: "Completude, dança, integração plena. O ciclo se fecha com harmonia — realização, totalidade, o momento em que tudo faz sentido.", invertida: "Falta de conclusão, ciclo incompleto, atraso do desfecho" },

        "Ás de Copas":        { direta: "Fonte de emoção, abertura do coração, novo sentimento nascendo", invertida: "Bloqueio emocional, recusa ao amor, vazio afetivo" },
        "2 de Copas":         { direta: "Encontro, troca afetiva, harmonia entre dois", invertida: "Desentendimento, desequilíbrio na relação" },
        "3 de Copas":         { direta: "Celebração, alegria coletiva, união de corações", invertida: "Excesso, fofoca, alegria superficial" },
        "4 de Copas":         { direta: "Estabilidade emocional, introspecção, consolidação", invertida: "Estagnação afetiva, descontentamento, fechamento" },
        "5 de Copas":         { direta: "Perda, luto, o que foi derramado — mas dois cálices permanecem", invertida: "Superação da perda, voltar-se ao que resta" },
        "6 de Copas":         { direta: "Memória, passado harmonioso, raízes afetivas", invertida: "Apego ao passado, nostalgia que impede o presente" },
        "7 de Copas":         { direta: "Visão, escolhas múltiplas, ilusão criativa", invertida: "Ilusão sem fundamento, dispersão, fantasias que enganam" },
        "8 de Copas":         { direta: "Partida emocional, abandono do que não nutre mais", invertida: "Medo de deixar ir, apego ao que já não serve" },
        "9 de Copas":         { direta: "Satisfação, realização emocional, abundância do coração", invertida: "Autoindulgência, prazer vazio, desejos mal encaminhados" },
        "10 de Copas":        { direta: "Plenitude afetiva, harmonia familiar, completude emocional", invertida: "Conflito doméstico, desarmonia, felicidade frágil" },
        "Valete de Copas":    { direta: "Mensagem afetiva, sensibilidade jovem, intuição nascente", invertida: "Imaturidade emocional, manipulação ingênua" },
        "Cavaleiro de Copas": { direta: "Cavaleiro do sentimento, proposta afetiva, movimento com emoção", invertida: "Ilusão romântica, promessa vazia, sedução enganosa" },
        "Rainha de Copas":    { direta: "Profundidade emocional, empatia, cuidado que acolhe", invertida: "Dependência, manipulação afetiva, emoção que sufoca" },
        "Rei de Copas":       { direta: "Maturidade emocional, domínio dos sentimentos, generosidade", invertida: "Frieza, manipulação velada, emoção reprimida que explode" },

        "Ás de Ouros":        { direta: "Semente material, novo recurso, oportunidade concreta", invertida: "Oportunidade perdida, instabilidade financeira" },
        "2 de Ouros":         { direta: "Equilíbrio em movimento, malabarismo de recursos", invertida: "Desequilíbrio, instabilidade, perda do fio condutor" },
        "3 de Ouros":         { direta: "Trabalho qualificado, colaboração, obra em progresso", invertida: "Falta de reconhecimento, trabalho mal executado" },
        "4 de Ouros":         { direta: "Posse, segurança material, controle dos recursos", invertida: "Avareza, apego ao que se tem, medo da perda" },
        "5 de Ouros":         { direta: "Dificuldade material, exclusão, momento de carência", invertida: "Saída da crise, recuperação financeira, apoio encontrado" },
        "6 de Ouros":         { direta: "Generosidade, fluxo de dar e receber, equilíbrio material", invertida: "Dependência financeira, desequilíbrio na troca" },
        "7 de Ouros":         { direta: "Avaliação dos frutos, paciência, colheita que se anuncia", invertida: "Impaciência, resultado aquém do esperado" },
        "8 de Ouros":         { direta: "Artesanato, dedicação ao ofício, aperfeiçoamento", invertida: "Falta de foco, trabalho sem qualidade, preguiça" },
        "9 de Ouros":         { direta: "Abundância conquistada, autonomia, prazer nos frutos do trabalho", invertida: "Excesso de cuidado com a aparência, dependência material" },
        "10 de Ouros":        { direta: "Patrimônio, herança, prosperidade que se transmite", invertida: "Conflito familiar por bens, instabilidade da base material" },
        "Valete de Ouros":    { direta: "Jovem prático, aprendiz dedicado, mensagem material", invertida: "Falta de iniciativa, imaturidade prática" },
        "Cavaleiro de Ouros": { direta: "Movimento lento e seguro, trabalho constante, perseverança", invertida: "Estagnação, teimosia, progresso travado" },
        "Rainha de Ouros":    { direta: "Praticidade, generosidade concreta, abundância que acolhe", invertida: "Materialismo, insegurança financeira, descuido" },
        "Rei de Ouros":       { direta: "Maestria material, liderança financeira, solidez", invertida: "Ganância, imprudência, poder mal usado" },

        "Ás de Paus":        { direta: "Fagulha criativa, impulso de vida, energia que inicia", invertida: "Bloqueio da força vital, falta de iniciativa" },
        "2 de Paus":         { direta: "Planejamento, tensão criativa, visão que se forma", invertida: "Indecisão, planos sem saída, dispersão" },
        "3 de Paus":         { direta: "Expansão, cooperação, horizonte que se abre", invertida: "Atrasos, falta de aliados, projeto que empaca" },
        "4 de Paus":         { direta: "Estabilidade conquistada, base firme, celebração do construído", invertida: "Conflito doméstico, fundação frágil" },
        "5 de Paus":         { direta: "Disputa, energia em conflito, teste de força", invertida: "Conflito interno, desistência, briga sem saída" },
        "6 de Paus":         { direta: "Vitória, reconhecimento, retorno triunfante", invertida: "Derrota, falta de reconhecimento, liderança contestada" },
        "7 de Paus":         { direta: "Resistência, defesa do território, coragem diante dos muitos", invertida: "Rendição prematura, insegurança, posição indefensável" },
        "8 de Paus":         { direta: "Velocidade, ação em curso, múltiplas forças em movimento", invertida: "Atrasos, obstáculos, energia que não encontra saída" },
        "9 de Paus":         { direta: "Resiliência, força acumulada, preparação para o embate", invertida: "Exaustão, paranoia, força que se esgota" },
        "10 de Paus":        { direta: "Carga pesada, responsabilidade excessiva, esforço máximo", invertida: "Colapso pelo peso, delegação necessária, sobrecarga" },
        "Valete de Paus":    { direta: "Mensageiro de fogo, entusiasmo jovem, notícia ativa", invertida: "Impulsividade, início sem fim, energia desperdiçada" },
        "Cavaleiro de Paus": { direta: "Ação rápida, aventura, cavaleiro do fogo em movimento", invertida: "Imprudência, fúria, ação sem direção" },
        "Rainha de Paus":    { direta: "Carisma, liderança natural, criatividade que aquece", invertida: "Ciúmes, autoritarismo, energia que queima" },
        "Rei de Paus":       { direta: "Visão, liderança inspiradora, fogo sob controle", invertida: "Arrogância, tirania, criatividade que domina a tudo" },

        "Ás de Espadas":        { direta: "Clareza cortante, verdade que separa, força do intelecto", invertida: "Confusão mental, argumento que se vira contra si" },
        "2 de Espadas":         { direta: "Impasse, equilíbrio pela negação, tensão mantida", invertida: "Decisão forçada, ruptura do equilíbrio tenso" },
        "3 de Espadas":         { direta: "Dor que abre, separação, tristeza necessária", invertida: "Superação da dor, perdão, integração do sofrimento" },
        "4 de Espadas":         { direta: "Repouso após batalha, trégua, recuperação necessária", invertida: "Agitação, incapacidade de descansar, vigilância obsessiva" },
        "5 de Espadas":         { direta: "Conflito com vencedor e perdedores, vitória amarga", invertida: "Reconciliação, rendição honrosa, fim da disputa" },
        "6 de Espadas":         { direta: "Travessia, passagem, movimento em direção à calma", invertida: "Estagnação, recusa à travessia, apego ao conflito" },
        "7 de Espadas":         { direta: "Astúcia, movimento furtivo, estratégia que evita o confronto", invertida: "Desonestidade revelada, traição descoberta" },
        "8 de Espadas":         { direta: "Aprisionamento mental, paralisia por medo, limitação que se impõe", invertida: "Libertação, sair da armadilha, vencer o medo" },
        "9 de Espadas":         { direta: "Angústia noturna, pensamentos que torturam, peso do que se teme", invertida: "Alívio, saída do pesadelo, superação da ansiedade" },
        "10 de Espadas":        { direta: "Fim doloroso, queda completa — mas definitiva. O ciclo se esgota.", invertida: "Recuperação após o fundo, esperança que renasce" },
        "Valete de Espadas":    { direta: "Mente ágil, vigilância, espírito crítico nascente", invertida: "Fofoca, espionagem, crítica destrutiva" },
        "Cavaleiro de Espadas": { direta: "Ação veloz, decisão cortante, impulso intelectual em movimento", invertida: "Impulsividade agressiva, conflito precipitado" },
        "Rainha de Espadas":    { direta: "Inteligência afiada, percepção sem ilusão, clareza que não poupa", invertida: "Frieza cruel, manipulação pela palavra, amargura" },
        "Rei de Espadas":       { direta: "Autoridade intelectual, julgamento preciso, poder da palavra justa", invertida: "Tirania do intelecto, crueldade calculada, abuso de poder" },
    }
};
DECKS.registrar(marselha);
