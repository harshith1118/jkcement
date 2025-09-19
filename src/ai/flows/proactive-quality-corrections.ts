'use server';
/**
 * @fileOverview An AI agent for proactive quality corrections in cement production.
 *
 * - proactiveQualityCorrections - A function that suggests quality corrections based on input fluctuations.
 * - ProactiveQualityCorrectionsInput - The input type for the proactiveQualityCorrections function.
 * - ProactiveQualityCorrectionsOutput - The return type for the proactiveQualityCorrections function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ProactiveQualityCorrectionsInputSchema = z.object({
  feedData: z.string().describe('Real-time feed data from the cement plant processes.'),
  historicalData: z.string().describe('Historical data of cement production parameters.'),
  qualityTargets: z.string().describe('Target quality parameters for the cement product.'),
});
export type ProactiveQualityCorrectionsInput = z.infer<
  typeof ProactiveQualityCorrectionsInputSchema
>;

const ProactiveQualityCorrectionsOutputSchema = z.object({
  analysis: z.string().describe('Analysis of the input data and detected fluctuations.'),
  suggestedCorrections: z
    .string()
    .describe('Suggested proactive quality corrections to maintain product quality.'),
});
export type ProactiveQualityCorrectionsOutput = z.infer<
  typeof ProactiveQualityCorrectionsOutputSchema
>;

export async function proactiveQualityCorrections(
  input: ProactiveQualityCorrectionsInput
): Promise<ProactiveQualityCorrectionsOutput> {
  return proactiveQualityCorrectionsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'proactiveQualityCorrectionsPrompt',
  input: {schema: ProactiveQualityCorrectionsInputSchema},
  output: {schema: ProactiveQualityCorrectionsOutputSchema},
  prompt: `You are an expert in cement production quality control. Analyze the real-time feed data, historical data, and quality targets to detect fluctuations and suggest proactive quality corrections.

Real-time Feed Data: {{{feedData}}}
Historical Data: {{{historicalData}}}
Quality Targets: {{{qualityTargets}}}

Based on this information, provide an analysis of the detected fluctuations and suggest proactive quality corrections to maintain consistent product quality. Focus on actionable steps that can be taken in real-time to adjust the production process.

Analysis:
Suggested Corrections: `,
});

const proactiveQualityCorrectionsFlow = ai.defineFlow(
  {
    name: 'proactiveQualityCorrectionsFlow',
    inputSchema: ProactiveQualityCorrectionsInputSchema,
    outputSchema: ProactiveQualityCorrectionsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
