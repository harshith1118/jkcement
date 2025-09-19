'use client';
import { useActionState } from 'react';
import { useEffect } from 'react';
import { runCementPlantGpt, type ActionState } from '@/app/lib/actions';
import { PageHeader } from '@/components/dashboard/page-header';
import { SubmitButton } from '@/components/submit-button';
import { AlertCircle, BotMessageSquare, Lightbulb, CheckCircle, TrendingUp } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { Bar, BarChart, CartesianGrid, XAxis, YAxis, Line, LineChart } from 'recharts';
import { useToast } from '@/hooks/use-toast';
import { Skeleton } from '@/components/ui/skeleton';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

const chartData = [
  { month: 'January', desktop: 186, mobile: 80 },
  { month: 'February', desktop: 305, mobile: 200 },
  { month: 'March', desktop: 237, mobile: 120 },
  { month: 'April', desktop: 73, mobile: 190 },
  { month: 'May', desktop: 209, mobile: 130 },
  { month: 'June', desktop: 214, mobile: 140 },
];
const chartConfig = {
  desktop: { label: 'Actual', color: 'hsl(var(--chart-1))' },
  mobile: { label: 'Target', color: 'hsl(var(--chart-2))' },
};

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
      <div className="space-y-8">
        <form action={formAction} className="space-y-4 lg:col-span-2">
          <Card>
            <CardHeader>
                <CardTitle>Plant Operations Data</CardTitle>
                <CardDescription>Provide the AI with data to generate insights. You can use the default examples or input your own.</CardDescription>
            </CardHeader>
            <CardContent className="grid gap-4 md:grid-cols-3">
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

        <Card>
            <CardHeader>
                <CardTitle>AI-Generated Report</CardTitle>
                <CardDescription>Insights and recommendations based on the data provided.</CardDescription>
            </CardHeader>
            <CardContent>
                {state.data ? (
                <div className="grid gap-6">
                    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                        <Card className="bg-secondary/50">
                            <CardHeader className="pb-4">
                                <CardTitle className="flex items-center gap-2 text-base">
                                <TrendingUp className="text-primary" />
                                Current Status
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-sm text-muted-foreground">{state.data.summary}</p>
                            </CardContent>
                        </Card>
                        <Card className="border-destructive/50 bg-destructive/5">
                             <CardHeader className="pb-4">
                                <CardTitle className="flex items-center gap-2 text-base text-destructive">
                                <AlertCircle />
                                Anomalies Detected
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-sm text-destructive/90">{state.data.anomalies}</p>
                            </CardContent>
                        </Card>
                        <Card className="border-accent/50 bg-accent/5">
                            <CardHeader className="pb-4">
                                <CardTitle className="flex items-center gap-2 text-base text-accent-foreground">
                                <Lightbulb />
                                Recommendations
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-sm text-accent-foreground/90">{state.data.recommendations}</p>
                            </CardContent>
                        </Card>
                    </div>
                </div>
                ) : (
                <div className="grid gap-6 md:grid-cols-1 lg:grid-cols-3">
                    <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Current Status</CardTitle>
                        <BotMessageSquare className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent className="space-y-2">
                        <Skeleton className="h-4 w-4/5" />
                        <Skeleton className="h-4 w-full" />
                    </CardContent>
                    </Card>
                    <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Anomalies Detected</CardTitle>
                        <AlertCircle className="h-4 w-4 text-destructive" />
                    </CardHeader>
                    <CardContent className="space-y-2">
                        <Skeleton className="h-4 w-full" />
                        <Skeleton className="h-4 w-3/4" />
                    </CardContent>
                    </Card>
                    <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">AI Recommendations</CardTitle>
                        <Lightbulb className="h-4 w-4 text-yellow-500" />
                    </CardHeader>
                    <CardContent className="space-y-2">
                        <Skeleton className="h-4 w-full" />
                        <Skeleton className="h-4 w-full" />
                    </CardContent>
                    </Card>
                </div>
                )}
            </CardContent>
        </Card>

        <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Specific Power Consumption (kWh/ton)</CardTitle>
              </CardHeader>
              <CardContent>
                <ChartContainer config={chartConfig} className="h-[250px] w-full">
                  <BarChart accessibilityLayer data={chartData}>
                    <CartesianGrid vertical={false} />
                    <XAxis dataKey="month" tickLine={false} tickMargin={10} axisLine={false} />
                     <YAxis />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Bar dataKey="desktop" fill="var(--color-desktop)" radius={4} />
                    <Bar dataKey="mobile" fill="var(--color-mobile)" radius={4} />
                  </BarChart>
                </ChartContainer>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Clinker Quality (C3S %)</CardTitle>
              </CardHeader>
              <CardContent>
                <ChartContainer config={chartConfig} className="h-[250px] w-full">
                  <LineChart accessibilityLayer data={chartData} margin={{ left: 12, right: 12 }}>
                    <CartesianGrid vertical={false} />
                    <XAxis dataKey="month" tickLine={false} axisLine={false} tickMargin={8} />
                    <YAxis />
                    <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
                    <Line dataKey="desktop" type="natural" stroke="var(--color-desktop)" strokeWidth={2} dot={false} />
                     <Line dataKey="mobile" type="natural" stroke="var(--color-mobile)" strokeWidth={2} dot={false} />
                  </LineChart>
                </ChartContainer>
              </CardContent>
            </Card>
          </div>
      </div>
    </>
  );
}
