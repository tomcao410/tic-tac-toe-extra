import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { userActions } from '../actions/userActions';

class Register extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            user: {
                userName: '',
                password: '',
                confirmPassword: ''
            },
            submitted: false
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        this.setState({ submitted: false });

        const { name, value } = event.target;
        const { user } = this.state;
        this.setState({
            user: {
                ...user,
                [name]: value
            }
        });
    }

    handleSubmit(event) {
        event.preventDefault();

        this.setState({ submitted: true });
        const { user } = this.state;
        if (user.userName && user.password && user.confirmPassword) {
            if (user.password === user.confirmPassword) {
                this.props.register(user.userName, user.password);
                // window.location.replace('/');
            }
        }
    }

    render() {
        const { registerFailed, error  } = this.props;
        const { user, submitted } = this.state;
        return (


            <div className="limiter">
        		<div className="container-login100">
        			<div className="wrap-login100 p-l-50 p-r-50 p-t-77 p-b-30">
        				<form className="login100-form validate-form" name="form" onSubmit={this.handleSubmit}>
        					<span className="login100-form-title p-b-55">
        						Sign Up
        					</span>

        					<div className="wrap-input100 validate-input m-b-16" data-validate = "Valid userName is required: ex@abc.xyz">
        						<input className="input100" type="text" name="userName" placeholder="Username" value={user.userName} onChange={this.handleChange} />
        						<span className="focus-input100" />
        						<span className="symbol-input100">
        							<span className="lnr lnr-user" />
        						</span>
        					</div>
                  {submitted && (!user.userName || registerFailed) &&
                    <div className="help-block">
                    <font color="#c80000">{ (registerFailed && user.userName) ? error : "Username is required"}</font>
                    </div>
                  }

        					<div className="wrap-input100 validate-input m-b-16" data-validate = "Password is required">
        						<input className="input100" type="password" name="password" placeholder="Password" value={user.password} onChange={this.handleChange} />
        						<span className="focus-input100" />
        						<span className="symbol-input100">
        							<span className="lnr lnr-lock" />
        						</span>
        					</div>
                  {submitted && !user.password &&
                    <div className="help-block">
                    <font color="#c80000">Password is required</font>
                    </div>
                  }

                  <div className="wrap-input100 validate-input m-b-16" data-validate = "Password is required">
        						<input className="input100" type="password" name="confirmPassword" placeholder="Confirm password" value={user.confirmPassword} onChange={this.handleChange} />
        						<span className="focus-input100" />
        						<span className="symbol-input100">
        							<span className="lnr lnr-lock" />
        						</span>
        					</div>
                  {submitted && (user.password !== user.confirmPassword) &&
                      <div className="help-block">
                        <font color="#c80000">Confirm password does not match!</font>
                      </div>
                  }

        					<div className="container-login100-form-btn p-t-25">
        						<button type="submit" className="login100-form-btn">
        							Register
        						</button>
        					</div>



        					<div className="text-center w-full p-t-115">
        						<span className="txt1">
        							Already have an account?&nbsp;
        						</span>
                    <Link to="/" className="txt1 bo1 hov1">Login now</Link>
        					</div>
        				</form>
        			</div>
        		</div>
        	</div>
        );
    }
}

function mapState(state) {
    const { registerFailed, error } = state.registration;
    return { registerFailed, error };
}

const actionCreators = {
    register: userActions.register
}

const connectedRegisterPage = connect(mapState, actionCreators)(Register);
export { connectedRegisterPage as Register };
