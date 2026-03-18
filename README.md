# 🚀 EdTech Analytics & Dashboard (White-Label)

![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Zustand](https://img.shields.io/badge/Zustand-764ABC?style=for-the-badge&logo=react&logoColor=white)
![Framer Motion](https://img.shields.io/badge/Framer_Motion-0055FF?style=for-the-badge&logo=framer&logoColor=white)
![Recharts](https://img.shields.io/badge/Recharts-22B573?style=for-the-badge&logo=react&logoColor=white)

Uma plataforma moderna de Business Intelligence (BI) e Dashboard Educacional projetada para Bootcamps de Tecnologia e EdTechs. O sistema oferece monitoramento avançado de desempenho acadêmico, retenção e engajamento dos alunos, construído sob uma arquitetura escalável e totalmente personalizável (White-Label).

## ✨ Principais Funcionalidades

### 📊 Dashboard Geral & KPIs
- Visualização instantânea de métricas críticas: **Taxa de Retenção**, **Engajamento Médio**, **Taxa de Conclusão** e **Alunos Ativos**.
- Gráficos dinâmicos e animados usando `Recharts`: Evolução mensal de alunos, distribuição de status (Ativos/Formados/Evadidos) e performance por turma.

### 👨‍🎓 Gestão de Alunos (com 1.000 dados mockados)
- Tabela interativa com suporte nativo a paginação.
- Filtros compostos: busca global por Nome/E-mail, filtragem por Status e por Curso.
- Visualização detalhada (Modal) com progresso, engajamento e histórico.
- Funcionalidade completa de **Adicionar**, **Visualizar Detalhes** e **Excluir** alunos.
- Exportação dinâmica de dados filtrados para arquivo **CSV**.

### 📚 Turmas e Cursos
- Monitoramento individualizado de turmas.
- KPIs específicos por curso (Média Geral, Conclusão, Evasão).
- Geração de relatórios segmentados (Exportação de CSV por turma).

### 📈 Analytics Avançado
- Gráfico de Dispersão cruzando o nível de engajamento do aluno com sua nota final.
- Gráfico Combinado (Área e Linha) comparando a evolução de aprendizado esperada vs real.
- Simulação de *Heatmap* de participação para identificar horários de pico e acesso.

### 🎨 Motor White-Label & Temas (Configurações)
- Painel de configuração nativo para personalização da identidade visual da EdTech.
- Alteração dinâmica do Nome da Instituição e upload de Logotipo customizado.
- Chaveamento de **Temas de Cor** (Indigo, Emerald, Rose, Amber).
- Suporte nativo e persistente a **Dark Mode** e **Light Mode** integrado perfeitamente ao Tailwind CSS.

---

## 🛠️ Arquitetura e Tecnologias

A aplicação foi desenvolvida seguindo os padrões de qualidade e arquitetura de um desenvolvedor Frontend Sênior:

- **Framework & Build:** [React 19](https://react.dev/) + [Vite](https://vitejs.dev/)
- **Linguagem:** [TypeScript](https://www.typescriptlang.org/) (Tipagem estática rigorosa)
- **Estilização:** [Tailwind CSS v4](https://tailwindcss.com/) (com suporte nativo ao novo `@theme` e Dark Mode via `@custom-variant`) + `clsx` + `tailwind-merge`
- **Gerenciamento de Estado:** [Zustand](https://zustand-demo.pmnd.rs/) (Gerenciamento global de dados dos alunos e persistência do tema em `localStorage`)
- **Animações:** [Framer Motion](https://www.framer.com/motion/) (Transições de página suaves, microinterações e modais)
- **Visualização de Dados:** [Recharts](https://recharts.org/)
- **Roteamento:** [React Router v7](https://reactrouter.com/) (Arquitetura Feature-based com `lazy loading` e `Suspense`)
- **Ícones:** [Lucide React](https://lucide.dev/)

---

## 📂 Estrutura do Projeto (Feature-Based)

```text
src/
├── components/          # Componentes globais e reutilizáveis
│   ├── layout/          # Header, Sidebar, MainLayout, ThemeInitializer
│   └── ui/              # Cards, Modais, StatCards base
├── features/            # Domínios de negócio da aplicação (Rotas)
│   ├── analytics/       # Página de Analytics Avançado
│   ├── courses/         # Gestão de Cursos e Turmas
│   ├── dashboard/       # Dashboard principal
│   ├── settings/        # Configurações White-Label e Temas
│   └── students/        # Listagem e CRUD de Alunos
├── mockData/            # JSON e Helpers com +1000 alunos e cursos simulados
├── store/               # Estados Globais (Zustand)
│   ├── dataStore.ts     # Estado da base de dados e busca global
│   └── themeStore.ts    # Estado do White-Label e Dark Mode
└── utils/               # Utilitários globais (ex: tailwind merge/clsx)
```

---

## 🚀 Como Executar o Projeto

### Pré-requisitos
- Node.js (v18 ou superior)
- NPM, Yarn ou PNPM

### Instalação

1. Clone o repositório e acesse a pasta do projeto:
```bash
cd edtech-analytics-white-label
```

2. Instale as dependências:
```bash
npm install
```

3. Execute o servidor de desenvolvimento:
```bash
npm run dev
```

4. Acesse a aplicação no seu navegador (geralmente em `http://localhost:5173`).

### Build para Produção

Para gerar a versão otimizada de produção:
```bash
npm run build
```
Os arquivos compilados estarão disponíveis na pasta `dist/`.

---

## 💡 Destaques Técnicos
- **Reatividade Plena:** Gráficos, métricas e tabelas estão conectados diretamente ao `dataStore`. Adicionar ou remover um aluno atualiza o Dashboard e os KPIs em tempo real.
- **Acessibilidade & UX:** Contraste de cores cuidadosamente escolhido, feedbacks de estado, placeholders e navegação por teclado nos Modais e Dropdowns de busca.
- **Busca Global Integrada:** O Header possui um sistema de busca inteligente que varre alunos e cursos instantaneamente e realiza o redirecionamento filtrado.
- **Desempenho (Performance):** Uso estratégico de `useMemo` para memorização de cálculos pesados (como as métricas de BI e paginação de 1.000 itens) e `React.lazy` para divisão de código nas rotas.

---

*Desenvolvido como um case técnico de arquitetura Frontend Sênior para o mercado EdTech e BI.*
