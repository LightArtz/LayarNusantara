import Layout from "@/components/layout/layout"
import StoryDetailContent from "./story-detail-content"
import { notFound } from "next/navigation"

// Complete story data for all stories with unique images
async function getStoryById(id: string) {
  const stories = [
    {
      id: "1",
      title: "Dawn of the Sea Wanderers",
      subtitle: "Where the Ocean Meets the Soul",
      content: `
        <p>The boat gently rocked as the first rays of sunlight painted the horizon in shades of gold and crimson. Below us, a world of wonder awaited—coral gardens that have thrived for millennia, schools of fish that move like living rainbows, and the gentle giants of the sea that call these waters home.</p>

        <p>Raja Ampat, known as the "Four Kings," is more than just a diving destination—it's a sanctuary where nature has been allowed to flourish in its purest form. As I descended into the crystal-clear waters, I was immediately struck by the sheer abundance of life that surrounded me.</p>

        <h2>The Underwater Cathedral</h2>
        
        <p>The coral formations here are unlike anything I've ever seen. Massive table corals stretch out like underwater plateaus, their surfaces teeming with colorful fish that dart in and out of the shadows. Soft corals sway gently in the current, their vibrant purples, oranges, and yellows creating a living tapestry that changes with every movement of the water.</p>

        <p>But it's not just the corals that make Raja Ampat special—it's the incredible diversity of marine life. In a single dive, I encountered schools of barracuda that moved like silver tornadoes, graceful manta rays that glided overhead like underwater angels, and tiny pygmy seahorses that clung to fan corals with delicate precision.</p>

        <h2>The People of the Sea</h2>

        <p>What truly made this journey unforgettable, however, were the people I met along the way. The local Papuan communities have been the guardians of these waters for generations, and their deep connection to the sea is evident in everything they do.</p>

        <p>I spent an evening with a local fisherman named Yosef, who taught me about the traditional sasi system—a customary law that regulates fishing practices to ensure the sustainability of marine resources. As we sat on the beach watching the sunset, he shared stories passed down through generations about the spirits of the sea and the importance of living in harmony with nature.</p>

        <h2>A Moment of Reflection</h2>

        <p>On my final morning in Raja Ampat, I woke before dawn and made my way to a small hill overlooking the bay. As the sun rose, painting the sky in brilliant oranges and pinks, I watched as the sea came alive with the sounds of dolphins playing in the distance and birds diving for their morning catch.</p>

        <p>In that moment, I realized that Raja Ampat had given me something far more valuable than just beautiful photographs or exciting dive stories. It had reminded me of the incredible beauty and fragility of our natural world, and the responsibility we all have to protect it for future generations.</p>

        <p>As I prepared to leave this underwater paradise, I made a promise to myself—and to the sea—that I would return, not just as a visitor, but as an advocate for the conservation of these precious waters. Because some places are too beautiful, too important, to lose.</p>
      `,
      author: {
        name: "Amara Sari",
        avatar: "/travel-stories/1-avatar.jpeg",
        bio: "Marine biologist & underwater photographer",
        location: "Jakarta, Indonesia",
        social: {
          instagram: "@amarasari_marine",
          website: "www.amarasari.com",
        },
      },
      coverImage: "/travel-stories/1-cover.jpg",
      images: [
        "/travel-stories/1-1.jpg",
        "/travel-stories/1-2.jpg",
        "/travel-stories/1-3.jpg",
        "/travel-stories/1-4.jpg",
      ],
      location: "Raja Ampat, Papua Barat",
      readTime: 8,
      publishedAt: "2024-01-15",
      tags: ["Marine Life", "Adventure", "Photography", "Conservation"],
      featured: true,
    },
    {
      id: "2",
      title: "Whispers of Ancient Stones",
      subtitle: "A Journey Through Time at Borobudur",
      content: `
        <p>The pre-dawn air was crisp and filled with anticipation as I made my way through the darkness toward the ancient temple of Borobudur. Around me, fellow pilgrims and travelers moved in hushed reverence, all drawn by the promise of witnessing one of the world's most spectacular sunrises over this 8th-century Buddhist monument.</p>

        <p>As the first light began to creep across the horizon, the massive stone structure slowly emerged from the shadows like a sleeping giant awakening. The intricate carvings that adorned every surface seemed to come alive in the golden light, telling stories that have been whispered by these stones for over a thousand years.</p>

        <h2>A Monument to Faith</h2>
        
        <p>Borobudur is more than just a temple—it's a three-dimensional mandala, a spiritual journey carved in stone. As I climbed the terraced levels, each step felt like a meditation, a movement closer to enlightenment. The 2,672 relief panels that line the galleries depict the life of Buddha and the path to nirvana, creating the world's largest Buddhist narrative in stone.</p>

        <p>What struck me most was the incredible attention to detail. Every carving, every Buddha statue, every decorative element had been crafted with such precision and devotion. The artisans who created this masterpiece weren't just building a monument—they were creating a sacred space where the physical and spiritual worlds could meet.</p>

        <h2>The Wisdom of Stones</h2>

        <p>As I sat among the bell-shaped stupas at the temple's summit, watching the sun paint the surrounding landscape in shades of gold and amber, I felt a profound connection to the countless pilgrims who had made this same journey over the centuries. The stones seemed to whisper their stories—tales of devotion, artistry, and the eternal human quest for meaning.</p>

        <p>A local guide named Pak Slamet shared with me the legend of how Borobudur was built. According to tradition, the temple was constructed not just by human hands, but with the help of celestial beings who worked through the night. Whether or not one believes such tales, there's something undeniably magical about this place that transcends rational explanation.</p>

        <h2>Sunrise Revelation</h2>

        <p>As the sun finally broke free from the horizon, casting its first rays across the temple's ancient stones, I understood why Borobudur has captivated visitors for generations. This isn't just a tourist destination—it's a place of pilgrimage, a testament to human creativity and spiritual aspiration.</p>

        <p>The experience taught me that some journeys are not about reaching a destination, but about the transformation that occurs along the way. Borobudur reminded me that in our fast-paced modern world, there's still value in slowing down, in contemplation, and in connecting with something greater than ourselves.</p>

        <p>As I descended the temple steps, I carried with me not just photographs and memories, but a renewed sense of wonder and a deeper appreciation for the wisdom that can be found in ancient stones and timeless traditions.</p>
      `,
      author: {
        name: "Maya Putri",
        avatar: "/travel-stories/2-avatar.jpeg",
        bio: "Cultural historian & travel writer",
        location: "Yogyakarta, Indonesia",
        social: {
          instagram: "@mayaputri_culture",
          website: "www.mayaputri.com",
        },
      },
      coverImage: "/hero-2.jpeg",
      images: [
        "/travel-stories/2-1.jpeg",
        "/travel-stories/2-2.jpeg",
        "/travel-stories/2-3.jpeg",
        "/travel-stories/2-4.jpeg",
      ],
      location: "Borobudur, Jawa Tengah",
      readTime: 6,
      publishedAt: "2024-01-10",
      tags: ["Culture", "History", "Spirituality"],
      featured: true,
    },
    {
      id: "3",
      title: "The Emerald Heart of Borneo",
      subtitle: "Into the Wild Unknown",
      content: `
        <p>The sound of the boat engine faded into the distance as we entered the heart of Tanjung Puting National Park. Around us, the ancient rainforest of Kalimantan stretched endlessly, its emerald canopy hiding secrets that have remained unchanged for millions of years. This was my first step into one of the world's last great wildernesses, and I could feel the weight of its primordial presence.</p>

        <p>The air was thick with humidity and alive with the sounds of countless creatures. Every breath felt like inhaling life itself—rich, green, and teeming with possibilities. Our guide, a local Dayak man named Budi, navigated the winding river with the ease of someone who had grown up in these waters, reading the forest like an open book.</p>

        <h2>Meeting the Forest's Gentle Giants</h2>
        
        <p>Nothing could have prepared me for my first encounter with a wild orangutan. As we approached the feeding platform at Camp Leakey, a magnificent female swung down from the canopy with her infant clinging to her back. The intelligence in her eyes was unmistakable—this was no mere animal, but a fellow being with thoughts, emotions, and a complex social life.</p>

        <p>Dr. Biruté Galdikas, the renowned primatologist who established this research station, once said that orangutans are "people of the forest," and watching them in their natural habitat, I understood exactly what she meant. Their gentle movements, their careful consideration of each branch before swinging, their tender care for their young—everything spoke of a deep wisdom that comes from millions of years of evolution in perfect harmony with their environment.</p>

        <h2>The Symphony of the Rainforest</h2>

        <p>As night fell over the forest, a completely different world awakened. The darkness was filled with a symphony of sounds—the haunting calls of proboscis monkeys, the rustle of nocturnal creatures moving through the undergrowth, and the distant splash of crocodiles sliding into the river. Lying in my simple accommodation at the research station, I felt like I was sleeping in the heart of life itself.</p>

        <p>Budi taught me to identify the different calls and sounds of the forest. The deep, resonant call of the male orangutan establishing his territory, the chattering of long-tailed macaques, and the melodic songs of countless bird species. Each sound was a thread in the complex tapestry of rainforest life, a reminder that this ecosystem has been perfecting itself for eons.</p>

        <h2>A Fragile Paradise</h2>

        <p>But this paradise is under threat. During our journey, we passed areas where the forest had been cleared for palm oil plantations, leaving behind a scarred landscape that bore little resemblance to the lush wilderness we had just experienced. The contrast was heartbreaking—from the vibrant, living forest to empty, silent fields in the span of just a few kilometers.</p>

        <p>The orangutans, once numbering in the hundreds of thousands, now survive in fragmented populations. Each individual I encountered represented not just a magnificent creature, but a symbol of resilience in the face of an uncertain future. Their survival depends on our ability to find a balance between human needs and environmental preservation.</p>

        <h2>Carrying the Forest Forward</h2>

        <p>As I prepared to leave Tanjung Puting, I realized that I was taking more than just memories with me. I was carrying a responsibility—to share the story of this incredible place and its inhabitants, to help others understand what we stand to lose if we don't act to protect these last wild spaces.</p>

        <p>The emerald heart of Borneo had shown me what the world was like before humans dominated every landscape. It reminded me that we are not separate from nature, but part of it, and that our fate is inextricably linked to the health of these ancient forests and the creatures that call them home.</p>

        <p>In the end, my journey to Kalimantan was more than just a wildlife adventure—it was a pilgrimage to one of the last places on Earth where the wild still reigns supreme, and a reminder of our responsibility to ensure that future generations will have the chance to experience this magic for themselves.</p>
      `,
      author: {
        name: "David Chen",
        avatar: "/travel-stories/3-avatar.jpeg",
        bio: "Wildlife photographer & conservationist",
        location: "Singapore",
        social: {
          instagram: "@davidchen_wild",
          website: "www.davidchenwildlife.com",
        },
      },
      coverImage: "/travel-stories/3-cover.jpeg",
      images: [
        "/travel-stories/3-1.jpeg",
        "/travel-stories/3-2.jpeg",
        "/travel-stories/3-3.jpeg",
        "/travel-stories/3-4.jpeg",
      ],
      location: "Tanjung Puting, Kalimantan",
      readTime: 10,
      publishedAt: "2024-01-05",
      tags: ["Wildlife", "Conservation", "Adventure"],
      featured: true,
    },
    {
      id: "4",
      title: "Flavors of Padang Streets",
      subtitle: "A Culinary Journey Through Minangkabau Heritage",
      content: `
        <p>The aroma hit me before I even stepped off the bus in Padang—a complex symphony of spices, coconut milk, and chili that seemed to permeate every corner of this vibrant Sumatran city. This was my introduction to the culinary capital of West Sumatra, where the legendary Padang cuisine was born and continues to evolve in the hands of passionate cooks and street food vendors.</p>

        <p>Padang food, or Masakan Padang, is renowned throughout Indonesia and beyond for its bold flavors and rich, complex spice blends. But experiencing it in its birthplace, surrounded by the rolling hills of Minangkabau land and the warm hospitality of its people, was something entirely different from any Padang restaurant I had visited elsewhere.</p>

        <h2>The Art of Rendang</h2>
        
        <p>My first stop was a small warung run by Ibu Sari, a third-generation cook whose rendang recipe had been passed down through her family for over a century. As she showed me the intricate process of preparing this iconic dish, I began to understand that rendang is more than just food—it's a cultural artifact, a symbol of Minangkabau identity.</p>

        <p>The process is meditative and requires patience. The beef is slowly cooked in coconut milk and a paste of ground spices including galangal, turmeric, lemongrass, garlic, shallots, ginger, and chilies. As the hours pass, the liquid gradually reduces, and the meat absorbs all the flavors, becoming tender and deeply aromatic. The final result is a dish that UNESCO has recognized as an Intangible Cultural Heritage of Humanity.</p>

        <h2>Street Food Adventures</h2>

        <p>The real adventure began when I ventured into Padang's bustling street food scene. At Pasar Raya, the city's main market, I discovered a world of flavors I never knew existed. There was sate Padang with its distinctive yellow sauce, gulai tunjang (beef tendon curry), and dendeng balado (spicy dried beef) that packed a fiery punch.</p>

        <p>One of my most memorable encounters was with Pak Ahmad, a vendor who had been selling nasi kapau for over 30 years. His small stall was always crowded with locals who came for his legendary gulai kepala ikan (fish head curry) and his perfectly spiced rendang. Watching him serve customers with lightning speed, ladling various curries over steaming rice, was like watching a master artist at work.</p>

        <h2>The Philosophy of Flavor</h2>

        <p>What struck me most about Padang cuisine was its philosophy. Every dish tells a story, often reflecting the values and traditions of Minangkabau culture. The use of coconut milk represents abundance and prosperity, while the complex spice blends reflect the region's history as a trading hub where spices from across the archipelago converged.</p>

        <p>Ibu Ratna, a cooking teacher who invited me into her home, explained that in Minangkabau culture, cooking is considered an art form that women master to express their creativity and care for their families. The ability to balance flavors—sweet, salty, spicy, and umami—is seen as a reflection of one's ability to navigate life's complexities.</p>

        <h2>Beyond the Spice</h2>

        <p>As my culinary journey through Padang continued, I realized that the food was just the beginning. Each meal was an opportunity to connect with people, to hear their stories, and to understand their way of life. The vendors who invited me to try their specialties, the families who welcomed me into their homes, and the fellow food lovers I met along the way all became part of my Padang story.</p>

        <p>The heat of the chilies, the richness of the coconut milk, and the complexity of the spice blends created flavors that lingered long after each meal. But it was the warmth of the people and their pride in their culinary heritage that left the most lasting impression.</p>

        <p>Leaving Padang, I carried with me not just a collection of recipes and food memories, but a deeper appreciation for how cuisine can be a window into a culture's soul. The flavors of Padang had taught me that food is never just about sustenance—it's about identity, community, and the stories we tell through the dishes we create and share.</p>
      `,
      author: {
        name: "Rudi Hartono",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
        bio: "Food writer & culinary explorer",
        location: "Jakarta, Indonesia",
        social: {
          instagram: "@rudihartono_food",
          website: "www.rudihartono.com",
        },
      },
      coverImage: "https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=1200&h=600&fit=crop",
      images: [
        "https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=600&h=400&fit=crop",
        "https://images.unsplash.com/photo-1565299507317-998fe5b42c35?w=600&h=400&fit=crop",
        "https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=600&h=400&fit=crop",
      ],
      location: "Padang, Sumatera Barat",
      readTime: 5,
      publishedAt: "2024-01-20",
      tags: ["Food", "Culture", "Heritage"],
      featured: false,
    },
    {
      id: "5",
      title: "Sunrise Over Bromo",
      subtitle: "A Volcanic Symphony at Dawn",
      content: `
        <p>At 3:30 AM, the alarm pierced through the cold mountain air of Cemoro Lawang village. Despite the early hour and the biting cold, excitement coursed through my veins. Today, I would witness one of Indonesia's most iconic natural spectacles—sunrise over Mount Bromo, the active volcano that has captivated travelers and photographers from around the world.</p>

        <p>The journey to the viewpoint at Mount Penanjakan was an adventure in itself. Our jeep bounced and lurched along the rough mountain roads, headlights cutting through the pre-dawn darkness. Around us, a convoy of other vehicles carried fellow sunrise seekers, all drawn by the promise of witnessing something truly extraordinary.</p>

        <h2>The Theater of the Gods</h2>
        
        <p>As we reached the viewpoint, I was struck by the otherworldly landscape that surrounded us. The Tengger Caldera stretched out below like an ancient amphitheater, with Mount Bromo rising from its center like a smoking sentinel. The landscape was so alien, so dramatically beautiful, that it felt like standing on the surface of another planet.</p>

        <p>The cold was intense—temperatures at this altitude can drop well below freezing—but the anticipation kept everyone alert and excited. Fellow travelers from around the world stood shoulder to shoulder, cameras ready, all waiting for that magical moment when the sun would break the horizon and transform this volcanic landscape into a canvas of gold and fire.</p>

        <h2>The Moment of Magic</h2>

        <p>Then it happened. The first rays of sunlight crept over the eastern horizon, and the entire landscape began to transform. The mist that had been shrouding the caldera started to lift, revealing the full majesty of the Tengger massif. Mount Bromo, with its perfect cone shape and wisps of sulfurous smoke, stood silhouetted against the brightening sky like a scene from a fantasy novel.</p>

        <p>As the light grew stronger, the colors began to shift and dance across the landscape. The sky turned from deep purple to brilliant orange, then to soft pink and finally to the clear blue of day. The volcanic sand of the caldera floor, known locally as the "Sea of Sand," caught the light and seemed to glow with an inner fire.</p>

        <h2>Descent into the Caldera</h2>

        <p>After the sunrise spectacle, we descended into the caldera itself. The landscape here was even more surreal—a vast expanse of volcanic sand punctuated by the smoking cone of Bromo and the towering walls of the surrounding mountains. The silence was profound, broken only by the occasional rumble from the volcano and the whisper of wind across the sand.</p>

        <p>The climb to Bromo's crater rim was challenging but rewarding. Each step up the steep volcanic slope brought us closer to the source of this geological drama. At the rim, peering down into the active crater with its sulfurous gases and occasional rumbles, I felt a profound connection to the raw power of the Earth itself.</p>

        <h2>The Tengger People</h2>

        <p>What made this experience even more meaningful was learning about the Tengger people, the indigenous community that has lived in the shadow of these volcanoes for generations. Their Hindu faith, unique in predominantly Muslim Java, includes deep reverence for the mountains they call home. The annual Kasada ceremony, where offerings are thrown into Bromo's crater, reflects their belief that the volcano is a sacred entity that must be honored and appeased.</p>

        <p>Speaking with local guides and villagers, I gained a deeper appreciation for how this dramatic landscape has shaped not just the physical environment, but the culture and spirituality of the people who live here. The volcanoes are not just geological features—they are living entities that play a central role in the community's identity and beliefs.</p>

        <h2>A Humbling Experience</h2>

        <p>As I made my way back down from the crater rim, I reflected on the morning's experience. Witnessing sunrise over Bromo had been more than just a spectacular photo opportunity—it had been a reminder of the incredible forces that shape our planet and our place within the larger cosmic drama.</p>

        <p>The volcanic landscape of East Java, with its smoking craters and otherworldly beauty, had shown me that some of the most profound travel experiences come not from human-made attractions, but from encounters with the raw, unfiltered power of nature. In a world increasingly dominated by technology and urban environments, places like Bromo remind us of our connection to the Earth and the humbling beauty of the natural world.</p>

        <p>Leaving the Tengger highlands, I carried with me not just stunning photographs and memories, but a renewed sense of wonder at the incredible planet we call home and the privilege of being able to witness its most spectacular displays.</p>
      `,
      author: {
        name: "Lisa Chen",
        avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face",
        bio: "Landscape photographer & adventure traveler",
        location: "Surabaya, Indonesia",
        social: {
          instagram: "@lisachen_landscapes",
          website: "www.lisachen.photography",
        },
      },
      coverImage: "https://images.unsplash.com/photo-1605540436563-5bca919ae766?w=1200&h=600&fit=crop",
      images: [
        "https://images.unsplash.com/photo-1605540436563-5bca919ae766?w=600&h=400&fit=crop",
        "https://images.unsplash.com/photo-1609137144813-7d9921338f24?w=600&h=400&fit=crop",
        "https://images.unsplash.com/photo-1597149254774-4d6e2d6b0b8e?w=600&h=400&fit=crop",
      ],
      location: "Bromo, Jawa Timur",
      readTime: 4,
      publishedAt: "2024-01-25",
      tags: ["Landscape", "Photography", "Adventure"],
      featured: false,
    },
    {
      id: "6",
      title: "Komodo's Ancient Guardians",
      subtitle: "Encountering the Last Dragons on Earth",
      content: `
        <p>The boat cut through the azure waters of the Flores Sea, carrying us toward one of the most remote and extraordinary destinations on Earth—Komodo National Park. As the rugged islands of the park came into view, their dry, savanna-covered hills rising from the crystal-clear waters, I felt a thrill of anticipation. Somewhere on these ancient islands lived the last dragons on Earth, the legendary Komodo dragons that have survived virtually unchanged for millions of years.</p>

        <p>Komodo National Park, a UNESCO World Heritage Site, encompasses three major islands—Komodo, Rinca, and Padar—along with numerous smaller islands. This remote corner of Indonesia is home to approximately 3,000 Komodo dragons, the world's largest living lizards, which can grow up to 10 feet long and weigh over 150 pounds.</p>

        <h2>First Encounter</h2>
        
        <p>Our first stop was Rinca Island, known for having a higher concentration of dragons than Komodo itself. As we stepped onto the dock, our ranger guide, Pak Yusuf, briefed us on the safety protocols. "The dragons may look slow," he warned, "but they can run up to 20 kilometers per hour and have a venomous bite. We must stay together and keep a safe distance at all times."</p>

        <p>The landscape of Rinca was unlike anything I had ever seen—a dry, almost prehistoric savanna dotted with lontar palms and thorny shrubs. The air was hot and still, and there was an almost palpable sense of ancient wildness. This was a landscape that time had forgotten, where evolution had taken a different path.</p>

        <h2>Meeting the Dragons</h2>

        <p>We didn't have to wait long for our first encounter. Near the ranger station, a massive male Komodo dragon lay basking in the morning sun. At nearly 9 feet long, he was an impressive sight—his powerful body covered in armored scales, his forked tongue flicking out to taste the air, his small but intelligent eyes watching our every move.</p>

        <p>Pak Yusuf explained that Komodo dragons are apex predators with no natural enemies. Their hunting strategy is both patient and deadly—they can wait motionless for hours before striking with lightning speed. Their bite contains venom that prevents blood clotting, meaning that even if prey escapes the initial attack, it will eventually succumb to blood loss and shock.</p>

        <h2>The Island Ecosystem</h2>

        <p>As we trekked deeper into Rinca's interior, I began to appreciate the unique ecosystem that supports these ancient predators. The island is home to a variety of prey species including deer, wild boar, and water buffalo—all of which have evolved alongside the dragons in a delicate balance of predator and prey.</p>

        <p>The landscape itself tells the story of this balance. We saw dragon nests—deep burrows dug into hillsides where females lay their eggs. We observed wallows where buffalo cool themselves, always alert for the presence of lurking predators. Every aspect of life on these islands is shaped by the presence of the dragons.</p>

        <h2>Conservation Challenges</h2>

        <p>During our visit, Pak Yusuf shared the challenges facing Komodo dragon conservation. Climate change and rising sea levels threaten their island habitat, while human encroachment and tourism pressure create additional stresses. The dragons' limited range—they exist nowhere else on Earth—makes them particularly vulnerable to environmental changes.</p>

        <p>The park authorities work tirelessly to balance conservation needs with tourism, which provides crucial funding for protection efforts. Strict visitor limits, guided tours, and ongoing research help ensure that these magnificent creatures will survive for future generations to witness.</p>

        <h2>Padar Island Panorama</h2>

        <p>Our final stop was Padar Island, famous for its stunning panoramic views. The hike to the summit was challenging in the heat, but the reward was extraordinary—a 360-degree view of the surrounding islands and seas, with their distinctive pink and black sand beaches creating a patchwork of colors that seemed almost too beautiful to be real.</p>

        <p>From this vantage point, looking out over the pristine waters and untouched islands of the park, I gained a deeper appreciation for the isolation that has allowed the Komodo dragons to survive. These islands are a living laboratory of evolution, a place where ancient creatures continue to thrive in their original habitat.</p>

        <h2>Guardians of Time</h2>

        <p>As our boat carried us away from Komodo National Park, I reflected on the privilege of encountering these ancient guardians. The Komodo dragons are living links to our planet's prehistoric past, survivors from an age when giant reptiles ruled the Earth. In our modern world of rapid change and technological advancement, they remind us of the importance of preserving the wild spaces and ancient creatures that connect us to our planet's deep history.</p>

        <p>The experience had been more than just a wildlife encounter—it was a journey back in time, a reminder of the incredible diversity of life on Earth, and a call to action to protect these irreplaceable natural treasures. The dragons of Komodo are not just Indonesia's heritage—they belong to all humanity, and it is our collective responsibility to ensure their survival.</p>
      `,
      author: {
        name: "James Mitchell",
        avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&h=150&fit=crop&crop=face",
        bio: "Wildlife documentarian & conservation photographer",
        location: "Perth, Australia",
        social: {
          instagram: "@jamesmitchell_wild",
          website: "www.jamesmitchellwildlife.com",
        },
      },
      coverImage: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=1200&h=600&fit=crop",
      images: [
        "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=600&h=400&fit=crop",
        "https://images.unsplash.com/photo-1609137144813-7d9921338f24?w=600&h=400&fit=crop",
        "https://images.unsplash.com/photo-1597149254774-4d6e2d6b0b8e?w=600&h=400&fit=crop",
      ],
      location: "Komodo Island, NTT",
      readTime: 7,
      publishedAt: "2024-01-30",
      tags: ["Wildlife", "Conservation", "Adventure"],
      featured: false,
    },
  ]

  return stories.find((story) => story.id === id)
}

export default async function StoryDetailPage({ params }: { params: { id: string } }) {
  const story = await getStoryById(params.id)

  if (!story) {
    notFound()
  }

  return (
    <Layout>
      <StoryDetailContent story={story} />
    </Layout>
  )
}
