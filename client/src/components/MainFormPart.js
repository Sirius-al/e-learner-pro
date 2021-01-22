import React, { Fragment, useState } from 'react'
import './courseformpart.css'
import CircularProgress from '@material-ui/core/CircularProgress';
import _ from 'lodash'
import history from '../history';

import { connect } from 'react-redux';

import Button from '@material-ui/core/Button';
import Select from 'react-select';
import CreatableSelect from 'react-select/creatable';

import Category from './mainformPart/Category'

import { submitCourseBasics, uploadCoverImage, SetAlert } from '../Actions/actions'


const MainFormPart = ({ submitCourseBasics, uploadCoverImage, files, SetAlert }) => {

  // console.log(_. isEmpty(files))

  const [title, settitle] = useState('')
  const [catagory, setcatagory] = useState({})
  const [description, setdescription] = useState('')
  const [duration, setduration] = useState('')
  const [teacher, setteacher] = useState('')
  const [coverImage, setcoverImage] = useState('')
  const [coverImageData, setcoverImageData] = useState({})
  const [level, setlevel] = useState('')
  const [requirements, setrequirements] = useState('')
  const [price, setprice] = useState(0)
  const [discountPerc, setdiscountPerc] = useState(0)
  const [uploading, setuploading] = useState(false)

  


  const submition2 = (file = {}) => {
    let data
         data = {
          title: title,
          catagory: catagory,
          description: description,
          duration: duration,
          teacher: teacher,
          coverImage: file,
          level: level,
          requirements: requirements,
          price: price,
          discountPerc: discountPerc
        }
        
      submitCourseBasics(data)
      // console.log(data)
  
      setTimeout(() => {
        
        settitle(''); setcatagory({}); setdescription(''); setduration(''); setteacher(''); setcoverImage(''); setcoverImageData({}); setlevel(''); setrequirements(''); setprice(0); setdiscountPerc(0);
        
        setuploading(false)
      }, 1000)
  }



  const submitBasicForm = async (e) => {
    e.preventDefault()
    setuploading(true)


    return submition2(files)

  }

  const LevelOptions = [
    { value: 'Beginners', label: 'Beginners' },
    { value: 'Intermediate', label: 'Intermediate' },
    { value: 'Advanced', label: 'Advanced' }
  ]



  const handleChange2 = (newValue, actionMeta) => {
    setlevel(newValue.value);
  };

  const onCoverImageUpload = async (e) => {
    let imgurl;
    const file = e.target.files[0];

    [...e.target.files].map(f => setcoverImageData(f))

    var reader = new FileReader();
    var url = reader.readAsDataURL(file);

    reader.onloadend = function (e) {
      imgurl = reader.result
      setcoverImage(imgurl)
    }

    const formdata = new FormData()
    formdata.append('coverImage', file)
    await uploadCoverImage(formdata)
    
  };

    return (
        <Fragment>
          <form>
          <div className="form-group">
            <label htmlFor="inputEmail4">Course Title</label>
            <input type="text" className="form-control" id="inputEmail4" placeholder="Put your course's Title" name='title' value={title} onChange={e => settitle(e.target.value)} />
          </div>
        <div className="form-row">
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
          <div className="form-group col-md-9" style={{marginTop: '30px'}}>
            {coverImage === '' ? (<p> <strong>Select a Cover Image For your Course</strong></p>) : (
              <div className="card bg-dark text-white">
                <img src={coverImage} className="card-img" alt="..." />
                <div className="cover-Image-overlay card-img-overlay">
                  <h5 className="cover-Image-title card-title text-white text-center">{coverImageData.name}</h5>
                </div>
              </div>

            )}
            
          </div>
        </div>
        <div className="form-row">
          <div className="form-group col-md-12">
            <label htmlFor="Catagory">Course Catagory</label>
            <Category id="Catagory" sendProps={obj => setcatagory(obj)} />
          </div>
        </div>
        <div className="form-row">
          <div className="form-group col-md-3">
            <label htmlFor="inputAddress">Teacher</label>
            <input type="text" className="form-control" name='teacher'  id="inputAddress" placeholder="Ex: Nafiz Al din" value={teacher} onChange={e => setteacher(e.target.value)} />
          </div>
          <div className="form-group col-md-2">
            <label htmlFor="inputState">course Price</label>
            <input type="number" name="price"  className="form-control" id="inputState" placeholder="course's Price" value={price} onChange={e => setprice(e.target.value)} />
          </div>
          <div className="form-group col-md-4">
            <label htmlFor="inputZip">course duration</label>
            <input type="text" name="duration" value={duration}  className="form-control" id="inputZip" placeholder="3 hrs - 45 mins" onChange={e => setduration(e.target.value)} />
          </div>

          <div className="form-group col-md-3">
            <label htmlFor="level">Level of expertise</label>
            <Select id="level"
              // defaultValue={colourOptions[2]}
              placeholder="Course's Skill set requirement"
              options={LevelOptions}
              defaultInputValue={''}
              onChange={handleChange2}
            />
          </div>
        </div>
        <div className="form-group">
            <label htmlFor="Descriptioninput">Course Description</label>
            <textarea type="text" className="form-control" name='description'  row='10' id="Descriptioninput" placeholder="Ex: Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur" value={description} onChange={e => setdescription(e.target.value)} />
         </div>
        <div className="form-group">
            <label htmlFor="Descriptioninput">Course Requirements</label>
            <textarea type="text" className="form-control" name='description'  row='3' id="Descriptioninput" placeholder="Put course Requirements seperated by commas," value={requirements} onChange={e => setrequirements(e.target.value)} />
         </div>
        <div className="form-row">
          <div className="form-group col-md-4">
            <label htmlFor="inputZip">Course Discount</label>
            <input type="number" name='discountPerc' value={discountPerc} className="form-control" id="inputZip" placeholder="will be calculated in percentage" onChange={e => setdiscountPerc(e.target.value)} />
          </div>
        </div>
        <div className="form-row">
          <div className="form-group col-md-12">

          {uploading ? <Button style={{width: '200px', height: '50px'}} className="btn btn-primary mb-4" variant="contained" disabled color="secondary" startIcon={<CircularProgress />}> uploading </Button> : <button className="btn btn-primary mb-4" onClick={e=> submitBasicForm(e)}>submit this form ^</button> }
          
          
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

export default connect(mapStateToProps, { submitCourseBasics, uploadCoverImage, SetAlert })(MainFormPart)
