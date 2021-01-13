import React, { Fragment, useState } from "react";
import { connect } from 'react-redux'

import { uploadMaterialfiles, submitCourseMaterial } from '../../../Actions/actions'

import Button from '@material-ui/core/Button';

const AddMaterials = ({ id, uploadMaterialfiles, materialFiles, m_progress, submitCourseMaterial, files }) => {

    const [value, setvalue] = useState('')

    let form = new FormData();

    const inputtedFile = (e) => {
        
        function fnc(f) {
            const formdata = new FormData()
                formdata.append('file', f)

                // console.log(file)
                //! const objectURL = URL.createObjectURL(file)
                // console.log(objectURL)
                return uploadMaterialfiles(formdata)
        }


        [...e.target.files].map((file, i) => {


            if (m_progress === 0) {
                fnc(file)
            }
            // console.log(file)
        })
        // console.log(e)
        // setvalue({...value, courseFileTitle: e.target.value})
}

    if (materialFiles.length > 1) {
        form.append('courseFile', materialFiles)
    }

    function titleHandler(e) {

        setvalue(e.target.value)
        
    }

    const sendData = (e) => {
        e.preventDefault()

        form.append('courseFileTitle', value)

        // const newObj = Object.fromEntries(newMap)
        submitCourseMaterial(id, JSON.stringify({courseFile: materialFiles, courseFileTitle: value}))

        setvalue('')
        // console.log(id, [newObj])
    }
   
  return (
    <div>
      <div className="card mb-4">
        <div className="card-header">Course Material </div>
            <div className="card-body">
                <input type="text" name="courseFileTitle" className="form-control" id="inputZip" placeholder="Course material file title" value={value} onChange={e => titleHandler(e)}
                    />
                <br/>
                <input
                    accept=".pdf, .docx, .doc"
                    id="contained-button-file"
                    type="file"
                    style={{display: 'none'}}
                    name="courseFileName"
                    multiple
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
                <p style={{display: 'block', marginTop: "10px", marginBottom: "5px"}}> <strong style={{overflowX: 'clip'}} >{materialFiles && materialFiles.length > 0 ? `Uploaded Files ==> ${materialFiles.map(file => file.filename).join(', ')}` : "Course material file"}</strong> </p>
            </div>
            {m_progress && m_progress > 0 ? (<Fragment>
                    <p className="text-center font-weight-bold">Uploading materials...</p>
                    <div className="progress mb-3">
                        <div className="progress-bar" role="progressbar" style={{width: m_progress+'%'}}  aria-valuemax={100}>{m_progress}%</div>
                    </div>
                </Fragment>) : ''}
            <Button variant="contained" onClick={(e) => sendData(e)} color="secondary" component="span">
                submit course material
            </Button>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
    m_progress: state.datas.materialsUploadingProgress,
    materialFiles: state.datas.material_files,
    files: state.datas.material_files
})

export default connect(mapStateToProps, { uploadMaterialfiles, submitCourseMaterial })(AddMaterials);
