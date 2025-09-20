import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Recycle } from 'lucide-react';

export function FuelsIntroduction() {
  return (
    <Alert className="mb-6">
      <Recycle className="h-4 w-4" />
      <AlertTitle>Alternative Fuel Maximization</AlertTitle>
      <AlertDescription>
        <p className="mb-2">
          This AI-powered tool helps maximize the usage of sustainable alternative fuels while maintaining 
          optimal thermal efficiency and meeting environmental regulations. It models different fuel 
          combinations to find the best balance between cost, performance, and sustainability.
        </p>
        <p>
          Benefits include:
        </p>
        <ul className="list-disc list-inside mt-2 space-y-1">
          <li>Increased alternative fuel substitution rate</li>
          <li>Reduced CO₂ emissions and fossil fuel dependency</li>
          <li>Lower fuel costs through optimal fuel mix</li>
          <li>Compliance with environmental regulations</li>
        </ul>
      </AlertDescription>
    </Alert>
  );
}