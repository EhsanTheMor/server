import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { File } from 'src/post/entities/file.entity';
import { Repository } from 'typeorm';

type TFile = {
  filename: string;
  fieldname: string;
  originalname: string;
  encoding: string;
  mimetype: string;
  size: number;
  destination: string;
  path: string;
};

@Injectable()
export class FileService {
  constructor(@InjectRepository(File) private fileRepo: Repository<File>) {}

  saveFile(file: TFile) {
    const newFile = this.fileRepo.create(file);

    return this.fileRepo.save(newFile);
  }

  async getOneFile(id: number) {
    const file = await this.fileRepo.findOne({ where: { id } });
    return file;
  }

  async findByName(name: string) {
    const file = await this.fileRepo.findOne({
      where: {
        filename: name,
      },
    });
    return file;
  }

  async deleteFile(name: string) {
    this.fileRepo.delete({
      filename: name,
    });
  }
}
