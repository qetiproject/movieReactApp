import axios from "axios"
import { useState, useEffect } from "react"
import { Col, Container, Row } from "react-bootstrap"
import { environment } from "../environments/environments"

const FilteredTrailer = (props) => {
    const keyword = props.keyword
    const filteredTrailersUrl = environment.FilteredTrailersUrl
    const [error, setError] = useState('')
    const [filteredTrailers, setFilteredTrailers] = useState([])

    const displeyErrors = () => {
        return <span>{error}</span>
    }
    
    const searchTrailers = async (keyword) => {
        try{
            const response = await axios.get(`${filteredTrailersUrl}?keywords=${keyword}&filters%5Btype%5D=movie%2Ccast&page=1&per_page=10`)
            setFilteredTrailers(response.data.data)
        }catch(e) {
            setError('')
            setError(e.message)
        }
    }

    useEffect(() => {
        searchTrailers(keyword)
    }, [keyword])

    return(
        <>
            <Container>
                <Row className="d-flex">
                    <Col md={4} lg={3} sm={6}>
                        {
                            filteredTrailers.map((f) => {
                                console.log(f.languages?.data[0])
                                return <article>
                                            <img src={f.posters?.data[240] || f.poster} alt={f.secondaryName} /> 
                                            <span>IMDB {f.rating.imdb.score}</span>
                                            <span>{f.languages.data[2]?.code}</span>
                                            <span>{f.year}</span>
                                            <p>{f.primaryDescription}</p>
                                        </article>
                            })
                        }
                    </Col>
                </Row>
                <div>
                    {displeyErrors()}
                </div>
           </Container>
        </>
    )
}

export default FilteredTrailer