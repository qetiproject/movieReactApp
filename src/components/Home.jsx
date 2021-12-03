import { Container, Row } from "react-bootstrap"
import Trailer from "./Trailer"
import { useEffect, useState } from "react"
import './Trailer.scss'
import { getTrailersData } from '../services/movieService'

const Home = () => {
    const [trailers, setTrailers] = useState([])
    const [error, setError] = useState('')

    const displeyErrors = () => {
        return <span>{error}</span>
    }

    const getTrailers = async (page, count) => {
        try{
            const response = await getTrailersData(page, count)
            setTrailers(response.data.data)
        }catch(e) {
            setError('')
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
                    <h3 className="mt-2 mb-2">Trailers</h3>
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