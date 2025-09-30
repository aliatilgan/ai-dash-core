import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const data = [
  { date: "Jan 1", users: 5200 },
  { date: "Jan 8", users: 5800 },
  { date: "Jan 15", users: 6200 },
  { date: "Jan 22", users: 6800 },
  { date: "Jan 29", users: 7400 },
  { date: "Feb 5", users: 7850 },
  { date: "Feb 12", users: 8234 },
];

export const UserGrowthChart = () => {
  return (
    <div className="rounded-lg border bg-card p-6 animate-fade-in">
      <div className="mb-6">
        <h3 className="text-lg font-semibold">User Growth</h3>
        <p className="text-sm text-muted-foreground">7-day active user trend</p>
      </div>
      
      <ResponsiveContainer width="100%" height={250}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
          <XAxis 
            dataKey="date" 
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
          <Line 
            type="monotone" 
            dataKey="users" 
            stroke="hsl(var(--chart-3))" 
            strokeWidth={3}
            dot={{ fill: "hsl(var(--chart-3))", r: 4 }}
            activeDot={{ r: 6 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};
