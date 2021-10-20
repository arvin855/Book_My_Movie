import React, { Fragment, useState } from "react"
import { Button, Tab, Tabs } from "@material-ui/core"
import { Link } from "react-router-dom"
import Modal from "react-modal"
import Logo from "../../assets/logo.svg"
import "./Header.css"
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator"
import Register from "./Register"

Modal.setAppElement("#root")

export default function Header(props) {
  const accessToken = window.sessionStorage.getItem("access-token")

  // function for Modal
  const [isOpen, setIsOpen] = useState(false)
  function toggleModal() {
    setIsOpen(!isOpen)
  }

  // code for Tab functions
  const [value, setValue] = useState(0)
  const handleTabs = (e, val) => {
    setValue(val)
  }

  const Logout = () => {
    window.sessionStorage.clear()
    setIsOpen(false)
  }

  const LoginModelButton = () => (
    <div className="login_logout_button">
      <Button
        className="login_logout_button"
        variant="contained"
        size="small"
        onClick={toggleModal}
      >
        Login
      </Button>
      <Modal isOpen={isOpen} onRequestClose={toggleModal} className="model">
        <Tabs value={value} onChange={handleTabs}>
          <Tab label="LOGIN"></Tab>
          <Tab label="REGISTER"></Tab>
        </Tabs>
        <TabPanel value={value} index={0}>
          <Login baseUrl={props.baseUrl} />
        </TabPanel>
        <TabPanel value={value} index={1}>
          <Register baseUrl={props.baseUrl} />
        </TabPanel>
      </Modal>
    </div>
  )

  const Login = () => {
    const [checkUser, setUsers] = useState({
      email_address: "",
      password: ""
    })
    const inputChangedHandler = (e) => {
      const state = checkUser
      state[e.target.name] = e.target.value
      setUsers({ ...state })
    }

    //   Check with backend user_email and password
    async function checkLoginInfo(e) {
      e.preventDefault()
      const param = window.btoa(
        `${checkUser.email_address}:${checkUser.password}`
      )
      try {
        const rawResponse = await fetch(props.baseUrl + "/auth/login", {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json;charset=UTF-8",
            authorization: `Basic ${param}`
          }
        })

        const result = await rawResponse.json()
        if (rawResponse.ok) {
          window.sessionStorage.setItem("user-details", JSON.stringify(result))
          window.sessionStorage.setItem(
            "access-token",
            rawResponse.headers.get("access-token")
          )
          setIsOpen(false)
        } else {
          const error = new Error()
          error.message = result.message || "Something went wrong."
          alert(`Error: ${error.message}`)
        }
      } catch (e) {
        alert(`Error: ${e.message}`)
      }
    }

    const { email_address, password } = checkUser

    return (
      // Login form
      <ValidatorForm onSubmit={checkLoginInfo}>
        <TextValidator
          id="email_address"
          label="Username*"
          type="text"
          name="email_address"
          onChange={inputChangedHandler}
          validators={["required"]}
          value={email_address}
          errorMessages={["required"]}
        />

        <TextValidator
          style={{ marginTop: "20px" }}
          id="password"
          label="Password*"
          type="password"
          name="password"
          onChange={inputChangedHandler}
          value={password}
          validators={["required"]}
          errorMessages={["required"]}
        />

        <br />

        <Button
          variant="contained"
          type="submit"
          size="small"
          color="primary"
          style={{ margin: "30px" }}
        >
          LOGIN
        </Button>
      </ValidatorForm>
    )
  }

  return (
    <Fragment>
      <div className="header">
        {/* Adding the logo with rotational effects */}
        <img src={Logo} className="logo" alt="Play-Movie logo" />

        {accessToken === null ? (
          <LoginModelButton />
        ) : (
          // {/* Logout Button */}
          <div className="login_logout_button">
            <Button
              className="login_logout_button"
              variant="contained"
              size="small"
              onClick={Logout}
            >
              Logout
            </Button>
          </div>
        )}

        {/* Book Show Button */}
        {props.bookshowbutton === "true" && accessToken ? (
          <div className="login_logout_button_book">
            <Link to={`/bookshow/${props.id}`} state={{ id: props.id }}>
              <Button
                className="login_logout_button_book"
                variant="contained"
                size="small"
                color="primary"
              >
                Book show
              </Button>
            </Link>
          </div>
        ) : null}

        {props.bookshowbutton === "true" && accessToken === null ? (
          <div className="login_logout_button_book">
            <Button
              className="login_logout_button_book"
              variant="contained"
              size="small"
              color="primary"
              onClick={toggleModal}
            >
              Book show
            </Button>
          </div>
        ) : null}
      </div>
    </Fragment>
  )
}

function TabPanel(props) {
  const { children, value, index } = props
  return <div>{value === index && <h1>{children}</h1>}</div>
}
