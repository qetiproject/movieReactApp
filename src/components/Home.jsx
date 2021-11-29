import { Col, Container, Row } from "react-bootstrap"
import { environment } from '../environments/environments'
import Trailer from "./Trailer"
import axios from "axios"
import { useEffect, useState } from "react"
import './Trailer.scss'

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
                <section className="mt-3 mb-3">
                    <h3 className="mt-2 mb-2">ტრეილერები</h3>
                    <Row className="d-flex">
                        
                            {
                                trailers.map((trailer, index) => {
                                    return <Trailer 
                                        trailer = {trailer} key={index}
                                    />
                                })
                            }
                    </Row>
                </section>
                <div>
                    {displeyErrors()}
                </div>
            </Container>
        </>
    )
}

export default Home