import React, { Fragment, useState } from "react";
import { connect } from 'react-redux'

import { Tab, Tabs } from '@material-ui/core';

import { uploadfile, submitCourseLessons } from '../Actions/actions'

import Button from '@material-ui/core/Button';


const CourseLesson = ({ id, uploadfile, file, submitCourseLessons }) => {

    const [value, setvalue] = useState({lessonTitle: '', lessonFile: {}});
    const [tab, settab] = useState(0)

      const handleTabChange = (e, val) => {
        settab(val)
    }
    const uploadLesson = (e) => {
        const formdata = new FormData()
        formdata.append('file', e.target.files[0])
        uploadfile(formdata)
         
    }
    const sendData = () => {
        setvalue({...value, lessonFile: file})
        submitCourseLessons(id, [{lessonTitle: value.lessonTitle, lessonFile: file}])
        // console.log([{lessonTitle: value.lessonTitle, lessonFile: file}])
        setvalue({lessonTitle: '', lessonFile: {}})
    }


   
    // function LessonPanel({value, index}) {

    //     const panel = () => {
    //         return (
    //             <Fragment>
    //                 <input
    //                     accept="image/*"
    //                     id="contained-button-file"
    //                     type="file"
    //                     style={{display: 'none'}}
    //                     name="courseFileName"
    //                     onChange={e => uploadLesson(e)}
    //                 />
    //                 <label htmlFor="contained-button-file">
    //                     <Button variant="contained" color="primary" component="span">
    //                         Upload Lesson file
    //                     </Button>
    //                 </label>
    //                 <p style={{display: 'inline-block', marginLeft: "10px"}}> <strong>{"lesson file"}</strong> </p>
    //             </Fragment>
    //         )
    //     }

    //     return (
    //         <div>
    //             {value===index && panel()}
    //         </div>
    //     )
    // }
    // function QuizPanel({value, index}) {

    //     const panel = () => {
    //         return (
    //             <Fragment>
    //                 <input
    //                     accept="image/*"
    //                     id="contained-button-file"
    //                     type="file"
    //                     style={{display: 'none'}}
    //                     name="courseFileName"
    //                     multiple
    //                 />
    //                 <label htmlFor="contained-button-file">
    //                     <Button variant="contained" color="primary" component="span">
    //                         Upload Quiz file
    //                     </Button>
    //                 </label>
    //                 <p style={{display: 'inline-block', marginLeft: "10px"}}> <strong>{'ok'}</strong> </p>
    //             </Fragment>
    //         )
    //     } 

    //     return (
    //         <div>
    //             {value===index && panel()}
    //         </div>
    //     )
    // }

  return (
    <div>
      <div className="card mb-4">
        <div className="card-header">Course Lesson </div>
        <div className="card-body">
            <input type="text" name="courseFileTitle" className="form-control" id="inputZip" placeholder="Course lesson file title" value={value.lessonTitle} onChange={e => setvalue({...value, lessonTitle: e.target.value})}
                 />
            <br/>
            {/* <Tabs value={tab} onChange={handleTabChange} className="mb-3">
                <Tab label="lesson"/>
                <Tab label="Quiz"/>
            </Tabs>
            <LessonPanel value={tab} index={0}/>
            <QuizPanel value={tab} index={1}/> */}
            <Fragment>
                    <input
                        accept="image/*"
                        id="contained-button-file"
                        type="file"
                        style={{display: 'none'}}
                        name="courseFileName"
                        onChange={e => uploadLesson(e)}
                    />
                    <label htmlFor="contained-button-file">
                        <Button variant="contained" color="primary" component="span">
                            Upload Lesson file
                        </Button>
                    </label>
                    <p style={{display: 'inline-block', marginLeft: "10px"}}> <strong>{file.filename ? file.filename : "lesson file"}</strong> </p>
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
    file: state.datas.data
})

export default connect(mapStateToProps, { uploadfile, submitCourseLessons })(CourseLesson);
