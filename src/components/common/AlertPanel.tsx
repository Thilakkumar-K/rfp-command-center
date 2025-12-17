import { AlertTriangle, AlertCircle, Info, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Alert } from '@/types/rfp';
import { formatDistanceToNow } from 'date-fns';

interface AlertPanelProps {
  alerts: Alert[];
  className?: string;
  onDismiss?: (id: string) => void;
}

const alertIcons = {
  warning: AlertTriangle,
  error: AlertCircle,
  info: Info,
};

const alertStyles = {
  warning: 'border-l-status-pending bg-status-pending/5',
  error: 'border-l-status-rejected bg-status-rejected/5',
  info: 'border-l-primary bg-primary/5',
};

const iconStyles = {
  warning: 'text-status-pending',
  error: 'text-status-rejected',
  info: 'text-primary',
};

export function AlertPanel({ alerts, className, onDismiss }: AlertPanelProps) {
  return (
    <div className={cn('space-y-2', className)}>
      {alerts.map((alert) => {
        const Icon = alertIcons[alert.type];
        return (
          <div 
            key={alert.id}
            className={cn('alert-item border-l-2', alertStyles[alert.type])}
          >
            <Icon className={cn('h-4 w-4 mt-0.5 flex-shrink-0', iconStyles[alert.type])} />
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between gap-2">
                <p className="text-sm font-medium text-foreground">{alert.title}</p>
                {onDismiss && (
                  <button 
                    onClick={() => onDismiss(alert.id)}
                    className="text-muted-foreground hover:text-foreground transition-colors"
                  >
                    <X className="h-4 w-4" />
                  </button>
                )}
              </div>
              <p className="text-xs text-muted-foreground mt-0.5">{alert.description}</p>
              <p className="text-xs text-muted-foreground/70 mt-1">
                {formatDistanceToNow(alert.createdAt, { addSuffix: true })}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
