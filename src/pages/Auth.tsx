import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import ItemBlock from '../components/ItemBlock';
import AuthForm from '../components/AuthForm';
import './Main.css';
import NextButton from '../components/NextButton';
import { useDropzone } from 'react-dropzone';
import Hr from '../components/Hr';
import { FiCheckCircle } from 'react-icons/fi';
import * as yaml from 'js-yaml';
import * as ini from 'ini';
// import axios from 'axios';

interface FormData {
	user: string;
	fingerprint: string;
	tenancy: string;
	region: string;
	subnet_id: string;
	key_pem: File | null; // Specify the type as File | null
	api_url: string;
	compartment_id: string;
	registry: string;
	fnapp_name: string;
	apigw_name: string;
	apideploy_name: string;
  }

const Auth = () => {
	const [formData, setFormData] = useState<FormData>({
		user: '',
		fingerprint: '',
		tenancy: '',
		region: '',
		subnet_id: '',
		key_pem: null,
		api_url: '',
		compartment_id: '',
		registry: '',
		fnapp_name: '',
		apigw_name: '',
		apideploy_name: '',
	});
	const [isFormComplete, setIsFormComplete] = useState(false);
	const [iniFileName, setIniFileName] = useState<string | null>(null);
	const [YamlFileName, setYamlFileName] = useState<string | null>(null);

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

	const onDropIni = useCallback((acceptedFiles: File[]) => {
		const file = acceptedFiles[0]; 
		const reader = new FileReader();
		setIniFileName(file.name);
		
		reader.onabort = () => console.log('file reading was aborted');
		reader.onerror = () => console.log('file reading has failed');
		reader.onload = () => {
			if (typeof reader.result === 'string') {
				try {
					let configData;
					configData = ini.parse(reader.result); 
						const cliData = {
							user: configData.DEFAULT.user || '',
							fingerprint: configData.DEFAULT.fingerprint || '',
							tenancy: configData.DEFAULT.tenancy || '',
							region: configData.DEFAULT.region || '',
							key_pem: formData.key_pem,
						};
						setFormData(prevState => ({ ...prevState, ...cliData}));
					// if (file.name.endsWith('.ini')) {
					// 	configData = ini.parse(reader.result); 
					// 	const cliData = {
					// 		user: configData.DEFAULT.user || '',
					// 		fingerprint: configData.DEFAULT.fingerprint || '',
					// 		tenancy: configData.DEFAULT.tenancy || '',
					// 		region: configData.DEFAULT.region || '',
					// 		key_pem: formData.key_pem,
					// 	};
					// 	setFormData(prevState => ({ ...prevState, ...cliData}));
					// } else {
					// 	console.error('Invalid file type');
					// 	return;
					// }
				} catch (error) {
					console.error('Failed to parse file:', error);
				}
			} else {
				console.error('File content is not a string');
			}
		};
		reader.readAsText(file);
	}, [formData]);
	
	const onDropYaml = useCallback((acceptedFiles: File[]) => {
		const file = acceptedFiles[0]; 
		const reader = new FileReader();
		setYamlFileName(file.name);
		
		reader.onabort = () => console.log('file reading was aborted');
		reader.onerror = () => console.log('file reading has failed');
		reader.onload = () => {
			if (typeof reader.result === 'string') {
				try {
					let configData;
					if (file.name.endsWith('.yaml') || file.name.endsWith('.yml')) {
						configData = yaml.load(reader.result); // Use yaml.load instead of yaml.safeLoad
						const fnData = {
							api_url: configData['api-url'] || '',
							compartment_id: configData['oracle.compartment-id'] || '',
							registry: configData.registry || '',
						};
						setFormData(prevState => ({ ...prevState, ...fnData}));
					} else {
						console.error('Invalid file type');
						return;
					}
				} catch (error) {
					console.error('Failed to parse file:', error);
				}
			} else {
				console.error('File content is not a string');
			}
		};
		reader.readAsText(file);
	}, []);	
	
	const {
		getRootProps: getRootPropsIni,
		getInputProps: getInputPropsIni,
	  } = useDropzone({onDrop: onDropIni});
	  
	const {
	getRootProps: getRootPropsYaml,
	getInputProps: getInputPropsYaml,
	} = useDropzone({onDrop: onDropYaml});
	  

	const cli_items = [
		"USER",
		"FINGERPRINT",
		"TENANCY",
		"REGION",
		"SUBNET_ID",
		"KEY_PEM",
	];

	const fn_items = [
		"API_URL",
		"COMPARTMENT_ID",
		"REGISTRY",
		"FNAPP_NAME",
		"APIGW_NAME",
		"APIDEPLOY_NAME",
	];

	const navigate = useNavigate();
	// const location = useLocation();
	// const currentLocationState = location.state;

	const nextHandler = () => {
		if (isFormComplete) {
			navigate("/migration", { state: { formData } });
		}
	};

	const idxStyle = {
		display: 'flex',
		width: '100%',
		height: '4.5vh',
		TextAlign: 'left',
		paddingInline: '1.5rem',
		alignItems: 'center',
	}

	return (
		<div className="screen">
			<ItemBlock style={{ flex: 1, display: 'flex', flexDirection: 'column'}}>
				<div style={{ display: 'flex', flexDirection: 'column', width: '100%', height: '100%', paddingBlock: '4vh 1vh'}}>
					<div style={{...idxStyle, fontSize: '2.2vh', marginLeft: '0.5vw', paddingBlockEnd: '0.5vh'}}>
						CLI Config_
					</div>
					{cli_items.map((item, index) => {
						const value = formData[item.toLowerCase() as keyof FormData];
						const isFile = value instanceof File;
						const isNonEmptyString = typeof value === 'string' && value !== '';
						return (
							<div key={index} style={idxStyle}>
								<FiCheckCircle 
									color={(isFile || isNonEmptyString) ? "green" : "#dddddd"} 
									style={{ marginInline: '0.5rem'}}
								/>
								{item}
							</div>
						);
					})}
				</div>
				<Hr />
				<div style={{ display: 'flex', flexDirection: 'column', width: '100%', height: '100%', paddingBlock: '2vh 3vh'}}>
					<div style={{...idxStyle, fontSize: '2.2vh', marginLeft: '0.5vw', paddingBlockEnd: '0.5vh'}}>
						Fn Config_
					</div>
					{fn_items.map((item, index) => {
						const value = formData[item.toLowerCase() as keyof FormData];
						const isFile = value instanceof File;
						const isNonEmptyString = typeof value === 'string' && value !== '';
						return (
							<div key={index} style={idxStyle}>
								<FiCheckCircle 
									color={(isFile || isNonEmptyString) ? "green" : "#dddddd"} 
									style={{ marginInline: '0.5rem'}}
								/>
								{item}
							</div>
						);
					})}
				</div>
				<div
					style={{
						display: 'flex', flexDirection: 'column', width: '100%', height: '100%', alignItems: 'center', justifyContent: 'center'
					}}
				>
					<NextButton
						disabled={!isFormComplete}
						className={isFormComplete ? 'next-button-active' : 'next-button'}
						onClick={nextHandler}
						style={{width: '100%', height: '100%', fontSize: '30px', borderRadius: '0 0 12px 12px' }}
					>
						Next
					</NextButton>
				</div>
			</ItemBlock>
			<ItemBlock style={{ display: 'flex', flex: 4, flexDirection: 'column', height: '100%', overflow: 'auto'}}>
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
							CLI Config...📄
						</div>
						<div
							{...getRootPropsIni()}
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
							<input {...getInputPropsIni()} />
    						<div>{iniFileName ? iniFileName : "Drag 'n' drop **Ini** file here, or click to select file"}</div>
						</div>
					</div>
					<div
						style={{
							display: 'flex', flexDirection: 'column', width: '100%', marginBlockStart: '1vh', paddingBlockEnd: '6vh'
						}}
					>
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
							label="SUBNET_ID"
							name="subnet_id"
							value={formData.subnet_id}
							type="text"
							onInputChange={handleInputChange}
							infoLink='https://github.com/Harmonica-OIDC2023/harmonica-web'
						/>
						<AuthForm
							label="KEY_PEM"
							name="key_pem"
							value={formData.key_pem ? formData.key_pem.name : ''}
							type="file"
							onInputChange={handleInputChange}
							infoLink='https://github.com/Harmonica-OIDC2023/harmonica-web'
						/>
					</div>
					<Hr />
					<div
						style={{
							display: 'flex', flexDirection: 'column', width: '100%', height: '100%', alignItems: 'center', paddingBlockStart: '6vh'
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
							Fn Config...📄
						</div>
						<div
							{...getRootPropsYaml()}
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
							<input {...getInputPropsYaml()} />
    						<div>{YamlFileName ? YamlFileName : "Drag 'n' drop **Yaml** file here, or click to select file"}</div>
						</div>
					</div>
					{/* <Hr /> */}
					<div
						style={{
							display: 'flex', flexDirection: 'column', width: '100%', marginBlockStart: '1vh', paddingBlockEnd: '6vh'
						}}
					>
						<AuthForm
							label="API_URL"
							name="api_url"
							value={formData.api_url}
							type="text"
							onInputChange={handleInputChange}
							infoLink='https://github.com/Harmonica-OIDC2023/harmonica-web'
						/>
						<AuthForm
							label="COMPARTMENT_ID"
							name="compartment_id"
							value={formData.compartment_id}
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
							label="FNAPP_NAME"
							name="fnapp_name"
							value={formData.fnapp_name}
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