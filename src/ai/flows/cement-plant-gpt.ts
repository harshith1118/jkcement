'use server';

/**
 * @fileOverview Implements the Cement Plant GPT flow, providing an intuitive dashboard
 * and anomaly warning system for plant supervisors using GenAI for data summarization and decision support.
 *
 * - cementPlantGpt - A function that provides a summary and anomaly detection for cement plant operations.
 * - CementPlantGptInput - The input type for the cementPlantGpt function.
 * - CementPlantGptOutput - The return type for the cementPlantGpt function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const CementPlantGptInputSchema = z.object({
  plantData: z.string().describe('Real-time sensor data from the cement plant.'),
  historicalData: z.string().describe('Historical data for the past 10 years.'),
  kpiData: z.string().describe('Key performance indicators data.'),
});
export type CementPlantGptInput = z.infer<typeof CementPlantGptInputSchema>;

const CementPlantGptOutputSchema = z.object({
  summary: z.string().describe('A summary of the current plant status and KPIs.'),
  anomalies: z.string().describe('Detected anomalies in the plant operations.'),
  recommendations: z.string().describe('Recommendations for addressing the detected anomalies and improving efficiency.'),
});
export type CementPlantGptOutput = z.infer<typeof CementPlantGptOutputSchema>;

export async function cementPlantGpt(input: CementPlantGptInput): Promise<CementPlantGptOutput> {
  return cementPlantGptFlow(input);
}

const prompt = ai.definePrompt({
  name: 'cementPlantGptPrompt',
  input: {schema: CementPlantGptInputSchema},
  output: {schema: CementPlantGptOutputSchema},
  prompt: `You are an AI assistant providing support to a cement plant supervisor.

You will receive real-time plant data, historical data, and KPI data.

Your task is to:
1. Summarize the current plant status and KPIs.
2. Identify any anomalies in the plant operations based on the data provided.
3. Provide recommendations for addressing the detected anomalies and improving efficiency.

Real-time Plant Data: {{{plantData}}}
Historical Data: {{{historicalData}}}
KPI Data: {{{kpiData}}}

Output should be structured as follows:
Summary: [Summary of current plant status and KPIs]
Anomalies: [Detected anomalies in plant operations]
Recommendations: [Recommendations for addressing anomalies and improving efficiency]`,
});

const cementPlantGptFlow = ai.defineFlow(
  {
    name: 'cementPlantGptFlow',
    inputSchema: CementPlantGptInputSchema,
    outputSchema: CementPlantGptOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
