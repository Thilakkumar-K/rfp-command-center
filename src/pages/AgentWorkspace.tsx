import { RefreshCw } from 'lucide-react';
import { PageHeader } from '@/components/common/PageHeader';
import { AgentCard } from '@/components/common/AgentCard';
import { StatusBadge } from '@/components/common/StatusBadge';
import { ProgressBar } from '@/components/common/ProgressBar';
import { Button } from '@/components/ui/button';
import { mockAgentStatuses, mockSKUMatches, mockPricingBreakdown } from '@/data/mockData';

const formatCurrency = (value: number) => {
  if (value >= 10000000) {
    return `₹${(value / 10000000).toFixed(2)}Cr`;
  }
  if (value >= 100000) {
    return `₹${(value / 100000).toFixed(2)}L`;
  }
  return `₹${value.toLocaleString()}`;
};

export default function AgentWorkspace() {
  return (
    <div className="space-y-6 animate-fade-in">
      <PageHeader 
        title="Agent Workspace"
        description="Monitor AI agent status and outputs in real-time"
        actions={
          <Button variant="outline" className="gap-2">
            <RefreshCw className="h-4 w-4" />
            Refresh
          </Button>
        }
      />

      {/* Agent Status Cards */}
      <div>
        <h2 className="section-header">Agent Status</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {mockAgentStatuses.map((agent) => (
            <AgentCard key={agent.type} agent={agent} />
          ))}
        </div>
      </div>

      {/* Agent Outputs */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* SKU Matching Output */}
        <div className="glass-card p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="section-header mb-0">SKU Matching Results</h3>
            <StatusBadge status="agent_processing" />
          </div>
          <div className="space-y-3">
            {mockSKUMatches.slice(0, 4).map((match, idx) => (
              <div key={idx} className="p-3 rounded-lg bg-muted/30">
                <div className="flex items-start justify-between gap-2 mb-2">
                  <p className="text-sm font-medium text-foreground line-clamp-1">
                    {match.rfpLineItem}
                  </p>
                  <span className="text-xs font-mono text-primary whitespace-nowrap">
                    {match.proposedSKU}
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <ProgressBar 
                    value={match.matchPercentage} 
                    size="sm"
                    variant={match.matchPercentage >= 90 ? 'success' : 'default'}
                    className="flex-1"
                  />
                  <span className="text-xs font-medium w-10 text-right">
                    {match.matchPercentage}%
                  </span>
                </div>
                <p className="text-xs text-muted-foreground mt-2">
                  {match.assumptions}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Pricing Output */}
        <div className="glass-card p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="section-header mb-0">Pricing Breakdown</h3>
            <StatusBadge status="validation" />
          </div>
          <div className="space-y-3">
            {mockPricingBreakdown.map((item, idx) => (
              <div key={idx} className="p-3 rounded-lg bg-muted/30">
                <p className="text-sm font-medium text-foreground mb-2 line-clamp-1">
                  {item.lineItem}
                </p>
                <div className="grid grid-cols-4 gap-2 text-xs">
                  <div>
                    <p className="text-muted-foreground">Base</p>
                    <p className="font-mono font-medium">{formatCurrency(item.baseCost)}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">RM</p>
                    <p className="font-mono font-medium text-status-pending">
                      +{formatCurrency(item.rmSurcharge)}
                    </p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Margin</p>
                    <p className="font-mono font-medium text-status-approved">
                      +{formatCurrency(item.margin)}
                    </p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Final</p>
                    <p className="font-mono font-semibold">{formatCurrency(item.finalPrice)}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          {/* Total Summary */}
          <div className="mt-4 pt-4 border-t border-border">
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Total Quote Value</span>
              <span className="text-lg font-semibold font-mono">
                {formatCurrency(mockPricingBreakdown.reduce((s, i) => s + i.finalPrice, 0))}
              </span>
            </div>
            <div className="flex justify-between items-center mt-1">
              <span className="text-xs text-muted-foreground">Avg. Margin</span>
              <span className="text-sm font-medium text-status-approved">15.2%</span>
            </div>
          </div>
        </div>
      </div>

      {/* Agent Performance Summary */}
      <div className="glass-card p-6">
        <h3 className="section-header">Agent Performance Summary</h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {mockAgentStatuses.map((agent) => (
            <div key={agent.type} className="text-center">
              <div className="relative inline-flex items-center justify-center">
                <svg className="w-24 h-24 transform -rotate-90">
                  <circle
                    cx="48"
                    cy="48"
                    r="40"
                    stroke="currentColor"
                    strokeWidth="8"
                    fill="none"
                    className="text-muted"
                  />
                  <circle
                    cx="48"
                    cy="48"
                    r="40"
                    stroke="currentColor"
                    strokeWidth="8"
                    fill="none"
                    strokeDasharray={`${agent.confidenceScore * 2.51} 251`}
                    className={
                      agent.type === 'orchestrator' ? 'text-agent-orchestrator' :
                      agent.type === 'sales' ? 'text-agent-sales' :
                      agent.type === 'technical' ? 'text-agent-technical' :
                      'text-agent-pricing'
                    }
                  />
                </svg>
                <span className="absolute text-xl font-semibold">{agent.confidenceScore}%</span>
              </div>
              <p className="mt-2 text-sm font-medium text-foreground">{agent.name}</p>
              <p className="text-xs text-muted-foreground">Avg. Confidence</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
