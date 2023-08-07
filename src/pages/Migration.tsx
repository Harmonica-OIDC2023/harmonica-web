import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import ItemBlock from '../components/ItemBlock';
import { useDropzone } from 'react-dropzone';
import { FiCheckCircle } from 'react-icons/fi';
import './Main.css';
import NextButton from '../components/NextButton';
import AuthForm from '../components/AuthForm';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { solarizedlight } from 'react-syntax-highlighter/dist/esm/styles/prism';

interface FormData {
  docker_registry: string;
  docker_pw: string;
  user_email: string;
  func_file: File | null; // Specify the type as File | null
}

const Migration = () => {
  const [formData, setFormData] = useState<FormData>({
    docker_registry: '',
    docker_pw: '',
    user_email: '',
    func_file: null,
  });

  const navigate = useNavigate();
  const [pyFileName, setPyFileName] = useState<string | null>(null);
	const [isFormComplete, setIsFormComplete] = useState(false);

  const handleInputChange = (name: string, value: string | File) => {
		setFormData((prevFormData) => ({
		...prevFormData,
		[name]: value,
		}));
	};

  const [pyFileContent, setPyFileContent] = useState<string | null>(null);

  const onDropPy = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0]; 
    setPyFileName(file.name);
    setFormData(prevState => ({ ...prevState, func_file: file }));

    // Read the file content
    const reader = new FileReader();
    reader.onload = (event) => {
      setPyFileContent(event.target?.result as string);
    };
    reader.readAsText(file);
  }, []);

  // Check if all form fields have a value
	useEffect(() => {
		const isComplete = Object.values(formData).every((value) => value !== '' && value !== null);
		setIsFormComplete(isComplete);
	}, [formData]);

	const migrationHandler = () => {
		// next 버튼 누르면 migration 페이지로 라우팅
		if(isFormComplete) {
			navigate('/completed');
		}
	};

  const {
		getRootProps: getRootPropsPy,
		getInputProps: getInputPropsPy,
  } = useDropzone({onDrop: onDropPy});

  const renderInput = () => {
    return (
      <div
        style={{
          display: 'flex', flexDirection: 'column', width: '100%', height: '100%', alignItems: 'center'
        }}
      >
        <div
          style={{
            marginLeft: '1.5vw',
            fontSize: '1.8vw',
            width: '90%',
            textAlign: 'left',
          }}
        >
          Function file...📄
        </div>
        <div
          {...getRootPropsPy()}
          style={{
            width: '90%',
            height: '100%',
            marginBlockStart: '1.5vh',
            marginBlockEnd: '3vh',
            paddingLeft: '1vw',
            paddingRight: '1vw',
            border: '1.2px dashed #dddddd',
            color: '#9d9d9d',
            borderRadius: '5px',
            alignItems: 'center',
            display: 'flex',
            fontSize: '0.8rem',
            justifyContent: 'center',
            alignContent: 'center',
          }}
        >
          <input {...getInputPropsPy()} />
          <div
            style={{
              width: '100%',
              height: '100%',
              overflow: 'auto',
            }}
          >
            {pyFileContent ? (
              <SyntaxHighlighter language="python" style={solarizedlight}>
                {pyFileContent}
              </SyntaxHighlighter>
            ) : (
              <div
                style={{
                  display: 'flex',
                  height: '100%',
                  width: '100%',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                {pyFileName ? pyFileName : "Drag 'n' drop **Python** file here, or click to select file"}
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="screen">
      <ItemBlock style={{
							display: 'flex', flexDirection: 'column', width: '100%', marginBlockStart: '1vh', flex: 1}}
      >
        <div
          style={{
            display: 'flex', flexDirection: 'column', width: '100%', paddingBlock: '15vh 8vh'
          }}
        >
          <AuthForm
            label="DOCKER_REGISTRY"
            name="docker_registry"
            value={formData.docker_registry}
            type="text"
            onInputChange={handleInputChange}
            infoLink='https://github.com/Harmonica-OIDC2023/harmonica-web'
          />
          <AuthForm
            label="DOCKER_PW"
            name="docker_pw"
            value={formData.docker_pw}
            type="text"
            onInputChange={handleInputChange}
            infoLink='https://github.com/Harmonica-OIDC2023/harmonica-web'
          />
          <AuthForm
            label="USER_EMAIL"
            name="user_email"
            value={formData.user_email}
            type="text"
            onInputChange={handleInputChange}
            infoLink='https://github.com/Harmonica-OIDC2023/harmonica-web'
          />
        </div>
        <div
        style={{
          display: 'flex', flexDirection: 'column', width: '100%', height: '100%', alignItems: 'center', justifyContent: 'center'
        }}
        >
          <NextButton
            disabled={!isFormComplete || !isFormComplete}
            className={isFormComplete ? 'next-button-active' : 'next-button'}
            onClick={migrationHandler}
            style={{width: '100%', height: '100%', fontSize: '30px', borderRadius: '0 0 12px 12px' }}
          >
            migration
          </NextButton>
				</div>
      </ItemBlock>
      <ItemBlock style={{ display: 'flex', flexDirection: 'column', flex: 2 }}>
        <div
          style={{ display: 'flex', flexDirection: 'column', width: '100%', justifyContent: 'center', padding: '8px', height: '90%' }}
        >
          {renderInput()}
          <div>
            <div style={{ marginRight: 'auto', height: '100%', alignItems: 'center', marginBlockEnd: '0.15rem'}}>
              {pyFileName ? <FiCheckCircle color="green" style={{ marginLeft: '0.5rem'}} /> : <FiCheckCircle color="#9d9d9d" style={{ marginLeft: '0.5rem'}} />}
            </div>
          </div>
        </div>
      </ItemBlock>
    </div>
  );
};

export default Migration;
