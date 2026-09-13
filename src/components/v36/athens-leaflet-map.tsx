"use client";

import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import { LANDMARKS, type Landmark } from "@/data";

const createV36Icon = () => {
  return L.divIcon({
    className: "custom-v36-marker-pin",
    html: `
      <div style="position: relative; width: 44px; height: 56px; display: flex; align-items: center; justify-content: center; transform: translate(-50%, -100%); cursor: pointer;">
        <svg width="44" height="56" viewBox="0 0 44 56" fill="none" xmlns="http://www.w3.org/2000/svg" style="filter: drop-shadow(0px 6px 14px rgba(0, 0, 0, 0.35));">
          <path d="M22 0C9.84974 0 0 9.84974 0 22C0 35.2 17.6 52.8 21.1 55.4C21.6 55.8 22.4 55.8 22.9 55.4C26.4 52.8 44 35.2 44 22C44 9.84974 34.1503 0 22 0Z" fill="#121212"/>
        </svg>
        <div style="position: absolute; top: 11px; text-align: center; color: #FFFFFF; font-family: var(--font-playfair), Georgia, serif; line-height: 1.1;">
          <div style="font-size: 11px; font-weight: 700; letter-spacing: 0.5px; display: flex; align-items: center; justify-content: center;">
            <span>V</span><span style="font-size: 8px; font-weight: 800; transform: translateY(-2px);">36</span>
          </div>
          <div style="font-size: 6px; letter-spacing: 0.6px; opacity: 0.8; font-weight: 400; text-transform: uppercase; margin-top: 1px;">Suites</div>
        </div>
      </div>
    `,
    iconSize: [44, 56],
    iconAnchor: [22, 56],
    popupAnchor: [0, -52],
  });
};

const createLandmarkIcon = (isActive: boolean) => {
  return L.divIcon({
    className: "custom-landmark-pin",
    html: `
      <div style="position: relative; width: 24px; height: 24px; display: flex; align-items: center; justify-content: center; transform: translate(-50%, -50%); cursor: pointer;">
        <div style="
          width: ${isActive ? '20px' : '12px'};
          height: ${isActive ? '20px' : '12px'};
          background-color: ${isActive ? '#B58E58' : '#1E1E1E'};
          border: 2.5px solid #FFFFFF;
          border-radius: 50%;
          box-shadow: 0 3px 10px rgba(0,0,0,0.3);
          transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
        "></div>
      </div>
    `,
    iconSize: [24, 24],
    iconAnchor: [12, 12],
    popupAnchor: [0, -14],
  });
};

function MapController({ activeLandmark }: { activeLandmark: Landmark | undefined }) {
  const map = useMap();

  useEffect(() => {
    if (activeLandmark && activeLandmark.lat && activeLandmark.lng) {
      map.flyTo([activeLandmark.lat, activeLandmark.lng], 15.5, {
        duration: 1.2,
      });
    }
  }, [activeLandmark, map]);

  return null;
}

export default function AthensLeafletMap({
  activeId,
  onSelectLandmark,
}: {
  activeId: string;
  onSelectLandmark: (id: string) => void;
}) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="h-[420px] w-full animate-pulse rounded-2xl bg-stone/40 border border-charcoal/10" />
    );
  }

  const v36 = LANDMARKS.find((l) => l.id === "v36") || LANDMARKS[0];
  const activeLandmark = LANDMARKS.find((l) => l.id === activeId);

  return (
    <div className="relative h-[420px] w-full overflow-hidden rounded-2xl border border-charcoal/10 shadow-sm">
      <MapContainer
        center={[v36.lat, v36.lng]}
        zoom={15}
        scrollWheelZoom={false}
        className="h-full w-full z-0"
        zoomControl={false}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          maxZoom={19}
        />

        <MapController activeLandmark={activeLandmark} />

        {/* V36 Suites Marker */}
        <Marker
          position={[v36.lat, v36.lng]}
          icon={createV36Icon()}
          eventHandlers={{
            click: () => onSelectLandmark("v36"),
          }}
        >
          <Popup>
            <div className="p-1 text-center">
              <span className="font-display font-bold text-sm text-charcoal">V36 Suites</span>
              <p className="text-[11px] text-gray-500 mt-0.5">Voulis 36, Syntagma, Athens</p>
            </div>
          </Popup>
        </Marker>

        {/* Other Landmarks */}
        {LANDMARKS.filter((l) => l.id !== "v36").map((lm) => {
          const isActive = lm.id === activeId;
          return (
            <Marker
              key={lm.id}
              position={[lm.lat, lm.lng]}
              icon={createLandmarkIcon(isActive)}
              eventHandlers={{
                click: () => onSelectLandmark(lm.id),
              }}
            >
              <Popup>
                <div className="p-1">
                  <div className="font-display font-semibold text-sm">{lm.name}</div>
                  <div className="text-[11px] text-[#B58E58] font-medium mt-0.5">
                    {lm.walkMinutes} min walk ({lm.walkMeters}m)
                  </div>
                  <p className="text-[11px] text-gray-600 mt-1 max-w-[200px] leading-snug">
                    {lm.description}
                  </p>
                </div>
              </Popup>
            </Marker>
          );
        })}
      </MapContainer>
    </div>
  );
}
