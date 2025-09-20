import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Lightbulb } from 'lucide-react';

export function RawMaterialsIntroduction() {
  return (
    <Alert className="mb-6">
      <Lightbulb className="h-4 w-4" />
      <AlertTitle>Raw Material & Grinding Optimization</AlertTitle>
      <AlertDescription>
        <p className="mb-2">
          This AI-powered tool helps optimize your raw material blend to achieve better energy efficiency 
          and product quality. By analyzing real-time feed data and historical performance, the AI 
          recommends the optimal composition of limestone, clay, iron ore, and bauxite.
        </p>
        <p>
          Benefits include:
        </p>
        <ul className="list-disc list-inside mt-2 space-y-1">
          <li>Reduced energy consumption in grinding processes</li>
          <li>Improved homogeneity of raw meal</li>
          <li>Enhanced clinker quality and performance</li>
          <li>Lower production costs through optimized material usage</li>
        </ul>
      </AlertDescription>
    </Alert>
  );
}