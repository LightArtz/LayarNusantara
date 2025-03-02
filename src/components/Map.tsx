// Interactive Map (to develop)

function Map() {
  return (
    <div>
        {/* Design Map Here */}
        
        {/* Insert <Popup /> */}
    </div>
  )
}

export default Map


/* CONTOH!!
"use client";

import { useState } from "react";
import Popup from "./Popup";

const Map = () => {
    const [selectedRegion, setSelectedRegion] = useState<string | null>(null);

    const handleRegionClick = (region: string) => {
        setSelectedRegion(region);
        // You can fetch data based on the region clicked
    };

    return (
        <div className="relative">
            // Interactive Map UI
            <svg
                width="600"
                height="400"
                viewBox="0 0 600 400"
                className="cursor-pointer"
            >
                // Example region (Make this dynamic later)
                <rect
                    x="100"
                    y="100"
                    width="100"
                    height="100"
                    fill="green"
                    onClick={() => handleRegionClick("Central Java")}
                />
            </svg>

            // Show Popup when a region is selected
            {selectedRegion && <Popup region={selectedRegion} onClose={() => setSelectedRegion(null)} />}
        </div>
    );
};

export default Map;

*/