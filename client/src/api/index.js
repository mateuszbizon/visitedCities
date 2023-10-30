import axios from "axios";

const apiUrl = "https://visitedcitiesapi.azurewebsites.net";

export async function getLocationsBySearch(value) {
	const requestData = {
		name: value,
		locationSearchParameters: {
			exactMatch: false,
		},
	};

	try {
        const { data } = await axios.post(apiUrl + "/api/Locations/GetLocations", requestData);

        return data;
    } catch (error) {
        console.log(error)
    }
}
