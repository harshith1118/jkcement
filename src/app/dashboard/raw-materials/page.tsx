'use client';
import { useActionState } from 'react';
import { useEffect } from 'react';
import { runRawMaterialOptimization, type ActionState } from '@/app/lib/actions';
import { PageHeader } from '@/components/dashboard/page-header';
import { SubmitButton } from '@/components/submit-button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { Skeleton } from '@/components/ui/skeleton';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid } from 'recharts';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';

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
            <Card>
                <CardHeader>
                    <CardTitle>Current Raw Material Blend</CardTitle>
                    <CardDescription>Enter the percentages for each component.</CardDescription>
                </CardHeader>
                <CardContent className="grid gap-4">
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="limestone">Limestone (%)</Label>
                            <Input id="limestone" name="limestone" type="number" defaultValue="70" />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="clay">Clay (%)</Label>
                            <Input id="clay" name="clay" type="number" defaultValue="20" />
                        </div>
                    </div>
                     <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="iron_ore">Iron Ore (%)</Label>
                            <Input id="iron_ore" name="iron_ore" type="number" defaultValue="5" />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="bauxite">Bauxite (%)</Label>
                            <Input id="bauxite" name="bauxite" type="number" defaultValue="5" />
                        </div>
                    </div>
                </CardContent>
            </Card>
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
