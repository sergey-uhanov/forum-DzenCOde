import { Box, Stack, Typography } from '@mui/material'
import Avatar from '@mui/material/Avatar'
import { FunctionComponent } from 'react'
import { formatDate } from '../hooks/formatDate'
import { IReply } from '../interface'

interface RepliesCardProps {
	reply: IReply
}

const RepliesCard: FunctionComponent<RepliesCardProps> = ({ reply }) => {
	return (
		<Box key={reply.name} sx={{}}>
			<Stack direction='row' spacing={2}>
				<Avatar sx={{ textTransform: 'uppercase ', mr: 2 }}>
					{reply.name[0]}
				</Avatar>
				<Typography variant='body2' sx={{ fontSize: 16 }}>
					{reply.name}
				</Typography>
				<Typography variant='caption' sx={{ fontSize: 10 }}>
					{formatDate(reply.createdAt!)}
				</Typography>
			</Stack>
			<Typography variant='caption' sx={{ ml: 10, fontSize: 16 }}>
				{reply.text}
			</Typography>
		</Box>
	)
}

export default RepliesCard
