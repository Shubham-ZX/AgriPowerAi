import { DiseaseDiagnosis, FieldNode, FieldHistoryRecord, RegionalOutbreakAlert } from '../types';

export const CROP_PRESETS: DiseaseDiagnosis[] = [
  {
    id: 'tomato-early-blight',
    cropName: 'Tomato (Lycopersicon esculentum)',
    diseaseName: 'Early Blight (Target Spot)',
    scientificName: 'Alternaria solani',
    category: 'fungal',
    confidence: 96.8,
    severity: 'Moderate',
    affectedArea: '22% lower foliage coverage',
    sampleImageUrl: 'https://images.unsplash.com/photo-1592150621744-aca64f48394a?auto=format&fit=crop&w=800&q=80',
    summary: 'Concentric dark brown bullseye lesions identified on mature lower foliage with surrounding chlorotic halo. Fungal spores spreading upward due to soil splash and high morning humidity.',
    symptoms: [
      'Concentric dark brown rings resembling target boards',
      'Yellow chlorotic halos around lesions',
      'Lower leaves wilting and dropping prematurely',
      'Stem lesions forming near soil junction'
    ],
    organicRemedies: [
      {
        id: 'baking-soda-fungicide',
        title: 'Baking Soda & Vegetable Oil Emulsion',
        subtitle: 'Alkaline spore inhibitor (Safe & Food-Grade)',
        prepTime: '5 minutes',
        costPerAcre: '$0.45',
        savingVsChemical: '94% cheaper than copper fungicide',
        ingredients: [
          { item: 'Baking Soda (Sodium Bicarbonate)', amount: '1 tablespoon (15g)', note: 'Raises leaf surface pH above 8.0, halts spore germination' },
          { item: 'Vegetable / Horticultural Oil', amount: '1 tablespoon (15ml)', note: 'Binds remedy to leaf cuticles and suffocates fungal hyphae' },
          { item: 'Mild Castile Soap or Dish Soap', amount: '1 teaspoon (5ml)', note: 'Acts as natural surfactant and spreader-sticker' },
          { item: 'Clean Non-Chlorinated Water', amount: '1 Gallon (3.8 Litres)', note: 'Lukewarm water dissolves soda evenly' }
        ],
        steps: [
          'Dissolve baking soda thoroughly in 1 liter of warm water.',
          'Add the vegetable oil and liquid castile soap, shaking vigorously to emulsify.',
          'Top up to 1 gallon and pour into a clean hand or knapsack sprayer.',
          'Spray thoroughly on both upper and lower leaf surfaces until runoff.',
          'Prune the lowest 3 inches of infected tomato foliage touching the soil and compost in hot pile.'
        ],
        applicationNotes: 'Apply early morning (before 9:00 AM) or near dusk to prevent leaf scorching from direct midday sunlight.',
        frequency: 'Every 5 to 7 days, or immediately following heavy rainfall.'
      },
      {
        id: 'garlic-neem-spray',
        title: 'Crushed Garlic & Neem Leaf Drench',
        subtitle: 'Natural allicin antifungal & immune stimulant',
        prepTime: '15 minutes',
        costPerAcre: '$0.80',
        savingVsChemical: '88% cheaper than synthetic systemic fungicides',
        ingredients: [
          { item: 'Fresh Garlic Bulbs', amount: '2 heads (mashed)', note: 'Rich in sulfur-containing allicin' },
          { item: 'Cold-Pressed Neem Oil or boiled neem leaves', amount: '2 tablespoons (30ml)', note: 'Contains azadirachtin fungal inhibitor' },
          { item: 'Water', amount: '1 Gallon (3.8 Litres)', note: 'Room temperature' }
        ],
        steps: [
          'Crush garlic heads into paste and steep in warm water for 2 hours.',
          'Strain through cheesecloth to remove solids and prevent nozzle clogging.',
          'Blend with neem oil and a few drops of soap surfactant.',
          'Apply fine mist across foliage and drench soil root zone.'
        ],
        applicationNotes: 'Strong aromatic repellent also deters whiteflies and tomato fruitworms.',
        frequency: 'Every 7 days during high relative humidity periods.'
      }
    ],
    voiceScripts: {
      en: 'Diagnosed Early Blight with 96.8% confidence. Immediate fix: Mix 1 tablespoon of baking soda and 1 tablespoon vegetable oil in 1 gallon of water. Spray lower leaves early tomorrow morning before sunlight intensifies. Remove dead leaves touching the ground.',
      es: 'Diagnosticado Tizón Temprano con 96.8% de certeza. Remedio casero: Mezcla una cucharada de bicarbonato y una de aceite vegetal en 4 litros de agua. Aplica temprano en la mañana y retira las hojas bajas que tocan la tierra.',
      hi: '96.8% सटीकता के साथ अगेती झुलसा रोग की पहचान हुई है। उपाय: 1 गैलन पानी में 1 चम्मच बेकिंग सोडा और 1 चम्मच वनस्पति तेल मिलाएं। कल सुबह धूप तेज होने से पहले निचली पत्तियों पर छिड़काव करें।',
      sw: 'Ugonjwa wa ukungu wa mapema umegunduliwa kwa asilimia 96.8. Suluhisho la haraka: Changanya kijiko kimoja cha baking soda na kijiko kimoja cha mafuta ya mboga kwenye lita nne za maji. Nyunyizia asubuhi na mapema kabla jua halijawa kali.'
    }
  },
  {
    id: 'potato-late-blight',
    cropName: 'Potato (Solanum tuberosum)',
    diseaseName: 'Late Blight (Irish Potato Rot)',
    scientificName: 'Phytophthora infestans',
    category: 'fungal',
    confidence: 94.2,
    severity: 'High',
    affectedArea: '34% canopy lesion spread',
    sampleImageUrl: 'https://images.unsplash.com/photo-1518977676601-b53f82aba655?auto=format&fit=crop&w=800&q=80',
    summary: 'Water-soaked blackish lesions rapidly expanding from leaf margins with white fuzzy mycelial growth visible under humid conditions. High risk of tuber infection if not suppressed promptly.',
    symptoms: [
      'Dark, irregular water-soaked spots on leaf tips and edges',
      'White cottony spore growth on underside of leaves in morning',
      'Petioles and stems turn dark brown and collapse',
      'Foul odor emanating from rapidly rotting canopy'
    ],
    organicRemedies: [
      {
        id: 'milk-whey-fungicide',
        title: 'Raw Milk / Whey Lactoferrin Foliar Spray',
        subtitle: 'Natural antiseptic and free-radical spore disruptor',
        prepTime: '2 minutes',
        costPerAcre: '$1.20',
        savingVsChemical: '91% cost reduction vs mancozeb sprays',
        ingredients: [
          { item: 'Fresh Cow Milk or Sour Whey', amount: '1 part (1 liter)', note: 'Lactoferrin proteins generate free radicals under solar UV, destroying fungal membranes' },
          { item: 'Clean Well Water', amount: '9 parts (9 liters)', note: 'Dilution ratio 1:9 avoids sour odor' }
        ],
        steps: [
          'Mix milk or whey with clean water in 1:9 ratio.',
          'Ensure the solution is applied during morning hours when UV radiation is climbing.',
          'Coat upper and under surfaces of all potato leaves.',
          'Hill up soil around potato ridges to shield developing tubers from descending spores.'
        ],
        applicationNotes: 'Proven equally effective as copper in university trials without accumulating heavy metals in the soil.',
        frequency: 'Spray every 4 days while humid wet conditions persist.'
      }
    ],
    voiceScripts: {
      en: 'Warning: Late Blight detected with 94.2% confidence. Urgent action required: Dilute 1 part fresh milk into 9 parts water and spray the entire canopy in the morning sun. Hill up soil mounds over potato stems to prevent spores reaching underground tubers.',
      es: 'Alerta: Tizón tardío detectado con 94.2% de confianza. Acción urgente: Diluye una parte de leche fresca en nueve partes de agua y rocía las plantas bajo el sol matutino.',
      hi: 'चेतावनी: पछेती झुलसा का 94.2% पता चला है। तत्काल उपाय: 1 भाग ताजा दूध 9 भाग पानी में मिलाएं और सुबह धूप में छिड़काव करें। आलू की जड़ों पर मिट्टी चढ़ाएं।',
      sw: 'Tahadhari: Ugonjwa wa ukungu wa baadaye umegunduliwa kwa asilimia 94.2. Hatua ya haraka: Changanya sehemu 1 ya maziwa mabichi na sehemu 9 za maji na unyunyizie mimea asubuhi.'
    }
  },
  {
    id: 'corn-northern-blight',
    cropName: 'Maize / Corn (Zea mays)',
    diseaseName: 'Northern Corn Leaf Blight',
    scientificName: 'Exserohilum turcicum',
    category: 'fungal',
    confidence: 95.1,
    severity: 'Moderate',
    affectedArea: '15% ear-leaf area',
    sampleImageUrl: 'https://images.unsplash.com/photo-1551754655-cd27e38d2076?auto=format&fit=crop&w=800&q=80',
    summary: 'Cigar-shaped elliptical necrotic lesions parallel to leaf veins. Grey-green becoming tan and dry. Risk to photosynthesis during tasseling and grain filling stage.',
    symptoms: [
      'Long, elliptical grayish-green cigar-shaped lesions (1 to 6 inches)',
      'Lesions turn dry, tan and papery',
      'Dark fungal spores develop inside lesions in wet conditions',
      'Leaves dry out prematurely mimicking drought stress'
    ],
    organicRemedies: [
      {
        id: 'wood-ash-horsetail',
        title: 'Hardwood Ash & Silica Dusting Barrier',
        subtitle: 'Mineral leaf armor & cellular wall reinforcement',
        prepTime: '10 minutes',
        costPerAcre: '$0.15',
        savingVsChemical: '98% savings from farm waste reuse',
        ingredients: [
          { item: 'Sifted Hardwood Ash', amount: '2 kg', note: 'Provides potassium, calcium carbonate, and creates alkaline barrier' },
          { item: 'Dry Diatomaceous Earth or Lime', amount: '500 grams', note: 'Desiccates spore filaments upon contact' }
        ],
        steps: [
          'Sift cooled wood ash through fine wire mesh to remove embers or debris.',
          'Dust lightly over morning dew-damp maize leaves using a burlap sack or hand duster.',
          'The moisture will fix the fine powder to leaf surfaces without washing off easily.'
        ],
        applicationNotes: 'Avoid dusting during flowering/tasseling pollination hours (10 AM - 1 PM) to protect silk receptive hairs.',
        frequency: 'Once every 10 days until grain maturity.'
      }
    ],
    voiceScripts: {
      en: 'Northern Corn Leaf Blight identified with 95.1% accuracy. Apply sifted hardwood ash to morning-damp leaves. This creates an alkaline shield that halts cigar-shaped lesion expansion without costly chemicals.',
      es: 'Tizón de la hoja de maíz identificado con 95.1% de precisión. Aplica ceniza de madera tamizada sobre las hojas húmedas del rocío matutino para detener la propagación.',
      hi: 'मक्के का झुलसा रोग 95.1% सटीकता से पहचाना गया। सुबह ओस वाली पत्तियों पर छानी हुई लकड़ी की राख छिड़कें। यह पत्तियों की सुरक्षा करेगा।',
      sw: 'Ugonjwa wa mabaka ya majani ya mahindi umegunduliwa kwa asilimia 95.1. Weka majivu ya kuni yaliyochujwa kwenye majani yenye umande asubuhi.'
    }
  },
  {
    id: 'wheat-leaf-rust',
    cropName: 'Wheat / Cereal (Triticum aestivum)',
    diseaseName: 'Brown Leaf Rust',
    scientificName: 'Puccinia triticina',
    category: 'fungal',
    confidence: 97.5,
    severity: 'High',
    affectedArea: '28% flag leaf coverage',
    sampleImageUrl: 'https://images.unsplash.com/photo-1574943320219-553eb213f72d?auto=format&fit=crop&w=800&q=80',
    summary: 'Small, circular to oval bright orange-brown pustules scattered across the upper surface of leaves. Pustules rupture epidermal skin, exposing powdery rust spores.',
    symptoms: [
      'Elevated orange-red powdery pustules on upper blade surface',
      'Spore dust easily rubs off onto fingers or clothing',
      'Chlorosis developing in stripes around dense pustule clusters',
      'Premature shriveling of the vital flag leaf'
    ],
    organicRemedies: [
      {
        id: 'fermented-nettle-tea',
        title: 'Fermented Nettle & Horsetail Bio-Fungicide',
        subtitle: 'High-silica organic systemic leaf strengthener',
        prepTime: '24 hours fermentation',
        costPerAcre: '$0.30',
        savingVsChemical: '92% cheaper than synthetic triazoles',
        ingredients: [
          { item: 'Stinging Nettle & Equisetum (Horsetail)', amount: '1 kg fresh leaves', note: 'Extreme concentrations of bio-available silica' },
          { item: 'Rainwater / River Water', amount: '10 Litres', note: 'Non-chlorinated essential for anaerobic microbes' },
          { item: 'Raw Sugar or Molasses', amount: '2 tablespoons', note: 'Microbial fermentation kickstarter' }
        ],
        steps: [
          'Chop plants and place in plastic bucket with 10 liters water and sugar.',
          'Cover loosely and let ferment for 24-48 hours until lightly foaming.',
          'Strain liquid through mesh, dilute 1:5 with fresh water.',
          'Spray over wheat canopy using knapsack sprayer with fine fog nozzle.'
        ],
        applicationNotes: 'Silica enters plant cells within 8 hours, forming microscopic mineral glass plates that block rust penetration pegs.',
        frequency: 'Apply twice with a 5-day interval.'
      }
    ],
    voiceScripts: {
      en: 'Brown Leaf Rust confirmed on wheat at 97.5% confidence. Critical for flag leaf survival: Spray fermented nettle or horsetail tea diluted 1 to 5. The natural silica creates a biological armor preventing rust puncture.',
      es: 'Roya marrón del trigo detectada con 97.5% de certeza. Protege la hoja bandera aplicando extracto de ortiga fermentada o cola de caballo.',
      hi: 'गेहूं का भूरा रतुआ रोग 97.5% सटीकता से मिला। झंडा पत्ती को बचाने के लिए प्राकृतिक सिलिका युक्त बिछुआ घास का अर्क छिड़कें।',
      sw: 'Kutu ya majani ya ngano imethibitishwa kwa asilimia 97.5. Nyunyizia mchanganyiko wa majani ya mchongoma na maji ili kuimarisha majani ya juu.'
    }
  },
  {
    id: 'chili-spider-mites',
    cropName: 'Chili / Pepper (Capsicum annuum)',
    diseaseName: 'Two-Spotted Spider Mite Infestation',
    scientificName: 'Tetranychus urticae',
    category: 'pest',
    confidence: 93.7,
    severity: 'Moderate',
    affectedArea: 'Underside stippling on 40% leaves',
    sampleImageUrl: 'https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?auto=format&fit=crop&w=800&q=80',
    summary: 'Microscopic puncture stippling causing bronze mottled leaf coloration with delicate webbing between leaf axils. Flourishes during hot, dry spells.',
    symptoms: [
      'Tiny yellow or white speckling (stippling) on upper leaf surfaces',
      'Fine silky webbing spun along leaf veins and growing tips',
      'Leaves curling upward and taking on a bronze, leathery texture',
      'Flower buds dropping before setting fruit'
    ],
    organicRemedies: [
      {
        id: 'chili-soap-mite-spray',
        title: 'Hot Chili & Potassium Castile Soap Emulsion',
        subtitle: 'Dual-action physical suffocant and capsicum deterrent',
        prepTime: '15 minutes',
        costPerAcre: '$0.55',
        savingVsChemical: '90% savings vs synthetic miticides',
        ingredients: [
          { item: 'Dry Pungent Red Chilies or Cayenne', amount: '3 tablespoons ground powder', note: 'Capsaicin irritates and repels arachnid pests' },
          { item: 'Pure Castile Soap (Potassium Olivate)', amount: '2 tablespoons (30ml)', note: 'Dissolves waxy cuticle of spider mites causing dehydration' },
          { item: 'Water', amount: '1 Gallon (3.8 Litres)', note: 'Warm water' }
        ],
        steps: [
          'Simmer cayenne chili in 1 quart of water for 10 minutes.',
          'Let cool completely and strain through fine cloth to prevent sprayer nozzle blockages.',
          'Stir in potassium castile soap gently to avoid excessive lathering.',
          'Direct the spray wand upward to coat the underside of every chili leaf where mites shelter.'
        ],
        applicationNotes: 'Wear gloves and eye protection when preparing hot pepper spray. Wash sprayer thoroughly after use.',
        frequency: 'Repeat every 3 days for 3 applications to break the 72-hour egg hatch cycle.'
      }
    ],
    voiceScripts: {
      en: 'Spider Mites spotted at 93.7% confidence. Immediate remedy: Simmer 3 tablespoons chili powder, strain, and mix with 2 tablespoons liquid soap in 1 gallon water. Spray under the leaves to dissolve the mites within minutes.',
      es: 'Ácaros araña roja detectados con 93.7% de confianza. Solución: Hierve 3 cucharadas de chile picante, cuela y añade 2 cucharadas de jabón en 4 litros de agua. Rocía debajo de las hojas.',
      hi: 'मिर्च पर मकड़ी का कीट 93.7% सटीकता से मिला। उपाय: 3 चम्मच पिसी मिर्च को उबालकर छान लें, 2 चम्मच साबुन का घोल 1 गैलन पानी में मिलाएं और पत्तियों के नीचे छिड़कें।',
      sw: 'Wadudu wa utando wamegunduliwa kwa asilimia 93.7. Chemsha vijiko vitatu vya pilipili, chuja na uchanganye na vijiko viwili vya sabuni kwenye lita nne za maji.'
    }
  },
  {
    id: 'healthy-citrus-soybean',
    cropName: 'Citrus / Soybean Canopy',
    diseaseName: 'Optimal Photosynthetic Health Index',
    scientificName: 'Vigor Index: 98.2 / 100',
    category: 'healthy',
    confidence: 99.1,
    severity: 'Healthy',
    affectedArea: '0% pathogenetic tissue',
    sampleImageUrl: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=800&q=80',
    summary: 'Deep emerald chlorophyll concentration, uniform leaf turgor, clean stomatal pathways, and zero detectable fungal or bacterial lesions. Robust natural resistance.',
    symptoms: [
      'Vibrant uniform green coloration across all leaf veins',
      'Waxy protective cuticle intact without mechanical abrasion',
      'Normal leaf expansion angles and strong petiole rigidity',
      'Zero webbing, necrotic spots, or insect frass'
    ],
    organicRemedies: [
      {
        id: 'compost-tea-maintenance',
        title: 'Aerated Compost Tea Tonic (Maintenance)',
        subtitle: 'Probiotic foliar inoculant to sustain natural vigor',
        prepTime: '12 hours',
        costPerAcre: '$0.20',
        savingVsChemical: '100% natural prophylactic barrier',
        ingredients: [
          { item: 'Well-cured thermal farm compost', amount: '2 cups in cloth bag', note: 'Dense community of beneficial Bacillus & Trichoderma' },
          { item: 'Unsulfured Blackstrap Molasses', amount: '1 tablespoon', note: 'Provides instant carbohydrate fuel for beneficial bacteria' },
          { item: 'Oxygenated Rainwater', amount: '5 Gallons', note: 'Keeps microorganisms aerobic' }
        ],
        steps: [
          'Submerge compost mesh bag in water bucket with aquarium bubbler or manual stirring.',
          'Add molasses and let steep for 12 to 24 hours until rich sweet-earth aroma develops.',
          'Mist lightly over healthy leaves to populate surface with friendly microbes that eat pathogen spores.'
        ],
        applicationNotes: 'Acts like a probiotic shield. Leaves coated with beneficial bacteria cannot be colonized by blight spores.',
        frequency: 'Monthly preventative foliar wash.'
      }
    ],
    voiceScripts: {
      en: 'Excellent news! Your crop is fully healthy with 99.1% vigor. No diseases or pests identified. Maintain natural resistance with a simple aerated compost tea wash once a month.',
      es: '¡Excelente noticia! Tu cultivo está completamente sano con un 99.1% de vigor. No se encontraron plagas ni enfermedades.',
      hi: 'बहुत बढ़िया समाचार! आपकी फसल 99.1% स्वस्थ है। कोई रोग या कीट नहीं पाया गया। प्राकृतिक खाद का हल्का पानी देते रहें।',
      sw: 'Habari njema! Mmea wako una afya kamili kwa asilimia 99.1. Hakuna ugonjwa wala wadudu waliogunduliwa.'
    }
  }
];

