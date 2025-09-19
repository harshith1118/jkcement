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

// Mock data for AI flows
const MOCK_DATA = {
    plantData: JSON.stringify({ "timestamp": "2024-08-15T14:30:00Z", "kiln_temp": 1450, "cooler_pressure": 5.2, "raw_mill_power": 3200, "cement_mill_power": 4100, "clinker_production_rate": 250 }, null, 2),
    historicalData: "Historical data shows a 5% increase in energy consumption during summer months due to higher ambient temperatures affecting cooler efficiency.",
    kpiData: JSON.stringify({ "energy_consumption_kwh_per_ton": 95, "clinker_quality_c3s": "65%", "production_rate_tph": 250, "alternative_fuel_substitution_rate": "15%" }, null, 2),
    currentBlend: JSON.stringify({ "limestone": "78%", "clay": "18%", "iron_ore": "3%", "bauxite": "1%" }, null, 2),
    plantConditions: "Kiln running at 98% capacity. Weather is clear, 32°C.",
    feedData: "Real-time feed analysis: LSF=98.5, SM=2.4, AM=1.5. Moisture content at 0.8%.",
    qualityTargets: JSON.stringify({ "target_c3s": "66%", "target_liteness": "90" }, null, 2),
    plantParameters: "Plant capacity: 3.0 MTPA. Current fuel: 80% coal, 20% petcoke. AF options: RDF, biomass, tires.",
    environmentalRegulations: "Target CO2 emission: &lt; 0.8 tCO2/t clinker. NOx limits: 400 mg/Nm3.",
    costConstraints: "Coal cost: $100/ton. Petcoke cost: $120/ton. RDF cost: $30/ton.",
    plantName: "JK Cement - Mangrol Plant"
};

export async function runCementPlantGpt(prevState: ActionState, formData: FormData): Promise<ActionState> {
  try {
    const result = await cementPlantGpt({
      plantData: MOCK_DATA.plantData,
      historicalData: MOCK_DATA.historicalData,
      kpiData: MOCK_DATA.kpiData,
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
            plantName: MOCK_DATA.plantName,
            historicalData,
            currentConditions,
        });
        return { message: 'Optimization successful.', data: result };
    } catch (e) {
        console.error(e);
        return { message: 'An error occurred during optimization.', error: true };
    }
}
