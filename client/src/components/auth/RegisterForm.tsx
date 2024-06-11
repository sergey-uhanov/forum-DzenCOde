import { yupResolver } from '@hookform/resolvers/yup'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import Visibility from '@mui/icons-material/Visibility'
import VisibilityOff from '@mui/icons-material/VisibilityOff'
import {
	Avatar,
	Box,
	Button,
	Container,
	CssBaseline,
	FormControl,
	IconButton,
	InputAdornment,
	InputLabel,
	OutlinedInput,
	TextField,
	Typography,
} from '@mui/material'
import axios from 'axios'
import React, { useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import * as yup from 'yup'
import authApi from '../../API/authApi'
import CustomHeader from '../../UI/CustomHeader'

interface IFormInputs {
	email: string
	password: string
	confirmPassword: string
}

const schema = yup.object().shape({
	email: yup
		.string()
		.email('Введите корректный email')
		.required('Email обязателен'),
	password: yup
		.string()
		.min(6, 'Пароль должен быть не менее 6 символов')
		.required('Пароль обязателен'),
	confirmPassword: yup
		.string()
		.oneOf([yup.ref('password')], 'Пароли должны совпадать')
		.required('Подтверждение пароля обязательно'),
})

const RegisterForm: React.FC = () => {
	const [showPassword, setShowPassword] = useState(false)
	const [showConfirmPassword, setShowConfirmPassword] = useState(false)
	const [errorMessage, setErrorMessage] = useState('')

	const handleClickShowPassword = () => setShowPassword(!showPassword)
	const handleMouseDownPassword = (
		event: React.MouseEvent<HTMLButtonElement>
	) => {
		event.preventDefault()
	}

	const handleClickShowConfirmPassword = () =>
		setShowConfirmPassword(!showConfirmPassword)
	const handleMouseDownConfirmPassword = (
		event: React.MouseEvent<HTMLButtonElement>
	) => {
		event.preventDefault()
	}

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<IFormInputs>({
		resolver: yupResolver(schema),
	})
	const navigate = useNavigate()

	const onSubmit: SubmitHandler<IFormInputs> = async data => {
		try {
			console.log('Submitting data:', data)
			const response = await authApi.register(data.email, data.password)
			console.log('Response:', response)
			await localStorage.setItem('user', JSON.stringify(response))
			await navigate('/')
		} catch (error) {
			console.error('Registration error:', error)
			if (axios.isAxiosError(error) && error.response) {
				setErrorMessage(error.response.data.message)
			} else {
				setErrorMessage('Произошла ошибка при регистрации')
			}
		}
	}

	return (
		<>
			<CustomHeader />
			<Container component='main' maxWidth='xs'>
				<CssBaseline />
				<Box
					sx={{
						marginTop: 8,
						display: 'flex',
						flexDirection: 'column',
						alignItems: 'center',
					}}
				>
					<Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
						<LockOutlinedIcon />
					</Avatar>
					<Typography component='h1' variant='h5'>
						Регистрация
					</Typography>
					<Box
						component='form'
						onSubmit={handleSubmit(onSubmit)}
						sx={{ mt: 3 }}
					>
						<TextField
							variant='outlined'
							margin='normal'
							fullWidth
							id='email'
							label='Email'
							autoComplete='email'
							{...register('email')}
							error={!!errors.email}
							helperText={errors.email?.message}
						/>
						<FormControl variant='outlined' fullWidth margin='normal'>
							<InputLabel htmlFor='outlined-adornment-password'>
								Пароль
							</InputLabel>
							<OutlinedInput
								id='outlined-adornment-password'
								type={showPassword ? 'text' : 'password'}
								{...register('password')}
								error={!!errors.password}
								endAdornment={
									<InputAdornment position='end'>
										<IconButton
											aria-label='toggle password visibility'
											onClick={handleClickShowPassword}
											onMouseDown={handleMouseDownPassword}
											edge='end'
										>
											{showPassword ? <VisibilityOff /> : <Visibility />}
										</IconButton>
									</InputAdornment>
								}
								label='Пароль'
							/>
							{errors.password && (
								<Typography color='error'>{errors.password.message}</Typography>
							)}
						</FormControl>
						<FormControl variant='outlined' fullWidth margin='normal'>
							<InputLabel htmlFor='outlined-adornment-confirm-password'>
								Подтверждение пароля
							</InputLabel>
							<OutlinedInput
								id='outlined-adornment-confirm-password'
								type={showConfirmPassword ? 'text' : 'password'}
								{...register('confirmPassword')}
								error={!!errors.confirmPassword}
								endAdornment={
									<InputAdornment position='end'>
										<IconButton
											aria-label='toggle confirm password visibility'
											onClick={handleClickShowConfirmPassword}
											onMouseDown={handleMouseDownConfirmPassword}
											edge='end'
										>
											{showConfirmPassword ? <VisibilityOff /> : <Visibility />}
										</IconButton>
									</InputAdornment>
								}
								label='Подтверждение пароля'
							/>
							{errors.confirmPassword && (
								<Typography color='error'>
									{errors.confirmPassword.message}
								</Typography>
							)}
						</FormControl>
						<Button
							type='submit'
							fullWidth
							variant='contained'
							sx={{ mt: 3, mb: 2 }}
						>
							Зарегистрироваться
						</Button>
						{errorMessage}
					</Box>
				</Box>
			</Container>
		</>
	)
}

export default RegisterForm
