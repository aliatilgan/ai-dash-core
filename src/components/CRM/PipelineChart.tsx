import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts";

const data = [
  { name: "Qualified", value: 35, color: "hsl(var(--chart-1))" },
  { name: "Negotiation", value: 25, color: "hsl(var(--chart-2))" },
  { name: "Proposal", value: 20, color: "hsl(var(--chart-3))" },
  { name: "Closed Won", value: 15, color: "hsl(var(--success))" },
  { name: "Closed Lost", value: 5, color: "hsl(var(--destructive))" },
];

export const PipelineChart = () => {
  return (
    <div className="rounded-lg border bg-card p-6 animate-fade-in">
      <div className="mb-6">
        <h3 className="text-lg font-semibold">Sales Pipeline</h3>
        <p className="text-sm text-muted-foreground">Distribution of deals by stage</p>
      </div>
      
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
            outerRadius={100}
            fill="#8884d8"
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip 
            contentStyle={{
              backgroundColor: "hsl(var(--card))",
              border: "1px solid hsl(var(--border))",
              borderRadius: "8px",
            }}
          />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};
