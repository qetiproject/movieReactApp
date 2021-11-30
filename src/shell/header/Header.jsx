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

const Header = () => {
    const [input, setInput] = useState('')
    const [error, setError] = useState('')
    const dispatch = useDispatch()
    const weather = useSelector(state => state.weather)
    const history = useHistory()

    const inputHandler = (value) => {
        setInput(value) ;
        history.push("/")
    }

    //weather's api უნდა იყო, უბრალოდ ვერ ვიპოვე
    const getTrailers = async () => {
        try{
            const response = await axios.get('https://www.googleapis.com/books/v1/volumes?q=sharlok')
            localStorage.setItem('currentWeather', response.data?.items[0].id)

            dispatch({
                type: 'SUCCESS',
                data: response.data?.items[0].id
            })

        }catch(e) {
            // setError(e.message)
            dispatch({
                type: 'FAIL',
            })

            localStorage.setItem('currentWeather', '')
        }
    }

    useEffect(() => {
        getTrailers()
        // const currentWeather = localStorage.getItem('currentWeather')
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
                    <span>{weather}</span>
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