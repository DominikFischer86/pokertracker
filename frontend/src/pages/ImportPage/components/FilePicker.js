import React from "react"
import propTypes from "prop-types"

const FilePicker = ({pickFile}) => {

    return (
        <div className="border rounded mt-2 p-2">                   
            <h3>File Picker</h3>
            <input accept="text/plain" type="file" onChange={pickFile} />     
        </div>
    )
}

FilePicker.propTypes = {
    pickFile: propTypes.func
}

export default FilePicker