// components/interactive-map/InteractiveMapSection.tsx
"use client";

import React, { useState, useCallback, useMemo } from 'react';
import IndonesiaMap from './IndonesiaMap';
import ProvinceInfoPanel from './ProvinceInfoPanel';
import { indonesiaMapData, type ProvinceMapData, type MapCategoryDetail } from '@/lib/map-data';

export default function InteractiveMapSection() {
  const [selectedProvince, setSelectedProvince] = useState<ProvinceMapData | null>(null);
  const [hoveredProvinceId, setHoveredProvinceId] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<MapCategoryDetail | null>(null);

  const handleProvinceSelect = useCallback((province: { id: string; name: string | null }) => {
    const fullProvince = indonesiaMapData.find(p => p.id === province.id) || null;
    setSelectedProvince(prevSelected => {
      // If clicking the same province, keep it selected.
      // To implement deselection on second click:
      // if (prevSelected?.id === province.id) {
      //   setSelectedCategory(null);
      //   return null;
      // }
      setSelectedCategory(null); 
      return fullProvince;
    });
  }, []);

  const handleCategorySelect = useCallback((category: MapCategoryDetail | null) => {
    setSelectedCategory(category);
  }, []);

  const handleProvinceHover = useCallback((provinceId: string | null) => {
    setHoveredProvinceId(provinceId);
  }, []);

  const mapProvinces = useMemo(() => indonesiaMapData, []);

  return (
    <section id="explore" className="py-16 md:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Explore Indonesia by Region</h2>
          <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
            Click on any province to discover its unique tourism, culture, and culinary treasures.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-start">
          <IndonesiaMap
            provinces={mapProvinces}
            selectedProvinceId={selectedProvince?.id || null}
            onProvinceSelect={handleProvinceSelect}
            onProvinceHover={handleProvinceHover}
            hoveredProvinceId={hoveredProvinceId}
          />
          <ProvinceInfoPanel
            selectedProvince={selectedProvince}
            selectedCategory={selectedCategory}
            onCategorySelect={handleCategorySelect}
          />
        </div>
      </div>
    </section>
  );
}