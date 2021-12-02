import { useState, useEffect } from "react"
import { Col, Container, Row } from "react-bootstrap"
import { environment } from "../environments/environments"

const FilteredTrailer = (props) => {
    const keyword = props.keyword
    const imdbUrl = environment.ImdbUrl
    // const filteredTrailersUrl = environment.FilteredTrailersUrl
    const [error, setError] = useState('')
    // const [filteredTrailers, setFilteredTrailers] = useState([])

    const displeyErrors = () => {
        return <span>{error}</span>
    }
    
    // const searchTrailers = async (keyword) => {
    //     try{
    //         const response = await axios.get(`${filteredTrailersUrl}/${keyword}`)
    //         setFilteredTrailers(response.data.pagination.data)
    //     }catch(e) {
    //         setError('')
    //         setError(e.message)
    //     }
    // }

    useEffect(() => {
        // searchTrailers(keyword)
    }, [])

    return(
        <>
            <Container>
                <Row className="d-flex">
                    <Col md={4} lg={3} sm={6}>
                        {
                            props.filtered.map((f) => {
                                // console.log(f, "f")
                                return <article>
                                            <img src={f.poster || f.backdrop} alt={f.name} /> 
                                             <span>IMDB {f.tmdb_vote_average}</span>
                                             <span>{imdbUrl}/{f.imdb_id}</span>
                                             {console.log(imdbUrl, "imdb")}
                                             {console.log(f.imdb_id, "id")}
                                            <span>{f.langs}</span>
                                            <span>{f.year}</span>
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