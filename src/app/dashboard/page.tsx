'use client';
import { useActionState } from 'react';
import { useEffect } from 'react';
import { runCementPlantGpt, type ActionState } from '@/app/lib/actions';
import { PageHeader } from '@/components/dashboard/page-header';
import { SubmitButton } from '@/components/submit-button';
import { AlertCircle, BotMessageSquare, Lightbulb } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
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
          <div className="grid gap-4 md:grid-cols-3">
            <div className="space-y-2">
              <Label htmlFor="plantData">Real-time Plant Data</Label>
              <Textarea id="plantData" name="plantData" rows={5} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="historicalData">Historical Data</Label>
              <Textarea id="historicalData" name="historicalData" rows={5} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="kpiData">KPI Data</Label>
              <Textarea id="kpiData" name="kpiData" rows={5} />
            </div>
          </div>
          <SubmitButton>Generate AI Report</SubmitButton>
        </form>

        {state.data && (
          <div className="grid gap-6 md:grid-cols-1 lg:grid-cols-3">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">AI Summary</CardTitle>
                <BotMessageSquare className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">{state.data.summary}</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Anomalies Detected</CardTitle>
                <AlertCircle className="h-4 w-4 text-destructive" />
              </CardHeader>
              <CardContent>
                 <p className="text-sm text-muted-foreground">{state.data.anomalies}</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">AI Recommendations</CardTitle>
                <Lightbulb className="h-4 w-4 text-yellow-500" />
              </CardHeader>
              <CardContent>
                 <p className="text-sm text-muted-foreground">{state.data.recommendations}</p>
              </CardContent>
            </Card>
          </div>
        )}

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
