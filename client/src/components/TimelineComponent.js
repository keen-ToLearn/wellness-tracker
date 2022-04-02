import React, { Component } from 'react';
import { Timeline as TimeLine, TimelineConnector, TimelineContent, TimelineDot, TimelineItem,
    TimelineOppositeContent, TimelineSeparator  } from '@mui/lab';
import { Col, Row } from 'reactstrap';

class Timeline extends Component{
    render(){
        const timelinerecords = this.props.userRecords.reverse().map((record, index) => {
            return(
                <TimelineItem sx={{ height: 1/3 }}>
                    <TimelineOppositeContent sx={{ flex : 0.3, fontFamily : 'cursive', m : 'auto 0' }}>
                        <h5>{record.rdate}</h5>
                    </TimelineOppositeContent>
                    <TimelineSeparator>
                        <TimelineConnector className={`${index === 0 ? 'invisible' : ''}`}/>
                        <TimelineDot className='fa-solid fa-clock fa-2x'/>
                        <TimelineConnector/>
                    </TimelineSeparator>
                    <TimelineContent sx={{ fontFamily : 'cursive', mb : '1%', ml : '1%', backgroundColor : 'palegreen' }} className='rounded p-3'>
                        <Row>
                            <Col md={6}>
                                <Row>
                                <h5><span className='fw-bold'>Fever :</span> { record.rfever !== '' ? `${record.rfever} °C` : 'No' }</h5>
                                </Row>
                                <Row>
                                    <Col md={6}>
                                    <h5><span className='fw-bold'>Cold :</span> { record.rcold ? 'Yes' : 'No' }</h5>
                                    </Col>
                                    <Col md={6}>
                                    <h5><span className='fw-bold'>Cough :</span> { record.rcough ? 'Yes' : 'No' }</h5>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col md={6} className={`${ record.rheight !== '' ? '' : 'd-none' }`}>
                                    <h5><span className='fw-bold'>Height :</span> {record.rheight} cm</h5>
                                    </Col>
                                    <Col md={6} className={`${ record.rweight !== '' ? '' : 'd-none' }`}>
                                    <h5><span className='fw-bold'>Weight :</span> {record.rweight} kg</h5>
                                    </Col>
                                </Row>
                            </Col>
                            <Col md={6}>
                                <p className='fst-italic'>{ record.rother !== '' ? `"${record.rother}"` : '' }</p>
                            </Col>
                        </Row>
                    </TimelineContent>
                </TimelineItem>
            );
        });
        return(
            <div className='container-fluid px-5 pt-4'>
                <div className='row mx-4 px-4 bg-dark text-start border-bottom border-info border-2' style={{ boxShadow : '8px 0 16px gray' }}>
                    <h1 className='text-white'>Timeline</h1>
                </div>
                <div className='row mx-4 px-4 bg-light overflow-auto rounded-bottom' style={{ height : '87%', boxShadow : '8px 5px 16px gray' }}>
                    <TimeLine>
                        { timelinerecords }
                        <TimelineItem>
                            <TimelineOppositeContent sx={{ flex : 0.3 }}></TimelineOppositeContent>
                            <TimelineSeparator>
                                <TimelineDot className='fa-regular fa-circle fa-2x'/>
                            </TimelineSeparator>
                            <TimelineContent sx={{ fontFamily : 'cursive', m: 'auto 0' }}>
                                <h5>Start</h5>
                            </TimelineContent>
                        </TimelineItem>
                    </TimeLine>
                </div>
            </div>
        );
    }
}

export default Timeline;