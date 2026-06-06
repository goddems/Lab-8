import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Tag } from './tag.entity';

@Injectable()
export class TagsService {
  constructor(@InjectRepository(Tag) private tagsRepo: Repository<Tag>) {}

  findAll(): Promise<Tag[]> {
    return this.tagsRepo.find();
  }

  findOne(id: number): Promise<Tag | null> {
    return this.tagsRepo.findOne({ where: { id } });
  }

  async create(name: string): Promise<Tag> {
    const tag = this.tagsRepo.create({ name });
    return this.tagsRepo.save(tag);
  }

  async update(id: number, name: string): Promise<Tag | null> {
    const tag = await this.tagsRepo.findOne({ where: { id } });
    if (!tag) return null;
    tag.name = name;
    return this.tagsRepo.save(tag);
  }

  async remove(id: number): Promise<boolean> {
    const res = await this.tagsRepo.delete(id);
    return (res.affected ?? 0) > 0;
  }
}
