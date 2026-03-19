import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { ArrowRight, BookOpenText, Building2, ChartColumnIncreasing, GraduationCap, Mail, PhoneCall, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';

const learningTrend = [
  { mes: 'Jan', resultado: 62 },
  { mes: 'Fev', resultado: 69 },
  { mes: 'Mar', resultado: 73 },
  { mes: 'Abr', resultado: 79 },
  { mes: 'Mai', resultado: 84 },
  { mes: 'Jun', resultado: 90 },
];

const serviceCards = [
  {
    title: 'Gestão Acadêmica Inteligente',
    description: 'Acompanhe desempenho de turmas, progresso individual e indicadores críticos em tempo real.',
    icon: GraduationCap,
    image:
      'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1400&q=80',
  },
  {
    title: 'Analytics Educacional Avançado',
    description: 'Use métricas e visualizações estratégicas para orientar decisões pedagógicas de alto impacto.',
    icon: ChartColumnIncreasing,
    image:
      'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1400&q=80',
  },
  {
    title: 'Portal White Label',
    description: 'Personalize marca, cores e experiência digital com identidade institucional consistente.',
    icon: Building2,
    image:
      'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&w=1400&q=80',
  },
];

const testimonials = [
  {
    name: 'Camila Rocha',
    role: 'Coordenadora Pedagógica',
    text: 'Conseguimos antecipar riscos de evasão e elevar o engajamento dos alunos em poucas semanas.',
  },
  {
    name: 'Marcelo Tavares',
    role: 'Diretor Acadêmico',
    text: 'A visão consolidada dos dados transformou nossa gestão. A plataforma é elegante e muito eficiente.',
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

export default function Home() {
  useEffect(() => {
    document.title = 'Home | Dashboards Educacionais Analytics';
    setMetaTag(
      'description',
      'Portal educacional com dashboards modernos para gestão acadêmica, analytics e evolução de desempenho.'
    );
    setMetaTag('og:title', 'Home | Dashboards Educacionais Analytics', 'property');
    setMetaTag(
      'og:description',
      'Plataforma white label para acompanhar alunos, cursos e indicadores educacionais com alta qualidade visual.',
      'property'
    );
  }, []);

  return (
    <div className="space-y-8 md:space-y-10">
      <section className="glass-card overflow-hidden">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-gray-200 px-4 py-3 dark:border-white/10 md:px-6">
          <div className="inline-flex items-center gap-2 text-sm font-semibold text-brand-600 dark:text-brand-400">
            <Sparkles size={16} />
            Dashboards Educacionais Analytics
          </div>
          <nav aria-label="Navegação da página inicial" className="flex items-center gap-2 text-sm">
            <Link
              to="/"
              className="rounded-md px-3 py-1.5 font-medium text-brand-700 transition-colors hover:bg-brand-50 dark:text-brand-300 dark:hover:bg-brand-500/10"
            >
              Home
            </Link>
            <Link
              to="/about"
              className="rounded-md px-3 py-1.5 font-medium text-gray-600 transition-colors hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-white/5"
            >
              Sobre
            </Link>
            <Link
              to="/dashboard"
              className="rounded-md px-3 py-1.5 font-medium text-gray-600 transition-colors hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-white/5"
            >
              Dashboard
            </Link>
          </nav>
        </div>

        <div className="grid grid-cols-1 gap-6 p-4 md:p-6 lg:grid-cols-2 lg:items-center">
          <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} className="space-y-5">
            <span className="inline-flex items-center rounded-full bg-brand-100 px-3 py-1 text-xs font-bold uppercase tracking-wide text-brand-700 dark:bg-brand-500/20 dark:text-brand-300">
              Educação orientada por dados
            </span>
            <h1 className="text-3xl font-bold leading-tight text-gray-900 dark:text-white md:text-4xl">
              Plataforma moderna para transformar indicadores educacionais em decisões estratégicas
            </h1>
            <p className="text-gray-600 dark:text-gray-300">
              Estruture sua operação com dashboards profissionais, visualizações intuitivas e experiência fluida para equipe acadêmica, gestão e diretoria.
            </p>
            <div className="flex flex-col gap-3 sm:flex-row">
              <Link
                to="/dashboard"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-brand-600 px-5 py-3 font-semibold text-white transition-colors hover:bg-brand-700"
              >
                Explorar dashboard
                <ArrowRight size={18} />
              </Link>
              <Link
                to="/about"
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-gray-300 px-5 py-3 font-semibold text-gray-700 transition-colors hover:bg-gray-100 dark:border-gray-700 dark:text-gray-200 dark:hover:bg-white/5"
              >
                Conhecer especialista
              </Link>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, scale: 0.97 }} animate={{ opacity: 1, scale: 1 }} className="relative">
            <img
              src="https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&w=1900&q=80"
              alt="Equipe acadêmica analisando resultados em painel digital"
              loading="eager"
              fetchPriority="high"
              className="h-[280px] w-full rounded-2xl object-cover shadow-xl md:h-[360px]"
            />
            <div className="absolute bottom-4 right-4 rounded-xl bg-white/90 p-3 text-sm shadow-lg backdrop-blur dark:bg-[#0f1117]/85">
              <p className="text-xs text-gray-500 dark:text-gray-400">Evolução média de desempenho</p>
              <p className="text-lg font-bold text-brand-600 dark:text-brand-300">+28%</p>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {serviceCards.map((service, index) => (
          <motion.article
            key={service.title}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.08 }}
            className="glass-card overflow-hidden"
          >
            <img src={service.image} alt={service.title} loading="lazy" className="h-40 w-full object-cover" />
            <div className="space-y-3 p-5">
              <div className="inline-flex rounded-lg bg-brand-100 p-2 text-brand-600 dark:bg-brand-500/20 dark:text-brand-300">
                <service.icon size={20} />
              </div>
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">{service.title}</h2>
              <p className="text-sm text-gray-600 dark:text-gray-300">{service.description}</p>
            </div>
          </motion.article>
        ))}
      </section>

      <section className="grid grid-cols-1 gap-6 lg:grid-cols-5">
        <motion.article
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          className="glass-card min-w-0 p-5 lg:col-span-3"
        >
          <h3 className="mb-4 text-lg font-bold text-gray-900 dark:text-white">Tendência de Aprendizado</h3>
          <div className="h-[240px] min-w-0">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={learningTrend}>
                <defs>
                  <linearGradient id="trendGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="var(--brand-500)" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="var(--brand-500)" stopOpacity={0.05} />
                  </linearGradient>
                </defs>
                <XAxis dataKey="mes" axisLine={false} tickLine={false} tick={{ fill: 'currentColor', opacity: 0.7 }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fill: 'currentColor', opacity: 0.7 }} />
                <Tooltip
                  formatter={(value: unknown) => [`${Number((Array.isArray(value) ? value[0] : value) ?? 0)} pts`, 'Resultado']}
                  contentStyle={{
                    backgroundColor: 'rgba(255,255,255,0.98)',
                    borderColor: '#e5e7eb',
                    borderRadius: '10px',
                  }}
                />
                <Area type="monotone" dataKey="resultado" stroke="var(--brand-500)" strokeWidth={2.5} fill="url(#trendGradient)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </motion.article>

        <motion.article
          initial={{ opacity: 0, x: 10 }}
          animate={{ opacity: 1, x: 0 }}
          className="glass-card space-y-4 p-5 lg:col-span-2"
        >
          <h3 className="text-lg font-bold text-gray-900 dark:text-white">Depoimentos de clientes</h3>
          <div className="space-y-3">
            {testimonials.map((item) => (
              <article key={item.name} className="rounded-xl border border-gray-200 bg-white p-4 dark:border-white/10 dark:bg-[#12141a]">
                <p className="text-sm text-gray-600 dark:text-gray-300">{item.text}</p>
                <div className="mt-3">
                  <p className="font-semibold text-gray-900 dark:text-white">{item.name}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">{item.role}</p>
                </div>
              </article>
            ))}
          </div>
          <Link
            to="/about"
            className="inline-flex items-center justify-center rounded-xl bg-gray-900 px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-gray-800 dark:bg-brand-600 dark:hover:bg-brand-700"
          >
            Ver perfil profissional
          </Link>
        </motion.article>
      </section>

      <footer className="glass-card px-5 py-6">
        <div className="flex flex-col gap-4 text-sm text-gray-600 dark:text-gray-300 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="font-semibold text-gray-900 dark:text-white">Dashboards Educacionais Analytics</p>
            <p className="mt-1 inline-flex items-center gap-2">
              <Mail size={14} />
              contato@analyticseducacional.com.br
            </p>
          </div>
          <div>
            <p className="inline-flex items-center gap-2">
              <PhoneCall size={14} />
              +55 (11) 4002-7788
            </p>
            <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">Av. Paulista, 1200 · São Paulo, SP</p>
          </div>
          <div className="inline-flex items-center gap-2 rounded-lg bg-brand-50 px-3 py-2 text-xs font-medium text-brand-700 dark:bg-brand-500/20 dark:text-brand-300">
            <BookOpenText size={14} />
            Soluções educacionais com foco em performance
          </div>
        </div>
      </footer>
    </div>
  );
}
