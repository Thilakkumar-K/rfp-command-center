import { 
  Activity, 
  Server, 
  Database, 
  Cpu, 
  Clock, 
  AlertTriangle,
  CheckCircle2,
  RefreshCw
} from 'lucide-react';
import { PageHeader } from '@/components/common/PageHeader';
import { ProgressBar } from '@/components/common/ProgressBar';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

// Mock system health data
const systemStatus = {
  api: { status: 'healthy', latency: 45, uptime: 99.9 },
  database: { status: 'healthy', latency: 12, uptime: 99.99 },
  agentService: { status: 'healthy', latency: 120, uptime: 99.5 },
  storage: { status: 'warning', latency: 85, uptime: 99.2 },
};

const agentMetrics = [
  { agent: 'Orchestrator', avgConfidence: 94, passRate: 97, overrideRate: 3, errorCount: 2 },
  { agent: 'Sales Agent', avgConfidence: 87, passRate: 92, overrideRate: 8, errorCount: 5 },
  { agent: 'Technical Agent', avgConfidence: 91, passRate: 95, overrideRate: 5, errorCount: 3 },
  { agent: 'Pricing Agent', avgConfidence: 89, passRate: 93, overrideRate: 7, errorCount: 4 },
];

const queueMetrics = [
  { queue: 'Ingestion Queue', depth: 3, avgWait: '2m' },
  { queue: 'Agent Processing', depth: 8, avgWait: '5m' },
  { queue: 'Validation Queue', depth: 4, avgWait: '15m' },
  { queue: 'Export Queue', depth: 2, avgWait: '1m' },
];

const recentErrors = [
  { time: '10 min ago', service: 'Pricing Agent', error: 'LME API timeout', severity: 'warning' },
  { time: '45 min ago', service: 'Storage', error: 'Slow response from S3', severity: 'warning' },
  { time: '2 hours ago', service: 'Technical Agent', error: 'SKU lookup failed', severity: 'error' },
];

const StatusIndicator = ({ status }: { status: string }) => (
  <div className={cn(
    'flex items-center gap-2',
    status === 'healthy' && 'text-status-approved',
    status === 'warning' && 'text-status-pending',
    status === 'error' && 'text-status-rejected'
  )}>
    <div className={cn(
      'h-2 w-2 rounded-full',
      status === 'healthy' && 'bg-status-approved',
      status === 'warning' && 'bg-status-pending animate-pulse',
      status === 'error' && 'bg-status-rejected animate-pulse'
    )} />
    <span className="text-sm font-medium capitalize">{status}</span>
  </div>
);

