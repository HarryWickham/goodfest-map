import React, { useRef, useEffect, useState } from "react";
import mapboxgl from "mapbox-gl";
import ReactModal from "react-modal";
import Stage from "./markers/Stage";
import Henna from "./markers/Henna";
import Merch from "./markers/Merch";
import Hornets from "./markers/Hornets";
import { createRoot } from "react-dom/client";
import Food from "./markers/Food";
import GlassHouse from "./markers/GlassHouse";
import { IoPizzaOutline, IoBeerOutline, IoShirtOutline } from "react-icons/io5";
import { BsSpeaker } from "react-icons/bs";
import styled from "styled-components";
const { REACT_APP_MAPACCESSTOKEN } = process.env;

mapboxgl.accessToken = REACT_APP_MAPACCESSTOKEN;

const MapContainer = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
`;

const Title = styled.div`
  position: absolute;
  z-index: 0;
  display: flex;
  padding-top: 16px;
  width: 100vw;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

const Logo = styled.img`
  height: 50px;
`;

const Map = () => {
  const mapContainerRef = useRef(null);

  const [lng, setLng] = useState(5);
  const [lat, setLat] = useState(34);
  const [zoom, setZoom] = useState(1.5);
  const [showModal, setShowModal] = useState(false);
  const [modalContent, setModalContent] = useState();
  // Initialize map when component mounts
  useEffect(() => {
    const box = [
      [-1.03497, 53.94624],
      [-1.02813, 53.95003],
    ];
    const map = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: "mapbox://styles/mapbox/streets-v11",
      center: [lng, lat],
      zoom: zoom,
      maxBounds: box,
    });

    createMarker(
      map,
      53.948434952146755,
      -1.031986604550525,
      <Stage
        closeModal={() => setShowModal(false)}
        onClickFunc={(modalContent) => {
          setShowModal(true);
          setModalContent(modalContent);
        }}
      />,
      <BsSpeaker size={50} />
    );
    createMarker(
      map,
      53.948575229640625,
      -1.0308867066471805,
      <Food
        closeModal={() => setShowModal(false)}
        onClickFunc={(modalContent) => {
          console.log("Open Modal");
          setShowModal(true);
          setModalContent(modalContent);
        }}
      />,
      <IoPizzaOutline size={50} />
    );

    createMarker(
      map,
      53.94880861200045,
      -1.0311021278578778,
      <GlassHouse
        closeModal={() => setShowModal(false)}
        onClickFunc={(modalContent) => {
          console.log("Open Modal");
          setShowModal(true);
          setModalContent(modalContent);
        }}
      />,
      <IoBeerOutline size={50} />
    );

    createMarker(
      map,
      53.94866341962435,
      -1.0312476961189816,
      <GlassHouse
        closeModal={() => setShowModal(false)}
        onClickFunc={(modalContent) => {
          console.log("Open Modal");
          setShowModal(true);
          setModalContent(modalContent);
        }}
      />,
      <IoBeerOutline size={50} />
    );

    createMarker(
      map,
      53.94859357253344,
      -1.0312588227954222,
      <Merch
        closeModal={() => setShowModal(false)}
        onClickFunc={(modalContent) => {
          console.log("Open Modal");
          setShowModal(true);
          setModalContent(modalContent);
        }}
      />,
      <IoShirtOutline size={50} />
    );

    createMarker(
      map,
      53.94862413065013,
      -1.0311939171821223,
      <Henna
        closeModal={() => setShowModal(false)}
        onClickFunc={(modalContent) => {
          console.log("Open Modal");
          setShowModal(true);
          setModalContent(modalContent);
        }}
      />,
      <img src={require("./images/henna.png")} height="50px" width="50px" />
    );

    createMarker(
      map,
      53.948708165355384,
      -1.0314999007907488,
      <Hornets
        closeModal={() => setShowModal(false)}
        onClickFunc={(modalContent) => {
          console.log("Open Modal");
          setShowModal(true);
          setModalContent(modalContent);
        }}
      />,
      <img
        src={require("./images/york-hornets.png")}
        height="50px"
        width="50px"
      />
    );

    map.on("move", () => {
      setLng(map.getCenter().lng.toFixed(4));
      setLat(map.getCenter().lat.toFixed(4));
      setZoom(map.getZoom().toFixed(2));
    });

    const bbox = [
      [-1.033, 53.949],
      [-1.03, 53.948],
    ];
    map.fitBounds(bbox, {
      padding: { top: 10, bottom: 25, left: 15, right: 5 },
    });

    map.on("load", function () {
      console.log("Map loaded");
      map.addSource("radar", {
        type: "image",
        url: "https://www.goodricke.co.uk/wp-content/uploads/2022/04/Nucleus-Map-2.png",
        coordinates: [
          [-1.0313051485826463, 53.94867458853355],
          [-1.0309324482159923, 53.94868076436762],
          [-1.0309243113024706, 53.94834823038076],
          [-1.0313168632305008, 53.94834836762021],
        ],
      });
      map.addLayer({
        id: "radar-layer",
        type: "raster",
        source: "radar",
        paint: {
          "raster-fade-duration": 0,
        },
      });
    });
    // Clean up on unmount
    return () => map.remove();
  }, []);

  return (
    <Container>
      <MapContainer ref={mapContainerRef}>
        <Title>
          <a href="https://www.goodricke.co.uk/">
            <Logo src="https://www.goodricke.co.uk/wp-content/uploads/2022/05/GoodfestLogo2022.png" />
          </a>
        </Title>
      </MapContainer>

      <div id="ReactModal">
        <ReactModal
          isOpen={showModal}
          contentLabel="Map overlay displaying further information of selected marker"
          appElement={document.getElementById("ReactModal")}
          shouldCloseOnEsc={true}
          shouldCloseOnOverlayClick={true}
        >
          {modalContent}
        </ReactModal>
      </div>
    </Container>
  );
};

export default Map;

function createMarker(map, lat, lng, popupElement, markerIcon) {
  const popupNode = document.createElement("div");
  const popupNodeRoot = createRoot(popupNode);
  popupNodeRoot.render(popupElement);
  const popup = new mapboxgl.Popup({ offset: 25 }).setDOMContent(popupNode);
  const markerElement = document.createElement("div");
  const markerElementRoot = createRoot(markerElement);
  markerElementRoot.render(markerIcon);
  markerElement.id = "marker";
  new mapboxgl.Marker(markerElement)
    .setLngLat([lng, lat])
    .setPopup(popup) // add popup
    .addTo(map);
}
