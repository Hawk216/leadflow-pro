import { ArrowRight, ArrowLeftRight, Sparkles, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const recentLeads = [
  { id: '1', name: 'Sarah Johnson', email: 'sarah@techcorp.com', industry: 'Technology', status: 'new', time: '2 min ago' },
  { id: '2', name: 'Michael Chen', email: 'mchen@finserve.io', industry: 'Finance', status: 'delivered', time: '15 min ago' },
  { id: '3', name: 'Emily Davis', email: 'emily@healthcare.org', industry: 'Healthcare', status: 'new', time: '1 hour ago' },
  { id: '4', name: 'James Wilson', email: 'jwilson@retail.com', industry: 'Retail', status: 'exchanged', time: '2 hours ago' },
  { id: '5', name: 'Lisa Anderson', email: 'lisa@realestate.co', industry: 'Real Estate', status: 'delivered', time: '3 hours ago' },
];

const statusStyles = {
  new: 'status-new',
  delivered: 'status-delivered',
  exchanged: 'status-exchanged',
};

export function RecentLeads() {
  return (
    <div className="rounded-2xl border border-border/60 bg-card/80 backdrop-blur-sm overflow-hidden shadow-xl shadow-black/5">
      <div className="flex items-center justify-between p-6 border-b border-border/60 bg-gradient-to-r from-muted/50 to-transparent">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center border border-primary/20">
            <Clock className="h-5 w-5 text-primary" />
          </div>
          <div>
            <h3 className="text-lg font-semibold flex items-center gap-2">
              Recent Leads
              <Sparkles className="h-4 w-4 text-primary animate-pulse" />
            </h3>
            <p className="text-sm text-muted-foreground">Latest activity</p>
          </div>
        </div>
        <Button variant="ghost" size="sm" className="gap-1 hover:bg-primary/10 hover:text-primary">
          View all <ArrowRight className="h-4 w-4" />
        </Button>
      </div>
      <div className="divide-y divide-border/40">
        {recentLeads.map((lead, index) => (
          <div 
            key={lead.id} 
            className="group flex items-center justify-between p-4 hover:bg-primary/5 transition-all duration-200 animate-fade-in"
            style={{ animationDelay: `${index * 50}ms` }}
          >
            <div className="flex items-center gap-4">
              <div className="h-11 w-11 rounded-xl bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center border border-primary/20 group-hover:border-primary/40 transition-colors">
                <span className="text-sm font-bold text-primary">
                  {lead.name.split(' ').map(n => n[0]).join('')}
                </span>
              </div>
              <div>
                <p className="font-semibold group-hover:text-primary transition-colors">{lead.name}</p>
                <div className="flex items-center gap-2">
                  <p className="text-sm text-muted-foreground">{lead.email}</p>
                  <span className="text-xs text-muted-foreground/60">• {lead.time}</span>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-xs px-2 py-1 rounded-md bg-muted/50 text-muted-foreground font-medium hidden sm:block">{lead.industry}</span>
              <span className={cn("status-badge capitalize", statusStyles[lead.status as keyof typeof statusStyles])}>
                {lead.status}
              </span>
              {lead.status === 'new' && (
                <Button variant="ghost" size="icon" className="h-8 w-8 text-success hover:text-success hover:bg-success/10 opacity-0 group-hover:opacity-100 transition-opacity">
                  <ArrowLeftRight className="h-4 w-4" />
                </Button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
