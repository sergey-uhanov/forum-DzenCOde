import { Box, Card, CardContent, Grid, Stack, Typography } from '@mui/material'
import { format } from 'date-fns'
import { ru } from 'date-fns/locale'
import { FunctionComponent } from 'react'
import { Link } from 'react-router-dom'
import { IPost } from '../interface'

interface HomePageCardProps {
	post: IPost
}

const getTruncatedHTML = (html: string, maxLength: number) => {
	const tempDiv = document.createElement('div')
	tempDiv.innerHTML = html
	const textContent = tempDiv.textContent || tempDiv.innerText || ''

	if (textContent.length > maxLength) {
		const truncatedText = textContent.slice(0, maxLength) + '...'
		let currentLength = 0

		const walk = document.createTreeWalker(tempDiv, NodeFilter.SHOW_TEXT, null)
		while (walk.nextNode()) {
			const node = walk.currentNode as Text
			const remainingLength = maxLength - currentLength

			if (node.textContent!.length > remainingLength) {
				node.textContent = node.textContent!.slice(0, remainingLength) + '...'

				// Удаляем все последующие узлы
				while (walk.nextNode()) {
					const nextNode = walk.currentNode as Text
					nextNode.textContent = ''
				}

				break
			} else {
				currentLength += node.textContent!.length
			}
		}

		return tempDiv.innerHTML
	}

	return html
}

const HomePageCard: FunctionComponent<HomePageCardProps> = ({ post }) => {
	return (
		<Link to={`topic/${post.id}`} style={{ textDecoration: 'none' }}>
			<Card sx={{ margin: 2, cursor: 'pointer', textDecoration: 'none' }}>
				<CardContent>
					<Grid container spacing={2}>
						<Stack
							spacing={1}
							flexDirection='row'
							justifyContent='space-between'
							alignItems='center'
							sx={{ width: '100%' }}
						>
							<Box sx={{ minWidth: 150 }}>
								<Typography variant='h6' component='div' sx={{ width: '100%' }}>
									{post.user_name}
								</Typography>
							</Box>

							<Typography
								component='div'
								sx={{ whiteSpace: 'pre-wrap', flexGrow: 1, width: '100%' }}
								variant='body2'
								color='text.secondary'
								dangerouslySetInnerHTML={{
									__html: post ? getTruncatedHTML(post.text, 100) : '',
								}}
							/>
							<Typography variant='body2' color='text.secondary'>
								{format(new Date(post.createdAt), 'dd MMMM yyyy', {
									locale: ru,
								})}
							</Typography>
						</Stack>
					</Grid>
				</CardContent>
			</Card>
		</Link>
	)
}

export default HomePageCard
