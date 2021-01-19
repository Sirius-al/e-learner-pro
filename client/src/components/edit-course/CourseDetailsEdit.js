import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';

import {  SetAlert, updateCourse, getCourse } from '../../Actions/actions'
import history from '../../history';


import Select from 'react-select';
// import CreatableSelect from 'react-select/creatable';




const CourseDetailsEdit = ({ updateCourse, getCourse, course }) => {

    const { id } = useParams()
    const [formData, setformData] = useState({
        title: '', 
        teacher: '', 
        description: '', 
        discountPerc: '', 
        requirements: '', 
        duration: '', 
        coverImage: '', 
        level: '', 
        price: '', 
    })

    useEffect(() => {
        getCourse(id)

        setformData({
            title: !course || !course.title ? '' : course.title,
            teacher: !course || !course.teacher ? '' : course.teacher,
            description: !course || !course.description ? '' : course.description,
            discountPerc: !course || !course.discountPerc ? '' : course.discountPerc,
            requirements: !course || !course.requirements ? '' : course.requirements,
            duration: !course || !course.duration ? '' : course.duration,
            // coverImage: !course || !course.coverImage ? '' : course.coverImage,
            level: !course || !course.level ? '' : course.level,
            price: !course || !course.price ? '' : course.price
        })
    }, [getCourse, updateCourse])

    const { title, teacher, description, discountPerc, requirements, duration, level, price } = formData;




    //! ======================================= Important functions


    const onFormSubmit = async (e) => {
        e.preventDefault()

        const res = await updateCourse(formData, id)

        if (res) {
            history.goBack()
        }
    }

    const onFieldChange = (e) => {
        return setformData({ ...formData, [e.target.name]: e.target.value })
    }

    const handleChange2 = (newValue, actionMeta) => {
        setformData({ ...formData, level: newValue.value })
      };

    const onRequirementValue = (e) => {
        const arrayed = e.target.value.split(', ')
        // console.log(arrayed)
        return setformData({ ...formData, [e.target.name]: arrayed })
    }

  
    
    //? ====================================== Default VALUES
      const LevelOptions = [
        { value: 'Beginners', label: 'Beginners' },
        { value: 'Intermediate', label: 'Intermediate' },
        { value: 'Advanced', label: 'Advanced' }
      ]



    return (

        <form onSubmit={onFormSubmit}>
        
            <h1 className="text-center"><strong>Update Course</strong></h1>
            <hr/>
            <br/>
            
        
          <div className="form-group">
            <label htmlFor="inputEmail4">Course Title</label>
            <input type="text" className="form-control" id="inputEmail4" placeholder="Put your course's Title" name='title' value={title} onChange={e=> onFieldChange(e)} />
          </div>
        <div className="form-row">
          <div className="form-group col-md-3">
            <label htmlFor="inputAddress">Teacher</label>
            <input type="text" className="form-control" name='teacher'  id="inputAddress" placeholder="Ex: Nafiz Al din" value={teacher} onChange={e=> onFieldChange(e)} />
          </div>

        </div>
        <div className="form-row">
          <div className="form-group col-md-2">
            <label htmlFor="inputState">course Price</label>
            <input type="number" name="price"  className="form-control" id="inputState" placeholder="course's Price" value={price} onChange={e=> onFieldChange(e)} />
          </div>
          <div className="form-group col-md-2">
            <label htmlFor="inputZip">course duration</label>
            <input type="text" name="duration"  className="form-control" id="inputZip" placeholder="3 hrs - 45 mins" value={duration} onChange={e=> onFieldChange(e)} />
          </div>

          <div className="form-group col-md-5">
            <label htmlFor="level">Level of expertise</label>
            <Select id="level"
              placeholder={level &&  level !== '' ? `DEFAULT = ${level}` : 'Level of Expertise'}
              options={LevelOptions}
              defaultInputValue={''}
              onChange={handleChange2}
              onChange={e=> console.log()}
            />
          </div>
        </div>
        <div className="form-group">
            <label htmlFor="Descriptioninput">Course Description</label>
            <textarea type="text" className="form-control" name='description'  row='10' id="Descriptioninput" placeholder="Ex: Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur" value={description} onChange={e=> onFieldChange(e)} />
         </div>
        <div className="form-group">
            <label htmlFor="Descriptioninput">Course Requirements</label>
            <textarea type="text" className="form-control" name='requirements'  row='3' id="Descriptioninput" placeholder="Put course Requirements seperated by commas," value={requirements && requirements.join(', ')} onChange={e=> onRequirementValue(e)} />
         </div>
        <div className="form-row">
          <div className="form-group col-md-4">
            <label htmlFor="inputZip">Course Discount</label>
            <input type="number" name='discountPerc' className="form-control" id="inputZip" placeholder="will be calculated in percentage" value={discountPerc} onChange={e=> onFieldChange(e)}/>
          </div>
        </div>

        <div className="form-row">
            <button type="submit" className="btn btn-primary mb-4 text-center"> Update </button>
        </div>
      </form>
    )
}

const mapStateToProps = (state) => ({
    course: state.datas.course
})

export default connect(mapStateToProps, { updateCourse, getCourse, SetAlert } )(CourseDetailsEdit)
