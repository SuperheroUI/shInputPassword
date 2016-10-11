import React from 'react'
import ReactDOM from 'react-dom';
import ShInputPassword from '../bin/sh-input-password';
require('../node_modules/sh-core/bin/main.css');

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            formData: {
                one: ''
            }
        };
        this.handleOneChange = this.handleOneChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleOneChange(event) {
        this.state.formData.one = event.target.value;
        this.setState(this.state);
    }

    handleSubmit() {
        alert(this.state.formData.one);
        return false;
    }

    render() {
        return(
        <div>
            <form>
                <input type="text" onChange={this.handleOneChange}/>
            </form>
            <div>
                <ShInputPassword label="Password" required value={this.state.formData.one} onChange={this.handleOneChange} />
                <button type="submit">go</button>
            </div>
        </div>)
    }
}

ReactDOM.render(<App/>, document.getElementById('app'));