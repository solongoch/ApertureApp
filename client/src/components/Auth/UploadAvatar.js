import React, {useState, useEffect} from 'react';
import {Image} from 'cloudinary-react';
import '../css/editprofile.css'

export default function UploadAvatar() {
    const [fileInputState, setFileInputState] = useState('');
    const [previewSource, setPreviewSource] = useState('');
    const [selectedFile, setSelectedFile] = useState('');
    const handleFileInputChange = e => {
        const file = e.target.files[0];
        previewFile(file);
        setSelectedFile(file);
        setFileInputState(e.target.value);
    };

    const previewFile = (file) => {
     const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = () => {
            setPreviewSource(reader.result);
        };
    };

    const handleSubmitFile = (e) => {
        console.log('submitting');
        e.preventDefault();
        if(!previewSource) return;
        uploadImage(previewSource);
    };

    const uploadImage = async (base64EncodedImage) => {
        console.log(base64EncodedImage);
        try {
            await fetch('/api/upload', {
                method: 'POST',
                body: JSON.stringify({data: base64EncodedImage}),
                headers: {'Content-type': 'application/json'}
            })
        } catch (error) {
            console.error(error);
        }
    };

    const [imageIds, setImageIds] = useState();
    const loadImages = async () => {
      try {
          const res = await fetch('/api/images');
          const data = await res.json();
          console.log(data);
          setImageIds(data);
      } catch (error) {
        console.error(error)
      }
    }
    useEffect(() => {
        loadImages();
    }, [])
    return (
        <div>
            {imageIds && imageIds.map((imageId, index) => (
                <Image
                key={index}
                cloudName="dtkpn9glp"
                publicId={imageId}
                height="110"
                width="110"
                radius="1000"
                />
            ))}
            <h6 className="text-center">Upload New Avatar</h6>
            <form onSubmit={handleSubmitFile}
            className="form">
                <input 
                    type="file" 
                    name="image" 
                    onChange={handleFileInputChange} 
                    value={fileInputState} 
                    className="form-input" 
                />

                {previewSource && (
                <img 
                    src={previewSource} 
                    alt="chosen"
                    style={{ height: '110px', width: 'auto'}} 
                />
                )}
                
                <button className="btn" type="submit">
                    Change Avatar
                </button>
            </form>
        </div>
    )
}