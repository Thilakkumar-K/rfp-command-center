import { cn } from '@/lib/utils';

interface ProgressBarProps {
  value: number;
  max?: number;
  variant?: 'default' | 'success' | 'warning' | 'danger';
  showLabel?: boolean;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const variantStyles = {
  default: 'bg-gradient-to-r from-primary to-primary/70',
  success: 'bg-gradient-to-r from-status-approved to-status-approved/70',
  warning: 'bg-gradient-to-r from-status-pending to-status-pending/70',
  danger: 'bg-gradient-to-r from-status-rejected to-status-rejected/70',
};

const sizeStyles = {
  sm: 'h-1.5',
  md: 'h-2',
  lg: 'h-3',
};

export function ProgressBar({ 
  value, 
  max = 100, 
  variant = 'default', 
  showLabel = false,
  size = 'md',
  className 
}: ProgressBarProps) {
  const percentage = Math.min(Math.max((value / max) * 100, 0), 100);
  
  return (
    <div className={cn('space-y-1', className)}>
      {showLabel && (
        <div className="flex justify-between text-xs text-muted-foreground">
          <span>Progress</span>
          <span>{percentage.toFixed(0)}%</span>
        </div>
      )}
      <div className={cn('progress-bar', sizeStyles[size])}>
        <div 
          className={cn('progress-bar-fill', variantStyles[variant])}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}
