import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Zap } from 'lucide-react';

export function UtilitiesIntroduction() {
  return (
    <Alert className="mb-6">
      <Zap className="h-4 w-4" />
      <AlertTitle>Plant Utilities & Material Handling Optimization</AlertTitle>
      <AlertDescription>
        <p className="mb-2">
          This AI-powered tool identifies opportunities to reduce energy consumption in plant utilities 
          (compressors, fans, pumps) and optimizes material handling systems for improved efficiency. 
          It analyzes historical patterns and current conditions to recommend operational improvements.
        </p>
        <p>
          Benefits include:
        </p>
        <ul className="list-disc list-inside mt-2 space-y-1">
          <li>Reduced electricity consumption in utility systems</li>
          <li>Optimized conveyor and transport system operations</li>
          <li>Improved load balancing across utility equipment</li>
          <li>Lower operational costs through efficient resource usage</li>
        </ul>
      </AlertDescription>
    </Alert>
  );
}