export const INITIAL_FIELD_NODES: FieldNode[] = [
  { id: 'NODE-01', zone: 'Zone 1 - North Valley Orchards', name: 'Valley Sensor Alpha', location: '38.4405° N, 122.7141° W', status: 'active', soilMoisture: 42, airTemp: 22.4, humidity: 68, leafWetnessHours: 4.2, sporeRiskLevel: 'Moderate', lastPing: '1 min ago', battery: 94 },
  { id: 'NODE-02', zone: 'Zone 2 - Riverbank Terrace Plots', name: 'River Flow Sensor', location: '38.4512° N, 122.7230° W', status: 'active', soilMoisture: 56, airTemp: 20.8, humidity: 82, leafWetnessHours: 7.1, sporeRiskLevel: 'High', lastPing: '3 mins ago', battery: 88 },
  { id: 'NODE-03', zone: 'Zone 3 - Highland Grain Bench', name: 'Highland Ridge Node', location: '38.4628° N, 122.7092° W', status: 'active', soilMoisture: 34, airTemp: 24.1, humidity: 52, leafWetnessHours: 2.1, sporeRiskLevel: 'Low', lastPing: 'Just now', battery: 99 },
  { id: 'NODE-04', zone: 'Zone 4 - Solanaceae Row Cluster', name: 'Tomato Field Monitor', location: '38.4350° N, 122.7301° W', status: 'warning', soilMoisture: 61, airTemp: 21.2, humidity: 88, leafWetnessHours: 8.4, sporeRiskLevel: 'Severe', lastPing: '30 sec ago', battery: 76 },
  { id: 'NODE-05', zone: 'Zone 5 - Maize & Legume Intercrop', name: 'Canopy Density Node', location: '38.4419° N, 122.7410° W', status: 'active', soilMoisture: 44, airTemp: 23.0, humidity: 64, leafWetnessHours: 3.8, sporeRiskLevel: 'Moderate', lastPing: '2 mins ago', battery: 91 },
  { id: 'NODE-06', zone: 'Zone 6 - West Slope Citrus Grove', name: 'Citrus Micro-Station', location: '38.4288° N, 122.7505° W', status: 'active', soilMoisture: 38, airTemp: 25.5, humidity: 48, leafWetnessHours: 1.5, sporeRiskLevel: 'Low', lastPing: '4 mins ago', battery: 96 },
  { id: 'NODE-07', zone: 'Zone 7 - Central Irrigation Pivot', name: 'Pivot Telemetry 7', location: '38.4480° N, 122.7350° W', status: 'active', soilMoisture: 49, airTemp: 22.8, humidity: 71, leafWetnessHours: 5.0, sporeRiskLevel: 'Moderate', lastPing: 'Just now', battery: 85 },
  { id: 'NODE-08', zone: 'Zone 8 - Bio-Dynamic Nursery', name: 'Nursery Sprout Node', location: '38.4550° N, 122.7180° W', status: 'active', soilMoisture: 52, airTemp: 21.9, humidity: 66, leafWetnessHours: 3.2, sporeRiskLevel: 'Low', lastPing: '1 min ago', battery: 98 },
  { id: 'NODE-09', zone: 'Zone 9 - South Meadow Pasture', name: 'Pasture Soil Gauge', location: '38.4190° N, 122.7280° W', status: 'active', soilMoisture: 31, airTemp: 26.2, humidity: 44, leafWetnessHours: 1.0, sporeRiskLevel: 'Low', lastPing: '5 mins ago', battery: 92 },
  { id: 'NODE-10', zone: 'Zone 10 - Potato Ridge Plot B', name: 'Tuber Moisture Sensor', location: '38.4320° N, 122.7110° W', status: 'active', soilMoisture: 58, airTemp: 20.4, humidity: 79, leafWetnessHours: 6.8, sporeRiskLevel: 'High', lastPing: 'Just now', battery: 83 },
  { id: 'NODE-11', zone: 'Zone 11 - Agro-Forestry Windbreak', name: 'Canopy Windbreak Node', location: '38.4610° N, 122.7480° W', status: 'active', soilMoisture: 40, airTemp: 23.5, humidity: 59, leafWetnessHours: 2.9, sporeRiskLevel: 'Low', lastPing: '2 mins ago', battery: 89 },
  { id: 'NODE-12', zone: 'Zone 12 - Greenhouse Tunnel 1', name: 'Controlled Clime Sensor', location: '38.4460° N, 122.7050° W', status: 'active', soilMoisture: 48, airTemp: 24.8, humidity: 75, leafWetnessHours: 4.0, sporeRiskLevel: 'Moderate', lastPing: 'Just now', battery: 100 },
  { id: 'NODE-13', zone: 'Zone 13 - Greenhouse Tunnel 2', name: 'Humidity Chamber Node', location: '38.4465° N, 122.7040° W', status: 'active', soilMoisture: 47, airTemp: 25.1, humidity: 73, leafWetnessHours: 3.6, sporeRiskLevel: 'Moderate', lastPing: '1 min ago', battery: 97 },
  { id: 'NODE-14', zone: 'Zone 14 - Edge Habitat Buffer', name: 'Pollinator Boundary Node', location: '38.4150° N, 122.7400° W', status: 'active', soilMoisture: 36, airTemp: 24.0, humidity: 50, leafWetnessHours: 1.8, sporeRiskLevel: 'Low', lastPing: '3 mins ago', battery: 90 }
];

