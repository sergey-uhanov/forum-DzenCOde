import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import './App.css'

import { Container } from '@mui/material'
import FormNewTopic from './components/FormNewTopic'
import HomePage from './components/HomePage'
import NotFoundPage from './components/NotFoundPage'
import TopicPage from './components/TopicPage'

import LoginForm from './components/auth/Login'
import RegisterForm from './components/auth/RegisterForm'

function App() {
	return (
		<Router>
			<Container>
				<Routes>
					<Route path='/' element={<HomePage />} />
					<Route path='/topic/:id' element={<TopicPage />} />
					<Route path='/newTopic' element={<FormNewTopic />} />
					<Route path='/registration' element={<RegisterForm />} />
					<Route path='/login' element={<LoginForm />} />
					<Route path='/*' element={<NotFoundPage />} />
				</Routes>
			</Container>
		</Router>
	)
}

export default App
