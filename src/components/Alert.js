import React from 'react'

const Alert = (props) => {
      const capitalize = (word)=>{
        const lower = word.toLowerCase();
        return lower.CharAt(0).toUpperCase() + lower.slice(1);
      }
    return (
         <div style={{height: "50px"}}>
            {props.alert && <div className={'alert alert-${props.alert.type} alert-dismissible fade show'} 
            role='alert'>
              <strong>{capitalize(props.alert.type)}</strong>: {props.alert.msg} 
            </div>}
         </div>
         
        // <div>
        //     <div className="alert alert-primary" role="alert">
        //         {props.message}
        //     </div> 
        // </div>
    )
}

export default Alert
