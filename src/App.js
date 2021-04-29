
import './App.css';
import ReactDOM from "react-dom";
import React, { Component } from "react";
import Header from './Header.js';
import Content from './Content.js';
import ConfigModal from './ConfigModal';



const TAG = 'App';

class App extends Component {

  constructor(props) {

    super(props);
    this.state = {

      company: 'SHI',
      champion: 'Todd',
      show: false,

    };
    this._setConfig = this._setConfig.bind(this);
    this._showModal = this._showModal.bind(this);
  }

  _setConfig = async () => {
    console.log(TAG, '_setConfig called ');
    this.setState({show: false});

  }
  _showModal = async () => {
    console.log(TAG, '_showModal called ');
    this.setState({show: true});

  }
  _companyChangeHandler = async(event) => {
    console.log(TAG, '_companyChangeHandler called '+event.target.value);
    this.setState({company: event.target.value});
  }

  render() {
    console.log(TAG, 'App render company '+this.state.company)
    console.log(TAG, 'App render modal '+this.state.show)
    return (

      <div className="App">
         <ConfigModal _onClose={() => this._setConfig()} show={this.state.show} _companyChangeHandler={this._companyChangeHandler.bind(this)}/>
        <div className="header">
          <Header company={this.state.company} _showModal={this._showModal.bind(this)} />
        </div>
        <div className="content">
          <Content company={this.state.company} />
        </div>
       
      </div>
    );
  }

}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);

export default App;
