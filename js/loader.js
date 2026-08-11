// =============================================================
//  LOADER DE BARALHOS — v2
//
//  Responsabilidades:
//    1. Cria window.DECKS antes de qualquer script de baralho
//    2. Cada deck.js chama DECKS.registrar({ id, nome, ... })
//    3. Após todos carregarem, popula os <select> de sistema e baralho
//    4. Gerencia estado de sessão (baralho consumido vs. reiniciado)
// =============================================================

// ── Registro global de decks ──────────────────────────────────
window.DECKS = {
    _lista: {},
    registrar(deck) { this._lista[deck.id] = deck; },
    get(id)         { return this._lista[id]; }
};

// ── Estado da sessão ──────────────────────────────────────────
window.SESSAO = {
    ativa: false,           // true = Modo Sessão
    cartasRestantes: [],    // índices das cartas que ainda não saíram
    deckId: null,           // id do deck ativo na sessão

    iniciar(deckId) {
        this.ativa   = true;
        this.deckId  = deckId;
        const deck   = DECKS.get(deckId);
        this.cartasRestantes = embaralhar([...Array(deck.cartas.length).keys()]);
        this._atualizarContador();
    },

    reiniciar() {
        if (!this.deckId) return;
        const deck = DECKS.get(this.deckId);
        this.cartasRestantes = embaralhar([...Array(deck.cartas.length).keys()]);
        this._atualizarContador();
    },

    encerrar() {
        this.ativa  = false;
        this.deckId = null;
        this.cartasRestantes = [];
        this._atualizarContador();
    },

    retirar(n) {
        // Retorna n índices do topo do baralho, atualizando cartasRestantes
        const retiradas = this.cartasRestantes.splice(0, n);
        this._atualizarContador();
        return retiradas;
    },

    _atualizarContador() {
        const el = document.getElementById("sessao-contador");
        if (!el) return;
        if (!this.ativa) { el.textContent = ""; return; }
        const deck = DECKS.get(this.deckId);
        const total = deck ? deck.cartas.length : "?";
        el.textContent = `🃏 Sessão ativa — ${this.cartasRestantes.length} / ${total} cartas restantes`;
    }
};

// ── Utilitário: embaralhar array (Fisher-Yates) ───────────────
function embaralhar(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
}
window.embaralhar = embaralhar;

// ── URL de imagem ─────────────────────────────────────────────
function imagemCarta(deck, indiceCarta) {
    const pasta = deck.imagemPasta || deck.id;
    const ext   = deck.imagemExtensao || ".jpg";
    return `images/${pasta}/${indiceCarta}${ext}`;
}
window.imagemCarta = imagemCarta;

// ── Popula os selects de sistema e baralho ────────────────────
function popularSelects() {
    const selSistema  = document.getElementById("sistema");
    const selBaralho  = document.getElementById("deck");

    if (!selSistema || !selBaralho) return;

    // Popula sistemas
    selSistema.innerHTML = "";
    SISTEMAS.forEach(s => {
        // Só exibe sistemas que tenham pelo menos um deck carregado
        const temDeck = s.baralhos.some(id => DECKS.get(id));
        if (!temDeck) return;
        const opt       = document.createElement("option");
        opt.value       = s.id;
        opt.textContent = s.nome;
        selSistema.appendChild(opt);
    });

    // ── Restaura sistema favorito antes de popular baralhos ───
    const favSistema = localStorage.getItem("cartarium_favorito_sistema");
    if (favSistema && selSistema.querySelector(`option[value="${favSistema}"]`)) {
        selSistema.value = favSistema;
    }
    // ──────────────────────────────────────────────────────────

    // Ao mudar sistema, atualiza baralhos, spreads e sugestões de pergunta
    selSistema.addEventListener("change", () => {
        popularBaralhos(selSistema.value);
        popularSpreads(selSistema.value);
        if (typeof renderizarSugestoes === "function") {
            document.querySelectorAll(".pergunta-bloco").forEach(bloco => {
                renderizarSugestoes(bloco, parseInt(bloco.dataset.id));
            });
        }
    });

    // Popula baralhos do primeiro sistema
    popularBaralhos(selSistema.value);
    popularSpreads(selSistema.value);

    // Reage à troca de baralho para mostrar/esconder checkbox de inversão
    selBaralho.addEventListener("change", () => {
        atualizarCheckboxInversao(selBaralho.value);
        _atualizarBotaoFavorito(selBaralho.value);
        // Se há sessão ativa com outro deck, avisa
        if (SESSAO.ativa && SESSAO.deckId !== selBaralho.value) {
            mostrarAvisoTrocaDeck();
        }
    });

    atualizarCheckboxInversao(selBaralho.value);

    // Re-renderiza sugestões agora que questions.js e os decks já carregaram
    // (a pergunta inicial é criada antes, quando o banco ainda era undefined)
    if (typeof renderizarSugestoes === "function") {
        document.querySelectorAll(".pergunta-bloco").forEach(bloco => {
            renderizarSugestoes(bloco, parseInt(bloco.dataset.id));
        });
    }
}

