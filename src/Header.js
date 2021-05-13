import React from 'react';

import styled, { } from 'styled-components';
import config from './settings_icon.png';

const TAG = 'Header';
const ConfigButton = styled.button`
  background-image: url(${config});
  width: 35px;
  height: 35px;
  font-size: 10px;
  border-radius: 5px;
  cursor: pointer;
`;
class Header extends React.Component {
    constructor(props) {

        super(props);
        this.state = {
         
        };
        this._config = this._config.bind(this);

    }

    _config = async () => {
        console.log(TAG, '_config ');
        this.props._showModal();

    }
    render() {
        return (
            <div className="App-header">
                <div className="rowL">
                <ConfigButton onClick={this._config}>
                </ConfigButton>
                </div>
                <div className="rowR">
                
                <h3 className="headerTitle">Cloud Practitioner Training</h3>
                </div>
            </div>
        );
    }
}
export default Header;