import React, { Fragment, useState } from "react"
import Logo from "../../assets/logo.svg"
import { Button, Tab, Tabs } from "@material-ui/core"
import Modal from "react-modal"
import "./Header.css"
import Login from "./Login"
import Register from "./Register"

Modal.setAppElement("#root")

export default function Header(props) {
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

  return (
    <Fragment>
      <div className="header">
        {/* Adding the logo with rotational effects */}
        <img src={Logo} className="logo" alt="Play-Movie logo" />

        {/* Adding the Login button with Modal function*/}
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

        {/* Logout Button */}
        <div className="login_logout_button">
          <Button
            className="login_logout_button"
            variant="contained"
            size="small"
          >
            Logout
          </Button>
        </div>

        {/* Book Show Button */}
        <div className="login_logout_button_book">
          <Button
            className="login_logout_button_book"
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

function TabPanel(props) {
  const { children, value, index } = props
  return <div>{value === index && <h1>{children}</h1>}</div>
}
