import React from "react"
import propTypes from "prop-types"

export const HandFilePicker = ({pickMultiFile}) => {
    return (
        <div className="border rounded mt-2 p-2">                   
            <h3>Multi Filepicker</h3>
            <input accept="text/plain" type="file" multiple onChange={pickMultiFile} />
        </div>
    )
}
HandFilePicker.propTypes = {
    pickMultiFile: propTypes.func
}

