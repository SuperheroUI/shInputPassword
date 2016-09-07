import React from 'react';
import ShCore from 'sh-core';
import * as _ from 'lodash';

require('./sh-input-password.scss');

class ShInputPassword extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            value: '',
            classList: {
                shInputText: true,
                empty: true
            },
            placeholderText: '+',
            validStatus: 'unknown',
            requiredField: {showRequired: false}
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleBlur = this.handleBlur.bind(this);
        this.handleFocus = this.handleFocus.bind(this);
        this.validate = this.validate.bind(this);
    }

    validate(onSubmit) {
        var newState = _.clone(this.state);

        if (onSubmit) {
            newState.classList.shTouched = true;
        }
        let rtn = {isValid: true};

        newState.classList.shInvalid = false;

        if (this.props.required && this.state.value.trim() === '') {
            newState.classList.shInvalid = true;
            rtn.isValid = false;
            rtn.msg = 'Required';
        }

        if (this.props.checkPassword(newState.value)) {
            newState.classList.shInvalid = true;
            rtn.isValid = false;
            rtn.msg = this.props.passwordMessage;
        }

        this.setState(newState);
        return rtn;
    };

    componentWillMount() {
        if (this.props.validator) {
            this.props.validator.register(this, this.validate);
        }
    };

    componentWillUnmount() {
        if (this.props.validator) {
            this.props.validator.unregister(this);
        }
    };

    componentDidMount() {
        if (this.props.value) {
            this.setState(
                {
                    value: this.props.value,
                    classList: {shInputText: true}
                }
            )
        }

        if (this.props.required) {
            this.setState({requiredField: {showRequired: true}});
        }
        this.state.placeholderHolder = this.state.placeholderText;
    }

    componentWillReceiveProps(props) {
        if (!_.isUndefined(props.value) && !_.isEqual(props.value, this.state.value)) {
            var newState = _.clone(this.state);
            newState.classList.empty = !props.value;
            newState.value = props.value;
            this.setState(newState, this.validate);
        }
    }

    handleChange(event) {
        this.setState({value: event.target.value}, ()=> {
            if (this.props.validator) {
                this.props.validator.validate()
            } else {
                this.validate();
            }
        });

        this.props.onChange(event);
    };

    handleFocus(event) {
        if (this.props.onFocus) {
            this.props.onFocus(event);
        }

        this.state.classList.shTouched = true;
        this.state.placeholderText = '';
        var newState = _.clone(this.state);
        this.refs.input.select();
        this.setState(newState);
    };

    handleBlur() {
        this.validate();
        if (this.props.onBlur) {
            this.props.onBlur(event);
        }
        var newState = _.clone(this.state);
        newState.placeholderText = newState.placeholderHolder;
        newState.classList.empty = !this.state.value;
        newState.requiredField.showRequired = !this.state.value;

        this.setState(newState)
    }

    render() {
        var {
            validator,
            onFocus,
            onBlur,
            required,
            checkPassword,
            passwordMessage,
            ...other
        } = this.props;

        return (
            <div
                className={this.props.className ? ShCore.getClassNames(this.state.classList) + ' ' + this.props.className : ShCore.getClassNames(this.state.classList)}>
                <label>
                    <span className="label">{this.props.label}</span>
                    <span className={"required-label " + ShCore.getClassNames(this.state.requiredField)}>required</span>
                    <input ref="input"
                           className="sh-password-input"
                           type="password"
                           {...other}
                           placeholder={this.state.placeholderText}
                           onChange={this.handleChange}
                           onFocus={this.handleFocus}
                           onBlur={this.handleBlur}
                           value={this.state.value}
                    />
                </label>
            </div>
        )
    }
}

let checkPassword = function (password) {
    return password.length < 8;
};

ShInputPassword.propTypes = {
    checkPassword: React.PropTypes.func,
    validator: React.PropTypes.object,
    value: React.PropTypes.any,
    onChange: React.PropTypes.func,
    label: React.PropTypes.string,
    required: React.PropTypes.bool,
    passwordMessage: React.PropTypes.string
};

ShInputPassword.defaultProps = {
    value: null,
    validator: null,
    onChange: _.noop,
    label: '',
    required: false,
    checkPassword: checkPassword,
    passwordMessage: 'Password must be at least 8 characters.'
};

export default ShInputPassword;