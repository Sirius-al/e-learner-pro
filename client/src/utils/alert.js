import React from 'react';
import Alert from '@material-ui/lab/Alert';
import IconButton from '@material-ui/core/IconButton';
import Collapse from '@material-ui/core/Collapse';
import CloseIcon from '@material-ui/icons/Close';

import { connect } from 'react-redux';

const AlertComponent = ({ alerts }) =>  alerts !== null && alerts.length > 0 && alerts.map(alert => {

    return ( <div key={alert.id} className='mb-2 fixed-top'>
            <Collapse in={true}>
            <Alert
                variant="filled" severity={!alert.type ? 'info' : alert.type} // error, warning, info, success 
                >
                {alert.message}
            </Alert>
            </Collapse>
        </div>)
        
      })


const mapStateToProps = (state) => ({
    alerts: state.datas.alert
})

export default connect(mapStateToProps, {  })(AlertComponent)