export const INITIAL_FIELD_HISTORY: FieldHistoryRecord[] = [
  {
    id: 'HIST-881',
    date: 'Sep 21, 2026',
    crop: 'Tomato - Early Girl',
    plot: 'Plot 4A - Lower Terraces',
    diagnosis: 'Early Blight (Alternaria solani)',
    severity: 'Moderate',
    status: 'Active Treatment',
    remedyApplied: 'Baking Soda & Vegetable Oil Emulsion',
    notes: 'Lower 4 rows sprayed at 06:30. Pruned yellowing foliage. Second application scheduled in 4 days.',
    imageUrl: 'https://images.unsplash.com/photo-1592150621744-aca64f48394a?auto=format&fit=crop&w=400&q=80'
  },
  {
    id: 'HIST-879',
    date: 'Sep 18, 2026',
    crop: 'Chili Peppers - Habanero',
    plot: 'Greenhouse Tunnel 1',
    diagnosis: 'Two-Spotted Spider Mite',
    severity: 'Moderate',
    status: 'Resolved',
    remedyApplied: 'Hot Chili & Potassium Soap Spray',
    notes: 'Two applications eliminated webbing. Beneficial predatory mites re-introduced. No new stippling.',
    imageUrl: 'https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?auto=format&fit=crop&w=400&q=80'
  },
  {
    id: 'HIST-875',
    date: 'Sep 14, 2026',
    crop: 'Corn / Sweet Maize',
    plot: 'Plot 5 - East Field',
    diagnosis: 'Northern Corn Leaf Blight',
    severity: 'Mild',
    status: 'Resolved',
    remedyApplied: 'Hardwood Ash & Lime Dusting',
    notes: 'Alkaline barrier halted lesion expansion. Grain filling unaffected. Turgor healthy.',
    imageUrl: 'https://images.unsplash.com/photo-1551740700-1c64c502fb42?auto=format&fit=crop&w=400&q=80'
  },
  {
    id: 'HIST-870',
    date: 'Sep 10, 2026',
    crop: 'Valencia Orange',
    plot: 'West Grove Slope',
    diagnosis: 'Optimal Photosynthetic Health Index',
    severity: 'Healthy',
    status: 'Monitoring',
    remedyApplied: 'Compost Tea Tonic (Maintenance)',
    notes: 'Routine monthly vitality scan. Leaves show 99% vigor score. No fungal spores detected.',
    imageUrl: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=400&q=80'
  }
];

