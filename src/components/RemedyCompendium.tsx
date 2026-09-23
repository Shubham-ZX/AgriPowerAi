import React, { useState } from 'react';

interface RemedyRecipe {
  id: string;
  name: string;
  category: 'fungicide' | 'pest_control' | 'soil_nutrient' | 'bio_shield';
  targetDiseases: string[];
  targetCrops: string[];
  householdIngredients: string[];
  prepTime: string;
  costEstimate: string;
  directions: string[];
  safetyTips: string;
}

const COMPENDIUM_RECIPES: RemedyRecipe[] = [
  {
    id: 'rem-1',
    name: 'Baking Soda & Horticultural Oil Foliar Spray',
    category: 'fungicide',
    targetDiseases: ['Powdery Mildew', 'Early Blight', 'Black Spot on Rose', 'Anthracnose'],
    targetCrops: ['Tomatoes', 'Cucumbers', 'Squash', 'Peppers', 'Roses'],
    householdIngredients: [
      '1 tbsp Sodium Bicarbonate (Baking Soda)',
      '1 tbsp Vegetable or Sunflower Oil',
      '1 tsp Liquid Castile or Dish Soap',
      '1 Gallon (3.8L) Clean Non-chlorinated Water'
    ],
    prepTime: '5 minutes',
    costEstimate: '$0.40 / Acre',
    directions: [
      'Dissolve baking soda in warm water to prevent clumping.',
      'Add vegetable oil and soap surfactant; shake vigorously until milky white.',
      'Spray before 9:00 AM on both upper and lower leaf surfaces.',
      'Reapply every 5-7 days or after rainfall.'
    ],
    safetyTips: 'Do not exceed 1 tablespoon per gallon to prevent sodium burn on delicate young leaf margins.'
  },
  {
    id: 'rem-2',
    name: 'Fresh Cow Milk / Whey UV Photo-Fungicide',
    category: 'fungicide',
    targetDiseases: ['Late Blight (Phytophthora)', 'Downy Mildew', 'Zucchini Powdery Mildew'],
    targetCrops: ['Potatoes', 'Tomatoes', 'Pumpkins', 'Grapes'],
    householdIngredients: [
      '1 Part Whole Raw Milk or Whey (1 Litre)',
      '9 Parts Clean Well Water (9 Litres)'
    ],
    prepTime: '2 minutes',
    costEstimate: '$1.10 / Acre',
    directions: [
      'Combine milk and water in 1:9 volumetric ratio.',
      'Spray directly onto foliage during bright morning sunlight.',
      'Solar ultraviolet rays react with milk lactoferrin to generate free radicals that kill fungal cells.'
    ],
    safetyTips: 'Do not use sour skim milk that has molded; fresh whole or raw milk provides optimal antiseptic enzymes.'
  },
  {
    id: 'rem-3',
    name: 'Crushed Cayenne & Castile Soap Insecticide',
    category: 'pest_control',
    targetDiseases: ['Two-Spotted Spider Mites', 'Aphid Colonies', 'Whiteflies', 'Thrips'],
    targetCrops: ['Chili Peppers', 'Eggplants', 'Brassicas', 'Beans', 'Citrus'],
    householdIngredients: [
      '3 tbsp Pungent Red Cayenne or Chili Powder',
      '2 tbsp Pure Liquid Castile Soap',
      '4 Cloves Crushed Garlic',
      '1 Gallon Warm Water'
    ],
    prepTime: '20 minutes',
    costEstimate: '$0.60 / Acre',
    directions: [
      'Simmer chili and garlic in 1 quart water for 15 minutes.',
      'Strain through cloth into gallon sprayer; add castile soap.',
      'Spray the underside of leaves where pest nymphs congregate.',
      'Repeat every 3 days for 3 cycles to break egg hatch cycle.'
    ],
    safetyTips: 'Wear glasses and gloves when spraying capsicum extracts; avoid spraying near beneficial honeybee foraging hours.'
  },
  {
    id: 'rem-4',
    name: 'Sifted Hardwood Ash Mineral Dusting',
    category: 'soil_nutrient',
    targetDiseases: ['Northern Corn Leaf Blight', 'Flea Beetle chew marks', 'Potassium Deficiency'],
    targetCrops: ['Maize / Corn', 'Potatoes', 'Cabbage', 'Onions'],
    householdIngredients: [
      '2 kg Clean Sifted Wood Ash from firepit/stove',
      '500g Dry Garden Lime or Diatomaceous Earth'
    ],
    prepTime: '10 minutes',
    costEstimate: '$0.10 / Acre',
    directions: [
      'Sift completely cooled wood ash through fine wire screen.',
      'Dust lightly over morning dew-damp foliage.',
      'Provides rich bio-available potassium and elevates leaf surface pH, halting fungal hyphae penetration.'
    ],
    safetyTips: 'Do not apply ash around acid-loving crops such as blueberries or azaleas.'
  },
  {
    id: 'rem-5',
    name: 'Crushed Eggshell & Vinegar Calcium Acetate Drench',
    category: 'soil_nutrient',
    targetDiseases: ['Blossom End Rot', 'Calcium Deficiency', 'Tipburn in Lettuce'],
    targetCrops: ['Tomatoes', 'Bell Peppers', 'Watermelons', 'Lettuce'],
    householdIngredients: [
      '1 cup Crushed Roasted Eggshells',
      '2 cups White or Apple Cider Vinegar',
      '5 Gallons Water for dilution'
    ],
    prepTime: '24 hours reaction',
    costEstimate: '$0.25 / Bed',
    directions: [
      'Roast clean eggshells lightly in skillet, crush to powder.',
      'Submerge in vinegar in glass jar; bubble reaction releases bio-available water-soluble calcium acetate.',
      'When bubbling stops (approx 24h), dilute 2 tablespoons per gallon of water and water the root zone.'
    ],
    safetyTips: 'Acts 10x faster than ground lime because calcium acetate is directly soluble in plant sap.'
  },
  {
    id: 'rem-6',
    name: 'Aerated Farmstead Compost Tea Microbial Shield',
    category: 'bio_shield',
    targetDiseases: ['Soil-borne Fusarium Wilt', 'Damping Off', 'Bacterial Spot'],
    targetCrops: ['Seedlings', 'Cereals', 'Legumes', 'Fruit Trees'],
    householdIngredients: [
      '4 cups Well-aged Thermal Compost in burlap sock',
      '2 tbsp Unsulfured Molasses',
      '5 Gallons Aerated Rainwater'
    ],
    prepTime: '24 hours brew',
    costEstimate: '$0.30 / Acre',
    directions: [
      'Suspend compost sack in rainwater with bubbler or stir 4 times daily.',
      'Beneficial Bacillus, Pseudomonas and Trichoderma multiply exponentially on molasses sugars.',
      'Drench seedlings at transplanting to inoculate root hairs against pathogenic fungi.'
    ],
    safetyTips: 'Ensure compost tea smells sweet and earthy; discard if it turns anaerobic and foul-smelling.'
  }
];

