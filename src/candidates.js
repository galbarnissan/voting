import React, { Component } from 'react';
import './candidates.css';

export class CandidatesContainer extends Component {
  render() {
    const keys = Object.keys(this.props.candidates);
    return (
      <div className="candidatesContainer">
      	{
      		keys.map((id, ind, arr) => {
            const item = this.props.candidates[id];            
            const isAddCand = ind === arr.length-1;
      			return this.renderCandidateItem(item, isAddCand);     
          })  			  
    		}
      </div>
    );
  }

  renderCandidateItem(item, isAddCand){
    if(isAddCand){
      return(
          <div 
            onClick={item.onClick} 
            style={
              {
                backgroundColor: item.color
              }
            }
            className="addCandidateItem"
          >
            <div className="candidateItemName">                  
                {item.name}
            </div>
            <div>
              {isAddCand ? "click to add an app" : null} 
            </div>              
          </div>        
      )
    } else {
      return(
        <div             
          style={
            {
              backgroundColor: item.color
            }
          }
          className="candidateItem"
        >
          <div className="candidateItemName">                  
              {item.name}
          </div>
          {this.renderVoteButton(item)}          
        </div>        
      );
    }
  }

  renderVoteButton(item) {  
    const text = this.props.alreadyVoted ? 'Votes:' + item.votes :'Click to vote!'
    if(this.props.alreadyVoted) {
      return(
        <div className="candidateItemAction">
          <div className="candidateItemActionCenter">
            {text}
          </div>
        </div>          
      )
    }
    else {
      return(
        <div className="candidateItemAction candidateItemActionClickable" onClick={item.onClick}>
          <div className="candidateItemActionCenter">
            {text}
          </div>
        </div>          
      )
    }    
  }
}  
