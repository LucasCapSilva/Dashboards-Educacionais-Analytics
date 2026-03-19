import { useMemo } from 'react';
import { Card } from '../../components/ui/Card';
import { useThemeStore } from '../../store/themeStore';
import { useDataStore } from '../../store/dataStore';
import { 
  ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer, ZAxis,
  Area, ComposedChart, Line
} from 'recharts';

const days = ['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb', 'Dom'];
const hours = ['08h', '10h', '12h', '14h', '16h', '18h', '20h', '22h'];

export default function Analytics() {
  const { colors, themeMode } = useThemeStore();
  const { students } = useDataStore();
  const isDark = themeMode === 'dark';
  
  const axisColor = isDark ? '#9CA3AF' : '#6B7280';
  const gridColor = isDark ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.05)';
  const tooltipBg = isDark ? '#1F2937' : '#FFFFFF';
  const tooltipBorder = isDark ? '#374151' : '#E5E7EB';
  const tooltipText = isDark ? '#F9FAFB' : '#111827';

  // Correlation data
  const correlationData = useMemo(() => students.map(s => ({
    x: s.engagementScore,
    y: s.grade,
    z: s.progress,
    name: s.name
  })), [students]);

  // Learning evolution mock
  const learningEvolutionData = [
    { week: 'Sem 1', expected: 10, actual: 12, avg: 11 },
    { week: 'Sem 2', expected: 25, actual: 22, avg: 24 },
    { week: 'Sem 3', expected: 40, actual: 45, avg: 41 },
    { week: 'Sem 4', expected: 60, actual: 58, avg: 59 },
    { week: 'Sem 5', expected: 80, actual: 75, avg: 78 },
    { week: 'Sem 6', expected: 100, actual: 95, avg: 97 },
  ];

  // Simulating a heatmap with scatter chart
  const heatmapData = useMemo(() => {
    const data = [];
    for (let i = 0; i < days.length; i++) {
      for (let j = 0; j < hours.length; j++) {
        data.push({
          day: i,
          hour: j,
          value: ((i + 1) * (j + 3) * 17 + students.length * 11) % 100,
          dayName: days[i],
          hourName: hours[j]
        });
      }
    }
    return data;
  }, [students.length]);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Analytics Avançado</h1>
        <p className="text-gray-500 dark:text-gray-400 mt-1">Insights detalhados e correlações de aprendizado.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Correlation Chart */}
        <Card delay={0.1} className="p-4 sm:p-5 md:p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Engajamento vs. Notas</h3>
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">Correlação entre o nível de engajamento do aluno e sua nota final.</p>
          <div className="h-[300px] sm:h-[320px] md:h-[350px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <ScatterChart margin={{ top: 10, right: 20, bottom: 20, left: -10 }}>
                <CartesianGrid strokeDasharray="3 3" stroke={gridColor} />
                <XAxis type="number" dataKey="x" name="Engajamento" unit="%" stroke={axisColor} fontSize={12} tickLine={false} axisLine={false} domain={[0, 100]} />
                <YAxis type="number" dataKey="y" name="Nota" stroke={axisColor} fontSize={12} tickLine={false} axisLine={false} domain={[0, 10]} />
                <ZAxis type="number" dataKey="z" range={[50, 400]} name="Progresso" unit="%" />
                <RechartsTooltip 
                  cursor={{ strokeDasharray: '3 3' }}
                  contentStyle={{ backgroundColor: tooltipBg, borderColor: tooltipBorder, color: tooltipText, borderRadius: '8px' }}
                />
                <Scatter name="Alunos" data={correlationData} fill={colors[500]} opacity={0.6} />
              </ScatterChart>
            </ResponsiveContainer>
          </div>
        </Card>

        {/* Learning Evolution */}
        <Card delay={0.2} className="p-4 sm:p-5 md:p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Evolução de Aprendizado</h3>
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">Comparação do ritmo de progresso atual versus o esperado.</p>
          <div className="h-[300px] sm:h-[320px] md:h-[350px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <ComposedChart data={learningEvolutionData} margin={{ top: 10, right: 20, bottom: 20, left: -10 }}>
                <CartesianGrid strokeDasharray="3 3" stroke={gridColor} vertical={false} />
                <XAxis dataKey="week" stroke={axisColor} fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke={axisColor} fontSize={12} tickLine={false} axisLine={false} domain={[0, 100]} />
                <RechartsTooltip 
                  contentStyle={{ backgroundColor: tooltipBg, borderColor: tooltipBorder, color: tooltipText, borderRadius: '8px' }}
                />
                <Area type="monotone" dataKey="expected" name="Esperado" fill={colors[500]} stroke="none" fillOpacity={0.1} />
                <Line type="monotone" dataKey="actual" name="Real" stroke={colors[500]} strokeWidth={3} dot={{ r: 4 }} activeDot={{ r: 6 }} />
                <Line type="monotone" dataKey="avg" name="Média Geral" stroke="#9CA3AF" strokeWidth={2} strokeDasharray="5 5" dot={false} />
              </ComposedChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>

      {/* Heatmap (simulated with Scatter) */}
      <Card delay={0.3} className="p-4 sm:p-5 md:p-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Heatmap de Participação (Horários de Pico)</h3>
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">Dias e horários com maior volume de acesso e resolução de exercícios.</p>
        <div className="h-[320px] sm:h-[360px] md:h-[400px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
              <XAxis 
                type="category" 
                dataKey="hourName" 
                name="Horário" 
                stroke={axisColor} 
                fontSize={12} 
                tickLine={false} 
                axisLine={false}
                allowDuplicatedCategory={false}
              />
              <YAxis 
                type="category" 
                dataKey="dayName" 
                name="Dia" 
                stroke={axisColor} 
                fontSize={12} 
                tickLine={false} 
                axisLine={false}
                allowDuplicatedCategory={false}
              />
              <ZAxis type="number" dataKey="value" range={[50, 1000]} name="Acessos" />
              <RechartsTooltip 
                cursor={{ strokeDasharray: '3 3' }}
                contentStyle={{ backgroundColor: tooltipBg, borderColor: tooltipBorder, color: tooltipText, borderRadius: '8px' }}
                formatter={(value, name) => [value, name === 'value' ? 'Acessos' : name]}
              />
              <Scatter data={heatmapData} fill={colors[500]} shape="square" opacity={0.8} />
            </ScatterChart>
          </ResponsiveContainer>
        </div>
      </Card>
    </div>
  );
}
