import React, { Fragment, useState } from 'react'
import { createPortal } from 'react-dom'
import ReactPlayer from 'react-player/lazy'
import { useParams } from 'react-router-dom'
import history from '../history'


const Modal = () => {

  const {filepath, filename} = useParams()
  
  
    return createPortal(
      <Fragment>
        <div
          className="modal fade bd-example-modal-lg"
          onClick={() => history.goBack()}
          tabIndex={-1}
          role="dialog"
          aria-labelledby="myLargeModalLabel"
          aria-hidden="true">

          <div onClick={e => e.stopPropagation()} style={{width: "100%"}} className="modal-dialog modal-dialog-centered modal-lg">

            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLongTitle">
                  {filename ? filename : " The file doesn't exist "}
                </h5>
                
                <button
                  type="button"
                  className="close"
                  data-dismiss="modal"
                  aria-label="Close"
                  onClick={() => history.goBack()}
                  >
                  <span aria-hidden="true">×</span>
                </button>
                
              </div>

              <div className="modal-body" >
                
                  <div style={{height: "300px", width: '768px', display: 'block', position: 'relative' }}>
                  <ReactPlayer 
                    width='768px' 
                    height='300px' 
                    controls 
                    style={{backgroundColor: 'rgba(0, 0, 0, 0.8)'}} 
                    url={`/${filepath}/${filename}`}
                    playing={true} />
                  </div>
              </div>
            </div>

          </div>

        </div>
      </Fragment>,
      document.querySelector("#modal")
    );
}

export default Modal
