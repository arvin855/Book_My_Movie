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
  Checkbox,
  ListItemIcon,
  ListItemText,
  MenuItem
} from "@material-ui/core"
import React, { Fragment, useEffect, useState } from "react"
import { Link } from "react-router-dom"
import Header from "../../common/header/Header"
import "./Home.css"
import { makeStyles } from "@material-ui/styles"

const usecuststyle = makeStyles((theme) => ({
  formControl: {
    margin: 1,
    width: 300
  },
  indeterminateColor: {
    color: "#f50057"
  },
  selectAllText: {
    fontWeight: 500
  },
  selectedAll: {
    backgroundColor: "rgba(0, 0, 0, 0.08)",
    "&:hover": {
      backgroundColor: "rgba(0, 0, 0, 0.08)"
    }
  }
}))

const Home = (props) => {
  const [data, setdata] = useState([])

  // get movies details
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

  const [genres, setgenres] = useState([])
  const [artists, setartists] = useState([])

  // get Genres data
  useEffect(() => {
    async function gendata() {
      const rawResponse = await fetch(props.baseUrl + "genres", {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json;charset=UTF-8"
        }
      })
      const result = await rawResponse.json()
      const gen = result.genres
      setgenres(gen)
    }
    gendata()
  }, [])

  // get allartists data
  useEffect(() => {
    async function artistsdata() {
      const rawResponse = await fetch(props.baseUrl + "artists", {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json;charset=UTF-8"
        }
      })
      const result = await rawResponse.json()
      const art = result.artists
      setartists(art)
    }
    artistsdata()
  }, [])
  console.log(genres)
  console.log(artists)
  console.log(data)

  const useStyles = makeStyles(() => ({
    title: {
      color: "blue",
      marginTop: "15px"
    }
  }))
  const classes = useStyles()
  const custstyles = usecuststyle()

  const [gen, setgen] = useState([])

  const genhandleChange = (event) => {
    const value = event.target.value
    if (value[value.length - 1] === "all") {
      setgen(gen.length === genres.length ? [] : genres)
      return
    }
    setgen(value)
  }

  const [artistname, setartistname] = useState([])

  let artistnames = []
  artistnames = artists.map((e) => `${e.first_name} ${e.last_name}`)
  const handleChange = (event) => {
    const value = event.target.value
    if (value[value.length - 1] === "all") {
      setartistname(artistname.length === artistnames.length ? [] : artistnames)
      return
    }
    setartistname(value)
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
              className={classes.title}
              title="FIND MOVIES BY:"
              color="theme.palette.primary.light"
              style={{ color: "theme.palette.primary.light" }}
            />

            <CardContent margin="theme.spacing.unit">
              <FormControl
                variant="standard"
                style={{ minWidth: 240, maxWidth: 240 }}
              >
                <InputLabel htmlFor="my-input">Movie Name</InputLabel>
                <Input id="moviename" />
              </FormControl>
            </CardContent>

            <CardContent margin="theme.spacing.unit">
              <FormControl className={custstyles.formControl}>
                <InputLabel id="mutiple-select-label">Geners</InputLabel>
                <Select
                  labelId="mutiple-select-label"
                  multiple
                  value={gen}
                  onChange={genhandleChange}
                  renderValue={(gen) => gen.join(", ")}
                >
                  {genres.map((g) => (
                    <MenuItem key={g.id} value={g.genre}>
                      <ListItemIcon>
                        <Checkbox checked={gen.indexOf(g.genre) > -1} />
                      </ListItemIcon>
                      <ListItemText primary={g.genre} />
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </CardContent>

            <CardContent margin="theme.spacing.unit">
              <FormControl className={custstyles.formControl}>
                <InputLabel id="mutiple-select-label">Artists</InputLabel>
                <Select
                  labelId="mutiple-select-label"
                  multiple
                  value={artistname}
                  onChange={handleChange}
                  renderValue={(artistname) => artistname.join(", ")}
                >
                  {artistnames.map((option) => (
                    <MenuItem key={option} value={option}>
                      <ListItemIcon>
                        <Checkbox checked={artistname.indexOf(option) > -1} />
                      </ListItemIcon>
                      <ListItemText primary={option} />
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </CardContent>

            <CardContent margin="theme.spacing.unit">
              <FormControl
                variant="standard"
                style={{ minWidth: 240, maxWidth: 240 }}
              >
                <InputLabel shrink htmlFor="my-input">
                  Release Date Start
                </InputLabel>
                <Input type="date" />
              </FormControl>
            </CardContent>

            <CardContent margin="theme.spacing.unit">
              <FormControl
                variant="standard"
                style={{ minWidth: 240, maxWidth: 240 }}
              >
                <InputLabel shrink htmlFor="my-input">
                  Release Date End
                </InputLabel>
                <Input type="date" />
              </FormControl>
            </CardContent>

            <CardActions>
              <Button
                size="small"
                variant="contained"
                color="primary"
                fullWidth
              >
                APPLY
              </Button>
            </CardActions>
          </Card>
        </div>
      </div>
    </Fragment>
  )
}

export default Home
