import React, { Component, useState } from 'react';
import Dashboard from './DashboardComponent';
import Timeline from './TimelineComponent';
import { Switch, Route, withRouter } from 'react-router-dom';
import { Button, ButtonGroup, Nav, Navbar, NavbarBrand, NavItem, Modal, ModalHeader, ModalBody,
    Form, FormGroup, Label, Input, InputGroup, InputGroupText, Col } from 'reactstrap';

const Header = ({ usersLoginout, history, userIn, recordsPost }) => {
    const [rfever, setRfever] = useState('');
    const [rcold, setRcold] = useState(false);
    const [rcough, setRcough] = useState(false);
    const [rheight, setRheight] = useState('');
    const [rweight, setRweight] = useState('');
    const [rother, setRother] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);

    function handleLogout(){
        const logoutUser = {
            uid : userIn.uid,
            uname : userIn.uname,
            upass : userIn.upass,
            uloggedin : false
        };
        usersLoginout(userIn._id, logoutUser);
        history.push('/welcome');
    }

    function toggleModal(){
        setIsModalOpen(!isModalOpen);
    }

    function addRecord(){
        const newRecord = {
            uid : userIn.uid,
            rdate : new Date().toLocaleString(),
            rfever : rfever,
            rcold : rcold === 'Y' ? true : false,
            rcough : rcough === 'Y' ? true : false,
            rheight : rheight,
            rweight : rweight,
            rother : rother
        };
        recordsPost(newRecord);
        toggleModal();
        if(window.location.pathname === '/dashboard/timeline')
            history.replace('/dashboard/timeline');
        else
            history.push('/dashboard/timeline');
    }

    return(
        <div className='row bg-dark shadow'>
            <Navbar expand='md'>
                <NavbarBrand className='me-auto'>
                    <h1><span className='text-white'>Wellness</span> <span className='text-info'>Tracker</span></h1>
                </NavbarBrand>
                <Nav className='float-right' navbar>
                    <NavItem>
                        <ButtonGroup>
                            <Button outline type='button' color='info' onClick={() => toggleModal()}>Add Record</Button>
                            <Button outline type='button' color='info' onClick={() => {
                                if(window.location.pathname === '/dashboard/timeline')
                                    history.replace('/dashboard/timeline');
                                else
                                    history.push('/dashboard/timeline');
                            }}>Timeline</Button>
                            <Button outline type='button' color='info' onClick={() => handleLogout()}>Logout</Button>
                        </ButtonGroup>
                    </NavItem>
                </Nav>
            </Navbar>
            <Modal isOpen={isModalOpen} toggle={() => toggleModal()}>
                <ModalHeader toggle={() => toggleModal()}>Capture Health Data</ModalHeader>
                <ModalBody>
                    <Form onSubmit={() => addRecord()}>
                        <FormGroup>
                            <Label htmlFor="rfever" md={9}>Fever</Label>
                            <InputGroup>
                                <Input type="text" id="rfever" name="rfever" value={rfever} onChange={(event) => setRfever(event.target.value)}/>
                                <InputGroupText>°C</InputGroupText>
                            </InputGroup>
                        </FormGroup>
                        <FormGroup row>
                            <Col md={6}>
                                <Label htmlFor="rcold" md={12}>Cold</Label>
                                <Input type="select" id="rcold" name="rcold" value={rcold} onChange={(event) => setRcold(event.target.value)}>
                                    <option>N</option>
                                    <option>Y</option>
                                </Input>
                            </Col>
                            <Col md={6}>
                                <Label htmlFor="rcough" md={12}>Cough</Label>
                                <Input type="select" id="rcough" name="rcough" value={rcough} onChange={(event) => setRcough(event.target.value)}>
                                    <option>N</option>
                                    <option>Y</option>
                                </Input>
                            </Col>
                        </FormGroup>
                        <FormGroup row>
                            <Col md={6}>
                                <Label htmlFor="rheight" md={12}>Height</Label>
                                <InputGroup>
                                    <Input type="text" id="rheight" name="rheight" value={rheight} onChange={(event) => setRheight(event.target.value)}/>
                                    <InputGroupText>cm</InputGroupText>
                                </InputGroup>
                            </Col>
                            <Col md={6}>
                                <Label htmlFor="rweight" md={12}>Weight</Label>
                                <InputGroup>
                                    <Input type="text" id="rweight" name="rweight" value={rweight} onChange={(event) => setRweight(event.target.value)}/>
                                    <InputGroupText>kg</InputGroupText>
                                </InputGroup>
                            </Col>
                        </FormGroup>
                        <FormGroup>
                            <Label htmlFor="rother" md={9}>Other</Label>
                            <Input type="textarea" id="rother" name="rother" value={rother} onChange={(event) => setRother(event.target.value)}/>
                        </FormGroup>
                        <FormGroup>
                            <Button type='submit' color='success'>Add Record</Button>
                        </FormGroup>
                    </Form>
                </ModalBody>
            </Modal>
        </div>
    );
}

class DashboardMain extends Component{
    render(){
        return(
            <div className='container-fluid h-100' style={{ backgroundImage : 'url(/assets/images/dashboard.jpg)' }}>
                <Header usersLoginout={this.props.usersLoginout} history={this.props.history} userIn={this.props.userIn} recordsPost={this.props.recordsPost}/>
                <div className='row overflow-auto' style={{ height : '87%' }}>
                { (this.props.recordsLoading || this.props.recordPosting) ?
                    <div>
                        <span className="mt-5 text-white fa-solid fa-circle-notch fa-spin fa-3x"></span>
                    </div> :
                    <Switch>
                        <Route path={`/dashboard/timeline`} component={() => <Timeline userRecords={this.props.userRecords}/>}/>
                        <Route path={`/dashboard`} component={() => <Dashboard userInName={this.props.userIn.uname} userRecords={this.props.userRecords}/>}/>
                    </Switch>
                }
                </div>
            </div>
        );
    }
}

export default withRouter(DashboardMain);