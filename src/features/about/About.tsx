import type { FormEvent } from 'react';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Award, BriefcaseBusiness, CheckCircle2, Mail, PhoneCall, Star, Target, UserRound } from 'lucide-react';
import { Link } from 'react-router-dom';

const qualifications = [
  'Mestrado em Gestão Educacional e Tecnologia',
  'MBA em Data Analytics para Educação',
  'Certificação em Business Intelligence e Visualização de Dados',
];

const experiences = [
  'Liderança de transformação digital em redes de ensino com mais de 40 mil alunos',
  'Implantação de dashboards de aprendizagem e retenção para ensino técnico e superior',
  'Consultoria para instituições focadas em performance acadêmica e redução de evasão',
];

const specialties = [
  'Estratégia de dados para educação',
  'Indicadores de desempenho e aprendizagem',
  'Governança acadêmica baseada em métricas',
  'Jornada digital de alunos e docentes',
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
  const [sent, setSent] = useState(false);

  useEffect(() => {
    document.title = 'Sobre | Dashboards Educacionais Analytics';
    setMetaTag(
      'description',
      'Conheça o especialista por trás da estratégia de analytics educacional, com foco em performance e gestão acadêmica.'
    );
    setMetaTag('og:title', 'Sobre | Dashboards Educacionais Analytics', 'property');
    setMetaTag(
      'og:description',
      'Perfil profissional com biografia, qualificações, experiência, áreas de especialização e formulário de contato.',
      'property'
    );
  }, []);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSent(true);
  };

  return (
    <div className="space-y-8 md:space-y-10">
      <section className="glass-card overflow-hidden">
        <div className="grid grid-cols-1 gap-6 p-5 md:p-6 lg:grid-cols-[320px_1fr] lg:items-center">
          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="mx-auto w-full max-w-[320px]">
            <img
              src="https://images.unsplash.com/photo-1568602471122-7832951cc4c5?auto=format&fit=crop&w=900&q=80"
              alt="Especialista em analytics educacional"
              loading="eager"
              fetchPriority="high"
              className="h-[350px] w-full rounded-2xl object-cover shadow-lg"
            />
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.08 }} className="space-y-4">
            <span className="inline-flex rounded-full bg-brand-100 px-3 py-1 text-xs font-bold uppercase tracking-wide text-brand-700 dark:bg-brand-500/20 dark:text-brand-300">
              Sobre profissional
            </span>
            <h1 className="text-3xl font-bold leading-tight text-gray-900 dark:text-white md:text-4xl">
              Rafael Mendes, especialista em inteligência educacional e performance acadêmica
            </h1>
            <p className="text-gray-600 dark:text-gray-300">
              Profissional com mais de 13 anos de atuação em educação, tecnologia e gestão orientada a dados. Constrói estratégias para elevar engajamento, resultados de aprendizagem e eficiência operacional em instituições de ensino.
            </p>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
              <div className="rounded-xl bg-gray-100 p-3 dark:bg-[#12141a]">
                <p className="text-2xl font-bold text-brand-600 dark:text-brand-300">13+</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">anos de experiência</p>
              </div>
              <div className="rounded-xl bg-gray-100 p-3 dark:bg-[#12141a]">
                <p className="text-2xl font-bold text-brand-600 dark:text-brand-300">70+</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">projetos entregues</p>
              </div>
              <div className="rounded-xl bg-gray-100 p-3 dark:bg-[#12141a]">
                <p className="text-2xl font-bold text-brand-600 dark:text-brand-300">95%</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">satisfação média</p>
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
        </div>
      </section>

      <section className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <motion.article initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} className="glass-card p-5 md:p-6">
          <div className="mb-4 flex items-center gap-2">
            <Award className="text-brand-500" size={20} />
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">Qualificações</h2>
          </div>
          <ul className="space-y-3 text-sm text-gray-600 dark:text-gray-300">
            {qualifications.map((item) => (
              <li key={item} className="flex items-start gap-3">
                <CheckCircle2 size={18} className="mt-0.5 text-brand-500" />
                {item}
              </li>
            ))}
          </ul>
        </motion.article>

        <motion.article initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} className="glass-card p-5 md:p-6">
          <div className="mb-4 flex items-center gap-2">
            <BriefcaseBusiness className="text-brand-500" size={20} />
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">Experiência Profissional</h2>
          </div>
          <ul className="space-y-3 text-sm text-gray-600 dark:text-gray-300">
            {experiences.map((item) => (
              <li key={item} className="flex items-start gap-3">
                <UserRound size={18} className="mt-0.5 text-brand-500" />
                {item}
              </li>
            ))}
          </ul>
        </motion.article>
      </section>

      <section className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <motion.article initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} className="glass-card p-5 md:p-6">
          <div className="mb-4 flex items-center gap-2">
            <Target className="text-brand-500" size={20} />
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">Áreas de Especialização</h2>
          </div>
          <ul className="space-y-3 text-sm text-gray-600 dark:text-gray-300">
            {specialties.map((item) => (
              <li key={item} className="flex items-start gap-3">
                <CheckCircle2 size={18} className="mt-0.5 text-brand-500" />
                {item}
              </li>
            ))}
          </ul>
          <div className="mt-6 rounded-xl border border-gray-200 bg-white p-4 dark:border-white/10 dark:bg-[#12141a]">
            <p className="text-sm text-gray-600 dark:text-gray-300">
              "A melhor decisão educacional nasce da combinação entre dados confiáveis, visão pedagógica e ação rápida."
            </p>
          </div>
        </motion.article>

        <motion.article initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.08 }} className="glass-card p-5 md:p-6">
          <h2 className="mb-4 text-xl font-bold text-gray-900 dark:text-white">Formulário de Contato</h2>
          <form onSubmit={handleSubmit} className="space-y-3" aria-label="Formulário de contato profissional">
            <input
              type="text"
              required
              placeholder="Seu nome"
              className="w-full rounded-lg border border-gray-200 bg-gray-50 px-4 py-2.5 text-gray-900 outline-none transition-colors focus:border-brand-400 dark:border-gray-700 dark:bg-[#12141a] dark:text-white"
            />
            <input
              type="email"
              required
              placeholder="Seu e-mail"
              className="w-full rounded-lg border border-gray-200 bg-gray-50 px-4 py-2.5 text-gray-900 outline-none transition-colors focus:border-brand-400 dark:border-gray-700 dark:bg-[#12141a] dark:text-white"
            />
            <textarea
              rows={4}
              required
              placeholder="Descreva seu objetivo educacional"
              className="w-full rounded-lg border border-gray-200 bg-gray-50 px-4 py-2.5 text-gray-900 outline-none transition-colors focus:border-brand-400 dark:border-gray-700 dark:bg-[#12141a] dark:text-white"
            />
            <button
              type="submit"
              className="inline-flex w-full items-center justify-center rounded-xl bg-brand-600 px-5 py-3 font-semibold text-white transition-colors hover:bg-brand-700"
            >
              Enviar mensagem
            </button>
            {sent && <p className="text-sm font-medium text-emerald-600 dark:text-emerald-400">Contato enviado com sucesso.</p>}
          </form>

          <div className="mt-4 space-y-2 text-sm text-gray-600 dark:text-gray-300">
            <p className="flex items-center gap-2">
              <Mail size={16} className="text-brand-500" />
              rafael.mendes@eduanalytics.com.br
            </p>
            <p className="flex items-center gap-2">
              <PhoneCall size={16} className="text-brand-500" />
              +55 (11) 97777-4123
            </p>
          </div>
          <div className="mt-4 rounded-xl bg-brand-50 p-3 text-sm text-brand-700 dark:bg-brand-500/20 dark:text-brand-300">
            <p className="inline-flex items-center gap-2">
              <Star size={16} />
              Atendimento consultivo para instituições de ensino.
            </p>
          </div>
        </motion.article>
      </section>
    </div>
  );
}
