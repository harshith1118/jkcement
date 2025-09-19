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
  const limestone = formData.get('limestone') as string;
  const clay = formData.get('clay') as string;
  const ironOre = formData.get('iron_ore') as string;
  const bauxite = formData.get('bauxite') as string;

  if (!limestone || !clay || !ironOre || !bauxite) {
    return { message: 'All fields are required.', error: true };
  }
  
  const currentBlend = JSON.stringify({
      limestone: parseFloat(limestone) || 0,
      clay: parseFloat(clay) || 0,
      iron_ore: parseFloat(ironOre) || 0,
      bauxite: parseFloat(bauxite) || 0,
  });

  try {
    const result = await optimizeRawMaterialBlends({ 
        feedData: '{"limestone_purity": 88, "clay_moisture": 15, "silica_content": 92}',
        currentBlend: currentBlend,
        historicalData: 'Previous blends with high limestone content led to increased energy consumption during grinding.' 
    });
    return { message: 'Optimization successful.', data: result };
  } catch (e) {
    console.error(e);
    return { message: 'An error occurred during optimization.', error: true };
  }
}

export async function runClinkerizationBalancing(prevState: ActionState, formData: FormData): Promise<ActionState> {
  const preheaterTemp = formData.get('preheater_temp') as string;
  const kilnSpeed = formData.get('kiln_speed') as string;
  const fuelFlowRate = formData.get('fuel_flow_rate') as string;

  if (!preheaterTemp || !kilnSpeed || !fuelFlowRate) {
    return { message: 'All fields are required.', error: true };
  }

  const realTimeData = JSON.stringify({
    preheater_temp: parseFloat(preheaterTemp) || 0,
    kiln_speed: parseFloat(kilnSpeed) || 0,
    fuel_flow_rate: parseFloat(fuelFlowRate) || 0
  });
  
  try {
    const result = await optimizeCombustionProcess({ 
        realTimeData, 
        plantConditions: 'Stable operation, clinker quality targets are being met.' 
    });
    return { message: 'Optimization successful.', data: result };
  } catch (e) {
    console.error(e);
    return { message: 'An error occurred during optimization.', error: true };
  }
}

export async function runQualityCorrections(prevState: ActionState, formData: FormData): Promise<ActionState> {
    const rawMealLsf = formData.get('raw_meal_lsf') as string;
    const silicaModulus = formData.get('silica_modulus') as string;
    const aluminaModulus = formData.get('alumina_modulus') as string;

    if (!rawMealLsf || !silicaModulus || !aluminaModulus) {
        return { message: 'All fields are required.', error: true };
    }

    const feedData = JSON.stringify({
        raw_meal_lsf: parseFloat(rawMealLsf) || 0,
        silica_modulus: parseFloat(silicaModulus) || 0,
        alumina_modulus: parseFloat(aluminaModulus) || 0
    });

    try {
        const result = await proactiveQualityCorrections({ 
            feedData, 
            historicalData: 'Past data shows LSF values above 100 lead to decreased 28-day strength.', 
            qualityTargets: '{"c3s": "65-70%", "c2s": "10-15%", "28d_strength": "> 50 MPa"}'
        });
        return { message: 'Analysis complete.', data: result };
    } catch (e) {
        console.error(e);
        return { message: 'An error occurred during analysis.', error: true };
    }
}

export async function runFuelMaximization(prevState: ActionState, formData: FormData): Promise<ActionState> {
    const fossilFuelPercentage = formData.get('fossilFuelPercentage') as string;
    const tiresPercentage = formData.get('tiresPercentage') as string;
    const biomassPercentage = formData.get('biomassPercentage') as string;
    const industrialWastePercentage = formData.get('industrialWastePercentage') as string;

    if (!fossilFuelPercentage || !tiresPercentage || !biomassPercentage || !industrialWastePercentage) {
        return { message: 'All fields are required.', error: true };
    }

    const plantParameters = `Current fuel mix: ${fossilFuelPercentage}% Petcoke, ${tiresPercentage}% Tires, ${biomassPercentage}% Biomass, ${industrialWastePercentage}% Industrial Waste.`;

    try {
        const result = await optimizeAlternativeFuelUsage({ 
            plantParameters, 
            environmentalRegulations: 'NOx emissions must be below 500 mg/Nm3. CO2 reduction target of 15%.', 
            costConstraints: 'Alternative fuels must be at least 20% cheaper than petcoke on a per-GJ basis.' 
        });
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
