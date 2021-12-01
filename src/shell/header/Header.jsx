import { Container, Form, FormControl, Nav, Navbar } from "react-bootstrap"
import { Link } from "react-router-dom";
import "./Header.scss"
import logo from "../../assets/images/logo.svg"
import { Switch, Route, useHistory } from "react-router";
import { Home, About } from '../../components/index'
import { NotFound } from '../index'
import TrailerDetail from "../../components/TrailerDetail";
import { useState, useEffect } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { environment } from "../../environments/environments";

const Header = () => {
    const weatherApi = environment.CurrentWeatherApi
    const appId = '6d217162faf15d9295107ee24f2ec1b8'
    const [input, setInput] = useState('')
    const [error, setError] = useState('')
    const dispatch = useDispatch()
    const weather = useSelector(state => state.weather)
    const history = useHistory()

    const inputHandler = (value) => {
        setInput(value) ;
        history.push("/")
    }

    const getCurrentWeather = async (city) => {
        try{
            const response = await axios.get(`${weatherApi}/weather?q=${city}&appid=${appId}`)
            localStorage.setItem('currentWeather', JSON.stringify(response.data))
            dispatch({
                type: 'SUCCESS',
                data: Array({'key': 'value'})
            })
        }catch(e) {
            setError(e.message)
            dispatch({
                type: 'FAIL',
            })

            localStorage.setItem('currentWeather', '')
        }
    }

    useEffect(() => {
        getCurrentWeather('tbilisi')
        const currentWeather = localStorage.getItem('currentWeather')
    }, [])

    return(
        <>
            <Navbar bg="light" expand="lg">
                <Container>
                    <Link to="/" className="logo">
                        <img src={logo} alt="logo" />
                    </Link>
                    <Navbar.Toggle aria-controls="navbarScroll" />
                    <Navbar.Collapse id="navbarScroll">
                    <Nav
                        className="me-auto my-2 my-lg-0"
                        style={{ maxHeight: '100px' }}
                        navbarScroll
                    >
                        <Link to="/">Homepage</Link>
                        <Link to="/about">About</Link>
                    </Nav>
                    {/* {
                        Object.keys(weather).length > 0 &&  <span>{Math.round(weather.main.temp - 273.15) + '°C'}</span>
                    } */}
                    <Form className="d-flex">
                        <FormControl
                            type="search"
                            placeholder="Search"
                            className="me-2"
                            aria-label="Search"
                            value={input}
                            onChange = {(e) => inputHandler(e.target.value)}
                        />
                    </Form>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
            <Switch>
                <Route exact path="/" 
                    render={() => <Home keyword ={input}/>}
                />
                <Route exact path="/about" component={About} />
                <Route exact path="/title/:id" component={TrailerDetail} />
                <Route exact path="*" component={NotFound} />
            </Switch>

        </>
    )
}

export default Header