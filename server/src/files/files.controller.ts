import {
  BadRequestException,
  Controller,
  Get,
  Param,
  Post,
  Res,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Response } from 'express';
import { diskStorage } from 'multer';
import { extname, join } from 'path';
import * as sharp from 'sharp';

@Controller('files')
export class FilesController {
  @Post('upload')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './uploads',
        filename: (req, file, cb) => {
          const randomName = Array(32)
            .fill(null)
            .map(() => Math.round(Math.random() * 16).toString(16))
            .join('');
          cb(null, `${randomName}${extname(file.originalname)}`);
        },
      }),
      fileFilter: (req, file, cb) => {
        const allowedTypes = ['image/jpeg', 'image/png', 'text/plain'];
        if (!allowedTypes.includes(file.mimetype)) {
          cb(new BadRequestException('Invalid file type'), false);
        } else {
          cb(null, true);
        }
      },
    }),
  )
  async uploadFile(@UploadedFile() file) {
    if (!file) {
      throw new Error('File not uploaded');
    }

    const isImage = ['image/jpeg', 'image/png'].includes(file.mimetype);
    if (isImage) {
      const image = sharp(file.path);
      const metadata = await image.metadata();

      if (metadata.width > 320 || metadata.height > 240) {
        await image
          .resize(320, 240, {
            fit: sharp.fit.inside,
            withoutEnlargement: true,
          })
          .toFile(join('./uploads', `resized-${file.filename}`));

        return {
          originalname: file.originalname,
          filename: `resized-${file.filename}`,
          path: `uploads/resized-${file.filename}`,
        };
      }
    }

    return {
      originalname: file.originalname,
      filename: file.filename,
      path: `uploads/${file.filename}`,
    };
  }

  @Get('/uploads/:filename')
  async getFile(@Param('filename') filename: string, @Res() res: Response) {
    const filePath = join(__dirname, '..', '..', 'uploads', filename);
    res.download(filePath, filename, (err) => {
      if (err) {
        res.status(404).send('File not found');
      }
    });
  }
}
