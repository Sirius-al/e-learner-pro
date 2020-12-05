import React, { useEffect, useState } from "react";
import { connect } from 'react-redux'

import { submitCoursefaq } from '../Actions/actions'

import Button from '@material-ui/core/Button';

const CourseFaq = ({ id, submitCoursefaq }) => {

    const [value, setvalue] = useState({question: '', answer: ''})
    
    const inputtedData = e => {
        setvalue({...value, [e.target.name]: e.target.value})
    }
    
    const sendData = () => {
        console.log(value)
        submitCoursefaq(id, [value])
        setvalue({question: '', answer: ''})
    }
   
  return (
    <div>
      <div className="card mb-4">
        <div className="card-header">Course FAQ </div>
        <div className="card-body">
            <input type="text" name="question" className="form-control" id="inputZip" placeholder="Question " value={value.question} onChange={e => inputtedData(e)}
            />
            <br/>
            <textarea type="text" name="answer" className="form-control" row={3} id="inputZip" placeholder="Answer" value={value.answer} onChange={e => inputtedData(e)}
            />
            
        </div>
            <Button variant="contained" onClick={() => sendData()} color="secondary" component="span">
                submit course Faq
            </Button>
      </div>
    </div>
  );
};

export default connect(null, { submitCoursefaq })(CourseFaq);
