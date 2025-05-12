/**
 * @typedef {Object} ManufacturingGuidance
 * @property {string} design_for_recyclability_or_reuse
 * @property {string} end_of_life_considerations
 * @property {string} energy_efficient_methods
 * @property {string} waste_minimization
 */

/**
 * @typedef {Object} MaterialCompatibility
 * @property {boolean} is_compatible
 * @property {string} reason
 */

/**
 * @typedef {Object} SustainabilityScore
 * @property {string} disposal_method
 * @property {string} eco_friendly_alternative
 * @property {number} score
 */

/**
 * @typedef {Object} Suggestion
 * @property {string} inputMaterial
 * @property {string} description
 * @property {string} detailedInsights
 * @property {ManufacturingGuidance} manufacturingGuidance
 * @property {MaterialCompatibility} materialCompatibility
 * @property {SustainabilityScore} sustainabilityScore
 */

/**
 * @typedef {Object} SustainabilityInsightsResponse
 * @property {string} finalProduct
 * @property {Suggestion[]} suggestions
 */
