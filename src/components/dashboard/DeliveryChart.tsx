import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

const data = [
  { month: 'Jul', default: 120, missing: 15, exchange: 8 },
  { month: 'Aug', default: 130, missing: 12, exchange: 10 },
  { month: 'Sep', default: 125, missing: 18, exchange: 12 },
  { month: 'Oct', default: 140, missing: 10, exchange: 15 },
  { month: 'Nov', default: 135, missing: 8, exchange: 11 },
  { month: 'Dec', default: 150, missing: 5, exchange: 14 },
];

export function DeliveryChart() {
  return (
    <div className="rounded-xl border border-border bg-card p-6">
      <div className="mb-6">
        <h3 className="text-lg font-semibold">Delivery Overview</h3>
        <p className="text-sm text-muted-foreground">Monthly D/M/E breakdown</p>
      </div>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
          <XAxis 
            dataKey="month" 
            axisLine={false}
            tickLine={false}
            className="text-xs fill-muted-foreground"
          />
          <YAxis 
            axisLine={false}
            tickLine={false}
            className="text-xs fill-muted-foreground"
          />
          <Tooltip 
            contentStyle={{ 
              backgroundColor: 'hsl(var(--card))',
              border: '1px solid hsl(var(--border))',
              borderRadius: '8px',
            }}
            labelStyle={{ color: 'hsl(var(--foreground))' }}
          />
          <Legend 
            wrapperStyle={{ paddingTop: '20px' }}
            formatter={(value) => {
              const labels: Record<string, string> = {
                default: 'Default (D)',
                missing: 'Missing (M)',
                exchange: 'Exchange (E)'
              };
              return <span className="text-sm">{labels[value] || value}</span>;
            }}
          />
          <Bar 
            dataKey="default" 
            fill="hsl(var(--primary))" 
            radius={[4, 4, 0, 0]}
            name="default"
          />
          <Bar 
            dataKey="missing" 
            fill="hsl(var(--warning))" 
            radius={[4, 4, 0, 0]}
            name="missing"
          />
          <Bar 
            dataKey="exchange" 
            fill="hsl(var(--success))" 
            radius={[4, 4, 0, 0]}
            name="exchange"
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
