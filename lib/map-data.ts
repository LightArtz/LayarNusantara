// lib/map-data.ts
import { Camera, Palette, Utensils, MapPin, LucideIcon, Building, Coffee, Ship, Mountain, Home } from 'lucide-react';
import { INDONESIAN_PROVINCES } from './provinces'; // Your sorted list of 38 province names

export interface MapCategoryItem {
  name: string;
  image: string;
  description: string;
}

export interface MapCategoryDetail {
  id: 'tourism' | 'artCulture' | 'culinary';
  title: string;
  icon: LucideIcon;
  bgColor: string;
  hoverBgColor: string;
  textColor: string;
  iconColor: string;
  borderColor?: string;
  description: string;
  content: {
    introduction: string;
    items: MapCategoryItem[];
  };
}

export interface ProvinceMapData {
  id: string; // This ID MUST MATCH the ID in your SVG file's paths
  name: string; // Display name
  categories: {
    tourism: MapCategoryDetail;
    artCulture: MapCategoryDetail;
    culinary: MapCategoryDetail;
  };
}

const simpleMapsIdToName: Record<string, string> = {
  "IDAC": "Aceh",
  "IDBA": "Bali",
  "IDBB": "Bangka Belitung",
  "IDBE": "Bengkulu",
  "IDBT": "Banten",
  "IDGO": "Gorontalo",
  "IDJA": "Jambi",
  "IDJB": "Jawa Barat",
  "IDJI": "Jawa Timur",
  "IDJK": "DKI Jakarta",
  "IDJT": "Jawa Tengah",
  "IDKB": "Kalimantan Barat",
  "IDKI": "Kalimantan Timur",
  "IDKR": "Kepulauan Riau",
  "IDKS": "Kalimantan Selatan",
  "IDKT": "Kalimantan Tengah",
  "IDKU": "Kalimantan Utara",
  "IDLA": "Lampung",
  "IDMA": "Maluku",
  "IDMU": "Maluku Utara",
  "IDNB": "Nusa Tenggara Barat",
  "IDNT": "Nusa Tenggara Timur",
  "IDPA": "Papua",
  "IDPB": "Papua Barat",
  "IDRI": "Riau",
  "IDSA": "Sulawesi Utara",
  "IDSB": "Sumatera Barat",
  "IDSG": "Sulawesi Tenggara",
  "IDSN": "Sulawesi Selatan",
  "IDSR": "Sulawesi Barat",
  "IDSS": "Sumatera Selatan",
  "IDST": "Sulawesi Tengah",
  "IDSU": "Sumatera Utara",
  "IDYO": "DI Yogyakarta",
};

const provinceNameToSimpleMapsId = Object.fromEntries(
  Object.entries(simpleMapsIdToName).map(([id, name]) => [name, id])
);


const categoryThemes = {
  tourism: { id: 'tourism' as const, icon: Camera, bgColor: 'bg-sky-50', hoverBgColor: 'hover:bg-sky-100', textColor: 'text-sky-700', iconColor: 'text-sky-600', borderColor: 'border-sky-300', title: 'Tourism' },
  artCulture: { id: 'artCulture' as const, icon: Palette, bgColor: 'bg-purple-50', hoverBgColor: 'hover:bg-purple-100', textColor: 'text-purple-700', iconColor: 'text-purple-600', borderColor: 'border-purple-300', title: 'Art & Culture' },
  culinary: { id: 'culinary' as const, icon: Utensils, bgColor: 'bg-orange-50', hoverBgColor: 'hover:bg-orange-100', textColor: 'text-orange-700', iconColor: 'text-orange-600', borderColor: 'border-orange-300', title: 'Culinary' },
};

const createPlaceholderContent = (provinceName: string, categoryTitle: string): MapCategoryDetail['content'] => ({
  introduction: `Discover the rich ${categoryTitle.toLowerCase()} of ${provinceName}. LayarNusantara is continuously curating the best experiences. Detailed information for this section is coming very soon!`,
  items: [
    { name: `Iconic ${categoryTitle} Spot in ${provinceName}`, image: `/map-images/placeholder-${categoryTitle.toLowerCase().replace(/\s+/g, '-')}.jpeg`, description: `Explore the renowned ${categoryTitle.toLowerCase()} attractions that ${provinceName} has to offer. Full details will be updated shortly.` },
    { name: `Hidden Gem for ${categoryTitle} in ${provinceName}`, image: `/map-images/placeholder-general-2.jpeg`, description: `Uncover unique ${categoryTitle.toLowerCase()} experiences in ${provinceName}. We are working on bringing you more information.` },
  ],
});

