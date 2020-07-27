import cloudniary from '../config/Keys';
const uploadImage = (file) => {
  //upload file in cloudniary
  const formData = new FormData();
  formData.append('file', file);
  formData.append('upload_preset', cloudniary.UPLOAD_PRESET);
  formData.append('cloud_name', cloudniary.CLOUD_NAME);

  const opts = {
    method: 'POST',
    body: formData
  }

  return fetch(cloudniary.URL, opts)
    .then(res => res.json())
    .catch(err => {
      console.log(err.message);
    });
}
export default uploadImage;
