// components/interactive-map/ProvinceInfoPanel.tsx
"use client";

import React from 'react';
import Image from 'next/image';
import { ArrowLeft, ChevronRight, MapPin } from 'lucide-react';
import type { ProvinceMapData, MapCategoryDetail, MapCategoryItem } from '@/lib/map-data';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { motion, AnimatePresence } from 'framer-motion';

interface ProvinceInfoPanelProps {
  selectedProvince: ProvinceMapData | null;
  selectedCategory: MapCategoryDetail | null;
  onCategorySelect: (category: MapCategoryDetail | null) => void;
}

const panelVariants = {
  hidden: { opacity: 0, x: 20 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.3, ease: "easeInOut" } },
  exit: { opacity: 0, x: -20, transition: { duration: 0.2, ease: "easeInOut" } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 15 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.07, duration: 0.3, ease: "easeOut" },
  }),
};

export default function ProvinceInfoPanel({
  selectedProvince,
  selectedCategory,
  onCategorySelect,
}: ProvinceInfoPanelProps) {
  if (!selectedProvince) {
    return (
      <Card className="p-6 md:p-8 shadow-xl h-full flex flex-col justify-center items-center 
                     min-h-[400px] md:h-[550px] bg-white border border-gray-200 rounded-2xl text-center">
        <MapPin className="w-12 h-12 md:w-16 md:h-16 mx-auto mb-4 text-gray-300" />
        <h3 className="text-lg md:text-xl font-semibold mb-2 text-gray-600">Explore the Archipelago</h3>
        <p className="text-sm text-gray-500 max-w-xs">
          Select a province on the map to uncover its unique stories, sights, and flavors.
        </p>
      </Card>
    );
  }

  return (
    <Card className="shadow-xl h-full flex flex-col bg-white border border-gray-200 rounded-2xl 
                   min-h-[400px] md:h-[550px] overflow-hidden">
      <AnimatePresence mode="wait">
        {selectedCategory ? (
          <motion.div
            key={`${selectedProvince.id}-${selectedCategory.id}-detail`}
            variants={panelVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="p-5 md:p-6 flex flex-col h-full"
          >
            <Button
              variant="ghost"
              onClick={() => onCategorySelect(null)}
              className="mb-3 md:mb-4 self-start text-green-600 hover:text-green-700 px-1 hover:bg-green-50 flex items-center text-sm font-medium"
            >
              <ArrowLeft className="w-4 h-4 mr-1.5" />
              Back to {selectedProvince.name}
            </Button>
            
            <div className="flex items-center mb-4 md:mb-5">
              <div className={`p-2 md:p-2.5 ${selectedCategory.bgColor} rounded-lg flex items-center justify-center mr-3 md:mr-4 flex-shrink-0 shadow-sm`}>
                <selectedCategory.icon className={`w-5 h-5 md:w-6 md:h-6 ${selectedCategory.iconColor}`} />
              </div>
              <h2 className="text-xl md:text-2xl font-bold text-gray-700 leading-tight">
                {selectedCategory.title} in {selectedProvince.name}
              </h2>
            </div>

            <p className="text-gray-600 mb-4 md:mb-5 text-sm leading-relaxed">{selectedCategory.content.introduction}</p>

            <div className="space-y-3 md:space-y-4 overflow-y-auto pr-1 md:pr-2 flex-grow pb-4 custom-scrollbar">
              {selectedCategory.content.items.map((item: MapCategoryItem, index: number) => (
                <motion.div 
                  key={item.name} 
                  custom={index}
                  variants={itemVariants}
                  initial="hidden"
                  animate="visible"
                  className="flex items-start gap-3 p-3 bg-gray-50/80 rounded-lg transition-shadow hover:shadow-md border border-gray-200/70"
                >
                  <div className="relative w-20 h-20 md:w-24 md:h-20 rounded-md overflow-hidden flex-shrink-0 shadow-sm">
                    <Image src={item.image} alt={item.name} layout="fill" objectFit="cover" className="transform transition-transform duration-300 hover:scale-105" />
                  </div>
                  <div className="flex-1 pt-0.5">
                    <h4 className="font-semibold text-sm md:text-base text-gray-700 mb-0.5">{item.name}</h4>
                    <p className="text-xs text-gray-500 leading-snug">{item.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        ) : (
          <motion.div
            key={`${selectedProvince.id}-overview`}
            variants={panelVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="p-5 md:p-6 flex flex-col justify-center h-full"
          >
            <h2 className="text-2xl md:text-3xl font-bold text-gray-700 mb-6 md:mb-8 text-center">
              Discover {selectedProvince.name}
            </h2>
            <div className="space-y-3 md:space-y-4">
              {Object.values(selectedProvince.categories).map((category) => (
                <motion.button
                  key={category.id}
                  onClick={() => onCategorySelect(category)}
                  className={`w-full p-4 md:p-5 rounded-xl flex items-center space-x-3 md:space-x-4 text-left transition-all duration-200 ease-in-out shadow-sm hover:shadow-lg border
                              ${category.bgColor} ${category.hoverBgColor} ${category.borderColor || 'border-gray-200 hover:border-gray-300'}`}
                  whileHover={{ scale: 1.02, y: -1 }}
                  whileTap={{ scale: 0.99 }}
                >
                  <div className={`p-2.5 md:p-3 ${category.bgColor} border border-gray-200/50 rounded-lg flex-shrink-0 shadow-inner`}>
                    <category.icon className={`w-5 h-5 md:w-6 md:h-6 ${category.iconColor}`} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className={`text-base md:text-lg font-semibold ${category.textColor}`}>{category.title}</h3>
                    <p className={`text-xs md:text-sm ${category.textColor} opacity-80 truncate`}>{category.description}</p>
                  </div>
                  <ChevronRight className={`w-5 h-5 ml-auto ${category.textColor} opacity-70 flex-shrink-0`} />
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </Card>
  );
}