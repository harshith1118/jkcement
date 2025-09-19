'use client';
import { useActionState } from 'react';
import { useEffect } from 'react';
import { runUtilitiesOptimization, type ActionState } from '@/app/lib/actions';
import { PageHeader } from '@/components/dashboard/page-header';
import { SubmitButton } from '@/components/submit-button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { Skeleton } from '@/components/ui/skeleton';
import { DollarSign, Truck, Zap } from 'lucide-react';

export default function UtilitiesPage() {
  const [state, formAction] = useActionState<ActionState, FormData>(runUtilitiesOptimization, { message: '' });
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
        title="Plant Utilities &amp; Material Handling"
        description="Predict and minimize energy consumption in utilities and optimize internal logistics flows."
      />
      <div className="grid gap-8 lg:grid-cols-5">
        <form action={formAction} className="space-y-4 lg:col-span-2">
          <div className="space-y-2">
            <Label htmlFor="historicalData">Historical Utilities &amp; Logistics Data</Label>
            <Textarea id="historicalData" name="historicalData" rows={6} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="currentConditions">Current Operational Conditions</Label>
            <Textarea id="currentConditions" name="currentConditions" rows={5} />
          </div>
          <SubmitButton>Optimize Utilities &amp; Handling</SubmitButton>
        </form>

        <div className="lg:col-span-3">
          <Card>
            <CardHeader>
              <CardTitle>AI-Powered Optimization Results</CardTitle>
              <CardDescription>Suggestions for energy and logistics flow improvements.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
                {!state.data ? (
                    <div className="space-y-6">
                        <Skeleton className="h-20 w-full" />
                        <Skeleton className="h-20 w-full" />
                        <div className="grid grid-cols-2 gap-4">
                            <Skeleton className="h-24 w-full" />
                            <Skeleton className="h-24 w-full" />
                        </div>
                    </div>
                ) : (
                    <>
                        <div>
                            <h3 className="font-semibold flex items-center gap-2"><Zap className="text-primary"/> Energy Optimization Suggestions</h3>
                            <p className="text-sm text-muted-foreground mt-1">{state.data.energyOptimizationSuggestions}</p>
                        </div>
                         <div>
                            <h3 className="font-semibold flex items-center gap-2"><Truck className="text-primary"/> Logistics Optimization Suggestions</h3>
                            <p className="text-sm text-muted-foreground mt-1">{state.data.logisticsOptimizationSuggestions}</p>
                        </div>
                         <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                            <Card>
                                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                    <CardTitle className="text-sm font-medium">Predicted Energy Savings</CardTitle>
                                    <Zap className="h-4 w-4 text-muted-foreground" />
                                </CardHeader>
                                <CardContent>
                                    <div className="text-2xl font-bold text-primary">{state.data.predictedEnergySavings}</div>
                                </CardContent>
                            </Card>
                            <Card>
                                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                    <CardTitle className="text-sm font-medium">Predicted Cost Reduction</CardTitle>
                                    <DollarSign className="h-4 w-4 text-muted-foreground" />
                                </CardHeader>
                                <CardContent>
                                    <div className="text-2xl font-bold text-primary">{state.data.predictedCostReduction}</div>
                                </CardContent>
                            </Card>
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
