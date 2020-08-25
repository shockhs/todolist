import React from 'react'
import spinner from '../../assets/images/spinner.svg'

export default ({ className }) => (
    <div className="spinnerContainer">
        <img className={className} src={spinner} alt="prelaoder" />
    </div>
)
