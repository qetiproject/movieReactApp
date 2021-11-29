import { Container } from "react-bootstrap"
import { environment } from '../environments/environments'
import Trailer from "./Trailer"
import axios from "axios"
import { useEffect, useState } from "react"

const Home = () => {
    const trailersDataUrl = environment.TrailersDataUrl
    const [trailers, setTrailers] = useState([])
    const [error, setError] = useState('')

    const displeyErrors = () => {
        return <span>{error}</span>
    }

    const getTrailers = async (page, count) => {
        try{
            const response = await axios.get(`${trailersDataUrl}?page=${page}&per_page=${count}`)
            setTrailers(response.data.data)
        }catch(e) {
            setError(e.message)
        }
    }

    useEffect(() => {
      getTrailers(1, 20)
    }, [])

    return(
        <>
            <Container>
                <h1>ტრეილერები</h1>
                {
                    trailers.map((trailer, index) => {
                        return <Trailer 
                            trailers = {trailer} key={index}
                        />
                    })
                }
                <div>
                    {displeyErrors()}
                </div>
            </Container>
        </>
    )
}

export default Home