import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Filter, Plus, ChevronDown } from 'lucide-react';
import { PageHeader } from '@/components/common/PageHeader';
import { StatusBadge } from '@/components/common/StatusBadge';
import { mockRFPs } from '@/data/mockData';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const formatCurrency = (value: number) => {
  if (value >= 10000000) {
    return `₹${(value / 10000000).toFixed(1)}Cr`;
  }
  if (value >= 100000) {
    return `₹${(value / 100000).toFixed(1)}L`;
  }
  return `₹${value.toLocaleString()}`;
};

const stageFilters = [
  { value: 'all', label: 'All Stages' },
  { value: 'ingestion', label: 'Ingestion' },
  { value: 'agent_processing', label: 'Processing' },
  { value: 'validation', label: 'Validation' },
  { value: 'human_review', label: 'Human Review' },
  { value: 'approved', label: 'Approved' },
  { value: 'submitted', label: 'Submitted' },
];

export default function RFPManagement() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [stageFilter, setStageFilter] = useState('all');
  const [showFilters, setShowFilters] = useState(false);

  const filteredRFPs = mockRFPs.filter(rfp => {
    const matchesSearch = 
      rfp.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      rfp.clientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      rfp.title.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesStage = stageFilter === 'all' || rfp.currentStage === stageFilter;
    
    return matchesSearch && matchesStage;
  });

  const getDaysUntilDeadline = (deadline: Date) => {
    return Math.ceil((deadline.getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24));
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <PageHeader 
        title="RFP Management"
        description="Track and manage all RFPs in the pipeline"
        actions={
          <Button className="gap-2">
            <Plus className="h-4 w-4" />
            New RFP
          </Button>
        }
      />

      {/* Search and Filters */}
      <div className="glass-card p-4">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search by RFP ID, client, or title..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9 bg-muted/30 border-border"
            />
          </div>
          <Button 
            variant="outline" 
            className="gap-2"
            onClick={() => setShowFilters(!showFilters)}
          >
            <Filter className="h-4 w-4" />
            Filters
            <ChevronDown className={cn(
              'h-4 w-4 transition-transform',
              showFilters && 'rotate-180'
            )} />
          </Button>
        </div>

        {showFilters && (
          <div className="mt-4 pt-4 border-t border-border">
            <div className="flex flex-wrap gap-2">
              {stageFilters.map((filter) => (
                <button
                  key={filter.value}
                  onClick={() => setStageFilter(filter.value)}
                  className={cn(
                    'px-3 py-1.5 rounded-full text-xs font-medium transition-colors',
                    stageFilter === filter.value
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-muted text-muted-foreground hover:bg-muted/80'
                  )}
                >
                  {filter.label}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* RFP Table */}
      <div className="glass-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="data-table">
            <thead className="bg-muted/30">
              <tr>
                <th>RFP ID</th>
                <th>Client / Project</th>
                <th>Type</th>
                <th>Deadline</th>
                <th>Stage</th>
                <th>Value</th>
                <th>Owner</th>
                <th>Urgency</th>
              </tr>
            </thead>
            <tbody>
              {filteredRFPs.map((rfp) => {
                const daysUntil = getDaysUntilDeadline(rfp.deadline);
                return (
                  <tr 
                    key={rfp.id}
                    onClick={() => navigate(`/rfp/${rfp.id}`)}
                    className="cursor-pointer"
                  >
                    <td className="font-mono text-primary font-medium">{rfp.id}</td>
                    <td>
                      <div>
                        <p className="font-medium text-foreground">{rfp.clientName}</p>
                        <p className="text-xs text-muted-foreground truncate max-w-[200px]">
                          {rfp.title}
                        </p>
                      </div>
                    </td>
                    <td>
                      <span className="text-xs px-2 py-1 rounded bg-muted text-muted-foreground">
                        {rfp.clientType}
                      </span>
                    </td>
                    <td>
                      <div>
                        <p className="font-medium">{format(rfp.deadline, 'dd MMM')}</p>
                        <p className={cn(
                          'text-xs',
                          daysUntil <= 3 ? 'text-status-rejected' :
                          daysUntil <= 7 ? 'text-status-pending' :
                          'text-muted-foreground'
                        )}>
                          {daysUntil} days
                        </p>
                      </div>
                    </td>
                    <td><StatusBadge status={rfp.currentStage} /></td>
                    <td className="font-mono">{formatCurrency(rfp.estimatedValue)}</td>
                    <td className="text-muted-foreground">{rfp.assignedOwner}</td>
                    <td><StatusBadge status={rfp.urgency} /></td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {filteredRFPs.length === 0 && (
          <div className="py-12 text-center text-muted-foreground">
            No RFPs found matching your criteria
          </div>
        )}
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="glass-card p-4 text-center">
          <p className="text-2xl font-semibold text-foreground">{filteredRFPs.length}</p>
          <p className="text-xs text-muted-foreground">Total Results</p>
        </div>
        <div className="glass-card p-4 text-center">
          <p className="text-2xl font-semibold text-status-rejected">
            {filteredRFPs.filter(r => getDaysUntilDeadline(r.deadline) <= 7).length}
          </p>
          <p className="text-xs text-muted-foreground">Due This Week</p>
        </div>
        <div className="glass-card p-4 text-center">
          <p className="text-2xl font-semibold text-status-pending">
            {filteredRFPs.filter(r => r.currentStage === 'human_review' || r.currentStage === 'validation').length}
          </p>
          <p className="text-xs text-muted-foreground">Needs Review</p>
        </div>
        <div className="glass-card p-4 text-center">
          <p className="text-2xl font-semibold text-primary">
            {formatCurrency(filteredRFPs.reduce((sum, r) => sum + r.estimatedValue, 0))}
          </p>
          <p className="text-xs text-muted-foreground">Total Value</p>
        </div>
      </div>
    </div>
  );
}
