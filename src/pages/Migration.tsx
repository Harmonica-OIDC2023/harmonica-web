import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import ItemBlock from '../components/ItemBlock';
import AuthForm from '../components/AuthForm';
import './Main.css';
import NextButton from '../components/NextButton';

interface FormData {
	fn_init: string;
	func_file: File | null; // Specify the type as File | null
  }

const Migration = () => {
	const [formData, setFormData] = useState<FormData>({
		fn_init: '',
		func_file: null
	});

	const navigate = useNavigate();
	const [isFormComplete, setIsFormComplete] = useState(false);

	const migrationHandler = () => {
		// next 버튼 누르면 auth 페이지로 라우팅
		if(isFormComplete) {
			navigate('/completed');
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
			<ItemBlock style={{ width: '30%' }}>
				auth process bar
			</ItemBlock>
			<ItemBlock style={{ display: 'flex', flexDirection: 'column' }}>
				<div className="form-container" style={{ display: 'flex', flexDirection: 'column', width: '100%', marginBlockEnd: '5vh'}}>
					<AuthForm
						label="FN INIT"
						name="fn_init"
						value={formData.fn_init}
						type="text"
						onInputChange={handleInputChange}
						infoLink='https://github.com/Harmonica-OIDC2023/harmonica-web'
					/>
					<AuthForm
						label="FUNC_FILE"
						name="func_file"
						value={formData.func_file ? formData.func_file.name : ''}
						type="file"
						onInputChange={handleInputChange}
						infoLink='https://github.com/Harmonica-OIDC2023/harmonica-web'
					/>
				</div>
				<NextButton
					disabled={!isFormComplete}
					className={isFormComplete ? 'next-button-active' : 'next-button'}
					onClick={migrationHandler}
					style={{width: '25vw', height: '6vh', fontSize: '30px'}}
				>
					MIGRATION
				</NextButton>
			</ItemBlock>
		</div>
	);
};

export default Migration;