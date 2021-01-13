import React, { Fragment, useState } from "react";
import { connect } from 'react-redux'

import Button from '@material-ui/core/Button';

import { uploadlessonsVideos, submitCourseLessons } from '../../../Actions/actions';


const Addlessons = ({ id, uploadlessonsVideos, progress, lessonFiles, submitCourseLessons }) => {


    let newMap = new Map()

    const upload_Lesson = (e) => {

        function fnc(f) {
            const formdata = new FormData()
                formdata.append('file', f)

                // console.log(file)
                //! const objectURL = URL.createObjectURL(file)
                // console.log(objectURL)
                return uploadlessonsVideos(formdata)
        }

        [...e.target.files].map((file, i) => {


            if (progress === 0) {
                fnc(file)
            }
            // console.log(file)
        })

    }

    if (lessonFiles.length > 0) {

        newMap.set('lessonFile', lessonFiles)
        /* lessonFiles.map((file, i) => {
            newMap.get('files').push()
        }); */
    }

    const sendData = () => {
        const newObj = Object.fromEntries(newMap)
        // console.log(newObj)
        submitCourseLessons(id, [newObj])

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
                        accept=".mp4, .wav" // video/*
                        id="lesson-file-upload"
                        type="file"
                        style={{display: 'none'}}
                        name="courseFileName"
                        multiple
                        disabled={progress > 0}
                        onChange={e => upload_Lesson(e)}
                    />
                    <blockquote className="blockquote">
                        <footer style={{backgroundColor: 'white'}} className="blockquote-footer">If You have Multiple videos to upload -- <cite title="Source Title"> Upload them one after another, </cite> click (submit course lesson) when you are done</footer>
                    </blockquote>

                    <label htmlFor="lesson-file-upload" >
                        <Button disabled={progress > 0} variant="contained" color="primary" component="span">
                            Upload Lesson file
                        </Button>
                    </label>
                    <p style={{display: 'block', marginTop: "10px"}}> <strong style={{overflowX: 'clip'}} >{lessonFiles && lessonFiles.length > 0 ? `Uploaded Files ==> ${lessonFiles.map(file => file.filename).join(', ')}` : "lesson file"}</strong> </p>
                </Fragment>

                {progress && progress > 0 ? (<Fragment>
                    <p className="text-center font-weight-bold">Uploading Video...</p>
                    <div className="progress">
                        <div className="progress-bar" role="progressbar" style={{width: progress+'%'}}  aria-valuemax={100}>{progress}%</div>
                    </div>
                </Fragment>) : ''}


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

export default connect(mapStateToProps, { uploadlessonsVideos, submitCourseLessons })(Addlessons);