export const RemedyCompendium: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedRecipe, setExpandedRecipe] = useState<string | null>('rem-1');

  const filtered = COMPENDIUM_RECIPES.filter((r) => {
    const matchesCat = selectedCategory === 'all' || r.category === selectedCategory;
    const matchesSearch =
      r.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.targetDiseases.some((d) => d.toLowerCase().includes(searchQuery.toLowerCase())) ||
      r.householdIngredients.some((i) => i.toLowerCase().includes(searchQuery.toLowerCase())) ||
      r.targetCrops.some((c) => c.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCat && matchesSearch;
  });

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
      {/* Title */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#1a3c2b] text-[#c5ecd3] text-[11px] font-bold tracking-wider uppercase mb-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#ff7d51]"></span>
            <span>BOTANICAL PHARMACOPEIA</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl text-[#1b1c19] font-bold tracking-tight">
            50+ Recognised Remedies <span className="italic text-[#a53b13]">You Already Own</span>
          </h1>
          <p className="text-sm text-[#414843] mt-1 max-w-2xl">
            Clean, zero-synthetics organic formulations crafted from kitchen and farmstead staples to replace costly agrochemicals.
          </p>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white rounded-2xl p-4 mb-8 shadow-sm border border-[#eae8e3] flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Category Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-1 md:pb-0">
          {[
            { id: 'all', label: 'All Formulations' },
            { id: 'fungicide', label: 'Organic Fungicides' },
            { id: 'pest_control', label: 'Pest & Insect Deterrents' },
            { id: 'soil_nutrient', label: 'Soil & Mineral Boosters' },
            { id: 'bio_shield', label: 'Probiotic Bio-Shields' }
          ].map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-colors cursor-pointer ${
                selectedCategory === cat.id
                  ? 'bg-[#022617] text-white shadow-xs'
                  : 'bg-[#f0eee9] text-[#414843] hover:bg-[#e4e2dd]'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Search */}
        <div className="relative w-full md:w-72">
          <span className="material-symbols-outlined absolute left-3 top-2.5 text-[#727973] text-base pointer-events-none">
            search
          </span>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search ingredient, pest, crop..."
            className="w-full pl-9 pr-4 py-2 rounded-xl bg-[#f0eee9] text-xs text-[#1b1c19] focus:outline-none focus:bg-[#e4e2dd]"
          />
        </div>
      </div>

      {/* Recipes List */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filtered.map((recipe) => {
          const isExpanded = expandedRecipe === recipe.id;
          return (
            <div
              key={recipe.id}
              className="bg-white rounded-3xl p-6 shadow-md border border-[#eae8e3] flex flex-col justify-between hover:border-[#82a790] transition-all"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-2">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-[#a53b13] bg-[#ffdcc3]/40 px-2.5 py-0.5 rounded-full">
                    {recipe.category.replace('_', ' ')}
                  </span>
                  <div className="flex items-center gap-2 text-xs font-mono font-bold text-[#022617]">
                    <span>{recipe.costEstimate}</span>
                    <span className="text-[#c1c8c1]">·</span>
                    <span className="text-[#727973] font-normal">{recipe.prepTime}</span>
                  </div>
                </div>

                <h3 className="font-serif text-xl font-bold text-[#1b1c19] mb-2">{recipe.name}</h3>

                {/* Target diseases tags */}
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {recipe.targetDiseases.map((d, i) => (
                    <span
                      key={i}
                      className="px-2 py-0.5 rounded-md bg-[#f5f3ee] text-[11px] font-medium text-[#414843]"
                    >
                      {d}
                    </span>
                  ))}
                </div>

                {/* Quick Ingredients Pill List */}
                <div className="p-3.5 rounded-2xl bg-[#fbf9f4] border border-[#f0eee9] mb-4">
                  <span className="text-xs font-bold text-[#022617] block mb-2 flex items-center gap-1">
                    <span className="material-symbols-outlined text-sm text-[#ff7d51]">kitchen</span>
                    Farmstead Ingredients Required:
                  </span>
                  <ul className="text-xs text-[#414843] space-y-1 list-disc list-inside">
                    {recipe.householdIngredients.map((ing, i) => (
                      <li key={i}>{ing}</li>
                    ))}
                  </ul>
                </div>

                {/* Expandable Preparation Details */}
                {isExpanded && (
                  <div className="pt-2 border-t border-[#eae8e3] flex flex-col gap-3 animate-fade-in">
                    <div>
                      <span className="text-xs font-bold text-[#022617] block mb-2">
                        Application Instructions:
                      </span>
                      <ol className="text-xs text-[#414843] space-y-1.5 list-decimal list-inside leading-relaxed">
                        {recipe.directions.map((d, i) => (
                          <li key={i}>{d}</li>
                        ))}
                      </ol>
                    </div>

                    <div className="p-3 rounded-xl bg-[#ffdcc3]/20 border border-[#ffdbd0] text-xs text-[#361900]">
                      <span className="font-bold block mb-0.5">Stewardship Note:</span>
                      <span>{recipe.safetyTips}</span>
                    </div>
                  </div>
                )}
              </div>

              {/* Toggle Expand Button */}
              <div className="mt-4 pt-3 border-t border-[#eae8e3] flex justify-between items-center">
                <span className="text-[11px] text-[#727973]">
                  Recommended for: {recipe.targetCrops.join(', ')}
                </span>
                <button
                  type="button"
                  onClick={() => setExpandedRecipe(isExpanded ? null : recipe.id)}
                  className="text-xs font-bold text-[#a53b13] hover:text-[#6c1e00] flex items-center gap-1 cursor-pointer"
                >
                  <span>{isExpanded ? 'Hide Steps' : 'View Full Recipe'}</span>
                  <span className="material-symbols-outlined text-base">
                    {isExpanded ? 'expand_less' : 'expand_more'}
                  </span>
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
