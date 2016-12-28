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
            let text = ind === arr.length-1 ? "click to add" : "click to vote";
      			return (              
	      			<div 
                onClick={item.onClick} 
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
                <div>
                  {text} 
                </div>              
	  				  </div>
            );          
          })  			  
    		}
      </div>
    );
  }
}
