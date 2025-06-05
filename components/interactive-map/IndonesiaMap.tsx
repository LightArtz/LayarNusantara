// components/interactive-map/IndonesiaMap.tsx
"use client";

import React, { useEffect, useRef, useState } from 'react';
import type { ProvinceMapData } from '@/lib/map-data';
import { TransformWrapper, TransformComponent, useControls } from "react-zoom-pan-pinch";
import { ZoomIn, ZoomOut, RotateCcw, Loader2 } from 'lucide-react';

// Theme-aligned colors
const mapColors = {
  baseFill: "hsl(210 40% 96.1%)", // Tailwind's neutral-200/gray-200 equivalent
  baseStroke: "hsl(210 30% 80%)",  // Darker gray for borders
  hoverFill: "hsl(140 40% 88%)",   // A light, desaturated green (e.g., green-200/300)
  hoverStroke: "hsl(140 40% 65%)", // A medium green for hover stroke
  selectedFill: "hsl(147 56% 46%)", // Vibrant theme green (e.g., green-600)
  selectedStroke: "hsl(147 56% 30%)",// Darker green for selected stroke
  strokeWidth: "0.3px", // Use px for consistency with SVG units
  hoverStrokeWidth: "0.45px",
  selectedStrokeWidth: "0.6px",
  transition: "fill 150ms ease-out, stroke 150ms ease-out, stroke-width 150ms ease-out",
};

// Memoized ZoomControls to prevent re-renders from TransformWrapper context changes
const ZoomControls = React.memo(() => {
  const { zoomIn, zoomOut, resetTransform } = useControls();
  return (
    <div className="absolute top-3 right-3 z-10 flex flex-col space-y-1.5 bg-white/80 backdrop-blur-sm p-1.5 rounded-lg shadow-lg border border-gray-200/60">
      <button onClick={() => zoomIn(0.3, 150)} title="Zoom In" className="p-2 hover:bg-gray-200/80 rounded transition-colors duration-100 text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-500">
        <ZoomIn size={18} />
      </button>
      <button onClick={() => zoomOut(0.3, 150)} title="Zoom Out" className="p-2 hover:bg-gray-200/80 rounded transition-colors duration-100 text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-500">
        <ZoomOut size={18} />
      </button>
      <button onClick={() => resetTransform(200)} title="Reset Zoom" className="p-2 hover:bg-gray-200/80 rounded transition-colors duration-100 text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-500">
        <RotateCcw size={18} />
      </button>
    </div>
  );
});
ZoomControls.displayName = 'ZoomControls';


type IndonesiaMapProps = {
  provinces: { id: string; name: string | null }[];
  selectedProvinceId: string | null;
  onProvinceSelect: (province: { id: string; name: string | null }) => void;
  onProvinceHover: (provinceId: string | null) => void;
  hoveredProvinceId: string | null;
};

