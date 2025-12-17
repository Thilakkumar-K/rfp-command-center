import { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface KPICardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon: LucideIcon;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  variant?: 'default' | 'primary' | 'success' | 'warning' | 'danger';
  className?: string;
}

const variantStyles = {
  default: 'text-foreground',
  primary: 'text-primary',
  success: 'text-status-approved',
  warning: 'text-status-pending',
  danger: 'text-status-rejected',
};

const iconBgStyles = {
  default: 'bg-muted',
  primary: 'bg-primary/10',
  success: 'bg-status-approved/10',
  warning: 'bg-status-pending/10',
  danger: 'bg-status-rejected/10',
};

export function KPICard({ 
  title, 
  value, 
  subtitle, 
  icon: Icon, 
  trend, 
  variant = 'default',
  className 
}: KPICardProps) {
  return (
    <div className={cn('kpi-card', className)}>
      <div className="flex items-start justify-between">
        <div className="space-y-2">
          <p className="metric-label">{title}</p>
          <p className={cn('metric-value', variantStyles[variant])}>{value}</p>
          {subtitle && (
            <p className="text-xs text-muted-foreground">{subtitle}</p>
          )}
          {trend && (
            <p className={cn(
              'text-xs font-medium',
              trend.isPositive ? 'text-status-approved' : 'text-status-rejected'
            )}>
              {trend.isPositive ? '↑' : '↓'} {Math.abs(trend.value)}% vs last month
            </p>
          )}
        </div>
        <div className={cn(
          'flex h-10 w-10 items-center justify-center rounded-lg',
          iconBgStyles[variant]
        )}>
          <Icon className={cn('h-5 w-5', variantStyles[variant])} />
        </div>
      </div>
    </div>
  );
}
