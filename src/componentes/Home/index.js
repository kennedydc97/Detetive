import React, { Component } from 'react'

import axios from 'axios';

import { Link } from 'react-router-dom'

import {
    Navbar, Input, Button, InputGroup, InputGroupAddon, Container, Col, Row, Form, Card, CardImg, CardText, CardBody, CardTitle, CardSubtitle, Spinner
} from 'reactstrap';

import { MdSearch, MdStar } from "react-icons/md";

class Home extends Component {

    state = {
        // seguidores: []
        // informacoes: []
        carregando: false,
        meteoro: []
    }


    meteoroDaPaixao = async (event) => {
        event.preventDefault()

        this.setState({ carregando: true })

        const form = event.target
        const inputGroup = form.children[0]
        const input = inputGroup.children[0]

        // const { seguidores: data } = await axios(`https://api.github.com/users/${input.value}/followers`)
        // const seguidores = await axios(`https://api.github.com/users/${input.value}/followers`)
        // const informacoes = await axios(`https://apibitbucket.org/2.0/users/${input.value}`)

        const meteoro = await axios(`https://api.nasa.gov/planetary/apod?date=${input.value}&api_key=5ujSy9N0OccafgU1KOboeqbDox8m3A61uTPstG1l`)

        this.setState({ meteoro: [meteoro.data, ...this.state.meteoro], carregando: false })

        // this.setState({ seguidores })
        // this.setState({seguidores: seguidores.data})

        // console.log(informacoes.data)

        // https://api.nasa.gov/planetary/apod?date=2001-05-22&api_key=5ujSy9N0OccafgU1KOboeqbDox8m3A61uTPstG1l

    }

    render() {
        return (
            <>
                <Navbar color="dark">
                    <Container className="d-flex justify-content-center">
                            <img className="rounded-circle border border-white mr-2" width="50" src="https://www.thispersondoesnotexist.com/image" alt="pessoa aleatória" />

                            <span className="text-white">
                                Logado como 
                                <Link className="text-white font-weight-bold ml-2" to="/">
                                { this.props.match.params.usuario }
                                </Link>
                            </span>

                    </Container>
                </Navbar>

                <Navbar color="dark" fixed="bottom">
                    <Container className="d-flex justify-content-center">
                        <Col xs="12" md="6">
                            <Form onSubmit={this.meteoroDaPaixao}>
                                <InputGroup>
                                    <Input type="date" />
                                    <InputGroupAddon addonType="append">
                                        <Button color="danger">
                                            {this.state.carregando ? (<Spinner color="light" size="sm" />) : (<MdSearch size="20" />)}
                                        </Button>
                                    </InputGroupAddon>
                                </InputGroup>
                            </Form>
                        </Col>
                    </Container>
                </Navbar>

                {this.state.carregando ? (<Container className="h-100 d-flex flex-column justify-content-center align-items-center">
                    <Spinner color="dark" size="lg" />
                    <span>Carregando...</span>
                </Container>) : (
                        <Container className="mt-3 mb-5">
                            <Row>
                                {this.state.meteoro.map((meteoro) => (
                                    <Col className="d-flex" xs="12" md="4">
                                        <Card className="text-white mb-2" color="dark">
                                            <CardImg top width="100%" height="30%" src={meteoro.url} alt={meteoro.title} />
                                            <CardBody>
                                                <CardTitle className="h3 text-center">{meteoro.title}</CardTitle>
                                                <CardSubtitle className="text-muted text-center">{meteoro.date.split('-').reverse().join('/')}</CardSubtitle>
                                                <CardText className="text-justify">{meteoro.explanation}</CardText>
                                            </CardBody>
                                        </Card>
                                    </Col>
                                ))}
                            </Row>
                        </Container>
                    )}

                {this.state.meteoro.length === 0 && (<Container className="h-100 d-flex flex-column justify-content-center align-items-center">
                    <MdStar color="#000" size="150" />
                    <h3>Digita uma data ai fera!</h3>
                </Container>)}

                {/* { this.state.carregando && (<Container className="h-100 d-flex flex-column justify-content-center align-items-center">
                                <Spinner color="dark" size="lg"/>
                                <span>Carregando...</span>
                            </Container>) } */}


            </>
        )
    }
}

export default Home;