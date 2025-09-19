'use client';
import { useActionState } from 'react';
import { useEffect } from 'react';
import { runRawMaterialOptimization, type ActionState } from '@/app/lib/actions';
import { PageHeader } from '@/components/dashboard/page-header';
import { SubmitButton } from '@/components/submit-button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { Skeleton } from '@/components/ui/skeleton';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid } from 'recharts';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';

const MOCK_INPUT = {
    feedData: "Real-time feed analysis: LSF=98.5, SM=2.4, AM=1.5. Moisture content at 0.8%.",
    currentBlend: JSON.stringify({ "limestone": "78%", "clay": "18%", "iron_ore": "3%", "bauxite": "1%" }, null, 2),
    historicalData: "Historical data shows clinker C3S content drops when LSF exceeds 99.0. High clay moisture content has previously led to mill blockages.",
};

const chartConfig = {
  value: { label: 'Value', color: 'hsl(var(--chart-1))' },
};

export default function RawMaterialsPage() {
  const [state, formAction] = useActionState<ActionState, FormData>(runRawMaterialOptimization, { message: '' });
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

  const optimizedBlendData = state.data?.optimizedBlend ? Object.entries(JSON.parse(state.data.optimizedBlend)).map(([name, value]) => ({ name, value: parseFloat(String(value)) })) : [];

  return (
    <>
      <PageHeader
        title="Raw Material & Grinding Optimization"
        description="Ingest real-time feed data to predict variability, fine-tune grinding efficiency, and minimize energy losses."
      />
      <div className="grid gap-8 lg:grid-cols-5">
        <form action={formAction} className="space-y-4 lg:col-span-2">
          <div className="space-y-2">
            <Label htmlFor="feedData">Real-time Feed Data</Label>
            <Textarea id="feedData" name="feedData" rows={4} defaultValue={MOCK_INPUT.feedData} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="currentBlend">Current Raw Material Blend</Label>
            <Textarea id="currentBlend" name="currentBlend" rows={5} defaultValue={MOCK_INPUT.currentBlend} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="historicalData">Historical Performance Data</Label>
            <Textarea id="historicalData" name="historicalData" rows={4} defaultValue={MOCK_INPUT.historicalData} />
          </div>
          <SubmitButton>Optimize Blend</SubmitButton>
        </form>

        <div className="lg:col-span-3">
          <Card>
            <CardHeader>
              <CardTitle>AI-Powered Optimization Results</CardTitle>
              <CardDescription>Recommendations from the generative AI model.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
                {!state.data ? (
                    <div className="space-y-4">
                        <Skeleton className="h-6 w-1/4" />
                        <Skeleton className="h-4 w-full" />
                        <Skeleton className="h-4 w-4/5" />
                         <Skeleton className="h-52 w-full" />
                    </div>
                ) : (
                    <>
                        <div>
                            <h3 className="font-semibold">Reasoning</h3>
                            <p className="text-sm text-muted-foreground">{state.data.reasoning}</p>
                        </div>
                         <div className="grid grid-cols-2 gap-4">
                            <Card>
                                <CardHeader className="pb-2">
                                    <CardTitle className="text-lg">Energy Savings</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-2xl font-bold text-primary">{state.data.predictedEnergySavings} <span className="text-sm font-normal">kWh/ton</span></p>
                                </CardContent>
                            </Card>
                            <Card>
                                <CardHeader className="pb-2">
                                    <CardTitle className="text-lg">Quality Improvement</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-sm text-muted-foreground">{state.data.predictedQualityImprovement}</p>
                                </CardContent>
                            </Card>
                         </div>
                         <div>
                            <h3 className="font-semibold">Optimized Blend Composition</h3>
                            <ChartContainer config={chartConfig} className="h-[250px] w-full mt-2">
                                <BarChart accessibilityLayer data={optimizedBlendData}>
                                    <CartesianGrid vertical={false} />
                                    <XAxis dataKey="name" tickLine={false} tickMargin={10} axisLine={false} />
                                    <YAxis unit="%" />
                                    <ChartTooltip content={<ChartTooltipContent />} />
                                    <Bar dataKey="value" fill="var(--color-value)" radius={4} />
                                </BarChart>
                            </ChartContainer>
                        </div>
                    </>
                )}
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
}
