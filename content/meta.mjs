// Metadados editoriais por projeto: disciplinas (para o filtro por área), resumo "problema / papel / resultado"
// e frase curta para a lista da home. As chaves são os slugs de projects.mjs.
// Disciplinas: writing | product | ai | enable | eng
export const disciplineLabels = {
  pt: { writing: "UX e Technical Writing", product: "Produto", ai: "IA aplicada", enable: "Enablement", eng: "Engenharia" },
  en: { writing: "UX and Technical Writing", product: "Product", ai: "Applied AI", enable: "Enablement", eng: "Engineering" },
};

export const meta = {
  grimoryo: {
    disciplines: ["writing", "product", "eng"],
    short: { pt: "Auto-battler de magos com campanha narrativa e 99 testes.", en: "A wizard auto-battler with a narrative campaign and 99 tests." },
    brief: {
      pt: { problem: "Um jogo de celular com profundidade, que abra na hora, funcione offline e possa ser balanceado e traduzido sem medo de quebrar.", role: "Design, engenharia, conteúdo e documentação, do zero à publicação.", result: "99 testes, 48 cartas exclusivas, 44 combos, PT e EN completos e documentação pública no formato Diátaxis." },
      en: { problem: "A phone game with real depth that opens instantly, works offline and can be balanced and translated without fear of breaking it.", role: "Design, engineering, content and documentation, from zero to release.", result: "99 tests, 48 campaign-only cards, 44 combos, full PT and EN, and public Diátaxis-style documentation." },
    },
  },
  "hype-server": {
    disciplines: ["product", "eng"],
    short: { pt: "Um RPG online clássico rodando no navegador e no celular.", en: "A classic online RPG running in the browser and on phones." },
    brief: {
      pt: { problem: "Levar um jogo feito só para computador ao navegador e ao celular, mantendo a identidade e a jogabilidade fluida.", role: "Criação do servidor, do mapa e dos scripts, mais a arquitetura do cliente web e da ponte.", result: "Jogável em PC, tablet e celular, com amigos conectados sem abrir nenhuma porta no computador." },
      en: { problem: "Taking a game made only for computers to the browser and the phone, keeping its identity and smooth gameplay.", role: "Server, map and scripts, plus the architecture of the web client and the bridge.", result: "Playable on PC, tablet and phone, with friends connected without opening any port on the computer." },
    },
    media: [
      { video: "hype-combo", poster: "hs-p1", gif: "hype-combo", cap: { pt: "Magias em área em sequência, terminando em um OwNeD!", en: "Area spells in sequence, ending in an OwNeD!" } },
      { video: "hype-gelo", poster: "hs-p2", gif: "hype-gelo", cap: { pt: "Gelo, caveiras e outro OwNeD!", en: "Ice, skulls and another OwNeD!" } },
      { video: "hype-fogo", poster: "hs-p3", gif: "hype-fogo", cap: { pt: "Tempestade de fogo em cadeia, com três OwNeD! seguidos", en: "A chained fire storm with three OwNeD! in a row" } },
    ],
    mediaNote: {
      pt: "Replays do meu personagem de teste, tocados com as sprites do jogo. Na captura, qualquer fala que não seja palavra de magia é descartada.",
      en: "Replays of my test character, played back with the game's sprites. In the capture, any speech that isn't a spell word is discarded.",
    },
  },
  "arena-poker-bots": {
    disciplines: ["ai", "product", "eng"],
    short: { pt: "Bots de poker que jogam sozinhos; você cria o seu e o coloca para disputar.", en: "Poker bots that play on their own; you create yours and send it to compete." },
    brief: {
      pt: { problem: "Bots com personalidade de verdade, jogando torneios sozinhos, e a possibilidade de a pessoa criar o próprio bot.", role: "Concepção, motor de poker, IA de decisão, interface e backend.", result: "10 bots com estilos distintos, 13 torneios temáticos e um criador de bot em 6 passos." },
      en: { problem: "Bots with real personalities playing tournaments on their own, and a way for anyone to create their own bot.", role: "Concept, poker engine, decision AI, interface and backend.", result: "10 bots with distinct styles, 13 themed tournaments and a 6-step bot creator." },
    },
  },
  "jr-anuncios": {
    disciplines: ["product", "eng"],
    short: { pt: "Classificados com admin em Django e vitrine estática em outro serviço.", en: "Classifieds with a Django admin and a static storefront on another service." },
    brief: {
      pt: { problem: "Testar um desenho de produção em que o painel e a vitrine pública vivem em hospedagens diferentes e se falam só por um contrato de dados.", role: "Arquitetura, backend, front-end e deploy.", result: "Categorias e atributos dinâmicos sem alterar código, 30 testes automatizados e a vitrine isolada das falhas do admin." },
      en: { problem: "Testing a production-style design where the admin panel and the public storefront live on different hosts and talk only through a data contract.", role: "Architecture, backend, front end and deploy.", result: "Dynamic categories and attributes with no code changes, 30 automated tests and a storefront isolated from admin failures." },
    },
  },
  "english-quest": {
    disciplines: ["ai", "writing", "product"],
    short: { pt: "Inglês em formato de RPG, com conversa, voz e uma IA com cache e plano B local.", en: "English as an RPG, with chat, voice and an AI with a cache and a local plan B." },
    brief: {
      pt: { problem: "Praticar conversa em inglês sem constrangimento, com a motivação de um jogo, sem que o produto dependa de uma IA que pode falhar.", role: "Projeto, texto da experiência e desenvolvimento completos, sozinho.", result: "Conversa com voz, 20 missões por nível, chave de IA só no servidor, tempo limite de 3,5 s por provedor e um plano B local." },
      en: { problem: "Practicing English conversation without embarrassment, with the motivation of a game, without the product depending on an AI that can fail.", role: "Complete product design, experience writing and development, solo.", result: "Voice chat, 20 quests per level, the AI key on the server only, a 3.5 s timeout per provider and a local plan B." },
    },
  },
  "energcalc-docs": {
    disciplines: ["writing", "product"],
    short: { pt: "Documentação bilíngue com a arquitetura e as regras de um produto de energia.", en: "Bilingual documentation with the architecture and rules of an energy product." },
    brief: {
      pt: { problem: "Explicar um cálculo de engenharia para três públicos ao mesmo tempo: quem usa, quem confere e quem quer entender a arquitetura.", role: "Escrita técnica, estrutura da documentação e ferramenta de build.", result: "14 páginas em PT e EN, diagramas versionados e um build que falha se os idiomas divergirem." },
      en: { problem: "Explaining an engineering calculation to three audiences at once: people who use it, people who verify it and people who want the architecture.", role: "Technical writing, documentation structure and build tooling.", result: "14 pages in PT and EN, versioned diagrams and a build that fails if the languages drift apart." },
    },
  },
  wave4menow: {
    disciplines: ["writing", "product", "eng"],
    short: { pt: "Previsão de surfe mobile-first com busca por pico, cidade ou CEP e relato em voz de surfista.", en: "A mobile-first surf forecast with search by spot, city or postal code and a report in surfer voice." },
    brief: {
      pt: { problem: "Saber em segundos onde está bom para surfar agora, com dados dispersos e técnicos reunidos numa tela de celular.", role: "Projeto e desenvolvimento completos.", result: "Top 5 do momento, busca por pico, cidade ou CEP, previsão de ondas, vento e maré e documentação oficial bilíngue (PT-BR e EN)." },
      en: { problem: "Knowing in seconds where it's good to surf right now, with scattered technical data brought onto a phone screen.", role: "Complete design and development.", result: "A top 5 of the moment, search by spot, city or postal code, wave, wind and tide forecast and official bilingual documentation (PT-BR and EN)." },
    },
  },
};
