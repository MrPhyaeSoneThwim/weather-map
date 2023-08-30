import { useRef } from "react";
import { HeatmapLayer } from "react-leaflet-heatmap-layer-v3";
import ReactLeafletGoogleLayer from "react-leaflet-google-layer";
import { LayersControl, MapContainer, TileLayer } from "react-leaflet";

import { generateHeatmapData } from "./utils/helper";
import LeafletVelocity from "./components/LeafletVelocity";

const numPoints = 1000;
const vietnamHeatmapData = generateHeatmapData(numPoints);

function App() {
	const layerControlRef = useRef(null);

	return (
		<div className="w-full h-full">
			<MapContainer
				zoom={13}
				scrollWheelZoom={true}
				center={[14.0583, 108.2772]}
				style={{ width: "100%", height: "100%" }}
			>
				<LayersControl position="topright" ref={layerControlRef}>
					<LayersControl.Overlay checked name="Map">
						<TileLayer url="http://{s}.sm.mapstack.stamen.com/(toner-lite,$fff[difference],$fff[@23],$fff[hsl-saturation@20])/{z}/{x}/{y}.png" />
					</LayersControl.Overlay>
				</LayersControl>
				<HeatmapLayer
					fitBoundsOnLoad
					fitBoundsOnUpdate
					points={vietnamHeatmapData}
					longitudeExtractor={(m) => m[1]}
					latitudeExtractor={(m) => m[0]}
					intensityExtractor={(m) => parseFloat(m[2])}
					radius={20}
					blur={20}
					maxZoom={18}
					minOpacity={0.5}
					maxOpacity={1}
				/>
				<LeafletVelocity ref={layerControlRef} />
			</MapContainer>
		</div>
	);
}

export default App;
