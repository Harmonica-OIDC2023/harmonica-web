// AuthForm.tsx

import React, { ChangeEvent, useState } from 'react';
import { FiCheckCircle, FiHelpCircle } from 'react-icons/fi';
import Vr from './Vr';
import { useDropzone } from 'react-dropzone';

interface Props {
  label: string;
  name: string;
  value: string | File;
  type: 'text' | 'file';
  onInputChange: (name: string, value: string | File) => void;
  infoLink?: string;
}


const AuthForm: React.FC<Props> = ({ label, name, value, type, onInputChange, infoLink }) => {
  const [inputValue, setInputValue] = useState<string | File>(value);

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    if (type === 'file') {
      // When the input type is 'file', handle the selected File directly
      const file = event.target.files?.[0];
      if (file) {
        setInputValue(file);
        onInputChange(name, file);
      }
    } else {
      // When the input type is 'text', handle the string value
      setInputValue(value);
      onInputChange(name, value);
    }
  };

  const handleFileDrop = (acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      setInputValue(acceptedFiles[0]);
      onInputChange(name, acceptedFiles[0]);
    }
  };

  const handleInfoClick = () => {
    if (infoLink) {
      window.open(infoLink, '_blank'); // Open link in a new tab
    }
  };

  // Use react-dropzone for handling file drop event
  const { getRootProps, getInputProps } = useDropzone({ onDrop: handleFileDrop });

  const renderInput = () => {
    if (type === 'file') {
      return (
        <div {...getRootProps()} style={{ flex: '2', height: '80%', paddingLeft: '1vw', paddingRight: '1vw', border: '1.2px dashed #dddddd', color: '#9d9d9d', borderRadius: '5px', alignItems: 'center', display: 'flex', fontSize: '0.8rem' }}>
          <input {...getInputProps()} />
          {inputValue instanceof File ? (
            <div style={{justifyContent: 'center', display: 'flex', width: '100%'}}>Selected file: {inputValue.name}</div>
          ) : (
            <div style={{justifyContent: 'center', display: 'flex', width: '100%'}}>{inputValue !== '' ? 'Selected file: ' + inputValue : 'Drag and drop the file here or click to select.'}</div>
          )}
        </div>
      );
    }
  
    return (
      <input
        name={name}
        type="text"
        value={typeof inputValue === 'string' ? inputValue : ''}
        onChange={handleInputChange}
        style={{ flex: '2', height: '80%', paddingLeft: '1vw', paddingRight: '1vw', border:'1px solid #dddddd', borderRadius: '0.5rem'}}
      />
    );
  };  

  return (
    <div style={{ display: 'flex', height: '7vh', alignItems: 'center', justifyContent: 'center', width: '100%', padding: '1vh 4vw', color: '#4b4b4b' }}>
      <label style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', flex: '1' }}>
        <span style={{ marginRight: '0.5rem', fontSize: '1rem' }}>{label}</span>
        <div style={{ marginRight: 'auto', height: '100%', alignItems: 'center', marginBlockEnd: '0.15rem'}}>
          <FiHelpCircle onClick={handleInfoClick} color="#9d9d9d" style={{ cursor: 'pointer' }} />
          {inputValue !== '' && <FiCheckCircle color="green" style={{ marginLeft: '0.5rem'}} />}
        </div>
      </label>
      <Vr style={{height: '50%', margin: '0 1rem 0 1rem'}}/>
      {renderInput()}
      <br />
    </div>
  );
};

export default AuthForm;




