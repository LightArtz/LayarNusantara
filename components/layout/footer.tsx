import Link from "next/link"
import { MapPin, Mail, Phone, Instagram, Facebook, Twitter } from "lucide-react"
import Image from "next/image"

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 flex items-center justify-center">
                <Image 
                src="/logo.jpeg"
                alt="LayarNusantara Logo"
                width={32}
                height={32}
                className="object-cover"
              />
              </div>
              <span className="text-xl font-bold">LayarNusantara</span>
            </div>
            <p className="text-gray-300 mb-4 max-w-md">
              Discover the beauty of Indonesia through authentic local experiences, cultural insights, and heartfelt
              travel stories from fellow explorers.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Explore</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-gray-300 hover:text-white transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/travel-stories" className="text-gray-300 hover:text-white transition-colors">
                  Travel Stories
                </Link>
              </li>
              <li>
                <Link href="/culture-insights" className="text-gray-300 hover:text-white transition-colors">
                  Culture Insights
                </Link>
              </li>
              <li>
                <Link href="/promotions" className="text-gray-300 hover:text-white transition-colors">
                  Local Promotions
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact</h3>
            <ul className="space-y-2">
              <li className="flex items-center text-gray-300">
                <Mail className="w-4 h-4 mr-2" />
                hello@layarnusantara.com
              </li>
              <li className="flex items-center text-gray-300">
                <Phone className="w-4 h-4 mr-2" />
                +62 21 1234 5678
              </li>
              <li className="flex items-start text-gray-300">
                <MapPin className="w-4 h-4 mr-2 mt-1" />
                Jakarta, Indonesia
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; 2024 LayarNusantara. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
