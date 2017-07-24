import React from 'react';
import reactDOM from 'react-dom';
import TrelloBtnSimple from './TrelloBtnSimple';

// create array of objects for backgroundGrid
const staticNames = [
  {personName:"April", pic:"img/april.jpeg"},
  {personName:"Brigitta", pic:"img/brigitta.jpeg"},
  {personName:"Chadwick", pic:"img/chadwick.jpeg"},
  {personName:"David", pic:"img/david.jpeg"},
  {personName:"Jennifer", pic:"img/jennifer.jpeg"},
  {personName:"Jesse", pic:"img/jesse.jpeg"},
  {personName:"John", pic:"img/john.png"},
  {personName:"Kashya", pic:"img/kashya.jpeg"},
  {personName:"Meredith", pic:"img/meredith.jpeg"},
  {personName:"Mike", pic:"img/mike.jpeg"},
  {personName:"Nani", pic:"img/nani.png"} ];

class InputNames extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      allNames: [],
      pairArr: [],
      mainArr: [],
      bkgdArr: []
    };
  }

  componentDidMount() {
    this.repeatingBkgd();   // on page load, immediately call repeatingBkgd() so background images generate
    this.grabList();        // ...and immediately call grabList() so allNames is not empty
  }

  grabList() {
    // setState of allNames to this list of objects whenever this function is called
    // this function will be replaced/altered when user input is offered
    return this.setState({
      allNames: [
        {personName:"April", pic:"img/april.jpeg"},
        {personName:"Brigitta", pic:"img/brigitta.jpeg"},
        {personName:"Chadwick", pic:"img/chadwick.jpeg"},
        {personName:"David", pic:"img/david.jpeg"},
        {personName:"Jennifer", pic:"img/jennifer.jpeg"},
        {personName:"Jesse", pic:"img/jesse.jpeg"},
        {personName:"John", pic:"img/john.png"},
        {personName:"Kashya", pic:"img/kashya.jpeg"},
        {personName:"Meredith", pic:"img/meredith.jpeg"},
        {personName:"Mike", pic:"img/mike.jpeg"},
        {personName:"Nani", pic:"img/nani.png"} ]
    });
  }

  repeatingBkgd() {
    // loop through for 50 times and grab a random image each time, size of image can be manipulated in stylesheet
    // flexbox used to populate rows/columns
    for (var i = 0; i < 50; i++) {
      let randNum = Math.floor((Math.random() * staticNames.length) + 0);
      this.state.bkgdArr.push(staticNames[randNum].pic);
    }
    this.setState({
      bkgdArr:this.state.bkgdArr
    })
  }

  generatePairs(event) {
    this.grabList();  //get list of objects (personName and pic)
    this.state.mainArr = [];  //set mainArr = 0 so pairs can be regenerated EVERY time btn clicked, this array will hold pair arrays

    for (var i = 0; i <= this.state.allNames.length; i++) { // loop through allNames grabbed from grabList()
      let pairArr = [];  //temporary array that will hold two values
      for (var j = 0; j < 2; j++) {  // loop two times to grab from allNames and place in pairArr
        let randNum = Math.floor((Math.random() * this.state.allNames.length) + 0);  // create random number
        pairArr.push(this.state.allNames[randNum]);  // grab random element from allNames and push to pairArr
        this.state.allNames.splice(randNum, 1);  // splice that same element from allNames so it cannot be selected again
      }
      this.state.mainArr.push(pairArr);  // push pairArr into mainArr
    }
    this.state.mainArr.push(this.state.allNames);  // push remainder of allNames into mainArr (in the case there are three left)
    this.setState({
      mainArr:this.state.mainArr,
    });
  }

  render() {
    return (
      <div className="generatorPageContainer">

        <div className="backgroundGrid">
          {this.state.bkgdArr.map((person) => (
            <img className="grayImg" src={person} />
          ))}
        </div>

        <div className="generator">
          <div className="fullWidthContainer text-center">
            <button type="button" className="btn btn-primary" onClick={this.generatePairs.bind(this)}><h1>GENERATE PAIRS</h1></button>
          </div>
          <div className="fullWidthContainer text-center">
            <p><em>Please Click The Button To Generate Teams</em></p>
          </div>
          <div className="returnedPairs">
          {this.state.mainArr.map((pairing) => (
            <div><ul>
            {pairing.map((coder, i) => (
              <li key={coder.personName}><img className="pairedImg" src={[coder.pic]} /><p>{[coder.personName]}</p></li>
            ))}
            </ul>
            <TrelloBtnSimple /></div>
          ))}
          </div>
        </div>

      </div>
    );
  }
}

export default InputNames;
