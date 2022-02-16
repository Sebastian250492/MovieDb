import axios from "axios";
import { TMDB_API_KEY } from "./apiKey"

export default axios.create({
	baseURL: "https://api.themoviedb.org/3",
	params: {
		api_key: `${TMDB_API_KEY}`,
	},
});
