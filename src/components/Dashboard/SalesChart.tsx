import { LineChart, Line, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";

const data = [
  { month: "Jan", sales: 12500, revenue: 24000 },
  { month: "Feb", sales: 15200, revenue: 28500 },
  { month: "Mar", sales: 18700, revenue: 35200 },
  { month: "Apr", sales: 22100, revenue: 41800 },
  { month: "May", sales: 25800, revenue: 48500 },
  { month: "Jun", sales: 29400, revenue: 55200 },
];

export const SalesChart = () => {
  return (
    <div className="rounded-lg border bg-card p-6 animate-fade-in">
      <div className="mb-6">
        <h3 className="text-lg font-semibold">Sales & Revenue Trend</h3>
        <p className="text-sm text-muted-foreground">Monthly performance overview</p>
      </div>
      
      <ResponsiveContainer width="100%" height={300}>
        <AreaChart data={data}>
          <defs>
            <linearGradient id="salesGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="hsl(var(--chart-1))" stopOpacity={0.3}/>
              <stop offset="95%" stopColor="hsl(var(--chart-1))" stopOpacity={0}/>
            </linearGradient>
            <linearGradient id="revenueGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="hsl(var(--chart-2))" stopOpacity={0.3}/>
              <stop offset="95%" stopColor="hsl(var(--chart-2))" stopOpacity={0}/>
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
          <XAxis 
            dataKey="month" 
            stroke="hsl(var(--muted-foreground))"
            fontSize={12}
          />
          <YAxis 
            stroke="hsl(var(--muted-foreground))"
            fontSize={12}
          />
          <Tooltip 
            contentStyle={{
              backgroundColor: "hsl(var(--card))",
              border: "1px solid hsl(var(--border))",
              borderRadius: "8px",
            }}
          />
          <Legend />
          <Area 
            type="monotone" 
            dataKey="sales" 
            stroke="hsl(var(--chart-1))" 
            fill="url(#salesGradient)"
            strokeWidth={2}
          />
          <Area 
            type="monotone" 
            dataKey="revenue" 
            stroke="hsl(var(--chart-2))" 
            fill="url(#revenueGradient)"
            strokeWidth={2}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};
