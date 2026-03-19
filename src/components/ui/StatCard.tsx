import React from 'react';
import { Card } from './Card';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';
import { cn } from '../../utils/cn';
import { useThemeStore } from '../../store/themeStore';

interface StatCardProps {
  title: string;
  value: string | number;
  change?: number;
  trend?: 'up' | 'down' | 'neutral';
  icon?: React.ReactNode;
  delay?: number;
}

export function StatCard({ title, value, change, trend, icon, delay = 0 }: StatCardProps) {
  const { colors } = useThemeStore();

  return (
    <Card delay={delay} className="p-6 flex flex-col justify-between relative overflow-hidden">
      <div className="flex justify-between items-start mb-4">
        <h3 className="text-gray-500 dark:text-gray-400 text-sm font-medium">{title}</h3>
        {icon && (
          <div 
            className="p-2 rounded-lg bg-opacity-10 dark:bg-opacity-20"
            style={{ backgroundColor: `${colors[500]}20`, color: colors[500] }}
          >
            {icon}
          </div>
        )}
      </div>
      
      <div className="flex items-end justify-between">
        <div>
          <span className="text-3xl font-bold text-gray-900 dark:text-white">{value}</span>
        </div>
        
        {change !== undefined && trend && (
          <div className={cn(
            "flex items-center text-sm font-medium px-2 py-1 rounded-full",
            trend === 'up' ? "text-emerald-600 bg-emerald-100 dark:bg-emerald-500/10 dark:text-emerald-400" : 
            trend === 'down' ? "text-rose-600 bg-rose-100 dark:bg-rose-500/10 dark:text-rose-400" : 
            "text-gray-600 bg-gray-100 dark:bg-gray-500/10 dark:text-gray-400"
          )}>
            {trend === 'up' && <TrendingUp className="w-3 h-3 mr-1" />}
            {trend === 'down' && <TrendingDown className="w-3 h-3 mr-1" />}
            {trend === 'neutral' && <Minus className="w-3 h-3 mr-1" />}
            {Math.abs(change)}%
          </div>
        )}
      </div>
      
      {/* Decorative gradient background */}
      <div 
        className="absolute -right-6 -bottom-6 w-24 h-24 rounded-full opacity-5 blur-2xl pointer-events-none"
        style={{ backgroundColor: colors[500] }}
      />
    </Card>
  );
}
