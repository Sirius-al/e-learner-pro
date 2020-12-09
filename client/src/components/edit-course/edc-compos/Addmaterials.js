import React, { useEffect, useState } from "react";
import { connect } from 'react-redux'

import { uploadMaterialfiles, submitCourseMaterial } from '../../../Actions/actions'

import Button from '@material-ui/core/Button';

const AddMaterials = ({ id, uploadMaterialfiles, submitCourseMaterial, files }) => {

    const [value, setvalue] = useState({courseFileTitle: '', courseFile: {}})
    const [file, setfile] = useState()


    const inputtedFile = (e) => {
        
        // console.log(e.target.files)
        setvalue({...value, courseFileName: e.target.files[0].name})
        // setfile(e.target.files[0])
        const formdata = new FormData()
        formdata.append('file', e.target.files[0])
        uploadMaterialfiles(formdata)

    }
    const inputtedData = (e) => {
        
        // console.log(e)
        setvalue({...value, courseFileTitle: e.target.value})

    }

    const sendData = (e) => {
        e.preventDefault()
        setfile(files)
        submitCourseMaterial(id, [{ courseFileTitle: value.courseFileTitle, courseFile: files }])
        // console.log(id, [{ courseFileTitle: value.courseFileTitle, courseFile: files }])


        setTimeout(() => {
            setvalue({...value, courseFileTitle: '', courseFile: {}})
        }, 2000)
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
                accept=".pdf, .docx, .doc"
                id="contained-button-file"
                type="file"
                style={{display: 'none'}}
                name="courseFileName"
                onChange={inputtedFile}
            />
            <blockquote className="blockquote">
                <footer style={{backgroundColor: 'white'}} className="blockquote-footer">Upload file ( .pdf, .docx, .doc )</footer>
            </blockquote>
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
    files: state.datas.material_files
})

export default connect(mapStateToProps, { uploadMaterialfiles, submitCourseMaterial })(AddMaterials);
