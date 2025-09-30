import { DashboardLayout } from "@/components/Layout/DashboardLayout";
import { AIPredictor } from "@/components/Dashboard/AIPredictor";
import { KPICard } from "@/components/Dashboard/KPICard";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { 
  Brain, 
  Cpu, 
  Zap, 
  TrendingUp, 
  Bot, 
  Sparkles, 
  Activity, 
  Target,
  MessageSquare,
  Database,
  Network,
  BarChart3,
  RefreshCw
} from "lucide-react";
import { useState } from "react";

const AIInsights = () => {
  const { toast } = useToast();
  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleDemoRefresh = async () => {
    setIsRefreshing(true);
    
    // Simulate AI startup data refresh
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsRefreshing(false);
    toast({
      title: "AI Startup Demo Data Refreshed",
      description: "AI models, performance metrics, and startup analytics have been updated with new sample data.",
    });
  };
  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2 bg-gradient-to-r from-purple-400 via-blue-400 to-cyan-400 bg-clip-text text-transparent">
              SmartDash AI Studio
            </h1>
            <p className="text-muted-foreground">
              Next-generation AI platform for intelligent business automation
            </p>
          </div>
          <Button
            onClick={handleDemoRefresh}
            disabled={isRefreshing}
            variant="outline"
            className="bg-gradient-to-r from-purple-500/10 to-blue-500/10 border-purple-500/20 text-purple-400 hover:from-purple-500/20 hover:to-blue-500/20"
          >
            {isRefreshing ? (
              <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
            ) : (
              <Brain className="h-4 w-4 mr-2" />
            )}
            {isRefreshing ? "Refreshing..." : "AI Startup Demo"}
          </Button>
        </div>

        {/* AI Performance KPIs */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <KPICard
            title="AI Models Active"
            value="24"
            change="+6"
            icon={Brain}
            changeType="positive"
          />
          <KPICard
            title="Processing Power"
            value="847 TFLOPS"
            change="+12.3%"
            icon={Cpu}
            changeType="positive"
          />
          <KPICard
            title="Accuracy Rate"
            value="98.7%"
            change="+0.8%"
            icon={Target}
            changeType="positive"
          />
          <KPICard
            title="API Requests"
            value="2.4M"
            change="+18.5%"
            icon={Activity}
            changeType="positive"
          />
        </div>

        {/* AI Predictions Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <AIPredictor currentValue={142500} metric="Revenue" />
          <AIPredictor currentValue={8234} metric="Users" />
        </div>

        {/* AI Features Showcase */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Chatbot Analytics */}
          <div className="p-6 rounded-lg border bg-gradient-to-br from-blue-500/10 to-cyan-500/10 border-blue-500/20">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 rounded-lg bg-blue-500/20">
                <MessageSquare className="h-5 w-5 text-blue-400" />
              </div>
              <div>
                <h3 className="font-semibold">AI Chatbot</h3>
                <p className="text-sm text-muted-foreground">Conversation analytics</p>
              </div>
            </div>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm">Active Conversations</span>
                <span className="font-semibold">1,247</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Resolution Rate</span>
                <span className="font-semibold text-success">94.2%</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Avg Response Time</span>
                <span className="font-semibold">0.8s</span>
              </div>
            </div>
          </div>

          {/* ML Pipeline */}
          <div className="p-6 rounded-lg border bg-gradient-to-br from-purple-500/10 to-pink-500/10 border-purple-500/20">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 rounded-lg bg-purple-500/20">
                <Network className="h-5 w-5 text-purple-400" />
              </div>
              <div>
                <h3 className="font-semibold">ML Pipeline</h3>
                <p className="text-sm text-muted-foreground">Model training status</p>
              </div>
            </div>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm">Models Training</span>
                <span className="font-semibold">3</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Data Processed</span>
                <span className="font-semibold">847GB</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Training Progress</span>
                <span className="font-semibold text-warning">67%</span>
              </div>
            </div>
          </div>

          {/* Data Intelligence */}
          <div className="p-6 rounded-lg border bg-gradient-to-br from-green-500/10 to-emerald-500/10 border-green-500/20">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 rounded-lg bg-green-500/20">
                <Database className="h-5 w-5 text-green-400" />
              </div>
              <div>
                <h3 className="font-semibold">Data Intelligence</h3>
                <p className="text-sm text-muted-foreground">Real-time insights</p>
              </div>
            </div>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm">Data Sources</span>
                <span className="font-semibold">12</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Insights Generated</span>
                <span className="font-semibold">2,847</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Anomalies Detected</span>
                <span className="font-semibold text-destructive">3</span>
              </div>
            </div>
          </div>
        </div>

        {/* AI Performance Chart */}
        <div className="p-6 rounded-lg border bg-gradient-to-br from-slate-900/50 to-slate-800/50 border-slate-700">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 rounded-lg bg-gradient-to-r from-purple-500/20 to-blue-500/20">
              <BarChart3 className="h-5 w-5 text-purple-400" />
            </div>
            <div>
              <h3 className="font-semibold text-white">AI Performance Metrics</h3>
              <p className="text-sm text-slate-400">Real-time model performance tracking</p>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-400 mb-1">99.2%</div>
              <div className="text-sm text-slate-400">Model Accuracy</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-400 mb-1">0.3ms</div>
              <div className="text-sm text-slate-400">Inference Time</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-cyan-400 mb-1">847K</div>
              <div className="text-sm text-slate-400">Predictions/Hour</div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default AIInsights;
