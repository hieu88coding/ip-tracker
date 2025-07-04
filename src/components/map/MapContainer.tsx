import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
interface MapViewProps {
  center: [number, number];
  zoom?: number;
  popupText?: string;
}

const MapView = ({
  center,
  zoom = 13,
  popupText = "You are here!",
}: MapViewProps) => {
  console.log(center);

  return (
    <MapContainer
      key={center.join(",")}
      center={center}
      zoom={zoom}
      scrollWheelZoom={false}
      style={{ height: "400px", width: "100%" }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={center}>
        <Popup>{popupText}</Popup>
      </Marker>
    </MapContainer>
  );
};

export default MapView;
