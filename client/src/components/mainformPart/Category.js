import React, { useRef, useState, Fragment } from 'react'
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import StepContent from '@material-ui/core/StepContent';
import Button from '@material-ui/core/Button';
import CreatableSelect from 'react-select/creatable';

import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';

import { categoryOptions, subCategoryOptions, tagsOptions } from '../../utils/category_listing';

import Select from 'react-select';

const Category = ({ sendProps }) => {

    //? ============================== States ============================
    //? ============================== States ============================

    const prevButton = useRef()

    const [activeStep, setactiveStep] = useState(0)

    const [Category, setCategory] = useState('')
    const [SubCategory, setSubCategory] = useState('')
    const [Tags, setTags] = useState([])
    const [HideButton, setHideButton] = useState(false)
    const [Disabled, setDisabled] = useState(false)
    const [canGoPrev, setcanGoPrev] = useState(false)


    //? ============================== Default variables ============================
    //? ============================== Default variables ============================
    
    const allowedNumOfTags = 5


    //* ============================== Helper Functions ============================
    //* ============================== Helper Functions ============================
    //* ============================== Helper Functions ============================
    
    function titles () {
        return ["First", "Second", "Third", 'Done']
    }
    
    //* ============================== For Component Functions ============================
    //* ============================== For Component Functions ============================
    //* ============================== For Component Functions ============================
    
    
    const nextStep = () => {
        if (activeStep + 1 < 4) {
            setactiveStep((currentStep) => currentStep + 1)
        }
    }
    const prevStep = () => {
        if (activeStep - 1 !== -1) {
            setactiveStep((currentStep) => currentStep - 1)
        }
    }

    const handleChange = (newValue, actionMeta) => {
        const value = newValue.value;
        setCategory(value)
        nextStep()
        setcanGoPrev(true)
    };
    const handleChange2 = (newValue, actionMeta) => {
        const value = newValue.value;
        console.log(value)
        setSubCategory(value)
        nextStep()
    };
    const handleChange3 = (newValue, actionMeta) => {

        if (newValue === null) {
            return setTags([])
        }
        
        if (newValue.length < allowedNumOfTags + 1) {
            const value = newValue?.map(value => value.value).toString();
            setTags(value.split(','))
            // console.log(newValue)
            // nextStep()
        }
        console.log(Tags)
    };

    const stepperFinished = () => {

        let obj = {
            category: Category,
            subCategory: SubCategory,
            tags: Tags
        }
        
        nextStep()
        setHideButton(true)
        setDisabled(true)

        //Sending props to parent
        sendProps(obj)
    } 


    //* ============================== Component Level Functions ============================
    //! ============================== Component Level Functions ============================
    //* ============================== Component Level Functions ============================
    //! ============================== Component Level Functions ============================
    //* ============================== Component Level Functions ============================
    //! ============================== Component Level Functions ============================
    //* ============================== Component Level Functions ============================




    //? ============================== Default Statements ============================
    //? ============================== Default Statements ============================

    // if (activeStep === 3) {
    //     prevButton.display
    // }
    

    //! ============================== Component return Statement ============================
    //! ============================== Component return Statement ============================
    //! ============================== Component return Statement ============================
    //! ============================== Component return Statement ============================ 
    //! ============================== Component return Statement ============================
    //! ============================== Component return Statement ============================
    //! ============================== Component return Statement ============================
    return ( 
      <div>

        <Grid container spacing={1}>
            <Grid item xs={1} style={{position: 'relative'}}>

            {activeStep > 0 && HideButton === false && canGoPrev === true ? (
                <IconButton size="small" style={{position: 'absolute', top: '14vh'}} onClick={() => prevStep()}>
                    <ArrowUpwardIcon  />
                </IconButton>) : '' }
                
                
            </Grid>
            
            <Grid item xs={11}>
            <Stepper orientation="vertical" activeStep={activeStep}>

                <Step >
                <StepLabel>{Category !== '' || Category !== undefined ? (<Fragment> <h6 className='d-inline'><strong> Category :</strong></h6> {Category} </Fragment>) : "Category"}</StepLabel>
                <StepContent>
                    <Select
                    className="basic-single"
                    classNamePrefix="select"
                    placeholder='Category'
                    // defaultValue={categoryOptions[0]}
                    isClearable={false}
                    isDisabled={false}
                    isLoading={false}
                    isRtl={false}
                    isSearchable={true}
                    name="category"
                    onChange={handleChange}
                    options={categoryOptions}
                    />
                </StepContent>
                </Step>

                {activeStep > 0 && (
                <Step>
                <StepLabel>{SubCategory && SubCategory !== '' ? (<Fragment> <h6 className='d-inline'><strong> SubCategory :</strong></h6> {SubCategory} </Fragment>) : "SubCategory"}</StepLabel>
                <StepContent>
                    <Select
                    className="basic-single"
                    classNamePrefix="select"
                    placeholder='subCategory'
                    // defaultValue={categoryOptions[0]}
                    isClearable={false}
                    isDisabled={false}
                    isLoading={false}
                    isRtl={false}
                    isSearchable={true}
                    name="category"
                    onChange={handleChange2}
                    options={subCategoryOptions(Category)}
                    />
                </StepContent>
                </Step>)}

                {activeStep > 1 && (
                <Step>
                <StepLabel>{Tags && Tags !== [] ?  (<Fragment> <h6 className='d-inline'><strong> Tags :</strong></h6> {Tags.join(', ')} </Fragment>) : "Tags"}</StepLabel>
                <StepContent>
                    <h5 className="mb-3">Only {allowedNumOfTags} items Items are allowed. The Rest will be ignored</h5>
                    <CreatableSelect id="tags"
                    isMulti
                    placeholder="Course's tags"
                    onChange={handleChange3}
                    isDisabled={Disabled}
                    options={tagsOptions(SubCategory)}
                    />
                    <h6 className="mt-3">{`${allowedNumOfTags - Tags.length < 0 ? 0 : allowedNumOfTags - Tags.length} left`}</h6>
                </StepContent>
                </Step>)}
                </Stepper>

                {activeStep === 2 && HideButton === false && Tags.length === allowedNumOfTags ? (<Button
                variant="outlined"
                color="primary"
                style={{ width: "200px", display: "inline-block" }}
                onClick={() => stepperFinished()}
                >Done</Button>) : ''}
            </Grid>
        </Grid>


      </div>
    );
}

export default Category
