import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import classnames from 'classnames';
import { connect } from 'react-redux';
import { registerUser } from "../../actions/authActions";
import {RouteComponentProps} from "react-router";

export interface RegisterProps {
    auth: any;
    history: any;
    registerUser: any;
};

export interface RegisterStates {
    name: string;
    email: string;
    password: string;
    password2: string;
    errors: any;
}

// Your component own properties
type PropsType = RouteComponentProps<RegisterProps> & {
    auth: any,
    history: any,
    registerUser: Function
}

class Register extends Component<PropsType, RegisterStates> {

    state = {
        name: '',
        email: '',
        password: '',
        password2: '',
        errors: {
            name: '',
            email: '',
            password: '',
            password2: ''
        }
    }

    componentDidMount() {
        if (this.props.auth.isAuthenticated) {
          this.props.history.push('/dashboard');
        }
      }
    
      componentWillReceiveProps(nextProps: any) {
        if(nextProps.errors) {
          this.setState({ errors: nextProps.errors });
        }
      }

      onChange = (e: any) => {
        this.setState({[e.target.name]: e.target.value} as RegisterStates);
      }
    
      onSubmit = (e: any) => {
        e.preventDefault();
        const newUser = {
          name: this.state.name,
          email: this.state.email,
          password: this.state.password,
          password2: this.state.password2
        }
    
        this.props.registerUser(newUser, this.props.history);
      }

      render() {
        const { errors } = this.state;
    
        return <div className="register">
            <div className="container">
              <div className="row">
                <div className="col-md-8 m-auto">
                  <h1 className="display-4 text-center">Sign Up</h1>
                  <p className="lead text-center">Create your account</p>
                  <form noValidate onSubmit={this.onSubmit}>
                    <div className="form-group">
                      <input 
                        type="text"
                        className={ classnames('form-control form-control-lg', {
                          'is-invalid': errors.name
                        }) } 
                        placeholder="Name" 
                        name="name" 
                        onChange={this.onChange} 
                        value={this.state.name} 
                      />
                      {errors.name && (
                        <div className="invalid-feedback">{errors.name}</div>
                      )}
                    </div>
                    <div className="form-group">
                      <input 
                        type="email" 
                        className={classnames('form-control form-control-lg', {
                          'is-invalid': errors.email
                        })} 
                        placeholder="Email Address" 
                        name="email" 
                        onChange={this.onChange} 
                        value={this.state.email} 
                      />
                      {errors.email && (
                        <div className="invalid-feedback">{errors.email}</div>
                      )}
                      <small className="form-text text-muted">
                        This site uses Gravatar so if you want a profile image,
                        use a Gravatar email
                      </small>
                    </div>
                    <div className="form-group">
                      <input 
                        type="password" 
                        className={classnames('form-control form-control-lg', {
                          'is-invalid': errors.password
                        })} 
                        placeholder="Password" 
                        name="password" 
                        value={this.state.password} 
                        onChange={this.onChange} 
                      />
                      {errors.password && (
                        <div className="invalid-feedback">{errors.password}</div>
                      )}
                    </div>
                    <div className="form-group">
                      <input 
                        type="password" 
                        className={classnames('form-control form-control-lg', {
                          'is-invalid': errors.password2
                        })} 
                        placeholder="Confirm Password" 
                        name="password2" 
                        value={this.state.password2} 
                        onChange={this.onChange} 
                      />
                      {errors.password2 && (
                        <div className="invalid-feedback">{errors.password2}</div>
                      )}
                    </div>
                    <input type="submit" className="btn btn-info btn-block mt-4" />
                  </form>
                </div>
              </div>
            </div>
          </div>;
      }
}

const mapStateToProps = (state: any) => ({
    auth: state.auth,
    errors: state.errors
  })
  
  export default connect(
    mapStateToProps,
    { registerUser }
  )(withRouter(Register));
