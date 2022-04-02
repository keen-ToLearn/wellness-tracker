import React, { Component } from 'react';
import { TabContext, TabList, TabPanel } from '@mui/lab';
import { Box, Tab } from '@mui/material';
import { Form, FormGroup, Input, Label, Button } from 'reactstrap';
import { withRouter } from 'react-router-dom';

const LoginRegisterForm = ({ lor, history, usersRegister, usersLoginout, newUserId, users }) => {
    var username = '';
    var password = '';

    function handleSubmit(event){
        event.preventDefault();

        let validvalue = false;

        if(lor === '1'){
            let repeated = false;

            for(let i=0; i < users.length; i++){
                if(users[i].uname === username.value){
                    repeated = true;
                    break;
                }
            }

            if(!repeated){
                const newUser = {
                    uid : newUserId,
                    uname : username.value,
                    upass : password.value,
                    uloggedin : true
                };

                validvalue = true;
                usersRegister(newUser);
            }
        }
        else{
            for(let i=0; i < users.length; i++)
                if(users[i].uname === username.value && users[i].upass === password.value){
                    validvalue = true;
                    const loginUser = {
                        uid : users[i].uid,
                        uname : users[i].uname,
                        upass : users[i].upass,
                        uloggedin : true
                    };
                    usersLoginout(users[i].id, loginUser);
                    break;
                }
        }

        if(validvalue)
            history.push('/dashboard');
    }
    
    return(
        <Form className='text-dark' onSubmit={(event) => handleSubmit(event)}>
            <FormGroup floating>
                <Input type='text' name='username' id='username' placeholder='Username' innerRef={input => username = input}/>
                <Label htmlFor='username'>Username</Label>
            </FormGroup>
            <FormGroup floating>
                <Input type='password' name='password' id='password' placeholder={lor === '1' ? 'New Password' : 'Password'}
                    innerRef={input => password = input}/>
                <Label htmlFor='username'>{lor === '1' ? 'New Password' : 'Password'}</Label>
            </FormGroup>
            <FormGroup>
                <Button type='submit' color='success'>{lor === '1' ? 'Register' : 'Login'}</Button>
            </FormGroup>
        </Form>
    );
}

class Welcome extends Component{
    constructor(props){
        super(props);
        this.state = {
            activeTab : '1'
        };
        this.handleTabChange = this.handleTabChange.bind(this);
    }
    handleTabChange(event, curTab){
        this.setState({ activeTab : curTab });
    }
    preventForwardNavigation(event){
        if((window.location.pathname === '/welcome') && (event.code === 'ArrowRight' && event.altKey))
            event.preventDefault();
    }
    preventBackNavigation(event){
        if((window.location.pathname === '/dashboard' || window.location.pathname === '/welcome') && (event.code === 'ArrowLeft' && event.altKey))
            event.preventDefault();
    }
    componentDidMount(){
        document.addEventListener('keydown', event => this.preventForwardNavigation(event));
        document.addEventListener('keydown', event => this.preventBackNavigation(event));
    }
    render(){
        return(
            <div className='container-fluid h-100 bg-dark'>
                <div className='row h-100'>
                    <div className='col-8 p-0 h-100 overflow-hidden'>
                        <img src='/assets/images/nature.jpg' alt='waterfall' className='img-fluid'/>
                    </div>
                    <div className='col-4 h-100 pt-5'>
                        { this.props.users.isLoading ? <i className='fa-solid fa-circle-notch fa-spin fa-3x text-white'></i> :
                            (this.props.users.errMes !== null) ? <h4 className='text-white'>{this.props.users.errMes}</h4> :
                            <div className='container mt-5'>
                                <div className='row'>
                                    <h1>
                                        <span className='text-white'>Wellness</span> <span className='text-info'>Tracker</span>
                                    </h1>
                                </div>
                                <div className='row mt-5'>
                                    <Box className='text-white border border-secondary rounded'>
                                        <TabContext value={this.state.activeTab}>
                                            <Box>
                                                <TabList onChange={this.handleTabChange} centered>
                                                    <Tab label={<span className={`h6 ${this.state.activeTab === '1' ? 'text-primary' : 'text-light'}`}>Register</span>} value='1'/>
                                                    <Tab label={<span className={`h6 ${this.state.activeTab === '2' ? 'text-primary' : 'text-light'}`}>Login</span>} value='2'/>
                                                </TabList>
                                            </Box>
                                            <TabPanel value='1'>
                                                <LoginRegisterForm lor={this.state.activeTab} history={this.props.history} usersRegister={this.props.usersRegister}
                                                    newUserId={this.props.users.users.length}/>
                                            </TabPanel>
                                            <TabPanel value='2'>
                                                <LoginRegisterForm lor={this.state.activeTab} history={this.props.history} usersLoginout={this.props.usersLoginout}
                                                    users={this.props.users.users}/>
                                            </TabPanel>
                                        </TabContext>
                                    </Box>
                                </div>
                            </div>
                        }
                    </div>
                </div>
            </div>
        );
    }
}

export default withRouter(Welcome);