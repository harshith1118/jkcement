'use client';
import { useActionState, useEffect, useState } from 'react';
import { runFuelMaximization, type ActionState } from '@/app/lib/actions';
import { PageHeader } from '@/components/dashboard/page-header';
import { SubmitButton } from '@/components/submit-button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { Skeleton } from '@/components/ui/skeleton';
import { Badge } from '@/components/ui/badge';
import { DollarSign, Droplets, Zap } from 'lucide-react';
import { Slider } from '@/components/ui/slider';
import { FuelsIntroduction } from '@/components/fuels-introduction';

export default function FuelsPage() {
  const [state, formAction] = useActionState<ActionState, FormData>(runFuelMaximization, { message: '' });
  const { toast } = useToast();

  const [fossilFuel, setFossilFuel] = useState(70);
  const [tires, setTires] = useState(15);
  const [biomass, setBiomass] = useState(10);
  const [industrialWaste, setIndustrialWaste] = useState(5);

  useEffect(() => {
    if (state.message && !state.data) {
      toast({
        variant: state.error ? 'destructive' : 'default',
        title: state.error ? 'Error' : 'Notification',
        description: state.message,
      });
    }
  }, [state, toast]);

  const handleSliderChange = (setter: React.Dispatch<React.SetStateAction<number>>) => ([value]: number[]) => {
    setter(value);
  }

  return (
    <>
      <PageHeader
        title="Alternative Fuel Maximization"
        description="Model diverse fuel combinations, optimize thermal substitution rates, and reduce reliance on fossil fuels."
      />
      <FuelsIntroduction />
      <div className="grid gap-8 lg:grid-cols-5">
        <form action={formAction} className="space-y-4 lg:col-span-2">
            <Card>
                <CardHeader>
                    <CardTitle>Fuel Mix Composition</CardTitle>
                    <CardDescription>Adjust the sliders to set the fuel mixture. The total must be 100%.</CardDescription>
                </CardHeader>
                <CardContent className="grid gap-4">
                    <div className="space-y-2">
                        <Label htmlFor="fossilFuelPercentage">Petcoke ({fossilFuel}%)</Label>
                        <Slider name="fossilFuelPercentage" defaultValue={[fossilFuel]} max={100} step={1} onValueChange={handleSliderChange(setFossilFuel)} />
                        <input type="hidden" name="fossilFuelPercentage" value={fossilFuel} />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="tiresPercentage">Tires ({tires}%)</Label>
                        <Slider name="tiresPercentage" defaultValue={[tires]} max={100} step={1} onValueChange={handleSliderChange(setTires)} />
                        <input type="hidden" name="tiresPercentage" value={tires} />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="biomassPercentage">Biomass ({biomass}%)</Label>
                        <Slider name="biomassPercentage" defaultValue={[biomass]} max={100} step={1} onValueChange={handleSliderChange(setBiomass)} />
                        <input type="hidden" name="biomassPercentage" value={biomass} />
                    </div>
                     <div className="space-y-2">
                        <Label htmlFor="industrialWastePercentage">Industrial Waste ({industrialWaste}%)</Label>
                        <Slider name="industrialWastePercentage" defaultValue={[industrialWaste]} max={100} step={1} onValueChange={handleSliderChange(setIndustrialWaste)} />
                        <input type="hidden" name="industrialWastePercentage" value={industrialWaste} />
                    </div>
                </CardContent>
            </Card>
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
