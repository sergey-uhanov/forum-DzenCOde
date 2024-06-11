import CloudUploadIcon from '@mui/icons-material/CloudUpload'
import {
	Box,
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogContentText,
	DialogTitle,
	Stack,
	TextField,
	Typography,
	styled,
} from '@mui/material'
import axios from 'axios'
import {
	ChangeEvent,
	FormEvent,
	FunctionComponent,
	useEffect,
	useRef,
	useState,
} from 'react'
import { useNavigate } from 'react-router-dom'

import FileApi from '../API/fileApi'
import CustomHeader from '../UI/CustomHeader'
import validateHTMLString from '../hooks/validateHTMLString'

interface FormNewTopicProps {}

const FormNewTopic: FunctionComponent<FormNewTopicProps> = () => {
	const API_URL = process.env.REACT_APP_API_URL
	const navigate = useNavigate()
	const [formData, setFormData] = useState({
		user_name: '',
		email: '',
		homepage: '',
		text: '',
		file_name: '',
		url_file: '',
	})
	const [error, setError] = useState<string | null>(null)
	const [isLoading, setIsLoading] = useState(false)
	const [userInputCaptcha, setuserInputCaptcha] = useState<string>('')
	const [file, setFile] = useState<File | null>(null)
	const [filePreview, setFilePreview] = useState<string | null>(null)
	const [openPreview, setOpenPreview] = useState(false)

	const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
		setFormData({
			...formData,
			[e.target.name]: e.target.value,
		})
	}

	const handleChangeCaptcha = (e: ChangeEvent<HTMLInputElement>) => {
		setuserInputCaptcha(e.target.value)
	}

	const handleFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
		const selectedFile = await e.target.files?.[0]

		if (selectedFile) {
			const isValid = validateFile(selectedFile)
			if (isValid) {
				await setFile(selectedFile)
				if (selectedFile.type.startsWith('image/')) {
					setFilePreview(URL.createObjectURL(selectedFile))
					setError('')
				} else {
					setFilePreview(null)
				}
			} else {
				setFile(null)
				setFilePreview(null)
				setError('Недопустимый формат файла или размер файла превышает 100 КБ.')
			}
		}
	}

	const validateFile = (file: File): boolean => {
		const allowedImageTypes = ['image/jpeg', 'image/png', 'image/gif']
		const allowedTextType = 'text/plain'
		const maxSize = 100 * 1024 // 100 KB

		if (
			allowedImageTypes.includes(file.type) ||
			(file.type === allowedTextType && file.size <= maxSize)
		) {
			return true
		}

		return false
	}

	const [captchaSVG, setCaptchaSVG] = useState<string | null>(null)
	useEffect(() => {
		axios
			.get(`${API_URL}captcha`, {
				withCredentials: true,
			})
			.then(response => {
				setCaptchaSVG(response.data)
			})
			.catch(err => {
				console.error('Error:', err)
				setError('Ошибка при получении данных. Пожалуйста, попробуйте снова.')
			})
	}, [])

	const handleSubmit = async (e: FormEvent) => {
		e.preventDefault()
		setIsLoading(true)
		setError(null)

		try {
			const captchaRes = await axios.get(
				`${API_URL}captcha/verify?input=${userInputCaptcha}`,
				{
					withCredentials: true,
				}
			)

			if (captchaRes.data === 'CAPTCHA verification passed.') {
				if (!validateHTMLString(formData.text)) {
					setError('Не допустимый тег или некорректное использование')
					return
				}

				if (file) {
					const response = await FileApi.postFile(file)

					const updatedFormData = {
						...formData,
						file_name: response.originalname,
						url_file: response.path,
					}

					// Используем функцию обратного вызова для обновления состояния
					setFormData(updatedFormData)
					console.log(updatedFormData)

					// Выполняем отправку данных только после обновления состояния
					await axios.post(`${API_URL}posts`, updatedFormData, {
						headers: {
							'Content-Type': 'application/json',
						},
						withCredentials: true,
					})

					navigate('/')
				} else {
					await axios.post(`${API_URL}posts`, formData, {
						headers: {
							'Content-Type': 'application/json',
						},
						withCredentials: true,
					})

					navigate('/')
				}
			} else {
				setError('Неправильно введена капча')
				return
			}
		} catch (err) {
			console.error('Error:', err)
			setError('Ошибка при отправке данных. Пожалуйста, попробуйте снова.')
		} finally {
			setIsLoading(false)
		}
	}

	const VisuallyHiddenInput = styled('input')({
		clip: 'rect(0 0 0 0)',
		clipPath: 'inset(50%)',
		height: 1,
		overflow: 'hidden',
		position: 'absolute',
		bottom: 0,
		left: 0,
		whiteSpace: 'nowrap',
		width: 1,
	})

	const textInputRef = useRef<HTMLTextAreaElement | null>(null)

	const insertTag = (tag: string) => {
		if (textInputRef.current) {
			const start = textInputRef.current.selectionStart
			const end = textInputRef.current.selectionEnd
			const text = textInputRef.current.value

			const before = text.substring(0, start)
			const selectedText = text.substring(start, end)
			const after = text.substring(end)

			let newText
			if (tag === 'a href="" title=""') {
				newText = `${before}<a href="" title="">${selectedText}</a>${after}`
			} else {
				newText = `${before}<${tag}>${selectedText}</${tag}>${after}`
			}
			setFormData({ ...formData, text: newText })
		}
	}

	const handleOpenPreview = () => {
		setOpenPreview(true)
	}

	const handleClosePreview = () => {
		setOpenPreview(false)
	}

	return (
		<>
			<CustomHeader />
			<Box component='form' onSubmit={handleSubmit} sx={{ mt: 4 }}>
				<Stack spacing={2} sx={{ color: '#9549e2' }}>
					<TextField
						label='User Name'
						name='user_name'
						value={formData.user_name}
						onChange={handleChange}
						required
						inputProps={{ pattern: '^[a-zA-Z0-9]+( [a-zA-Z0-9]+)*$' }}
						fullWidth
						sx={{ width: 400 }}
					/>
					<TextField
						label='E-mail'
						name='email'
						type='email'
						value={formData.email}
						onChange={handleChange}
						required
						sx={{ width: 400 }}
					/>
					<TextField
						label='Home page'
						name='homepage'
						type='url'
						value={formData.homepage}
						onChange={handleChange}
						fullWidth
						sx={{ width: 400 }}
					/>
					<Box>
						{captchaSVG && (
							<p
								dangerouslySetInnerHTML={{ __html: captchaSVG }}
								style={{ width: '150px', height: '50px' }}
							/>
						)}
						<TextField
							label='Captcha'
							name='homepage'
							type='text'
							value={userInputCaptcha}
							onChange={handleChangeCaptcha}
							fullWidth
							sx={{ width: 400 }}
						/>
					</Box>
					<Stack direction='row' spacing={1}>
						<Button
							variant='outlined'
							onClick={() => insertTag('a href="" title=""')}
						>
							A
						</Button>
						<Button variant='outlined' onClick={() => insertTag('code')}>
							Code
						</Button>
						<Button variant='outlined' onClick={() => insertTag('i')}>
							I
						</Button>
						<Button variant='outlined' onClick={() => insertTag('strong')}>
							Strong
						</Button>
					</Stack>
					<TextField
						label='Text'
						name='text'
						value={formData.text}
						onChange={handleChange}
						required
						multiline
						rows={10}
						fullWidth
						inputRef={textInputRef}
					/>

					{error && <Typography color='error'>{error}</Typography>}
					{
						<Box mt={2}>
							{file && file.type.startsWith('image/') ? (
								<img
									src={filePreview!}
									alt='Preview'
									width='150'
									height='150'
								/>
							) : (
								''
							)}
						</Box>
					}
					{
						<Box mt={2}>
							{file && file.type.startsWith('text/') ? (
								<Typography>Файл загружен: {file?.name}</Typography>
							) : (
								''
							)}
						</Box>
					}

					<Stack direction='row' justifyContent='space-between' sx={{ mt: 3 }}>
						<Button
							component='label'
							role={undefined}
							variant='contained'
							tabIndex={-1}
							startIcon={<CloudUploadIcon />}
						>
							Загрузить файл
							<VisuallyHiddenInput type='file' onChange={handleFileChange} />
						</Button>
						<Stack direction='row' spacing={2}>
							<Button variant='contained' onClick={handleOpenPreview}>
								Предпросмотр
							</Button>
							<Button type='submit' variant='contained' sx={{ width: 400 }}>
								{isLoading ? 'Загрузка...' : 'Создать тему'}
							</Button>
						</Stack>
					</Stack>
				</Stack>
			</Box>

			<Dialog fullWidth open={openPreview} onClose={handleClosePreview}>
				<DialogTitle>Предпросмотр поста</DialogTitle>
				<DialogContent>
					<DialogContentText>
						<Typography variant='h6'>
							Имя пользователя: {formData.user_name}
						</Typography>
						<Typography variant='body1'>Email: {formData.email}</Typography>
						<Typography variant='body1'>
							Домашняя страница: {formData.homepage}
						</Typography>
						<Typography
							variant='body1'
							dangerouslySetInnerHTML={{ __html: formData.text }}
						/>
						{file && file.type.startsWith('image/') && (
							<img src={filePreview!} alt='Preview' width='150' height='150' />
						)}
						{file && file.type.startsWith('text/') && (
							<Typography>Файл загружен: {file?.name}</Typography>
						)}
					</DialogContentText>
				</DialogContent>
				<DialogActions>
					<Button onClick={handleClosePreview} color='primary'>
						Закрыть
					</Button>
				</DialogActions>
			</Dialog>
		</>
	)
}

export default FormNewTopic
