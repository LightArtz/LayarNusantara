// POPUP for the information of the region

function Popup() {
  return (
    <div>
      
    </div>
  )
}

export default Popup

/* CONTOH!!
"use client";

import { useEffect, useState } from "react";

const Popup = ({ region, onClose }: { region: string; onClose: () => void }) => {
    const [regionData, setRegionData] = useState<any>(null);

    useEffect(() => {
        // Simulate fetching data for the region
        setTimeout(() => {
            setRegionData({
                name: region,
                description: `This is ${region}, rich in culture and history.`,
            });
        }, 500);
    }, [region]);

    return (
        <div className="absolute top-10 left-10 p-4 bg-white shadow-md border rounded">
            <h2 className="text-lg font-bold">{regionData?.name}</h2>
            <p>{regionData?.description}</p>
            <button onClick={onClose} className="mt-2 bg-red-500 text-white p-2 rounded">
                Close
            </button>
        </div>
    );
};

export default Popup;


*/