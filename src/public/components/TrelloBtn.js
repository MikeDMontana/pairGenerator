import React from 'react';
import reactDOM from 'react-dom';

class TrelloBtn extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showTrelloForm: false,
      showLists: false,
      showCardInput: false,
      boardName: "",
      boardID: "",
      lists: "",
      listID: "",
      cardName: ""
    };
  }

  btnClicked() {
    // authorize user trello account when button is clicked
    Trello.authorize({
      type: "popup",
      name: "Trello dashboard",
      scope: {
        read: true,
        write: false
      },
      expiration: "never",
      success: () => {this.loadBoards();},  // on successfull authentication call loadBoards()
      error: () => {console.log("Failed authentication"); }
    });
  }

  loadBoards() {
    // Get the user's boards.
    console.log("loadBoards Called");
    Trello.get(
      '/members/me/boards',
      this.loadedBoards.bind(this),
      function() {console.log("Failed to load boards"); }
    );
    this.showForm();
  }

  loadedBoards(boards) {
    // Set state of boards to boards returned from get call
    // set state of showTrelloForm which is just an on-off switch
    this.setState({
      showTrelloForm: !this.state.showTrelloForm,
      boards: boards
    });
  }

  showForm() {
    return (
      <form className='boardsForm' onSubmit={this.submitHandler.bind(this)}>
        <div className='formGroup'>
          <label className='controlLabel'>Choose Your Board</label>
          <select className='formControl' value={this.state.boardID} onChange={this.changeHandler.bind(this)}>
            {this.state.boards.map((board, index) =>
              <option value={board.id}>{board.name}</option>
            )}
          </select>
          <input type="submit" value="submit" />
        </div>
      </form>
    );
  }

  submitHandler(event) {
    event.preventDefault();

    // Get Lists that belong to the board selected in the form
    Trello.get(
      '/boards/' + this.state.boardID + '/lists',
      this.showSuccess.bind(this),
      function() {console.log("Failed to load lists"); }
    );
  }

  changeHandler(event) {
    const boardID = event.target.value;
    this.setState({
      boardID: boardID
    });
  }

  showSuccess(lists) {
    console.log(lists);
    this.setState({
      lists: lists,
      showLists: !this.state.showLists
    });
  }

  listChangeHandler(event) {
    const listID = event.target.value;
    this.setState({
      listID: listID
    });
  }

  listSubmit(event) {
    event.preventDefault();

    console.log(this.state.listID);
    this.setState({
      showCardInput: !this.state.showCardInput
    });
  }

  showLists() {
    return (
      <form className="listsReturnForm" onSubmit={this.listSubmit.bind(this)}>
        <div className="boardListsReturn">
          <label className="controlLabel">Choose Your List</label>
          <select className="listSelect" value={this.state.listID} onChange={this.listChangeHandler.bind(this)}>
            {this.state.lists.map((list, index) =>
              <option value={list.id}>{list.name}</option>
            )}
          </select>
          <input type="submit" value="submit" />
        </div>
      </form>
    );
  }

  cardSubmit(event) {
    event.preventDefault();

    Trello.addCard({
  url:"https://developers.trello.com/add-card",
  name:"Add a Card with a URL attachment"
});
  }

  cardChangeHandler(event) {
    const cardName = event.target.value;

    this.setState({
      cardName: cardName
    })
  }


  showCardForm() {
    return (
      <form className="showCardForm" onSubmit={this.cardSubmit.bind(this)}>
        <div className="cardInputSection">
          <input type="text" value={this.state.cardValue} onChange={this.cardChangeHandler.bind(this)} />
          <input type="submit" value="submit" />
        </div>
      </form>
    );
  }


  render() {
    return(
      <div>
        <button onClick={this.btnClicked.bind(this)}>Edit Trello</button>
        { (this.state.showTrelloForm) ? this.showForm() : null }
        { (this.state.showLists) ? this.showLists() : null }
        { (this.state.showCardInput) ? this.showCardForm() : null }
      </div>
    );
  }
}

export default TrelloBtn;
