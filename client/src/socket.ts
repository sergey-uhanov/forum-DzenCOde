import { io } from 'socket.io-client'

const URL = process.env.REACT_APP_API_URL || 'http://localhost:6060'
export const socket = io(URL, {
	autoConnect: true,
})
