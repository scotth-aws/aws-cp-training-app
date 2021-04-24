
import './App.css';
import ReactDOM from "react-dom";
import React, { Component } from "react";
import logo from './aws-uni-green.png';
import styled, { css } from 'styled-components';
import Amplify, { API } from "aws-amplify";
import { JsonToTable } from "react-json-to-table";

const TAG = 'CPTraining';
const Button = styled.button`
  background-color: black;
  color: white;
  font-size: 20px;
  padding: 10px 10px 10px 10px;
  border-radius: 5px;
  margin: 10px 0px;
  cursor: pointer;
`;
const AnswerButton = styled.button`
  background-color: blue;
  color: white;
  font-size: 20px;
  padding: 10px 10px 10px 10px;
  border-radius: 5px;
  margin: 10px 0px;
  cursor: pointer;
`;
const partnerCompany = 'SHI'
const partnerChampion = "Todd"
var ranNums;
var ranNumsIndex = 1;
Amplify.configure({

  API: {
    endpoints: [
      {
        name: "CPTraining",
        endpoint: "https://9hz5xken51.execute-api.us-east-1.amazonaws.com/dev/questions"
      },

    ]
  }
});


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      category: "Technology",
      question: '',
      answers: [],
      correct_answers: [],
      rendered_answers: [],
      isQuestionRendered: false,



    };
    this._run = this._run.bind(this);
    this._getAQuestion = this._getAQuestion.bind(this);
    this._handleAnswerClick = this._handleAnswerClick.bind(this);
    this._getRandomItem = this._getRandomItem.bind(this);
    this._shuffle = this._shuffle.bind(this);
  }
  componentDidMount() {
    console.log(TAG, this.state.category);
    ranNums = this._shuffle([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20]);
    console.log(TAG, '_getAQuestion ' + ranNums);
  }
  _getRandomItem(arr) {

    // get random index value
    const randomIndex = Math.floor(Math.random() * arr.length);

    const item = arr[randomIndex];

    return item;
  }
  _shuffle(array) {
    var i = array.length,
      j = 0,
      temp;

    while (i--) {

      j = Math.floor(Math.random() * (i + 1));

      // swap randomly chosen element with current element
      temp = array[i];
      array[i] = array[j];
      array[j] = temp;

    }

    return array;
  }
  _run = async (supplier, productid) => {
    console.log(TAG, '_run ');
    this.setState({ rendered_answers: [] });
    this._getAQuestion();
  }
  _handleAnswerClick = async () => {
    console.log(TAG, '_handleAnswerClick ');
    this.setState({ rendered_answers: this.state.correct_answers });
  }

  _getAQuestion = async (category) => {

    var q = ranNums[ranNumsIndex];
    console.log(TAG, '_getAQuestion ranNumsIndex ' + ranNumsIndex);
    ranNumsIndex += 1;
    if (ranNumsIndex === 20)
      ranNumsIndex = 1;
      ranNums = this._shuffle([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20]);

    const apiName = 'CPTraining';
    const path = "/";
    const myInit = { // OPTIONAL
      headers: {
        "x-api-key": "UNl0WiO9Hq6UFZNfCGnwy7Temym0P4Fv4L8ypFcn",
      },
      queryStringParameters: {  // OPTIONAL
        question: q,
        category: 'Technology',
      },
    };
    var data = '';
    try {
      data = await API.get(apiName, path, myInit);
      //console.log(data);
    } catch (e) {
      console.log(e); // 
    }

    var question = '';
    var answers = [];
    var category = '';
    var correct_answers = [];

    for (var i = 0; i < data.length; i++) {
      question = data[i].question;
      question = question.replace("%Company%", partnerCompany);
      answers = data[i].answers;
      category = data[i].category;
      correct_answers = data[i].correct_answers;

    }
    console.log(answers);
    this.setState({ question: question, answers: answers, category: category, correct_answers: correct_answers, isQuestionRendered: true });







  };
  render() {
    let answerButton;
    console.log(this.state.isQuestionRendered);
    if (this.state.isQuestionRendered) {
      answerButton = <AnswerButton onClick={this._handleAnswerClick}>Answer</AnswerButton>;
    } else {
      answerButton = <h3></h3>;
    }
    return (
      <div className="App">
        <div className="rowC">

          <div className="columnL">
            <h3>Cloud Practitioner Training</h3>
            <img src={logo} className="App-static-logo" alt="logo" />

            <div className="Button">
              <Button onClick={this._run}>
                Let's Go!
             </Button>
            </div>


          </div>

          <div className="columnR">
            <div className="question" id="question">
              {this.state.question}
            </div>
            <div className="answers" id="answers">
              <ul>
                {this.state.answers.map(item => {
                  return <li className="li">{item}</li>;
                })}
              </ul>

            </div>

            <div className="AnswerButton">
              {answerButton}
            </div>

            <div className="correct_answers" id="correct_answers">
              <ul>
                {this.state.rendered_answers.map(item => {
                  return <li className="li">{item}</li>;
                })}
              </ul>

            </div>



          </div>

        </div>
      </div>
    );
  }

}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);

export default App;
