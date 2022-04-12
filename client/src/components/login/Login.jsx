import Dropdown from "../dropdownmenu/DropDownMenu";
import axios from 'axios'
import { Component } from "react";

class App extends Component {
  constructor() {
    super()

    this.state = { form: "login", name: '', email: '', password: '', role: '', phone: '', confirmedPassword: ''}

    this.toggle = {
      login: "register",
      register: "login",
    };
  }

  pushUserToDB = async () => {
    await axios.post(
      "/api/putData", {
        name: this.state.name,
        email: this.state.email,
        password: this.state.password,
        role: this.state.role,
        phone: this.state.phone,
      }
    )
  }

  onSubmit(e) {
    e.preventDefault()
    this.state.form === "register" ? this.pushUserToDB() : console.log("Logging in")
  }

  onChangeName = (e) => {
    this.setState({name: e.target.value})
  }

  onChangeEmail = (e) => {
    this.setState({email: e.target.value})
  }

  onChangePhone = (e) => {
    this.setState({phone: e.target.value})
  }

  onChangePassword = (e) => {
    this.setState({password: e.target.value})
  }

  onChangeConfirmedPassword = (e) => {
    this.setState({confirmedPassword: e.target.value})
  }
  
  getRole = (data) => {
    this.setState({role: data})
  }

  render() {
    return (
      <div className="container">
        <div
          style={{
            transform: `translate(${
              this.state.form === "login" ? 0 : 250
            }px, 0px)`,
          }}
          className="form-div"
        >
          <form>
            {this.state.form === "login" ? (
              <>
                <input placeholder="Email" onChange={ this.onChangeEmail } type="text" />
                <input placeholder="Password" onChange={ this.onChangePassword } type="password" />
                <Dropdown getRole = {this.getRole} />
              </>
            ) : (
              <>
                <input placeholder="Name" onChange={ this.onChangeName } type="text" />
                <input placeholder="Email" onChange={ this.onChangeEmail } type="text" />
                <input placeholder="Phone#" onChange={ this.onChangePhone } type="text" />
                <input placeholder="Password" onChange={ this.onChangePassword } type="password" />
                <input placeholder="Retype Password" onChange={ this.onChangeConfirmedPassword } type="password" />
                <Dropdown getRole = {this.getRole} />
              </>
            )}
            <button onClick={(e) => {
              this.props.passData(true)
              this.onSubmit(e)
            }} className="button-primary">Submit</button>
          </form>
        </div>
        <div
          style={{
            transform: `translate(${
              this.state.form === "login" ? 0 : -250
            }px, 0px)`,
          }}
          className="button-div"
        >
          <p>
            {this.state.form === "login"
              ? "Want To Apply?"
              : "Already a member?"}
          </p>
          <button
            onClick={() => {
              this.setState({ form: this.toggle[this.state.form] })
            }}
          >
            {this.toggle[this.state.form]}
          </button>
        </div>
      </div> 
    );
  }
}

export default App;
