'use server';

import { cementPlantGpt } from '@/ai/flows/cement-plant-gpt';
import { optimizeRawMaterialBlends } from '@/ai/flows/optimize-raw-material-blends';
import { optimizeCombustionProcess } from '@/ai/flows/optimize-combustion-process';
import { proactiveQualityCorrections } from '@/ai/flows/proactive-quality-corrections';
import { optimizeAlternativeFuelUsage } from '@/ai/flows/optimize-alternative-fuel-usage';
import { optimizeUtilitiesAndMaterialHandling } from '@/ai/flows/optimize-utilities-and-material-handling';

export type ActionState = {
  message: string;
  data?: any;
  error?: boolean;
};

export async function runCementPlantGpt(prevState: ActionState, formData: FormData): Promise<ActionState> {
  const plantData = formData.get('plantData') as string;
  const historicalData = formData.get('historicalData') as string;
  const kpiData = formData.get('kpiData') as string;

  if (!plantData || !historicalData || !kpiData) {
    return { message: 'All fields are required.', error: true };
  }
  
  try {
    const result = await cementPlantGpt({
      plantData,
      historicalData,
      kpiData,
    });
    return { message: 'Report generated successfully.', data: result };
  } catch (e) {
    console.error(e);
    return { message: 'An error occurred while generating the report.', error: true };
  }
}

export async function runRawMaterialOptimization(prevState: ActionState, formData: FormData): Promise<ActionState> {
  const feedData = formData.get('feedData') as string;
  const currentBlend = formData.get('currentBlend') as string;
  const historicalData = formData.get('historicalData') as string;

  if (!feedData || !currentBlend || !historicalData) {
    return { message: 'All fields are required.', error: true };
  }

  try {
    const result = await optimizeRawMaterialBlends({ feedData, currentBlend, historicalData });
    return { message: 'Optimization successful.', data: result };
  } catch (e) {
    console.error(e);
    return { message: 'An error occurred during optimization.', error: true };
  }
}

export async function runClinkerizationBalancing(prevState: ActionState, formData: FormData): Promise<ActionState> {
  const realTimeData = formData.get('realTimeData') as string;
  const plantConditions = formData.get('plantConditions') as string;

  if (!realTimeData || !plantConditions) {
    return { message: 'All fields are required.', error: true };
  }
  
  try {
    const result = await optimizeCombustionProcess({ realTimeData, plantConditions });
    return { message: 'Optimization successful.', data: result };
  } catch (e) {
    console.error(e);
    return { message: 'An error occurred during optimization.', error: true };
  }
}

export async function runQualityCorrections(prevState: ActionState, formData: FormData): Promise<ActionState> {
    const feedData = formData.get('feedData') as string;
    const historicalData = formData.get('historicalData') as string;
    const qualityTargets = formData.get('qualityTargets') as string;

    if (!feedData || !historicalData || !qualityTargets) {
        return { message: 'All fields are required.', error: true };
    }

    try {
        const result = await proactiveQualityCorrections({ feedData, historicalData, qualityTargets });
        return { message: 'Analysis complete.', data: result };
    } catch (e) {
        console.error(e);
        return { message: 'An error occurred during analysis.', error: true };
    }
}

export async function runFuelMaximization(prevState: ActionState, formData: FormData): Promise<ActionState> {
    const plantParameters = formData.get('plantParameters') as string;
    const environmentalRegulations = formData.get('environmentalRegulations') as string;
    const costConstraints = formData.get('costConstraints') as string;

    if (!plantParameters || !environmentalRegulations || !costConstraints) {
        return { message: 'All fields are required.', error: true };
    }

    try {
        const result = await optimizeAlternativeFuelUsage({ plantParameters, environmentalRegulations, costConstraints });
        return { message: 'Optimization successful.', data: result };
    } catch (e) {
        console.error(e);
        return { message: 'An error occurred during optimization.', error: true };
    }
}

export async function runUtilitiesOptimization(prevState: ActionState, formData: FormData): Promise<ActionState> {
    const historicalData = formData.get('historicalData') as string;
    const currentConditions = formData.get('currentConditions') as string;

    if (!historicalData || !currentConditions) {
        return { message: 'All fields are required.', error: true };
    }

    try {
        const result = await optimizeUtilitiesAndMaterialHandling({
            plantName: 'JK Cement - Mangrol Plant',
            historicalData,
            currentConditions,
        });
        return { message: 'Optimization successful.', data: result };
    } catch (e) {
        console.error(e);
        return { message: 'An error occurred during optimization.', error: true };
    }
}
