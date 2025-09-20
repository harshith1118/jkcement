import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Lightbulb } from 'lucide-react';

export function AIIntroduction() {
  return (
    <Alert className="mb-6">
      <Lightbulb className="h-4 w-4" />
      <AlertTitle>AI-Powered Cement Plant Operations</AlertTitle>
      <AlertDescription>
        This dashboard provides plant-wide insights using Generative AI to optimize operations across 
        raw materials, clinkerization, quality control, alternative fuels, and utilities. Use the 
        navigation menu to explore specific optimization areas.
      </AlertDescription>
    </Alert>
  );
}