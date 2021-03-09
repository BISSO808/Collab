import React from 'react';
import { Field, reduxForm } from 'redux-form'

let AddProject = (props)=>{
    const { handleSubmit } = props
    return <form onSubmit={handleSubmit}>{/* form body*/}</form>
}
AddProject = reduxForm({
    // a unique name for the form
    form: 'contact'
  })(AddProject)
  
export default AddProject;