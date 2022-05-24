import Dropdown from "../dropdownmenu/DropDownMenu";
import axios from 'axios'
import { Component } from "react";

class App extends Component {
  constructor() {
    super()

    this.state = { 
      form: "login", 
      name: '', 
      email: '', 
      password: '', 
      role: '', 
      phone: '', 
      confirmedPassword: '',
      error: 'Everything Seems to be fine!'
    }

    this.toggle = {
      login: "register",
      register: "login",
    };
  }

  pushUserToDB = async () => {
    const maps = {
        "President": 1,
        "Vice President": 2,
        "Departmental Head": 3,
        "Team Lead": 4,
        "Team Member": 5,
      }
      
    try {
      const {data: res} = await axios.post(
        "/addUser", {
          pri : maps[this.state.role],
          name: this.state.name,
          email: this.state.email,
          password: this.state.password,
          confirmedPassword: this.state.confirmedPassword,
          role: this.state.role,
          phone: this.state.phone,
          current: false
        }
      )
      console.log(res.message)
    } catch (error) {
      console.log(error)
      if (error.responce && error.responce.status >= 400 && error.responce.status <= 500)
      {
        this.setState({error: error.responce.data.message})
      }
    }
  }

  authUser = async () => {
    try{
      const {data: res} = await axios.put(
        "/authUser", {
          email: this.state.email,
          password: this.state.password,
          role: this.state.role
        }
      )
      return res.data
    } catch(error) {
      console.log("Hi")
      console.log(error.request)
    }
  }

  loginUser = async () => {
    await this.authUser()
    // const userFind = await this.authUser()
    // console.log(userFind)
    // await axios.put(
    //   '/toggleLogin', {
    //     id: userFind._id,
    //     current: userFind.current
    //   }
    // )
    // this.props.passData(true)
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
            {this.state.error && <div className="errmsg">{this.state.error}</div>}
            <button onClick={(e) => {
              e.preventDefault()
              this.state.form === "register" ? this.pushUserToDB() : this.loginUser()
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
