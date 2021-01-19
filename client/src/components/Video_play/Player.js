import React, { useState } from 'react'
import ReactPlayer from 'react-player/lazy'

const Player = ({ lessons, Url, videoId }) => {

    const [url, seturl] = useState('')


    if (videoId && lessons) {
        lessons.map((lesson, i) => {
          const theTargated = lesson.lessonFile.filter(file => file.originalName === videoId)
          console.log(theTargated)
          if (theTargated.length !== 0) {
              seturl(theTargated[0].Location)
          }
        })
      }

    return (
        <ReactPlayer 
        width='59vw' 
        height='60vh' 
        controls 
        style={{position: 'absolute', backgroundColor: 'rgba(0, 0, 0, 0.6)'}} 
        url={url}
        playing={true} />
    )
}

export default Player
