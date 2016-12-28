import React, { Component } from 'react';
import {CandidatesContainer} from './candidates';
import randomColor from 'randomcolor';
import Modal from 'react-modal';
import * as firebase from 'firebase';

class App extends Component {
  constructor() {
    super();
    this.ind = 0;
    this.state = {
      addModalOpen: false,
      cands: this.getInitialCandidates()
    }
  }

  voteCand(id) {
    console.log("voted for " + name);
    var candVotesRef = firebase.database().ref().child('cands').child(id).child('votes');
    candVotesRef.transaction(function(currentVotes) {
      return currentVotes+1;
    });    
  }

  onChangeCands(snap) {
    let serverCands = snap.val();
    console.log(serverCands);
    const ids = Object.keys(serverCands);
    for(const id of ids){
      serverCands[id].onClick = this.voteCand.bind(this, id)
    }
    const initialCand = {
      name: "+",
      color: randomColor(),
      onClick: this.showAddCandModal.bind(this)
    }
    serverCands.newCand = initialCand    
    this.setState({cands: serverCands})
  }

  componentDidMount() {
  // Initialize Firebase

    var config = {
      apiKey: "AIzaSyDlH1hDGo9ej1RkDpbFSVa3fII4-bSFLBI",
      authDomain: "hackvote-83386.firebaseapp.com",
      databaseURL: "https://hackvote-83386.firebaseio.com",
      storageBucket: "hackvote-83386.appspot.com",
      messagingSenderId: "589144229238"
    };
    firebase.initializeApp(config);    
    const rootRef = firebase.database().ref().child('cands');
    rootRef.on('value', this.onChangeCands.bind(this));
  }

  writeNewCand(newCand) {
    firebase.database().ref().child('cands').push({
        name: newCand.name,
        color: randomColor(),
        votes: 0,
    });
  }  
  addCand(name) {
    const cands = this.state.cands;
    const col = randomColor();
    const newCand = {
      name: name,
      color: col,
      onClick: this.voteCand.bind(this, name)
    }
    this.writeNewCand(newCand);
    this.setState({ 
      addModalOpen: false
    });
  }
  showAddCandModal() {
    this.setState({addModalOpen: true});
  }
  getInitialCandidates() {
    const cands = [];
    const initialCand = {
      id: this.ind++,
      name: "+",
      color: randomColor(),
      onClick: this.showAddCandModal.bind(this)
    }
    //this.addCand.bind(this, "newCand")
    cands.unshift(initialCand);
    return cands;
  }
  renderModal() {
    return (
    <Modal
      isOpen={this.state.addModalOpen}
      shouldCloseOnOverlayClick
      contentLabel="Modal"
    >
      <h1>What's your project name (up to 24 chars)</h1>
      <input type="text" ref="projName" onClick={(e)=>{this.newProjName=e.target.value}}/>
      <button onClick={()=>{this.addCand(this.refs.projName.value)}}>Done!</button>
      <button onClick={()=>{this.setState({addModalOpen: false})}}>Cancel</button>
    </Modal>      
    )
  }
  render() {
    return (
      <div className="App">
        {this.renderModal()}
        <CandidatesContainer
          candidates={this.state.cands}
        />
      </div>
    );
  }
}

export default App;
