import React, { Component } from 'react';
import Welcome from './WelcomeComponent';
import DashboardMain from './DashboardMainComponent';
import { Switch, Route, Redirect, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchRecords, fetchUsers, recordsPost, usersLoginout, usersRegister } from '../redux/ActionCreators';

const mapStateToProps = state => {
    return {
        users : state.users,
        records : state.records
    }
}

const mapDispatchToProps = dispatch => ({
    fetchUsers : () => dispatch(fetchUsers()),
    fetchRecords : () => dispatch(fetchRecords()),
    usersRegister : (newUser) => dispatch(usersRegister(newUser)),
    usersLoginout : (uid, loginoutUser) => dispatch(usersLoginout(uid, loginoutUser)),
    recordsPost : (newRecord) => dispatch(recordsPost(newRecord))
});

class WelcomeMain extends Component{
    componentDidMount(){
        this.props.fetchUsers();
        this.props.fetchRecords();
    }

    render(){
        const RenderDashboard = () => {
            if(this.props.users.reglogging || this.props.users.isLoading){
                return(
                    <div className="container-fluid h-100 pt-5 bg-dark">
                        <div className="pt-5">
                            <span className="mt-5 text-white fa-solid fa-circle-notch fa-spin fa-3x"></span>
                            <h4 className='text-white'>Logging In...</h4>
                        </div>
                    </div>
                );
            }
            else{
                const userIn = this.props.users.users.filter(user => user.uloggedin)[0];
                if(userIn === undefined)
                    return(
                        <div className="container-fluid h-100 pt-5 bg-dark">
                            <div className="pt-5">
                                <h3 className='pt-5 text-white'>User is logged out. Relaunch the application.</h3>
                            </div>
                        </div>
                    );
                else{
                    const userRecords = this.props.records.records.filter(record => record.uid === userIn.uid);
                    return(
                        <DashboardMain userIn={userIn} userRecords={userRecords} usersLoginout={this.props.usersLoginout}
                            recordsLoading={this.props.records.isLoading} recordPosting={this.props.records.posting} recordsPost={this.props.recordsPost}/>
                    );
                }
            }
        }

        return(
            <Switch>
                <Route path={`/welcome`} component={() => <Welcome users={this.props.users} usersRegister={this.props.usersRegister}
                    usersLoginout={this.props.usersLoginout}/>}/>
                <Route path={`/dashboard`} component={RenderDashboard}/>
                <Redirect to={`/welcome`}/>
            </Switch>
        );
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(WelcomeMain));