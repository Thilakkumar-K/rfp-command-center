import { useState } from 'react';
import { CheckCircle2, XCircle, AlertTriangle, Eye } from 'lucide-react';
import { PageHeader } from '@/components/common/PageHeader';
import { StatusBadge } from '@/components/common/StatusBadge';
import { ProgressBar } from '@/components/common/ProgressBar';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { mockValidationItems } from '@/data/mockData';
import { ValidationItem } from '@/types/rfp';
import { formatDistanceToNow } from 'date-fns';
import { cn } from '@/lib/utils';
import { toast } from '@/hooks/use-toast';

export default function Validation() {
  const [items, setItems] = useState(mockValidationItems);
  const [selectedItem, setSelectedItem] = useState<ValidationItem | null>(null);
  const [rejectionReason, setRejectionReason] = useState('');
  const [showRejectDialog, setShowRejectDialog] = useState(false);

  const pendingItems = items.filter(i => i.status === 'pending');
  const approvedItems = items.filter(i => i.status === 'approved');
  const rejectedItems = items.filter(i => i.status === 'rejected');

  const handleApprove = (item: ValidationItem) => {
    setItems(prev => prev.map(i => 
      i.id === item.id ? { ...i, status: 'approved' as const } : i
    ));
    toast({
      title: 'Item Approved',
      description: `${item.description} has been approved.`,
    });
  };

  const handleReject = () => {
    if (!selectedItem || !rejectionReason.trim()) return;
    
    setItems(prev => prev.map(i => 
      i.id === selectedItem.id ? { ...i, status: 'rejected' as const } : i
    ));
    setShowRejectDialog(false);
    setSelectedItem(null);
    setRejectionReason('');
    toast({
      title: 'Item Rejected',
      description: `${selectedItem.description} has been rejected.`,
      variant: 'destructive',
    });
  };

  const openRejectDialog = (item: ValidationItem) => {
    setSelectedItem(item);
    setShowRejectDialog(true);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <PageHeader 
        title="Validation & Approvals"
        description="Review and approve agent decisions requiring human oversight"
      />

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="glass-card p-4">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-lg bg-status-pending/10 flex items-center justify-center">
              <AlertTriangle className="h-5 w-5 text-status-pending" />
            </div>
            <div>
              <p className="text-2xl font-semibold text-foreground">{pendingItems.length}</p>
              <p className="text-xs text-muted-foreground">Pending Review</p>
            </div>
          </div>
        </div>
        <div className="glass-card p-4">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-lg bg-status-approved/10 flex items-center justify-center">
              <CheckCircle2 className="h-5 w-5 text-status-approved" />
            </div>
            <div>
              <p className="text-2xl font-semibold text-foreground">{approvedItems.length}</p>
              <p className="text-xs text-muted-foreground">Approved Today</p>
            </div>
          </div>
        </div>
        <div className="glass-card p-4">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-lg bg-status-rejected/10 flex items-center justify-center">
              <XCircle className="h-5 w-5 text-status-rejected" />
            </div>
            <div>
              <p className="text-2xl font-semibold text-foreground">{rejectedItems.length}</p>
              <p className="text-xs text-muted-foreground">Rejected</p>
            </div>
          </div>
        </div>
      </div>

      {/* Validation Queue */}
      <div className="glass-card overflow-hidden">
        <div className="p-4 border-b border-border">
          <h2 className="font-semibold text-foreground">Validation Queue</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="data-table">
            <thead className="bg-muted/30">
              <tr>
                <th>RFP ID</th>
                <th>Type</th>
                <th>Description</th>
                <th>Reason Flagged</th>
                <th>Confidence</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item) => (
                <tr key={item.id}>
                  <td className="font-mono text-primary">{item.rfpId}</td>
                  <td>
                    <span className={cn(
                      'text-xs px-2 py-1 rounded',
                      item.itemType === 'technical' && 'bg-agent-technical/10 text-agent-technical',
                      item.itemType === 'pricing' && 'bg-agent-pricing/10 text-agent-pricing',
                      item.itemType === 'compliance' && 'bg-agent-sales/10 text-agent-sales'
                    )}>
                      {item.itemType}
                    </span>
                  </td>
                  <td className="max-w-[200px] truncate">{item.description}</td>
                  <td className="max-w-[200px] text-muted-foreground text-sm truncate">
                    {item.reasonFlagged}
                  </td>
                  <td>
                    <div className="flex items-center gap-2">
                      <ProgressBar 
                        value={item.agentConfidence} 
                        size="sm"
                        variant={
                          item.agentConfidence >= 80 ? 'success' :
                          item.agentConfidence >= 60 ? 'warning' : 'danger'
                        }
                        className="w-16"
                      />
                      <span className="text-sm font-mono">{item.agentConfidence}%</span>
                    </div>
                  </td>
                  <td><StatusBadge status={item.status} /></td>
                  <td>
                    {item.status === 'pending' ? (
                      <div className="flex items-center gap-2">
                        <Button 
                          size="sm" 
                          variant="ghost"
                          className="h-8 w-8 p-0 text-muted-foreground hover:text-foreground"
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button 
                          size="sm" 
                          variant="ghost"
                          className="h-8 w-8 p-0 text-status-approved hover:text-status-approved/80"
                          onClick={() => handleApprove(item)}
                        >
                          <CheckCircle2 className="h-4 w-4" />
                        </Button>
                        <Button 
                          size="sm" 
                          variant="ghost"
                          className="h-8 w-8 p-0 text-status-rejected hover:text-status-rejected/80"
                          onClick={() => openRejectDialog(item)}
                        >
                          <XCircle className="h-4 w-4" />
                        </Button>
                      </div>
                    ) : (
                      <span className="text-xs text-muted-foreground">
                        {formatDistanceToNow(item.createdAt, { addSuffix: true })}
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Rejection Dialog */}
      <Dialog open={showRejectDialog} onOpenChange={setShowRejectDialog}>
        <DialogContent className="bg-card border-border">
          <DialogHeader>
            <DialogTitle>Reject Validation Item</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            {selectedItem && (
              <div className="p-3 rounded-lg bg-muted/30">
                <p className="text-sm font-medium">{selectedItem.description}</p>
                <p className="text-xs text-muted-foreground mt-1">{selectedItem.reasonFlagged}</p>
              </div>
            )}
            <div>
              <label className="text-sm font-medium text-foreground">
                Rejection Reason <span className="text-status-rejected">*</span>
              </label>
              <Textarea
                placeholder="Please provide a detailed reason for rejection..."
                value={rejectionReason}
                onChange={(e) => setRejectionReason(e.target.value)}
                className="mt-2 bg-muted/30 border-border"
                rows={4}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowRejectDialog(false)}>
              Cancel
            </Button>
            <Button 
              variant="destructive" 
              onClick={handleReject}
              disabled={!rejectionReason.trim()}
            >
              Reject Item
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
