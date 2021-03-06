import React, { Component } from "react";
import {Route} from 'react-router-dom'
import { MDBCard, MDBCardBody, MDBCardTitle, MDBBtn, MDBContainer } from "mdbreact";
import PropTypes from "prop-types";
import axios from 'axios'
import {ConfigContext} from '../Context/ConfigContext'
/**
 * Track class
 * @extends Component
 */
export class MatchCard extends Component {
  static contextType=ConfigContext;

  state = {
    id:'',
    stadium:'',
    time:'',
    date:'',
    team1:'',
    team2:'',
    logo1:'',
    logo2:'',
    mode:'false',
    user:''
  }

  
  componentDidMount() {
    this.setState({
      id: this.props.match._id,
      stadium: this.props.match.stadium,
      time: this.props.match.time,
      date: this.props.match.date,
      team1: this.props.match.team1,
      team2: this.props.match.team2,
      logo1: this.props.match.logo1,
      logo2: this.props.match.logo2,
      mode: this.props.mode,
      user: this.props.user
    });
   
  }

  deleteRequest = () => {
    axios.put(this.context.baseURL+'/deleteMatch',
    {"id":this.state.id}
    ).then(res => {
      if(res.status===200) // Successful
      {
        console.log(res.data)
          if(res.data.success===true)
          {
            window.location.reload(false);
          }
      }
      else
      {      alert(res)          }}).catch(err =>{alert(err)})
  }

  render() {
    const modecheck = this.state.mode;
    const userType = this.state.user;
      return (
<MDBContainer>
  <MDBCard style={{ minWidth: '450px',width: "80%", margin: "15px auto 10px auto" }}>
    
    <MDBCardBody>
      <MDBCardTitle>{this.state.team1} VS {this.state.team2}</MDBCardTitle>
      <MDBContainer>
        <div style={{ width: "200px"}}>{this.state.date} at {this.state.time}</div>
        <div style={{ width: "200px"}}>{this.state.stadium}</div>
        {modecheck === 'false' ? 
        ( 
        <Route render={({ history}) => (<MDBBtn style={{ float:'right',width:"120px",margin: "0 0 0 2%" }} color="default" onClick={() => { history.push('/reserveSeats/'+this.state.id) }}>Details</MDBBtn>)} /> )
          :
        ( <MDBBtn style={{ float:'right',width:"120px",margin: "0 0 0 2%" }} color="danger">Cancel</MDBBtn>)}

         {modecheck === 'false' && (userType==='manager' || userType==='admin') ? 
        ( <MDBContainer>
        <Route render={({ history}) => (<MDBBtn style={{ float:'right',width:"120px",margin: "0 0 0 2%" }} color="default" onClick={() => { history.push('/editMatch/'+this.state.id) }}>Edit</MDBBtn>)} />
        <MDBBtn style={{ float:'right',width:"120px",margin: "0 0 0 2%" }} color="danger" onClick={() => this.deleteRequest()}>  Delete</MDBBtn></MDBContainer> )
          :
        ( <div></div>)}
      </MDBContainer>
      
    </MDBCardBody>
  </MDBCard>
  
</MDBContainer>
);
}
}


MatchCard.propTypes = {
  match: PropTypes.object.isRequired,
};

export default MatchCard;