import React, { Fragment, useState } from "react";
import { connect } from 'react-redux'

import Button from '@material-ui/core/Button';

import { uploadlessonsVideos, submitCourseLessons } from '../Actions/actions';


const CourseLesson = ({ id, uploadlessonsVideos, filed, progress, lessonFiles, submitCourseLessons }) => {


    let newMap = new Map()

    const upload_Lesson = (e) => {
        
        setTimeout(() => [...e.target.files].map((file, i) => {

            if (progress === 0) {
                const formdata = new FormData()
                formdata.append('file', file)
    
                // console.log(file)
                uploadlessonsVideos(formdata)
            }
        }), 1000)

    }

    if (lessonFiles.length > 0) {

        newMap.set('lessonFile', lessonFiles)
        /* lessonFiles.map((file, i) => {
            newMap.get('files').push()
        }); */
    }

    const sendData = () => {
        const newObj = Object.fromEntries(newMap)
        console.log(newObj)
        // submitCourseLessons(id, [newObj])
    }


  return (
    <div>
      <div className="card mb-4">
        <div className="card-header">Course Lesson </div>
        <div className="card-body">
            <input type="text" name="courseFileTitle" className="form-control" id="inputZip" placeholder="Course lesson file title" onChange={e => newMap.set("lessonTitle", e.target.value || '')} />
            <br/>
            <Fragment>
                    <input
                        accept="image/*" // video/*
                        id="contained-button-file"
                        type="file"
                        style={{display: 'none'}}
                        name="courseFileName"
                        multiple
                        onChange={e => upload_Lesson(e)}
                    />
                    <label htmlFor="contained-button-file">
                        <Button variant="contained" color="primary" component="span">
                            Upload Lesson file
                        </Button>
                    </label>
                    <p style={{display: 'inline-block', marginLeft: "10px"}}> <strong>{filed.filename ? filed.filename : "lesson file"}</strong> </p>
                </Fragment>
        </div>
            <Button variant="contained" onClick={() => sendData()} color="secondary" component="span">
                submit course lesson
            </Button>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
    filed: state.datas.data,
    progress: state.datas.videoUploadingProgress,
    lessonFiles: state.datas.lessonFiles
})

export default connect(mapStateToProps, { uploadlessonsVideos, submitCourseLessons })(CourseLesson);
