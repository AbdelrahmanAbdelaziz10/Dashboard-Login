import React from 'react'

const SRMap = () => {
  return (
    <div>
      
    </div>
  )
}

export default SRMap


// import React, { useEffect, useState } from "react";
// import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
// import { Card, Col, Container, Row } from "react-bootstrap";
// import { Link } from "react-router-dom";

// const SRMap = () => {
//   const [mapCenter, setMapCenter] = useState(null);
//   const [markerPosition, setMarkerPosition] = useState(null);
//   const [servesDetails, setServesDetails] = useState({});

//   const handleAddAddress = () => {
//     if (markerPosition) {
//       setServesDetails({
//         ...servesDetails,
//         latitude: markerPosition.lat,
//         longitude: markerPosition.lng,
//       });
//       console.log("Saved address:", {
//         lat: markerPosition.lat,
//         lng: markerPosition.lng,
//       });
//     }
//   };

//   const handleMapClick = (event) => {
//     setMarkerPosition({
//       lat: event.latLng.lat(),
//       lng: event.latLng.lng(),
//     });
//   };

//   useEffect(() => {
//     navigator.geolocation.getCurrentPosition(
//       (position) => {
//         const { latitude, longitude } = position.coords;
//         setMapCenter({ lat: latitude, lng: longitude });
//       },
//       (error) => {
//         console.error("Error getting user location:", error);
//       }
//     );
//   }, []);

//   return (
//     <div className="main_address py-5">
//       <Container>
//         <Row className="justify-content-center">
//           <Col xs={12} lg={6} md={9} sm={12}>
//             <Card className="address_card my-2">
//               <div className="row d-flex align-items-center">
//                 <Col xs={1}>
//                   <Link to="/">
//                     <KeyboardArrowLeftIcon className="arrow_icon arrow_icon_en" />
//                   </Link>
//                 </Col>
//                 <Col xs={10}>
//                   <h4 className="text-center">Address</h4>
//                 </Col>
//               </div>

//                     <LoadScript googleMapsApiKey="AIzaSyCqAeZ8WASm99pFDLG1t1QlHu0ocIZxh9I">
//                 {mapCenter && (
//                   <GoogleMap
//                     center={mapCenter}
//                     zoom={15}
//                     mapContainerStyle={{ width: "100%", height: "400px" }}
//                     onClick={handleMapClick}
//                   >
//                     {markerPosition && <Marker position={markerPosition} />}
//                   </GoogleMap>
//                 )}
//               </LoadScript>

//               <div className="col-8 submit_btn mt-4">
//                 <button onClick={handleAddAddress} className="btn mb-4 mx-4 sing_in">
//                   Add Address
//                 </button>
//               </div>
//             </Card>
//           </Col>
//         </Row>
//       </Container>
//     </div>
//   );
// };

// export default SRMap;
