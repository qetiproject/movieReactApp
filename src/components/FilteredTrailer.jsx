import axios from "axios"
import { useState, useEffect } from "react"
import { Container } from "react-bootstrap"
import { environment } from "../environments/environments"

const FilteredTrailer = (props) => {
    const keyword = props.match.params.keyword
    const filteredTrailersUrl = environment.FilteredTrailers
    const [error, setError] = useState('')
    const [filteredTrailers, setFilteredTrailers] = useState([])

    const displeyErrors = () => {
        return <span>{error}</span>
    }
    
    const searchTrailers = async (keyword) => {
        try{
            const response = await axios.get(`${filteredTrailersUrl}?keywords=${keyword}&filters%5Btype%5D=movie%2Ccast&page=1&per_page=10`,
            //  {
            //     headers:{
            //         'access-control-allow-origin': '*',
            //         'access-control-allow-credentials': true,
            //         'content-type': 'application/json',
            //         "content-encoding": "br"
            //     }}
            )
            setFilteredTrailers(response.data.data)
        }catch(e) {
            setError('')
            setError(e.message)

        }
    }


    useEffect(() => {
        searchTrailers(keyword)
    }, [filteredTrailers])

    return(
        <>
            <Container>
                filtered Trailer component
                <div>
                    {displeyErrors()}
                </div>
           </Container>
        </>
    )
}

export default FilteredTrailer