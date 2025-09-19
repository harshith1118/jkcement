'use client';
import { useActionState } from 'react';
import { useEffect } from 'react';
import { runCementPlantGpt, type ActionState } from '@/app/lib/actions';
import { PageHeader } from '@/components/dashboard/page-header';
import { SubmitButton } from '@/components/submit-button';
import { AlertCircle, BotMessageSquare, Lightbulb, TrendingUp } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { Skeleton } from '@/components/ui/skeleton';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

export default function DashboardPage() {
  const [state, formAction] = useActionState<ActionState, FormData>(runCementPlantGpt, { message: '' });
  const { toast } = useToast();

  useEffect(() => {
    if (state.message && !state.data) {
      toast({
        variant: state.error ? 'destructive' : 'default',
        title: state.error ? 'Error' : 'Notification',
        description: state.message,
      });
    }
  }, [state, toast]);

  return (
    <>
      <PageHeader
        title="AI-Powered Dashboard"
        description="Autonomous plant operations and cross-process optimization at your fingertips."
      />
      <div className="grid gap-8 lg:grid-cols-5">
        <form action={formAction} className="space-y-4 lg:col-span-2">
           <Card>
            <CardHeader>
                <CardTitle>Plant Operations Data</CardTitle>
                <CardDescription>Provide the AI with data to generate insights. You can use the default examples or input your own.</CardDescription>
            </CardHeader>
            <CardContent className="grid gap-4">
                 <div className="space-y-2">
                  <Label htmlFor="plantData">Real-time Plant Data</Label>
                  <Textarea id="plantData" name="plantData" rows={5} defaultValue='{ "kiln_temperature": 1455, "cooler_pressure": 5.2, "raw_mill_power": 3500 }' />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="historicalData">Historical Data</Label>
                  <Textarea id="historicalData" name="historicalData" rows={5} defaultValue='{ "avg_kiln_temp_last_30d": 1450, "avg_clinker_c3s_last_90d": 65 }' />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="kpiData">KPI Data</Label>
                  <Textarea id="kpiData" name="kpiData" rows={5} defaultValue='{ "target_power_consumption": "90 kWh/ton", "current_power_consumption": "95 kWh/ton" }' />
                </div>
            </CardContent>
          </Card>
          <SubmitButton>Generate AI Report</SubmitButton>
        </form>

        <div className="lg:col-span-3">
          <Card>
            <CardHeader>
                <CardTitle>AI-Generated Report</CardTitle>
                <CardDescription>Insights and recommendations based on the data provided.</CardDescription>
            </CardHeader>
            <CardContent>
                {state.data ? (
                <div className="space-y-6">
                    <div className="space-y-2">
                        <h3 className="font-semibold flex items-center gap-2"><TrendingUp className="text-primary" /> AI Summary</h3>
                        <p className="text-sm text-muted-foreground">{state.data.summary}</p>
                    </div>
                     <div className="space-y-2">
                        <h3 className="font-semibold flex items-center gap-2 text-destructive"><AlertCircle /> Anomalies Detected</h3>
                        <p className="text-sm text-destructive/90">{state.data.anomalies}</p>
                    </div>
                     <div className="space-y-2">
                        <h3 className="font-semibold flex items-center gap-2 text-accent-foreground"><Lightbulb /> Recommendations</h3>
                        <p className="text-sm text-accent-foreground/90">{state.data.recommendations}</p>
                    </div>
                </div>
                ) : (
                <div className="space-y-6">
                     <div className="space-y-2">
                        <h3 className="font-semibold flex items-center gap-2"><BotMessageSquare className="h-5 w-5 text-muted-foreground" /> AI Summary</h3>
                        <Skeleton className="h-4 w-4/5" />
                        <Skeleton className="h-4 w-full" />
                    </div>
                     <div className="space-y-2">
                        <h3 className="font-semibold flex items-center gap-2 text-destructive"><AlertCircle /> Anomalies Detected</h3>
                        <Skeleton className="h-4 w-full" />
                        <Skeleton className="h-4 w-3/4" />
                    </div>
                     <div className="space-y-2">
                        <h3 className="font-semibold flex items-center gap-2 text-accent-foreground"><Lightbulb /> Recommendations</h3>
                        <Skeleton className="h-4 w-full" />
                        <Skeleton className="h-4 w-full" />
                    </div>
                </div>
                )}
            </CardContent>
        </Card>
        </div>
      </div>
    </>
  );
}
