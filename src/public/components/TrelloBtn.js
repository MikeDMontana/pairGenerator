import React from 'react';
import reactDOM from 'react-dom';

class TrelloBtn extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showTrelloForm: false,
      boardName: "",
      boardID: "",
      boards: []
    };
  }

  btnClicked() {
    Trello.authorize({
      type: "popup",
      name: "Trello dashboard",
      scope: {
        read: true,
        write: false
      },
      expiration: "never",
      success: () => {this.loadBoards();},
      error: () => {console.log("Failed authentication"); }
    });
  }

  loadBoards() {
    // Get the user's boards
    console.log("loadBoards Called");
    Trello.get(
      '/members/me/boards',
      this.loadedBoards.bind(this),
      function() {console.log("Failed to load boards"); }
    );
    this.showForm();
  }

  loadedBoards(boards) {
    this.setState({
      showTrelloForm: !this.state.showTrelloForm,
      boards: boards
    });
  }

  showForm() {
    return (
      <form className='boardsForm'>
        <div className='formGroup'>
          <label className='controlLabel'>Choose Your Board</label>
          <select className='formControl'>
            {this.state.boards.map((board, index) =>
              <option>{board.name}</option>
            )}
          </select>
        </div>
      </form>
    );
  }


  render() {
    return(
      <div>
        <button onClick={this.btnClicked.bind(this)}>Edit Trello</button>
        { (this.state.showTrelloForm) ? this.showForm() : null }
      </div>
    );
  }
}

export default TrelloBtn;
