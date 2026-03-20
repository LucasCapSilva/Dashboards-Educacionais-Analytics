import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Blocks, Bot, CheckCircle2, Database, LayoutDashboard, ServerCog, ShieldCheck, Workflow } from 'lucide-react';
import { Link } from 'react-router-dom';

const technologyStack = [
  { title: 'Frontend', items: ['React', 'TypeScript', 'Tailwind CSS', 'Recharts'] },
  { title: 'Backend/API', items: ['Python', 'Flask', 'REST APIs'] },
  { title: 'Automação', items: ['Testes E2E e validação automatizada de fluxos'] },
  { title: 'Dados', items: ['MongoDB (documentos)', 'MySQL (dados relacionais)'] },
];

const objectives = [
  'Centralizar indicadores acadêmicos, operacionais e de evolução de aprendizagem em uma única experiência.',
  'Demonstrar como decisões pedagógicas podem ser aceleradas com visualização orientada por métricas.',
  'Servir como vitrine de arquitetura modular para soluções educacionais white label.',
];

const demoFeatures = [
  'Dashboard com visão executiva de performance de alunos, turmas e cursos.',
  'Filtros dinâmicos e navegação por módulos: alunos, cursos, analytics e configurações.',
  'Personalização visual de tema, identidade institucional e experiência multi-perfil.',
  'Métricas simuladas para cenários de risco de evasão, engajamento e evolução acadêmica.',
];

const architectureLayers = [
  {
    icon: LayoutDashboard,
    title: 'Camada de Apresentação',
    description:
      'Interface SPA em React com componentes reutilizáveis, estado global com Zustand e animações com Framer Motion.',
  },
  {
    icon: ServerCog,
    title: 'Camada de Serviços',
    description:
      'APIs Python/Flask expõem dados consolidados para dashboards, relatórios e rotinas de integração.',
  },
  {
    icon: Database,
    title: 'Camada de Dados',
    description:
      'Modelo híbrido: MongoDB para eventos e logs educacionais, MySQL para cadastros e relacionamentos transacionais.',
  },
  {
    icon: Bot,
    title: 'Camada de Automação',
    description:
      'Automação suporta testes E2E, validação de fluxos críticos e execução contínua de cenários demonstrativos.',
  },
];

const practicalUseCases = [
  {
    title: 'Gestão de risco acadêmico',
    description:
      'Identifica turmas com queda de desempenho e prioriza planos de ação com base em indicadores de frequência e notas.',
  },
  {
    title: 'Planejamento pedagógico',
    description:
      'Compara evolução por curso e período para ajustar carga horária, trilhas e intervenções pedagógicas.',
  },
  {
    title: 'Acompanhamento institucional',
    description:
      'Permite que direção e coordenação monitorem KPIs estratégicos com visão consolidada em tempo real.',
  },
];

const setMetaTag = (name: string, content: string, attr: 'name' | 'property' = 'name') => {
  let tag = document.querySelector(`meta[${attr}="${name}"]`) as HTMLMetaElement | null;
  if (!tag) {
    tag = document.createElement('meta');
    tag.setAttribute(attr, name);
    document.head.appendChild(tag);
  }
  tag.setAttribute('content', content);
};

