'use client';
import { useFormState } from 'react-dom';
import { useEffect } from 'react';
import { runFuelMaximization, type ActionState } from '@/app/lib/actions';
import { PageHeader } from '@/components/dashboard/page-header';
import { SubmitButton } from '@/components/submit-button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { Skeleton } from '@/components/ui/skeleton';
import { Badge } from '@/components/ui/badge';
import { DollarSign, Droplets, Zap } from 'lucide-react';

const MOCK_INPUT = {
    plantParameters: "Plant capacity: 3.0 MTPA. Current fuel: 80% coal, 20% petcoke. Available alternative fuels: RDF (Calorific Value: 3500 kcal/kg), biomass (CV: 3000 kcal/kg), shredded tires (CV: 7000 kcal/kg).",
    environmentalRegulations: "Target CO2 emission: &lt; 0.8 tCO2/t clinker. NOx limits: 400 mg/Nm3. Local regulations on chlorine content in RDF.",
    costConstraints: "Coal cost: $100/ton. Petcoke cost: $120/ton. RDF cost: $30/ton (including handling). Biomass is carbon-neutral.",
};

export default function FuelsPage() {
  const [state, formAction] = useFormState<ActionState, FormData>(runFuelMaximization, { message: '' });
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
        title="Alternative Fuel Maximization"
        description="Model diverse fuel combinations, optimize thermal substitution rates, and reduce reliance on fossil fuels."
      />
      <div className="grid gap-8 lg:grid-cols-5">
        <form action={formAction} className="space-y-4 lg:col-span-2">
          <div className="space-y-2">
            <Label htmlFor="plantParameters">Plant &amp; Fuel Parameters</Label>
            <Textarea id="plantParameters" name="plantParameters" rows={5} defaultValue={MOCK_INPUT.plantParameters} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="environmentalRegulations">Environmental Regulations</Label>
            <Textarea id="environmentalRegulations" name="environmentalRegulations" rows={4} defaultValue={MOCK_INPUT.environmentalRegulations} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="costConstraints">Cost Constraints</Label>
            <Textarea id="costConstraints" name="costConstraints" rows={4} defaultValue={MOCK_INPUT.costConstraints} />
          </div>
          <SubmitButton>Optimize Fuel Mix</SubmitButton>
        </form>

        <div className="lg:col-span-3">
          <Card>
            <CardHeader>
              <CardTitle>AI-Powered Fuel Optimization</CardTitle>
              <CardDescription>Recommendations for maximizing alternative fuel usage.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
                {!state.data ? (
                    <div className="space-y-6">
                        <Skeleton className="h-20 w-full" />
                        <div className="grid grid-cols-3 gap-4">
                            <Skeleton className="h-24 w-full" />
                            <Skeleton className="h-24 w-full" />
                            <Skeleton className="h-24 w-full" />
                        </div>
                        <Skeleton className="h-16 w-full" />
                    </div>
                ) : (
                    <>
                        <div>
                            <h3 className="font-semibold">Recommended Fuel Combination</h3>
                            <p className="text-sm text-muted-foreground mt-1">{state.data.fuelCombinationRecommendation}</p>
                        </div>
                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                            <Card>
                                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                    <CardTitle className="text-sm font-medium">Energy Efficiency</CardTitle>
                                    <Zap className="h-4 w-4 text-muted-foreground" />
                                </CardHeader>
                                <CardContent>
                                    <Badge variant="secondary" className="bg-accent text-accent-foreground">{state.data.energyEfficiencyImprovement}</Badge>
                                </CardContent>
                            </Card>
                            <Card>
                                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                    <CardTitle className="text-sm font-medium">Emission Reduction</CardTitle>
                                    <Droplets className="h-4 w-4 text-muted-foreground" />
                                </CardHeader>
                                <CardContent>
                                     <Badge variant="secondary">{state.data.emissionReductionEstimate}</Badge>
                                </CardContent>
                            </Card>
                             <Card>
                                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                    <CardTitle className="text-sm font-medium">Cost Analysis</CardTitle>
                                    <DollarSign className="h-4 w-4 text-muted-foreground" />
                                </CardHeader>
                                <CardContent>
                                     <p className="text-xs text-muted-foreground">{state.data.costAnalysis}</p>
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