const detailedProvinceDataMap = new Map<string, ProvinceMapData['categories']>([
  ['Sumatera Barat', {
    tourism: { ...categoryThemes.tourism, description: 'Lakes, highlands, unique architecture.', content: { introduction: 'Explore the breathtaking natural beauty and cultural richness of West Sumatra.', items: [ { name: 'Lake Maninjau', image: '/map-images/sumbar-maninjau.jpeg', description: 'A stunning caldera lake.' }, { name: 'Harau Valley', image: '/map-images/sumbar-harau.jpeg', description: 'Dramatic cliffs and rice paddies.' }, { name: 'Pagaruyung Palace', image: '/map-images/sumbar-pagaruyung.jpeg', description: 'Minangkabau royal palace replica.' } ] } },
    artCulture: { ...categoryThemes.artCulture, description: 'Rich Minangkabau traditions.', content: { introduction: 'Dive into the vibrant Minangkabau culture.', items: [ { name: 'Randai Dance', image: '/map-images/sumbar-randai.jpeg', description: 'Traditional folk theatre performance.' }, { name: 'Songket Weaving', image: '/map-images/sumbar-songket.jpeg', description: 'Intricate hand-woven fabric.' }, { name: 'Rumah Gadang', image: '/map-images/sumbar-rumahgadang.jpeg', description: 'Traditional houses with curved roofs.' } ] } },
    culinary: { ...categoryThemes.culinary, description: 'Famous for Rendang and spicy delights.', content: { introduction: 'Sumatera Barat is a culinary paradise, home to Rendang.', items: [ { name: 'Rendang', image: '/map-images/sumbar-rendang.jpeg', description: 'Slow-cooked spicy meat dish.' }, { name: 'Sate Padang', image: '/map-images/sumbar-satepadang.jpeg', description: 'Skewered meat with spicy yellow sauce.' }, { name: 'Nasi Kapau', image: '/map-images/sumbar-nasikapau.jpeg', description: 'Minang rice with side dishes.' } ] } },
  }],
  ['Bali', {
    tourism: { ...categoryThemes.tourism, description: 'Beaches, temples, vibrant culture.', content: { introduction: 'Known as the Island of the Gods, Bali offers beaches, temples, and arts.', items: [ { name: 'Uluwatu Temple', image: '/map-images/bali-uluwatu.jpeg', description: 'Cliff-top temple with sunset views.' }, { name: 'Tegalalang Rice Terraces', image: '/map-images/bali-tegalalang.jpeg', description: 'Iconic emerald-green rice paddies.' }, { name: 'Seminyak Beach', image: '/map-images/bali-seminyak.jpeg', description: 'Famous for upscale resorts.' } ] } },
    artCulture: { ...categoryThemes.artCulture, description: 'Unique Hindu traditions, arts.', content: { introduction: 'Bali\'s rich culture is evident in its daily offerings, ceremonies, and crafts.', items: [ { name: 'Kecak Dance', image: '/map-images/bali-kecak.jpeg', description: 'Captivating traditional Balinese dance.' }, { name: 'Ubud Art Market', image: '/map-images/bali-ubudmarket.jpeg', description: 'Vibrant market for Balinese handicrafts.' }, { name: 'Canang Sari Offerings', image: '/map-images/bali-canang.jpeg', description: 'Daily offerings expressing gratitude.' } ] } },
    culinary: { ...categoryThemes.culinary, description: 'From Babi Guling to fresh seafood.', content: { introduction: 'Balinese cuisine is a fusion of fresh ingredients and aromatic spices.', items: [ { name: 'Babi Guling', image: '/map-images/bali-babiguling.jpeg', description: 'Balinese roasted suckling pig.' }, { name: 'Lawar', image: '/map-images/bali-lawar.jpeg', description: 'Dish of minced meat, vegetables, coconut.' }, { name: 'Jimbaran Seafood', image: '/map-images/bali-jimbaran.jpeg', description: 'Grilled seafood on Jimbaran Bay.' } ] } },
  }],
  ['DKI Jakarta', {
    tourism: { ...categoryThemes.tourism, icon: Building, description: 'Metropolis, history, shopping.', content: { introduction: 'Indonesia\'s bustling capital, Jakarta, offers a dynamic mix of modern skyscrapers, historical landmarks, and vibrant shopping.', items: [ { name: 'Monas', image: '/map-images/jakarta-monas.jpeg', description: 'National Monument symbolizing independence.' }, { name: 'Kota Tua', image: '/map-images/jakarta-kotatua.jpeg', description: 'Historic Dutch colonial old town.' }, { name: 'Thousand Islands', image: '/map-images/jakarta-thousandislands.jpeg', description: 'Islands north of Jakarta for beaches and marine activities.' } ] } },
    artCulture: { ...categoryThemes.artCulture, description: 'Betawi heritage, modern arts.', content: { introduction: 'Jakarta is a melting pot of cultures, with Betawi traditions and contemporary arts.', items: [ { name: 'Taman Mini Indonesia Indah', image: '/map-images/jakarta-tmii.jpeg', description: 'Cultural park showcasing Indonesia.' }, { name: 'Setu Babakan Betawi Village', image: '/map-images/jakarta-setubabakan.jpeg', description: 'Preserves Betawi culture.' }, { name: 'National Museum', image: '/map-images/jakarta-nationalmuseum.jpeg', description: 'Archeological and historical museum.' } ] } },
    culinary: { ...categoryThemes.culinary, icon: Coffee, description: 'Street food to fine dining.', content: { introduction: 'Jakarta\'s culinary scene is diverse, offering street food and upscale dining.', items: [ { name: 'Kerak Telor', image: '/map-images/jakarta-keraktelor.jpeg', description: 'Spicy Betawi omelette.' }, { name: 'Soto Betawi', image: '/map-images/jakarta-sotobetawi.jpeg', description: 'Traditional beef and coconut milk soup.' }, { name: 'Gado-Gado', image: '/map-images/jakarta-gadogado.jpeg', description: 'Indonesian salad with peanut sauce.' } ] } },
  }],
  // Add more provinces with detailed content here
  ['Bangka Belitung', {
    tourism: { ...categoryThemes.tourism, icon: Ship, description: 'Granite beaches, islands.', content: { introduction: 'Famous for its unique granite rock formations along pristine beaches and clear waters.', items: [ { name: 'Tanjung Tinggi Beach', image: '/map-images/babel-tanjungtinggi.jpeg', description: 'Iconic beach with giant granite boulders.' }, { name: 'Lengkuas Island', image: '/map-images/babel-lengkuas.jpeg', description: 'Home to a historic Dutch lighthouse.' }, { name: 'Kaolin Lake', image: '/map-images/babel-kaolin.jpeg', description: 'Picturesque blue lake in a former mine.' } ] } },
    artCulture: { ...categoryThemes.artCulture, description: 'Malay culture, tin mining heritage.', content: { introduction: 'Influenced by Malay traditions and its history as a major tin mining region.', items: [ { name: 'Tin Mining Museum', image: '/map-images/babel-tinmuseum.jpeg', description: 'Showcases the history of tin mining.' }, { name: 'Traditional Malay Houses', image: '/map-images/placeholder-general-1.jpeg', description: 'Architectural style adapted to the tropical climate.' }, { name: 'Cidayu Dance', image: '/map-images/placeholder-general-2.jpeg', description: 'A traditional welcome dance.' } ] } },
    culinary: { ...categoryThemes.culinary, description: 'Seafood, Mie Koba.', content: { introduction: 'Dominated by fresh seafood and unique local noodle dishes.', items: [ { name: 'Mie Koba', image: '/map-images/babel-miekoba.jpeg', description: 'Fish-based noodle soup, a local specialty.' }, { name: 'Lempah Kuning', image: '/map-images/babel-lempahkuning.jpeg', description: 'Yellow fish soup with pineapple.' }, { name: 'Gangan Darat', image: '/map-images/placeholder-general-1.jpeg', description: 'A spicy meat or fish stew.' } ] } },
  }],
]);

export const indonesiaMapData: ProvinceMapData[] = INDONESIAN_PROVINCES.map((provinceName) => {
  const svgId = provinceNameToSimpleMapsId[provinceName] || provinceName.toLowerCase().replace(/\s+/g, '-').replace(/[().]/g, '');
  
  const categories = detailedProvinceDataMap.get(provinceName) || {
    tourism: { ...categoryThemes.tourism, description: `Explore exciting destinations in ${provinceName}.`, content: createPlaceholderContent(provinceName, 'Tourism') },
    artCulture: { ...categoryThemes.artCulture, description: `Discover the unique culture of ${provinceName}.`, content: createPlaceholderContent(provinceName, 'Art & Culture') },
    culinary: { ...categoryThemes.culinary, description: `Taste the local flavors of ${provinceName}.`, content: createPlaceholderContent(provinceName, 'Culinary') },
  };
  
  return {
    id: svgId,
    name: provinceName,
    categories,
  };
});