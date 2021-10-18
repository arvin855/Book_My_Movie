import React, { Fragment } from "react"
import Logo from "../../assets/logo.svg"
import { Button } from "@material-ui/core"

import "./Header.css"

const Header = function () {
  return (
    <Fragment>
      <div className="header">
        <img src={Logo} className="logo" alt="Play-Movie logo" />
        <div className="login_logout_button">
          <Button
            className="login_logout_button"
            variant="contained"
            size="small"
          >
            Login
          </Button>
          <Button
            className="login_logout_button"
            variant="contained"
            size="small"
          >
            Logout
          </Button>
          <Button
            className="login_logout_button book"
            variant="contained"
            size="small"
            color="primary"
          >
            Book show
          </Button>
        </div>
      </div>
    </Fragment>
  )
}

export default Header
