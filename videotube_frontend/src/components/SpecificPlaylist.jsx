import React from 'react'
import { useParams } from 'react-router-dom'

const SpecificPlaylist = () => {
    const playlist=useParams()
  return (
    <div>
        this is the specific playlist route
    </div>
  )
}

export default SpecificPlaylist
