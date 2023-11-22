import axios from "axios";

const apiUrl = "https://visitedcitiesapi.azurewebsites.net";

const API = axios.create({ baseURL: apiUrl });

API.interceptors.request.use((req) => {
    if (localStorage.getItem('user')) {
      req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('user')).token}`;
    }
  
    return req;
});

export async function getLocationsBySearch(value) {
	const requestData = {
		name: value,
		locationSearchParameters: {
			exactMatch: false,
		},
	};
	
	const { data } = await API.post("/api/Locations/GetLocations", requestData)

	return data;
}

export async function addNewLocationById(locationId) {
	await API.post(`/api/Visit/Visit/${locationId}`);
}

export async function getAllUserLocations() {
	const { data } = await API.get("/api/Visit/GetVisitedLocations");

	return data;
}