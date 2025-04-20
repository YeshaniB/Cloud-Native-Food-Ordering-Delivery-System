// LocationPicker.jsx
import React, { useRef, useCallback } from "react";
import { LoadScript } from "@react-google-maps/api";

const libraries = ["places"];

const LocationPicker = ({ onAddressSelect }) => {
  const inputRef = useRef(null);

  const handleLoad = useCallback(() => {
    const autocomplete = new window.google.maps.places.Autocomplete(inputRef.current, {
      types: ["geocode"],
    });

    autocomplete.addListener("place_changed", () => {
      const place = autocomplete.getPlace();
      if (place.formatted_address) {
        onAddressSelect(place.formatted_address);
      }
    });
  }, [onAddressSelect]);

  return (
    <LoadScript googleMapsApiKey="YOUR_API_KEY" libraries={libraries} onLoad={handleLoad}>
      <input
        ref={inputRef}
        placeholder="Enter your address"
        style={{ width: "100%", padding: "10px", fontSize: "16px" }}
      />
    </LoadScript>
  );
};

export default LocationPicker;
