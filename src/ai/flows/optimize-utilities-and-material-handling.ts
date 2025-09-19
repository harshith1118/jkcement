'use server';
/**
 * @fileOverview A flow for optimizing utilities and material handling in a cement plant.
 *
 * - optimizeUtilitiesAndMaterialHandling - A function that handles the optimization process.
 * - OptimizeUtilitiesAndMaterialHandlingInput - The input type for the optimizeUtilitiesAndMaterialHandling function.
 * - OptimizeUtilitiesAndMaterialHandlingOutput - The return type for the optimizeUtilitiesAndMaterialHandling function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const OptimizeUtilitiesAndMaterialHandlingInputSchema = z.object({
  plantName: z.string().describe('The name of the cement plant.'),
  historicalData: z.string().describe('Historical data of energy consumption, material flow, and logistics.'),
  currentConditions: z.string().describe('Current operational conditions of the plant.'),
});
export type OptimizeUtilitiesAndMaterialHandlingInput = z.infer<typeof OptimizeUtilitiesAndMaterialHandlingInputSchema>;

const OptimizeUtilitiesAndMaterialHandlingOutputSchema = z.object({
  energyOptimizationSuggestions: z.string().describe('Suggestions for optimizing energy consumption in plant utilities.'),
  logisticsOptimizationSuggestions: z.string().describe('Suggestions for optimizing internal logistics flows.'),
  predictedEnergySavings: z.string().describe('Predicted energy savings from implementing the suggestions.'),
  predictedCostReduction: z.string().describe('Predicted cost reduction from implementing the suggestions.'),
});
export type OptimizeUtilitiesAndMaterialHandlingOutput = z.infer<typeof OptimizeUtilitiesAndMaterialHandlingOutputSchema>;

export async function optimizeUtilitiesAndMaterialHandling(
  input: OptimizeUtilitiesAndMaterialHandlingInput
): Promise<OptimizeUtilitiesAndMaterialHandlingOutput> {
  return optimizeUtilitiesAndMaterialHandlingFlow(input);
}

const prompt = ai.definePrompt({
  name: 'optimizeUtilitiesAndMaterialHandlingPrompt',
  input: {schema: OptimizeUtilitiesAndMaterialHandlingInputSchema},
  output: {schema: OptimizeUtilitiesAndMaterialHandlingOutputSchema},
  prompt: `You are an expert in cement plant operations, specializing in optimizing energy consumption and logistics.

  Based on the provided historical data and current conditions of the plant, provide suggestions for optimizing energy consumption in plant utilities and optimizing internal logistics flows.

  Also, predict the energy savings and cost reduction from implementing these suggestions.

  Plant Name: {{{plantName}}}
  Historical Data: {{{historicalData}}}
  Current Conditions: {{{currentConditions}}}

  Consider all aspects of plant operations, including utilities like compressed air, water, and electricity, as well as material handling processes.
  Give clear and actionable advice that can be implemented by the plant management.
  Strictly adhere to the format defined in the output schema.
  `,
});

const optimizeUtilitiesAndMaterialHandlingFlow = ai.defineFlow(
  {
    name: 'optimizeUtilitiesAndMaterialHandlingFlow',
    inputSchema: OptimizeUtilitiesAndMaterialHandlingInputSchema,
    outputSchema: OptimizeUtilitiesAndMaterialHandlingOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
