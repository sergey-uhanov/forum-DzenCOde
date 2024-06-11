export class CreateCommentDto {
  readonly user_name: string;
  readonly postId: number;
  readonly text: string;
}
