import { Box } from '@mui/material'
import { FunctionComponent } from 'react'
import CustomHeader from '../UI/CustomHeader'
import MainHomePage from '../UI/mainHomePage'

interface HomePageProps {}

const HomePage: FunctionComponent<HomePageProps> = () => {
	return (
		<Box sx={{}}>
			<CustomHeader />
			<MainHomePage />
		</Box>
	)
}

export default HomePage
