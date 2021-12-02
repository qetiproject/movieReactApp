import axios from "axios"
import { environment } from "../environments/environments"

export const searchMovieByKeyword = (keyword) => {
    const filteredDataUrl = environment.FilteredDataUrl

    return axios.get(`${filteredDataUrl}/${keyword}`)
}