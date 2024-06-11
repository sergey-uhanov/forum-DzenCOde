import { Button, Container, Stack, TextField } from '@mui/material'
import { FunctionComponent, useState } from 'react'
import { socket } from '../socket'

interface FormAddCommentProps {
	postId: string
	commentId?: number // Добавлено для ответов на комментарии
	onReplyCancel?: () => void // Добавлено для отмены ответа
}

const FormAddComment: FunctionComponent<FormAddCommentProps> = ({
	postId,
	commentId,
	onReplyCancel,
}) => {
	const [name, setName] = useState('')
	const [comment, setComment] = useState('')

	const handleSubmit = async () => {
		const newComment = { postId, user_name: name, text: comment, commentId }
		try {
			socket.emit('newComment', newComment)
			setName('')
			setComment('')
			if (onReplyCancel) onReplyCancel() // Сброс формы после отправки ответа
		} catch (error) {
			console.error('Error saving comment:', error)
		}
	}

	return (
		<Container sx={{ marginTop: 5 }}>
			<TextField
				id='outlined-basic'
				label='Имя'
				variant='outlined'
				sx={{ mb: 2 }}
				value={name}
				onChange={e => setName(e.target.value)}
			/>
			<TextField
				id='standard-multiline-flexible'
				label='Комментарий'
				multiline
				rows={10}
				fullWidth
				value={comment}
				onChange={e => setComment(e.target.value)}
			/>
			<Stack direction='row' justifyContent='space-between' sx={{ mt: 3 }}>
				<Button variant='contained' onClick={handleSubmit}>
					Отправить
				</Button>
				{onReplyCancel && (
					<Button variant='outlined' onClick={onReplyCancel}>
						Отменить
					</Button>
				)}
			</Stack>
		</Container>
	)
}

export default FormAddComment
