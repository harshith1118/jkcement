'use client';
import { useFormState } from 'react-dom';
import { useEffect } from 'react';
import { runClinkerizationBalancing, type ActionState } from '@/app/lib/actions';
import { PageHeader } from '@/components/dashboard/page-header';
import { SubmitButton } from '@/components/submit-button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { Skeleton } from '@/components/ui/skeleton';
import { Gauge, Leaf, Zap } from 'lucide-react';

const MOCK_INPUT = {
    realTimeData: "Kiln Amps: 250A, Kiln Speed: 3.5 RPM, Fuel Flow: 12 tph, O2: 2.1%, NOx: 450 mg/Nm3",
    plantConditions: "Clinker production target is 250 tph. Ambient temperature is high at 35°C, affecting cooler fan efficiency.",
};

export default function ClinkerizationPage() {
  const [state, formAction] = useFormState<ActionState, FormData>(runClinkerizationBalancing, { message: '' });
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
      <div className="grid gap-8 lg:grid-cols-5">
        <form action={formAction} className="space-y-4 lg:col-span-2">
          <div className="space-y-2">
            <Label htmlFor="realTimeData">Real-time Clinkerization Data</Label>
            <Textarea id="realTimeData" name="realTimeData" rows={5} defaultValue={MOCK_INPUT.realTimeData} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="plantConditions">Current Plant Conditions</Label>
            <Textarea id="plantConditions" name="plantConditions" rows={5} defaultValue={MOCK_INPUT.plantConditions} />
          </div>
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
