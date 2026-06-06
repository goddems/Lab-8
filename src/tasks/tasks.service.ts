import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In } from 'typeorm';
import { Task } from './task.entity';
import { Tag } from '../tags/tag.entity';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task) private tasksRepo: Repository<Task>,
    @InjectRepository(Tag) private tagsRepo: Repository<Tag>,
  ) {}

  findAll(): Promise<Task[]> {
    return this.tasksRepo.find({ relations: { tags: true } });
  }

  findOne(id: number): Promise<Task | null> {
    return this.tasksRepo.findOne({ where: { id }, relations: { tags: true } });
  }

  findByStatus(status: string): Promise<Task[]> {
    return this.tasksRepo.find({ where: { status }, relations: { tags: true } });
  }

  async create(dto: CreateTaskDto): Promise<Task> {
    const { title, description, status, priority, tagIds } = dto as any;
    const task = this.tasksRepo.create({ title, description, status, priority });
    if (tagIds && tagIds.length) {
      const tags = await this.tagsRepo.findBy({ id: In(tagIds) });
      task.tags = tags;
    } else {
      task.tags = [];
    }
    return this.tasksRepo.save(task);
  }

  async update(id: number, dto: UpdateTaskDto): Promise<Task | null> {
    const task = await this.tasksRepo.findOne({ where: { id }, relations: { tags: true } });
    if (!task) return null;
    if ((dto as any).tagIds) {
      const tags = await this.tagsRepo.findBy({ id: In((dto as any).tagIds) });
      (task as any).tags = tags;
    }
    Object.assign(task, dto);
    return this.tasksRepo.save(task);
  }

  async remove(id: number): Promise<boolean> {
    const res = await this.tasksRepo.delete(id);
    return (res.affected ?? 0) > 0;
  }
}
