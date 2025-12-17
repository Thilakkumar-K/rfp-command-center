import { NavLink, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  FileText, 
  Bot, 
  CheckSquare, 
  FileOutput, 
  BarChart3, 
  Activity, 
  Settings,
  Zap
} from 'lucide-react';
import { cn } from '@/lib/utils';

const navItems = [
  { path: '/', label: 'Dashboard', icon: LayoutDashboard },
  { path: '/rfp', label: 'RFP Management', icon: FileText },
  { path: '/agents', label: 'Agent Workspace', icon: Bot },
  { path: '/validation', label: 'Validation & Approvals', icon: CheckSquare },
  { path: '/outputs', label: 'Outputs & Documents', icon: FileOutput },
  { path: '/analytics', label: 'Analytics', icon: BarChart3 },
  { path: '/health', label: 'System Health', icon: Activity },
  { path: '/settings', label: 'Settings', icon: Settings },
];

export function Sidebar() {
  const location = useLocation();

  return (
    <aside className="fixed left-0 top-0 z-40 h-screen w-64 bg-sidebar border-r border-sidebar-border">
      <div className="flex h-full flex-col">
        {/* Logo */}
        <div className="flex items-center gap-3 px-6 py-5 border-b border-sidebar-border">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary">
            <Zap className="h-5 w-5 text-primary-foreground" />
          </div>
          <div>
            <h1 className="text-base font-semibold text-foreground">RFP Command</h1>
            <p className="text-xs text-muted-foreground">Agentic AI Platform</p>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 space-y-1 px-3 py-4 overflow-y-auto scrollbar-thin">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path || 
              (item.path !== '/' && location.pathname.startsWith(item.path));
            
            return (
              <NavLink
                key={item.path}
                to={item.path}
                className={cn(
                  'nav-item',
                  isActive && 'active'
                )}
              >
                <item.icon className="h-5 w-5" />
                <span>{item.label}</span>
              </NavLink>
            );
          })}
        </nav>

        {/* Footer */}
        <div className="border-t border-sidebar-border px-4 py-4">
          <div className="flex items-center gap-3">
            <div className="h-8 w-8 rounded-full bg-primary/20 flex items-center justify-center">
              <span className="text-xs font-medium text-primary">RK</span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-foreground truncate">Rajesh Kumar</p>
              <p className="text-xs text-muted-foreground">Proposal Manager</p>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
}
