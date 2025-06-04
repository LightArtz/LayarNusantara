// components/interactive-map/IndonesiaMap.tsx
"use client";

import React, { useEffect, useRef, useState, useCallback } from 'react';
import type { ProvinceMapData } from '@/lib/map-data';
import { TransformWrapper, TransformComponent, useControls } from "react-zoom-pan-pinch";
import { ZoomIn, ZoomOut, RotateCcw } from 'lucide-react';

interface IndonesiaMapProps {
  provinces: ProvinceMapData[];
  selectedProvinceId: string | null;
  onProvinceSelect: (province: ProvinceMapData) => void;
  onProvinceHover: (provinceId: string | null) => void;
  hoveredProvinceId: string | null;
}

const mapColors = {
  baseFill: "rgba(180, 220, 180, 0.75)",
  baseStroke: "rgba(100, 150, 100, 0.9)",
  hoverFill: "rgba(120, 200, 120, 0.9)",
  hoverStroke: "rgba(60, 120, 60, 1)",
  selectedFill: "rgba(56, 129, 194, 1)",
  selectedStroke: "rgba(35, 99, 143, 1)",
  strokeWidth: "0.3",
  hoverStrokeWidth: "0.45",
  selectedStrokeWidth: "0.7",
  transition: "fill 75ms ease-out, stroke 75ms ease-out, stroke-width 75ms ease-out",
};

const ZoomControls = () => {
  const { zoomIn, zoomOut, resetTransform } = useControls();
  return (
    <div className="absolute top-3 right-3 z-10 flex flex-col space-y-1.5 bg-white/70 backdrop-blur-sm p-1.5 rounded-lg shadow-md border border-gray-200/50">
      <button onClick={() => zoomIn(0.3, 100)} title="Zoom In" className="p-1.5 hover:bg-gray-200/70 rounded transition-colors duration-100">
        <ZoomIn size={18} className="text-gray-700" />
      </button>
      <button onClick={() => zoomOut(0.3, 100)} title="Zoom Out" className="p-1.5 hover:bg-gray-200/70 rounded transition-colors duration-100">
        <ZoomOut size={18} className="text-gray-700" />
      </button>
      <button onClick={() => resetTransform(150)} title="Reset Zoom" className="p-1.5 hover:bg-gray-200/70 rounded transition-colors duration-100">
        <RotateCcw size={18} className="text-gray-700" />
      </button>
    </div>
  );
};

