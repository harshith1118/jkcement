import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Flame } from 'lucide-react';

export function ClinkerizationIntroduction() {
  return (
    <Alert className="mb-6">
      <Flame className="h-4 w-4" />
      <AlertTitle>Clinkerization Parameter Balancing</AlertTitle>
      <AlertDescription>
        <p className="mb-2">
          This AI-powered tool continuously monitors high-temperature operations in the kiln system and 
          provides real-time recommendations for adjusting control parameters to optimize combustion 
          efficiency while reducing environmental impact.
        </p>
        <p>
          Benefits include:
        </p>
        <ul className="list-disc list-inside mt-2 space-y-1">
          <li>Reduced energy demand through optimized kiln operations</li>
          <li>Lower CO₂ and NOx emissions</li>
          <li>Improved clinker quality consistency</li>
          <li>Extended refractory life through better temperature control</li>
        </ul>
      </AlertDescription>
    </Alert>
  );
}