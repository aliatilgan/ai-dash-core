import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";

const data = [
  { category: "Electronics", value: 45000, growth: 12 },
  { category: "Fashion", value: 38000, growth: 8 },
  { category: "Home", value: 29000, growth: 15 },
  { category: "Sports", value: 24000, growth: 6 },
  { category: "Books", value: 18000, growth: -3 },
];

export const CategoryChart = () => {
  return (
    <div className="rounded-lg border bg-card p-6 animate-fade-in">
      <div className="mb-6">
        <h3 className="text-lg font-semibold">Category Performance</h3>
        <p className="text-sm text-muted-foreground">Revenue by product category</p>
      </div>
      
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
          <XAxis 
            dataKey="category" 
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
          <Bar 
            dataKey="value" 
            fill="hsl(var(--chart-1))" 
            radius={[8, 8, 0, 0]}
            name="Revenue ($)"
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};
