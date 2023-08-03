import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import ItemBlock from '../components/ItemBlock';
import AuthForm from '../components/AuthForm';
import './Main.css';
import NextButton from '../components/NextButton';
import { useDropzone } from 'react-dropzone';
import Hr from '../components/Hr';

interface FormData {
	compartment_id: string;
	subnet_id: string;
	user: string;
	fingerprint: string;
	tenancy: string;
	region: string;
	key_file: File | null; // Specify the type as File | null
	api_url: string;
	registry: string;
	fnapp_name: string;
	fnfnc_name: string;
	apigw_name: string;
	apideploy_name: string;
  }

const Auth = () => {
	const [formData, setFormData] = useState<FormData>({
		compartment_id: '',
		subnet_id: '',
		user: '',
		fingerprint: '',
		tenancy: '',
		region: '',
		key_file: null,
		api_url: '',
		registry: '',
		fnapp_name: '',
        fnfnc_name: '',
        apigw_name: '',
        apideploy_name: ''
	});

	const onDrop = useCallback((acceptedFiles: File[]) => {
		const file = acceptedFiles[0]; // get the first file from the array
		const reader = new FileReader();
	
		reader.onabort = () => console.log('file reading was aborted');
		reader.onerror = () => console.log('file reading has failed');
		reader.onload = () => {
			if (typeof reader.result === 'string') {
				try {
					const configData = JSON.parse(reader.result);
					setFormData(configData);
				} catch (error) {
					console.error('Invalid JSON:', error);
				}
			} else {
				console.error('File content is not a string');
			}
		};
		reader.readAsText(file);
	}, []);
	
	const {getRootProps, getInputProps} = useDropzone({onDrop});

	const navigate = useNavigate();
	const [isFormComplete, setIsFormComplete] = useState(false);

	const nextHandler = () => {
		// next 버튼 누르면 auth 페이지로 라우팅
		if(isFormComplete) {
			navigate('/migration');
		}
	};

	const handleInputChange = (name: string, value: string | File) => {
		setFormData((prevFormData) => ({
		...prevFormData,
		[name]: value,
		}));
	};

	// Check if all form fields have a value
	useEffect(() => {
		const isComplete = Object.values(formData).every((value) => value !== '' && value !== null);
		setIsFormComplete(isComplete);
	}, [formData]);

	return (
		<div className="screen">
			<ItemBlock style={{ width: '30%', display: 'flex', flexDirection: 'column', }}>
				<div
					style={{ display: 'flex', flexDirection: 'column', width: '100%', height: '100%'}}
				>
					** TODO: 폼 입력 완료 시, 표시 추가 **
					<p>COMPARTMENT_ID</p>
					<p>SUBNET_ID</p>
					<p>USER</p>
					<p>FINGERPRINT</p>
					<p>TENANCY</p>
					<p>REGION</p>
					<p>API_URL</p>
					<p>REGISTRY</p>
					<p>KEY_FILE</p>
					<p>FNAPP_NAME</p>
					<p>FNFNC_NAME</p>
					<p>APIGW_NAME</p>
					<p>APIDEPLOY_NAME</p>
				</div>
				<div
					style={{
						display: 'flex', flexDirection: 'column', width: '100%', height: '100%', alignItems: 'center'
					}}
				>
					<NextButton
						disabled={!isFormComplete}
						className={isFormComplete ? 'next-button-active' : 'next-button'}
						onClick={nextHandler}
						style={{width: '80%', height: '6vh', fontSize: '30px'}}
					>
						Next
					</NextButton>
				</div>
			</ItemBlock>
			<ItemBlock style={{ display: 'flex', flexDirection: 'column', height: '100%', overflow: 'auto'}}>
				<div className="form-container" style={{ display: 'flex', flexDirection: 'column', width: '100%', height: '100%', paddingBlock: '6vh'}}>
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
							Upload Config...📄
						</div>
						<div
							{...getRootProps()}
							style={{
								width: '90%',
								height: '20vh',
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
							<input {...getInputProps()} />
    						<div>Drag 'n' drop some files here, or click to select files</div>
						</div>
					</div>
					<Hr />
					<div
						style={{
							display: 'flex', flexDirection: 'column', width: '100%', marginBlockStart: '1vh', paddingBlockEnd: '6vh'
						}}
					>
						<AuthForm
							label="COMPARTMENT_ID"
							name="compartment_id"
							value={formData.compartment_id}
							type="text"
							onInputChange={handleInputChange}
							infoLink='https://github.com/Harmonica-OIDC2023/harmonica-web'
						/>
						<AuthForm
							label="SUBNET_ID"
							name="subnet_id"
							value={formData.subnet_id}
							type="text"
							onInputChange={handleInputChange}
							infoLink='https://github.com/Harmonica-OIDC2023/harmonica-web'
						/>
						<AuthForm
							label="USER"
							name="user"
							value={formData.user}
							type="text"
							onInputChange={handleInputChange}
							infoLink='https://github.com/Harmonica-OIDC2023/harmonica-web'
						/>
						<AuthForm
							label="FINGERPRINT"
							name="fingerprint"
							value={formData.fingerprint}
							type="text"
							onInputChange={handleInputChange}
							infoLink='https://github.com/Harmonica-OIDC2023/harmonica-web'
						/>
						<AuthForm
							label="TENANCY"
							name="tenancy"
							value={formData.tenancy}
							type="text"
							onInputChange={handleInputChange}
							infoLink='https://github.com/Harmonica-OIDC2023/harmonica-web'
						/>
						<AuthForm
							label="REGION"
							name="region"
							value={formData.region}
							type="text"
							onInputChange={handleInputChange}
							infoLink='https://github.com/Harmonica-OIDC2023/harmonica-web'
						/>
						<AuthForm
							label="API_URL"
							name="api_url"
							value={formData.api_url}
							type="text"
							onInputChange={handleInputChange}
							infoLink='https://github.com/Harmonica-OIDC2023/harmonica-web'
						/>
						<AuthForm
							label="REGISTRY"
							name="registry"
							value={formData.registry}
							type="text"
							onInputChange={handleInputChange}
							infoLink='https://github.com/Harmonica-OIDC2023/harmonica-web'
						/>
						<AuthForm
							label="KEY_FILE"
							name="key_file"
							value={formData.key_file ? formData.key_file.name : ''}
							type="file"
							onInputChange={handleInputChange}
							infoLink='https://github.com/Harmonica-OIDC2023/harmonica-web'
						/>
						<AuthForm
							label="FNAPP_NAME"
							name="fnapp_name"
							value={formData.fnapp_name}
							type="text"
							onInputChange={handleInputChange}
							infoLink='https://github.com/Harmonica-OIDC2023/harmonica-web'
						/>
						<AuthForm
							label="FNFNC_NAME"
							name="fnfnc_name"
							value={formData.fnfnc_name}
							type="text"
							onInputChange={handleInputChange}
							infoLink='https://github.com/Harmonica-OIDC2023/harmonica-web'
						/>
						<AuthForm
							label="APIGW_NAME"
							name="apigw_name"
							value={formData.apigw_name}
							type="text"
							onInputChange={handleInputChange}
							infoLink='https://github.com/Harmonica-OIDC2023/harmonica-web'
						/>
						<AuthForm
							label="APIDEPLOY_NAME"
							name="apideploy_name"
							value={formData.apideploy_name}
							type="text"
							onInputChange={handleInputChange}
							infoLink='https://github.com/Harmonica-OIDC2023/harmonica-web'
						/>
					</div>
				</div>
			</ItemBlock>
		</div>
	);
};

export default Auth;


