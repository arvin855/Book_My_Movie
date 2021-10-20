import React, { Fragment, useEffect, useState } from "react"
import { GridList, GridListTileBar, GridListTile } from "@material-ui/core"
import Header from "../../common/header/Header"
import { Button, Typography } from "@material-ui/core"
import "./Details.css"
import { useHistory } from "react-router"
import YouTube from "react-youtube"
import Rating from "material-ui-rating"

const Details = (props) => {
  const [details, setdetails] = useState({
    id: "",
    title: "",
    genres: [],
    artists: [],
    duration: "",
    rating: "",
    storyline: "",
    wiki_url: "",
    trailer_url: "",
    poster_url: "",
    status: ""
  })
  const history = useHistory()
  const pageUrl = window.location.href
  const urlId = pageUrl.split("/")[4]

  useEffect(() => {
    async function dataload(id) {
      const rawResponse = await fetch(props.baseUrl + "movies/" + id, {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json;charset=UTF-8"
        }
      })
      const result = await rawResponse.json()
      setdetails(result)
    }
    const pageUrl = window.location.href
    const urlId = pageUrl.split("/")[4]
    dataload(urlId)
  }, [])

  console.log(details)
  console.log(details.poster_url)
  const goBack = () => {
    history.push("/")
  }

  function conReady(e) {
    e.target.pauseVideo()
  }

  let releaseDate = new Date(details.release_date)

  function youtube_parser(url) {
    var regExp =
      /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/
    var match = url.match(regExp)
    return match && match[7].length === 11 ? match[7] : false
  }

  const Youtubefetch = () => {
    const opts = {
      height: "390",
      width: "640",
      playerVars: {
        // https://developers.google.com/youtube/player_parameters
        autoplay: 1
      }
    }

    return (
      <YouTube
        videoId={youtube_parser(details.trailer_url)}
        opts={opts}
        onReady={conReady}
      />
    )
  }
  const [rating, setrating] = useState(0)
  // const [hover, sethover] = useState(null)

  return (
    <Fragment>
      <Header baseUrl={props.baseUrl} bookshowbutton="true" id={urlId} />
      <div className="custbtn">
        <Button onClick={goBack}>
          <Typography>{`< Back to Home`}</Typography>
        </Button>
      </div>

      {/* Left Part of the Screen */}
      <div className="mainflexbox">
        <div className="leftflexbox">
          <img src={details.poster_url} alt={details.title} />
        </div>

        {/* Middle Part of the Screen */}
        <div className="middleflexbox">
          <Typography variant="headline" component="h2">
            {details.title}
          </Typography>
          <Typography>
            <b>Genres: </b>
            {details.genres.join(", ")}
          </Typography>
          <Typography>
            <b>Duration: </b>
            {details.duration}
          </Typography>
          <Typography>
            <b>Release Date: </b>
            {releaseDate.toDateString()}
          </Typography>
          <Typography>
            <b>Rating: </b>
            {details.rating}
          </Typography>
          <Typography style={{ marginTop: "16px" }}>
            <b>Plot: </b>(<a href={details.wiki_url}>Wiki_Link</a>){" "}
            {details.storyline}
          </Typography>
          <Typography style={{ marginTop: "16px" }}>
            <b>Trailer: </b>
            <Youtubefetch />
          </Typography>
        </div>

        {/* Left Part of the Screen */}
        <div className="rightflexbox">
          <Typography>
            <b>Rate this movie: </b>
          </Typography>
          <Rating
            name="simple-controlled"
            value={rating}
            onChange={(event, newValue) => {
              setrating(newValue)
            }}
          />

          <Typography style={{ marginTop: "16px", marginBottom: "16px" }}>
            <b>Artists: </b>
          </Typography>
          <GridList cols={2}>
            {details.artists.map((res) => (
              <GridListTile key={res.id}>
                <img src={res.profile_url} alt={res.first_name} />
                <GridListTileBar title={`${res.first_name} ${res.last_name}`} />
              </GridListTile>
            ))}
          </GridList>
        </div>
      </div>
    </Fragment>
  )
}
export default Details
