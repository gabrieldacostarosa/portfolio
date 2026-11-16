// Projetos do portfólio. Cada projeto tem dados comuns e um bloco `pt` e um `en`.
// status: live | private | showcase | paused | docs
// kind:   game | app | system | docs
// cover:  { type: 'wide'|'phones'|'diagram', imgs: [chaves de assets/img], nodes?: [...] }
// layers: camadas do diagrama de arquitetura, de cima para baixo (o fluxo vai seguindo as setas).

export const projects = [
  /* ============================ GRIMORYO ============================ */
  {
    slug: "grimoryo",
    kind: "game",
    status: "live",
    caseStudy: true,
    tags: ["JavaScript", "Canvas/DOM", "PWA", "Supabase", "RLS", "i18n"],
    links: { live: "https://grimoryo.netlify.app", repo: "https://github.com/gabrieldacostarosa/grimoryo" },
    cover: { type: "phones", imgs: ["gr-menu", "gr-map"] },
    gallery: [
      { img: "gr-menu", shape: "phone", alt: { pt: "Menu principal do Grimoryo", en: "Grimoryo main menu" } },
      { img: "gr-map", shape: "phone", alt: { pt: "Mapa da campanha em Alvorada", en: "Campaign map of Alvorada" } },
      { img: "gr-combos", shape: "phone", alt: { pt: "Manual de combos", en: "Combo Manual" } },
    ],
    facts: [
      { v: "99", k: { pt: "testes automatizados", en: "automated tests" } },
      { v: "48", k: { pt: "cartas exclusivas da campanha", en: "campaign-only cards" } },
      { v: "44", k: { pt: "combos descobríveis", en: "discoverable combos" } },
      { v: "2", k: { pt: "idiomas, com teste que falha se faltar tradução", en: "languages, with a test that fails on missing translations" } },
    ],
    layers: [
      { label: { pt: "Conteúdo (dados)", en: "Content (data)" }, nodes: [{ t: "Cartas", s: "cards" }, { t: "Combos e relíquias", s: "combos, relics" }, { t: "Eventos e cenas", s: "events, story" }] },
      { label: { pt: "Regras (sem DOM)", en: "Rules (no DOM)" }, nodes: [{ t: "Combate por ticks de 0,1 s", s: "seed + RNG" }, { t: "Run e Campanha", s: "run, campaign" }, { t: "Progresso", s: "progress" }] },
      { label: { pt: "Interface", en: "Interface" }, nodes: [{ t: "Telas e animações", s: "ui/" }, { t: "Sons e efeitos", s: "fx" }, { t: "Tradução na tela", s: "i18n-dom" }] },
      { label: { pt: "Entrega", en: "Delivery" }, nodes: [{ t: "Service worker", s: "offline" }, { t: "Supabase (opcional)", s: "conta + RLS" }, { t: "Netlify", s: "estático" }] },
    ],
    pt: {
      title: "Grimoryo",
      tagline: "Auto-battler roguelite de magos, feito para o celular, com campanha narrativa e combate determinístico.",
      role: "Design, engenharia, conteúdo e publicação",
      context:
        "Quis um jogo de celular que fosse profundo o bastante para ter sinergias e história, mas leve o bastante para abrir instantaneamente e funcionar sem internet. O desafio de engenharia era dar a um jogo com dezenas de cartas, combos e cenas uma base que eu conseguisse balancear, testar e traduzir sem medo de quebrar o que já funcionava.",
      built: [
        "Dois modos sobre o mesmo motor de combate: Run (partida roguelite de cerca de 15 minutos) e Campanha (mapa ilustrado, diálogos com escolhas que são lembradas, deck pessoal, recompensas de 1 entre 3 cartas e chefes secretos).",
        "Oito escolas de magia com sinergias em camadas: bônus por escola (2/4/6), pactos alternativos e, na campanha, combos de cartas, reações entre escolas, formações no tabuleiro e combos raros.",
        "Campanha com memória: o jogo guarda confiança com oito facções, promessas e rumores, e as cenas seguintes consultam esse estado.",
        "Interface mobile-first em HTML, CSS e JavaScript puros, sem etapa de build e sem dependências de execução; funciona offline por service worker e salva progresso na nuvem de forma opcional.",
        "Documentação pública no formato Diátaxis (tutorial, como fazer, referência e explicação) e um script que regenera as páginas de referência a partir dos dados do jogo.",
      ],
      archNote: "O núcleo de regras não conhece a tela. Testes e simuladores chamam o núcleo direto, sem navegador.",
      decisions: [
        { d: "Combate determinístico a partir de uma seed, sem acessar o DOM", w: "A mesma seed sempre produz a mesma batalha. Isso torna as simulações de balanceamento e os testes reproduzíveis, e um bug de combate vira um caso repetível.", c: "Todo sorteio precisa passar pelo gerador com seed; usar aleatoriedade solta quebra a garantia." },
        { d: "Conteúdo como dados, não como código", w: "Nenhuma carta tem código próprio: cartas, relíquias, combos, eventos e cenas são dados validados ao carregar. Adicionar uma carta é editar dados, com a validação apontando erros cedo.", c: "O motor de efeitos precisa ser expressivo o bastante; efeitos realmente novos exigem mexer no núcleo." },
        { d: "Sem build e sem dependências de execução", w: "O jogo abre direto de um servidor estático e continua funcionando daqui a anos. Menos peças para quebrar e deploy trivial.", c: "Sem bundler não há tree-shaking nem TypeScript; a organização em scripts ordenados exige disciplina." },
        { d: "Chave do dicionário en-US é o texto original em pt-BR, com teste de cobertura", w: "Tradução sem arquivos paralelos de IDs: o texto original é a chave. Um teste falha se qualquer texto do jogo ficar sem tradução.", c: "Mudar um texto em português exige atualizar a chave da tradução." },
        { d: "Código-fonte privado, documentação pública", w: "A documentação funciona como vitrine técnica e guia de jogo sem expor o jogo inteiro para cópia.", c: "Contribuições externas ficam restritas; o repositório público precisa ser regenerado a cada release." },
      ],
      quality: [
        "99 testes automatizados: 61 nas regras da Run, 32 na campanha (conteúdo, rotas, saves, poderes, combos) e 6 de idiomas.",
        "Simuladores de balanceamento para os dois modos, inclusive a taxa de vitória de cada batalha da campanha.",
        "Conta e progresso na nuvem protegidos por regras de acesso por linha (RLS) no Supabase; a chave usada no navegador é a pública, nunca uma chave de servidor.",
      ],
      next: [
        "Terminar o salvamento da campanha na nuvem e depois o próximo ato.",
        "Gerar um relatório de balanceamento em cada release, comparando o antes e o depois das mudanças em cartas.",
      ],
    },
    en: {
      title: "Grimoryo",
      tagline: "A mobile-first roguelite auto-battler about wizards, with a narrative campaign and deterministic combat.",
      role: "Design, engineering, content and release",
      context:
        "I wanted a phone game deep enough to have synergies and a story, yet light enough to open instantly and work offline. The engineering challenge was giving a game with dozens of cards, combos and scenes a foundation I could balance, test and translate without fear of breaking what already worked.",
      built: [
        "Two modes on one combat engine: Run (a roguelite match of about 15 minutes) and Campaign (illustrated map, dialogue with remembered choices, a personal deck, pick-1-of-3 card rewards and secret bosses).",
        "Eight schools of magic with layered synergies: school bonuses (2/4/6), alternative pacts and, in the campaign, card combos, school reactions, board formations and rare combos.",
        "A campaign with memory: the game tracks trust with eight factions, promises and rumors, and later scenes check that state.",
        "A mobile-first interface in plain HTML, CSS and JavaScript, with no build step and no runtime dependencies; it works offline through a service worker and optionally saves progress to the cloud.",
        "Public documentation in the Diátaxis format (tutorial, how-to, reference and explanation) and a script that regenerates the reference pages from the game data.",
      ],
      archNote: "The rules core knows nothing about the screen. Tests and simulators call the core directly, with no browser.",
      decisions: [
        { d: "Deterministic combat from a seed, without touching the DOM", w: "The same seed always produces the same battle. Balance simulations and tests become reproducible, and a combat bug becomes a repeatable case.", c: "Every roll must go through the seeded generator; stray randomness breaks the guarantee." },
        { d: "Content as data, not code", w: "No card has its own code: cards, relics, combos, events and scenes are data validated on load. Adding a card means editing data, with validation catching mistakes early.", c: "The effects engine has to be expressive enough; truly new effects require touching the core." },
        { d: "No build step and no runtime dependencies", w: "The game opens straight from a static server and will keep working years from now. Fewer moving parts and a trivial deploy.", c: "Without a bundler there is no tree-shaking or TypeScript; the ordered-scripts layout takes discipline." },
        { d: "The en-US dictionary key is the original pt-BR text, with a coverage test", w: "Translation without parallel ID files: the original text is the key. A test fails if any game text is left untranslated.", c: "Changing a Portuguese sentence means updating its translation key." },
        { d: "Private source code, public documentation", w: "The documentation works as a technical showcase and a player guide without exposing the whole game to copying.", c: "External contributions are limited, and the public repository has to be regenerated each release." },
      ],
      quality: [
        "99 automated tests: 61 for Run rules, 32 for the campaign (content, routes, saves, powers, combos) and 6 for languages.",
        "Balance simulators for both modes, including the win rate of every campaign battle.",
        "Cloud account and progress protected by row-level security (RLS) in Supabase; the key used in the browser is the public one, never a server key.",
      ],
      next: [
        "Finish cloud saving for the campaign and then the next act.",
        "Generate a balance report at each release, comparing before and after card changes.",
      ],
    },
  },

  /* ============================ HYPE SERVER ============================ */
  {
    slug: "hype-server",
    kind: "game",
    status: "showcase",
    caseStudy: true,
    tags: ["JavaScript", "Canvas 2D", "WebSocket", "Node.js", "TCP", "Lua", "PWA"],
    links: {},
    cover: { type: "wide", imgs: ["hs-combo"] },
    gallery: [
      { img: "hs-combo", shape: "wide", alt: { pt: "Combo de magias em área no PvP, renderizado pelo cliente no navegador", en: "An area-spell combo in PvP, rendered by the browser client" } },
      { img: "hs-owned", shape: "wide", alt: { pt: "O texto OwNeD! aparece sobre um jogador derrotado", en: "The OwNeD! text appears over a defeated player" } },
    ],
    facts: [
      { v: "8.40", k: { pt: "versão do protocolo falada pelo navegador", en: "protocol version spoken by the browser" } },
      { v: "0", k: { pt: "portas abertas no computador para jogar com amigos", en: "ports opened on the computer to play with friends" } },
      { v: "PC · tablet · celular", k: { pt: "o mesmo cliente, com interface de toque", en: "same client, with a touch interface" } },
    ],
    layers: [
      { label: { pt: "Navegador (PC, tablet, celular)", en: "Browser (PC, tablet, phone)" }, nodes: [{ t: "Cliente JavaScript puro", s: "Canvas 2D, toque" }, { t: "Protocolo 8.40", s: "RSA + XTEA" }, { t: "Bots", s: "motor próprio" }] },
      { label: { pt: "Acesso externo (opcional)", en: "Outside access (optional)" }, nodes: [{ t: "Túnel Cloudflare", s: "sem porta aberta" }] },
      { label: { pt: "Ponte (Node.js)", en: "Bridge (Node.js)" }, nodes: [{ t: "WebSocket ↔ TCP", s: "porta 7171" }, { t: "Serve o cliente", s: "rede local por padrão" }] },
      { label: { pt: "Servidor de jogo", en: "Game server" }, nodes: [{ t: "TFS 0.3.1", s: "motor original" }, { t: "Scripts Lua", s: "regras, quests, hunts" }, { t: "Mapa e SQLite", s: "mundo e contas" }] },
    ],
    pt: {
      title: "Hype Server",
      tagline: "Um servidor de RPG online clássico (versão 8.40) jogável no navegador, no PC e no celular, sem perder a essência do jogo original.",
      role: "Criação do servidor, mapa e scripts; arquitetura do cliente web e da ponte",
      contextTitle: "Contexto e solução",
      context:
        "Eu jogo esse tipo de servidor há anos e pensei numa forma de inovar a jogabilidade e testar meus limites. Em vez de só reproduzir o que já existia, quis descobrir até onde a tecnologia podia levar um jogo feito para computador: abrir no navegador, rodar no celular e continuar com a mesma identidade e a mesma jogabilidade fluida e divertida. Para isso juntei o que eu já conhecia do jogo, os scripts Lua e o mapa montado à mão, com uma camada nova de tecnologia: um cliente web que fala o protocolo original, uma ponte que traduz WebSocket em TCP, previsão de passo para esconder a latência e uma interface de toque pensada para o polegar. A meta nunca foi trocar o jogo por outro, e sim criar algo inovador que preservasse o que ele tem de melhor.",
      built: [
        "Um cliente em JavaScript puro que fala o protocolo do jogo (versão 8.40), com criptografia (RSA e XTEA), direto no navegador, e desenha o mapa em camadas num Canvas 2D a partir dos arquivos gráficos do jogo.",
        "Interface de toque: joystick, botões configuráveis para magias e runas, mochila, minimapa e auto heal com regras por vocação. Instalável como PWA.",
        "Uma ponte em Node.js que traduz WebSocket em TCP, porque o navegador não abre conexão TCP pura. O servidor de jogo continua igual, sem mudança de motor.",
        "Acesso para amigos por túnel Cloudflare, sem abrir porta no computador, com contas individuais.",
        "Bots que jogam como gente, com motor próprio: combos por vocação aprendidos com gravações minhas, PvP, hunt e exploração do mapa com um caderno de descobertas.",
        "Replays: o comando de salvar guarda o lance e uma página toca de novo com as sprites, podendo virar GIF. Ferramentas de mapa leem e editam o formato OTBM e geram as hunts a partir dos spawns.",
      ],
      archNote: "O navegador nunca conversa direto com o servidor de jogo: tudo passa pela ponte, que é a fronteira de confiança.",
      decisions: [
        { d: "Traduzir WebSocket para TCP numa ponte, em vez de alterar o servidor", w: "Navegador não abre TCP puro. A ponte resolve isso e deixa o servidor original intocado, o que preserva o comportamento que os jogadores já conhecem.", c: "Um salto extra de rede e um componente a mais para manter e proteger." },
        { d: "A ponte aceita só rede local por padrão e o acesso externo é por túnel", w: "Abrir uma porta do computador de casa expõe o IP e a máquina. O túnel entrega o acesso aos amigos sem essa exposição.", c: "Depende de um serviço externo e de contas liberadas uma a uma; não serve para público aberto." },
        { d: "Previsão de passo no cliente", w: "Com a latência de uma conexão doméstica, esperar a resposta do servidor a cada passo deixa o personagem arrastado. O cliente anda na hora e corrige se o servidor discordar. Medi o passo, o tile e as magias contra o servidor para acertar os tempos.", c: "Precisa de lógica de correção quando a previsão erra, como em colisões." },
        { d: "Interface de toque configurável", w: "O jogo original assume teclado e mouse. No celular cada pessoa quer botões diferentes, então os botões, as magias e o posicionamento são configuráveis.", c: "Mais telas de ajuste e mais estados para testar." },
        { d: "Regras por vocação, nunca pelo nome da promoção", w: "Evita duplicar lógica e erros quando uma vocação muda de nome; todos jogam com a promoção máxima.", c: "Exige manter o mapeamento vocação para regras em um só lugar." },
        { d: "JavaScript puro, sem etapa de build", w: "Cliente simples de depurar e de servir pela própria ponte; sem toolchain para quebrar.", c: "Sem checagem de tipos em tempo de compilação." },
      ],
      quality: [
        "Mecânicas fiéis ao 8.4 testadas à mão contra o comportamento original: o trap de magic wall e grav vita na escada, o haste tirando paralyze, o housenka duplo.",
        "Plano de testes documentado e capturas de tela de ponta a ponta versionadas por funcionalidade.",
        "Segurança operacional: senhas, banco, mapa e arquivos do servidor nunca saem do computador; o que é publicado é só documentação e imagens.",
      ],
      next: [
        "Automatizar parte dos testes manuais com os próprios bots, que já sabem entrar, andar e lutar.",
        "Publicar um repositório de vitrine com a história do projeto e os replays dos melhores lances.",
      ],
      note: "Projeto pessoal de estudo e portfólio, feito por diversão.",
    },
    en: {
      title: "Hype Server",
      tagline: "A classic online RPG server (version 8.40) playable in the browser, on PC and phone, without losing the essence of the original game.",
      role: "Server, map and scripts; architecture of the web client and the bridge",
      contextTitle: "Context and solution",
      context:
        "I have played this kind of server for years and thought of a way to innovate on the gameplay and test my limits. Instead of just reproducing what already existed, I wanted to find out how far technology could take a game made for computers: opening in the browser, running on a phone, and keeping the same identity and the same smooth, fun gameplay. To do that I combined what I already knew of the game, the Lua scripts and the hand-built map, with a new layer of technology: a web client that speaks the original protocol, a bridge that translates WebSocket to TCP, step prediction to hide latency, and a touch interface designed for the thumb. The goal was never to replace the game with another one, but to create something innovative that preserved what makes it good.",
      built: [
        "A plain-JavaScript client that speaks the game's protocol (version 8.40), with encryption (RSA and XTEA), straight in the browser, drawing the map in layers on a Canvas 2D from the game's graphics files.",
        "A touch interface: joystick, configurable buttons for spells and runes, backpack, minimap and auto heal with rules per vocation. Installable as a PWA.",
        "A Node.js bridge that translates WebSocket to TCP, because browsers can't open raw TCP connections. The game server stays as it was, with no engine changes.",
        "Access for friends through a Cloudflare tunnel, with no port opened on the computer, using individual accounts.",
        "Bots that play like people, with their own engine: per-vocation combos learned from my own recordings, PvP, hunting and map exploration with a discovery notebook.",
        "Replays: a command saves the moment and a page plays it back with the sprites, and it can become a GIF. Map tools read and edit the OTBM format and generate hunts from the spawns.",
      ],
      archNote: "The browser never talks to the game server directly: everything goes through the bridge, which is the trust boundary.",
      decisions: [
        { d: "Translate WebSocket to TCP in a bridge instead of changing the server", w: "Browsers can't open raw TCP. The bridge solves that and leaves the original server untouched, which preserves the behavior players already know.", c: "One extra network hop and one more component to maintain and protect." },
        { d: "The bridge accepts only the local network by default and outside access goes through a tunnel", w: "Opening a port on a home computer exposes the IP and the machine. The tunnel gives friends access without that exposure.", c: "It relies on an outside service and on accounts enabled one by one; it doesn't suit an open public." },
        { d: "Step prediction on the client", w: "With home-connection latency, waiting for the server on every step makes the character feel dragged. The client moves immediately and corrects if the server disagrees. I measured step, tile and spell timings against the server to get them right.", c: "It needs correction logic when the prediction is wrong, such as on collisions." },
        { d: "A configurable touch interface", w: "The original game assumes a keyboard and mouse. On a phone everyone wants different buttons, so buttons, spells and placement are configurable.", c: "More settings screens and more states to test." },
        { d: "Rules per vocation, never per promotion name", w: "Avoids duplicated logic and mistakes when a vocation is renamed; everyone plays with the maximum promotion.", c: "The vocation-to-rules mapping has to live in one place." },
        { d: "Plain JavaScript, no build step", w: "A client that is simple to debug and to serve from the bridge itself; no toolchain to break.", c: "No compile-time type checking." },
      ],
      quality: [
        "8.4-faithful mechanics tested by hand against the original behavior: the magic wall and grav vita stair trap, haste removing paralyze, the double housenka.",
        "A documented test plan and end-to-end screenshots versioned per feature.",
        "Operational security: passwords, database, map and server files never leave the computer; only documentation and images are published.",
      ],
      next: [
        "Automate part of the manual tests with the bots themselves, which already know how to log in, walk and fight.",
        "Publish a showcase repository with the project's story and replays of the best moments.",
      ],
      note: "A personal study and portfolio project, made for fun.",
    },
  },

  /* ============================ ARENA POKER BOTS ============================ */
  {
    slug: "arena-poker-bots",
    kind: "game",
    status: "private",
    caseStudy: true,
    tags: ["JavaScript", "Texas Hold'em", "Monte Carlo", "Supabase", "RLS", "WebAudio"],
    links: {},
    cover: { type: "wide", imgs: ["ap-table"] },
    gallery: [
      { img: "ap-table", shape: "wide", alt: { pt: "Mesa de torneio com seis bots, cartas e probabilidade de vitória", en: "A tournament table with six bots, hole cards and win probability" } },
      { img: "ap-mobile", shape: "phone", alt: { pt: "A mesa no celular", en: "The table on a phone" } },
    ],
    facts: [
      { v: "10", k: { pt: "bots com personalidades distintas", en: "bots with distinct personalities" } },
      { v: "13", k: { pt: "torneios temáticos no calendário", en: "themed tournaments in the calendar" } },
      { v: "PT · EN", k: { pt: "interface e narração por personagem", en: "interface and per-character narration" } },
    ],
    pipeline: {
      pt: ["Força da mão", "Equity por Monte Carlo", "Textura do board e draws", "Leitura dos oponentes", "Imagem do próprio bot", "Fase do torneio (bolha e final)", "Decisão com hooks de personalidade"],
      en: ["Hand strength", "Monte Carlo equity", "Board texture and draws", "Opponent reads", "The bot's own table image", "Tournament phase (bubble and final)", "Decision with personality hooks"],
    },
    layers: [
      { label: { pt: "Apresentação", en: "Presentation" }, nodes: [{ t: "Mesa e HUD de transmissão", s: "ui.js" }, { t: "Narração por bot", s: "narrator.js" }, { t: "Sons sintetizados", s: "WebAudio" }] },
      { label: { pt: "Orquestração", en: "Orchestration" }, nodes: [{ t: "Calendário de torneios", s: "tournament.js" }, { t: "Ranking e carreiras", s: "stats.js" }, { t: "Contas", s: "auth.js" }] },
      { label: { pt: "Decisão", en: "Decision" }, nodes: [{ t: "decide_action", s: "ai.js" }, { t: "Perfis dos bots", s: "players.js" }] },
      { label: { pt: "Motor", en: "Engine" }, nodes: [{ t: "Texas Hold'em No Limit", s: "engine.js" }, { t: "Avaliador de 7 cartas e equity", s: "cards.js" }] },
    ],
    pt: {
      title: "Arena Poker Bots",
      tagline: "Bots de poker que jogam sozinhos campeonatos sem fim, e você pode criar o seu e colocá-lo para disputar.",
      role: "Concepção, motor de poker, IA dos bots, interface e backend",
      context:
        "A graça era ver bots com personalidade de verdade disputando torneios sozinhos, com narração e probabilidades na tela como numa transmissão. E ir além: deixar a pessoa criar o próprio bot e vê-lo jogar. Isso exigia um motor de poker correto e uma IA que decidisse por estilo, não por regra fixa.",
      built: [
        "Motor de Texas Hold'em No Limit com side pots, divisão de pote e raise mínimo, mais um avaliador de 7 cartas e cálculo de equity por Monte Carlo.",
        "Dez bots oficiais, cada um com estilo próprio (agressivo, conservador, de blefe, de leitura), que aprendem durante o jogo: quem folda demais passa a receber mais blefes e quem blefa demais passa a ser pago.",
        "Calendário infinito de treze torneios temáticos, com níveis de blind, fase de bolha e final, ranking mundial persistente e visual próprio para cada evento.",
        "Criador de bot em seis passos (nome, rosto, cor, estilo, três ajustes finos e frase de vitória) e a opção de sentar o seu bot na mesa ao vivo ou inscrevê-lo em campeonatos de bots de jogadores.",
        "HUD de transmissão com cartas expostas e probabilidade de vitória em tempo real, narração épica por personagem em PT e EN e sons sintetizados com WebAudio.",
        "Contas na nuvem com regras de acesso por linha no banco, e uma única simulação mundial rodada por uma conta host.",
      ],
      archNote: "Motor, decisão e interface são camadas separadas, comunicando-se por um barramento de eventos. O motor roda sem tela.",
      decisions: [
        { d: "Equity por Monte Carlo no momento da decisão", w: "Em vez de tabelas fixas, cada bot simula a mão e usa a probabilidade real contra o que vê no board. Isso se adapta a qualquer situação, inclusive as que eu não previ.", c: "Custa CPU a cada decisão; o número de simulações precisa ser ajustado para não travar a mesa." },
        { d: "Um pipeline único de decisão e personalidade como parâmetros e hooks", w: "Todos os bots passam pelo mesmo pipeline e diferem em parâmetros e ganchos (perseguir flush, armar armadilha, hero call, push/fold). Por isso um bot criado por um jogador é só um conjunto de parâmetros no mesmo motor.", c: "Personalidades muito fora do comum exigem novos ganchos no pipeline." },
        { d: "Modelo de oponente que aprende ao vivo", w: "Medir taxa de blefe, fold contra raise e contra re-raise torna os bots exploráveis e exploradores, como jogadores de verdade, e deixa a transmissão mais interessante.", c: "Estado extra por par de jogadores e mais casos para testar." },
        { d: "Pressão da fase do torneio, na bolha e na final", w: "Perto da bolha e da mesa final a decisão correta muda; incluir a fase do torneio evita bots que jogam a bolha como se fosse o começo.", c: "Mais uma dimensão no pipeline." },
        { d: "Regras de acesso no banco e funções de servidor para o que importa", w: "O navegador nunca decide nada sensível: contas e bots ficam protegidos por RLS e as operações críticas rodam no servidor.", c: "Mais latência e mais código do lado do servidor." },
      ],
      quality: [
        "Motor e IA em módulos separados, sem acesso à tela, o que permite rodar muitas mãos em sequência para checar o comportamento dos bots.",
        "Interface totalmente responsiva e revisada em celular, tablet e desktop.",
        "Contas com regras de acesso por linha; só a chave pública vai para o navegador.",
      ],
      next: [
        "Mover o motor para o servidor para que todos os espectadores vejam exatamente a mesma mesa, em vez de uma simulação por navegador.",
        "Adicionar repetição de mãos, para estudar uma decisão específica de qualquer bot.",
      ],
    },
    en: {
      title: "Arena Poker Bots",
      tagline: "Poker bots that play endless tournaments on their own, and you can create yours and send it to compete.",
      role: "Concept, poker engine, bot AI, interface and backend",
      context:
        "The fun was watching bots with real personalities play tournaments by themselves, with narration and odds on screen like a broadcast. And going further: letting a person create their own bot and watch it play. That demanded a correct poker engine and an AI that decides by style, not by a fixed rule.",
      built: [
        "A No Limit Texas Hold'em engine with side pots, split pots and minimum raises, plus a 7-card evaluator and Monte Carlo equity.",
        "Ten official bots, each with its own style (aggressive, conservative, bluffing, reading), that learn as they play: whoever folds too much gets bluffed more, and whoever bluffs too much gets paid.",
        "An endless calendar of thirteen themed tournaments, with blind levels, bubble and final phases, a persistent world ranking and its own look for each event.",
        "A six-step bot creator (name, face, color, style, three fine-tuning sliders and a victory line) and the option to seat your bot at the live table or enter it in player-bot championships.",
        "A broadcast-style HUD with exposed cards and real-time win probability, epic per-character narration in PT and EN, and sounds synthesized with WebAudio.",
        "Cloud accounts with row-level access rules in the database, and a single world simulation run by a host account.",
      ],
      archNote: "Engine, decision and interface are separate layers talking through an event bus. The engine runs without a screen.",
      decisions: [
        { d: "Monte Carlo equity at decision time", w: "Instead of fixed tables, each bot simulates the hand and uses the real probability against what it sees on the board. It adapts to any situation, including ones I didn't foresee.", c: "It costs CPU on every decision; the simulation count has to be tuned so the table doesn't stall." },
        { d: "One decision pipeline, with personality as parameters and hooks", w: "Every bot goes through the same pipeline and differs in parameters and hooks (chasing flushes, setting traps, hero calls, push/fold). That is why a bot made by a player is just a parameter set on the same engine.", c: "Very unusual personalities need new hooks in the pipeline." },
        { d: "An opponent model that learns live", w: "Measuring bluff rate, fold to raise and fold to re-raise makes bots both exploitable and exploiting, like real players, and makes the broadcast more interesting.", c: "Extra state per pair of players and more cases to test." },
        { d: "Tournament-phase pressure at the bubble and final", w: "Near the bubble and the final table the correct decision changes; including the tournament phase stops bots from playing the bubble like the opening.", c: "One more dimension in the pipeline." },
        { d: "Access rules in the database and server functions for what matters", w: "The browser never decides anything sensitive: accounts and bots are protected by RLS and critical operations run on the server.", c: "More latency and more server-side code." },
      ],
      quality: [
        "Engine and AI in separate modules with no screen access, which allows running many hands in a row to check bot behavior.",
        "A fully responsive interface, reviewed on phone, tablet and desktop.",
        "Accounts use row-level access rules; only the public key goes to the browser.",
      ],
      next: [
        "Move the engine to the server so every viewer sees exactly the same table, instead of one simulation per browser.",
        "Add hand replays to study a specific decision by any bot.",
      ],
    },
  },

  /* ============================ JR ANÚNCIOS ============================ */
  {
    slug: "jr-anuncios",
    kind: "system",
    status: "paused",
    caseStudy: true,
    tags: ["Python", "Django 5", "PostgreSQL", "Supabase", "Render", "Netlify"],
    links: {}, // front: https://pfjauto.netlify.app (voltar a linkar quando o Supabase estiver respondendo de novo)
    cover: { type: "wide", imgs: ["jr-diagram"] },
    gallery: [],
    facts: [
      { v: "2", k: { pt: "hospedagens independentes que se comunicam", en: "independent hosts that talk to each other" } },
      { v: "30", k: { pt: "testes automatizados do admin", en: "automated tests on the admin" } },
      { v: "0", k: { pt: "regras de categoria no código", en: "category rules in code" } },
    ],
    layers: [
      { label: { pt: "Admin (Django 5 · Render)", en: "Admin (Django 5 · Render)" }, nodes: [{ t: "Categorias e atributos dinâmicos", s: "herança entre categorias" }, { t: "Anúncios e fotos", s: "painel" }, { t: "Usuários e papéis", s: "ADMIN / ANUNCIANTE" }] },
      { label: { pt: "Dados (Supabase)", en: "Data (Supabase)" }, nodes: [{ t: "PostgreSQL", s: "fonte de verdade" }, { t: "Storage de imagens", s: "compatível com S3" }, { t: "View pública", s: "public_listings" }] },
      { label: { pt: "Front público (Netlify · estático)", en: "Public front (Netlify · static)" }, nodes: [{ t: "Busca e filtros", s: "HTML/CSS/JS puro" }, { t: "Galeria e detalhe", s: "/veiculo/slug" }, { t: "Contato por WhatsApp", s: "sem login" }] },
    ],
    pt: {
      title: "JR Anúncios",
      tagline: "Plataforma de classificados com admin em Django e vitrine estática em outro serviço, ligados por um contrato de dados.",
      role: "Arquitetura, backend, front e deploy",
      context:
        "Comecei com um classificado de veículos para uma loja (PFJ Veículos) e quis testar uma separação que se vê em produção: o painel administrativo numa hospedagem e a vitrine pública em outra, conversando só por um contrato de dados. O objetivo era descobrir o que isso exige na prática, e o que cada lado ganha e perde.",
      built: [
        "Admin em Django 5 com categorias hierárquicas e atributos totalmente dinâmicos: novas categorias (imóveis, motos, eletrônicos) são criadas pelo painel, cada uma com seus atributos, sem alterar código. Atributos da categoria-mãe são herdados pelas subcategorias.",
        "Formulário de anúncio e motor de filtros gerados em tempo de execução a partir desses atributos; não existe nenhum `if categoria == \"carros\"` no código.",
        "Papéis de administrador e anunciante com permissões testadas, inclusive um anunciante tentando editar anúncio de outro. Sem cadastro público de compradores.",
        "Vitrine pública estática no Netlify, com busca, filtros, ordenação, galeria, página de detalhe e contato por WhatsApp, lendo os anúncios por uma view pública do Supabase.",
        "Banco PostgreSQL em produção, imagens em armazenamento de objetos compatível com S3, contador de visualizações protegido contra contagem repetida na mesma sessão, e sitemap e robots.",
      ],
      archNote: "O admin escreve; o front só lê, e apenas pela view pública. A view é o contrato entre as duas hospedagens.",
      decisions: [
        { d: "Separar o admin (Django) da vitrine pública (estática)", w: "O Netlify serve só sites estáticos e funções, não um app Django. Separar deixa a vitrine rápida, barata e fora do caminho de falhas do admin.", c: "Dois deploys para manter em sincronia, e o front depende de o contrato de dados continuar estável." },
        { d: "Expor os dados por uma view com só as colunas públicas", w: "A vitrine nunca toca as tabelas de usuários nem campos internos. Mudar o schema interno não quebra o front enquanto a view se mantiver.", c: "A view precisa ser versionada como uma API e atualizada junto com mudanças que o público enxerga." },
        { d: "Atributos dinâmicos em vez de campos fixos por categoria", w: "Abrir uma categoria nova vira tarefa de configuração, não de desenvolvimento, e a herança evita duplicar atributos.", c: "Consultas mais genéricas e validação feita em tempo de execução em vez de pelo schema." },
        { d: "Imagens em armazenamento externo", w: "Containers de hospedagem gratuita são efêmeros e perdem arquivos enviados quando reiniciam. Com armazenamento de objetos, a hospedagem do admin pode ser descartável.", c: "Mais uma dependência e configuração de credenciais." },
        { d: "Sem cadastro público e com login discreto", w: "Só quem publica anúncio precisa de conta. Reduz a superfície de ataque e a moderação.", c: "Compradores não têm favoritos nem histórico." },
      ],
      quality: [
        "30 testes automatizados: permissões, criação de categorias e atributos (inclusive herança), formulário dinâmico, upload de imagem, filtros por seleção e por faixa, busca, paginação, link do WhatsApp e contador de visualizações.",
        "Segredos fora do código: configuração por variáveis de ambiente, com SQLite em desenvolvimento e PostgreSQL em produção sem trocar o código.",
        "No navegador vai só a chave pública do banco; escrita acontece apenas no admin.",
      ],
      next: [
        "Restabelecer a conexão com o Supabase, que hoje não responde, e voltar a publicar o link da vitrine. Enquanto isso o caso fica como estudo de arquitetura.",
        "Documentar o contrato da view como API versionada e testá-lo automaticamente a cada deploy do admin.",
        "Reduzir a demora do admin: nos meus testes ele demorou a responder, comportamento típico de hospedagem gratuita que hiberna; um plano pago ou um aquecimento resolveria.",
      ],
    },
    en: {
      title: "JR Anúncios",
      tagline: "A classifieds platform with a Django admin and a static storefront on another service, linked by a data contract.",
      role: "Architecture, backend, front end and deploy",
      context:
        "I started with a vehicle classifieds site for a dealership (PFJ Veículos) and wanted to test a split you see in production: the admin panel on one host and the public storefront on another, talking only through a data contract. The goal was to find out what that takes in practice, and what each side gains and loses.",
      built: [
        "A Django 5 admin with hierarchical categories and fully dynamic attributes: new categories (real estate, motorcycles, electronics) are created in the panel, each with its own attributes, without changing code. Parent-category attributes are inherited by subcategories.",
        "The listing form and the filter engine are generated at runtime from those attributes; there is no `if category == \"cars\"` anywhere in the code.",
        "Administrator and advertiser roles with tested permissions, including an advertiser trying to edit another's listing. No public buyer sign-up.",
        "A static public storefront on Netlify, with search, filters, sorting, a gallery, a detail page and WhatsApp contact, reading listings through a public Supabase view.",
        "PostgreSQL in production, images in S3-compatible object storage, a view counter protected against repeat counting within a session, and a sitemap and robots file.",
      ],
      archNote: "The admin writes; the front only reads, and only through the public view. The view is the contract between the two hosts.",
      decisions: [
        { d: "Split the admin (Django) from the public storefront (static)", w: "Netlify serves only static sites and functions, not a Django app. Splitting keeps the storefront fast, cheap and out of the admin's failure path.", c: "Two deploys to keep in sync, and the front depends on the data contract staying stable." },
        { d: "Expose data through a view with only the public columns", w: "The storefront never touches user tables or internal fields. Changing the internal schema won't break the front as long as the view holds.", c: "The view must be versioned like an API and updated along with changes the public can see." },
        { d: "Dynamic attributes instead of fixed fields per category", w: "Opening a new category becomes a configuration task, not a development task, and inheritance avoids duplicating attributes.", c: "More generic queries and validation done at runtime instead of by the schema." },
        { d: "Images in external storage", w: "Free-tier containers are ephemeral and lose uploaded files on restart. With object storage the admin host can be disposable.", c: "One more dependency and credentials to configure." },
        { d: "No public sign-up and a discreet login", w: "Only people who publish listings need an account. It reduces the attack surface and moderation work.", c: "Buyers get no favorites or history." },
      ],
      quality: [
        "30 automated tests: permissions, creating categories and attributes (including inheritance), the dynamic form, image upload, selection and range filters, search, pagination, the WhatsApp link and the view counter.",
        "Secrets kept out of the code: configuration through environment variables, with SQLite in development and PostgreSQL in production without changing code.",
        "Only the database's public key reaches the browser; writes happen only in the admin.",
      ],
      next: [
        "Restore the Supabase connection, which is currently not responding, and publish the storefront link again. Until then this case stands as an architecture study.",
        "Document the view contract as a versioned API and test it automatically on every admin deploy.",
        "Reduce the admin's response delay: in my tests it was slow to respond, typical of free hosting that sleeps; a paid plan or a warm-up would fix it.",
      ],
    },
  },

  /* ============================ ENGLISH QUEST ============================ */
  {
    slug: "english-quest",
    kind: "app",
    status: "live",
    caseStudy: true,
    tags: ["React 19", "TypeScript", "Vite", "Gemini API", "Netlify Functions", "Firestore", "Voz"],
    links: { live: "https://englishadventurerquest.netlify.app" },
    cover: { type: "phones", imgs: ["eq-instr", "eq-app"] },
    gallery: [
      { img: "eq-0", shape: "phone", alt: { pt: "Boas-vindas: o aventureiro escolhe o nome", en: "Welcome: the adventurer picks a name" } },
      { img: "eq-1", shape: "phone", alt: { pt: "Escolha do foco de estudo", en: "Choosing the study focus" } },
      { img: "eq-instr", shape: "phone", alt: { pt: "Escolha do instrutor entre quatro personalidades", en: "Choosing an instructor from four personalities" } },
      { img: "eq-app", shape: "phone", alt: { pt: "Mapa de missões, com nível, XP e proficiência", en: "Quest map, with level, XP and proficiency" } },
    ],
    facts: [
      { v: "3,5 s", k: { pt: "tempo limite por provedor de IA", en: "timeout per AI provider" } },
      { v: "20", k: { pt: "missões por nível de proficiência", en: "quests per proficiency level" } },
      { v: "4", k: { pt: "instrutores com personalidades diferentes", en: "instructors with different personalities" } },
      { v: "5", k: { pt: "focos de estudo", en: "study focuses" } },
    ],
    layers: [
      { label: { pt: "Interface (React 19)", en: "Interface (React 19)" }, nodes: [{ t: "Boas-vindas e instrutor", s: "nome, foco, personalidade" }, { t: "Chat e Aulas", s: "conversa e lições" }, { t: "Missões e Torre das Provas", s: "20 por nível" }, { t: "Perfil", s: "nível, XP, proficiência" }] },
      { label: { pt: "Voz", en: "Voice" }, nodes: [{ t: "Reconhecimento de fala", s: "microfone" }, { t: "Voz do mentor", s: "síntese de fala" }] },
      { label: { pt: "Serviço de IA", en: "AI service" }, nodes: [{ t: "Cache por conteúdo", s: "prompt + instrução + nível" }, { t: "Função serverless", s: "a chave fica só no servidor" }, { t: "Provedores em ordem", s: "tempo limite de 3,5 s" }, { t: "JSON estruturado", s: "parser tolerante" }] },
      { label: { pt: "Plano B local", en: "Local plan B" }, nodes: [{ t: "Bancos de perguntas por nível", s: "provas e quizzes" }, { t: "Respostas de chat de reserva", s: "com dica e XP" }, { t: "Missões locais", s: "20 por nível" }] },
      { label: { pt: "Dados", en: "Data" }, nodes: [{ t: "Firestore", s: "com persistência offline" }, { t: "Modo visitante", s: "identificador local" }] },
    ],
    pt: {
      title: "English Quest Adventure",
      tagline: "Plataforma de inglês em formato de RPG, com conversa, voz, instrutores com personalidade e uma IA que nunca deixa a pessoa sem aula.",
      role: "Projeto e desenvolvimento completos, sozinho",
      context:
        "Aprender inglês com apostilas é chato e conversar é o que realmente funciona, mas nem todo mundo tem com quem praticar. Quis um lugar onde a pessoa conversasse, errasse sem vergonha e sentisse progresso, com a mecânica de um RPG: aventureiro, missões, trilha e evolução. O desafio de engenharia era depender de IA para dar vida ao produto sem que o produto dependesse de uma IA que pode ficar lenta, cara ou fora do ar.",
      built: [
        "Boas-vindas em personagem: o aventureiro diz o nome, escolhe o foco (conversa, trabalho e negócios, viagem, acadêmico ou casual) e escolhe o instrutor entre quatro personalidades (rigoroso, mentor amigável, professor britânico ou gamer americano).",
        "Quatro áreas no app: Chat, Aulas, Missões e Perfil. As Missões são 20 por nível de proficiência, mais a Torre das Provas, com nível, XP e proficiência no cabeçalho. Há também a opção de forjar uma lição sobre qualquer assunto.",
        "Conversa com voz: reconhecimento de fala para treinar falando e voz do mentor por síntese de fala.",
        "Camada de IA em quatro partes: um cache de respostas por conteúdo, uma função serverless que guarda a chave só no servidor, uma lista de provedores tentados em ordem com tempo limite de 3,5 s e um parser de JSON tolerante a respostas com texto ao redor.",
        "Plano B local: bancos de perguntas por nível, respostas de chat de reserva e as missões locais mantêm chat, missões e provas funcionando mesmo sem IA.",
        "Progresso salvo no Firestore, com persistência offline; sem o banco configurado, o app cai para o modo visitante, com identificador guardado no próprio aparelho.",
      ],
      archNote: "A IA é tratada como uma dependência que pode falhar: o navegador nunca vê a chave, toda chamada tem tempo limite e o produto sempre tem para onde cair.",
      decisions: [
        { d: "A chave da IA fica só no servidor, atrás de uma função serverless", w: "O navegador conversa com um proxy do próprio site, e é o proxy que fala com os provedores. Assim a chave nunca aparece no código entregue ao usuário e dá para trocar de provedor sem mudar o app.", c: "Um salto de rede a mais e uma dependência da função estar no ar; uma partida a frio pode deixar a primeira resposta mais lenta." },
        { d: "Provedores tentados em ordem, com tempo limite curto de 3,5 segundos", w: "Numa conversa, esperar mais que isso parece travamento. É melhor passar para o próximo provedor do que deixar a pessoa olhando a tela.", c: "Algumas respostas lentas, porém boas, são descartadas." },
        { d: "Cache de respostas pelo conteúdo do pedido (prompt, instrução e nível)", w: "Quem pede a mesma lição no mesmo nível recebe a resposta na hora e sem custo de IA, o que também reduz o risco de estourar cota.", c: "Menos variedade nas respostas repetidas e a necessidade de decidir quando o cache expira." },
        { d: "Plano B local com bancos de perguntas por nível", w: "Se a IA falhar, o chat responde com uma resposta de reserva e as missões e provas saem do banco local, em vez de mostrar um erro. A pessoa não perde o ritmo de estudo.", c: "O conteúdo local é mais genérico, e os bancos precisam de manutenção própria." },
        { d: "Parser de JSON tolerante", w: "Modelos às vezes cercam o JSON com texto ou marcação de código. O parser extrai o trecho válido em vez de quebrar, e a resposta estruturada alimenta direto a interface.", c: "Um parser tolerante pode aceitar respostas mal formadas; validar o formato com um esquema é o próximo passo." },
        { d: "Banco com persistência offline e modo visitante", w: "A pessoa começa a estudar sem criar conta, e o progresso sobrevive a uma conexão instável. Sem o banco, o app continua funcionando.", c: "No modo visitante o progresso fica só naquele aparelho e pode se perder." },
      ],
      quality: [
        "A chave de IA não está no código entregue ao navegador: conferi o pacote publicado e não há nenhuma chave nele.",
        "Falha da IA tratada em todas as chamadas: com o cache e o plano B local, a pessoa nunca fica sem conteúdo.",
        "Banco indisponível não derruba o app; ele cai para o modo visitante.",
      ],
      next: [
        "Cobrir a cadeia de provedores, o cache e o plano B local com testes automatizados.",
        "Validar o JSON recebido com um esquema, em vez de aceitar qualquer objeto.",
        "Trocar o Tailwind carregado por CDN em tempo de execução por CSS gerado no build, para uma abertura mais rápida e sem dependência externa.",
      ],
    },
    en: {
      title: "English Quest Adventure",
      tagline: "An RPG-style English learning platform with chat, voice, instructors with personality and an AI that never leaves the learner without a lesson.",
      role: "Complete design and development, solo",
      context:
        "Learning English from textbooks is dull and conversation is what really works, but not everyone has someone to practice with. I wanted a place where a person could talk, make mistakes without embarrassment and feel progress, with the mechanics of an RPG: adventurer, quests, trail and growth. The engineering challenge was to use AI to bring the product to life without the product depending on an AI that can be slow, expensive or down.",
      built: [
        "An in-character welcome: the adventurer gives a name, picks a focus (conversation, work and business, travel, academic or casual) and chooses an instructor from four personalities (strict, friendly mentor, British professor or American gamer).",
        "Four areas in the app: Chat, Lessons, Quests and Profile. Quests are 20 per proficiency level, plus the Tower of Trials, with level, XP and proficiency in the header. There is also an option to forge a lesson on any subject.",
        "Voice chat: speech recognition to practice speaking and a mentor voice through speech synthesis.",
        "An AI layer in four parts: a content-keyed response cache, a serverless function that keeps the key on the server only, a list of providers tried in order with a 3.5 s timeout, and a JSON parser tolerant of replies with surrounding text.",
        "A local plan B: question banks by level, fallback chat replies and local quests keep chat, quests and exams working even without AI.",
        "Progress saved to Firestore with offline persistence; if the database isn't configured, the app falls back to guest mode, with an identifier kept on the device itself.",
      ],
      archNote: "AI is treated as a dependency that can fail: the browser never sees the key, every call has a time limit and the product always has somewhere to land.",
      decisions: [
        { d: "The AI key stays on the server, behind a serverless function", w: "The browser talks to a proxy on the site itself, and the proxy talks to the providers. The key never appears in the code delivered to the user, and providers can be swapped without changing the app.", c: "One extra network hop and a dependency on the function being up; a cold start can make the first reply slower." },
        { d: "Providers tried in order, with a short 3.5-second timeout", w: "In a conversation, waiting longer than that feels like a freeze. It's better to move to the next provider than to leave someone staring at a screen.", c: "Some slow but good replies are discarded." },
        { d: "Response cache keyed by the request content (prompt, instruction and level)", w: "Someone asking for the same lesson at the same level gets the answer instantly and at no AI cost, which also lowers the risk of exceeding quota.", c: "Less variety in repeated answers and the need to decide when the cache expires." },
        { d: "A local plan B with question banks by level", w: "If AI fails, chat answers with a fallback reply and quests and exams come from the local bank, instead of showing an error. The person doesn't lose their study rhythm.", c: "Local content is more generic, and the banks need their own upkeep." },
        { d: "A tolerant JSON parser", w: "Models sometimes wrap JSON in text or code markup. The parser extracts the valid part instead of breaking, and the structured response feeds the interface directly.", c: "A tolerant parser may accept malformed answers; validating the shape with a schema is the next step." },
        { d: "A database with offline persistence and a guest mode", w: "People start studying without creating an account, and progress survives an unstable connection. Without the database, the app keeps working.", c: "In guest mode progress stays on that device only and can be lost." },
      ],
      quality: [
        "The AI key is not in the code delivered to the browser: I checked the published bundle and there is no key in it.",
        "AI failure handled on every call: with the cache and the local plan B, the person is never left without content.",
        "An unavailable database doesn't take the app down; it falls back to guest mode.",
      ],
      next: [
        "Cover the provider chain, the cache and the local plan B with automated tests.",
        "Validate incoming JSON against a schema instead of accepting any object.",
        "Replace the runtime Tailwind CDN with CSS generated at build time, for a faster start and no external dependency.",
      ],
    },
  },

  /* ============================ ENERGCALC DOCS ============================ */
  {
    slug: "energcalc-docs",
    kind: "docs",
    status: "docs",
    caseStudy: true,
    tags: ["Documentação técnica", "Mermaid", "Node.js", "PT/EN", "Arquitetura"],
    links: { docs: "https://energcalc.netlify.app/docs/", repo: "https://github.com/gabrieldacostarosa/energcalc-docs" },
    cover: { type: "wide", imgs: ["ec-docs"] },
    gallery: [
      { img: "ec-docs", shape: "wide", alt: { pt: "Introdução: o produto, para quem é e como ler a documentação, com navegação por grupos, busca e índice da página", en: "Introduction: the product, who it is for and how to read the docs, with grouped navigation, search and page outline" } },
      { img: "ec-engine", shape: "wide", alt: { pt: "Motor de cálculo: as fórmulas e suposições à vista, para qualquer resultado poder ser conferido", en: "Calculation engine: formulas and assumptions in the open, so any result can be checked" } },
      { img: "ec-example", shape: "wide", alt: { pt: "Exemplo resolvido: geladeira, internet e luzes, passo a passo, o mesmo caso usado nos testes automáticos", en: "Worked example: fridge, internet and lights, step by step, the same case used in the automated tests" } },
      { img: "ec-arch", shape: "wide", alt: { pt: "Arquitetura: diagrama em Mermaid, componentes e decisões de projeto", en: "Architecture: a Mermaid diagram, components and design decisions" } },
      { img: "ec-quality", shape: "wide", alt: { pt: "Qualidade e testes: o que cada grupo de testes verifica", en: "Quality and testing: what each group of tests verifies" } },
    ],
    facts: [
      { v: "14", k: { pt: "páginas, em PT e EN", en: "pages, in PT and EN" } },
      { v: "68", k: { pt: "casos de teste descritos na documentação", en: "test cases described in the docs" } },
      { v: "1", k: { pt: "arquivo HTML autossuficiente como saída", en: "self-contained HTML file as output" } },
    ],
    layers: [
      { label: { pt: "Conteúdo", en: "Content" }, nodes: [{ t: "content/pt/*.md", s: "front matter" }, { t: "content/en/*.md", s: "mesmos slugs" }, { t: "Diagramas Mermaid", s: "no próprio texto" }] },
      { label: { pt: "Build (Node.js)", en: "Build (Node.js)" }, nodes: [{ t: "Valida paridade PT/EN", s: "falha se divergir" }, { t: "Gera o site", s: "scripts/build.mjs" }] },
      { label: { pt: "Saída", en: "Output" }, nodes: [{ t: "dist/index.html", s: "arquivo único" }, { t: "Busca, tema, índice", s: "no navegador" }, { t: "Netlify", s: "estático" }] },
    ],
    pt: {
      title: "EnergCalc: documentação",
      tagline: "Documentação pública e bilíngue de um produto de dimensionamento de energia de emergência para apagões, com a arquitetura explicada.",
      role: "Escrita técnica, estrutura da documentação e ferramenta de build",
      context:
        "O EnergCalc responde quanta energia de reserva uma casa ou pequeno negócio precisa para atravessar um apagão e explica cada número em linguagem simples. O produto é privado; a documentação é pública, e precisava servir a três públicos ao mesmo tempo: quem usa, quem quer verificar a conta e quem quer entender a arquitetura.",
      built: [
        "Quatorze páginas em português e inglês: introdução, jornada do usuário, relatório, motor de cálculo, exemplo resolvido, comparação entre kit pronto e sistema sob medida, arquitetura, privacidade e segurança, qualidade, glossário, perguntas frequentes e versões.",
        "Um build em Node.js que lê os Markdown com front matter, renderiza diagramas Mermaid e produz um único arquivo HTML, com busca, tema claro e escuro e índice lateral da página.",
        "Validação no build: PT e EN precisam ter os mesmos slugs, ou a geração falha. Isso impede que um idioma fique para trás sem ninguém perceber.",
        "Um exemplo resolvido (geladeira, internet e luzes) que é o mesmo caso de referência dos testes automáticos do produto: os números da página são exatamente o que o motor produz, passo a passo, da energia por dia à usina portátil.",
        "Páginas organizadas em cinco grupos (começar, produto, como funciona, tecnologia e referência), com índice lateral em cada página, busca e tema claro e escuro.",
      ],
      archNote: "A documentação é tratada como código: versionada, validada no build e publicada como um site estático.",
      decisions: [
        { d: "Um mesmo motor de cálculo no navegador e no servidor", w: "A prévia instantânea na tela e o resultado oficial do relatório vêm do mesmo código, então nunca divergem.", c: "O motor precisa ser um pacote independente, sem dependência de tela ou de servidor." },
        { d: "O navegador nunca decide nada que valha dinheiro", w: "Preço, desbloqueio do relatório e o cálculo oficial são sempre decididos no servidor; o cliente só mostra.", c: "Mais latência e mais código no servidor." },
        { d: "Tela e PDF a partir do mesmo modelo de dados", w: "O relatório é montado uma vez como dado estruturado e renderizado de dois jeitos, em HTML no portal e em PDF no servidor, sem duplicar conteúdo.", c: "Cada novo formato de saída precisa de um renderizador." },
        { d: "Calcular sem criar conta", w: "A pessoa usa uma sessão anônima para calcular; a conta só nasce na compra. Remove atrito justamente onde as pessoas desistem.", c: "Sessões anônimas precisam ser tratadas com regras de acesso rígidas." },
        { d: "Exemplo resolvido que também é caso de teste", w: "Documentação que não pode mentir: o exemplo da página é o mesmo caso que os testes automáticos verificam, então os números só mudam se o motor mudar, e o teste avisa.", c: "Mudar o motor passa a exigir atualizar a página do exemplo na mesma entrega." },
        { d: "Build que falha quando PT e EN divergem", w: "Garante paridade entre idiomas por regra automática, não por revisão manual.", c: "Todo texto novo exige as duas versões antes de publicar." },
      ],
      quality: [
        "A documentação descreve 68 testes automatizados do produto, com resultados esperados calculados à mão, e regras de qualidade como nunca arredondar valores intermediários e rejeitar entrada inválida em vez de corrigi-la em silêncio.",
        "Regras de acesso testadas num PostgreSQL real, simulando visitante, comprador, administrador e intruso.",
        "Diagramas versionados junto do texto, em Mermaid, para não ficarem desatualizados em imagens.",
      ],
      next: [
        "Publicar a documentação num endereço próprio, com a navegação entre idiomas por URL.",
        "Gerar parte da referência do motor automaticamente a partir dos testes.",
      ],
      note: "Aqui aparece apenas a documentação pública; o código do produto é privado.",
    },
    en: {
      title: "EnergCalc: documentation",
      tagline: "Public, bilingual documentation for an emergency-power sizing product for blackouts, with the architecture explained.",
      role: "Technical writing, documentation structure and build tooling",
      context:
        "EnergCalc answers how much backup power a home or small business needs to get through a blackout and explains every number in plain language. The product is private; the documentation is public, and it had to serve three audiences at once: people who use it, people who want to verify the math, and people who want to understand the architecture.",
      built: [
        "Fourteen pages in Portuguese and English: introduction, user journey, report, calculation engine, a worked example, a power-station vs. custom-system comparison, architecture, privacy and security, quality, glossary, FAQ and releases.",
        "A Node.js build that reads Markdown with front matter, renders Mermaid diagrams and produces a single HTML file, with search, light and dark themes and a page outline.",
        "Build-time validation: PT and EN must share the same slugs, or the build fails. That stops one language from silently falling behind.",
        "A worked example (fridge, internet and lights) that is the same reference case as the product's automated tests: the numbers on the page are exactly what the engine produces, step by step, from daily energy to the ready-made power station.",
        "Pages organized in five groups (start, product, how it works, technology and reference), with a page outline on every page, search and light and dark themes.",
      ],
      archNote: "The documentation is treated as code: versioned, validated at build time and published as a static site.",
      decisions: [
        { d: "The same calculation engine in the browser and on the server", w: "The instant on-screen preview and the official report result come from the same code, so they never disagree.", c: "The engine has to be a standalone package, with no dependency on screens or the server." },
        { d: "The browser never decides anything worth money", w: "Pricing, report unlocking and the official calculation are always decided on the server; the client only displays.", c: "More latency and more server code." },
        { d: "Screen and PDF from the same data model", w: "The report is assembled once as structured data and rendered two ways, HTML in the portal and PDF on the server, without duplicating content.", c: "Every new output format needs a renderer." },
        { d: "Calculate without signing up", w: "People use an anonymous session to calculate; an account is created only at purchase. It removes friction exactly where people give up.", c: "Anonymous sessions need strict access rules." },
        { d: "A worked example that is also a test case", w: "Documentation that can't lie: the page's example is the same case the automated tests verify, so the numbers only change if the engine changes, and the test warns.", c: "Changing the engine now requires updating the example page in the same delivery." },
        { d: "A build that fails when PT and EN diverge", w: "Guarantees parity between languages by an automatic rule, not by manual review.", c: "Every new text needs both versions before publishing." },
      ],
      quality: [
        "The documentation describes 68 automated tests of the product, with expected results worked out by hand, and quality rules such as never rounding intermediate values and rejecting invalid input instead of silently fixing it.",
        "Access rules tested on a real PostgreSQL, simulating a visitor, a buyer, an admin and an intruder.",
        "Diagrams versioned alongside the text, in Mermaid, so they don't go stale as images.",
      ],
      next: [
        "Publish the documentation at its own address, with per-URL language navigation.",
        "Generate part of the engine reference automatically from the tests.",
      ],
      note: "Only the public documentation appears here; the product's code is private.",
    },
  },

  /* ============================ WAVE4MENOW ============================ */
  {
    slug: "wave4menow",
    kind: "app",
    status: "live",
    caseStudy: true,
    tags: ["React 19", "Vite", "React Router", "Open-Meteo", "Nominatim", "Mobile-first"],
    links: { live: "https://wave4menow.netlify.app", repo: "https://github.com/wave4menow/wave4menow-docs" },
    cover: { type: "phones", imgs: ["wv-mobile", "wv-detail"] },
    gallery: [
      { img: "wv-mobile", shape: "phone", alt: { pt: "As 5 melhores praias do Brasil agora", en: "Brazil's top 5 beaches right now" } },
      { img: "wv-detail", shape: "phone", alt: { pt: "Detalhe do pico: ondas, vento, ar e água, maré e relato local", en: "Spot detail: waves, wind, air and water, tide and local report" } },
    ],
    facts: [
      { v: "2", k: { pt: "APIs públicas de clima e mar, sem chave", en: "public weather and marine APIs, no key" } },
      { v: "5", k: { pt: "picos curados na tela inicial", en: "curated spots on the home screen" } },
      { v: "PT · EN", k: { pt: "documentação oficial do app, nos dois idiomas", en: "official app documentation, in both languages" } },
    ],
    layers: [
      { label: { pt: "Interface (React + Router)", en: "Interface (React + Router)" }, nodes: [{ t: "Busca", s: "pico, cidade ou CEP" }, { t: "Favoritas", s: "" }, { t: "Detalhes", s: "ondas, vento, ar e água, maré, nota" }, { t: "Perfil", s: "" }] },
      { label: { pt: "Serviços", en: "Services" }, nodes: [{ t: "weatherService", s: "previsão + mar" }, { t: "Lista curada de picos", s: "com apelidos" }, { t: "Relato local", s: "modelos de texto PT/EN" }] },
      { label: { pt: "Fontes externas", en: "External sources" }, nodes: [{ t: "Open-Meteo", s: "forecast e marine" }, { t: "Nominatim", s: "geocodificação" }] },
    ],
    pt: {
      title: "Wave4meNow",
      tagline: "Previsão de surfe mobile-first com as melhores praias do momento, busca inteligente e relato do pico em voz de surfista.",
      role: "Projeto e desenvolvimento completos",
      context:
        "Quem surfa quer saber, em segundos, onde está bom agora. Os dados existem, mas estão espalhados e em formato técnico. Quis juntar clima, mar e vento numa tela pensada para o celular, na mão, na praia, com a nota do pico e um relato local em linguagem de surfista.",
      built: [
        "Home com as cinco melhores praias do Brasil agora, mostrando altura das ondas, vento, tipo de condição (tubo, perfeita, boa) e nota.",
        "Busca por pico, cidade ou CEP, com normalização de acentos e apelidos de picos locais (como a gíria para a Prainha da Guarda). Ao escolher um resultado, o app busca previsão e dados de mar na Open-Meteo.",
        "Detalhe do pico com altura das ondas em metros e pés, vento e direção (por exemplo, terral), temperatura do ar e da água, chance de chuva, maré e nota.",
        "Perfil do pico com relato local e rating. A documentação prevê relatos e notas da comunidade; no código publicado, o relato é preenchido por regras e modelos de texto em português e inglês (a partir da altura, do tipo de onda e da nota), sem depender de IA.",
        "Favoritas, alertas, comentários e perfil, com navegação por barra inferior.",
        "Documentação oficial bilíngue (PT-BR e EN) em repositório público: introdução ao app, guia rápido de primeiros passos, funcionalidades detalhadas (busca, perfil do pico, favoritos, configurações), recursos futuros e perguntas frequentes.",
      ],
      archNote: "Os serviços ficam entre a interface e as fontes externas, o que permite trocar uma fonte sem mexer nas telas.",
      decisions: [
        { d: "Busca local primeiro, geocodificação depois", w: "Os picos curados e seus apelidos têm prioridade máxima, porque geocodificadores genéricos erram praias pequenas. A API complementa o que a lista não cobre, forçando o contexto de praia na consulta.", c: "A lista curada precisa de manutenção manual." },
        { d: "APIs públicas sem chave para clima e mar", w: "A Open-Meteo entrega previsão e dados marinhos sem credencial, então o custo e o risco de segredo vazado são zero para essa parte.", c: "Dependo de limites e da disponibilidade de serviços de terceiros." },
        { d: "Relato por modelos de texto, em vez de IA", w: "O relato nasce de regras (altura, tipo de onda, nota) e de frases escritas à mão, em PT e EN. Não tem custo, não tem espera e a voz nunca sai do tom.", c: "Menos variedade que uma IA e a necessidade de manter os modelos." },
        { d: "Picos curados carregam sem chamar APIs", w: "A tela inicial e o detalhe dos picos curados abrem na hora, sem esperar rede.", c: "Os valores dos picos curados são fixos; só os resultados da busca trazem previsão em tempo real." },
        { d: "CEP reconhecido por expressão regular", w: "Quem digita um CEP é levado direto para a região certa, sem precisar saber o nome do pico.", c: "Cobre só o formato brasileiro." },
      ],
      quality: [
        "Texto normalizado (sem acentos e sem diferença de caixa) em toda busca.",
        "A tela inicial abre sem nenhuma chamada a APIs de dados, então carrega na hora.",
        "Layout pensado primeiro para o celular, com barra de navegação inferior.",
      ],
      next: [
        "Ligar a previsão em tempo real também aos picos curados da home, que hoje têm valores fixos.",
        "Guardar em cache as chamadas de previsão e de geocodificação para respeitar os limites das APIs e acelerar a tela.",
        "Escrever testes automatizados para o serviço de busca, que concentra a lógica mais delicada.",
        "Trocar o Tailwind carregado por CDN em tempo de execução por CSS gerado no build.",
      ],
    },
    en: {
      title: "Wave4meNow",
      tagline: "A mobile-first surf forecast with the best beaches right now, smart search and a spot report in surfer voice.",
      role: "Complete design and development",
      context:
        "Surfers want to know, in seconds, where it's good right now. The data exists but it is scattered and technical. I wanted to bring weather, sea and wind onto one screen designed for the phone, in hand, at the beach, with the spot's rating and a local report in surfer language.",
      built: [
        "A home screen with Brazil's five best beaches right now, showing wave height, wind, the kind of condition (barrel, perfect, good) and a rating.",
        "Search by spot, city or postal code, with accent normalization and aliases for local spots (such as the slang name for Prainha da Guarda). When a result is chosen, the app fetches forecast and marine data from Open-Meteo.",
        "A spot detail with wave height in meters and feet, wind and direction (for example, offshore), air and water temperature, chance of rain, tide and rating.",
        "A spot profile with a local report and rating. The documentation plans for reports and ratings from the community; in the published code, the report is filled by rules and text templates in Portuguese and English (from the height, wave type and rating), with no dependence on AI.",
        "Favorites, alerts, comments and profile, with bottom-bar navigation.",
        "Official bilingual documentation (PT-BR and EN) in a public repository: app introduction, a quick-start guide, detailed features (search, spot profile, favorites, settings), upcoming features and an FAQ.",
      ],
      archNote: "Services sit between the interface and the external sources, so a source can be swapped without touching the screens.",
      decisions: [
        { d: "Local search first, geocoding second", w: "Curated spots and their aliases take top priority, because generic geocoders get small beaches wrong. The API fills in what the list doesn't cover, forcing a beach context in the query.", c: "The curated list needs manual upkeep." },
        { d: "Public, keyless APIs for weather and sea", w: "Open-Meteo delivers forecast and marine data with no credentials, so cost and leaked-secret risk are zero for that part.", c: "I depend on third-party limits and availability." },
        { d: "A report from text templates, instead of AI", w: "The report comes from rules (height, wave type, rating) and hand-written phrases, in PT and EN. It costs nothing, has no wait and the voice never goes off-tone.", c: "Less variety than an AI and the need to maintain the templates." },
        { d: "Curated spots load without calling APIs", w: "The home screen and the detail of curated spots open instantly, without waiting for the network.", c: "The values of curated spots are fixed; only search results bring a live forecast." },
        { d: "Postal codes recognized by regular expression", w: "Someone who types a postal code is taken straight to the right region, without needing the spot's name.", c: "It covers only the Brazilian format." },
      ],
      quality: [
        "Normalized text (no accents, case-insensitive) on every search.",
        "The home screen opens without any data API call, so it loads instantly.",
        "Layout designed phone-first, with a bottom navigation bar.",
      ],
      next: [
        "Connect the live forecast to the curated home spots too, which today have fixed values.",
        "Cache forecast and geocoding calls to respect API limits and speed up the screen.",
        "Write automated tests for the search service, which holds the most delicate logic.",
        "Replace the runtime Tailwind CDN with CSS generated at build time.",
      ],
    },
  },

];
