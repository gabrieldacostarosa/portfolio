# Portfólio · Gabriel da Costa

Código-fonte do meu portfólio: um gerador estático bilíngue (PT/EN) em Node.js, **sem dependências**, que produz páginas rápidas, acessíveis e com cabeçalhos de segurança.

_Source code of my portfolio: a dependency-free, bilingual (PT/EN) static site generator in Node.js._

## Por que construí assim

- **Sem framework e sem dependências.** Um script (`build.mjs`) lê o conteúdo e gera HTML. Fica fácil de entender, de auditar e de manter.
- **Conteúdo separado da apresentação.** Textos em `content/` (projetos, trajetória, resumos), visual em `src/`. Trocar de visual não mexe no conteúdo.
- **Quatro visuais a partir do mesmo conteúdo** (`SKIN=catalog|studio|manual|cinema`), para comparar abordagens de apresentação de projetos.
- **PT e EN com as mesmas páginas e URLs espelhadas**, com `hreflang` e troca de idioma em cada página.
- **Sem recursos de terceiros.** Fontes hospedadas no próprio site, sem scripts externos; por isso a política de segurança (CSP) é restrita a `'self'`.
- **Acessibilidade e movimento responsável.** Foco visível, link para pular ao conteúdo, temas escuro e claro e `prefers-reduced-motion` respeitado; os efeitos são opcionais e o conteúdo continua legível sem JavaScript.
- **Desempenho.** Imagens em WebP com dimensões declaradas e carregamento preguiçoso; os vídeos de replay só tocam quando aparecem na tela.

## Como rodar

```bash
node build.mjs                 # gera dist/ (visual principal: studio)
SKIN=manual OUT=dist-manual node build.mjs
npm run build:all              # gera os quatro visuais
npm run serve                  # http://127.0.0.1:8780/pt/
```

Requer Node 18 ou superior. Não há `npm install`.

## Estrutura

```
build.mjs            gerador (páginas PT/EN, SEO, sitemap, 404)
content/             site.mjs (textos da home), projects.mjs (casos), meta.mjs, headlines.mjs, profile.mjs
src/                 style.css (base), skins/*.css (visuais), app.js (interações), theme.js
assets/              fontes, imagens WebP, vídeos e GIFs dos replays
netlify.toml         build, redirecionamento por idioma e cabeçalhos de segurança
tools/               servidor local e geração dos quatro visuais
```

## Licença

Todos os direitos reservados. Veja [LICENSE](LICENSE).


## Como adicionar um projeto (passo a passo)

1. **`content/projects.mjs`**: copie um bloco existente e preencha `slug`, `kind` (game, app, system, docs), `status`, `tags`, `links`, `cover`, `gallery`, `facts`, `layers` (diagrama) e os textos `pt` e `en` (título, resumo, contexto, o que foi construído, decisões com custo, qualidade e o que mudaria).
2. **`content/meta.mjs`**: disciplinas (`writing`, `product`, `ai`, `enable`, `eng`), uma frase curta e o resumo problema / papel / resultado, em PT e EN.
3. **`content/headlines.mjs`**: título de duas linhas para a vitrine do visual Catálogo.
4. **Imagens**: coloque os prints em `assets/shots/`, registre em `tools/images.cjs` e rode `node tools/images.cjs` (gera WebP e as dimensões).
5. **Ordem**: inclua o `slug` em `content/order.mjs` (sem isso o projeto vai para o final).
6. `npm run build:all` e, para conferir, `node tools/qa.cjs dist` (contraste, links, âncoras, versão sem JavaScript e com movimento reduzido).

O build avisa se faltar a entrada em `meta.mjs` ou `headlines.mjs`. Os contadores da home ("produtos com decisões documentadas") se atualizam sozinhos.
