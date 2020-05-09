import React from 'react'
import SimpleForm from 'components/SimpleForm'
import DesignedForm from 'components/DesignedForm'
import MaterialUIForm from 'components/MaterialUIForm'

function App() {
  return (
    <div>
      <h1>SimpleForm </h1>
      <SimpleForm />
      <h1>DesignedForm </h1>
      <DesignedForm />
      <h1>MaterialUIForm</h1>
      <MaterialUIForm />
    </div>
  )
}

export default App
