import { Box, Button, Link, Stack } from '@mui/material'
import { FunctionComponent } from 'react'
import { useNavigate } from 'react-router-dom'
import AuthApi from '../API/authApi'

interface CustomHeaderProps {}

const CustomHeader: FunctionComponent<CustomHeaderProps> = () => {
	const user = localStorage.getItem('user')
	const navigate = useNavigate()
	const logout = async () => {
		await AuthApi.logout()
		await localStorage.removeItem('user')
		await navigate('/')
	}
	return (
		<header>
			<Stack
				direction='row'
				justifyContent='space-between'
				sx={{ marginTop: 5 }}
			>
				<Box>
					<Link underline='none' href='/'>
						Главная Страница
					</Link>
				</Box>
				<Stack spacing={2} direction='row'>
					<Link underline='none' href='/newTopic'>
						<Button variant='text'>Создать тему</Button>
					</Link>
					{user ? (
						<Button variant='contained' onClick={() => logout()}>
							Выйти
						</Button>
					) : (
						<>
							<Link underline='none' href='/login'>
								<Button variant='contained'>Войти</Button>
							</Link>
							<Link underline='none' href='/registration'>
								<Button variant='contained'>Регестрация</Button>
							</Link>
						</>
					)}
				</Stack>
			</Stack>
		</header>
	)
}

export default CustomHeader
