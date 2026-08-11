# Parada Mística

🌐 [English](README.md)

Site institucional que reúne três ferramentas de autoconhecimento — **Tiragem de Cartas**, **Cálculo de Efemérides** e **Sinastria** — sob uma marca e portal comum.

Site 100% estático: HTML, CSS e JavaScript puro, sem framework e sem passo de build.

## Status

Em desenvolvimento ativo. Algumas páginas são placeholders intencionais enquanto o lado comercial (agendamento, página Sobre) fica pronto — elas têm `title="Página ainda não publicada"` no menu, em vez de ficarem como link quebrado.

- **No ar**: Início, Tiragem de Cartas (Cartarium), Cálculo de Efemérides, Sinastria
- **Pendente**: Sobre, Blog, Contato, fluxo de agendamento, login/avatar
- **Também pendente**: o formulário de newsletter ainda não está conectado a um serviço de e-mail (ver comentário no `index.html`)

## Estrutura do projeto

```
├── index.html              → Página inicial (home)
├── tiragem-cartas.html     → App de tarot/oráculos (Cartarium)
├── efemerides.html         → Trânsitos, sinastria e mapa composto
├── sinastria.html          → Calculadora de sinastria (aspectos + casas)
│
├── style.css               → CSS da home e do shell comum (header, nav, footer)
├── assets/
│   ├── css/tokens.css      → Design tokens (cores, tipografia, spacing) — fonte única
│   ├── fonts/               → Fonte Baguet Script (títulos)
│   └── backgrounds/, *.png → Imagens de fundo e marca (hamsa, logo)
│
├── efemerides/css/         → CSS específico da página de efemérides
├── sinastria/css/, js/     → CSS e lógica específicos da calculadora de sinastria
│
├── js/                      → Scripts do shell comum e do Cartarium
│   ├── theme.js             → Alternância de tema claro/escuro/sistema
│   ├── nav-dropdown.js      → Dropdown "Serviços" do menu
│   ├── mobile-menu.js       → Menu hambúrguer (mobile)
│   └── main.js, spreads.js, systems.js, chatbot.js, ...
│
├── decks/                   → Definição dos baralhos (cigano, kipper, riderwaite, runas, sibila, ...)
├── data/                    → Dicionário de significados e dados de comparação de sinastria (JSON)
└── images/                  → Imagens das cartas, organizadas por baralho
```

## Rodando localmente

Como não há build, basta servir os arquivos estáticos. Alguns navegadores bloqueiam `fetch` de JSON local quando o arquivo é aberto direto (`file://`), então o mais seguro é subir um servidor simples:

```bash
# Python
python3 -m http.server 8000

# ou Node
npx serve .
```

Depois acesse `http://localhost:8000`.

## Deploy

O repositório já inclui um `netlify.toml` configurado para site estático (sem comando de build, publicando a raiz do projeto). Conecte o repositório no painel do Netlify e todo push na branch principal publica automaticamente.

## Notas

- Os avisos de precisão sobre dados de trânsitos/efemérides estão documentados na própria página (`efemerides.html`).
