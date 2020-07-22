import cloudniary from '../config/Keys';

async function uploadImage(file){
  //upload file in cloudniary
  const formData = new FormData();
  formData.append('file', file);
  formData.append('upload_preset', cloudniary.UPLOAD_PRESET);
  formData.append('cloud_name', cloudniary.CLOUD_NAME);

  const opts = {
    method: 'POST',
    body: formData,
  };
  // let secure_url = '';
  const response= await fetch(cloudniary.URL, opts);

  const result =await response.json();
  const  secure_url= result.secure_url;

    return secure_url;
    // .then(response => {
    //   if (!response.ok) {
    //     throw new Error('Network response was not ok');
    //   }
    //   return response.json();
    // })
    // .then(res => {
    //   // const result = await resolveAfter2Seconds();
    //   secure_url = res.secure_url;
    //   return secure_url;
    // })
    // .catch(err => {
    //   console.log(err.message);
    // });
}
export default uploadImage;
