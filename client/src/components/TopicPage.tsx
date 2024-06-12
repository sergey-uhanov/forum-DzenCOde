import AccountCircleIcon from '@mui/icons-material/AccountCircle'
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile'
import { Box, Container, IconButton, Stack, Typography } from '@mui/material'
import axios from 'axios'
import { format } from 'date-fns'
import { saveAs } from 'file-saver'
import { FunctionComponent, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import CommentApi from '../API/commentApi'
import CustomHeader from '../UI/CustomHeader'
import SortSelect from '../UI/SortSelect'
import CommentCard from '../UI/commentCard'
import FormAddComment from '../UI/formAddComment'
import { IComment, IPost } from '../interface'
import { socket } from '../socket'

interface TopicPageProps {}

const TopicPage: FunctionComponent<TopicPageProps> = () => {
	const API_URL = process.env.REACT_APP_API_URL
	const [post, setPost] = useState<IPost>()
	const [comments, setComments] = useState<IComment[]>([])
	const [sort, setSort] = useState<string>('date_desc')

	const { id } = useParams<{ id: string }>()

	useEffect(() => {
		socket.on('newComment', (comment: any) => {
			setComments(prevComments => [...prevComments, comment])
		})

		return () => {
			socket.off('newComment')
		}
	}, [])

	useEffect(() => {
		const fetchPost = async () => {
			const response = await axios.get(`${API_URL}posts/${id}`)
			setPost(response.data)
		}
		fetchPost()
	}, [API_URL, id])

	useEffect(() => {
		const fetchComments = async () => {
			try {
				const response = await CommentApi.getCommentPostId(parseInt(id!), sort)
				setComments(response)
			} catch (error) {
				console.error('Error setting comments:', error)
			}
		}

		fetchComments()
	}, [sort, id])

	const formatDate = (dateString: string) => {
		const date = new Date(dateString)
		return format(date, 'yyyy-MM-dd H:mm:ss')
	}

	const handleDownload = () => {
		const fileUrl = `${API_URL}files/${post?.url_file}`
		const fileName = post?.file_name
		saveAs(fileUrl, fileName)
	}

	return (
		<>
			<CustomHeader />
			<Container>
				<Stack direction='row' spacing={2} sx={{ marginBottom: 3 }}>
					<AccountCircleIcon fontSize='large' />
					<Typography sx={{ fontSize: 20 }}>{post?.user_name}</Typography>
					<Typography sx={{ fontSize: 10 }}>
						{post && formatDate(post.createdAt)}
					</Typography>
				</Stack>
				<Stack>
					<Typography
						component='div'
						sx={{ whiteSpace: 'pre-wrap' }}
						dangerouslySetInnerHTML={{ __html: post?.text ?? '' }}
					/>
				</Stack>
				{post?.file_name &&
					(post?.file_name.includes('.txt') ? (
						<IconButton
							onClick={handleDownload}
							color='primary'
							aria-label='download file'
							size='large'
						>
							<InsertDriveFileIcon />
						</IconButton>
					) : (
						<Box
							component='img'
							sx={{
								height: 233,
								width: 350,
								maxHeight: { xs: 233, md: 167 },
								maxWidth: { xs: 350, md: 250 },
								objectFit: 'contain',
							}}
							alt='Example Image'
							src={`${API_URL}${post?.url_file}`}
						/>
					))}
				<Stack spacing={2} sx={{ ml: 10, mt: 5 }}>
					<SortSelect sort={sort} setSort={setSort} />
					{comments.map((comment, index) => (
						<CommentCard key={comment.id} comment={comment} />
					))}
				</Stack>
				<Stack>
					<FormAddComment postId={id!} />
				</Stack>
			</Container>
		</>
	)
}

export default TopicPage
