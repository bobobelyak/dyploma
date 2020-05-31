import React from 'react';
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';

const ImageUpload = props => {
  const {imageUrl, style} = props;

  const removeImage = e => {
    const {input: {onChange}} = props;

    e.preventDefault();
    onChange({file: null, imageUrl: ''});
  };

  const onChange = e => {
    e.preventDefault();

    const {input: {onChange}} = props;

    const reader = new FileReader();
    const file = e.target.files ? e.target.files[0] : null;
    e.target.value = ''; // Reseting the input to prevent a bug regarding the ability to select the same image multiple times;
    if (file) {
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        onChange({file, imageUrl: reader.result});
      };
    }
  };

  return (
    <div className="avatar-upload">
      <input type="file" id="imageUpload" accept=".jpg, .jpeg" onChange={onChange}/>
      <div className="avatar-preview" style={style}>
        <div className="avatar-edit">
          {
            imageUrl ?
              <label className="label-delete" onClick={removeImage}><RemoveIcon style={{color: 'sandybrown'}}/></label> :
              <label className="label-add" htmlFor="imageUpload"><AddIcon style={{color: 'sandybrown'}}/></label>
          }
        </div>
        {
          imageUrl && <img src={imageUrl}/>
        }
      </div>
    </div>
  );
};

export default (ImageUpload);
