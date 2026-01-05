import { useState } from 'react';
import { 
  LayoutDashboard, 
  Users, 
  Building2, 
  FileSpreadsheet, 
  ArrowLeftRight,
  Settings,
  Upload,
  Download,
  ChevronLeft,
  ChevronRight,
  Zap
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

interface NavItem {
  icon: React.ReactNode;
  label: string;
  href: string;
  active?: boolean;
}

interface SidebarProps {
  currentPage: string;
  onNavigate: (page: string) => void;
}

export function Sidebar({ currentPage, onNavigate }: SidebarProps) {
  const [collapsed, setCollapsed] = useState(false);

  const navItems: NavItem[] = [
    { icon: <LayoutDashboard size={20} />, label: 'Dashboard', href: 'dashboard' },
    { icon: <FileSpreadsheet size={20} />, label: 'Leads', href: 'leads' },
    { icon: <ArrowLeftRight size={20} />, label: 'Exchanges', href: 'exchanges' },
    { icon: <Building2 size={20} />, label: 'Industries', href: 'industries' },
    { icon: <Users size={20} />, label: 'Clients', href: 'clients' },
    { icon: <Upload size={20} />, label: 'Import', href: 'import' },
    { icon: <Download size={20} />, label: 'Export', href: 'export' },
  ];

  const bottomItems: NavItem[] = [
    { icon: <Settings size={20} />, label: 'Settings', href: 'settings' },
  ];

  return (
    <aside 
      className={cn(
        "fixed left-0 top-0 z-40 h-screen bg-sidebar transition-all duration-300 border-r border-sidebar-border",
        collapsed ? "w-16" : "w-64"
      )}
    >
      <div className="flex h-full flex-col">
        {/* Logo */}
        <div className={cn(
          "flex items-center gap-3 px-4 py-6 border-b border-sidebar-border",
          collapsed && "justify-center px-2"
        )}>
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-sidebar-primary">
            <Zap className="h-5 w-5 text-sidebar-primary-foreground" />
          </div>
          {!collapsed && (
            <div className="animate-fade-in">
              <h1 className="text-lg font-bold text-sidebar-foreground">LeadFlow</h1>
              <p className="text-xs text-sidebar-foreground/60">Delivery Platform</p>
            </div>
          )}
        </div>

        {/* Navigation */}
        <nav className="flex-1 space-y-1 p-3">
          {navItems.map((item) => (
            <button
              key={item.href}
              onClick={() => onNavigate(item.href)}
              className={cn(
                "flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all duration-200",
                currentPage === item.href
                  ? "bg-sidebar-primary text-sidebar-primary-foreground shadow-md"
                  : "text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-foreground",
                collapsed && "justify-center px-2"
              )}
            >
              {item.icon}
              {!collapsed && <span className="animate-fade-in">{item.label}</span>}
            </button>
          ))}
        </nav>

        {/* Bottom items */}
        <div className="border-t border-sidebar-border p-3 space-y-1">
          {bottomItems.map((item) => (
            <button
              key={item.href}
              onClick={() => onNavigate(item.href)}
              className={cn(
                "flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all duration-200",
                currentPage === item.href
                  ? "bg-sidebar-primary text-sidebar-primary-foreground"
                  : "text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-foreground",
                collapsed && "justify-center px-2"
              )}
            >
              {item.icon}
              {!collapsed && <span>{item.label}</span>}
            </button>
          ))}

          {/* Collapse toggle */}
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setCollapsed(!collapsed)}
            className={cn(
              "w-full mt-2 text-sidebar-foreground/60 hover:text-sidebar-foreground hover:bg-sidebar-accent",
              collapsed && "px-2"
            )}
          >
            {collapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
            {!collapsed && <span className="ml-2">Collapse</span>}
          </Button>
        </div>
      </div>
    </aside>
  );
}
