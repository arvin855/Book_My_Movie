import React, { useState } from "react"
import { Button } from "@material-ui/core"
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator"
import "./Header.css"

export default function Register(props) {
  const [addUser, setUsers] = useState({
    email_address: "",
    first_name: "",
    last_name: "",
    mobile_number: "",
    password: ""
  })

  const [showResults, setShowResults] = useState(false)

  const inputChangedHandler = (e) => {
    const state = addUser
    state[e.target.name] = e.target.value
    setUsers({ ...state })
  }

  const onFormSubmitted = (e) => {
    e.preventDefault()
    signUpSubmit(addUser, props.baseUrl, showResults)
  }

  const { email_address, first_name, last_name, mobile_number, password } =
    addUser

  //   Register user details into backend(database)
  async function signUpSubmit(addUser, baseUrl, showResults) {
    const params = {
      email_address: addUser.email_address,
      first_name: addUser.first_name,
      last_name: addUser.last_name,
      mobile_number: addUser.mobile_number,
      password: addUser.password
    }

    try {
      const rawResponse = await fetch(baseUrl + "signup", {
        body: JSON.stringify(params),
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json;charset=UTF-8"
        }
      })

      const result = await rawResponse.json()

      if (rawResponse.ok) {
        setShowResults(true)
      } else {
        const error = new Error()
        error.message = result.message || "Something went wrong."
        throw error
      }
    } catch (e) {
      alert(`Error: ${e.message}`)
    }
  }

  const Results = () => (
    <p style={{ "fontSize ": "15px" }}>
      Registration Successful. Please Login!
    </p>
  )

  return (
    //   Register Form
    <ValidatorForm onSubmit={onFormSubmitted}>
      <TextValidator
        id="first_name"
        label="First Name*"
        type="text"
        name="first_name"
        onChange={inputChangedHandler}
        value={first_name}
        validators={["required"]}
        errorMessages={["required"]}
      />

      <TextValidator
        style={{ marginTop: "20px" }}
        id="last_name"
        label="Last Name*"
        type="text"
        name="last_name"
        onChange={inputChangedHandler}
        value={last_name}
        validators={["required"]}
        errorMessages={["required"]}
      />

      <TextValidator
        style={{ marginTop: "20px" }}
        id="email_address"
        label="Email*"
        type="text"
        name="email_address"
        onChange={inputChangedHandler}
        value={email_address}
        validators={["required"]}
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

      <TextValidator
        style={{ marginTop: "20px" }}
        id="mobile_number"
        label="Contact No.*"
        type="text"
        name="mobile_number"
        onChange={inputChangedHandler}
        value={mobile_number}
        validators={["required"]}
        errorMessages={["required"]}
      />

      {showResults ? <Results /> : null}

      <Button
        variant="contained"
        type="submit"
        size="small"
        color="primary"
        style={{ marginTop: "20px" }}
      >
        REGISTER
      </Button>
    </ValidatorForm>
  )
}