export default function IndonesiaMap({
  provinces,
  selectedProvinceId,
  onProvinceSelect,
  onProvinceHover,
  hoveredProvinceId,
}: IndonesiaMapProps) {
  const [rawSvgContent, setRawSvgContent] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [errorLoading, setErrorLoading] = useState<string | null>(null);
  const svgContainerRef = useRef<HTMLDivElement>(null);
  // Use a ref to store the map of province IDs to their path elements
  const pathElementMapRef = useRef<Map<string, SVGPathElement>>(new Map());
  const [isMapReady, setIsMapReady] = useState(false);

  // Fetch SVG content
  useEffect(() => {
    setIsLoading(true);
    setErrorLoading(null);
    fetch('/map/indonesia.svg')
      .then(response => {
        if (!response.ok) throw new Error(`Failed to load SVG: ${response.statusText} (${response.status})`);
        return response.text();
      })
      .then(data => {
        setRawSvgContent(data);
        setIsLoading(false);
      })
      .catch(error => {
        console.error("Error fetching SVG map:", error);
        setErrorLoading((error as Error).message || "Could not load map.");
        setIsLoading(false);
      });
  }, []);

  // Initialize map, find paths, and attach event listeners
  useEffect(() => {
    if (isLoading || errorLoading || !rawSvgContent || !svgContainerRef.current) {
      setIsMapReady(false);
      return;
    }
    
    // Set the SVG content to the container
    // This is done only when rawSvgContent changes (ideally once)
    svgContainerRef.current.innerHTML = rawSvgContent;
    const svgElement = svgContainerRef.current.querySelector('svg');
    if (!svgElement) {
      setErrorLoading("SVG element not found after injection.");
      setIsMapReady(false);
      return;
    }

    const newPathMap = new Map<string, SVGPathElement>();
    let allPathsFound = true;

    provinces.forEach((province: { id: string; name: string | null; }) => {
      const pathElement = svgElement.getElementById(province.id) as SVGPathElement | null;
      if (pathElement) {
        newPathMap.set(province.id, pathElement);

        // Clean up potential old listeners from previous renders (if any)
        const oldListeners = (pathElement as any)._currentListeners;
        if (oldListeners) {
          pathElement.removeEventListener('click', oldListeners.click);
          pathElement.removeEventListener('mouseenter', oldListeners.mouseenter);
          pathElement.removeEventListener('mouseleave', oldListeners.mouseleave);
        }

        // Define new listeners
        const clickHandler = () => onProvinceSelect(province);
        const mouseEnterHandler = () => onProvinceHover(province.id);
        const mouseLeaveHandler = () => onProvinceHover(null);
        
        pathElement.addEventListener('click', clickHandler);
        pathElement.addEventListener('mouseenter', mouseEnterHandler);
        pathElement.addEventListener('mouseleave', mouseLeaveHandler);

        // Store them for potential cleanup
        (pathElement as any)._currentListeners = { click: clickHandler, mouseenter: mouseEnterHandler, mouseleave: mouseLeaveHandler };

        pathElement.style.transition = mapColors.transition;
        pathElement.style.cursor = 'pointer';
        
        let titleElement = pathElement.querySelector('title') as SVGTitleElement | null;
        if (!titleElement) {
          titleElement = document.createElementNS('http://www.w3.org/2000/svg', 'title') as SVGTitleElement;
          pathElement.appendChild(titleElement);
        }
        titleElement.textContent = province.name;

      } else {
         // console.warn(`Path element not found for province ID in SVG: ${province.id} (${province.name})`);
        allPathsFound = false;
      }
    });
    
    pathElementMapRef.current = newPathMap;
    if (newPathMap.size > 0 && allPathsFound) {
      setIsMapReady(true);
    } else if (newPathMap.size === 0 && provinces.length > 0) {
       setErrorLoading("No province paths could be identified in the SVG.");
       setIsMapReady(false);
    }


    // Cleanup listeners on component unmount or when dependencies change significantly
    return () => {
      pathElementMapRef.current.forEach(pathElement => {
        const listeners = (pathElement as any)._currentListeners;
        if (listeners) {
          pathElement.removeEventListener('click', listeners.click);
          pathElement.removeEventListener('mouseenter', listeners.mouseenter);
          pathElement.removeEventListener('mouseleave', listeners.mouseleave);
        }
      });
    };
  }, [rawSvgContent, isLoading, errorLoading, provinces, onProvinceSelect, onProvinceHover]);


  // Apply dynamic styles (fill, stroke) to paths
  useEffect(() => {
    if (!isMapReady || pathElementMapRef.current.size === 0) return;

    pathElementMapRef.current.forEach((pathElement, provinceId) => {
      let fill = mapColors.baseFill;
      let stroke = mapColors.baseStroke;
      let strokeWidth = mapColors.strokeWidth;

      if (selectedProvinceId === provinceId) {
        fill = mapColors.selectedFill;
        stroke = mapColors.selectedStroke;
        strokeWidth = mapColors.selectedStrokeWidth;
      } else if (hoveredProvinceId === provinceId) {
        fill = mapColors.hoverFill;
        stroke = mapColors.hoverStroke;
        strokeWidth = mapColors.hoverStrokeWidth;
      }
      
      pathElement.setAttribute('fill', fill);
      pathElement.setAttribute('stroke', stroke);
      pathElement.setAttribute('stroke-width', strokeWidth);
    });
  }, [isMapReady, selectedProvinceId, hoveredProvinceId]); // Removed `provinces` as path elements are stable after mapReady


  return (
    <div 
      className="relative w-full h-96 md:h-[550px] bg-gradient-to-br from-sky-50 via-teal-50 to-green-50 
                 rounded-2xl overflow-hidden border border-gray-200/70 shadow-lg flex items-center justify-center select-none"
    >
      {isLoading && (
        <div className="flex flex-col items-center text-gray-500">
          <Loader2 className="w-12 h-12 animate-spin text-green-600 mb-3" />
          <p>Loading Map of Indonesia...</p>
        </div>
      )}
      {errorLoading && <p className="text-red-600 text-center p-4 bg-red-50 rounded-md">Error: {errorLoading}</p>}
      
      {!isLoading && !errorLoading && rawSvgContent && (
        <TransformWrapper
          initialScale={1} minScale={0.3} maxScale={8} centerOnInit limitToBounds={true}
          doubleClick={{ disabled: true }} 
          wheel={{ step: 0.2, smoothStep: 0.005, disabled: false }} 
          panning={{ velocityDisabled: false, disabled: false, excluded: ['button'] }}
          pinch={{ disabled: false }} 
        >
          <ZoomControls /> 
          <TransformComponent wrapperStyle={{ width: "100%", height: "100%" }} contentStyle={{ width: "100%", height: "100%", cursor: "grab" }}>
            <div 
              ref={svgContainerRef} 
              className="w-full h-full [&_svg]:w-full [&_svg]:h-full [&_svg]:object-contain"
              // The SVG content is now set in the useEffect hook
            />
          </TransformComponent>
        </TransformWrapper>
      )}
      {!isLoading && !errorLoading && isMapReady && (
          <p className="absolute bottom-2.5 left-1/2 -translate-x-1/2 text-[9px] md:text-[10px] text-slate-700 bg-slate-100/80 px-2 py-0.5 rounded-md shadow-sm pointer-events-none">
            Interactive Map: Hover, click, zoom, or drag.
          </p>
      )}
    </div>
  );
}