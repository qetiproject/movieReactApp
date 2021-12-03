import axios from "axios"
import { environment } from "../environments/environments"

export const searchMovieByKeyword = (keyword) => {
    const filteredDataUrl = environment.FilteredDataUrl

    return axios.get(`${filteredDataUrl}/${keyword}`)
}

export const getTrailersData = (page, count) => {
    const trailersDataUrl = environment.TrailersDataUrl

    return axios.get(`${trailersDataUrl}?page=${page}&per_page=${count}`)
}