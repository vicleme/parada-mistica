// =============================================================
//  SISTEMAS DE BARALHO
//
//  Define os sistemas disponíveis e quais baralhos pertencem a cada um.
//  Um "sistema" agrupa baralhos que compartilham a mesma estrutura
//  (mesmas cartas, mesmas posições em tiragens).
//
//  Campos:
//    id       — identificador interno (string sem espaços)
//    nome     — nome exibido no primeiro <select>
//    descricao — texto curto exibido como hint opcional
//    baralhos — lista de ids de deck que pertencem a este sistema
//               (devem estar registrados via DECKS.registrar)
// =============================================================

const SISTEMAS = [
    {
        id: "tarot",
        nome: "Tarot",
        descricao: "78 cartas — Arcanos Maiores e Menores",
        baralhos: ["tarot", "marselha", "sensitivatarot"]
    },
    {
        id: "lenormand",
        nome: "Lenormand / Petit Lenormand",
        descricao: "36 cartas — leitura por combinação",
        baralhos: ["cigano", "sensitivalenormand"]
    },
    {
        id: "sibilla",
        nome: "Sibilla Italiana",
        descricao: "52 cartas — figuras e situações",
        baralhos: ["sibila"]
    },
    {
        id: "kipper",
        nome: "Kipper",
        descricao: "36 cartas — sistema alemão do séc. XIX",
        baralhos: ["kipper"]
    },
    {
        id: "oraculo",
        nome: "Oráculo",
        descricao: "Cartas temáticas — número variável",
        baralhos: ["radiantsun", "belline"]   // adicione mais ids de oráculos aqui se quiser
    },
    {
        id: "runas",
        nome: "Runas",
        descricao: "24 ou 33 runas — Futark Antigo (com expansão Anglo-Saxônica opcional)",
        baralhos: ["runas", "runasExpandido"]
    }
];
