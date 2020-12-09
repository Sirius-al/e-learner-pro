import React, { useEffect, useState } from "react";
import { connect } from 'react-redux'
import { useParams } from 'react-router-dom';

import { submitCoursefaq, getCourse } from '../../Actions/actions'
import Faq from '../course/Faq';

import Button from '@material-ui/core/Button';




const AddFaq = ({ getCourse, submitCoursefaq, course: { faq } }) => {

    const { id } = useParams()

    useEffect(() => {
      getCourse(id)
    }, [])


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
      <br/>
      {faq && faq.length > 0 ? faq.map(faq => <Faq faq={faq} />) : "No Faq(s) found, Create one ^"}
      
    </div>
  );
};

const mapStateToProps = (state) => ({
  course: state.datas.course
})

export default connect(mapStateToProps, { submitCoursefaq, getCourse })(AddFaq);
