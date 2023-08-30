import "leaflet-velocity/dist/leaflet-velocity.css";
import "leaflet-velocity/dist/leaflet-velocity.js";
import { forwardRef, useEffect } from "react";
import L from "leaflet";
import { useMap } from "react-leaflet";

const LeafletVelocity = forwardRef((props, ref) => {
	const map = useMap();

	useEffect(() => {
		if (!map) return;

		let mounted = true;
		let windGlobalLayer;

		fetch("https://onaci.github.io/leaflet-velocity/wind-global.json")
			.then((response) => response.json())
			.then((data) => {
				if (!mounted) return;

				windGlobalLayer = L.velocityLayer({
					displayValues: true,
					displayOptions: {
						velocityType: "Velocity",
						position: "bottomleft",
						emptyString: "No water data",
					},
					data: data,
					maxVelocity: 0.2,
					colorScale: [
						"rgb(216, 220, 235)",
						"rgb(225, 232, 238)",
						"rgb(240, 247, 245)",
						"rgb(247, 251, 240)",
						"rgb(253, 255, 243)",
						"rgb(255, 255, 255)",
						"rgb(255, 251, 229)",
						"rgb(255, 244, 206)",
						"rgb(255, 222, 184)",
						"rgb(255, 207, 163)",
						"rgb(255, 183, 138)",
						"rgb(255, 157, 121)",
						"rgb(255, 143, 113)",
						"rgb(255, 130, 115)",
						"rgb(255, 107, 120)",
					],
					velocityScale: 0.1, // arbitrary default 0.005
				});

				if (ref?.current && windGlobalLayer) {
					map.addLayer(windGlobalLayer);
					ref?.current?.addOverlay(windGlobalLayer, "Wind - Global");
				}
			})
			.catch((err) => console.log(err));

		return () => {
			mounted = false;
			if (ref?.current) {
				map.removeLayer(windGlobalLayer);
				ref?.current.removeOverlay(windGlobalLayer);
			}
		};
	}, [map]);

	return null;
});

export default LeafletVelocity;
