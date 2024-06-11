import { yupResolver } from '@hookform/resolvers/yup'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import Visibility from '@mui/icons-material/Visibility'
import VisibilityOff from '@mui/icons-material/VisibilityOff'
import {
	Avatar,
	Box,
	Button,
	Container,
	FormControl,
	IconButton,
	InputAdornment,
	InputLabel,
	OutlinedInput,
	TextField,
	Typography,
} from '@mui/material'
import React, { useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import * as yup from 'yup'
import authApi from '../../API/authApi' // Импорт вашего authApi
import CustomHeader from '../../UI/CustomHeader'

interface IFormInputs {
	email: string
	password: string
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
})

const LoginForm: React.FC = () => {
	const [showPassword, setShowPassword] = useState(false)

	const handleClickShowPassword = () => setShowPassword(!showPassword)
	const handleMouseDownPassword = (
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
			const response = await authApi.login(data.email, data.password)
			console.log(response)
			await localStorage.setItem('user', JSON.stringify(response))

			await navigate('/') // переход на главную страницу
		} catch (error) {
			console.log(error)
			console.log(1)
		}
	}

	return (
		<>
			<CustomHeader />
			<Container component='main' maxWidth='xs'>
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
						Вход
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
							autoFocus
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
						<Button
							type='submit'
							fullWidth
							variant='contained'
							sx={{ mt: 3, mb: 2 }}
						>
							Войти
						</Button>
					</Box>
				</Box>
			</Container>
		</>
	)
}

export default LoginForm
