import { cn } from '@/lib/utils';
import { RFPStatus, ValidationStatus, Urgency } from '@/types/rfp';

type BadgeVariant = 'status' | 'validation' | 'urgency' | 'document';

interface StatusBadgeProps {
  variant?: BadgeVariant;
  status: RFPStatus | ValidationStatus | Urgency | string;
  className?: string;
}

const statusConfig: Record<string, { label: string; className: string }> = {
  // RFP Status
  ingestion: { label: 'Ingestion', className: 'bg-status-draft/20 text-status-draft' },
  agent_processing: { label: 'Processing', className: 'bg-status-progress/20 text-status-progress' },
  validation: { label: 'Validation', className: 'bg-status-pending/20 text-status-pending' },
  human_review: { label: 'Human Review', className: 'bg-agent-sales/20 text-agent-sales' },
  approved: { label: 'Approved', className: 'bg-status-approved/20 text-status-approved' },
  submitted: { label: 'Submitted', className: 'bg-primary/20 text-primary' },
  rejected: { label: 'Rejected', className: 'bg-status-rejected/20 text-status-rejected' },
  
  // Validation Status
  pending: { label: 'Pending', className: 'bg-status-pending/20 text-status-pending' },
  
  // Urgency
  low: { label: 'Low', className: 'bg-status-draft/20 text-status-draft' },
  medium: { label: 'Medium', className: 'bg-status-pending/20 text-status-pending' },
  high: { label: 'High', className: 'bg-agent-sales/20 text-agent-sales' },
  critical: { label: 'Critical', className: 'bg-status-rejected/20 text-status-rejected animate-pulse-glow' },
  
  // Document Status
  draft: { label: 'Draft', className: 'bg-status-draft/20 text-status-draft' },
  final: { label: 'Final', className: 'bg-primary/20 text-primary' },
};

export function StatusBadge({ status, className }: StatusBadgeProps) {
  const config = statusConfig[status] || { label: status, className: 'bg-muted text-muted-foreground' };
  
  return (
    <span className={cn('status-badge', config.className, className)}>
      {config.label}
    </span>
  );
}
