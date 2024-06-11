export interface IPost {
	id: number
	email: string
	user_name: string
	homepage?: string
	text: string
	file_name: string
	url_file: string
	createdAt: string
	updatedAt: string
}

export interface IComment {
	id: number
	postId: number
	text: string
	user_name: string
	createdAt?: Date
	updatedAt?: string
}
export interface IRegistration {
	email: string
	passwords: string
}
export interface IFileResUploud {
	originalname: string
	filename: string
	path: string
}
export interface IReply {
	text: string
	name: string
	quote: string
	commentId: number
	comment: string
	createdAt?: string
	updatedAt?: string
}
