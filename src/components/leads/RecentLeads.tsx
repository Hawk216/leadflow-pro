import { ArrowRight, ArrowLeftRight } from 'lucide-react';
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
    <div className="rounded-xl border border-border bg-card">
      <div className="flex items-center justify-between p-6 border-b border-border">
        <div>
          <h3 className="text-lg font-semibold">Recent Leads</h3>
          <p className="text-sm text-muted-foreground">Latest activity</p>
        </div>
        <Button variant="ghost" size="sm" className="gap-1">
          View all <ArrowRight className="h-4 w-4" />
        </Button>
      </div>
      <div className="divide-y divide-border">
        {recentLeads.map((lead, index) => (
          <div 
            key={lead.id} 
            className="flex items-center justify-between p-4 table-row-hover animate-fade-in"
            style={{ animationDelay: `${index * 50}ms` }}
          >
            <div className="flex items-center gap-4">
              <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                <span className="text-sm font-medium text-primary">
                  {lead.name.split(' ').map(n => n[0]).join('')}
                </span>
              </div>
              <div>
                <p className="font-medium">{lead.name}</p>
                <p className="text-sm text-muted-foreground">{lead.email}</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-sm text-muted-foreground hidden sm:block">{lead.industry}</span>
              <span className={cn("status-badge capitalize", statusStyles[lead.status as keyof typeof statusStyles])}>
                {lead.status}
              </span>
              {lead.status === 'new' && (
                <Button variant="ghost" size="icon" className="h-8 w-8 text-success hover:text-success hover:bg-success/10">
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
