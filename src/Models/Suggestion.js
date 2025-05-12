import { ManufacturingGuidance } from './ManufacturingGuidance';
import { SustainabilityScore } from './SustainabilityScore';
import { MaterialCompatibility } from './MaterialCompatibility';

export const Suggestion = {
  id: Number,
  description: String,
  detailed_sustainability_insights: String,
  input_material: String,
  manufacturing_guidance: ManufacturingGuidance,
  material_compatibility: MaterialCompatibility,
  sustainability_score: SustainabilityScore,
  url: String,
};
