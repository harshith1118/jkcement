import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { ShieldCheck } from 'lucide-react';

export function QualityIntroduction() {
  return (
    <Alert className="mb-6">
      <ShieldCheck className="h-4 w-4" />
      <AlertTitle>Quality Consistency Assurance</AlertTitle>
      <AlertDescription>
        <p className="mb-2">
          This AI-powered tool detects fluctuations in raw material inputs and kiln conditions that could 
          affect final product quality. It provides proactive corrections to maintain consistent cement 
          performance characteristics.
        </p>
        <p>
          Benefits include:
        </p>
        <ul className="list-disc list-inside mt-2 space-y-1">
          <li>Early detection of quality deviations before they impact product</li>
          <li>Proactive adjustments to maintain consistent 28-day strength</li>
          <li>Reduced need for corrective actions in the finish mill</li>
          <li>Improved customer satisfaction through consistent product quality</li>
        </ul>
      </AlertDescription>
    </Alert>
  );
}