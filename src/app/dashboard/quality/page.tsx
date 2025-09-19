'use client';
import { useActionState } from 'react';
import { useEffect } from 'react';
import { runQualityCorrections, type ActionState } from '@/app/lib/actions';
import { PageHeader } from '@/components/dashboard/page-header';
import { SubmitButton } from '@/components/submit-button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { Skeleton } from '@/components/ui/skeleton';
import { CheckCircle2, FlaskConical, GitBranch } from 'lucide-react';

const MOCK_INPUT = {
    feedData: "Real-time feed analysis: LSF=99.2, SM=2.3, AM=1.6. Kiln feed moisture is fluctuating between 0.7% and 1.1%.",
    historicalData: "Past incidents show that LSF above 99.0 correlates with lower 28-day strength in cement. Feed moisture swings have caused unstable kiln operations.",
    qualityTargets: JSON.stringify({ "target_c3s": "66%", "target_liteness": "90", "28-day_strength_Mpa": "53" }, null, 2),
};

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
          <div className="space-y-2">
            <Label htmlFor="feedData">Real-time Feed Data</Label>
            <Textarea id="feedData" name="feedData" rows={5} defaultValue={MOCK_INPUT.feedData} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="historicalData">Historical Quality Data</Label>
            <Textarea id="historicalData" name="historicalData" rows={5} defaultValue={MOCK_INPUT.historicalData} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="qualityTargets">Product Quality Targets</Label>
            <Textarea id="qualityTargets" name="qualityTargets" rows={4} defaultValue={MOCK_INPUT.qualityTargets} />
          </div>
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
