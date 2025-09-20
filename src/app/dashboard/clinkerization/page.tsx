'use client';
import { useActionState } from 'react';
import { useEffect } from 'react';
import { runClinkerizationBalancing, type ActionState } from '@/app/lib/actions';
import { PageHeader } from '@/components/dashboard/page-header';
import { SubmitButton } from '@/components/submit-button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { Skeleton } from '@/components/ui/skeleton';
import { Gauge, Leaf, Zap } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { ClinkerizationIntroduction } from '@/components/clinkerization-introduction';

export default function ClinkerizationPage() {
  const [state, formAction] = useActionState<ActionState, FormData>(runClinkerizationBalancing, { message: '' });
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
        title="Clinkerization Parameter Balancing"
        description="Continuously monitor high-temperature operations, adjusting controls to lower energy demand while reducing environmental impact."
      />
      <ClinkerizationIntroduction />
      <div className="grid gap-8 lg:grid-cols-5">
        <form action={formAction} className="space-y-4 lg:col-span-2">
          <Card>
            <CardHeader>
                <CardTitle>Real-time Clinkerization Data</CardTitle>
                <CardDescription>Enter the current operational parameters.</CardDescription>
            </CardHeader>
            <CardContent className="grid gap-4">
                <div className="space-y-2">
                    <Label htmlFor="preheater_temp">Preheater Temp (°C)</Label>
                    <Input id="preheater_temp" name="preheater_temp" type="number" defaultValue="900" />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="kiln_speed">Kiln Speed (rpm)</Label>
                    <Input id="kiln_speed" name="kiln_speed" type="number" step="0.1" defaultValue="4.5" />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="fuel_flow_rate">Fuel Flow Rate (ton/hr)</Label>
                    <Input id="fuel_flow_rate" name="fuel_flow_rate" type="number" defaultValue="12" />
                </div>
            </CardContent>
          </Card>
          <SubmitButton>Optimize Combustion</SubmitButton>
        </form>

        <div className="lg:col-span-3">
          <Card>
            <CardHeader>
              <CardTitle>AI-Powered Optimization Results</CardTitle>
              <CardDescription>Recommendations for combustion process control adjustments.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
                {!state.data ? (
                    <div className="space-y-4">
                        <Skeleton className="h-6 w-1/4" />
                        <Skeleton className="h-4 w-full" />
                        <Skeleton className="h-4 w-4/5" />
                        <div className="grid grid-cols-2 gap-4 pt-4">
                          <Skeleton className="h-24 w-full" />
                          <Skeleton className="h-24 w-full" />
                        </div>
                    </div>
                ) : (
                    <>
                        <div>
                            <h3 className="font-semibold flex items-center gap-2"><Gauge className="text-primary"/> Control Adjustments</h3>
                            <p className="text-sm text-muted-foreground mt-1">{state.data.controlAdjustments}</p>
                        </div>
                         <div className="grid grid-cols-2 gap-4">
                            <Card>
                                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                    <CardTitle className="text-sm font-medium">Energy Demand Reduction</CardTitle>
                                    <Zap className="h-4 w-4 text-muted-foreground" />
                                </CardHeader>
                                <CardContent>
                                    <div className="text-2xl font-bold text-primary">{state.data.energyDemandReduction}</div>
                                </CardContent>
                            </Card>
                            <Card>
                                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                    <CardTitle className="text-sm font-medium">Environmental Impact</CardTitle>
                                    <Leaf className="h-4 w-4 text-muted-foreground" />
                                </CardHeader>
                                <CardContent>
                                    <div className="text-2xl font-bold text-accent-foreground">{state.data.environmentalImpactReduction}</div>
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
