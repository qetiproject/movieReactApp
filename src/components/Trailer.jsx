import { Button } from "react-bootstrap";
import { Link } from 'react-router-dom'
import { Col } from "react-bootstrap"
import './Trailer.scss'

const Trailer = (props) => {

    const { 
        originalName, year, duration, releaseDate, plot, rating, imdbUrl, secondaryName
      } = props.trailer;

    const cover = props.trailer.covers.data
    const description = plot.data.description
    const genres = props.trailer.genres.data
    // hoverze - svg ფოტოებია გამოყენებული
    const trailer = props.trailer.trailers?.data[0]?.fileUrl
    
    return(
        <>
            <Col md={4} lg={3} sm={6}>
                <article>
                    <img className="img" src={cover[510]} alt={originalName} />
                    <h3>{originalName || secondaryName}</h3>
                    <div className="d-flex justify-content-between w-100">
                        <span>{year} წ.</span>
                        <span>{duration}</span>
                    </div>
                    <div className="mt-3">
                        <b>IMDB</b> <span>{rating.imdb.score}</span>
                    </div>
                    <p>Release Date: {releaseDate}</p>
                    <p>Genre: {genres.map((g) => {return g.secondaryName + ' '})}</p>
                    <video width="100%" height="200" controls>
                        {<source src={trailer} type="video/mp4"></source>}
                    </video>
                    <p>{description.substring(0, 70)}</p>
                    <Link to={`${imdbUrl.slice(20)}`}>
                        <Button variant="success" className="mt-3 mb-3">See More</Button>{' '}
                    </Link>
                </article>
            </Col>
        </>
    )
}

export default Trailer