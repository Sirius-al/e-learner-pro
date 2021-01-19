import React, { Fragment, useState } from "react";
import { connect } from 'react-redux'

import Button from '@material-ui/core/Button';

import { uploadlessonsVideos, submitCourseLessons, SetAlert } from '../../../Actions/actions';


const Addlessons = ({ id, uploadlessonsVideos, progress, lessonFiles, submitCourseLessons, SetAlert }) => {

    const [filesArray, setfilesArray] = useState([])
    const [lessonName, setlessonName] = useState('')

    



    const upload_Lesson = (e) => {

        setfilesArray([...filesArray, ...e.target.files])

    }

    const sendData = () => {

        let i = 0;
        const responsedArrayedFiles = []
            
        function myLoop() {
                // console.log(filesLength)
                
                setTimeout( async () => {
                console.log("THE FILE IT_SELF => ", filesArray[i]);
                const form = new FormData();

                if (filesArray[i] && !filesArray[i].type.includes('video/')) {
                    i++;
                    myLoop();
                    return SetAlert('error', "Only video files are allowed !", 2000)
                }
                
                form.append('courseFile', filesArray[i])
                    
                const res = await uploadlessonsVideos(form)
                console.log("THE RETURNED RESULT => ", res)
                responsedArrayedFiles.push(res.file)
                
                i++;
                //* keep sending files one after another
                if (i < filesArray.length && res) { //  && res.status === 200 || res.status === 304
                    myLoop();
                }
                //* If all files are done uploading then run the next step
                if (i === filesArray.length && res) {
                    console.log('next step')

                    const newObj = {
                        lessonFile: responsedArrayedFiles,
                        lessonTitle: lessonName
                    }
                    console.log(newObj)

                    submitCourseLessons(id, newObj)
                    
                }
            }, 1000)

        }
        
        myLoop();
    }


  return (
    <div>
      <div className="card mb-4">
        <div className="card-header">Course Lesson </div>
        <div className="card-body">
            <input type="text" name="courseFileTitle" className="form-control" id="inputZip" placeholder="Course lesson file title" onChange={e => setlessonName(e.target.value)} />
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
                        <footer style={{backgroundColor: 'white'}} className="blockquote-footer">If You are uploading multiple files -- <cite title="Source Title"> don't bother with the progress bar, </cite> <strong> An alert will be shown for each file getting successfully uploaded to S3 Bucket </strong> </footer>
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

export default connect(mapStateToProps, { uploadlessonsVideos, submitCourseLessons, SetAlert })(Addlessons);
