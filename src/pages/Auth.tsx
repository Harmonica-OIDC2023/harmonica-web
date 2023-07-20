import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import ItemBlock from '../components/ItemBlock';
import AuthForm from '../components/AuthForm';
import './Main.css';
import NextButton from '../components/NextButton';

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
	});

	const navigate = useNavigate();
	const [isFormComplete, setIsFormComplete] = useState(false);

	const nextHandler = () => {
		// next 버튼 누르면 auth 페이지로 라우팅
		if(isFormComplete) {
			navigate('/');
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
		<Container className="screen">
			<ItemBlock style={{ width: '30%' }}>
				auth process bar
			</ItemBlock>
			<ItemBlock style={{ display: 'flex', flexDirection: 'column' }}>
				<div className="form-container" style={{ display: 'flex', flexDirection: 'column', width: '100%', marginBlockEnd: '5vh'}}>
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
				</div>
				<NextButton
					disabled={!isFormComplete}
					className={isFormComplete ? 'next-button-active' : 'next-button'}
					onClick={nextHandler}
					style={{width: '25vw', height: '6vh', fontSize: '30px'}}
				>
					Next
				</NextButton>
			</ItemBlock>
		</Container>
	);
};

export default Auth;


