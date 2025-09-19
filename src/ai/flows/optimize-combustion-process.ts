// src/ai/flows/optimize-combustion-process.ts
'use server';

/**
 * @fileOverview Optimizes the combustion process in clinkerization by adjusting controls based on real-time data.
 *
 * - optimizeCombustionProcess - A function that handles the combustion process optimization.
 * - OptimizeCombustionProcessInput - The input type for the optimizeCombustionProcess function.
 * - OptimizeCombustionProcessOutput - The return type for the optimizeCombustionProcess function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'zod';

const OptimizeCombustionProcessInputSchema = z.object({
  realTimeData: z
    .string()
    .describe('Real-time sensor data from the clinkerization process.'),
  plantConditions: z.string().describe('Description of current plant conditions.'),
});
export type OptimizeCombustionProcessInput = z.infer<
  typeof OptimizeCombustionProcessInputSchema
>;

const OptimizeCombustionProcessOutputSchema = z.object({
  controlAdjustments: z
    .string()
    .describe(
      'Recommended adjustments to combustion controls to optimize energy use and reduce environmental impact.'
    ),
  energyDemandReduction: z
    .string()
    .describe('Estimated reduction in energy demand as a result of the adjustments.'),
  environmentalImpactReduction: z
    .string()
    .describe(
      'Estimated reduction in environmental impact as a result of the adjustments.'
    ),
});
export type OptimizeCombustionProcessOutput = z.infer<
  typeof OptimizeCombustionProcessOutputSchema
>;

export async function optimizeCombustionProcess(
  input: OptimizeCombustionProcessInput
): Promise<OptimizeCombustionProcessOutput> {
  return optimizeCombustionProcessFlow(input);
}

const prompt = ai.definePrompt({
  name: 'optimizeCombustionProcessPrompt',
  input: {schema: OptimizeCombustionProcessInputSchema},
  output: {schema: OptimizeCombustionProcessOutputSchema},
  prompt: `You are an expert in cement plant clinkerization process optimization.

  Based on the real-time sensor data and plant conditions, provide specific adjustments to combustion controls to lower energy demand and reduce environmental impact.

  Real-time Data: {{{realTimeData}}}
  Plant Conditions: {{{plantConditions}}}

  Ensure your recommendations are clear and actionable.

  Format your response as follows:

  Control Adjustments: [Specific control adjustments]
  Energy Demand Reduction: [Estimated energy demand reduction]
  Environmental Impact Reduction: [Estimated environmental impact reduction]`,
});

const optimizeCombustionProcessFlow = ai.defineFlow(
  {
    name: 'optimizeCombustionProcessFlow',
    inputSchema: OptimizeCombustionProcessInputSchema,
    outputSchema: OptimizeCombustionProcessOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
