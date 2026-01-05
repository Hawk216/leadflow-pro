import { cn } from '@/lib/utils';
import { LucideIcon } from 'lucide-react';

interface MetricCardProps {
  title: string;
  value: number;
  subtitle?: string;
  icon: LucideIcon;
  variant: 'default' | 'missing' | 'exchange' | 'target';
  delay?: number;
}

const variantStyles = {
  default: {
    bg: 'bg-primary/5',
    border: 'border-primary/20',
    icon: 'bg-primary/10 text-primary',
    value: 'text-primary',
  },
  missing: {
    bg: 'bg-warning/5',
    border: 'border-warning/20',
    icon: 'bg-warning/10 text-warning',
    value: 'text-warning',
  },
  exchange: {
    bg: 'bg-success/5',
    border: 'border-success/20',
    icon: 'bg-success/10 text-success',
    value: 'text-success',
  },
  target: {
    bg: 'bg-info/5',
    border: 'border-info/20',
    icon: 'bg-info/10 text-info',
    value: 'text-info',
  },
};

export function MetricCard({ title, value, subtitle, icon: Icon, variant, delay = 0 }: MetricCardProps) {
  const styles = variantStyles[variant];

  return (
    <div 
      className={cn(
        "relative overflow-hidden rounded-xl border p-6 transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5",
        styles.bg,
        styles.border
      )}
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-muted-foreground">{title}</p>
          <div className="mt-2 flex items-baseline gap-2">
            <span className={cn("text-4xl font-bold tracking-tight animate-counter-up", styles.value)}>
              {value.toLocaleString()}
            </span>
          </div>
          {subtitle && (
            <p className="mt-1 text-sm text-muted-foreground">{subtitle}</p>
          )}
        </div>
        <div className={cn("rounded-xl p-3", styles.icon)}>
          <Icon className="h-6 w-6" />
        </div>
      </div>
    </div>
  );
}
