import { Container, Row } from "react-bootstrap"
import Trailer from "./Trailer"
import { useEffect, useState } from "react"
import './Trailer.scss'
import FilteredTrailer from "./FilteredTrailer"
import axios from "axios"
import { environment } from "../environments/environments"

const Home = (props) => {
    const filtered = props.filtered
    const keyword = props.keyword
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
                {
                    filtered.length > 0 && <FilteredTrailer filtered={filtered}/>

                } 
                {
                    filtered.length === 0 && <>
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
                </>
                }
                
            </Container>
        </>
    )
}

export default Home