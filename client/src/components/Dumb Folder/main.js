import React, { Fragment, useState } from 'react'
import { createPortal } from 'react-dom'
import Docs from './MainComp'
import * as html2pdf from 'html2pdf.js'
import { connect } from 'react-redux'
import { uploadCertificateImage } from '../../Actions/actions'

const Main = ({ img, uploadCertificateImage }) => {

  const [state, setstate] = useState({name: '', course: '', image: ''})
  const [show, setshow] = useState(false)

  const selectImage = (e) => {
    
    const file = e.target.files[0];

    const formdata = new FormData()
    formdata.append('file', file)
    uploadCertificateImage(formdata)

      // console.log(file)
      
    }
  

  const evented = (e) => {
    setstate({...state, [e.target.name]: e.target.value})
  } 

  const onFormSubmit = (e) => {
    e.preventDefault()

    setstate({...state, image: img.filepath})

    console.log(state)
    setshow(true)

  }

  const onCertificateButtoinclick = () => {
    const options = {
      filename: 'certificate.pdf',
      image: { type: 'jpeg' },
      html2canvas: {},
      jsPDF: { orientation: 'landscape' }
    };
  
    const Element = document.querySelector('.certificate-container')
  
    html2pdf().from(Element).set(options).save()
  }


  //! MAIN COMPONENT RENDERER
  return createPortal(
    <div style={{ position: "relative", width: "98vw", height: "95vh" }}>
      {!show && (
        <Fragment>
          <div className="container">
          <p className="h4 text-center">Fill-up the form to create your certificate</p>
          <br/>
        <form onSubmit={e => onFormSubmit(e)}>
          <div className="form-group">
            <label htmlFor="exampleInputEmail1">NAME</label>
            <input
              type="text"
              className="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              placeholder="Your name"
              name="name"
              onChange={e=> evented(e)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="exampleInputPassword1">COURSE's NAME</label>
            <input
              type="text"
              className="form-control"
              id="exampleInputPassword1"
              placeholder="Course name"
              name="course"
              onChange={e=> evented(e)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="exampleFormControlFile1">Your Image</label>
            <input type="file" className="form-control-file" id="exampleFormControlFile1" onChange={e => selectImage(e)} />
          </div>

          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </form>
      </div>

      <br />

        </Fragment>
      )}

      {show && (
        <Fragment>
          <Docs name={state.name} course={state.course} image={state.image} />

          <button
            className="btn btn-dark Certificate-button"
            onClick={() => onCertificateButtoinclick()}
          >
            Accept the Certificate
          </button>
        </Fragment>
      )}
    </div>,
    document.querySelector("#pdf")
  );
};



const mapStateToProps = (state) => ({
  img: state.datas.certificateImg
})

export default connect(mapStateToProps, { uploadCertificateImage })(Main)
