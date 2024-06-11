import axios, { AxiosResponse } from 'axios'
import { IComment } from '../interface'

const API_URL = process.env.REACT_APP_API_URL

class CommentApi {
	public static async getComments(): Promise<IComment[]> {
		try {
			const response: AxiosResponse<IComment[]> = await axios.get(
				`${API_URL}comment`
			)
			return response.data
		} catch (error) {
			console.error('Error fetching comments:', error)
			throw error
		}
	}

	public static async getCommentPostId(
		id: number,
		sort: string
	): Promise<IComment[]> {
		try {
			const response = await axios.get(
				`${API_URL}comment/postid?postId=${id}&sort=${sort}`
			)
			return response.data
		} catch (error) {
			console.error(`Error fetching comment with id ${id}:`, error)
			throw error
		}
	}

	public static async addComment(
		comment: Partial<IComment>
	): Promise<IComment> {
		try {
			const response: AxiosResponse<IComment> = await axios.post(
				`${API_URL}comments`,
				comment
			)
			return response.data
		} catch (error) {
			console.error('Error adding comment:', error)
			throw error
		}
	}

	public static async updateComment(
		id: number,
		comment: Partial<IComment>
	): Promise<IComment> {
		try {
			const response: AxiosResponse<IComment> = await axios.put(
				`${API_URL}/comments/${id}`,
				comment
			)
			return response.data
		} catch (error) {
			console.error(`Error updating comment with id ${id}:`, error)
			throw error
		}
	}

	public static async deleteComment(id: number): Promise<void> {
		try {
			await axios.delete(`${API_URL}/comments/${id}`)
		} catch (error) {
			console.error(`Error deleting comment with id ${id}:`, error)
			throw error
		}
	}
}

export default CommentApi
