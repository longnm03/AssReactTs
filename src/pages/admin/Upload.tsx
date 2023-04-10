import React from 'react';
import { upload } from '../../api/upload';

const Uploads= () => {
  const form = document.querySelector("#add")
  const img = document.querySelector("#file")
  form?.addEventListener("submit", async (e) => {
    e.preventDefault()

      const images = await upload(img)
      console.log(images);
    
  })
  return (
    <div>
      <form id='add'>
      <input type='file' id='file' />
        <button>Submit</button>
      </form>
    </div>
  )
}

export default Uploads;