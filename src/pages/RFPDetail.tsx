import { useParams, useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, 
  Calendar, 
  User, 
  Building2, 
  IndianRupee,
  FileText,
  Clock,
  CheckCircle2,
  AlertTriangle
} from 'lucide-react';
import { PageHeader } from '@/components/common/PageHeader';
import { StatusBadge } from '@/components/common/StatusBadge';
import { ProgressBar } from '@/components/common/ProgressBar';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { mockRFPs, mockActivityLog, mockSKUMatches, mockPricingBreakdown } from '@/data/mockData';
import { format, formatDistanceToNow } from 'date-fns';
import { cn } from '@/lib/utils';

const formatCurrency = (value: number) => {
  if (value >= 10000000) {
    return `₹${(value / 10000000).toFixed(2)}Cr`;
  }
  if (value >= 100000) {
    return `₹${(value / 100000).toFixed(2)}L`;
  }
  return `₹${value.toLocaleString()}`;
};

const stageProgress: Record<string, number> = {
  ingestion: 15,
  agent_processing: 35,
  validation: 55,
  human_review: 75,
  approved: 90,
  submitted: 100,
  rejected: 0,
};

export default function RFPDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const rfp = mockRFPs.find(r => r.id === id);
  
  if (!rfp) {
    return (
      <div className="flex flex-col items-center justify-center h-[60vh] space-y-4">
        <p className="text-muted-foreground">RFP not found</p>
        <Button variant="outline" onClick={() => navigate('/rfp')}>
          Back to RFP List
        </Button>
      </div>
    );
  }

  const activityLogs = mockActivityLog.filter(log => log.rfpId === rfp.id);

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Back Button */}
      <button 
        onClick={() => navigate('/rfp')}
        className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to RFP List
      </button>

      {/* Header */}
      <div className="glass-card p-6">
        <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <span className="font-mono text-primary text-lg font-semibold">{rfp.id}</span>
              <StatusBadge status={rfp.currentStage} />
              <StatusBadge status={rfp.urgency} />
            </div>
            <h1 className="text-xl font-semibold text-foreground mb-1">{rfp.title}</h1>
            <p className="text-muted-foreground">{rfp.clientName}</p>
          </div>
          <div className="flex gap-3">
            <Button variant="outline">Export</Button>
            <Button>Submit Response</Button>
          </div>
        </div>

        {/* Progress */}
        <div className="mt-6">
          <div className="flex justify-between text-sm mb-2">
            <span className="text-muted-foreground">Pipeline Progress</span>
            <span className="font-medium">{stageProgress[rfp.currentStage]}%</span>
          </div>
          <ProgressBar value={stageProgress[rfp.currentStage]} size="lg" />
          <div className="flex justify-between mt-2 text-xs text-muted-foreground">
            <span>Ingestion</span>
            <span>Processing</span>
            <span>Validation</span>
            <span>Review</span>
            <span>Submitted</span>
          </div>
        </div>
      </div>

      {/* Main Content Tabs */}
      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList className="bg-muted/30 border border-border">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="technical">Technical Scope</TabsTrigger>
          <TabsTrigger value="commercial">Commercial</TabsTrigger>
          <TabsTrigger value="activity">Activity</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="glass-card p-4">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Building2 className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Client Type</p>
                  <p className="font-medium">{rfp.clientType}</p>
                </div>
              </div>
            </div>
            <div className="glass-card p-4">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-lg bg-status-pending/10 flex items-center justify-center">
                  <Calendar className="h-5 w-5 text-status-pending" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Deadline</p>
                  <p className="font-medium">{format(rfp.deadline, 'dd MMM yyyy')}</p>
                </div>
              </div>
            </div>
            <div className="glass-card p-4">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-lg bg-status-approved/10 flex items-center justify-center">
                  <IndianRupee className="h-5 w-5 text-status-approved" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Est. Value</p>
                  <p className="font-medium">{formatCurrency(rfp.estimatedValue)}</p>
                </div>
              </div>
            </div>
            <div className="glass-card p-4">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-lg bg-agent-sales/10 flex items-center justify-center">
                  <User className="h-5 w-5 text-agent-sales" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Owner</p>
                  <p className="font-medium">{rfp.assignedOwner}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <div className="glass-card p-6">
              <h3 className="section-header">RFP Details</h3>
              <dl className="space-y-3">
                <div className="flex justify-between">
                  <dt className="text-muted-foreground">BOQ Line Items</dt>
                  <dd className="font-mono font-medium">{rfp.boqLineCount}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-muted-foreground">Margin Range</dt>
                  <dd className="font-mono font-medium">{rfp.marginRange[0]}% - {rfp.marginRange[1]}%</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-muted-foreground">Created</dt>
                  <dd>{format(rfp.createdAt, 'dd MMM yyyy')}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-muted-foreground">Last Updated</dt>
                  <dd>{formatDistanceToNow(rfp.lastUpdated, { addSuffix: true })}</dd>
                </div>
              </dl>
            </div>

            <div className="glass-card p-6">
              <h3 className="section-header">Validation Status</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 rounded-lg bg-muted/30">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-status-approved" />
                    <span className="text-sm">Technical Specs</span>
                  </div>
                  <StatusBadge status="approved" />
                </div>
                <div className="flex items-center justify-between p-3 rounded-lg bg-muted/30">
                  <div className="flex items-center gap-2">
                    <AlertTriangle className="h-4 w-4 text-status-pending" />
                    <span className="text-sm">Pricing Review</span>
                  </div>
                  <StatusBadge status="pending" />
                </div>
                <div className="flex items-center justify-between p-3 rounded-lg bg-muted/30">
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">Compliance Check</span>
                  </div>
                  <StatusBadge status="validation" />
                </div>
              </div>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="technical" className="space-y-4">
          <div className="glass-card p-6">
            <h3 className="section-header">SKU Matching Results</h3>
            <div className="overflow-x-auto">
              <table className="data-table">
                <thead className="bg-muted/30">
                  <tr>
                    <th>RFP Line Item</th>
                    <th>Proposed SKU</th>
                    <th>Match %</th>
                    <th>Assumptions</th>
                  </tr>
                </thead>
                <tbody>
                  {mockSKUMatches.map((match, idx) => (
                    <tr key={idx}>
                      <td className="font-medium">{match.rfpLineItem}</td>
                      <td className="font-mono text-primary">{match.proposedSKU}</td>
                      <td>
                        <div className="flex items-center gap-2">
                          <ProgressBar 
                            value={match.matchPercentage} 
                            size="sm" 
                            variant={match.matchPercentage >= 90 ? 'success' : match.matchPercentage >= 80 ? 'default' : 'warning'}
                            className="w-16"
                          />
                          <span className="text-sm font-medium">{match.matchPercentage}%</span>
                        </div>
                      </td>
                      <td className="text-muted-foreground text-sm">{match.assumptions}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="commercial" className="space-y-4">
          <div className="glass-card p-6">
            <h3 className="section-header">Pricing Breakdown</h3>
            <div className="overflow-x-auto">
              <table className="data-table">
                <thead className="bg-muted/30">
                  <tr>
                    <th>Line Item</th>
                    <th className="text-right">Base Cost</th>
                    <th className="text-right">RM Surcharge</th>
                    <th className="text-right">Margin</th>
                    <th className="text-right">Final Price</th>
                  </tr>
                </thead>
                <tbody>
                  {mockPricingBreakdown.map((item, idx) => (
                    <tr key={idx}>
                      <td className="font-medium">{item.lineItem}</td>
                      <td className="text-right font-mono">{formatCurrency(item.baseCost)}</td>
                      <td className="text-right font-mono text-status-pending">{formatCurrency(item.rmSurcharge)}</td>
                      <td className="text-right font-mono text-status-approved">{formatCurrency(item.margin)}</td>
                      <td className="text-right font-mono font-medium">{formatCurrency(item.finalPrice)}</td>
                    </tr>
                  ))}
                </tbody>
                <tfoot className="border-t-2 border-border">
                  <tr>
                    <td className="font-semibold">Total</td>
                    <td className="text-right font-mono font-semibold">
                      {formatCurrency(mockPricingBreakdown.reduce((s, i) => s + i.baseCost, 0))}
                    </td>
                    <td className="text-right font-mono font-semibold text-status-pending">
                      {formatCurrency(mockPricingBreakdown.reduce((s, i) => s + i.rmSurcharge, 0))}
                    </td>
                    <td className="text-right font-mono font-semibold text-status-approved">
                      {formatCurrency(mockPricingBreakdown.reduce((s, i) => s + i.margin, 0))}
                    </td>
                    <td className="text-right font-mono font-semibold">
                      {formatCurrency(mockPricingBreakdown.reduce((s, i) => s + i.finalPrice, 0))}
                    </td>
                  </tr>
                </tfoot>
              </table>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="activity" className="space-y-4">
          <div className="glass-card p-6">
            <h3 className="section-header">Activity Timeline</h3>
            <div className="space-y-4">
              {activityLogs.map((log, idx) => (
                <div 
                  key={log.id}
                  className={cn(
                    'relative pl-6 pb-4',
                    idx !== activityLogs.length - 1 && 'border-l border-border ml-2'
                  )}
                >
                  <div className="absolute -left-1.5 top-0 h-3 w-3 rounded-full bg-primary border-2 border-background" />
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="font-medium text-foreground">{log.action}</p>
                      <p className="text-sm text-muted-foreground">{log.actor}</p>
                      {log.details && (
                        <p className="text-xs text-muted-foreground mt-1">{log.details}</p>
                      )}
                    </div>
                    <span className="text-xs text-muted-foreground whitespace-nowrap">
                      {formatDistanceToNow(log.timestamp, { addSuffix: true })}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
