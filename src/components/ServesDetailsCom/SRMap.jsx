import React, { useContext, useEffect, useState } from "react";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import { Card, Col, Container, Row } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";


const SRMap = () => {
  const [mapCenter, setMapCenter] = useState(null);
  const [markerPosition, setMarkerPosition] = useState(null);

  const navigate = useNavigate();

  // Automatically get user location on mount
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      ({ coords }) => {
        const { latitude, longitude } = coords;
        const userLocation = { lat: latitude, lng: longitude };
        setMapCenter(userLocation);
        setMarkerPosition(userLocation);
      },
      (error) => console.error("Error getting location:", error),
      { enableHighAccuracy: true }
    );
  }, []);

  // Handle map click to move marker
  const handleMapClick = (event) => {
    const lat = event.latLng.lat();
    const lng = event.latLng.lng();
    setMarkerPosition({ lat, lng });
    //         console.log(" mapCenter:", mapCenter);
    // console.log("Selected coordinates:", markerPosition);
  };

 

  useEffect(() => {
    window.scrollTo(0, 0);


  }, []);

  return (
     

              <div className="">
                <LoadScript googleMapsApiKey="AIzaSyBrgBBWX4PHPWcna4wXPhGvwK7d-leCZQk">
                  {mapCenter && (
                    <GoogleMap
                      center={mapCenter}
                      zoom={15}
                      onClick={handleMapClick}
                      mapContainerStyle={{
                        width: "100%",
                        height: "78vh",
                        borderRadius: "10px",
                      }}
                    >
                      {markerPosition && <Marker position={markerPosition} />}
                    </GoogleMap>
                  )}
                </LoadScript>
              </div>

         
          
  );
};

export default SRMap;
