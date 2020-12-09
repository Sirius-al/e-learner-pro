import React, { Fragment, useState } from 'react'
import { createPortal } from 'react-dom'
import Videoplayer from 'react-video-js-player'
import videoSrc from '../FILES/1. Introduction.mp4';


/* const videoBinder = (Video) => {
  let video

    if (Video !== '') {
      const vid = Video

      return video = vid

    } else {
      video = videoSrc
    }

  return video
} */


const Modal = ({ vidPoster, videolink }) => {


    const poster = !vidPoster ? 'https://images.unsplash.com/photo-1602526215099-19d4d14797d6?ixid=MXwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80' : vidPoster


    // const video = videoBinder(videolink)
    // console.log(require(`../${videolink}`).default)

    return createPortal(
      <Fragment>
        <div
          
          className="modal fade bd-example-modal-lg"
          tabIndex={-1}
          role="dialog"
          aria-labelledby="myLargeModalLabel"
          aria-hidden="true">

          <div style={{width: "100%"}} className="modal-dialog modal-dialog-centered modal-lg">

            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLongTitle">
                  Modal title
                </h5>
                
                <button
                  type="button"
                  className="close"
                  data-dismiss="modal"
                  aria-label="Close"
                  >
                  <span aria-hidden="true">×</span>
                </button>
              </div>

              <div className="modal-body">
                {!videolink && (
                  <Fragment>
                    <h5 className="modal-title" style={{display: 'block'}} id="exampleModalLongTitle1">
                      Playing Default Video...
                    </h5>
                  <br/>
                  </Fragment>
                )}
                  <Videoplayer src={videoSrc} poster={poster} width='770' />
              </div>
            </div>

          </div>

        </div>
      </Fragment>,
      document.querySelector("#modal")
    );
}

export default Modal
