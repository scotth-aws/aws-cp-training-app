import React from 'react';
import { Timer } from 'react-countdown-clock-timer';
import uuid from 'react-uuid'
import logo from './aws-uni-green.png';
import awslogo from './aws-logo-spinning.gif';
import styled, { } from 'styled-components';
import Amplify, { API } from "aws-amplify";
import Parser from 'html-react-parser';



const AnswerButton = styled.button`
  background-color: black;
  color: white;
  font-size: 20px;
  padding: 10px 10px 10px 10px;
  border-radius: 5px;
  margin: 10px 0px;
  cursor: pointer;
`;
const TAG = 'Content';

var ranNums;
var ranNumsIndex = 0;
//var qArray = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 62, 63, 64, 65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75, 76, 77, 78, 79, 80, 81, 82, 83, 84, 85, 86];
var qArray = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40];
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

class Content extends React.Component {
  constructor(props) {

    super(props);
    this.state = {
      category: "Technology",
      question: '',
      answers: [],
      correct_answers: [],
      rendered_answers: [],
      doclink: '',
      rendered_doclink: '',
      doclinkTitle: '',
      isQuestionRendered: false,
      timerIsPaused: true,
      timerId: uuid(),
      isReady: false,



    };
    this._run = this._run.bind(this);
    this._getAQuestion = this._getAQuestion.bind(this);
    this._handleAnswerClick = this._handleAnswerClick.bind(this);
    this._getRandomItem = this._getRandomItem.bind(this);
    this._shuffle = this._shuffle.bind(this);
  }
  componentDidMount() {
    console.log(TAG, this.state.category);
    ranNums = this._shuffle(qArray);
    console.log(TAG, '_getAQuestion ' + ranNums);
    //this.setState({company: this.props.company});
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
    this.setState({ rendered_answers: [], rendered_doclink: '', doclinkTitle: '' });
    this._getAQuestion("");
  }
  _handleAnswerClick = async () => {
    console.log(TAG, '_handleAnswerClick ');
    this.setState({ timerIsPaused: true, rendered_answers: this.state.correct_answers, rendered_doclink: this.state.doclink, doclinkTitle: 'see aws doc here' });

  }

  _getAQuestion = async (selectedCategory) => {

    this.setState({ timerId: uuid(), isReady: true });
    var qidx = ranNums[ranNumsIndex];
    console.log(TAG, '_getAQuestion ranNumsIndex ' + qidx);

    ranNumsIndex += 1;
    if (ranNumsIndex === 41) {
      alert('You have reached the end of the questions. What do you think your score is? 🤯')
      ranNumsIndex = 1;
      ranNums = this._shuffle(qArray);
      qidx = ranNums[ranNumsIndex];
    }


    const apiName = 'CPTraining';
    const path = "/";
    const myInit = {
      headers: {
        "x-api-key": "UNl0WiO9Hq6UFZNfCGnwy7Temym0P4Fv4L8ypFcn",
      },
      queryStringParameters: {
        question: qidx,
        category: selectedCategory,
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
    var doclink = '';

    for (var i = 0; i < data.length; i++) {
      question = data[i].question;
      question = question.replace("%Company%", this.props.company);
      question = question.replace(/%start%/g, " <span style=\"color: #ff0000\">");
      question = question.replace(/%end%/g, " </span>");
      answers = data[i].answers;
      category = data[i].category;
      correct_answers = data[i].correct_answers;
      doclink = data[i].doclink;

    }
    console.log(answers);
    this.setState({ timerIsPaused: false, question: question, doclink: doclink, answers: answers, category: category, correct_answers: correct_answers, isQuestionRendered: true });

  };
  render() {
    let answerButton;
    //console.log(this.state.isQuestionRendered + this.state.rendered_doclink);

    if (this.state.isQuestionRendered) {
      answerButton = <AnswerButton onClick={this._handleAnswerClick}>Answer</AnswerButton>;
    } else {
      answerButton = <h3></h3>;
    }
    if (this.state.isReady) {
      return (
        <div className="rowC">
          <div className="columnL">

            <img src={logo} height="100px" width="100px" className="App-static-logo" alt="logo" onClick={this._run} />


          </div>

          <div className="columnR">
            <div className="question" id="question">
              {Parser(this.state.question)}
            </div>
            <div className="answers" id="answers">
              <ul>
                {this.state.answers.map(item => {
                  return <li className="li">{item}</li>;
                })}
              </ul>
            </div>
            <div className="timer" id="timer">
              <Timer
                durationInSeconds={60}
                formatted={true}
                isPaused={this.state.timerIsPaused}
                showPauseButton={false}
                showResetButton={false}
                timerId={this.state.timerId}

                onStart={() => {
                  console.log('Triggered when the timer starts')
                  //alert('onStart');
                }}
                onPause={(remainingDuration) => {
                  console.log('Triggered when the timer is paused', remainingDuration)
                  //alert('onPause');

                }}
                onFinish={() => {
                  console.log('Triggered when the timer finishes')
                  alert('Errrr, did you read the study material for this week? 😉');

                }}
                onReset={(remainingDuration) => {
                  console.log('Triggered when the timer is reset', remainingDuration)
                  //alert('onReset');
                }}
                onResume={(remainingDuration) => {
                  console.log('Triggered when the timer is resumed', remainingDuration)
                }}
              />
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
              <ul><a href={this.state.rendered_doclink} target="_blank">{this.state.doclinkTitle}</a></ul>

            </div>



          </div>

        </div>

      );
    } else {
      return (
        <div className="rowC">
          <div className="columnL">

            <img src={logo} height="100px" width="100px" className="App-static-logo" alt="logo" onClick={this._run} />


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
            <img src={awslogo} height="200px" width="200px" className="App-static-logo" alt="logo" onClick={this._run} />


           
            <div className="AnswerButton">
              {answerButton}
            </div>

            <div className="correct_answers" id="correct_answers">
              <ul>
                {this.state.rendered_answers.map(item => {
                  return <li className="li">{item}</li>;
                })}
              </ul>
              <ul><a href={this.state.rendered_doclink} target="_blank">{this.state.doclinkTitle}</a></ul>

            </div>



          </div>

        </div>

      );

    }
  }
}
export default Content;