import React from 'react';
import reactDOM from 'react-dom';

class TrelloBtnSimple extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  btnClicked() {
    // authorize user trello account when button is clicked and call cardSubmit() on success
    Trello.authorize({
      type: "popup",
      name: "Trello dashboard",
      scope: {
        read: true,
        write: false
      },
      expiration: "never",
      success: () => {this.cardSubmit();},  // on successfull authentication call loadBoards()
      error: () => {console.log("Failed authentication"); }
    });
  }

  cardSubmit() {
    Trello.addCard({
      url:"https://developers.trello.com/add-card",
      name:"Add a Card To Any List... Choose Wisely!"
    });
  }

  render() {
    return(
      <div>
        <button onClick={this.btnClicked.bind(this)}>Edit Trello</button>
      </div>
    );
  }
}

export default TrelloBtnSimple;
