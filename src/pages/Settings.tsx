import { useState } from 'react';
import { User, Bell, Clock, Shield, ChevronRight } from 'lucide-react';
import { PageHeader } from '@/components/common/PageHeader';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import { toast } from '@/hooks/use-toast';

const roles = [
  { id: 'viewer', label: 'Viewer', description: 'Can view RFPs and reports' },
  { id: 'reviewer', label: 'Reviewer', description: 'Can approve validations' },
  { id: 'manager', label: 'Manager', description: 'Full access to all features' },
  { id: 'admin', label: 'Admin', description: 'System administration' },
];

export default function Settings() {
  const [notifications, setNotifications] = useState({
    deadlineAlerts: true,
    validationRequired: true,
    agentWarnings: false,
    dailyDigest: true,
  });

  const [slaThresholds, setSlaThresholds] = useState({
    criticalDays: 3,
    highDays: 7,
    mediumDays: 14,
  });

  const handleSave = () => {
    toast({
      title: 'Settings Saved',
      description: 'Your preferences have been updated successfully.',
    });
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <PageHeader 
        title="Settings & Access"
        description="Configure system preferences and access controls"
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Settings */}
        <div className="lg:col-span-2 space-y-6">
          {/* Notification Preferences */}
          <div className="glass-card p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <Bell className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground">Notification Preferences</h3>
                <p className="text-sm text-muted-foreground">Configure how you receive alerts</p>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 rounded-lg bg-muted/30">
                <div>
                  <p className="text-sm font-medium">Deadline Alerts</p>
                  <p className="text-xs text-muted-foreground">Get notified when RFPs approach deadline</p>
                </div>
                <Switch 
                  checked={notifications.deadlineAlerts}
                  onCheckedChange={(checked) => setNotifications(prev => ({ ...prev, deadlineAlerts: checked }))}
                />
              </div>

              <div className="flex items-center justify-between p-3 rounded-lg bg-muted/30">
                <div>
                  <p className="text-sm font-medium">Validation Required</p>
                  <p className="text-xs text-muted-foreground">Alert when items need your review</p>
                </div>
                <Switch 
                  checked={notifications.validationRequired}
                  onCheckedChange={(checked) => setNotifications(prev => ({ ...prev, validationRequired: checked }))}
                />
              </div>

              <div className="flex items-center justify-between p-3 rounded-lg bg-muted/30">
                <div>
                  <p className="text-sm font-medium">Agent Warnings</p>
                  <p className="text-xs text-muted-foreground">Notifications for agent issues</p>
                </div>
                <Switch 
                  checked={notifications.agentWarnings}
                  onCheckedChange={(checked) => setNotifications(prev => ({ ...prev, agentWarnings: checked }))}
                />
              </div>

              <div className="flex items-center justify-between p-3 rounded-lg bg-muted/30">
                <div>
                  <p className="text-sm font-medium">Daily Digest</p>
                  <p className="text-xs text-muted-foreground">Summary email every morning</p>
                </div>
                <Switch 
                  checked={notifications.dailyDigest}
                  onCheckedChange={(checked) => setNotifications(prev => ({ ...prev, dailyDigest: checked }))}
                />
              </div>
            </div>
          </div>

          {/* SLA Thresholds */}
          <div className="glass-card p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="h-10 w-10 rounded-lg bg-status-pending/10 flex items-center justify-center">
                <Clock className="h-5 w-5 text-status-pending" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground">SLA Thresholds</h3>
                <p className="text-sm text-muted-foreground">Define urgency levels based on days to deadline</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="text-sm text-muted-foreground">Critical (days)</label>
                <Input 
                  type="number"
                  value={slaThresholds.criticalDays}
                  onChange={(e) => setSlaThresholds(prev => ({ ...prev, criticalDays: parseInt(e.target.value) }))}
                  className="mt-1 bg-muted/30 border-border"
                />
                <p className="text-xs text-status-rejected mt-1">Urgent attention required</p>
              </div>
              <div>
                <label className="text-sm text-muted-foreground">High (days)</label>
                <Input 
                  type="number"
                  value={slaThresholds.highDays}
                  onChange={(e) => setSlaThresholds(prev => ({ ...prev, highDays: parseInt(e.target.value) }))}
                  className="mt-1 bg-muted/30 border-border"
                />
                <p className="text-xs text-status-pending mt-1">Needs prioritization</p>
              </div>
              <div>
                <label className="text-sm text-muted-foreground">Medium (days)</label>
                <Input 
                  type="number"
                  value={slaThresholds.mediumDays}
                  onChange={(e) => setSlaThresholds(prev => ({ ...prev, mediumDays: parseInt(e.target.value) }))}
                  className="mt-1 bg-muted/30 border-border"
                />
                <p className="text-xs text-muted-foreground mt-1">Standard processing</p>
              </div>
            </div>
          </div>

          <Button onClick={handleSave} className="w-full">
            Save Settings
          </Button>
        </div>

        {/* Role Access */}
        <div className="space-y-6">
          <div className="glass-card p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="h-10 w-10 rounded-lg bg-agent-sales/10 flex items-center justify-center">
                <Shield className="h-5 w-5 text-agent-sales" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground">Role Access</h3>
                <p className="text-sm text-muted-foreground">Your current: Manager</p>
              </div>
            </div>

            <div className="space-y-2">
              {roles.map((role) => (
                <div 
                  key={role.id}
                  className={cn(
                    'p-3 rounded-lg border transition-colors',
                    role.id === 'manager' 
                      ? 'border-primary bg-primary/5' 
                      : 'border-border bg-muted/30'
                  )}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className={cn(
                        'text-sm font-medium',
                        role.id === 'manager' && 'text-primary'
                      )}>
                        {role.label}
                      </p>
                      <p className="text-xs text-muted-foreground">{role.description}</p>
                    </div>
                    {role.id === 'manager' && (
                      <span className="text-xs bg-primary text-primary-foreground px-2 py-0.5 rounded">
                        Current
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* User Profile */}
          <div className="glass-card p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="h-10 w-10 rounded-lg bg-muted flex items-center justify-center">
                <User className="h-5 w-5 text-muted-foreground" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground">Profile</h3>
                <p className="text-sm text-muted-foreground">Account details</p>
              </div>
            </div>

            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Name</span>
                <span className="font-medium">Rajesh Kumar</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Email</span>
                <span className="font-medium">rajesh.k@company.com</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Department</span>
                <span className="font-medium">Proposals</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Last Login</span>
                <span className="font-medium">Today, 9:30 AM</span>
              </div>
            </div>

            <Button variant="outline" className="w-full mt-4 gap-2">
              Manage Account
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
