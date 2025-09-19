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
  const kiln_temperature = formData.get('kiln_temperature');
  const cooler_pressure = formData.get('cooler_pressure');
  const raw_mill_power = formData.get('raw_mill_power');

  const plantData = JSON.stringify({ kiln_temperature, cooler_pressure, raw_mill_power });
  const historicalData = JSON.stringify({ "avg_kiln_temp_last_30d": 1450, "avg_clinker_c3s_last_90d": 65 });
  const kpiData = JSON.stringify({ "target_power_consumption": "90 kWh/ton", "current_power_consumption": "95 kWh/ton" });
  
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
  const limestone_purity = formData.get('limestone_purity');
  const clay_moisture = formData.get('clay_moisture');
  const silica_content = formData.get('silica_content');
  const iron_ore = formData.get('iron_ore');
  const bauxite = formData.get('bauxite');
  
  const feedData = JSON.stringify({ limestone_purity, clay_moisture, silica_content });
  const currentBlend = JSON.stringify({ limestone: 70, clay: 20, iron_ore, bauxite });
  const historicalData = 'Previous blends with high limestone content led to increased energy consumption during grinding.';

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
