import { ArrowLeftRight, CheckCircle2, Clock, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { cn } from '@/lib/utils';

const exchangeHistory = [
  { id: '1', leadName: 'James Wilson', oldLead: 'Marketing Lead #42', reason: 'Wrong industry', date: '2026-01-04', status: 'completed' },
  { id: '2', leadName: 'Anna Schmidt', oldLead: 'Sales Lead #78', reason: 'Duplicate contact', date: '2026-01-03', status: 'completed' },
  { id: '3', leadName: 'Carlos Rodriguez', oldLead: 'Finance Lead #23', reason: 'Invalid phone', date: '2026-01-02', status: 'completed' },
  { id: '4', leadName: 'Pending...', oldLead: 'Tech Lead #91', reason: 'Requested by client', date: '2026-01-05', status: 'pending' },
];

export function ExchangesView() {
  const exchangeLimit = 30; // 20% of 150
  const exchangeUsed = 18;
  const exchangeRemaining = exchangeLimit - exchangeUsed;
  const exchangeProgress = (exchangeUsed / exchangeLimit) * 100;

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Exchanges</h1>
          <p className="text-muted-foreground mt-1">
            Self-service lead exchange management
          </p>
        </div>
      </div>

      {/* Exchange Status Card */}
      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 rounded-xl border border-border bg-card p-6">
          <div className="flex items-start justify-between mb-6">
            <div>
              <h3 className="text-lg font-semibold">Monthly Exchange Quota</h3>
              <p className="text-sm text-muted-foreground">20% of your contract volume (D)</p>
            </div>
            <div className="h-12 w-12 rounded-xl bg-success/10 flex items-center justify-center">
              <ArrowLeftRight className="h-6 w-6 text-success" />
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-4xl font-bold">{exchangeUsed}</span>
              <span className="text-muted-foreground">/ {exchangeLimit} exchanges used</span>
            </div>
            
            <Progress value={exchangeProgress} className="h-3" />
            
            <div className="grid grid-cols-3 gap-4 pt-4">
              <div className="text-center p-4 rounded-lg bg-muted/50">
                <p className="text-2xl font-bold text-success">{exchangeRemaining}</p>
                <p className="text-xs text-muted-foreground">Remaining</p>
              </div>
              <div className="text-center p-4 rounded-lg bg-muted/50">
                <p className="text-2xl font-bold">{exchangeUsed}</p>
                <p className="text-xs text-muted-foreground">Used</p>
              </div>
              <div className="text-center p-4 rounded-lg bg-muted/50">
                <p className="text-2xl font-bold text-primary">{exchangeLimit}</p>
                <p className="text-xs text-muted-foreground">Limit</p>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="rounded-xl border border-border bg-card p-6">
          <h3 className="text-lg font-semibold mb-4">How Exchanges Work</h3>
          <div className="space-y-4 text-sm text-muted-foreground">
            <div className="flex gap-3">
              <div className="h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                <span className="text-xs font-bold text-primary">1</span>
              </div>
              <p>Select a lead you want to exchange from your leads list</p>
            </div>
            <div className="flex gap-3">
              <div className="h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                <span className="text-xs font-bold text-primary">2</span>
              </div>
              <p>Click the exchange button - no approval needed</p>
            </div>
            <div className="flex gap-3">
              <div className="h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                <span className="text-xs font-bold text-primary">3</span>
              </div>
              <p>Receive a replacement lead within 24 hours</p>
            </div>
          </div>
          <div className="mt-6 p-3 rounded-lg bg-warning/10 border border-warning/20">
            <div className="flex gap-2">
              <AlertCircle className="h-4 w-4 text-warning flex-shrink-0 mt-0.5" />
              <p className="text-xs text-warning">
                Unused exchanges carry over to next month to maintain your monthly targets.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Exchange History */}
      <div className="rounded-xl border border-border bg-card">
        <div className="p-6 border-b border-border">
          <h3 className="text-lg font-semibold">Exchange History</h3>
          <p className="text-sm text-muted-foreground">Recent exchange requests and their status</p>
        </div>
        <div className="divide-y divide-border">
          {exchangeHistory.map((exchange, index) => (
            <div 
              key={exchange.id}
              className="flex items-center justify-between p-4 table-row-hover animate-fade-in"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <div className="flex items-center gap-4">
                <div className={cn(
                  "h-10 w-10 rounded-full flex items-center justify-center",
                  exchange.status === 'completed' ? "bg-success/10" : "bg-warning/10"
                )}>
                  {exchange.status === 'completed' ? (
                    <CheckCircle2 className="h-5 w-5 text-success" />
                  ) : (
                    <Clock className="h-5 w-5 text-warning" />
                  )}
                </div>
                <div>
                  <p className="font-medium">{exchange.oldLead}</p>
                  <p className="text-sm text-muted-foreground">{exchange.reason}</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="text-right hidden sm:block">
                  <p className="text-sm font-medium">
                    {exchange.status === 'completed' ? `→ ${exchange.leadName}` : 'Processing...'}
                  </p>
                  <p className="text-xs text-muted-foreground">{exchange.date}</p>
                </div>
                <span className={cn(
                  "status-badge capitalize",
                  exchange.status === 'completed' ? "status-delivered" : "status-exchanged"
                )}>
                  {exchange.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
