import { 
  FileText, 
  Clock, 
  Timer, 
  CheckCircle2, 
  TrendingUp,
  IndianRupee
} from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { KPICard } from '@/components/common/KPICard';
import { AlertPanel } from '@/components/common/AlertPanel';
import { StatusBadge } from '@/components/common/StatusBadge';
import { PageHeader } from '@/components/common/PageHeader';
import { dashboardKPIs, statusDistribution, mockRFPs, mockAlerts } from '@/data/mockData';
import { formatDistanceToNow, format } from 'date-fns';
import { useNavigate } from 'react-router-dom';

const formatCurrency = (value: number) => {
  if (value >= 10000000) {
    return `₹${(value / 10000000).toFixed(1)}Cr`;
  }
  if (value >= 100000) {
    return `₹${(value / 100000).toFixed(1)}L`;
  }
  return `₹${value.toLocaleString()}`;
};

export default function Dashboard() {
  const navigate = useNavigate();
  
  // Get urgent RFPs (deadline within 7 days)
  const urgentRFPs = mockRFPs
    .filter(r => {
      const daysUntil = Math.ceil((r.deadline.getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24));
      return daysUntil <= 7 && r.currentStage !== 'submitted';
    })
    .sort((a, b) => a.deadline.getTime() - b.deadline.getTime());

  return (
    <div className="space-y-6 animate-fade-in">
      <PageHeader 
        title="Command Center"
        description="Real-time overview of RFP pipeline and agent operations"
      />

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        <KPICard
          title="Active RFPs"
          value={dashboardKPIs.totalActiveRFPs}
          icon={FileText}
          variant="primary"
        />
        <KPICard
          title="Near Deadline"
          value={dashboardKPIs.rfpsNearDeadline}
          subtitle="Within 7 days"
          icon={Clock}
          variant="danger"
        />
        <KPICard
          title="Avg Response"
          value={`${dashboardKPIs.avgResponseTime} days`}
          icon={Timer}
          variant="default"
          trend={{ value: 12, isPositive: true }}
        />
        <KPICard
          title="Pending Approval"
          value={dashboardKPIs.approvalPendingCount}
          icon={CheckCircle2}
          variant="warning"
        />
        <KPICard
          title="Win Rate"
          value={`${dashboardKPIs.winRate}%`}
          icon={TrendingUp}
          variant="success"
          trend={{ value: 5, isPositive: true }}
        />
        <KPICard
          title="Pipeline Value"
          value={formatCurrency(dashboardKPIs.totalPipelineValue)}
          icon={IndianRupee}
          variant="primary"
        />
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Status Distribution Chart */}
        <div className="glass-card p-6">
          <h2 className="section-header">Pipeline Distribution</h2>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={statusDistribution}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={4}
                  dataKey="value"
                >
                  {statusDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'hsl(222 47% 10%)', 
                    border: '1px solid hsl(217 33% 17%)',
                    borderRadius: '8px',
                    color: 'hsl(210 40% 96%)'
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="grid grid-cols-2 gap-2 mt-4">
            {statusDistribution.map((item) => (
              <div key={item.name} className="flex items-center gap-2 text-xs">
                <div 
                  className="h-2.5 w-2.5 rounded-full" 
                  style={{ backgroundColor: item.color }}
                />
                <span className="text-muted-foreground">{item.name}</span>
                <span className="font-medium ml-auto">{item.value}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Urgent RFPs */}
        <div className="glass-card p-6">
          <h2 className="section-header">Urgent RFPs</h2>
          <div className="space-y-3">
            {urgentRFPs.slice(0, 5).map((rfp) => {
              const daysUntil = Math.ceil((rfp.deadline.getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24));
              return (
                <div 
                  key={rfp.id}
                  onClick={() => navigate(`/rfp/${rfp.id}`)}
                  className="p-3 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors cursor-pointer"
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="min-w-0">
                      <p className="text-sm font-medium text-foreground truncate">{rfp.clientName}</p>
                      <p className="text-xs text-muted-foreground font-mono">{rfp.id}</p>
                    </div>
                    <StatusBadge status={rfp.urgency} />
                  </div>
                  <div className="flex items-center justify-between mt-2">
                    <StatusBadge status={rfp.currentStage} />
                    <span className={`text-xs font-medium ${
                      daysUntil <= 3 ? 'text-status-rejected' : 
                      daysUntil <= 5 ? 'text-status-pending' : 
                      'text-muted-foreground'
                    }`}>
                      {daysUntil} days left
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
          <button 
            onClick={() => navigate('/rfp')}
            className="w-full mt-4 text-sm text-primary hover:text-primary/80 transition-colors"
          >
            View all RFPs →
          </button>
        </div>

        {/* Alerts Panel */}
        <div className="glass-card p-6">
          <h2 className="section-header">Active Alerts</h2>
          <AlertPanel alerts={mockAlerts} />
        </div>
      </div>

      {/* Recent Activity */}
      <div className="glass-card p-6">
        <h2 className="section-header">Recent Activity</h2>
        <div className="overflow-x-auto">
          <table className="data-table">
            <thead className="bg-muted/30">
              <tr>
                <th>RFP ID</th>
                <th>Client</th>
                <th>Stage</th>
                <th>Deadline</th>
                <th>Value</th>
                <th>Owner</th>
                <th>Updated</th>
              </tr>
            </thead>
            <tbody>
              {mockRFPs.slice(0, 5).map((rfp) => (
                <tr 
                  key={rfp.id}
                  onClick={() => navigate(`/rfp/${rfp.id}`)}
                  className="cursor-pointer"
                >
                  <td className="font-mono text-primary">{rfp.id}</td>
                  <td>{rfp.clientName}</td>
                  <td><StatusBadge status={rfp.currentStage} /></td>
                  <td>{format(rfp.deadline, 'dd MMM yyyy')}</td>
                  <td className="font-mono">{formatCurrency(rfp.estimatedValue)}</td>
                  <td>{rfp.assignedOwner}</td>
                  <td className="text-muted-foreground">
                    {formatDistanceToNow(rfp.lastUpdated, { addSuffix: true })}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
