import React, { useState } from "react"
import { Button } from "@material-ui/core"
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator"
import "./Header.css"
import { useHistory } from "react-router"

export default function Login(props) {
  const history = useHistory()

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
        history.push("/")
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