export default function About() {
  useEffect(() => {
    document.title = 'Sobre | Dashboards Educacionais Analytics';
    setMetaTag(
      'description',
      'Apresentação técnica da plataforma demonstrativa de analytics educacional, arquitetura e tecnologias utilizadas.'
    );
    setMetaTag('og:title', 'Sobre | Dashboards Educacionais Analytics', 'property');
    setMetaTag(
      'og:description',
      'Visão técnica da solução com stack React, Python/Flask, MongoDB e MySQL.',
      'property'
    );
  }, []);

  return (
    <div className="space-y-8 md:space-y-10">
      <section className="glass-card overflow-hidden">
        <div className="grid grid-cols-1 gap-6 p-5 md:p-6 lg:grid-cols-[1.2fr_1fr] lg:items-center">
          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.08 }} className="space-y-4">
            <span className="inline-flex rounded-full bg-brand-100 px-3 py-1 text-xs font-bold uppercase tracking-wide text-brand-700 dark:bg-brand-500/20 dark:text-brand-300">
              Sobre a aplicação
            </span>
            <h1 className="text-3xl font-bold leading-tight text-gray-900 dark:text-white md:text-4xl">
              Plataforma demonstrativa de analytics educacional com foco em arquitetura, dados e escala
            </h1>
            <p className="text-gray-600 dark:text-gray-300">
              Esta solução foi criada para demonstrar, de forma prática, como produtos educacionais modernos podem integrar visualização analítica, serviços de dados e automação operacional em um único sistema.
            </p>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
              <div className="rounded-xl bg-gray-100 p-3 dark:bg-[#12141a]">
                <p className="text-2xl font-bold text-brand-600 dark:text-brand-300">5</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">camadas técnicas integradas</p>
              </div>
              <div className="rounded-xl bg-gray-100 p-3 dark:bg-[#12141a]">
                <p className="text-2xl font-bold text-brand-600 dark:text-brand-300">20+</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">indicadores simulados</p>
              </div>
              <div className="rounded-xl bg-gray-100 p-3 dark:bg-[#12141a]">
                <p className="text-2xl font-bold text-brand-600 dark:text-brand-300">100%</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">foco em demonstração funcional</p>
              </div>
            </div>
            <div>
              <Link
                to="/"
                className="inline-flex items-center gap-2 rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-100 dark:border-gray-700 dark:text-gray-200 dark:hover:bg-white/5"
              >
                Voltar para Home
              </Link>
            </div>
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-white/10 dark:bg-[#12141a]">
            <div className="mb-4 inline-flex rounded-lg bg-brand-100 p-2 text-brand-600 dark:bg-brand-500/20 dark:text-brand-300">
              <Blocks size={20} />
            </div>
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">Objetivos principais</h2>
            <div className="mt-4 space-y-3 text-sm text-gray-600 dark:text-gray-300">
              {objectives.map((item) => (
                <p key={item} className="flex items-start gap-2">
                  <CheckCircle2 size={16} className="mt-0.5 text-brand-500" />
                  {item}
                </p>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      <section className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <motion.article initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} className="glass-card p-5 md:p-6">
          <div className="mb-4 flex items-center gap-2">
            <Workflow className="text-brand-500" size={20} />
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">Stack tecnológica</h2>
          </div>
          <div className="space-y-4">
            {technologyStack.map((group) => (
              <div key={group.title} className="rounded-xl border border-gray-200 bg-white p-4 dark:border-white/10 dark:bg-[#12141a]">
                <p className="font-semibold text-gray-900 dark:text-white">{group.title}</p>
                <p className="mt-1 text-sm text-gray-600 dark:text-gray-300">{group.items.join(' · ')}</p>
              </div>
            ))}
          </div>
        </motion.article>

        <motion.article initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} className="glass-card p-5 md:p-6">
          <div className="mb-4 flex items-center gap-2">
            <ShieldCheck className="text-brand-500" size={20} />
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">Funcionalidades demonstrativas</h2>
          </div>
          <ul className="space-y-3 text-sm text-gray-600 dark:text-gray-300">
            {demoFeatures.map((item) => (
              <li key={item} className="flex items-start gap-3">
                <CheckCircle2 size={18} className="mt-0.5 text-brand-500" />
                {item}
              </li>
            ))}
          </ul>
        </motion.article>
      </section>

      <section className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <motion.article initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} className="glass-card p-5 md:p-6">
          <div className="mb-4 flex items-center gap-2">
            <ServerCog className="text-brand-500" size={20} />
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">Arquitetura do sistema</h2>
          </div>
          <div className="space-y-3">
            {architectureLayers.map((layer) => (
              <article key={layer.title} className="rounded-xl border border-gray-200 bg-white p-4 dark:border-white/10 dark:bg-[#12141a]">
                <p className="inline-flex items-center gap-2 font-semibold text-gray-900 dark:text-white">
                  <layer.icon size={16} className="text-brand-500" />
                  {layer.title}
                </p>
                <p className="mt-1 text-sm text-gray-600 dark:text-gray-300">{layer.description}</p>
              </article>
            ))}
          </div>
          <div className="mt-6 rounded-xl border border-gray-200 bg-white p-4 dark:border-white/10 dark:bg-[#12141a]">
            <p className="text-sm text-gray-600 dark:text-gray-300">
              Arquitetura orientada a modularidade, pronta para evoluir para cenários reais de instituições com múltiplas unidades e perfis de acesso.
            </p>
          </div>
        </motion.article>

        <motion.article initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.08 }} className="glass-card p-5 md:p-6">
          <h2 className="mb-4 text-xl font-bold text-gray-900 dark:text-white">Casos práticos de aplicação</h2>
          <div className="space-y-3">
            {practicalUseCases.map((item) => (
              <article key={item.title} className="rounded-xl border border-gray-200 bg-white p-4 dark:border-white/10 dark:bg-[#12141a]">
                <p className="font-semibold text-gray-900 dark:text-white">{item.title}</p>
                <p className="mt-1 text-sm text-gray-600 dark:text-gray-300">{item.description}</p>
              </article>
            ))}
          </div>
          <div className="mt-4 rounded-xl bg-brand-50 p-3 text-sm text-brand-700 dark:bg-brand-500/20 dark:text-brand-300">
            Este ambiente foi projetado como material de apresentação técnica para equipes de produto, tecnologia, gestão acadêmica e stakeholders institucionais.
          </div>
        </motion.article>
      </section>
    </div>
  );
}
