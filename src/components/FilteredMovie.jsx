import { Col, Container, Row } from "react-bootstrap"
import { environment } from "../environments/environments"
import './Trailer.scss'
import { MovieInfo, Article } from './movie';

const FilteredMovie = (props) => {
    const imdbUrl = environment.ImdbUrl

    return(
        <>
           <Container>
               <Row>
                 {  props.filtered.map((f) => {
                     return <Col md={4} lg={3} sm={6}>
                        <Article>
                            <div className="movieImg">
                                <img className="img" src={f.backdrop} alt={f.name} />
                            </div>
                            <h6>{f.name}</h6>
                            <span>{f.original_title}</span>
                            <div className="lang">{f.langs}</div>
                            <MovieInfo>
                                <div className="d-flex ">
                                    <span className="imdb" onClick={() =>  window.location.href = `${imdbUrl}/${f.imdb_id}`}>IMDB</span>
                                    <span>{f.tmdb_vote_average}</span>
                                </div>
                                <span className="year">{f.year} წ.</span>
                            </MovieInfo>
                        </Article>
                    </Col>
                    })
                 }
               </Row>
           </Container>
        </>
    )
}

export default FilteredMovie