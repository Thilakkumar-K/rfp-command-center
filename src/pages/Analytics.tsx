import { 
  BarChart, 
  Bar, 
  LineChart, 
  Line, 
  PieChart, 
  Pie, 
  Cell,
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  Legend 
} from 'recharts';
import { PageHeader } from '@/components/common/PageHeader';
import { Button } from '@/components/ui/button';
import { Calendar, Download } from 'lucide-react';

// Mock analytics data
const rfpVolumeData = [
  { month: 'Jul', received: 12, submitted: 10, won: 7 },
  { month: 'Aug', received: 15, submitted: 12, won: 8 },
  { month: 'Sep', received: 18, submitted: 15, won: 11 },
  { month: 'Oct', received: 14, submitted: 13, won: 9 },
  { month: 'Nov', received: 20, submitted: 17, won: 12 },
  { month: 'Dec', received: 16, submitted: 14, won: 10 },
];

const responseTimeData = [
  { month: 'Jul', avgDays: 12 },
  { month: 'Aug', avgDays: 11 },
  { month: 'Sep', avgDays: 10 },
  { month: 'Oct', avgDays: 9.5 },
  { month: 'Nov', avgDays: 8.5 },
  { month: 'Dec', avgDays: 8 },
];

const segmentWinRate = [
  { segment: 'PSU', winRate: 72, color: 'hsl(var(--primary))' },
  { segment: 'LSTK', winRate: 65, color: 'hsl(var(--agent-sales))' },
  { segment: 'Private', winRate: 58, color: 'hsl(var(--agent-pricing))' },
  { segment: 'Govt', winRate: 45, color: 'hsl(var(--status-pending))' },
];

const rejectionReasons = [
  { reason: 'Price too high', count: 8, color: 'hsl(var(--status-rejected))' },
  { reason: 'Technical mismatch', count: 5, color: 'hsl(var(--agent-technical))' },
  { reason: 'Delivery timeline', count: 4, color: 'hsl(var(--status-pending))' },
  { reason: 'Compliance gap', count: 3, color: 'hsl(var(--agent-sales))' },
  { reason: 'Other', count: 2, color: 'hsl(var(--muted-foreground))' },
];

const confidenceVsApproval = [
  { confidence: '90-100%', approvalRate: 98 },
  { confidence: '80-89%', approvalRate: 85 },
  { confidence: '70-79%', approvalRate: 65 },
  { confidence: '60-69%', approvalRate: 42 },
  { confidence: '<60%', approvalRate: 20 },
];

const tooltipStyle = {
  backgroundColor: 'hsl(222 47% 10%)',
  border: '1px solid hsl(217 33% 17%)',
  borderRadius: '8px',
  color: 'hsl(210 40% 96%)',
};

