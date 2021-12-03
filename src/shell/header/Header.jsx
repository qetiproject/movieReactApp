import { Container, Form, FormControl, Nav, Navbar, Button, Col } from "react-bootstrap"
import { Link } from "react-router-dom";
import "./Header.scss"
import "../../App.css"
import logo from "../../assets/images/logo.svg"
import { Switch, Route } from "react-router";
import { Home, About } from '../../components/index'
import { NotFound } from '../index'
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { currentWeather }  from '../../services/weatherService'
import { searchMovieByKeyword } from '../../services/movieService'

const Header = () => {
    const [input, setInput] = useState('')
    const [error, setError] = useState('')
    const [filteredData, setFilteredData] = useState([])
    const dispatch = useDispatch()
    const weather = useSelector(state => state.weather)

    const getCurrentWeather = async (city) => {
        try{
            const response = await currentWeather(city)
            localStorage.setItem('currentWeather', response.data)
            dispatch({
                type: 'SUCCESS',
                data: response.data
            })
        }catch(e) {
            setError('')
            setError(e.message)
            dispatch({
                type: 'FAIL',
            })

            localStorage.setItem('currentWeather', '')
        }
    }

    const searchMovie = async (keyword) => {
        try{
            const response = await searchMovieByKeyword(keyword)
            setFilteredData(response.data.pagination.data)
        }catch(e) {
            setError('')
            setError(e.message)
        }
    }

    const inputHandler = (value) => {
        setInput(value) ;
    }

    const search = () => {
        searchMovie(input)
    }

    useEffect(() => {
        getCurrentWeather('tbilisi')
    }, [])

    return(
        <>
            <Navbar bg="light" expand="lg">
                <Container>
                    <Col xs={4} md={1} lg={1}>
                        <Link to="/" className="w-100 pl-5">
                            <img src={logo} alt="logo" />
                        </Link>
                    </Col>
                    <Navbar.Toggle aria-controls="navbarScroll" />
                    <Navbar.Collapse id="navbarScroll">
                        <Col lg={5}>
                            <Nav
                                className="me-auto my-2 my-lg-0 nav"
                                navbarScroll
                            >
                                <Link to="/">Homepage</Link>
                                <Link to="/about">About</Link>
                            </Nav>
                        </Col>
                        <Col lg={1}>
                            {
                                Object.keys(weather).length > 0 &&  <span>{Math.round(weather.main.temp - 273.15) + '°C'} {weather.name}</span>
                            }    
                        </Col>
                        <Col >
                            <Form className="d-flex pl-3">
                                <FormControl
                                    type="search"
                                    placeholder="Search"
                                    className="me-2"
                                    aria-label="Search"
                                    value={input}
                                    onChange = {(e) => inputHandler(e.target.value)}
                                />
                                <Button variant="success" onClick={() => search()}>Search</Button>{' '}
                            </Form>
                        </Col>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
            <Container>
                <div className="error">{error}</div>
            </Container>
            <Switch>
                <Route exact path="/" 
                    render={() => <Home keyword ={input} filtered={filteredData} />}
                />
                <Route exact path="/about" component={About} />
                <Route exact path="*" component={NotFound} />
            </Switch>

        </>
    )
}

export default Header