export default function IndonesiaMap({
  provinces,
  selectedProvinceId,
  onProvinceSelect,
  onProvinceHover,
  hoveredProvinceId,
}: IndonesiaMapProps) {
  const [svgContent, setSvgContent] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [errorLoading, setErrorLoading] = useState<string | null>(null);
  const svgContainerRef = useRef<HTMLDivElement>(null);
  const pathRefs = useRef<Record<string, SVGPathElement | null>>({});

  useEffect(() => {
    setIsLoading(true);
    setErrorLoading(null);
    fetch('/map/indonesia.svg')
      .then(response => {
        if (!response.ok) throw new Error(`Failed to load SVG map: ${response.status}`);
        return response.text();
      })
      .then(data => {
        setSvgContent(data);
        setIsLoading(false);
      })
      .catch(error => {
        console.error("Error fetching SVG map:", error);
        setErrorLoading((error as Error).message || "Could not load map.");
        setIsLoading(false);
      });
  }, []);

  // Effect to initialize paths and attach event listeners once SVG is loaded
  useEffect(() => {
    if (!svgContent || !svgContainerRef.current || isLoading || errorLoading) return;

    const svgElement = svgContainerRef.current.querySelector('svg');
    if (!svgElement) return;

    provinces.forEach(province => {
      const pathElement = svgElement.getElementById(province.id) as SVGPathElement | null;
      pathRefs.current[province.id] = pathElement;

      if (pathElement) {
        // @ts-ignore Check if listeners are already attached
        if (!pathElement._listenersAttached) {
          // Apply styles and listeners only ONCE per path element
          pathElement.style.transition = mapColors.transition;
          pathElement.style.cursor = 'pointer';

          // Set initial base styles
          pathElement.setAttribute('fill', mapColors.baseFill);
          pathElement.setAttribute('stroke', mapColors.baseStroke);
          pathElement.setAttribute('stroke-width', mapColors.strokeWidth);

          let titleElement = pathElement.querySelector('title') as SVGTitleElement | null;
          if (!titleElement) {
            titleElement = document.createElementNS('http://www.w3.org/2000/svg', 'title') as SVGTitleElement;
            pathElement.appendChild(titleElement);
          }
          titleElement.textContent = province.name;
          
          const clickHandler = () => onProvinceSelect(province);
          const mouseEnterHandler = () => onProvinceHover(province.id);
          const mouseLeaveHandler = () => onProvinceHover(null);

          pathElement.addEventListener('click', clickHandler);
          pathElement.addEventListener('mouseenter', mouseEnterHandler);
          pathElement.addEventListener('mouseleave', mouseLeaveHandler);
          // @ts-ignore
          pathElement._listenersAttached = true;
        }
      }
    });
    // Note: It's good practice for the parent component to memoize `provinces`,
    // `onProvinceSelect`, and `onProvinceHover` (e.g., using useMemo/useCallback)
    // to prevent this effect from running unnecessarily if their references change.
  }, [svgContent, isLoading, errorLoading, provinces, onProvinceSelect, onProvinceHover]);


  // Effect to update path styles based on hover or selection changes
  useEffect(() => {
    // No need to run if SVG isn't ready or if pathRefs haven't been populated yet.
    // The check for svgContent ensures this runs after initial styles might be set by the above effect.
    if (isLoading || errorLoading || !svgContent || Object.keys(pathRefs.current).length === 0) return;

    provinces.forEach(province => {
      const pathElement = pathRefs.current[province.id];
      if (pathElement) {
        let fill = mapColors.baseFill;
        let stroke = mapColors.baseStroke;
        let strokeWidth = mapColors.strokeWidth;

        if (selectedProvinceId === province.id) {
          fill = mapColors.selectedFill;
          stroke = mapColors.selectedStroke;
          strokeWidth = mapColors.selectedStrokeWidth;
        } else if (hoveredProvinceId === province.id) {
          fill = mapColors.hoverFill;
          stroke = mapColors.hoverStroke;
          strokeWidth = mapColors.hoverStrokeWidth;
        }
        
        if (pathElement.getAttribute('fill') !== fill) pathElement.setAttribute('fill', fill);
        if (pathElement.getAttribute('stroke') !== stroke) pathElement.setAttribute('stroke', stroke);
        if (pathElement.getAttribute('stroke-width') !== strokeWidth) pathElement.setAttribute('stroke-width', strokeWidth);
      }
    });
  }, [isLoading, errorLoading, svgContent, provinces, selectedProvinceId, hoveredProvinceId]); // pathRefs is stable
  
  return (
    <div 
      className="relative w-full h-96 md:h-[550px] bg-gradient-to-br from-sky-50 via-teal-50 to-green-50 
                 rounded-2xl overflow-hidden border border-gray-200/70 shadow-lg flex items-center justify-center select-none"
    >
      {isLoading && <p className="text-gray-500 text-center animate-pulse">Loading Map of Indonesia...</p>}
      {errorLoading && <p className="text-red-500 text-center p-4">Error: {errorLoading}</p>}
      {!isLoading && !errorLoading && svgContent && (
        <TransformWrapper
          initialScale={1}
          minScale={0.3} 
          maxScale={8}   
          centerOnInit
          limitToBounds={true}
          doubleClick={{ disabled: true }} 
          wheel={{ step: 0.2, smoothStep: 0.005 }} 
          panning={{ velocityDisabled: false, disabled: false }} 
          pinch={{ disabled: false }} 
          alignmentAnimation={{ disabled: true }} 
          velocityAnimation={{ disabled: true }} 
        >
          <ZoomControls /> 
          <TransformComponent
            wrapperStyle={{ width: "100%", height: "100%" }}
            contentStyle={{ width: "100%", height: "100%", cursor: "grab" }}
          >
            <div 
              ref={svgContainerRef} 
              className="w-full h-full [&_svg]:w-full [&_svg]:h-full [&_svg]:object-contain"
              dangerouslySetInnerHTML={{ __html: svgContent }} 
            />
          </TransformComponent>
        </TransformWrapper>
      )}
      {!isLoading && !errorLoading && (
          <p className="absolute bottom-2.5 left-1/2 -translate-x-1/2 text-[9px] md:text-[10px] text-slate-600 bg-slate-50/70 px-2 py-0.5 rounded-md shadow-sm pointer-events-none">
            Interactive Map: Hover, click, zoom, or drag.
          </p>
      )}
    </div>
  );
}