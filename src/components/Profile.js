import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { userActions } from '../actions/userActions';

class Profile extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            edit: false,
            submitted: false,
            isValid: true
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }



    handleChange(e) {
      this.setState({ submitted: false });
        const { name, value } = e.target;
        this.setState({ [name]: value });
    }

    handleSubmit(e) {
        e.preventDefault();


        this.setState({ submitted: true });
        const { userName, password } = this.state;
        if (userName && password) {
            this.props.login(userName, password);
        }
    }



    render() {



        return (

            <div className="limiter">
        		<div className="container-login100">
        			<div className="wrap-login100 p-l-50 p-r-50 p-t-77 p-b-30">
        				<form className="login100-form validate-form" name="form" onSubmit={this.handleSubmit}>
        					<span className="login100-form-title p-b-55">
        						Profile
        					</span>

                  <img className="custom-profile-image" alt="" height="100" width="100"/>

        					<div
                    className="wrap-input100 validate-input m-b-16 has-error"
                    data-validate = "Valid userName is required: ex@abc.xyz">
        						<input className="input100" type="text" name="userName" placeholder="Username" onChange={this.handleChange} />
                    <span className="focus-input100" />
        						<span className="symbol-input100">
        							<span className="lnr lnr-user" />
        						</span>
        					</div>

        					<div className="wrap-input100 validate-input m-b-16" data-validate = "Password is required">
        						<input disable className="input100" type="password" name="password" placeholder="Password" onChange={this.handleChange} />
        						<span className="focus-input100" />
        						<span className="symbol-input100">
        							<span className="lnr lnr-lock" />
        						</span>
        					</div>

        					<div className="container-login100-form-btn p-t-25">
        						<a href="/game" className="login100-form-btn">
        							Back to the game
        						</a>
        					</div>
        				</form>
        			</div>
        		</div>
        	</div>
        );
    }
}

function mapState(state) {
    const { loginSuccess, loginFailed } = state.authentication;
    return { loginSuccess, loginFailed };
}

const actionCreators = {
    login: userActions.login,
    logout: userActions.logout
};

export default connect(mapState, actionCreators)(Profile);
