import { Box } from '@mui/material'
import axios from 'axios'
import { FunctionComponent, useEffect, useState } from 'react'
import { IPost } from '../interface'
import HomePageCard from './homePageCard'

interface mainHomePageProps {}

const MainHomePage: FunctionComponent<mainHomePageProps> = () => {
	const API_URL = process.env.REACT_APP_API_URL

	const [listPosts, setListPosts] = useState<IPost[]>([])
	useEffect(() => {
		const fetchPosts = async () => {
			try {
				const response = await axios.get(`${API_URL}posts`)
				setListPosts(response.data)
			} catch (error) {
				console.log(error)
			}
		}
		fetchPosts()
	}, [])

	return (
		<main>
			<Box>
				{listPosts && listPosts.map(post => <HomePageCard post={post} />)}
			</Box>
		</main>
	)
}

export default MainHomePage
