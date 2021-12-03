import { Col } from "react-bootstrap"
import './Trailer.scss'
import { MovieInfo, Article } from './movie';

const Trailer = (props) => {
    const { 
        originalName, secondaryName, year, rating, imdbUrl
      } = props.trailer;

    const cover = props.trailer.covers.data
    const language = props.trailer.trailers?.data[0]?.language

    const redirect = () => {
        window.location.href = `${imdbUrl}`
    }

    return(
        <>
            <Col md={4} lg={3} sm={6}>
                <Article>
                    <div className="movieImg">
                        <img className="img" src={cover[510]} alt={originalName} />
                    </div>
                    <h4>{originalName || secondaryName}</h4>
                    <div className="lang">{language}</div>
                    <MovieInfo>
                        <div className="d-flex ">
                            <span className="imdb" onClick={() => redirect()}>IMDB</span>
                            <span>{rating.imdb.score}</span>
                        </div>
                        <span className="year">{year} წ.</span>
                    </MovieInfo>
                </Article>
            </Col>
        </>
    )
}

export default Trailer