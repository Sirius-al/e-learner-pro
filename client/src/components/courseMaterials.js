import React, { useEffect, useState } from "react";
import { connect } from 'react-redux'

import { uploadfile, submitCourseMaterial } from '../Actions/actions'

import Button from '@material-ui/core/Button';

const CourseMaterials = ({ id, uploadfile, submitCourseMaterial, files }) => {

    const [value, setvalue] = useState({courseFileTitle: '', courseFile: ''})
    const [file, setfile] = useState()


    const inputtedFile = (e) => {
        
        // console.log(e.target.files)
        setvalue({...value, courseFileName: e.target.files[0].name})
        setfile(e.target.files[0])
        const formdata = new FormData()
        formdata.append('file', e.target.files[0])
        uploadfile(formdata)

    }
    const inputtedData = (e) => {
        
        // console.log(e)
        setvalue({...value, courseFileTitle: e.target.value})

    }

    const sendData = (e) => {
        e.preventDefault()
        submitCourseMaterial(id, [{ courseFileTitle: value.courseFileTitle, courseFile: files }])
        // console.log([value])
        setvalue({courseFileTitle: '', courseFileName: ''})
    }
   
  return (
    <div>
      <div className="card mb-4">
        <div className="card-header">Course Material </div>
        <div className="card-body">
            <input type="text" name="courseFileTitle" className="form-control" id="inputZip" placeholder="Course material file title" value={value.courseFileTitle} onChange={e => inputtedData(e)}
                 />
            <br/>
            <input
                accept="image/*"
                id="contained-button-file"
                type="file"
                style={{display: 'none'}}
                name="courseFileName"
                multiple
                onChange={inputtedFile}
            />
            <label htmlFor="contained-button-file">
                <Button variant="contained" color="primary" component="span">
                    Upload file
                </Button>
            </label>
                <p style={{display: 'inline-block', marginLeft: "10px"}}> <strong>{files.filename ? files.filename : "Course material file"}</strong> </p>
        </div>
            <Button variant="contained" onClick={(e) => sendData(e)} color="secondary" component="span">
                submit course material
            </Button>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
    files: state.datas.data
})

export default connect(mapStateToProps, { uploadfile, submitCourseMaterial })(CourseMaterials);
