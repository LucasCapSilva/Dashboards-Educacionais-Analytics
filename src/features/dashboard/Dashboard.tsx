import { useMemo } from 'react';
import { Users, BookOpen, GraduationCap, Activity } from 'lucide-react';
import { StatCard } from '../../components/ui/StatCard';
import { Card } from '../../components/ui/Card';
import { progressChartData } from '../../mockData';
import { useThemeStore } from '../../store/themeStore';
import { useDataStore } from '../../store/dataStore';
import { 
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  BarChart, Bar, PieChart, Pie, Cell, Legend
} from 'recharts';

export default function Dashboard() {
  const { colors, themeMode } = useThemeStore();
  const { students, courses } = useDataStore();
  
  const isDark = themeMode === 'dark';
  const axisColor = isDark ? '#9CA3AF' : '#6B7280';
  const gridColor = isDark ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.05)';
  const tooltipBg = isDark ? '#1F2937' : '#FFFFFF';
  const tooltipBorder = isDark ? '#374151' : '#E5E7EB';
  const tooltipText = isDark ? '#F9FAFB' : '#111827';

  const icons = [
    <Users className="w-5 h-5" />,
    <Activity className="w-5 h-5" />,
    <GraduationCap className="w-5 h-5" />,
    <BookOpen className="w-5 h-5" />
  ];

  const pieColors = ['#3B82F6', '#10B981', '#EF4444'];

  const statusDistributionData = useMemo(() => [
    { name: 'Ativos', value: students.filter(s => s.status === 'ativo').length, color: pieColors[0] },
    { name: 'Formados', value: students.filter(s => s.status === 'formado').length, color: pieColors[1] },
    { name: 'Evadidos', value: students.filter(s => s.status === 'evadido').length, color: pieColors[2] },
  ], [students]);

  const generalMetrics = useMemo(() => {
    const totalStudents = students.length;
    const activeStudents = students.filter(s => s.status === 'ativo').length;
    const completedStudents = students.filter(s => s.status === 'formado').length;
    const avgEngagement = totalStudents > 0 
      ? Math.round(students.reduce((acc, s) => acc + s.engagementScore, 0) / totalStudents) 
      : 0;

    const retentionRate = totalStudents > 0 
      ? Math.round(((totalStudents - students.filter(s => s.status === 'evadido').length) / totalStudents) * 100) 
      : 0;

    const completionRate = totalStudents > 0 
      ? Math.round((completedStudents / totalStudents) * 100) 
      : 0;

    return [
      { id: 'm1', label: 'Taxa de Retenção', value: `${retentionRate}%`, change: 2.5, trend: 'up' as const },
      { id: 'm2', label: 'Engajamento Médio', value: `${avgEngagement}/100`, change: 5.1, trend: 'up' as const },
      { id: 'm3', label: 'Taxa de Conclusão', value: `${completionRate}%`, change: -1.2, trend: 'down' as const },
      { id: 'm4', label: 'Alunos Ativos', value: activeStudents, change: 12, trend: 'up' as const },
    ];
  }, [students]);

  const coursePerformanceData = useMemo(() => {
    return courses.map(c => {
      const courseStudents = students.filter(s => s.courseId === c.id);
      const avgGrade = courseStudents.length > 0 
        ? courseStudents.reduce((acc, s) => acc + s.grade, 0) / courseStudents.length 
        : 0;
      const avgEng = courseStudents.length > 0 
        ? courseStudents.reduce((acc, s) => acc + s.engagementScore, 0) / courseStudents.length 
        : 0;

      return {
        name: c.name.split(' ')[0], // short name
        nota: Number(avgGrade.toFixed(1)),
        engajamento: Math.round(avgEng)
      };
    });
  }, [courses, students]);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Dashboard Geral</h1>
          <p className="text-gray-500 dark:text-gray-400 mt-1">Visão geral do desempenho e engajamento do bootcamp.</p>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {generalMetrics.map((metric, index) => (
          <StatCard
            key={metric.id}
            title={metric.label}
            value={metric.value}
            change={metric.change}
            trend={metric.trend}
            icon={icons[index]}
            delay={index * 0.1}
          />
        ))}
      </div>

      {/* Charts Row 1 */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Line Chart - Evolução */}
        <Card delay={0.4} className="lg:col-span-2 p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Evolução de Alunos</h3>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={progressChartData} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke={gridColor} vertical={false} />
                <XAxis dataKey="name" stroke={axisColor} fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke={axisColor} fontSize={12} tickLine={false} axisLine={false} />
                <Tooltip 
                  contentStyle={{ backgroundColor: tooltipBg, borderColor: tooltipBorder, color: tooltipText, borderRadius: '8px' }}
                  itemStyle={{ color: tooltipText }}
                />
                <Legend iconType="circle" wrapperStyle={{ fontSize: '12px', paddingTop: '10px' }} />
                <Line type="monotone" dataKey="ativos" name="Ativos" stroke={colors[500]} strokeWidth={3} dot={{ r: 4, strokeWidth: 2 }} activeDot={{ r: 6 }} />
                <Line type="monotone" dataKey="concluidos" name="Concluídos" stroke="#10B981" strokeWidth={3} dot={{ r: 4, strokeWidth: 2 }} />
                <Line type="monotone" dataKey="evadidos" name="Evadidos" stroke="#EF4444" strokeWidth={3} dot={{ r: 4, strokeWidth: 2 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </Card>

        {/* Pie Chart - Status */}
        <Card delay={0.5} className="p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Distribuição de Status</h3>
          <div className="h-[300px] w-full flex items-center justify-center relative">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={statusDistributionData}
                  cx="50%"
                  cy="50%"
                  innerRadius={80}
                  outerRadius={110}
                  paddingAngle={5}
                  dataKey="value"
                  stroke="none"
                >
                  {statusDistributionData.map((_, index) => (
                    <Cell key={`cell-${index}`} fill={pieColors[index % pieColors.length]} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ backgroundColor: tooltipBg, borderColor: tooltipBorder, color: tooltipText, borderRadius: '8px' }}
                  itemStyle={{ color: tooltipText }}
                />
              </PieChart>
            </ResponsiveContainer>
            {/* Center Text */}
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
              <span className="text-3xl font-bold text-gray-900 dark:text-white">
                {statusDistributionData.reduce((acc, curr) => acc + curr.value, 0)}
              </span>
              <span className="text-xs text-gray-500 dark:text-gray-400">Total</span>
            </div>
          </div>
          <div className="flex justify-center gap-4 mt-2">
            {statusDistributionData.map((item, index) => (
              <div key={item.name} className="flex items-center text-xs text-gray-500 dark:text-gray-400">
                <span className="w-3 h-3 rounded-full mr-2" style={{ backgroundColor: pieColors[index] }}></span>
                {item.name}
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Charts Row 2 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card delay={0.6} className="p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Performance por Turma (Notas)</h3>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={coursePerformanceData} margin={{ top: 5, right: 0, bottom: 5, left: -20 }}>
                <CartesianGrid strokeDasharray="3 3" stroke={gridColor} vertical={false} />
                <XAxis dataKey="name" stroke={axisColor} fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke={axisColor} fontSize={12} tickLine={false} axisLine={false} domain={[0, 10]} />
                <Tooltip 
                  cursor={{ fill: isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)' }}
                  contentStyle={{ backgroundColor: tooltipBg, borderColor: tooltipBorder, color: tooltipText, borderRadius: '8px' }}
                />
                <Bar dataKey="nota" name="Média" fill={colors[500]} radius={[4, 4, 0, 0]} barSize={40} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card delay={0.7} className="p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Engajamento por Turma</h3>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={coursePerformanceData} margin={{ top: 5, right: 0, bottom: 5, left: -20 }}>
                <CartesianGrid strokeDasharray="3 3" stroke={gridColor} vertical={false} />
                <XAxis dataKey="name" stroke={axisColor} fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke={axisColor} fontSize={12} tickLine={false} axisLine={false} domain={[0, 100]} />
                <Tooltip 
                  cursor={{ fill: isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)' }}
                  contentStyle={{ backgroundColor: tooltipBg, borderColor: tooltipBorder, color: tooltipText, borderRadius: '8px' }}
                />
                <Bar dataKey="engajamento" name="Engajamento" fill="#8B5CF6" radius={[4, 4, 0, 0]} barSize={40} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>
    </div>
  );
}
