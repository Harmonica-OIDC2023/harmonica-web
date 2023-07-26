import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ItemBlock from '../components/ItemBlock';
import { useDropzone } from 'react-dropzone';
import { FiCheckCircle, FiHelpCircle } from 'react-icons/fi';
import './Main.css';
import NextButton from '../components/NextButton';
import Hr from '../components/Hr';

interface FormData {
  fn_init: string;
  func_file: File | null; // Specify the type as File | null
}

const Migration = () => {
  const [formData, setFormData] = useState<FormData>({
    fn_init: '',
    func_file: null,
  });

  const [inputValue, setInputValue] = useState<File>();

  const navigate = useNavigate();
  const [isInitComplete, setIsInitComplete] = useState(false);
  const [isUploadComplete, setIsUploadComplete] = useState(false);

  const initHandler = () => {
    // init button handler
    setFormData((prevFormData) => ({
      ...prevFormData,
      fn_init: 'completed',
    }));
  };

  const uploadHandler = () => {
    // upload button handler
    setIsUploadComplete(true);
  };

  const migrationHandler = () => {
    // migration button handler
    if (isInitComplete && isUploadComplete) {
      navigate('/completed');
    }
  };

  const handleFileDrop = (acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      const file = acceptedFiles[0];
      setInputValue(file);
      setFormData(prevFormData => ({
        ...prevFormData,
        func_file: file,
      }));
    }
  };

  const { getRootProps, getInputProps } = useDropzone({ onDrop: handleFileDrop });

  const renderInput = () => {
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

  // Check if all form fields have a value
  useEffect(() => {
    setIsInitComplete(formData.fn_init === 'completed');
    setIsUploadComplete(!!inputValue); // updated line
  }, [formData, inputValue]); // added inputValue to the dependency array

  return (
    <div className="screen">
      <ItemBlock style={{ width: '30%' }}>
        auth process bar
      </ItemBlock>
      <ItemBlock style={{ display: 'flex', flexDirection: 'column' }}>
        <div
          style={{ display: 'flex', flex: 1, flexDirection: 'column', width: '100%', justifyContent: 'center', padding: '8px' }}
        >
          <div>
            fn init을 해야합니다 어쩌구 저쩌구 설명
          </div>
          <NextButton
            className={isInitComplete ? 'next-button-disabled' : 'next-button-active'}
            onClick={initHandler}
            disabled={isInitComplete}
            style={{
              width: '18vw',
              height: '6vh',
              fontSize: '30px',
              borderRadius: '12px',
              cursor: isInitComplete ? 'default' : 'pointer'
            }}
          >
            {isInitComplete ? '✓ init' : 'init'}
          </NextButton>
        </div>
        <Hr />
        <div
          style={{ display: 'flex', flex: 1, flexDirection: 'column', width: '100%', justifyContent: 'center', padding: '8px' }}
        >
          {renderInput()}
          <div>
            <div style={{ marginRight: 'auto', height: '100%', alignItems: 'center', marginBlockEnd: '0.15rem'}}>
              {isUploadComplete ? <FiCheckCircle color="green" style={{ marginLeft: '0.5rem'}} /> : <FiCheckCircle color="#9d9d9d" style={{ marginLeft: '0.5rem'}} />}
            </div>
          </div>
        </div>
        <Hr />
        <div
          style={{ display: 'flex', flex: 1, flexDirection: 'column', width: '100%', justifyContent: 'center', padding: '8px' }}
        >
          <NextButton
            disabled={!isInitComplete || !isUploadComplete}
            className={(isInitComplete && isUploadComplete) ? 'next-button-active' : 'next-button'}
            onClick={migrationHandler}
            style={{ width: '18vw', height: '6vh', fontSize: '30px', borderRadius: '12px' }}
          >
            migration
          </NextButton>
        </div>
      </ItemBlock>
    </div>
  );
};

export default Migration;
