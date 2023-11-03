import axios from "axios";

const apiUrl = "https://visitedcitiesapi.azurewebsites.net";

const API = axios.create({ baseURL: apiUrl });

export async function getLocationsBySearch(value) {
	const requestData = {
		name: value,
		locationSearchParameters: {
			exactMatch: false,
		},
	};

	try {
        const { data } = await API.post("/api/Locations/GetLocations", requestData)

        return data;
    } catch (error) {
        console.log(error)
    }
}
