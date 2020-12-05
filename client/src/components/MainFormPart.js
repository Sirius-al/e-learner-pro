import React, { Fragment, useState } from 'react'

import { connect } from 'react-redux';

import Button from '@material-ui/core/Button';
import Select from 'react-select';
import CreatableSelect from 'react-select/creatable';
import Materials from '../components/Materials';

import { submitCourseBasics, uploadfile } from '../Actions/actions'
import { Link } from 'react-router-dom';


const MainFormPart = ({ submitCourseBasics, course, uploadfile, files }) => {

  const [title, settitle] = useState('')
  const [catagory, setcatagory] = useState('')
  const [description, setdescription] = useState('')
  const [duration, setduration] = useState('')
  const [teacher, setteacher] = useState('')
  const [coverImage, setcoverImage] = useState('')
  const [level, setlevel] = useState('')
  const [requirements, setrequirements] = useState('')
  const [price, setprice] = useState(0)
  const [discountPerc, setdiscountPerc] = useState(0)

  // const [ inputtedData, setinputtedData] = useState({
  //   title: title,
  //   catagory: catagory,
  //   description: description,
  //   duration: duration,
  //   teacher: teacher,
  //   coverImage: coverImage,
  //   level: level,
  //   requirements: requirements,
  //   price: price,
  //   discountPerc: discountPerc
  // })
  
  
  
  const [ check, setCheck] = useState(false)
  
  const submitBasicForm = (e) => {
    e.preventDefault()
    const data = {
      title: title,
      catagory: catagory,
      description: description,
      duration: duration,
      teacher: teacher,
      coverImage: files.filepath || coverImage,
      level: level,
      requirements: requirements,
      price: price,
      discountPerc: discountPerc
    }
    submitCourseBasics(data)
    // console.log(data)
  }
  
  
  // console.log(courseMaterial )

  const SelectOptions = [
    { value: 'HTML', label: 'HTML' },
    { value: 'HTML 5', label: 'HTML 5' },
    { value: 'CSS 3', label: 'CSS 3' },
    { value: 'CSS', label: 'CSS' },
    { value: 'JavaScript', label: 'JavaScript' },
    { value: 'PHP', label: 'PHP' },
    { value: '.net', label: '.net' },
    { value: 'Node JS', label: 'Node JS' },
    { value: 'React Js', label: 'React Js' },
    { value: 'Laravel', label: 'Laravel' },
  ]
  const LevelOptions = [
    { value: 'Beginners', label: 'Beginners' },
    { value: 'Intermediate', label: 'Intermediate' },
    { value: 'Advanced', label: 'Advanced' }
  ]


  const handleChange = (newValue, actionMeta) => {
    const value = newValue?.map(value => value.value).toString();
    setcatagory(value)
  };
  const handleChange2 = (newValue, actionMeta) => {
    setlevel(newValue.value);
  };

  const onCoverImageUpload = (e) => {
    setcoverImage(e.target.files[0].name)

    const formdata = new FormData()
    formdata.append('file', e.target.files[0])
    uploadfile(formdata)
  };

    return (
        <Fragment>
            <form>
          <div className="form-group">
            <label htmlFor="inputEmail4">Course Title</label>
            <input type="text" className="form-control" id="inputEmail4" placeholder="Put your course's Title" name='title' onChange={e => settitle(e.target.value)} />
          </div>
        <div className="form-row">
          <div className="form-group col-md-3">
            <label htmlFor="inputAddress">Teacher</label>
            <input type="text" className="form-control" name='teacher'  id="inputAddress" placeholder="Ex: Nafiz Al din" onChange={e => setteacher(e.target.value)} />
          </div>
          <div className="form-group col-md-3" style={{marginTop: '30px', textAlign: 'center'}}>
            <input
                accept="image/*"
                id="contained-button-file"
                type="file"
                style={{display: 'none'}}
                name="coverImage"
                onChange={e => onCoverImageUpload(e)}
              />
              <label htmlFor="contained-button-file">
                  <Button variant="contained" color="primary" component="span">
                      Upload Cover Image
                  </Button>
              </label>
          </div>
          <div className="form-group col-md-5" style={{marginTop: '30px'}}>
            <p> <strong>{coverImage === '' ? "Select a Cover Image For your Course" : coverImage}</strong> </p>
          </div>
        </div>
        <div className="form-row">
          <div className="form-group col-md-5">
            <label htmlFor="inputCity">Course Catagory</label>
            <CreatableSelect id="inputCity"
              isClearable isMulti
              placeholder="Course Catagories"
              onChange={handleChange}
              options={SelectOptions}
            />
          </div>
          <div className="form-group col-md-2">
            <label htmlFor="inputState">course Price</label>
            <input type="number" name="price"  className="form-control" id="inputState" placeholder="course's Price" onChange={e => setprice(e.target.value)} />
          </div>
          <div className="form-group col-md-2">
            <label htmlFor="inputZip">course duration</label>
            <input type="text" name="duration"  className="form-control" id="inputZip" placeholder="3 hrs - 45 mins" onChange={e => setduration(e.target.value)} />
          </div>

          <div className="form-group col-md-3">
            <label htmlFor="level">Level of expertise</label>
            <Select id="level"
              // defaultValue={colourOptions[2]}
              placeholder="Course's Catagory"
              options={LevelOptions}
              onChange={handleChange2}
            />
          </div>
        </div>
        <div className="form-group">
            <label htmlFor="Descriptioninput">Course Description</label>
            <textarea type="text" className="form-control" name='description'  row='10' id="Descriptioninput" placeholder="Ex: Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur" onChange={e => setdescription(e.target.value)} />
         </div>
        <div className="form-group">
            <label htmlFor="Descriptioninput">Course Requirements</label>
            <textarea type="text" className="form-control" name='description'  row='3' id="Descriptioninput" placeholder="Put course Requirements seperated by commas," onChange={e => setrequirements(e.target.value)} />
         </div>
        <div className="form-row">
          <div className="form-group col-md-4">
            <label htmlFor="inputZip">Course Discount</label>
            <input type="number" name='discountPerc' className="form-control" id="inputZip" placeholder="will be calculated in percentage" onChange={e => setdiscountPerc(e.target.value)} />
          </div>
        </div>
        <div className="form-row">
          <div className="form-group col-md-12">

          <button className="btn btn-primary mb-4" onClick={e=> submitBasicForm(e)}>submit this form ^</button>
          </div>
        </div>
      </form>
        </Fragment>
    )
}

const mapStateToProps = (state) => ({
    course: state.datas.course,
    files: state.datas.data
  })

export default connect(mapStateToProps, { submitCourseBasics, uploadfile })(MainFormPart)
