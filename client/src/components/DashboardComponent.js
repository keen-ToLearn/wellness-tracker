import React, { Component } from 'react';
import { Card, CardText, CardTitle, Col, Row } from 'reactstrap';

class Dashboard extends Component{
    constructor(props){
        super(props);
        this.state = {
            fevertimes : 0,
            coldtimes : 0,
            coughtimes : 0,
            avgheight : '',
            avgweight : ''
        };
    }
    componentDidMount(){
        let ftimes = 0;
        let cdtimes = 0;
        let chtimes = 0;
        let avgh = 0;
        let htimes = 0;
        let avgw = 0;
        let wtimes = 0;

        this.props.userRecords.map((record) => {
            if(record.rfever !== ''){ ftimes = ftimes + 1 }
            if(record.rcold === true){ cdtimes = cdtimes + 1 }
            if(record.rcough === true){ chtimes = chtimes + 1 }
            if(record.rheight !== ''){ htimes = htimes + 1; avgh = avgh + Number(record.rheight); }
            if(record.rweight !== ''){ wtimes = wtimes + 1; avgw = avgw + Number(record.rweight); }
            return true;
        });

        if(htimes !== 0){ avgh = (avgh/htimes).toFixed(2) }
        if(wtimes !== 0){ avgw = (avgw/wtimes).toFixed(2) }

        this.setState({
            fevertimes : ftimes,
            coldtimes : cdtimes,
            coughtimes : chtimes,
            avgheight : avgh,
            avgweight : avgw
        });
    }
    render(){
        return(
            <div className='container-fluid p-5'>
                <div className='row px-5 py-4 text-start'>
                    <h1 className='text-white border-bottom border-info'>{this.props.userInName}'s Dashboard</h1>
                </div>
                <div className='row px-5 py-4 justify-content-center'>
                    <Card className='col-12 col-md-2 p-3 m-3 bg-light' style={{ boxShadow : '8px 8px 16px gray' }}>
                        <CardTitle><h2>Fever</h2></CardTitle>
                        <CardText><h1 className='display-4 text-danger'>{this.state.fevertimes}</h1> times</CardText>
                    </Card>
                    <Card className='col-12 col-md-3 p-3 m-3 bg-light' style={{ boxShadow : '8px 8px 16px gray' }}>
                        <Row>
                            <Col md={6}>
                                <CardTitle><h2>Cold</h2></CardTitle>
                                <CardText><h1 className='display-4 text-info'>{this.state.coldtimes}</h1> times</CardText>
                            </Col>
                            <Col md={6}>
                                <CardTitle><h2>Cough</h2></CardTitle>
                                <CardText><h1 className='display-4 text-success'>{this.state.coughtimes}</h1> times</CardText>
                            </Col>
                        </Row>
                    </Card>
                    <Card className='col-12 col-md-5 p-3 m-3 bg-light' style={{ boxShadow : '8px 8px 16px gray' }}>
                        <Row>
                            <Col md={6}>
                                <CardTitle><h2>Avg. Height</h2></CardTitle>
                                <CardText><h1 className='display-4 text-primary'>{this.state.avgheight}</h1> cm</CardText>
                            </Col>
                            <Col md={6}>
                                <CardTitle><h2>Avg. Weight</h2></CardTitle>
                                <CardText><h1 className='display-4 text-warning'>{this.state.avgweight}</h1> kg</CardText>
                            </Col>
                        </Row>
                    </Card>
                </div>
            </div>
        );
    }
}

export default Dashboard;