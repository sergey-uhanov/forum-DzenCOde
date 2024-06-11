import axios from 'axios'

const API_URL = process.env.REACT_APP_API_URL

export default class FileApi {
	public static async postFile(file: File) {
		const formData = new FormData()
		formData.append('file', file)

		const response = await axios.post(`${API_URL}files/upload`, formData, {
			headers: {
				'Content-Type': 'multipart/form-data',
			},
			withCredentials: true,
		})

		if (response.status === 201) {
			return response.data
		} else {
			throw new Error(response.data.message || 'Ошибка отправки файла')
		}
	}
}