function popularBaralhos(sistemaId) {
    const selBaralho = document.getElementById("deck");
    selBaralho.innerHTML = "";

    const sistema = SISTEMAS.find(s => s.id === sistemaId);
    if (!sistema) return;

    sistema.baralhos.forEach(id => {
        const deck = DECKS.get(id);
        if (!deck) return;
        const opt       = document.createElement("option");
        opt.value       = deck.id;
        opt.textContent = deck.nome;
        selBaralho.appendChild(opt);
    });

    // ── Seleciona favorito se disponível neste sistema ────────
    const fav = localStorage.getItem("cartarium_favorito");
    if (fav && selBaralho.querySelector(`option[value="${fav}"]`)) {
        selBaralho.value = fav;
    }
    _atualizarBotaoFavorito(selBaralho.value);
    // ──────────────────────────────────────────────────────────

    atualizarCheckboxInversao(selBaralho.value);
}

function popularSpreads(sistemaId) {
    const selSpread = document.getElementById("spread");
    if (!selSpread) return;
    selSpread.innerHTML = "";

    // Agrupa spreads por campo `grupo`, preservando a ordem de inserção
    const grupos = new Map();
    SPREADS.forEach(sp => {
        const compativel = sp.sistemas.length === 0 || sp.sistemas.includes(sistemaId);
        if (!compativel) return;
        const g = sp.grupo || "Outros";
        if (!grupos.has(g)) grupos.set(g, []);
        grupos.get(g).push(sp);
    });

    // Se só há um grupo, não cria optgroup (mantém seletor simples)
    const usarGrupos = grupos.size > 1;

    grupos.forEach((spreads, nomeGrupo) => {
        const container = usarGrupos ? document.createElement("optgroup") : selSpread;
        if (usarGrupos) {
            container.label = nomeGrupo;
        }
        spreads.forEach(sp => {
            const opt       = document.createElement("option");
            opt.value       = sp.id;
            opt.textContent = sp.nome;
            container.appendChild(opt);
        });
        if (usarGrupos) selSpread.appendChild(container);
    });

    atualizarUISpread(selSpread.value);
    selSpread.onchange = () => atualizarUISpread(selSpread.value);
}

function atualizarUISpread(spreadId) {
    const spread        = SPREADS.find(s => s.id === spreadId);
    const wrapperPos    = document.getElementById("wrapper-posicoes");
    const infoSpread    = document.getElementById("spread-info");

    if (!spread) return;

    const livre = spread.posicoes.length === 0;

    // Modo com posições: exibe descrição das posições
    if (wrapperPos && infoSpread) {
        if (!livre) {
            infoSpread.innerHTML = spread.posicoes
                .map((p, i) => `<div class="posicao-info"><span class="posicao-num">${i+1}.</span> <strong>${p.nome}</strong> — ${p.descricao}</div>`)
                .join("");
            wrapperPos.style.display = "block";
        } else {
            wrapperPos.style.display = "none";
        }
    }
}

function atualizarCheckboxInversao(id) {
    const deck    = DECKS.get(id);
    const wrapper = document.getElementById("wrapper-invertida");
    if (!wrapper) return;
    const aceita  = deck && deck.aceitaInversao;
    wrapper.style.display = aceita ? "block" : "none";
    if (!aceita) {
        const cb = document.getElementById("invertida");
        if (cb) cb.checked = false;
    }
}

// ── Favorito ──────────────────────────────────────────────────
function toggleFavorito() {
    const deckId    = document.getElementById("deck").value;
    const sistemaId = document.getElementById("sistema").value;
    const atual     = localStorage.getItem("cartarium_favorito");
    const novoFav   = atual === deckId ? null : deckId;
    if (novoFav) {
        localStorage.setItem("cartarium_favorito", novoFav);
        localStorage.setItem("cartarium_favorito_sistema", sistemaId);
    } else {
        localStorage.removeItem("cartarium_favorito");
        localStorage.removeItem("cartarium_favorito_sistema");
    }
    _atualizarBotaoFavorito(deckId);
}
window.toggleFavorito = toggleFavorito;

function _atualizarBotaoFavorito(deckId) {
    const btn = document.getElementById("btn-favorito");
    if (!btn) return;
    const fav = localStorage.getItem("cartarium_favorito");
    btn.textContent = fav === deckId ? "★" : "☆";
    btn.title       = fav === deckId ? "Remover favorito" : "Definir como favorito";
}

function mostrarAvisoTrocaDeck() {
    const aviso = document.getElementById("aviso-troca-deck");
    if (aviso) aviso.style.display = "block";
}

// ── Carregamento dinâmico dos scripts de deck ─────────────────
function carregarBaralhos() {
    let pendentes = BARALHOS_CONFIG.length;
    if (pendentes === 0) return;

    BARALHOS_CONFIG.forEach(id => {
        const script   = document.createElement("script");
        script.src     = `decks/${id}.js`;
        script.onload  = () => { pendentes--; if (pendentes === 0) popularSelects(); };
        script.onerror = () => { console.error(`[loader] Falha: decks/${id}.js`); pendentes--; if (pendentes === 0) popularSelects(); };
        document.body.appendChild(script);
    });
}

document.addEventListener("DOMContentLoaded", carregarBaralhos);
