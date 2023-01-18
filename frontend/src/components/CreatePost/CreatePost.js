import React, { useState } from 'react'
import { useSelector } from 'react-redux'

function CreatePost() {


    const [body, setBody] = useState("")
    

    const handleSubmit = (e) => {
        e.preventDefault()
    }
  return (
    <div>
    
        <form onSubmit={handleSubmit}>
            <input
            value= {body}
            placeholder="Body"
            onChange={(e) => setBody(e.target.value)} />

        </form>
    </div>
  )
}

export default CreatePost