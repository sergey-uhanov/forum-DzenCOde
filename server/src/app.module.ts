import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import * as path from 'path';
import { CaptchaModule } from './captcha/captcha.module';

import { Comment } from './comment/comment.model';
import { CommentModule } from './comment/comment.module';
import { Post } from './posts/post.model';

import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { AuthModule } from './auth/auth.module';
import { FilesModule } from './files/files.module';
import { PostsModule } from './posts/post.module';
import { RepliesModule } from './reply/reply.module';
import { Role } from './roles/roles.model';
import { RolesModule } from './roles/roles.module';
import { UserRoles } from './roles/user-roles.model';
import { User } from './users/users.model';
import { UsersModule } from './users/users.module';

@Module({
  controllers: [],
  providers: [],
  imports: [
    ConfigModule.forRoot({
      envFilePath: path.resolve(__dirname, '..', '.env'),
    }),
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: process.env.HOST,
      port: Number(process.env.DB_PORT),
      username: process.env.USER,
      password: process.env.PASSWORD,
      database: process.env.DB,
      models: [Post, Comment, Role, User, UserRoles],
      autoLoadModels: true,
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'uploads'),
      serveRoot: '/uploads', // путь для доступа к статическим файлам
    }),
    PostsModule,
    CaptchaModule,
    CommentModule,
    UsersModule,
    RolesModule,
    AuthModule,
    FilesModule,
    RepliesModule,
  ],
})
export class AppModule {}
