"use client"

import { Button } from "@/components/ui/button"
import { MapPin, Camera, Palette } from "lucide-react"
import Image from "next/image"

export default function CultureInsightsContent() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative h-[92vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-black/60 to-black/40 z-10" />

        <Image
          src="https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=1920&h=1080&fit=crop"
          alt="Indonesian Cultural Heritage"
          fill
          className="object-cover"
          priority
        />

        <div className="relative z-20 text-center text-white max-w-5xl mx-auto px-6">
          <h1 className="text-5xl md:text-7xl font-bold mb-6">
            Discover the <span className="text-green-400">Heart</span> of Indonesia
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-gray-200">
            Traditions, festivals, rituals, and expressions that define a diverse archipelago
          </p>
          <div className="flex justify-center">
            <a href="#insights">
              <Button size="lg" className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 text-lg">
                Explore Our Heritage
              </Button>
            </a>
          </div>
        </div>
      </section>

      {/* Culture Insights Content */}
      <section id="insights" className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          {/* The Sacred Dance of Bali */}
          <div className="mb-24">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">The Sacred Dance of Bali</h2>
            <p className="text-gray-600 italic mb-8">A living bridge between the physical and spiritual worlds</p>

            <div className="relative w-full h-[500px] mb-8 rounded-xl overflow-hidden">
              <Image
                src="https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=1200&h=600&fit=crop"
                alt="Balinese Sacred Dance"
                fill
                className="object-cover"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-8">
                <div className="flex items-center text-white">
                  <MapPin className="w-5 h-5 mr-2" />
                  <span className="mr-4">Bali</span>
                  <Palette className="w-5 h-5 mr-2" />
                  <span>Traditional Arts</span>
                </div>
              </div>
            </div>

            <div className="prose prose-lg max-w-none">
              <p>
                The Legong dance, performed in temples across Bali, represents more than mere entertainment—it's a
                living bridge between the physical and spiritual worlds. Young dancers, often children, undergo years of
                rigorous training to master the intricate movements that tell ancient stories of gods, demons, and
                heroes.
              </p>
              <p>
                Each gesture carries profound meaning. The delicate finger movements, called "mudras," represent
                different emotions and spiritual concepts. The elaborate costumes, with their gold brocade and intricate
                headdresses, transform the dancers into divine beings.
              </p>
              <p>
                "Every gesture in Legong is a prayer, every movement a conversation with the divine. We don't just
                perform—we become vessels for ancient stories," explains Ni Ketut Arini, a master teacher who has
                dedicated her life to preserving this sacred art form.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
              <div className="relative h-64 rounded-lg overflow-hidden">
                <Image
                  src="https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop"
                  alt="Balinese Dance Detail"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="relative h-64 rounded-lg overflow-hidden">
                <Image
                  src="https://images.unsplash.com/photo-1555400082-8c5cd5b3c3d1?w=400&h=300&fit=crop"
                  alt="Balinese Temple"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="relative h-64 rounded-lg overflow-hidden">
                <Image
                  src="https://images.unsplash.com/photo-1609137144813-7d9921338f24?w=400&h=300&fit=crop"
                  alt="Balinese Ceremony"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>

          {/* Life in Tana Toraja - Full Width Image */}
          <div className="mb-24">
            <div className="relative w-full h-[600px] mb-8 rounded-xl overflow-hidden">
              <Image
                src="https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=1200&h=600&fit=crop"
                alt="Toraja Traditional Houses"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent flex flex-col justify-end p-12">
                <h2 className="text-4xl font-bold text-white mb-4">
                  Life in Toraja, where ancient traditions echo through generations
                </h2>
                <p className="text-xl text-white/90 mb-6">In Indonesia's wooden houses reaching toward the sky</p>
                <div className="flex items-center text-white/80">
                  <MapPin className="w-5 h-5 mr-2" />
                  <span className="mr-4">South Sulawesi</span>
                  <Palette className="w-5 h-5 mr-2" />
                  <span>Architecture & Lifestyle</span>
                </div>
              </div>
            </div>

            <div className="prose prose-lg max-w-none">
              <p>
                In the misty highlands of South Sulawesi, the Torajan people have maintained their unique way of life
                for over a thousand years. Their distinctive tongkonan houses, with their boat-shaped roofs reaching
                toward the sky, are more than just dwellings—they are symbols of identity, status, and connection to
                ancestors.
              </p>
              <p>
                The construction of a tongkonan is a community affair that can take years to complete. Every element has
                meaning: the curved roof represents the horns of a water buffalo, a sacred animal in Torajan culture.
                The intricate wood carvings that adorn the facades tell stories of family lineage and spiritual beliefs.
              </p>
            </div>
          </div>

          {/* Toraja: Where Death is a Celebration of Life - Side by Side */}
          <div className="mb-24">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-2">Toraja: Where Death is a Celebration of Life</h2>
                <p className="text-gray-600 italic mb-6">The World's Most Elaborate Funeral Traditions</p>
                <div className="prose prose-lg">
                  <p>
                    In Torajan culture, death is not an ending but a transformation—a journey from the world of the
                    living to the realm of ancestors. The elaborate funeral ceremonies, known as "Rambu Solo," can last
                    for days and involve the entire community in a celebration that honors the deceased while affirming
                    the bonds of family and society.
                  </p>
                  <p>
                    The Torajan belief system, called "Aluk To Dolo" (the way of the ancestors), views death as a
                    gradual process. When someone dies, they are not immediately considered dead but rather "to makala"
                    (sick) until the funeral ceremony is completed.
                  </p>
                  <p>
                    Families often save for years or even decades to afford a proper funeral, and the community benefits
                    from the influx of visitors and the circulation of money. Buffalo and pigs are traded from across
                    the region, creating a complex economy centered around these ritual celebrations.
                  </p>
                </div>
                <div className="flex items-center mt-6 text-gray-600">
                  <MapPin className="w-5 h-5 mr-2" />
                  <span className="mr-4">South Sulawesi</span>
                  <Palette className="w-5 h-5 mr-2" />
                  <span>Ceremonies & Rituals</span>
                </div>
              </div>
              <div className="relative h-[600px] rounded-xl overflow-hidden">
                <Image
                  src="https://images.unsplash.com/photo-1609137144813-7d9921338f24?w=600&h=800&fit=crop"
                  alt="Toraja Funeral Ceremony"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>

          {/* The Wisdom of Batik - Creative Layout */}
          <div className="mb-24">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="md:col-span-1">
                <div className="sticky top-24">
                  <h2 className="text-3xl font-bold text-gray-900 mb-2">The Wisdom of Batik</h2>
                  <p className="text-gray-600 italic mb-6">Stories Written in Wax and Dye</p>
                  <div className="prose prose-lg">
                    <p>
                      Batik is more than fabric art—it's a language of symbols, a repository of cultural memory, and a
                      meditation practice that connects the maker to generations of ancestors. In the royal courts of
                      Yogyakarta and Solo, master craftspeople continue traditions that have been refined over
                      centuries.
                    </p>
                    <p>
                      The word "batik" comes from the Javanese "amba" (to write) and "titik" (dot), literally meaning
                      "to write with dots." This ancient technique involves applying hot wax to fabric in intricate
                      patterns, then dyeing the cloth. The wax resists the dye, creating designs that can take months to
                      complete.
                    </p>
                  </div>
                  <div className="flex items-center mt-6 text-gray-600">
                    <MapPin className="w-5 h-5 mr-2" />
                    <span className="mr-4">Central Java</span>
                    <Palette className="w-5 h-5 mr-2" />
                    <span>Traditional Crafts</span>
                  </div>
                </div>
              </div>
              <div className="md:col-span-2 grid grid-cols-2 gap-4">
                <div className="relative h-80 rounded-lg overflow-hidden">
                  <Image
                    src="https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=400&h=300&fit=crop"
                    alt="Batik Making Process"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="relative h-80 rounded-lg overflow-hidden">
                  <Image
                    src="https://images.unsplash.com/photo-1565299507317-998fe5b42c35?w=400&h=300&fit=crop"
                    alt="Batik Patterns"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="relative h-80 rounded-lg overflow-hidden col-span-2">
                  <Image
                    src="https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=800&h=300&fit=crop"
                    alt="Batik Fabric Display"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Saman: The Dance of a Thousand Hands - Improved visibility */}
          <div className="mb-24 bg-gradient-to-br from-gray-100 to-gray-200 text-white rounded-2xl overflow-hidden">
            <div className="relative h-[300px]">
              <Image
                src="https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=1200&h=400&fit=crop"
                alt="Saman Dance Performance"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-black/50 to-black/90"></div>
              <div className="absolute bottom-0 left-0 w-full p-8">
                <h2 className="text-4xl font-bold mb-2 text-white">Saman: The Dance of a Thousand Hands</h2>
                <p className="text-xl text-gray-200">Aceh's Mesmerizing Ritual of Unity</p>
              </div>
            </div>
            <div className="p-8">
              <div className="prose prose-lg prose-invert max-w-none">
                <p className="text-gray-200">
                  In the highlands of Aceh, the Saman dance represents one of Indonesia's most spectacular cultural
                  performances. Known as the "Dance of a Thousand Hands," this UNESCO-recognized art form combines
                  lightning-fast movements, rhythmic chanting, and spiritual devotion in a display that leaves audiences
                  breathless and participants transformed.
                </p>
                <p className="text-gray-200">
                  What makes Saman truly extraordinary is the precision required from its performers. Dancers sit in a
                  single row, moving their hands, heads, and torsos in perfect synchronization at incredible speeds. The
                  slightest mistake by one dancer can disrupt the entire performance, requiring months of practice to
                  achieve the necessary unity and timing.
                </p>
              </div>
              <div className="grid grid-cols-3 gap-4 mt-8">
                <div className="relative h-48 rounded-lg overflow-hidden">
                  <Image
                    src="https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop"
                    alt="Saman Dance Detail"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="relative h-48 rounded-lg overflow-hidden">
                  <Image
                    src="https://images.unsplash.com/photo-1555400082-8c5cd5b3c3d1?w=400&h=300&fit=crop"
                    alt="Saman Performers"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="relative h-48 rounded-lg overflow-hidden">
                  <Image
                    src="https://images.unsplash.com/photo-1609137144813-7d9921338f24?w=400&h=300&fit=crop"
                    alt="Saman Performance"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
              <div className="flex items-center mt-6 text-gray-600">
                <MapPin className="w-5 h-5 mr-2" />
                <span className="mr-4">Aceh</span>
                <Palette className="w-5 h-5 mr-2" />
                <span>Traditional Arts</span>
              </div>
            </div>
          </div>

          {/* Call to Action */}
          <div className="py-16 text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              Know a local tradition worth sharing with the world?
            </h2>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Help us preserve and celebrate Indonesia's rich cultural heritage by sharing your knowledge of local
              traditions, ceremonies, and customs.
            </p>
            <Button
              size="lg"
              className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 text-lg"
              onClick={() => {
                window.location.href =
                  "mailto:culture@layarnusantara.com?subject=Contribute a Culture Insight&body=Hi! I would like to share a local tradition or cultural insight..."
              }}
            >
              Contribute a Culture Insight
              <Camera className="w-5 h-5 ml-2" />
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
