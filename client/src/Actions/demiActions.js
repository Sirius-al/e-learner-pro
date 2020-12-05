export const getAllProfiles = () => async dispatch => {
    dispatch({ type: CLEAR_PROFILE })
    try {
      const res = await backendCall.get('/api/profile/')
      // console.log(res)
  
      dispatch({
        type: GET_All_PROFILES,
        payload: res
      })
    } catch (err) {
        const error = err.response
        // console.error(error)
        dispatch({
          type: PROFILE_ERROR,
          payload: { msg: error.data.message, status: error.status }
        })
        
    }
  }