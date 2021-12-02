import axios from "axios"
import { environment } from "../environments/environments"

export const currentWeather = (city) => {
    const weatherApi = environment.CurrentWeatherApi
    const appId = '6d217162faf15d9295107ee24f2ec1b8'

    return axios.get(`${weatherApi}/weather?q=${city}&appid=${appId}`)
}