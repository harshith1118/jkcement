'use server';

/**
 * @fileOverview A flow for optimizing alternative fuel usage in cement plants.
 *
 * - optimizeAlternativeFuelUsage - A function that handles the optimization process.
 * - OptimizeAlternativeFuelUsageInput - The input type for the optimizeAlternativeFuelUsage function.
 * - OptimizeAlternativeFuelUsageOutput - The return type for the optimizeAlternativeFuelUsage function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const OptimizeAlternativeFuelUsageInputSchema = z.object({
  plantParameters: z
    .string()
    .describe('A description of the cement plant parameters, including current fuel consumption, alternative fuel options, and production goals.'),
  environmentalRegulations: z
    .string()
    .describe('A description of the relevant environmental regulations and sustainability targets.'),
  costConstraints: z.string().describe('A description of the cost constraints and economic factors.'),
});
export type OptimizeAlternativeFuelUsageInput = z.infer<
  typeof OptimizeAlternativeFuelUsageInputSchema
>;

const OptimizeAlternativeFuelUsageOutputSchema = z.object({
  fuelCombinationRecommendation: z
    .string()
    .describe('Recommended fuel combination and thermal substitution rates.'),
  energyEfficiencyImprovement: z
    .string()
    .describe('Expected energy efficiency improvement with the recommended fuel combination.'),
  emissionReductionEstimate: z
    .string()
    .describe('Estimated emission reduction with the recommended fuel combination.'),
  costAnalysis: z.string().describe('Cost analysis of the recommended fuel combination.'),
});
export type OptimizeAlternativeFuelUsageOutput = z.infer<
  typeof OptimizeAlternativeFuelUsageOutputSchema
>;

export async function optimizeAlternativeFuelUsage(
  input: OptimizeAlternativeFuelUsageInput
): Promise<OptimizeAlternativeFuelUsageOutput> {
  return optimizeAlternativeFuelUsageFlow(input);
}

const prompt = ai.definePrompt({
  name: 'optimizeAlternativeFuelUsagePrompt',
  input: {schema: OptimizeAlternativeFuelUsageInputSchema},
  output: {schema: OptimizeAlternativeFuelUsageOutputSchema},
  prompt: `You are an expert in cement plant operations and sustainability. Your goal is to recommend the optimal alternative fuel combination for a cement plant, considering various factors such as plant parameters, environmental regulations, and cost constraints.

  Analyze the following information:

  Plant Parameters: {{{plantParameters}}}
  Environmental Regulations: {{{environmentalRegulations}}}
  Cost Constraints: {{{costConstraints}}}

  Based on your analysis, provide the following:

  - Recommended fuel combination and thermal substitution rates.
  - Expected energy efficiency improvement with the recommended fuel combination.
  - Estimated emission reduction with the recommended fuel combination.
  - Cost analysis of the recommended fuel combination.`,
});

const optimizeAlternativeFuelUsageFlow = ai.defineFlow(
  {
    name: 'optimizeAlternativeFuelUsageFlow',
    inputSchema: OptimizeAlternativeFuelUsageInputSchema,
    outputSchema: OptimizeAlternativeFuelUsageOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
