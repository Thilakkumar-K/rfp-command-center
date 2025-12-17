import { Bot, AlertTriangle, Clock } from 'lucide-react';
import { cn } from '@/lib/utils';
import { AgentStatus, AgentType } from '@/types/rfp';
import { ProgressBar } from './ProgressBar';
import { formatDistanceToNow } from 'date-fns';

interface AgentCardProps {
  agent: AgentStatus;
  className?: string;
}

const agentColors: Record<AgentType, string> = {
  orchestrator: 'border-l-agent-orchestrator',
  sales: 'border-l-agent-sales',
  technical: 'border-l-agent-technical',
  pricing: 'border-l-agent-pricing',
};

const agentBgColors: Record<AgentType, string> = {
  orchestrator: 'bg-agent-orchestrator/10',
  sales: 'bg-agent-sales/10',
  technical: 'bg-agent-technical/10',
  pricing: 'bg-agent-pricing/10',
};

const agentTextColors: Record<AgentType, string> = {
  orchestrator: 'text-agent-orchestrator',
  sales: 'text-agent-sales',
  technical: 'text-agent-technical',
  pricing: 'text-agent-pricing',
};

export function AgentCard({ agent, className }: AgentCardProps) {
  const getConfidenceVariant = (score: number) => {
    if (score >= 90) return 'success';
    if (score >= 70) return 'default';
    if (score >= 50) return 'warning';
    return 'danger';
  };

  return (
    <div className={cn(
      'agent-card border-l-4',
      agentColors[agent.type],
      className
    )}>
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className={cn(
            'flex h-10 w-10 items-center justify-center rounded-lg',
            agentBgColors[agent.type]
          )}>
            <Bot className={cn('h-5 w-5', agentTextColors[agent.type])} />
          </div>
          <div>
            <h3 className="font-medium text-foreground">{agent.name}</h3>
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <Clock className="h-3 w-3" />
              <span>{formatDistanceToNow(agent.lastActionTime, { addSuffix: true })}</span>
            </div>
          </div>
        </div>
        <div className={cn(
          'h-2 w-2 rounded-full',
          agent.isActive ? 'bg-status-approved animate-pulse' : 'bg-muted'
        )} />
      </div>

      <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
        {agent.currentTask}
      </p>

      <div className="space-y-3">
        <div>
          <div className="flex justify-between text-xs mb-1">
            <span className="text-muted-foreground">Completion</span>
            <span className="font-medium">{agent.completionPercent}%</span>
          </div>
          <ProgressBar value={agent.completionPercent} size="sm" />
        </div>

        <div className="flex items-center justify-between">
          <span className="text-xs text-muted-foreground">Confidence</span>
          <span className={cn(
            'confidence-indicator',
            agentTextColors[agent.type]
          )}>
            <span className="font-mono font-medium">{agent.confidenceScore}%</span>
          </span>
        </div>
      </div>

      {agent.warnings.length > 0 && (
        <div className="mt-4 pt-3 border-t border-border">
          {agent.warnings.map((warning, idx) => (
            <div key={idx} className="flex items-start gap-2 text-xs text-status-pending">
              <AlertTriangle className="h-3.5 w-3.5 mt-0.5 flex-shrink-0" />
              <span>{warning}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
