'use client';
import { useActionState } from 'react';
import { useEffect } from 'react';
import { runQualityCorrections, type ActionState } from '@/app/lib/actions';
import { PageHeader } from '@/components/dashboard/page-header';
import { SubmitButton } from '@/components/submit-button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { Skeleton } from '@/components/ui/skeleton';
import { CheckCircle2, FlaskConical } from 'lucide-react';
import { Input } from '@/components/ui/input';

export default function QualityPage() {
  const [state, formAction] = useActionState<ActionState, FormData>(runQualityCorrections, { message: '' });
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
        title="Quality Consistency Assurance"
        description="Use Generative AI to detect fluctuations in inputs and provide proactive quality corrections."
      />
      <div className="grid gap-8 lg:grid-cols-5">
        <form action={formAction} className="space-y-4 lg:col-span-2">
            <Card>
                <CardHeader>
                    <CardTitle>Real-time Feed Data</CardTitle>
                    <CardDescription>Enter the current quality parameters.</CardDescription>
                </CardHeader>
                <CardContent className="grid gap-4">
                    <div className="space-y-2">
                        <Label htmlFor="raw_meal_lsf">Raw Meal LSF</Label>
                        <Input id="raw_meal_lsf" name="raw_meal_lsf" type="number" defaultValue="98" />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="silica_modulus">Silica Modulus</Label>
                        <Input id="silica_modulus" name="silica_modulus" type="number" step="0.1" defaultValue="2.6" />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="alumina_modulus">Alumina Modulus</Label>
                        <Input id="alumina_modulus" name="alumina_modulus" type="number" step="0.1" defaultValue="1.5" />
                    </div>
                </CardContent>
            </Card>
          <SubmitButton>Analyze and Suggest Corrections</SubmitButton>
        </form>

        <div className="lg:col-span-3">
          <Card>
            <CardHeader>
              <CardTitle>Proactive Quality Correction Results</CardTitle>
              <CardDescription>Analysis and suggestions from the generative AI model.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
                {!state.data ? (
                    <div className="space-y-6">
                        <div>
                          <Skeleton className="h-6 w-1/4 mb-2" />
                          <Skeleton className="h-16 w-full" />
                        </div>
                        <div>
                          <Skeleton className="h-6 w-1/3 mb-2" />
                          <Skeleton className="h-16 w-full" />
                        </div>
                    </div>
                ) : (
                    <>
                        <div>
                            <h3 className="font-semibold flex items-center gap-2"><FlaskConical className="text-primary"/> Fluctuation Analysis</h3>
                            <p className="text-sm text-muted-foreground mt-1">{state.data.analysis}</p>
                        </div>
                        <div>
                            <h3 className="font-semibold flex items-center gap-2"><CheckCircle2 className="text-accent-foreground"/> Suggested Proactive Corrections</h3>
                            <p className="text-sm text-muted-foreground mt-1">{state.data.suggestedCorrections}</p>
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
