import React, { Fragment, useState } from "react";
import { connect } from 'react-redux'

import { uploadMaterialfiles, submitCourseMaterial, SetAlert } from '../../../Actions/actions'

import Button from '@material-ui/core/Button';

import DropZone from '../../mainformPart/DropZone';

const AddMaterials = ({ id, uploadMaterialfiles, materialFiles, m_progress, submitCourseMaterial, SetAlert, files }) => {

    const [filesArray, setfilesArray] = useState([])
    const [value, setvalue] = useState('')

    
    //!========================================== Functions ==============================================
    function typeChecker(targated_type, allowedType = ['image']) {
        const theFileType = targated_type.split('/')[0]

        if (allowedType.indexOf(theFileType) === -1) {
          return false
        } else {
            return true
        }
    }


    
    //!========================================== Important functions ( 1 ) ==============================================
    //!========================================== Important functions ( 1 ) ==============================================
    //!========================================== Important functions ( 1 ) ==============================================
    const inputtedFile = (e) => {
    
        // setfilesArray([...filesArray, ...e.target.files])
        setfilesArray([...filesArray, ...e])
    }


    //!========================================== Important functions ( 2 ) ==============================================
    //!========================================== Important functions ( 2 ) ==============================================
    //!========================================== Important functions ( 2 ) ==============================================
    const sendData = (e) => {
        e.preventDefault()

        let i = 0;
        const responsedArrayedFiles = []
            
        function myLoop() {
                // console.log(filesLength)
                
                setTimeout( async () => {
                console.log("THE FILE IT_SELF => ", filesArray[i]);
                const form = new FormData();

                if (filesArray[i] && typeChecker(filesArray[i].type, ['image', 'video'])) {
                    i++;
                    myLoop();
                    return SetAlert('error', "Only Documantal files are allowed !", 2000)
                }
                
                form.append('courseFile', filesArray[i])
                    
                const res = await uploadMaterialfiles(form)
                console.log("THE RETURNED RESULT => ", res)

                    if (res && res.file !== undefined) {
                        responsedArrayedFiles.push(res.file)
                    }
                
                i++;
                //* keep sending files one after another
                if (i < filesArray.length && res) { //  && res.status === 200 || res.status === 304
                    myLoop();
                }
                //* If all files are done uploading then run the next step
                if (i === filesArray.length && res) {
                    console.log('next step')

                    const newObj = {
                        courseFile: responsedArrayedFiles,
                        courseFileTitle: value
                    }
                    console.log(newObj)

                    submitCourseMaterial(id, newObj)

                    setvalue('')
                }
            }, 1000)

        }
        
        myLoop();
    }


  //**************************************** */ Main Component return statement **************************************************
  //**************************************** */ Main Component return statement **************************************************
  //**************************************** */ Main Component return statement **************************************************
  return (
    <div>
      <div className="card mb-4">
        <div className="card-header">Course Material </div>
            <div className="card-body">
                <input type="text" name="courseFileTitle" className="form-control" id="inputZip" placeholder="Course material file title" value={value} onChange={e => setvalue(e.target.value)}
                    />
                <br/>

                <blockquote className="blockquote">
                    <footer style={{backgroundColor: 'white'}} className="blockquote-footer">Upload file ( .pdf, .docx, .doc )</footer>
                </blockquote>

                <DropZone 
                    Multi 
                    innerText='Drop All Material Files Here' 
                    acceptableFiles=".pdf, .docx, .doc" 
                    getFiles={files => inputtedFile(files)}
                />

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

export default connect(mapStateToProps, { uploadMaterialfiles, submitCourseMaterial, SetAlert })(AddMaterials);