export default function SystemHealth() {
  return (
    <div className="space-y-6 animate-fade-in">
      <PageHeader 
        title="System & Model Health"
        description="Monitor system performance and AI model metrics"
        actions={
          <Button variant="outline" className="gap-2">
            <RefreshCw className="h-4 w-4" />
            Refresh
          </Button>
        }
      />

      {/* System Status Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {Object.entries(systemStatus).map(([key, value]) => (
          <div key={key} className="glass-card p-5">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className={cn(
                  'h-10 w-10 rounded-lg flex items-center justify-center',
                  value.status === 'healthy' ? 'bg-status-approved/10' : 'bg-status-pending/10'
                )}>
                  {key === 'api' && <Server className={cn('h-5 w-5', value.status === 'healthy' ? 'text-status-approved' : 'text-status-pending')} />}
                  {key === 'database' && <Database className={cn('h-5 w-5', value.status === 'healthy' ? 'text-status-approved' : 'text-status-pending')} />}
                  {key === 'agentService' && <Cpu className={cn('h-5 w-5', value.status === 'healthy' ? 'text-status-approved' : 'text-status-pending')} />}
                  {key === 'storage' && <Activity className={cn('h-5 w-5', value.status === 'healthy' ? 'text-status-approved' : 'text-status-pending')} />}
                </div>
                <span className="font-medium capitalize">
                  {key === 'agentService' ? 'Agent Service' : key}
                </span>
              </div>
              <StatusIndicator status={value.status} />
            </div>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-muted-foreground text-xs">Latency</p>
                <p className="font-mono font-medium">{value.latency}ms</p>
              </div>
              <div>
                <p className="text-muted-foreground text-xs">Uptime</p>
                <p className="font-mono font-medium">{value.uptime}%</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Model Metrics */}
      <div className="glass-card p-6">
        <h3 className="section-header">Agent Model Metrics</h3>
        <div className="overflow-x-auto">
          <table className="data-table">
            <thead className="bg-muted/30">
              <tr>
                <th>Agent</th>
                <th>Avg Confidence</th>
                <th>Validation Pass Rate</th>
                <th>Human Override Rate</th>
                <th>Error Count (24h)</th>
              </tr>
            </thead>
            <tbody>
              {agentMetrics.map((metric) => (
                <tr key={metric.agent}>
                  <td className="font-medium">{metric.agent}</td>
                  <td>
                    <div className="flex items-center gap-2">
                      <ProgressBar 
                        value={metric.avgConfidence} 
                        size="sm"
                        variant={metric.avgConfidence >= 90 ? 'success' : 'default'}
                        className="w-20"
                      />
                      <span className="font-mono text-sm">{metric.avgConfidence}%</span>
                    </div>
                  </td>
                  <td>
                    <span className={cn(
                      'font-mono text-sm',
                      metric.passRate >= 95 ? 'text-status-approved' : 'text-foreground'
                    )}>
                      {metric.passRate}%
                    </span>
                  </td>
                  <td>
                    <span className={cn(
                      'font-mono text-sm',
                      metric.overrideRate > 5 ? 'text-status-pending' : 'text-muted-foreground'
                    )}>
                      {metric.overrideRate}%
                    </span>
                  </td>
                  <td>
                    <span className={cn(
                      'font-mono text-sm',
                      metric.errorCount > 3 ? 'text-status-rejected' : 'text-muted-foreground'
                    )}>
                      {metric.errorCount}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Queue Depth */}
        <div className="glass-card p-6">
          <h3 className="section-header">Processing Queues</h3>
          <div className="space-y-4">
            {queueMetrics.map((queue) => (
              <div key={queue.queue} className="flex items-center justify-between p-3 rounded-lg bg-muted/30">
                <div className="flex items-center gap-3">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="text-sm font-medium">{queue.queue}</p>
                    <p className="text-xs text-muted-foreground">Avg wait: {queue.avgWait}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className={cn(
                    'text-lg font-semibold font-mono',
                    queue.depth > 5 ? 'text-status-pending' : 'text-foreground'
                  )}>
                    {queue.depth}
                  </p>
                  <p className="text-xs text-muted-foreground">items</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Errors */}
        <div className="glass-card p-6">
          <h3 className="section-header">Recent Issues</h3>
          <div className="space-y-3">
            {recentErrors.map((error, idx) => (
              <div 
                key={idx} 
                className={cn(
                  'p-3 rounded-lg border-l-2',
                  error.severity === 'error' 
                    ? 'bg-status-rejected/5 border-l-status-rejected' 
                    : 'bg-status-pending/5 border-l-status-pending'
                )}
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-2">
                    <AlertTriangle className={cn(
                      'h-4 w-4',
                      error.severity === 'error' ? 'text-status-rejected' : 'text-status-pending'
                    )} />
                    <span className="text-sm font-medium">{error.service}</span>
                  </div>
                  <span className="text-xs text-muted-foreground">{error.time}</span>
                </div>
                <p className="text-sm text-muted-foreground mt-1 ml-6">{error.error}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Overall Health Score */}
      <div className="glass-card p-6">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold text-foreground">Overall System Health</h3>
            <p className="text-sm text-muted-foreground">Based on all monitored services and agents</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-right">
              <p className="text-4xl font-bold text-status-approved">96.5%</p>
              <p className="text-xs text-muted-foreground">Health Score</p>
            </div>
            <CheckCircle2 className="h-12 w-12 text-status-approved" />
          </div>
        </div>
      </div>
    </div>
  );
}
