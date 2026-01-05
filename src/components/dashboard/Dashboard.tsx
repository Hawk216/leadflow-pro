import { Package, AlertTriangle, ArrowLeftRight, Target, TrendingUp, Users } from 'lucide-react';
import { MetricCard } from './MetricCard';
import { ProgressRing } from './ProgressRing';
import { DeliveryChart } from './DeliveryChart';
import { RecentLeads } from '../leads/RecentLeads';

export function Dashboard() {
  const metrics = {
    default: 150,
    missing: 12,
    exchange: 18,
    target: 180,
    delivered: 142,
    remaining: 38,
    exchangeLimit: 30,
    exchangeUsed: 18,
  };

  const deliveryProgress = (metrics.delivered / metrics.target) * 100;
  const exchangeProgress = (metrics.exchangeUsed / metrics.exchangeLimit) * 100;

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground mt-1">
          Monthly lead delivery overview for January 2026
        </p>
      </div>

      {/* D/M/E Metrics */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <MetricCard
          title="Default (D)"
          value={metrics.default}
          subtitle="Contract volume"
          icon={Package}
          variant="default"
          delay={0}
        />
        <MetricCard
          title="Missing (M)"
          value={metrics.missing}
          subtitle="From last month"
          icon={AlertTriangle}
          variant="missing"
          delay={100}
        />
        <MetricCard
          title="Exchange (E)"
          value={metrics.exchange}
          subtitle={`${metrics.exchangeUsed}/${metrics.exchangeLimit} used`}
          icon={ArrowLeftRight}
          variant="exchange"
          delay={200}
        />
        <MetricCard
          title="Target"
          value={metrics.target}
          subtitle="D + M + E"
          icon={Target}
          variant="target"
          delay={300}
        />
      </div>

      {/* Progress & Stats */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Delivery Progress */}
        <div className="rounded-xl border border-border bg-card p-6">
          <h3 className="text-lg font-semibold mb-4">Delivery Progress</h3>
          <div className="flex items-center justify-center py-4">
            <ProgressRing progress={deliveryProgress} size={160} strokeWidth={12} />
          </div>
          <div className="mt-4 grid grid-cols-2 gap-4 text-center">
            <div>
              <p className="text-2xl font-bold text-success">{metrics.delivered}</p>
              <p className="text-xs text-muted-foreground">Delivered</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-warning">{metrics.remaining}</p>
              <p className="text-xs text-muted-foreground">Remaining</p>
            </div>
          </div>
        </div>

        {/* Exchange Status */}
        <div className="rounded-xl border border-border bg-card p-6">
          <h3 className="text-lg font-semibold mb-4">Exchange Status</h3>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span className="text-muted-foreground">Exchange Used</span>
                <span className="font-medium">{metrics.exchangeUsed}/{metrics.exchangeLimit}</span>
              </div>
              <div className="h-3 rounded-full bg-muted overflow-hidden">
                <div 
                  className="h-full rounded-full bg-gradient-to-r from-success to-success/70 transition-all duration-1000"
                  style={{ width: `${exchangeProgress}%` }}
                />
              </div>
            </div>
            <p className="text-sm text-muted-foreground">
              {metrics.exchangeLimit - metrics.exchangeUsed} exchanges remaining this month (20% limit)
            </p>
            <div className="pt-4 border-t border-border">
              <div className="flex items-center gap-2 text-sm">
                <TrendingUp className="h-4 w-4 text-success" />
                <span className="text-muted-foreground">+5 exchanges from last month</span>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="rounded-xl border border-border bg-card p-6">
          <h3 className="text-lg font-semibold mb-4">Quick Stats</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Users className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm font-medium">Active Clients</p>
                  <p className="text-xs text-muted-foreground">This month</p>
                </div>
              </div>
              <span className="text-2xl font-bold">78</span>
            </div>
            <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-lg bg-info/10 flex items-center justify-center">
                  <Package className="h-5 w-5 text-info" />
                </div>
                <div>
                  <p className="text-sm font-medium">Industries</p>
                  <p className="text-xs text-muted-foreground">Active campaigns</p>
                </div>
              </div>
              <span className="text-2xl font-bold">12</span>
            </div>
          </div>
        </div>
      </div>

      {/* Charts & Recent Activity */}
      <div className="grid gap-6 lg:grid-cols-2">
        <DeliveryChart />
        <RecentLeads />
      </div>
    </div>
  );
}
