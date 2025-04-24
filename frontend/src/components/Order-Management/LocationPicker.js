// components/MapSelector.js
import React, { useEffect, useRef } from 'react';

const MapSelector = ({ onSelectLocation }) => {
  const mapRef = useRef(null);
  const markerRef = useRef(null);

  useEffect(() => {
    const map = new window.google.maps.Map(mapRef.current, {
      center: { lat: 6.9271, lng: 79.8612 }, // Default to Colombo
      zoom: 13,
    });

    map.addListener('click', async (event) => {
      const lat = event.latLng.lat();
      const lng = event.latLng.lng();

      if (markerRef.current) {
        markerRef.current.setMap(null);
      }

      markerRef.current = new window.google.maps.Marker({
        position: { lat, lng },
        map,
      });

      // Get address from coordinates
      const geocoder = new window.google.maps.Geocoder();
      const response = await geocoder.geocode({ location: { lat, lng } });
      const address = response.results?.[0]?.formatted_address || '';

      onSelectLocation({ lat, lng, address });
    });
  }, [onSelectLocation]);

  return <div ref={mapRef} style={{ height: '400px', width: '100%' }} />;
};

export default MapSelector;

