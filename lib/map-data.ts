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
  // Pulau Sumatera
  [
    'Sumatera Barat',
    {
      tourism: {
        ...categoryThemes.tourism,
        description: 'Lakes, highlands, unique architecture.',
        content: {
          introduction: 'Explore the breathtaking natural beauty and cultural richness of West Sumatra.',
          items: [
            { name: 'Lake Maninjau', image: '/map-images/sumbar-maninjau.png', description: 'A stunning caldera lake.' },
            { name: 'Harau Valley', image: '/map-images/sumbar-harau.jpg', description: 'Dramatic cliffs and rice paddies.' },
            { name: 'Pagaruyung Palace', image: '/map-images/sumbar-pagaruyung.jpg', description: 'Minangkabau royal palace replica.' }
          ]
        }
      },
      artCulture: {
        ...categoryThemes.artCulture,
        description: 'Rich Minangkabau traditions.',
        content: {
          introduction: 'Dive into the vibrant Minangkabau culture.',
          items: [
            { name: 'Randai Dance', image: '/map-images/sumbar-randai.jpg', description: 'Traditional folk theatre performance.' },
            { name: 'Songket Weaving', image: '/map-images/sumbar-songket.jpg', description: 'Intricate hand-woven fabric.' },
            { name: 'Rumah Gadang', image: '/map-images/sumbar-rumahgadang.jpg', description: 'Traditional houses with curved roofs.' }
          ]
        }
      },
      culinary: {
        ...categoryThemes.culinary,
        description: 'Famous for Rendang and spicy delights.',
        content: {
          introduction: 'Sumatera Barat is a culinary paradise, home to Rendang.',
          items: [
            { name: 'Rendang', image: '/map-images/sumbar-rendang.jpg', description: 'Slow-cooked spicy meat dish.' },
            { name: 'Sate Padang', image: '/map-images/sumbar-satepadang.jpeg', description: 'Skewered meat with spicy yellow sauce.' },
            { name: 'Nasi Kapau', image: '/map-images/sumbar-nasikapau.jpg', description: 'Minang rice with side dishes.' }
          ]
        }
      }
    }
  ],
  [
    'Bangka Belitung',
    {
      tourism: {
        ...categoryThemes.tourism,
        icon: Ship,
        description: 'Granite beaches, islands.',
        content: {
          introduction: 'Famous for its unique granite rock formations along pristine beaches and clear waters.',
          items: [
            { name: 'Tanjung Tinggi Beach', image: '/map-images/babel-tanjungtinggi.jpg', description: 'Iconic beach with giant granite boulders.' },
            { name: 'Lengkuas Island', image: '/map-images/babel-lengkuas.jpeg', description: 'Home to a historic Dutch lighthouse.' },
            { name: 'Kaolin Lake', image: '/map-images/babel-kaolin.jpg', description: 'Picturesque blue lake in a former mine.' }
          ]
        }
      },
      artCulture: {
        ...categoryThemes.artCulture,
        description: 'Malay culture, tin mining heritage.',
        content: {
          introduction: 'Influenced by Malay traditions and its history as a major tin mining region.',
          items: [
            { name: 'Tin Mining Museum', image: '/map-images/babel-tinmuseum.jpg', description: 'Showcases the history of tin mining.' },
            { name: 'Traditional Malay Houses', image: '/map-images/babel-traditionalhouse.jpg', description: 'Architectural style adapted to the tropical climate.' },
            { name: 'Cidayu Dance', image: '/map-images/babel-cidayu.webp', description: 'A traditional welcome dance.' }
          ]
        }
      },
      culinary: {
        ...categoryThemes.culinary,
        description: 'Seafood, Mie Koba.',
        content: {
          introduction: 'Dominated by fresh seafood and unique local noodle dishes.',
          items: [
            { name: 'Mie Koba', image: '/map-images/babel-miekoba.jpg', description: 'Fish-based noodle soup, a local specialty.' },
            { name: 'Lempah Kuning', image: '/map-images/babel-lempahkuning.webp', description: 'Yellow fish soup with pineapple.' },
            { name: 'Gangan Darat', image: '/map-images/babel-gagan.jpg', description: 'A spicy meat or fish stew.' }
          ]
        }
      }
    }
  ],
  [
    'Aceh',
    {
      tourism: {
        ...categoryThemes.tourism,
        description: 'Tropical rainforests, historical landmarks, and marine life.',
        content: {
          introduction: 'Aceh offers lush landscapes, vibrant culture, and beautiful beaches.',
          items: [
            { name: 'Weh Island', image: '/map-images/aceh-weh.jpg', description: 'An island paradise with snorkeling and diving.' },
            { name: 'Banda Aceh Tsunami Museum', image: '/map-images/aceh-tsunamuseum.jpg', description: 'Interactive museum commemorating the 2004 tsunami.' },
            { name: 'Krueng Ie River', image: '/map-images/aceh-kruengie.jpg', description: 'Scenic river famous for rafting and lush banks.' }
          ]
        }
      },
      artCulture: {
        ...categoryThemes.artCulture,
        description: 'Acehnese heritage, dance and Islamic architecture.',
        content: {
          introduction: 'Discover Aceh\'s rich traditions in dance, crafts, and Islamic art.',
          items: [
            { name: 'Saman Dance', image: '/map-images/aceh-samandance.jpg', description: 'Energetic traditional dance of rapid hand movements.' },
            { name: 'Acehnese Songket Weaving', image: '/map-images/aceh-songket.jpg', description: 'Intricate weaving with golden threads.' },
            { name: 'Baiturrahman Grand Mosque', image: '/map-images/aceh-baiturrahman.jpg', description: 'Iconic mosque of Banda Aceh.' }
          ]
        }
      },
      culinary: {
        ...categoryThemes.culinary,
        description: 'Spicy curries, seafood, and Aceh’s famous mie.',
        content: {
          introduction: 'Aceh\'s cuisine is known for bold spices and coastal specialties.',
          items: [
            { name: 'Mie Aceh', image: '/map-images/aceh-mieaceh.webp', description: 'Spicy noodles served with meat or seafood.' },
            { name: 'Kuah Pliek U', image: '/map-images/aceh-plieku.webp', description: 'Rich coconut curry dish with river fish.' },
            { name: 'Kapurung Aceh', image: '/map-images/aceh-kapurung.jpg', description: 'Sago-based dish with fish soup.' }
          ]
        }
      }
    }
  ],
  [
    'Sumatera Utara',
    {
      tourism: {
        ...categoryThemes.tourism,
        description: 'Lake Toba, highland villages, and jungle parks.',
        content: {
          introduction: 'Explore Mt. Sibayak, Lake Toba’s vistas, and tropical wildlife.',
          items: [
            { name: 'Lake Toba', image: '/map-images/sumut-laketoba.webp', description: 'Largest volcanic lake in Southeast Asia.' },
            { name: 'Sipiso-piso Waterfall', image: '/map-images/sumut-sipisopiso.jpg', description: 'Dramatic drop overlooking Lake Toba.' },
            { name: 'Berastagi', image: '/map-images/sumut-berastagi.png', description: 'Highland town known for fruit and volcano views.' }
          ]
        }
      },
      artCulture: {
        ...categoryThemes.artCulture,
        description: 'Batak traditions, music, and handicrafts.',
        content: {
          introduction: 'Découvrez Batak music, ulos textiles, and traditional clans.',
          items: [
            { name: 'Ulos Weaving', image: '/map-images/sumut-ulos.jpg', description: 'Traditional Batak cloth for ceremonies.' },
            { name: 'Toba Batak Museum', image: '/map-images/sumut-tobamuseum.jpg', description: 'Displays Batak culture and artifacts.' },
            { name: 'Sigale-gale Puppet Dance', image: '/map-images/sumut-sigalegale.jpg', description: 'Wooden puppet ritual dance from Sibolga.' }
          ]
        }
      },
      culinary: {
        ...categoryThemes.culinary,
        description: 'Spicy ikan bakar, durian, kopi Sidikalang.',
        content: {
          introduction: 'Savor traditional Batak flavors and mountain coffee.',
          items: [
            { name: 'Ikan Bakar Sidikalang', image: '/map-images/sumut-ikanbakar.webp', description: 'Grilled freshwater fish with spices.' },
            { name: 'Durian Medan', image: '/map-images/sumut-durian.jpg', description: 'Famous rich and creamy local durian.' },
            { name: 'Kopi Sidikalang', image: '/map-images/sumut-kopi.avif', description: 'Strong coffee grown in highlands.' }
          ]
        }
      }
    }
  ],
  [
    'Riau',
    {
      tourism: {
        ...categoryThemes.tourism,
        description: 'River views, peat swamps, and Malay heritage.',
        content: {
          introduction: 'Enjoy traditional stilt homes and boat tours on Kampar River.',
          items: [
            { name: 'Siak Sri Indrapura Palace', image: '/map-images/riau-siaksultan.jpg', description: 'Historical sultan palace by the river.' },
            { name: 'Kampar River Surfing', image: '/map-images/riau-kampar.jpg', description: 'World-class tidal bore wave surfing.' },
            { name: 'Kerumutan Wildlife Reserve', image: '/map-images/riau-kerumutan.jpg', description: 'Protects peat swamp ecosystems.' }
          ]
        }
      },
      artCulture: {
        ...categoryThemes.artCulture,
        description: 'Malay dance, music, and royal traditions.',
        content: {
          introduction: 'Experience traditional dances and royal-era crafts.',
          items: [
            { name: 'Zapin Dance', image: '/map-images/riau-zapin.jpg', description: 'Classic Malay folk dance with Arabian influence.' },
            { name: 'Songket Riau', image: '/map-images/riau-songket.jpg', description: 'Handwoven silk textile with metallic threads.' },
            { name: 'Bugis Stilt Houses', image: '/map-images/riau-stilthouse.webp', description: 'Traditional homes over water.' }
          ]
        }
      },
      culinary: {
        ...categoryThemes.culinary,
        description: 'Fresh seafood, spicy sambal udang, Malay cakes.',
        content: {
          introduction: 'Tried Malay flavors from coastal kitchens to royal feasts.',
          items: [
            { name: 'Sambal Udang Riau', image: '/map-images/riau-sambaludang.webp', description: 'Spicy prawn sambal dish.' },
            { name: 'Gulai Ikan Patin', image: '/map-images/riau-patin.webp', description: 'Catfish curry in rich coconut broth.' },
            { name: 'Kue Ku', image: '/map-images/riau-kueku.jpg', description: 'Sweet red glutinous rice cake stuffed with mung bean.' }
          ]
        }
      }
    }
  ],
  [
    'Jambi',
    {
      tourism: {
        ...categoryThemes.tourism,
        description: 'Kerinci highlands, rapids, and peatland forest.',
        content: {
          introduction: 'Hike Mt. Kerinci and explore pristine peat swamps.',
          items: [
            { name: 'Mount Kerinci', image: '/map-images/jambi-kerinci.jpg', description: 'Highest volcano in Indonesia.' },
            { name: 'Lake Kerinci', image: '/map-images/jambi-lakekerinci.jpeg', description: 'Crater lake near Mt. Kerinci.' },
            { name: 'Batanghari River', image: '/map-images/jambi-batanghari.jpg', description: 'Longest river in Sumatra with rafting.' }
          ]
        }
      },
      artCulture: {
        ...categoryThemes.artCulture,
        description: 'Malay royal traditions, silat, classical dance.',
        content: {
          introduction: 'Experience royal palace, martial arts, and dance of Malay Jambi.',
          items: [
            { name: 'Silat Performance', image: '/map-images/jambi-silat.jpg', description: 'Traditional martial arts display.' },
            { name: 'Palace of Sultan Thaha', image: '/map-images/jambi-thahapalace.jpg', description: 'Historical royal palace tour.' },
            { name: 'Malay Woven Cloth', image: '/map-images/jambi-ukiran.jpg', description: 'Handwoven fabric with traditional motifs.' }
          ]
        }
      },
      culinary: {
        ...categoryThemes.culinary,
        description: 'Tempoyak durian paste, river fish stews.',
        content: {
          introduction: 'Unique sour and spicy dishes from the land and rivers.',
          items: [
            { name: 'Tempoyak', image: '/map-images/jambi-tempoyak.jpg', description: 'Fermented durian paste served with fish.' },
            { name: 'Gulai Tempoyak Ikan Patin', image: '/map-images/jambi-gulai.jpeg', description: 'Fish curry with durian paste.' },
            { name: 'Keripik Ganyong', image: '/map-images/jambi-keripik.webp', description: 'Crispy chips made from the ganyong root.' }
          ]
        }
      }
    }
  ],
  [
    'Bengkulu',
    {
      tourism: {
        ...categoryThemes.tourism,
        description: 'Volcanoes, beaches, and historical sites.',
        content: {
          introduction: 'Visit Mount Sinabung, Fort Marlborough, and black-sand beaches.',
          items: [
            { name: 'Fort Marlborough', image: '/map-images/bengkulu-fortmarlborough.jpg', description: '18th-century British fortress.' },
            { name: 'Mount Sinabung', image: '/map-images/bengkulu-sinabung.jpg', description: 'Active volcano with dramatic landscape.' },
            { name: 'Karang Tinggi Beach', image: '/map-images/bengkulu-karang.jpg', description: 'Quiet beach with coral reefs.' }
          ]
        }
      },
      artCulture: {
        ...categoryThemes.artCulture,
        description: 'Traditional Malay cultural festivals and crafts.',
        content: {
          introduction: 'Explore Malay ceremonies and native crafts of Bengkulu.',
          items: [
            { name: 'Rejang Dance', image: '/map-images/bengkulu-rejangdance.jpg', description: 'Ceremonial dance performed during weddings.' },
            { name: 'Muko-muko Weaving', image: '/map-images/bengkulu-weaving.jpg', description: 'Traditional cloth from Muko-muko region.' },
            { name: 'Besurek Mosque Art', image: '/map-images/bengkulu-besurek.jpg', description: 'Intricate calligraphy-covered mosque walls.' }
          ]
        }
      },
      culinary: {
        ...categoryThemes.culinary,
        description: 'Spicy seafood soups and native snacks.',
        content: {
          introduction: 'Bengkulu cuisine blends coastal and native flavours.',
          items: [
            { name: 'Gulai Ikan Patin', image: '/map-images/bengkulu-ikanpatin.jpg', description: 'Catfish cooked in rich spicy coconut curry.' },
            { name: 'Lempuk Durian', image: '/map-images/bengkulu-lempuk.jpg', description: 'Durian candy popular in Bengkulu.' },
            { name: 'Pendap', image: '/map-images/bengkulu-pendap.jpeg', description: 'Fish cooked in bamboo with spices.' }
          ]
        }
      }
    }
  ],
  [
    'Sumatera Selatan',
    {
      tourism: {
        ...categoryThemes.tourism,
        description: 'Historical sites, rivers, and nature.',
        content: {
          introduction: 'Explore the rich history and natural charm of South Sumatra.',
          items: [
            { name: 'Ampera Bridge', image: '/map-images/sumsel-ampera.jpg', description: 'Iconic bridge over the Musi River in Palembang.' },
            { name: 'Kemaro Island', image: '/map-images/sumsel-kemaro.jpg', description: 'A small island in the middle of the Musi River with Chinese temple.' },
            { name: 'Pagar Alam Highlands', image: '/map-images/sumsel-pagaralam.jpg', description: 'Cool highlands with tea plantations and waterfalls.' }
          ]
        }
      },
      artCulture: {
        ...categoryThemes.artCulture,
        description: 'Palembang’s royal legacy and crafts.',
        content: {
          introduction: 'Discover the cultural heritage of Palembang and traditional South Sumatran arts.',
          items: [
            { name: 'Gending Sriwijaya Dance', image: '/map-images/sumsel-gending.jpg', description: 'Welcoming dance showcasing elegance and royal tradition.' },
            { name: 'Songket Palembang', image: '/map-images/sumsel-songket.jpg', description: 'Luxurious hand-woven fabric with gold threads.' },
            { name: 'Balap Karapan', image: '/map-images/sumsel-balap.jpg', description: 'Traditional ox racing event in the countryside.' }
          ]
        }
      },
      culinary: {
        ...categoryThemes.culinary,
        description: 'Famous for Pempek and sweet-savory flavors.',
        content: {
          introduction: 'South Sumatra offers flavorful dishes with unique ingredients.',
          items: [
            { name: 'Pempek', image: '/map-images/sumsel-pempek.jpg', description: 'Fish cake served with spicy vinegar sauce.' },
            { name: 'Tekwan', image: '/map-images/sumsel-tekwan.jpg', description: 'Fish ball soup with vermicelli and mushrooms.' },
            { name: 'Martabak HAR', image: '/map-images/sumsel-martabak.png', description: 'Egg-stuffed flatbread with curry sauce.' }
          ]
        }
      }
    }
  ],
  [
    'Lampung',
    {
      tourism: {
        ...categoryThemes.tourism,
        description: 'Beaches, elephants, and volcano views.',
        content: {
          introduction: 'Lampung offers a mix of nature, wildlife, and coastal beauty.',
          items: [
            { name: 'Pahawang Island', image: '/map-images/lampung-pahawang.jpeg', description: 'Snorkeling paradise with crystal-clear waters.' },
            { name: 'Way Kambas National Park', image: '/map-images/lampung-waykambas.jpg', description: 'Sanctuary for endangered Sumatran elephants.' },
            { name: 'Krakatoa Viewpoint', image: '/map-images/lampung-krakatau.jpg', description: 'Scenic views of the famous volcano.' }
          ]
        }
      },
      artCulture: {
        ...categoryThemes.artCulture,
        description: 'Lampung’s tribal roots and traditional attire.',
        content: {
          introduction: 'Delve into Lampung’s unique customs and indigenous culture.',
          items: [
            { name: 'Tapis Weaving', image: '/map-images/lampung-tapis.webp', description: 'Hand-woven cloth with golden thread embroidery.' },
            { name: 'Sigeh Pengunten Dance', image: '/map-images/lampung-sigeh.jpg', description: 'Traditional welcoming dance from Lampung.' },
            { name: 'Traditional Lampung House', image: '/map-images/lampung-house.webp', description: 'Stilt house representing the community’s social structure.' }
          ]
        }
      },
      culinary: {
        ...categoryThemes.culinary,
        description: 'Spicy and seafood-based dishes.',
        content: {
          introduction: 'Enjoy the rich flavors of Lampung’s traditional food.',
          items: [
            { name: 'Seruit', image: '/map-images/lampung-seruit.jpg', description: 'Grilled fish with sambal and tempoyak.' },
            { name: 'Tempoyak', image: '/map-images/lampung-tempoyak.jpeg', description: 'Fermented durian dish often served with fish.' },
            { name: 'Gulai Taboh', image: '/map-images/lampung-gulai.webp', description: 'Vegetable curry with coconut milk and spices.' }
          ]
        }
      }
    }
  ],

  // Pulau Jawa
  [
    'Bali',
    {
      tourism: {
        ...categoryThemes.tourism,
        description: 'Beaches, temples, vibrant culture.',
        content: {
          introduction: 'Known as the Island of the Gods, Bali offers beaches, temples, and arts.',
          items: [
            { name: 'Uluwatu Temple', image: '/map-images/bali-uluwatu.jpg', description: 'Cliff-top temple with sunset views.' },
            { name: 'Tegalalang Rice Terraces', image: '/map-images/bali-tegalalang.jpg', description: 'Iconic emerald-green rice paddies.' },
            { name: 'Seminyak Beach', image: '/map-images/bali-seminyak.jpg', description: 'Famous for upscale resorts.' }
          ]
        }
      },
      artCulture: {
        ...categoryThemes.artCulture,
        description: 'Unique Hindu traditions, arts.',
        content: {
          introduction: 'Bali\'s rich culture is evident in its daily offerings, ceremonies, and crafts.',
          items: [
            { name: 'Kecak Dance', image: '/map-images/bali-kecak.jpg', description: 'Captivating traditional Balinese dance.' },
            { name: 'Ubud Art Market', image: '/map-images/bali-ubudmarket.jpg', description: 'Vibrant market for Balinese handicrafts.' },
            { name: 'Canang Sari Offerings', image: '/map-images/bali-canang.jpg', description: 'Daily offerings expressing gratitude.' }
          ]
        }
      },
      culinary: {
        ...categoryThemes.culinary,
        description: 'From Babi Guling to fresh seafood.',
        content: {
          introduction: 'Balinese cuisine is a fusion of fresh ingredients and aromatic spices.',
          items: [
            { name: 'Babi Guling', image: '/map-images/bali-babiguling.jfif', description: 'Balinese roasted suckling pig.' },
            { name: 'Lawar', image: '/map-images/bali-lawar.jpg', description: 'Dish of minced meat, vegetables, coconut.' },
            { name: 'Jimbaran Seafood', image: '/map-images/bali-jimbaran.webp', description: 'Grilled seafood on Jimbaran Bay.' }
          ]
        }
      }
    }
  ],
  [
    'DKI Jakarta',
    {
      tourism: {
        ...categoryThemes.tourism,
        icon: Building,
        description: 'Metropolis, history, shopping.',
        content: {
          introduction: 'Indonesia\'s bustling capital, Jakarta, offers a dynamic mix of modern skyscrapers, historical landmarks, and vibrant shopping.',
          items: [
            { name: 'Monas', image: '/map-images/jakarta-monas.jpg', description: 'National Monument symbolizing independence.' },
            { name: 'Kota Tua', image: '/map-images/jakarta-kotatua.webp', description: 'Historic Dutch colonial old town.' },
            { name: 'Thousand Islands', image: '/map-images/jakarta-thousandislands.jpg', description: 'Islands north of Jakarta for beaches and marine activities.' }
          ]
        }
      },
      artCulture: {
        ...categoryThemes.artCulture,
        description: 'Betawi heritage, modern arts.',
        content: {
          introduction: 'Jakarta is a melting pot of cultures, with Betawi traditions and contemporary arts.',
          items: [
            { name: 'Taman Mini Indonesia Indah', image: '/map-images/jakarta-tmii.jpeg', description: 'Cultural park showcasing Indonesia.' },
            { name: 'Setu Babakan Betawi Village', image: '/map-images/jakarta-setubabakan.jpeg', description: 'Preserves Betawi culture.' },
            { name: 'National Museum', image: '/map-images/jakarta-nationalmuseum.jpeg', description: 'Archeological and historical museum.' }
          ]
        }
      },
      culinary: {
        ...categoryThemes.culinary,
        icon: Coffee,
        description: 'Street food to fine dining.',
        content: {
          introduction: 'Jakarta\'s culinary scene is diverse, offering street food and upscale dining.',
          items: [
            { name: 'Kerak Telor', image: '/map-images/jakarta-keraktelor.jpg', description: 'Spicy Betawi omelette.' },
            { name: 'Soto Betawi', image: '/map-images/jakarta-sotobetawi.png', description: 'Traditional beef and coconut milk soup.' },
            { name: 'Gado-Gado', image: '/map-images/jakarta-gadogado.jpg', description: 'Indonesian salad with peanut sauce.' }
          ]
        }
      }
    }
  ],
  [
    'Banten',
    {
      tourism: {
        ...categoryThemes.tourism,
        description: 'Coastal beauty, heritage sites, and volcanic views.',
        content: {
          introduction: 'Banten offers beaches, native wildlife, and cultural landmarks near Jakarta.',
          items: [
            { name: 'Ujung Kulon National Park', image: '/map-images/banten-ujungkulon.webp', description: 'Home of the Javan rhinoceros and pristine beaches.' },
            { name: 'Tanjung Lesung', image: '/map-images/banten-tanjunglesung.png', description: 'Coastal resort with clear waters and mangroves.' },
            { name: 'Mount Krakatau Viewpoint', image: '/map-images/banten-krakatau.jpg', description: 'Scenic spots overlooking the Krakatau volcanic island.' }
          ]
        }
      },
      artCulture: {
        ...categoryThemes.artCulture,
        description: 'Sundanese-Malay art, rituals, and puppetry.',
        content: {
          introduction: 'Explore traditional performances and coastal rituals in Banten.',
          items: [
            { name: 'Debus Martial Art', image: '/map-images/banten-debus.webp', description: 'Trance-based martial arts display.' },
            { name: 'Banten Puppet Show', image: '/map-images/banten-wayang.webp', description: 'Wayang golek with Sundanese influence.' },
            { name: 'Traditional Banten Cloth', image: '/map-images/banten-cloth.jpg', description: 'Handwoven textiles with coastal motifs.' }
          ]
        }
      },
      culinary: {
        ...categoryThemes.culinary,
        description: 'Seafood, spicy sambal bantenan, and local snacks.',
        content: {
          introduction: 'Banten cuisine showcases fresh seafood and unique sambal flavors.',
          items: [
            { name: 'Sate Bandeng', image: '/map-images/banten-satebandeng.jpeg', description: 'Grilled milkfish satay with spicy seasoning.' },
            { name: 'Laksa Tangkar', image: '/map-images/banten-laksa.jpg', description: 'Yellow coconut-based soup with beef and noodles.' },
            { name: 'Kue Cucur', image: '/map-images/banten-cucur.jpg', description: 'Sweet fried palm sugar pancake.' }
          ]
        }
      }
    }
  ],
  [
    'Jawa Barat',
    {
      tourism: {
        ...categoryThemes.tourism,
        description: 'Highlands, tea plantations, and cultural villages.',
        content: {
          introduction: 'Experience Tangkuban Perahu, Bandung’s culinary scene, and Sundanese villages.',
          items: [
            { name: 'Tangkuban Perahu', image: '/map-images/jabar-tangkuban.jpg', description: 'Active volcano with crater tours.' },
            { name: 'Kawah Putih', image: '/map-images/jabar-kawahputih.jpeg', description: 'Stunning crater lake with surreal colors.' },
            { name: 'Lembang Strawberry Farm', image: '/map-images/jabar-lembang.jpeg', description: 'Agro-tourism with fresh strawberries and scenery.' }
          ]
        }
      },
      artCulture: {
        ...categoryThemes.artCulture,
        description: 'Sundanese music, dances, and bamboo crafts.',
        content: {
          introduction: 'Discover Angklung, Jaipong dance, and local handicrafts.',
          items: [
            { name: 'Angklung Performance', image: '/map-images/jabar-angklung.webp', description: 'Traditional bamboo musical instrument orchestra.' },
            { name: 'Jaipong Dance', image: '/map-images/jabar-jaipong.png', description: 'Energetic Sundanese folk dance.' },
            { name: 'Bamboo Weaving', image: '/map-images/jabar-bamboo.jpg', description: 'Crafted household items from bamboo.' }
          ]
        }
      },
      culinary: {
        ...categoryThemes.culinary,
        description: 'Pecel, karedok, and Sundanese coffee.',
        content: {
          introduction: 'Savor fresh vegetable salads, grilled fish, and spicy sauces.',
          items: [
            { name: 'Pecel', image: '/map-images/jabar-pecel.jpg', description: 'Mixed vegetables with peanut sauce.' },
            { name: 'Karedok', image: '/map-images/jabar-karedok.jpg', description: 'Raw vegetable salad in spicy coconut sauce.' },
            { name: 'Sundanese Coffee', image: '/map-images/jabar-coffee.jpg', description: 'Rich coffee from highland plantations.' }
          ]
        }
      }
    }
  ],
  [
    'Jawa Tengah',
    {
      tourism: {
        ...categoryThemes.tourism,
        description: 'Borobudur, Dieng Plateau, and waterfalls.',
        content: {
          introduction: 'Visit ancient temples, highland plateaus, and natural beauty.',
          items: [
            { name: 'Borobudur Temple', image: '/map-images/jateng-borobudur.jpg', description: 'World’s largest Buddhist temple.' },
            { name: 'Dieng Plateau', image: '/map-images/jateng-dieng.jpg', description: 'Highland volcanic complex with colorful lakes.' },
            { name: 'Grojogan Sewu', image: '/map-images/jateng-grojogan.webp', description: 'Elegant waterfall near Tawangmangu.' }
          ]
        }
      },
      artCulture: {
        ...categoryThemes.artCulture,
        description: 'Jathilan, gamelan, and classical batik.',
        content: {
          introduction: 'Explore Javanese equestrian dance, gamelan orchestras, and batik art.',
          items: [
            { name: 'Jathilan Dance', image: '/map-images/jateng-jathilan.jpg', description: 'Equestrian trance dance with vibrant costumes.' },
            { name: 'Gamelan Ensemble', image: '/map-images/jateng-gamelan.jpg', description: 'Traditional Javanese orchestra.' },
            { name: 'Solo Batik', image: '/map-images/jateng-batik.jpg', description: 'Intricate classical batik patterns from Solo.' }
          ]
        }
      },
      culinary: {
        ...categoryThemes.culinary,
        description: 'Gudeg, soto, and tengkleng.',
        content: {
          introduction: 'Taste sweet stewed jackfruit, rich soups, and goat stew.',
          items: [
            { name: 'Gudeg', image: '/map-images/jateng-gudeg.jpg', description: 'Sweet stew of young jackfruit.' },
            { name: 'Soto Semarang', image: '/map-images/jateng-soto.jpg', description: 'Chicken soup with perkedel and lontong.' },
            { name: 'Tengkleng', image: '/map-images/jateng-tengkleng.webp', description: 'Savory goat bone stew.' }
          ]
        }
      }
    }
  ],
  [
    'DI Yogyakarta',
    {
      tourism: {
        ...categoryThemes.tourism,
        description: 'Heritage temples, urban culture, and beaches.',
        content: {
          introduction: 'Discover Borobudur/Yogyakarta’s royal palaces and southern beaches.',
          items: [
            { name: 'Prambanan Temple', image: '/map-images/DIY-prambanan.jpg', description: 'Majestic Hindu temple complex.' },
            { name: 'Kraton Yogyakarta', image: '/map-images/DIY-kraton.jpeg', description: 'Sultan’s palace in the heart of the city.' },
            { name: 'Parangtritis Beach', image: '/map-images/DIY-parangtritis.jpg', description: 'Coastal sunset spot with mystical vibes.' }
          ]
        }
      },
      artCulture: {
        ...categoryThemes.artCulture,
        description: 'Wayang, batik, and kethoprak theatre.',
        content: {
          introduction: 'Experience traditional puppet shows and court performances.',
          items: [
            { name: 'Wayang Kulit', image: '/map-images/DIY-wayang.jpg', description: 'Shadow-puppet theatre with gamelan.' },
            { name: 'Batik Yogyakarta', image: '/map-images/DIY-batik.webp', description: 'Distinctive hand-drawn batik patterns.' },
            { name: 'Kethoprak Theatre', image: '/map-images/DIY-kethoprak.jpg', description: 'Javanese folk drama in palace settings.' }
          ]
        }
      },
      culinary: {
        ...categoryThemes.culinary,
        description: 'Gudeg, bakpia, and angkringan street food.',
        content: {
          introduction: 'Savor sweet jackfruit stew, mung bean pastries, and local snacks.',
          items: [
            { name: 'Gudeg', image: '/map-images/DIY-gudeg.jpeg', description: 'Signature sweet jackfruit stew.' },
            { name: 'Bakpia', image: '/map-images/DIY-bakpia.jpg', description: 'Sweet mung bean-filled pastry.' },
            { name: 'Angkringan Nasi Kucing', image: '/map-images/DIY-angkringan.jpg', description: 'Small rice portions served at street stalls.' }
          ]
        }
      }
    }
  ],
  [
    'Jawa Timur',
    {
      tourism: {
        ...categoryThemes.tourism,
        description: 'Volcanoes, heritage sites, and coastal cliffs.',
        content: {
          introduction: 'Explore Bromo’s sunrise, Surabaya’s history, and Malang’s highlands.',
          items: [
            { name: 'Mount Bromo', image: '/map-images/jatim-bromo.jpg', description: 'Famous for sunrise over the crater.' },
            { name: 'Madakaripura Waterfall', image: '/map-images/jatim-mada.webp', description: 'Tall waterfall in Tengger jungle.' },
            { name: 'Suramadu Bridge', image: '/map-images/jatim-suramadu.jpg', description: 'Longest bridge in Indonesia.' }
          ]
        }
      },
      artCulture: {
        ...categoryThemes.artCulture,
        description: 'Reog Ponorogo, batik truntum, and topeng Malang.',
        content: {
          introduction: 'Witness folk performances and mask dances of East Java.',
          items: [
            { name: 'Reog Ponorogo', image: '/map-images/jatim-reog.webp', description: 'Lion-mask dance with peacock feathers.' },
            { name: 'Batik Truntum', image: '/map-images/jatim-batik.jpg', description: 'Traditional love-themed batik motifs.' },
            { name: 'Topeng Malang', image: '/map-images/jatim-topeng.jpg', description: 'Colorful mask-based theatrical dance.' }
          ]
        }
      },
      culinary: {
        ...categoryThemes.culinary,
        description: 'Soto Lamongan, rawon, and rujak cingur.',
        content: {
          introduction: 'Delicious soups, black beef broth, and fruit salads with sauce.',
          items: [
            { name: 'Soto Lamongan', image: '/map-images/jatim-soto.jpg', description: 'Chicken soup with koya powder.' },
            { name: 'Rawon', image: '/map-images/jatim-rawon.jpg', description: 'Black nut-based beef soup.' },
            { name: 'Rujak Cingur', image: '/map-images/jatim-rujak.jpg', description: 'Fruit and vegetable salad with fish sauce.' }
          ]
        }
      }
    }
  ],

  // NTT & NTB
  [
    'Nusa Tenggara Barat',
    {
      tourism: {
        ...categoryThemes.tourism,
        description: 'Beaches, islands, and cultural festivals.',
        content: {
          introduction: 'Explore Mount Rinjani, Lombok’s coast, and traditional villages.',
          items: [
            { name: 'Mount Rinjani', image: '/map-images/ntb-rinjani.jpg', description: 'Second-highest volcano in Indonesia.' },
            { name: 'Gili Islands', image: '/map-images/ntb-gili.webp', description: 'Snorkeling paradise off Lombok.' },
            { name: 'Sasak Village', image: '/map-images/ntb-sasak.jpg', description: 'Traditional settlement with cultural tours.' }
          ]
        }
      },
      artCulture: {
        ...categoryThemes.artCulture,
        description: 'Sasak weaving, music, and traditional ceremonies.',
        content: {
          introduction: 'Discover woven ikat textiles and Lombok’s unique crafts.',
          items: [
            { name: 'Sasak Ikat Weaving', image: '/map-images/ntb-ikat.jpg', description: 'Handcrafted woven fabric of the Sasak people.' },
            { name: 'Peresean Stick Game', image: '/map-images/ntb-peresean.jpg', description: 'Traditional martial arts duel.' },
            { name: 'Sendratari Perang Topat', image: '/map-images/ntb-topat.jpg', description: 'Cultural sword-and-shield dance.' }
          ]
        }
      },
      culinary: {
        ...categoryThemes.culinary,
        description: 'Seafood, spicy sambal matah, and local porridge.',
        content: {
          introduction: 'Taste fresh catches, zesty sambal, and corn porridge.',
          items: [
            { name: 'Plecing Kangkung', image: '/map-images/ntb-plecing.jpeg', description: 'Water spinach in spicy chili dressing.' },
            { name: 'Sate Rembiga', image: '/map-images/ntb-rembiga.jpg', description: 'Fatty spicy beef satay from Lombok.' },
            { name: 'Peuyeum', image: '/map-images/ntb-peuyeum.jpg', description: 'Sweet fermented cassava snack.' }
          ]
        }
      }
    }
  ],
  [
    'Nusa Tenggara Timur',
    {
      tourism: {
        ...categoryThemes.tourism,
        description: 'Komodo dragons, pink beaches, and diving.',
        content: {
          introduction: 'Discover Komodo, 17 Pink Beach, and Labuan Bajo vistas.',
          items: [
            { name: 'Komodo National Park', image: '/map-images/ntt-komodo.jpg', description: 'Home of the Komodo dragon and marine life.' },
            { name: 'Pink Beach', image: '/map-images/ntt-pinkbeach.jpg', description: 'Unique rose-tinted sand beach.' },
            { name: 'Padar Island', image: '/map-images/ntt-padar.jpg', description: 'Iconic viewpoint of turquoise bays.' }
          ]
        }
      },
      artCulture: {
        ...categoryThemes.artCulture,
        description: 'Manggarai weaving and rituals.',
        content: {
          introduction: 'Experience traditional textiles and cultural ceremonies.',
          items: [
            { name: 'Tenun Ikat NTT', image: '/map-images/ntt-tenun.jpg', description: 'Colorful handwoven fabrics.' },
            { name: 'Caci Whip Dance', image: '/map-images/ntt-caci.jpg', description: 'Warrior stick-fighting dance from Manggarai.' },
            { name: 'Sasando Performance', image: '/map-images/ntt-sasando.jpg', description: 'Traditional stringed instrument music.' }
          ]
        }
      },
      culinary: {
        ...categoryThemes.culinary,
        description: 'Seafood, jagung bose, and traditional cakes.',
        content: {
          introduction: 'Enjoy fresh seafood, corn stew, and NTT specialties.',
          items: [
            { name: 'Jagung Bose', image: '/map-images/ntt-jagung.webp', description: 'Savory corn and beef stew.' },
            { name: 'Ikan Kuah Asam', image: '/map-images/ntt-ikanas.jpg', description: 'Sour fish soup with tamarind.' },
            { name: 'Nagasari', image: '/map-images/ntt-nagasari.jpg', description: 'Sweet rice cake filled with banana.' }
          ]
        }
      }
    }
  ],

  // Pulau Kalimantan
  [
    'Kalimantan Utara',
    {
      tourism: {
        ...categoryThemes.tourism,
        description: 'Mangrove forests, lakes, and coastal wildlife.',
        content: {
          introduction: 'Discover North Kalimantan’s untouched nature along the coast and lakes.',
          items: [
            { name: 'Derawan Islands', image: '/map-images/kaltara-derawan.jpg', description: 'Pristine marine life and diving sites.' },
            { name: 'Maratua Island', image: '/map-images/kaltara-maratua.webp', description: 'Remote paradise for snorkeling.' },
            { name: 'Tidung Island', image: '/map-images/kaltara-tidung.jpg', description: 'Famous for “Love Bridge” and coastal scenery.' }
          ]
        }
      },
      artCulture: {
        ...categoryThemes.artCulture,
        description: 'Dayak and coastal tribal traditions.',
        content: {
          introduction: 'Experience local rituals, carving traditions, and cultural ceremonies.',
          items: [
            { name: 'Dayak Carving', image: '/map-images/kaltara-carving.webp', description: 'Wooden motifs from indigenous Dayak culture.' },
            { name: 'Tidung Weaving', image: '/map-images/kaltara-weaving.jpg', description: 'Traditional textiles of coastal tribes.' },
            { name: 'Traditional Rituals', image: '/map-images/kaltara-ritual.jpg', description: 'Ceremonies including blessing of the sea.' }
          ]
        }
      },
      culinary: {
        ...categoryThemes.culinary,
        description: 'Fresh seafood, sago, and spices.',
        content: {
          introduction: 'Savor coastal dishes made from fish, sago, and local produce.',
          items: [
            { name: 'Ikan Bakar Tilapia', image: '/map-images/kaltara-ikanbakar.jpg', description: 'Grilled tilapia with local spices.' },
            { name: 'Papeda', image: '/map-images/kaltara-papeda.jpg', description: 'Sago porridge served with fish soup.' },
            { name: 'Sagu Lempeng', image: '/map-images/kaltara-sagu.jpg', description: 'Crunchy sago cracker snack.' }
          ]
        }
      }
    }
  ],
  [
    'Kalimantan Barat',
    {
      tourism: {
        ...categoryThemes.tourism,
        description: 'Rainforests, eye waterfalls, and cultural villages.',
        content: {
          introduction: 'Explore Danau Sentarum, Lanjak, and ethnic Dayak communities.',
          items: [
            { name: 'Danau Sentarum', image: '/map-images/kalbar-sentarum.jpg', description: 'Seasonal lake with diverse wildlife.' },
            { name: 'Lanjak Island', image: '/map-images/kalbar-lanjak.jpeg', description: 'Floating forest on the Kapuas River.' },
            { name: 'Singkawang City', image: '/map-images/kalbar-singkawang.jpg', description: 'Cultural hub of Chinese traditions.' }
          ]
        }
      },
      artCulture: {
        ...categoryThemes.artCulture,
        description: 'Dayak longhouse, ceremonies, and festivals.',
        content: {
          introduction: 'Visit traditional longhouses and witness tribal dances and ceremonies.',
          items: [
            { name: 'Dayak Longhouse', image: '/map-images/kalbar-longhouse.jpg', description: 'Communal wooden longhouse village.' },
            { name: 'Gawai Festival', image: '/map-images/kalbar-gawai.jpg', description: 'Harvest celebration of Dayak people.' },
            { name: 'Singkawang Cap Go Meh', image: '/map-images/kalbar-capgomeh.jpg', description: 'Chinese temple festival with lanterns.' }
          ]
        }
      },
      culinary: {
        ...categoryThemes.culinary,
        description: 'Asian fusion, sago cakes, and freshwater fish.',
        content: {
          introduction: 'Experience a blend of Malay, Dayak and Chinese flavors.',
          items: [
            { name: 'Mie Lethek', image: '/map-images/kalbar-mie.webp', description: 'Traditional black noodle dish.' },
            { name: 'Sagu Lempok', image: '/map-images/kalbar-lempok.png', description: 'Sago cake with palm sugar.' },
            { name: 'Ikan Patin Kuah Asam', image: '/map-images/kalbar-ikanas.jpg', description: 'Tangy fish soup with Patin fish.' }
          ]
        }
      }
    }
  ],
  [
    'Kalimantan Timur',
    {
      tourism: {
        ...categoryThemes.tourism,
        description: 'Balikpapan coast, mangroves, and lakes.',
        content: {
          introduction: 'Relax at beaches, explore Derawan, and visit cultural sites.',
          items: [
            { name: 'Derawan Islands', image: '/map-images/kaltim-derawan.jpg', description: 'Snorkeling and marine biodiversity.' },
            { name: 'Samarinda Mahakam River', image: '/map-images/kaltim-mahakam.jpg', description: 'Riverside life and Dayak culture.' },
            { name: 'Mangrove Tour', image: '/map-images/kaltim-mangrove.jpg', description: 'Explore coastal ecosystems near Balikpapan.' }
          ]
        }
      },
      artCulture: {
        ...categoryThemes.artCulture,
        description: 'Dayak sculpting, weaving, and funeral ceremonies.',
        content: {
          introduction: 'Discover wood carving, textiles, and traditional rituals.',
          items: [
            { name: 'Dayak Carved Canoe', image: '/map-images/kaltim-canoe.jpg', description: 'Intricately carved wooden boat.' },
            { name: 'Tenun Samarinda', image: '/map-images/kaltim-tenun.jpg', description: 'Colorful Dayak woven cloth.' },
            { name: 'Tiwah Ceremony', image: '/map-images/kaltim-tiwah.jpg', description: 'Traditional Dayak death ritual.' }
          ]
        }
      },
      culinary: {
        ...categoryThemes.culinary,
        description: 'Jungle fruits, freshwater dishes, local honey.',
        content: {
          introduction: 'Enjoy flavors from the forest and river traditions.',
          items: [
            { name: 'Sagu Lempuk', image: '/map-images/kaltim-sagu.webp', description: 'Sago cake with coconut.' },
            { name: 'Gabus Pucung', image: '/map-images/kaltim-gabus.jpg', description: 'Snakehead fish in dark soy broth.' },
            { name: 'Madu Hutan', image: '/map-images/kaltim-honey.jpg', description: 'Forest honey from East Kalimantan.' }
          ]
        }
      }
    }
  ],
  [
    'Kalimantan Tengah',
    {
      tourism: {
        ...categoryThemes.tourism,
        description: 'Tropical jungles, lakes, and Dayak wildlife.',
        content: {
          introduction: 'Explore Tanjung Puting, Sebangau, and lake ecosystems.',
          items: [
            { name: 'Tanjung Puting NP', image: '/map-images/kalteng-tanjung.webp', description: 'Orangutan sanctuary in lush forests.' },
            { name: 'Lake Sembuluh', image: '/map-images/kalteng-sembuluh.jpg', description: 'Scenic lake surrounded by jungles.' },
            { name: 'Sebangau Peatlands', image: '/map-images/kalteng-sebangau.jpg', description: 'Unique peat swamp ecosystem.' }
          ]
        }
      },
      artCulture: {
        ...categoryThemes.artCulture,
        description: 'Dayak dances, crafts, and river rituals.',
        content: {
          introduction: 'Witness traditional Dayak art forms and boat ceremonies.',
          items: [
            { name: 'Dayak Boat Race', image: '/map-images/kalteng-boat.jpg', description: 'River race during cultural festivals.' },
            { name: 'Dayak Textile', image: '/map-images/kalteng-textile.jpg', description: 'Handwoven textiles with symbolic patterns.' },
            { name: 'Tatung Mask Dance', image: '/map-images/kalteng-dance.jpg', description: 'Spiritual dance using masks.' }
          ]
        }
      },
      culinary: {
        ...categoryThemes.culinary,
        description: 'Forest ingredients, river fish, sago.',
        content: {
          introduction: 'Taste specialties from the river and jungle regions.',
          items: [
            { name: 'Leumeong', image: '/map-images/kalteng-leumeong.jpg', description: 'Forest herb soup.' },
            { name: 'Pepes Dawet', image: '/map-images/kalteng-pepes.jpg', description: 'Banana leaf-wrapped fish dish.' },
            { name: 'Sagu Sari', image: '/map-images/kalteng-sagusari.avif', description: 'Sago cake with palm sugar.' }
          ]
        }
      }
    }
  ],
  [
    'Kalimantan Selatan',
    {
      tourism: {
        ...categoryThemes.tourism,
        description: 'River life, floating markets, Banjarmasin culture.',
        content: {
          introduction: 'Explore Martapura, floating markets, and stilt architecture.',
          items: [
            { name: 'Lok Baintan Floating Market', image: '/map-images/kalsel-lokbaintan.jpg', description: 'Morning market on the Barito River.' },
            { name: 'Martapura Diamond Town', image: '/map-images/kalsel-martapura.jpg', description: 'Famous for sapphires and gemstone crafts.' },
            { name: 'Banjar Traditional Village', image: '/map-images/kalsel-village.jpg', description: 'Stilt houses and cultural museum.' }
          ]
        }
      },
      artCulture: {
        ...categoryThemes.artCulture,
        description: 'Banjar music, wood carving, and river traditions.',
        content: {
          introduction: 'Discover traditional songs, carving styles, and boat rituals.',
          items: [
            { name: 'Taruntung Dance', image: '/map-images/kalsel-taruntung.jpg', description: 'Welcome dance performed by Banjar dancers.' },
            { name: 'Banjar Wood Carving', image: '/map-images/kalsel-carving.jpg', description: 'Intricate carvings on door panels.' },
            { name: 'Maulid Boat Parade', image: '/map-images/kalsel-boatparade.webp', description: 'Decorated boat procession on the river.' }
          ]
        }
      },
      culinary: {
        ...categoryThemes.culinary,
        description: 'Soto Banjar, ketupat kandangan, and river fish dishes.',
        content: {
          introduction: 'Taste Banjar specialties influenced by river lifestyle.',
          items: [
            { name: 'Soto Banjar', image: '/map-images/kalsel-sotobanjar.jpg', description: 'Chicken soup with lime and spices.' },
            { name: 'Ketupat Kandangan', image: '/map-images/kalsel-ketupat.png', description: 'Rice cake with spicy fish gravy.' },
            { name: 'Iwak Pakasam', image: '/map-images/kalsel-pakasam.jpg', description: 'Fermented fish snack.' }
          ]
        }
      }
    }
  ],

  // Pulau Sulawesi
  [
    'Sulawesi Utara',
    {
      tourism: {
        ...categoryThemes.tourism,
        description: 'Coral reefs, volcanoes, and islands.',
        content: {
          introduction: 'Visit Bunaken, Klabat Mountain, and nature reservation.',
          items: [
            { name: 'Bunaken Marine Park', image: '/map-images/sulut-bunaken.webp', description: 'World-class diving with vibrant coral.' },
            { name: 'Mount Klabat', image: '/map-images/sulut-klabat.jpg', description: 'Scenic volcano near Manado.' },
            { name: 'Tangkoko Nature Reserve', image: '/map-images/sulut-tangkoko.jpg', description: 'Home to tarsiers and black macaques.' }
          ]
        }
      },
      artCulture: {
        ...categoryThemes.artCulture,
        description: 'Minahasa music, ceremonies, and crafts.',
        content: {
          introduction: 'Experience waruga stone graves and traditional dances.',
          items: [
            { name: 'Maengket Dance', image: '/map-images/sulut-maengket.png', description: 'Traditional Minahasa ceremonial dance.' },
            { name: 'Waruga Ancient Tombs', image: '/map-images/sulut-waruga.jpg', description: 'Stone sarcophagi of Minahasa ancestors.' },
            { name: 'Sasando Performance', image: '/map-images/sulut-sasando.jpg', description: 'Stringed instrument show adapted in Sulawesi.' }
          ]
        }
      },
      culinary: {
        ...categoryThemes.culinary,
        description: 'vegetable porridge, fruit, coconut dishes.',
        content: {
          introduction: 'Savor tinutuan, fruit, and unique coconut tart.',
          items: [
            { name: 'Tinutuan', image: '/map-images/sulut-tinutuan.jpg', description: 'Manado rice porridge with vegetables.' },
            { name: 'Paniki', image: '/map-images/sulut-paniki.jpg', description: 'A local bat (fruit bat) dish.' },
            { name: 'Klappertaart', image: '/map-images/sulut-klappertaart.jpeg', description: 'Dutch-influenced coconut tart.' }
          ]
        }
      }
    }
  ],
  [
    'Gorontalo',
    {
      tourism: {
        ...categoryThemes.tourism,
        description: 'Limestone hills, lakes, and underwater life.',
        content: {
          introduction: 'Explore Lake Limboto, Saronde Island, and caves.',
          items: [
            { name: 'Saronde Island', image: '/map-images/gorontalo-saronde.jpg', description: 'Island with white sand and blue sea.' },
            { name: 'Lake Limboto', image: '/map-images/gorontalo-limboto.jpg', description: 'Large volcanic lake near Gorontalo city.' },
            { name: 'Pindul Cave', image: '/map-images/gorontalo-caves.jpg', description: 'Limestone cave formations on the river.' }
          ]
        }
      },
      artCulture: {
        ...categoryThemes.artCulture,
        description: 'Gorontalo traditions.',
        content: {
          introduction: 'Discover traditional dance and culture.',
          items: [
            { name: 'Tidi Lo O Ayabu Dance', image: '/map-images/gorontalo-tidi.webp', description: 'Gorontalo welcoming dance.' },
            { name: 'Karawo Embroidery', image: '/map-images/gorontalo-karawo.jpg', description: 'Handcrafted Gorontalo lacework.' },
            { name: 'Tumbilotohe Tradition', image: '/map-images/gorontalo-ritual.jpg', description: 'Night lights tradition.' }
          ]
        }
      },
      culinary: {
        ...categoryThemes.culinary,
        description: 'Spicy fish, coconut-based stews, local snacks.',
        content: {
          introduction: 'Taste woku fish, lalampa, and snacks.',
          items: [
            { name: 'Ikan Woku', image: '/map-images/gorontalo-woku.jpg', description: 'Spicy fish stew with local herbs.' },
            { name: 'Lalampa', image: '/map-images/gorontalo-lalampa.webp', description: 'Sticky rice wrapped in coconut leaf.' },
            { name: 'Popolulu Snack', image: '/map-images/gorontalo-popolulu.jpeg', description: 'Red sweet potato balls.' }
          ]
        }
      }
    }
  ],
  [
    'Sulawesi Tengah',
    {
      tourism: {
        ...categoryThemes.tourism,
        description: 'Island, lakes, and mountain landscapes.',
        content: {
          introduction: 'Visit Palu, Lore Lindu, and Togean islands.',
          items: [
            { name: 'Lore Lindu NP', image: '/map-images/sulteng-lore.jpg', description: 'Lake and rainforests with endemic species.' },
            { name: 'Palu Bay', image: '/map-images/sulteng-palu.jpg', description: 'Coastal city framed by mountains.' },
            { name: 'Togean Islands', image: '/map-images/sulteng-togean.jpg', description: 'Remote karst islands with clear waters.' }
          ]
        }
      },
      artCulture: {
        ...categoryThemes.artCulture,
        description: 'Kulawi dances, woven textiles, and rituals.',
        content: {
          introduction: 'Experience dance, textiles, and local traditions.',
          items: [
            { name: 'Kulawi Dance', image: '/map-images/sulteng-kulawi.jpg', description: 'Traditional dance from Palu area.' },
            { name: 'Donggala Woven Cloth', image: '/map-images/sulteng-donggala.webp', description: 'Handwoven cloth used in ceremonies.' },
            { name: 'Dero Circle Dance', image: '/map-images/sulteng-dero.jpeg', description: 'Mass folk dance from Kulawi.' }
          ]
        }
      },
      culinary: {
        ...categoryThemes.culinary,
        description: 'Bone soup, coconut, and local snack',
        content: {
          introduction: 'Enjoy jungle-to-table dishes.',
          items: [
            { name: 'Kaledo', image: '/map-images/sulteng-kaledo.jpg', description: 'Beef leg bone soup cooked with rich spices.' },
            { name: 'Uta Dada', image: '/map-images/sulteng-utadada.jpg', description: 'Thick coconut milk sauce with chicken or fish.' },
            { name: 'Lalampa', image: '/map-images/sulteng-lalampa.jpg', description: 'Snacks from sticky rice filled with shredded meat.' }
          ]
        }
      }
    }
  ],
  [
    'Sulawesi Barat',
    {
      tourism: {
        ...categoryThemes.tourism,
        description: 'Beaches, islands, and marine life.',
        content: {
          introduction: 'Explore marine islands of West Sulawesi.',
          items: [
            { name: 'Gusung Island', image: '/map-images/sulbar-gusung.jpg', description: 'The outermost island in the western part.' },
            { name: 'Karampuang Island', image: '/map-images/sulbar-karampuang.webp', description: 'Island with clear water and coral reef.' }
          ]
        }
      },
      artCulture: {
        ...categoryThemes.artCulture,
        description: 'Ethnic dances and ceremonies.',
        content: {
          introduction: 'Traditional boat parades and dances.',
          items: [
            { name: 'Sandeq Boat Race', image: '/map-images/sulbar-sandeq.jpg', description: 'Traditional boat racing event.' },
            { name: 'Tari Kande-kande', image: '/map-images/sulbar-kande.jpg', description: 'Welcome dance from Tolandona people.' },
            { name: 'Kacaping', image: '/map-images/sulbar-kacaping.jpeg', description: 'A musical instrument shaped like a boat.' }
          ]
        }
      },
      culinary: {
        ...categoryThemes.culinary,
        description: 'Seafood and snacks.',
        content: {
          introduction: 'Taste grilled fish and local snack.',
          items: [
            { name: 'Ikan Bakar Sambal Dabu', image: '/map-images/sulbar-ikan.jpg', description: 'Grilled fish with dabu-dabu sambal.' },
            { name: 'Jepa', image: '/map-images/sulbar-jepa.jpg', description: 'Traditional cake made from sweet potato.' }
          ]
        }
      }
    }
  ],
  [
    'Sulawesi Selatan',
    {
      tourism: {
        ...categoryThemes.tourism,
        description: 'Toraja highlands, beaches, and cultural architecture.',
        content: {
          introduction: 'Visit Toraja burial sites, beaches, and colonial.',
          items: [
            { name: 'Tana Toraja', image: '/map-images/sulsel-toraja.jpg', description: 'Ancient cliff-side burial tombs.' },
            { name: 'Losari Beach', image: '/map-images/sulsel-losari.jpg', description: 'Iconic sunset promenade in Makassar.' },
            { name: 'Samalona Island', image: '/map-images/sulsel-samalona.jpg', description: 'Small island near Makassar for snorkeling.' }
          ]
        }
      },
      artCulture: {
        ...categoryThemes.artCulture,
        description: 'Toraja carving, Pa’Dende’ dance, and weaving.',
        content: {
          introduction: 'Experience traditional Toraja architecture and rituals.',
          items: [
            { name: 'Pa’Dende’ Dance', image: '/map-images/sulsel-padende.jpg', description: 'Torajan dance performed at ceremonies.' },
            { name: 'Tongkonan House', image: '/map-images/sulsel-tongkonan.jpg', description: 'Traditional Toraja home with boat roof.' },
            { name: 'Toraja Weaving', image: '/map-images/sulsel-weaving.jpg', description: 'Intricate cloth with symbolic patterns.' }
          ]
        }
      },
      culinary: {
        ...categoryThemes.culinary,
        description: 'Coto Makassar, Pallubasa, and Konro.',
        content: {
          introduction: 'Savor rich meat soups and coastal specialties.',
          items: [
            { name: 'Coto Makassar', image: '/map-images/sulsel-coto.jpg', description: 'Beef soup with peanut sauce.' },
            { name: 'Pallubasa', image: '/map-images/sulsel-pallubasa.jpeg', description: 'Creamy beef offal soup.' },
            { name: 'Konro', image: '/map-images/sulsel-konro.jpg', description: 'Spiced beef rib soup.' }
          ]
        }
      }
    }
  ],
  [
    'Sulawesi Tenggara',
    {
      tourism: {
        ...categoryThemes.tourism,
        description: 'National park and waterfall.',
        content: {
          introduction: 'Visit Wakatobi and waterfalls.',
          items: [
            { name: 'Wakatobi National Park', image: '/map-images/sultenggara-wakatobi.jpg', description: 'UNESCO marine biodiversity site.' },
            { name: 'Moramo Waterfall', image: '/map-images/sultenggara-moramo.jpeg', description: 'Scenic tiered waterfall in Konawe.' }
          ]
        }
      },
      artCulture: {
        ...categoryThemes.artCulture,
        description: 'Bajo sea nomads and boat culture.',
        content: {
          introduction: 'Explore stilt villages and traditional fisheries lifestyles.',
          items: [
            { name: 'Bajo Sea Tribe Village', image: '/map-images/sultenggara-bajo.jpg', description: 'Community living on stilts.' },
            { name: 'Boat Building Tradition', image: '/map-images/sultenggara-boat.webp', description: 'Crafting wooden sailing vessels.' }
          ]
        }
      },
      culinary: {
        ...categoryThemes.culinary,
        description: 'Seafood and local snacks.',
        content: {
          introduction: 'Taste fresh tuna and local cakes.',
          items: [
            { name: 'Ikan Kuah Kuning', image: '/map-images/sultenggara-ikuah.jpeg', description: 'Yellow brothy fish soup.' },
            { name: 'Satay Pokea', image: '/map-images/sultenggara-satay.jpg', description: 'Satay made from freshwater mussels..' }
          ]
        }
      }
    }
  ],

  // Maluku
  [
    'Maluku Utara',
    {
      tourism: {
        ...categoryThemes.tourism,
        description: 'Spice islands, volcanic peaks, and marine biodiversity.',
        content: {
          introduction: 'Explore Ternate’s active volcano, pristine beaches, and historic forts.',
          items: [
            { name: 'Gamalama Volcano', image: '/map-images/malut-gamalama.webp', description: 'Active volcano overlooking Ternate.' },
            { name: 'Tidore Island', image: '/map-images/malut-tidore.jpg', description: 'Historic sultanate island and clove plantations.' },
            { name: 'Morotai Beaches', image: '/map-images/malut-morotai.jpg', description: 'Secluded beaches in North Maluku.' }
          ]
        }
      },
      artCulture: {
        ...categoryThemes.artCulture,
        description: 'Sultanate heritage, traditional cloth, and dance.',
        content: {
          introduction: 'Discover clove-era culture, Sultan’s palaces, and ceremonial textiles.',
          items: [
            { name: 'Ternate Palace', image: '/map-images/malut-palace.jpg', description: 'Historic sultan’s palace with ocean view.' },
            { name: 'Kain Tenun Maluku Utara', image: '/map-images/malut-tenun.jpg', description: 'Handwoven cloth with regional motifs.' },
            { name: 'Cakalele Dance', image: '/map-images/malut-cakalele.jpg', description: 'Warrior dance performed in ceremonies.' }
          ]
        }
      },
      culinary: {
        ...categoryThemes.culinary,
        description: 'Clove-flavored seafood, papeda, local snacks.',
        content: {
          introduction: 'Taste fresh fish, sago staples, and regional pastries.',
          items: [
            { name: 'Papeda with Yellow Fish Soup', image: '/map-images/malut-papeda.webp', description: 'Staple sago porridge served with spiced fish broth.' },
            { name: 'Gohu Ikan', image: '/map-images/malut-gohu.jpg', description: 'Raw tuna marinated in lime, basil, and chilies.' },
            { name: 'Kue Asida', image: '/map-images/malut-asida.webp', description: 'Sweet pudding-like pastry served during Ramadan.' }
          ]
        }
      }
    }
  ],
  [
    'Maluku',
    {
      tourism: {
        ...categoryThemes.tourism,
        description: 'Spice islands, coral reefs, and colonial architecture.',
        content: {
          introduction: 'Visit Banda Islands, dive coral gardens, and explore colonial forts.',
          items: [
            { name: 'Banda Islands', image: '/map-images/maluku-banda.jpg', description: 'Historic spice island with nutmeg plantations.' },
            { name: 'Ora Beach', image: '/map-images/maluku-ora.jpg', description: 'Secluded beach with crystal-clear water.' },
            { name: 'Fort Belgica', image: '/map-images/maluku-fortbelgica.jpg', description: '18th-century Dutch fortress on Banda.' }
          ]
        }
      },
      artCulture: {
        ...categoryThemes.artCulture,
        description: 'Colonial art, traditional music, and archipelago crafts.',
        content: {
          introduction: 'Experience Ambonese culture, church music, and colonial history.',
          items: [
            { name: 'Ambon Church Choirs', image: '/map-images/maluku-choir.jpg', description: 'Rich vocal heritage of local churches.' },
            { name: 'Traditional Shell Crafts', image: '/map-images/maluku-shell.jpg', description: 'Handmade accessories from sea shells.' },
            { name: 'Tifa Drumming', image: '/map-images/maluku-tifa.jpg', description: 'Percussion instrument integral to local music.' }
          ]
        }
      },
      culinary: {
        ...categoryThemes.culinary,
        description: 'Papeda, fish stews, sago desserts.',
        content: {
          introduction: 'Savor sago porridge, fish soups, and sweet sago cakes.',
          items: [
            { name: 'Papeda with Yellow Fish Soup', image: '/map-images/malut-papeda.webp', description: 'Staple sago porridge served with spiced fish broth.' },
            { name: 'Bubur Sagu Ubi', image: '/map-images/maluku-bubursagu.jpg', description: 'Sweet sago–potato porridge dessert.' }
          ]
        }
      }
    }
  ],

  // Papua
  [
    'Papua Barat',
    {
      tourism: {
        ...categoryThemes.tourism,
        description: 'Raja Ampat, marine wonders, and karst islands.',
        content: {
          introduction: 'Dive in Raja Ampat, kayak karst isles, and island-hop in vibrant seas.',
          items: [
            { name: 'Raja Ampat', image: '/map-images/papbar-rajaampat.jpg', description: 'World-class coral reefs and biodiversity.' },
            { name: 'Misool Island', image: '/map-images/papbar-misool.jpg', description: 'Remote karst island with lagoons.' },
            { name: 'Biak Beaches', image: '/map-images/papbar-biak.jpg', description: 'White-sand beaches and WWII relics.' }
          ]
        }
      },
      artCulture: {
        ...categoryThemes.artCulture,
        description: 'Papuan tribal art, ceremonies, and traditional housing.',
        content: {
          introduction: 'Visit local villages, see wood carvings, and ritual performances.',
          items: [
            { name: 'Arfak Village Traditions', image: '/map-images/papbar-arfak.jpg', description: 'Highland village cultural ceremonies.' },
            { name: 'Cendrawasih Dance', image: '/map-images/papbar-cendrawasih.jpg', description: 'Traditional bird-of-paradise dance.' },
            { name: 'Papuan Wood Carving', image: '/map-images/papbar-carving.png', description: 'Intricate tribal wooden sculptures.' }
          ]
        }
      },
      culinary: {
        ...categoryThemes.culinary,
        description: 'Seafood, sago, tropical fruits.',
        content: {
          introduction: 'Taste fresh catch, sago congee, and local forest fruits.',
          items: [
            { name: 'Papeda with Yellow Fish Soup', image: '/map-images/malut-papeda.webp', description: 'Staple sago porridge served with spiced fish broth.' },
            { name: 'Grilled Mackerel', image: '/map-images/papbar-mackerel.jpg', description: 'Fresh sea fish grilled with simple spices.' },
            { name: 'Sago Pancake', image: '/map-images/papbar-sagopancake.jpg', description: 'Snakefood sago snack from tree sago.' }
          ]
        }
      }
    }
  ],
  [
  'Papua',
    {
      tourism: {
        ...categoryThemes.tourism,
        description: 'Lorentz NP, highland snow, and deep jungles.',
        content: {
          introduction: 'Trek Puncak Jaya, explore Lorentz, spot birds-of-paradise.',
          items: [
            { name: 'Puncak Jaya (Carstensz)', image: '/map-images/papua-carstensz.png', description: 'Tropical snow-capped peak and highest in Oceania.' },
            { name: 'Lorentz National Park', image: '/map-images/papua-lorentz.jpg', description: 'World Heritage park with diverse ecosystems.' },
            { name: 'Teluk Cenderawasih', image: '/map-images/papua-cenderawasih.png', description: 'Largest marine national park with whale sharks.' }
          ]
        }
      },
      artCulture: {
        ...categoryThemes.artCulture,
        description: 'Stone age tribes, tribe rituals, wood art.',
        content: {
          introduction: 'Visit Dani villages, witness bakar batu and stone tool traditions.',
          items: [
            { name: 'Dani Tribe Village', image: '/map-images/papua-dani.webp', description: 'Highland community with traditional lifestyle.' },
            { name: 'Stone Age Carvings', image: '/map-images/papua-carvings.jpg', description: 'Ancient petroglyphs and wood carving.' },
            { name: 'Bakar Batu Ceremony', image: '/map-images/papua-bakarbatu.jpg', description: 'Traditional earth oven pig roast ritual.' }
          ]
        }
      },
      culinary: {
        ...categoryThemes.culinary,
        description: 'Sago, pork, forest yams, freshwater fish.',
        content: {
          introduction: 'Feast on bakar batu, sago porridge, and river catch.',
          items: [
            { name: 'Bakar Batu', image: '/map-images/papua-bakarbatu2.jpg', description: 'Stone-roasted pork and vegetables.' },
            { name: 'Papeda with Yellow Fish Soup', image: '/map-images/malut-papeda.webp', description: 'Staple sago porridge served with spiced fish broth.' },
            { name: 'Mountain Yam Dish', image: '/map-images/papua-yam.jpeg', description: 'Boiled sweet tubers from highlands.' }
          ]
        }
      }
    }
  ]
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