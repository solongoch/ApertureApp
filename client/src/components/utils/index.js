import cloudniary from '../config/Keys';
import axios from 'axios'

const uploadImage = (file) => {
  //upload file in cloudniary
  const formData = new FormData();
  formData.append('file', file);
  formData.append('upload_preset', cloudniary.UPLOAD_PRESET);
  formData.append('cloud_name', cloudniary.CLOUD_NAME);


  return axios.post(cloudniary.URL, formData,
    {
      headers: { 'Content-Type': 'multipart/form-data' }
    }
  ).then(res => res.data)
    .catch(err => {
      console.log(err.message);
    });
}


export default uploadImage;