export default function Analytics() {
  return (
    <div className="space-y-6 animate-fade-in">
      <PageHeader 
        title="Analytics & Performance"
        description="Business and operational insights across RFP pipeline"
        actions={
          <div className="flex gap-3">
            <Button variant="outline" className="gap-2">
              <Calendar className="h-4 w-4" />
              Last 6 Months
            </Button>
            <Button variant="outline" className="gap-2">
              <Download className="h-4 w-4" />
              Export
            </Button>
          </div>
        }
      />

      {/* Top Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* RFP Volume Over Time */}
        <div className="glass-card p-6">
          <h3 className="section-header">RFP Volume Trend</h3>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={rfpVolumeData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(217 33% 17%)" />
                <XAxis dataKey="month" stroke="hsl(215 20% 55%)" fontSize={12} />
                <YAxis stroke="hsl(215 20% 55%)" fontSize={12} />
                <Tooltip contentStyle={tooltipStyle} />
                <Legend />
                <Bar dataKey="received" name="Received" fill="hsl(var(--muted-foreground))" radius={[4, 4, 0, 0]} />
                <Bar dataKey="submitted" name="Submitted" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
                <Bar dataKey="won" name="Won" fill="hsl(var(--status-approved))" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Response Time Trend */}
        <div className="glass-card p-6">
          <h3 className="section-header">Average Response Time</h3>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={responseTimeData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(217 33% 17%)" />
                <XAxis dataKey="month" stroke="hsl(215 20% 55%)" fontSize={12} />
                <YAxis stroke="hsl(215 20% 55%)" fontSize={12} unit=" days" />
                <Tooltip contentStyle={tooltipStyle} />
                <Line 
                  type="monotone" 
                  dataKey="avgDays" 
                  name="Avg. Days"
                  stroke="hsl(var(--primary))" 
                  strokeWidth={2}
                  dot={{ fill: 'hsl(var(--primary))', strokeWidth: 2 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Middle Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Win Rate by Segment */}
        <div className="glass-card p-6">
          <h3 className="section-header">Win Rate by Segment</h3>
          <div className="space-y-4">
            {segmentWinRate.map((item) => (
              <div key={item.segment}>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-muted-foreground">{item.segment}</span>
                  <span className="font-medium">{item.winRate}%</span>
                </div>
                <div className="h-2 bg-muted rounded-full overflow-hidden">
                  <div 
                    className="h-full rounded-full transition-all duration-500"
                    style={{ 
                      width: `${item.winRate}%`,
                      backgroundColor: item.color
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Rejection Reasons */}
        <div className="glass-card p-6">
          <h3 className="section-header">Rejection Reasons</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={rejectionReasons}
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={80}
                  paddingAngle={4}
                  dataKey="count"
                >
                  {rejectionReasons.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip contentStyle={tooltipStyle} />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="grid grid-cols-2 gap-2 mt-4">
            {rejectionReasons.map((item) => (
              <div key={item.reason} className="flex items-center gap-2 text-xs">
                <div 
                  className="h-2.5 w-2.5 rounded-full" 
                  style={{ backgroundColor: item.color }}
                />
                <span className="text-muted-foreground truncate">{item.reason}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Confidence vs Approval */}
        <div className="glass-card p-6">
          <h3 className="section-header">Confidence vs Approval Rate</h3>
          <div className="space-y-4">
            {confidenceVsApproval.map((item) => (
              <div key={item.confidence}>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-muted-foreground font-mono text-xs">{item.confidence}</span>
                  <span className="font-medium">{item.approvalRate}%</span>
                </div>
                <div className="h-2 bg-muted rounded-full overflow-hidden">
                  <div 
                    className="h-full rounded-full transition-all duration-500"
                    style={{ 
                      width: `${item.approvalRate}%`,
                      background: 'linear-gradient(90deg, hsl(var(--primary)), hsl(var(--status-approved)))'
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
          <p className="text-xs text-muted-foreground mt-4">
            Higher agent confidence correlates with higher human approval rates
          </p>
        </div>
      </div>

      {/* Key Metrics Summary */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="glass-card p-4 text-center">
          <p className="text-3xl font-semibold text-primary">67%</p>
          <p className="text-xs text-muted-foreground">Overall Win Rate</p>
          <p className="text-xs text-status-approved mt-1">↑ 5% vs last quarter</p>
        </div>
        <div className="glass-card p-4 text-center">
          <p className="text-3xl font-semibold text-foreground">8.5</p>
          <p className="text-xs text-muted-foreground">Avg. Response Days</p>
          <p className="text-xs text-status-approved mt-1">↓ 2 days improved</p>
        </div>
        <div className="glass-card p-4 text-center">
          <p className="text-3xl font-semibold text-foreground">89%</p>
          <p className="text-xs text-muted-foreground">Agent Accuracy</p>
          <p className="text-xs text-status-approved mt-1">↑ 3% vs last month</p>
        </div>
        <div className="glass-card p-4 text-center">
          <p className="text-3xl font-semibold text-foreground">₹395Cr</p>
          <p className="text-xs text-muted-foreground">Total Won Value</p>
          <p className="text-xs text-status-approved mt-1">↑ 18% vs last year</p>
        </div>
      </div>
    </div>
  );
}
