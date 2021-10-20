import {
  GridList,
  GridListTile,
  GridListTileBar,
  Card,
  CardContent,
  CardActions,
  Button,
  CardHeader,
  FormControl,
  InputLabel,
  Input,
  Select,
  MenuItem
} from "@material-ui/core"
import React, { Fragment, useEffect, useState } from "react"
import { Link } from "react-router-dom"
import Header from "../../common/header/Header"
import "./Home.css"

const Home = (props) => {
  const [data, setdata] = useState([])

  useEffect(async () => {
    const rawResponse = await fetch(props.baseUrl + "movies", {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json;charset=UTF-8"
      }
    })

    const result = await rawResponse.json()
    const item = result.movies
    setdata(item)
  }, [])

  const [age, setAge] = useState("")

  const handleChange = (event) => {
    setAge(event.target.value)
  }

  return (
    <Fragment>
      <Header baseUrl={props.baseUrl} bookshowbutton="false" />
      <div className="Upcoming">Upcoming Movies</div>

      <div className="custgridpartent">
        <GridList cols={6} cellHeight={250}>
          {data.map((res) => (
            <GridListTile className="custgridChild" key={res.id} rows={1}>
              <img src={res.poster_url} alt={res.title} />
              <GridListTileBar title={res.title} />
            </GridListTile>
          ))}
        </GridList>
      </div>

      {/* showing Released movies with satatus as RELEASED */}
      <div className="flex-container">
        <div className="flex-left">
          <GridList cols={4} cellHeight={350} container spacing={12}>
            {data
              .filter((data) => data.status === "RELEASED")
              .map((res) => (
                <Link to={`/movie/${res.id}`} state={{ id: res.id }}>
                  <GridListTile
                    className="releaseimg"
                    key={res.id}
                    rows={1}
                    spacing={4}
                  >
                    <img src={res.poster_url} alt={res.title} />
                    <GridListTileBar
                      title={res.title}
                      subtitle={`Release Date: ${res.release_date}`}
                    />
                  </GridListTile>
                </Link>
              ))}
          </GridList>
        </div>

        {/* Find movie form */}
        <div className="flex-right">
          <Card>
            <CardHeader
              title="FIND MOVIES BY:"
              color="theme.palette.primary.light"
              style={{ color: "theme.palette.primary.light" }}
            />
            <CardContent margin="theme.spacing.unit">
              <FormControl
                variant="standard"
                style={{ minWidth: 240, maxWidth: 240 }}
              >
                <InputLabel htmlFor="my-input">Email address</InputLabel>
                <Input id="my-input" />
              </FormControl>
            </CardContent>

            <CardContent margin="theme.spacing.unit">
              <FormControl
                variant="standard"
                style={{ minWidth: 240, maxWidth: 240 }}
              >
                <InputLabel htmlFor="my-input"> address</InputLabel>
                <Input id="my-input" />
              </FormControl>
            </CardContent>

            <CardContent margin="theme.spacing.unit">
              <FormControl
                variant="standard"
                style={{ minWidth: 240, maxWidth: 240 }}
              >
                <InputLabel htmlFor="genres">Genres</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={age}
                  label="Age"
                  onChange={handleChange}
                >
                  <MenuItem value={10}>Ten</MenuItem>
                  <MenuItem value={20}>Twenty</MenuItem>
                  <MenuItem value={30}>Thirty</MenuItem>
                </Select>
              </FormControl>
            </CardContent>

            <CardActions>
              <Button size="small" color="theme.palette.primary">
                Learn More
              </Button>
            </CardActions>
          </Card>
        </div>
      </div>
    </Fragment>
  )
}

export default Home
