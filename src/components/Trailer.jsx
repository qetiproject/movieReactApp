import { Button } from "react-bootstrap";
import { Link } from 'react-router-dom'

const Trailer = (props) => {

    const { 
        originalName, year, duration, releaseDate, genres, plot, rating, trailers, imdbUrl
      } = props.trailers;

    return(
        <>
           <div>
                <p>{duration}</p>
                <p>{year} წ.</p>
                <p>{originalName}</p>
                <p>{releaseDate}</p>
                <p>{genres.data[0].secondaryName}</p>
                <p>{plot.data.description}</p>
                <p>{rating.imdb.score}</p>
                <p>{JSON.stringify(trailers.data[0])}</p>
                <Link to={`${imdbUrl.slice(20)}`}>
                    <Button variant="primary">more</Button>{' '}
                </Link>
           </div>

           
           <br/>
        </>
    )
}

export default Trailer