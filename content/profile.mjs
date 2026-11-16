// Dados do perfil: fonte única da trajetória, competências, formação e certificados.
// Para atualizar, edite este arquivo e rode `node build.mjs`.

export const profile = {
  location: { pt: "Florianópolis, Brasil · Remoto", en: "Florianópolis, Brazil · Remote" },
  proof: {
    pt: "Entusiasta de tecnologia, focado em documentar, planejar e estruturar. Atualmente trabalhando com cibersegurança.",
    en: "Technology enthusiast focused on documenting, planning and structuring. Currently working in cybersecurity.",
  },
  quote: {
    pt: "Boa documentação começa rodando o código. Eu rodo, quebro e testo antes de escrever uma linha.",
    en: "Good docs start with running the code. I run it, break it and test it before I write a line.",
  },
  capabilities: [
    { t: { pt: "Docs-as-code", en: "Docs-as-code" }, d: { pt: "Markdown, Git e GitHub: a documentação versionada, revisada e publicada como se fosse código.", en: "Markdown, Git and GitHub: documentation versioned, reviewed and shipped like code." } },
    { t: { pt: "Documentação de API", en: "API documentation" }, d: { pt: "REST: endpoints, autenticação e fluxos de permissão. Uso Node.js/Express e Python para testar o que escrevo.", en: "REST: endpoints, authentication and permission flows. I use Node.js/Express and Python to test what I write." } },
    { t: { pt: "Arquitetura da informação (Diátaxis)", en: "Information architecture (Diátaxis)" }, d: { pt: "Tutoriais, guias de como fazer, referência e explicação, cada um no seu lugar.", en: "Tutorials, how-to guides, reference and explanation, each in its place." } },
    { t: { pt: "Cibersegurança e identidade", en: "Cybersecurity and identity" }, d: { pt: "Acesso privilegiado (PAM), IAM, controle de acesso, certificados, permissões e segurança de rede.", en: "Privileged access (PAM), IAM, access control, certificates, permissions and network security." } },
    { t: { pt: "Guias de administração", en: "Admin guides" }, d: { pt: "Procedimentos e referências de configuração que o administrador consegue seguir de primeira.", en: "Procedures and configuration references that an admin can follow on the first try." } },
    { t: { pt: "Planejamento no Jira", en: "Planning in Jira" }, d: { pt: "A documentação entra na sprint e é entregue no mesmo prazo da funcionalidade.", en: "Docs go into the sprint and ship on the same deadline as the feature." } },
    { t: { pt: "Produto e engenharia", en: "Product and engineering" }, d: { pt: "Refinamento com PO, Tech Lead, desenvolvedores, QA e UX, e revisão técnica antes de publicar.", en: "Refinement with the PO, Tech Lead, developers, QA and UX, and technical review before publishing." } },
    { t: { pt: "Vídeos, base de conhecimento e notas de versão", en: "Videos, knowledge base and release notes" }, d: { pt: "Tutoriais em vídeo, manuais do usuário, base de conhecimento e release notes.", en: "Video tutorials, user manuals, knowledge bases and release notes." } },
    { t: { pt: "Bilíngue, todos os dias", en: "Bilingual, every day" }, d: { pt: "Inglês e português no dia a dia, com escrita assistida por IA sempre com revisão humana.", en: "English and Portuguese day to day, with AI-assisted writing always under human review." } },
  ],
  experience: [
    {
      when: { pt: "2025 — hoje", en: "2025 — present" },
      role: { pt: "Technical Writer", en: "Technical Writer" },
      org: { pt: "Empresa de cibersegurança (gestão de acesso privilegiado) · remoto", en: "Cybersecurity company (privileged access management) · remote" },
      points: {
        pt: [
          "Documento, todos os dias e em inglês e português, uma plataforma de segurança de identidade usada por times de segurança e de TI de grandes empresas. Já documentei vários módulos do produto de ponta a ponta e hoje cubro também um produto baseado em API.",
          "Cuido da documentação do refinamento à entrega: participo do refinamento com o PO, o Tech Lead, desenvolvedores, QA e UX para entender cada funcionalidade e definir o que a documentação precisa cobrir.",
          "Escrevo guias de administração, artigos de como fazer e referências de configuração que transformam conceitos de segurança (controle de acesso, certificados, permissões) em procedimentos passo a passo.",
          "Documento produtos de API: endpoints, autenticação e fluxos de permissão.",
          "Planejo e acompanho a documentação no Jira, dentro da sprint de desenvolvimento, para entregar no mesmo prazo da funcionalidade.",
          "Reviso os rascunhos com engenharia e QA para garantir a precisão técnica antes de publicar.",
        ],
        en: [
          "I document, every day and in English and Portuguese, an identity security platform used by enterprise security and IT teams. I have documented several product modules end to end and now also cover an API-based product.",
          "I own documentation from refinement to release: I join refinement with the PO, Tech Lead, developers, QA and UX to understand each feature and define what the docs must cover.",
          "I write admin guides, how-to articles and configuration references that turn security concepts (access control, certificates, permissions) into step-by-step procedures.",
          "I document API products: endpoints, authentication and permission flows.",
          "I plan and track documentation in Jira inside the development sprint, so docs ship on the same deadline as the feature.",
          "I review drafts with engineering and QA for technical accuracy before publishing.",
        ],
      },
    },
    {
      when: { pt: "2019 — 2025", en: "2019 — 2025" },
      role: { pt: "Suporte ao cliente, do Nível I ao Nível IV (Team Lead)", en: "Customer support, from Level I to Level IV (Team Lead)" },
      org: { pt: "Empresa de software · seis anos", en: "Software company · six years" },
      points: {
        pt: [
          "Os seis anos de suporte me ensinaram exatamente onde a documentação falha: eu era a pessoa que o usuário chamava quando o manual não tinha a resposta.",
          "Liderei uma equipe de 10 pessoas, conduzi o onboarding de clientes, treinei novos contratados e mantive o manual do usuário atualizado.",
          "Criei mais de 50 tutoriais em vídeo passo a passo, que viraram o principal recurso de treinamento do time.",
          "Atendi mais de 600 chats por semana e executei testes manuais e de estresse em cada funcionalidade nova antes da entrega.",
        ],
        en: [
          "Six years of support taught me exactly where docs fail: I was the person users called when the manual had no answer.",
          "I led a team of 10, ran client onboarding, trained new hires and kept the user manual up to date.",
          "I created 50+ step-by-step video tutorials that became the team's core training resource.",
          "I handled 600+ customer chats a week while running manual and stress tests on every new feature before release.",
        ],
      },
    },
    {
      when: { pt: "2018", en: "2018" },
      role: { pt: "Instrutor de informática", en: "IT instructor" },
      org: { pt: "Ensino profissional", en: "Professional training" },
      points: { pt: [], en: [] },
    },
    {
      when: { pt: "2015 — 2017", en: "2015 — 2017" },
      role: { pt: "Analista técnico", en: "Technical analyst" },
      org: { pt: "Segurança e automação", en: "Safety and automation" },
      points: { pt: [], en: [] },
    },
    {
      when: { pt: "2014 — 2015", en: "2014 — 2015" },
      role: { pt: "Instrutor de informática", en: "IT instructor" },
      org: { pt: "Ensino profissional", en: "Professional training" },
      points: { pt: [], en: [] },
    },
  ],
  education: [
    { pt: "Análise e Desenvolvimento de Sistemas · Anhanguera (em andamento)", en: "Systems Analysis and Development · Anhanguera (in progress)" },
    { pt: "Técnico em Informática · Escola Técnica Mesquita", en: "IT Technician · Escola Técnica Mesquita" },
  ],
  certificates: [
    "Cybersecurity: Network Fundamentals and Practices · Alura",
    "Cybersecurity: Understanding the Uses of AI for Security · Alura",
    "Python: Applied Artificial Intelligence · Alura",
    "APIs com Node.js e Express · Alura",
    "Technical Writing · Alura",
  ],
};
