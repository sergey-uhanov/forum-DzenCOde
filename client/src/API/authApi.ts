import axios from 'axios'

const API_URL = process.env.REACT_APP_API_URL

export default class AuthApi {
	public static async login(email: string, password: string) {
		const response = await axios.post(
			`${API_URL}auth/login`,
			{
				email: email,
				password: password,
			},
			{
				headers: {
					'Content-Type': 'application/json',
				},
				withCredentials: true,
			}
		)

		if (response.status === 201) {
			return response.data.user
		} else {
			throw new Error(response.data.message || 'Ошибка входа')
		}
	}

	public static async register(email: string, password: string) {
		const response = await axios.post(
			`${API_URL}auth/registration`,
			{
				email: email,
				password: password,
			},
			{
				headers: {
					'Content-Type': 'application/json',
				},
				withCredentials: true,
			}
		)
		if (response.status === 200) {
			return response.data.user
		} else {
			throw new Error(response.data.message || 'Ошибка регестрации')
		}
	}

	public static async logout() {
		try {
			const response = await axios.post(
				`${API_URL}auth/logout`,
				{},
				{
					headers: {
						'Content-Type': 'application/json',
					},
					withCredentials: true,
				}
			)
			if (response.status === 201) {
				return response.data
			} else {
				throw new Error(response.data.message || 'Ошибка выхода')
			}
		} catch (error) {
			throw new Error('Ошибка выхода')
		}
	}
}
