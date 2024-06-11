import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { Post } from './post.model';

@Injectable()
export class PostService {
  constructor(@InjectModel(Post) private postRepository: typeof Post) {}

  async getAllPosts() {
    const posts = await this.postRepository.findAll();
    return posts;
  }

  async getPostById(id: number) {
    const post = await this.postRepository.findByPk(id);
    if (!post) {
      throw new NotFoundException(`Post with id ${id} not found`);
    }
    return post;
  }

  async createPost(post: CreatePostDto) {
    const newPost = await this.postRepository.create(post);
    console.log(1111111111111111111111111111111111111111111111111);

    return newPost;
  }

  async updatePost(id: number, updateCommentDto: UpdatePostDto) {
    const [numberOfAffectedRows, [updatedComment]] =
      await this.postRepository.update(updateCommentDto, {
        where: { id },
        returning: true,
      });

    if (numberOfAffectedRows === 0) {
      throw new NotFoundException(`Comment with id ${id} not found`);
    }

    return updatedComment;
  }

  async deletePost(id: number) {
    const numberOfDeletedRows = await this.postRepository.destroy({
      where: { id },
    });

    if (numberOfDeletedRows === 0) {
      throw new NotFoundException(`Post with id ${id} not found`);
    }

    return { deleted: true };
  }
}
