import { Container, Form, FormControl, Nav, Navbar, Button } from "react-bootstrap"
import { Link } from "react-router-dom";
import "./Header.scss"
import logo from "../../assets/images/logo.svg"
import { Switch, Route } from "react-router";
import { Home, About } from '../../components/index'
import { NotFound } from '../index'

const Header = () => {
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
                    <Form className="d-flex">
                        <FormControl
                        type="search"
                        placeholder="Search"
                        className="me-2"
                        aria-label="Search"
                        />
                        <Button variant="outline-success">Search</Button>
                    </Form>
                    </Navbar.Collapse>
                </Container>
            </Navbar>

            <Switch>
                <Route exact path="/" component={Home} />
                <Route exact path="/about" component={About} />
                <Route exact path="*" component={NotFound} />
            </Switch>
        </>
    )
}

export default Header