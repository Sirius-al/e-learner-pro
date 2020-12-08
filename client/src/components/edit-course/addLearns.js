import React, { useState, useEffect } from "react";
import { connect } from 'react-redux'

import { submitCourseLearn, getCourse } from '../../Actions/actions'
import ShowLearnsCards from "./ShowLearnsCards";

import { useParams } from "react-router-dom";
import Button from '@material-ui/core/Button';

const AddLearns = ({ submitCourseLearn, getCourse, learns }) => {

    const { id } = useParams()

    useEffect(() => {
        getCourse(id)
    }, [])

    const [value, setvalue] = useState({learnTitle: '', learnDescription: ''})
    
    const inputtedData = e => {
        setvalue({...value, [e.target.name]: e.target.value})
    }
    
    const sendData = () => {
        // console.log(value)
        submitCourseLearn(id, [value])
        console.log(id, [value])
        setvalue({learnTitle: '', learnDescription: ''})
    }
   
  return (
    <div>
      <div className="card mb-4">
        <div className="card-header">Course Learing's Section </div>
        <div className="card-body">
            <input type="text" name="learnTitle" className="form-control" id="inputZip" placeholder="(Title) Ex: Journey of JavaScript" value={value.question} onChange={e => inputtedData(e)}
            />
            <br/>
            <textarea type="text" name="learnDescription" className="form-control" row={3} id="inputZip" placeholder="(Description) Ex: In September 1995, a Netscape programmer named Brandan Eich developed a new scripting language in just 10 days. It was originally named Mocha, but quickly became known as LiveScript and, later, JavaScript." value={value.answer} onChange={e => inputtedData(e)}
            />
            
        </div>
            <Button variant="contained" onClick={() => sendData()} color="secondary" component="span">
                submit course Learn
            </Button>
      </div>
        <br/><br/><br/>

        {learns && learns.map((learn, i) => {
            return <ShowLearnsCards key={i} learn={learn} />

        })}
    </div>
  );
};

const mapStateToProps = (state) => ({
    learns: state.datas.course.learns
})

export default connect(mapStateToProps, { submitCourseLearn, getCourse })(AddLearns);
