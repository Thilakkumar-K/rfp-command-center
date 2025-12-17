import { useState } from 'react';
import { FileSpreadsheet, FileText, Download, Eye, Search, Filter } from 'lucide-react';
import { PageHeader } from '@/components/common/PageHeader';
import { StatusBadge } from '@/components/common/StatusBadge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { mockDocuments } from '@/data/mockData';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';
import { toast } from '@/hooks/use-toast';

const documentTypeIcons = {
  compliance: FileText,
  boq: FileSpreadsheet,
  deviation: FileText,
  assumptions: FileText,
};

const documentTypeColors = {
  compliance: 'text-agent-technical bg-agent-technical/10',
  boq: 'text-agent-pricing bg-agent-pricing/10',
  deviation: 'text-status-pending bg-status-pending/10',
  assumptions: 'text-muted-foreground bg-muted',
};

export default function Outputs() {
  const [searchQuery, setSearchQuery] = useState('');
  const [typeFilter, setTypeFilter] = useState<string>('all');

  const filteredDocs = mockDocuments.filter(doc => {
    const matchesSearch = doc.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doc.rfpId.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = typeFilter === 'all' || doc.type === typeFilter;
    return matchesSearch && matchesType;
  });

  const handleDownload = (doc: typeof mockDocuments[0]) => {
    toast({
      title: 'Download Started',
      description: `Downloading ${doc.name}.${doc.format}`,
    });
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <PageHeader 
        title="Outputs & Documents"
        description="Access and download generated deliverables"
      />

      {/* Search and Filters */}
      <div className="glass-card p-4">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search documents..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9 bg-muted/30 border-border"
            />
          </div>
          <div className="flex gap-2">
            {['all', 'compliance', 'boq', 'deviation', 'assumptions'].map((type) => (
              <button
                key={type}
                onClick={() => setTypeFilter(type)}
                className={cn(
                  'px-3 py-1.5 rounded-lg text-xs font-medium transition-colors capitalize',
                  typeFilter === type
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-muted text-muted-foreground hover:bg-muted/80'
                )}
              >
                {type === 'all' ? 'All Types' : type}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Document Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredDocs.map((doc) => {
          const Icon = documentTypeIcons[doc.type];
          return (
            <div key={doc.id} className="glass-card p-5 hover:border-primary/30 transition-colors">
              <div className="flex items-start justify-between mb-4">
                <div className={cn(
                  'h-10 w-10 rounded-lg flex items-center justify-center',
                  documentTypeColors[doc.type]
                )}>
                  <Icon className="h-5 w-5" />
                </div>
                <StatusBadge status={doc.status} />
              </div>
              
              <h3 className="font-medium text-foreground mb-1 line-clamp-1">{doc.name}</h3>
              <p className="text-xs text-muted-foreground font-mono mb-3">{doc.rfpId}</p>
              
              <div className="flex items-center justify-between text-xs text-muted-foreground mb-4">
                <span>Version {doc.version}</span>
                <span>{format(doc.createdAt, 'dd MMM yyyy')}</span>
              </div>
              
              <div className="flex gap-2">
                <Button variant="outline" size="sm" className="flex-1 gap-1.5">
                  <Eye className="h-3.5 w-3.5" />
                  Preview
                </Button>
                <Button 
                  size="sm" 
                  className="flex-1 gap-1.5"
                  onClick={() => handleDownload(doc)}
                >
                  <Download className="h-3.5 w-3.5" />
                  {doc.format.toUpperCase()}
                </Button>
              </div>
            </div>
          );
        })}
      </div>

      {filteredDocs.length === 0 && (
        <div className="glass-card p-12 text-center">
          <p className="text-muted-foreground">No documents found</p>
        </div>
      )}

      {/* Summary */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="glass-card p-4 text-center">
          <p className="text-2xl font-semibold text-foreground">
            {mockDocuments.filter(d => d.type === 'compliance').length}
          </p>
          <p className="text-xs text-muted-foreground">Compliance Sheets</p>
        </div>
        <div className="glass-card p-4 text-center">
          <p className="text-2xl font-semibold text-foreground">
            {mockDocuments.filter(d => d.type === 'boq').length}
          </p>
          <p className="text-xs text-muted-foreground">BOQ Documents</p>
        </div>
        <div className="glass-card p-4 text-center">
          <p className="text-2xl font-semibold text-foreground">
            {mockDocuments.filter(d => d.status === 'final').length}
          </p>
          <p className="text-xs text-muted-foreground">Finalized</p>
        </div>
        <div className="glass-card p-4 text-center">
          <p className="text-2xl font-semibold text-foreground">
            {mockDocuments.filter(d => d.status === 'draft').length}
          </p>
          <p className="text-xs text-muted-foreground">Drafts</p>
        </div>
      </div>
    </div>
  );
}