export const REGIONAL_OUTBREAK_ALERTS: RegionalOutbreakAlert[] = [
  {
    id: 'OUTBREAK-01',
    disease: 'Potato Late Blight (Phytophthora)',
    zone: 'Zone 4 & Zone 10',
    crop: 'Solanaceae (Potato & Tomato)',
    incidentCount: 38,
    riskTrend: 'rising',
    advisory: 'High night humidity (>85%) over 3 consecutive nights created optimal sporulation index. Recommended raw milk foliar drench before Friday rainfall.',
    time: '42 mins ago'
  },
  {
    id: 'OUTBREAK-02',
    disease: 'Brown Leaf Rust (Puccinia triticina)',
    zone: 'Zone 3 (Highland Ridge)',
    crop: 'Winter Wheat',
    incidentCount: 14,
    riskTrend: 'steady',
    advisory: 'Airborne urediniospores carried by eastern slope winds. Flag leaves in flowering stages require bio-silica reinforcement.',
    time: '2 hours ago'
  },
  {
    id: 'OUTBREAK-03',
    disease: 'Spider Mite Population Surge',
    zone: 'Zone 12 & 13 (Tunnels)',
    crop: 'Capsicum & Eggplant',
    incidentCount: 9,
    riskTrend: 'declining',
    advisory: 'Overhead sprinkler misting lowered ambient temperature by 3°C, halting mite reproduction rate.',
    time: '5 hours ago'
  }
];
