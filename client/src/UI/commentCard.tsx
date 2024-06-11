import { Box, Button, Stack, Typography } from '@mui/material'
import Avatar from '@mui/material/Avatar'
import axios from 'axios'
import { FunctionComponent, useEffect, useState } from 'react'
import ReplyForm from '../UI/replyForm'
import { IComment, IReply } from '../interface'
import { socket } from '../socket'
import RepliesCard from './repliesCard'

interface CommentCardProps {
	comment: IComment
}

const CommentCard: FunctionComponent<CommentCardProps> = ({ comment }) => {
	const [showReplyForm, setShowReplyForm] = useState(false)
	const [replies, setReplies] = useState<IReply[]>([])

	const fetchReplies = async () => {
		const response = await axios.get(
			`http://localhost:6060/replies/${comment.id}`
		)
		setReplies(response.data)
	}

	useEffect(() => {
		fetchReplies()

		socket.on('newReply', (reply: any) => {
			if (reply.commentId === comment.id) {
				setReplies(prevReplies => [...prevReplies, reply])
			}
		})

		return () => {
			socket.off('newReply')
		}
	}, [])

	const handleReplyClick = () => {
		setShowReplyForm(prev => !prev)
	}

	return (
		<Box
			sx={{ mb: 10, border: '1px solid #678', borderRadius: 10, padding: 2 }}
		>
			<Stack>
				<Stack direction={'row'}>
					<Avatar sx={{ textTransform: 'uppercase ', mr: 2 }}>
						{comment.user_name[0]}
					</Avatar>
					<Typography variant='body1'>{comment.user_name}</Typography>
				</Stack>
				<Typography variant='caption' sx={{ paddingLeft: 10 }}>
					{comment.text}
				</Typography>

				<Stack spacing={2} sx={{ marginTop: 2, ml: 10 }}>
					{replies.map(reply => (
						<RepliesCard reply={reply} />
					))}
				</Stack>
				<Box display='flex' justifyContent='flex-end'>
					<Button variant='text' onClick={handleReplyClick}>
						Ответить
					</Button>
				</Box>
				{showReplyForm && (
					<ReplyForm
						commentId={comment.id}
						quote={comment.text}
						onReplySent={() => {
							fetchReplies()
							setShowReplyForm(false)
						}}
					/>
				)}
			</Stack>
		</Box>
	)
}

export default CommentCard
