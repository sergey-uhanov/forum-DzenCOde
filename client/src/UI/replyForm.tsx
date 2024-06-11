import { Button, Container, Stack, TextField } from '@mui/material'
import { FunctionComponent, useState } from 'react'
import { socket } from '../socket'

interface ReplyFormProps {
	commentId: number
	onReplySent: () => void
	quote: string
}

const ReplyForm: FunctionComponent<ReplyFormProps> = ({
	commentId,
	onReplySent,
	quote,
}) => {
	const [name, setName] = useState('')
	const [text, setText] = useState('')

	const handleReplySubmit = () => {
		const newReply = { commentId, name, text, quote: quote }
		console.log('Sending new reply:', newReply) // Логирование
		socket.emit('newReply', newReply)
		setName('')
		setText('')
		onReplySent()
	}

	return (
		<Container sx={{ marginTop: 2 }}>
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
				label='Ответ'
				multiline
				rows={4}
				fullWidth
				value={text}
				onChange={e => setText(e.target.value)}
			/>
			<Stack direction='row' justifyContent='space-between' sx={{ mt: 3 }}>
				<Button variant='contained' onClick={handleReplySubmit}>
					Отправить
				</Button>
			</Stack>
		</Container>
	)
}

export default ReplyForm
