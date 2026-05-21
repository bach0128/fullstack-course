import axios from "axios";
const apiUrl = import.meta.env.VITE_API_URL

export default async function getCountries(name) {
    const response = await axios.get(`${apiUrl}/${name}`)
    return response.data
}