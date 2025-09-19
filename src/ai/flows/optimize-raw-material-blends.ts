'use server';
/**
 * @fileOverview A raw material optimization AI agent.
 *
 * - optimizeRawMaterialBlends - A function that handles the raw material blend optimization process.
 * - OptimizeRawMaterialBlendsInput - The input type for the optimizeRawMaterialBlends function.
 * - OptimizeRawMaterialBlendsOutput - The return type for the optimizeRawMaterialBlends function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const OptimizeRawMaterialBlendsInputSchema = z.object({
  feedData: z.string().describe('Real-time feed data from the cement plant.'),
  currentBlend: z.string().describe('The current raw material blend composition.'),
  historicalData: z.string().describe('Historical data of raw material blends and their performance.'),
});
export type OptimizeRawMaterialBlendsInput = z.infer<typeof OptimizeRawMaterialBlendsInputSchema>;

const OptimizeRawMaterialBlendsOutputSchema = z.object({
  optimizedBlend: z
    .string()
    .describe('The optimized raw material blend composition recommended by the AI.'),
  predictedEnergySavings: z
    .number()
    .describe('The predicted energy savings from using the optimized blend, in kWh.'),
  predictedQualityImprovement: z
    .string()
    .describe('The predicted improvement in product quality from using the optimized blend.'),
  reasoning: z.string().describe('The AI’s reasoning for the recommended blend.'),
});
export type OptimizeRawMaterialBlendsOutput = z.infer<typeof OptimizeRawMaterialBlendsOutputSchema>;

export async function optimizeRawMaterialBlends(
  input: OptimizeRawMaterialBlendsInput
): Promise<OptimizeRawMaterialBlendsOutput> {
  return optimizeRawMaterialBlendsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'optimizeRawMaterialBlendsPrompt',
  input: {schema: OptimizeRawMaterialBlendsInputSchema},
  output: {schema: OptimizeRawMaterialBlendsOutputSchema},
  prompt: `You are an expert in cement plant operations, specializing in optimizing raw material blends for energy efficiency and product quality.

  Analyze the real-time feed data, current blend, and historical data to recommend an optimized raw material blend.
  Explain the reasoning for the recommended blend, and predict the energy savings and product quality improvement.

  Real-time Feed Data: {{{feedData}}}
  Current Blend: {{{currentBlend}}}
  Historical Data: {{{historicalData}}}
  \n`,
});

const optimizeRawMaterialBlendsFlow = ai.defineFlow(
  {
    name: 'optimizeRawMaterialBlendsFlow',
    inputSchema: OptimizeRawMaterialBlendsInputSchema,
    outputSchema: OptimizeRawMaterialBlendsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
