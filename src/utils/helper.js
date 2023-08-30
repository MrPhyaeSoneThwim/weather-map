function generateRandomCoordinates() {
	const minLat = 8.18;
	const maxLat = 23.39;
	const minLng = 102.14;
	const maxLng = 109.46;

	const lat = Math.random() * (maxLat - minLat) + minLat;
	const lng = Math.random() * (maxLng - minLng) + minLng;

	return [lat, lng];
}

// Generate sample heatmap data for Vietnam
export function generateHeatmapData(numPoints) {
	const heatmapData = [];

	for (let i = 0; i < numPoints; i++) {
		const coordinates = generateRandomCoordinates();
		const value = Math.floor(Math.random() * 1000); // Random value for demonstration
		heatmapData.push([...coordinates, value]);
	}

	return heatmapData;
}
