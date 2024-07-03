
import { Injectable, NotFoundException } from '@nestjs/common';

import { PrismaService } from 'src/prisma.service';
import { generateSlug } from 'src/utils/generate-slug';
import { returnActorObject } from './return-actor.object';
import { UpdateActorDto } from './dto/update-actor.dto';

@Injectable()
export class ActorService {
  constructor(private prisma: PrismaService) {}
  async getAll(searchTerm?: string) {
    if (searchTerm) this.search(searchTerm);

    return this.prisma.actor.findMany({
      select: returnActorObject,
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  private async search(searchTerm: string) {
    return this.prisma.actor.findMany({
      where: {
        OR: [
          {
            name: {
              contains: searchTerm,
              mode: 'insensitive',
            },
          },
        ],
      },
    });
  }

  async getBySlug(slug: string) {
    const actor = this.prisma.actor.findUnique({
      where: {
        slug,
      },
      select: returnActorObject,
    });
    if (!actor) throw new NotFoundException('Actor not found');
    return actor;
  }

  /*Request for admin*/
  async getById(id: string) {
    const actor = this.prisma.actor.findUnique({
      where: {
        id,
      },
      select: returnActorObject,
    });
    if (!actor) throw new NotFoundException('Actor not found');
    return actor;
  }

  async create() {
    const actor = await this.prisma.actor.create({
      data: {
        name: '',
        slug: '',
        photoUrl: '',
        
      },
    });
    return actor.id;
  }

  async update(id: string, dto: UpdateActorDto) {
    return this.prisma.actor.update({
      where: {
        id,
      },
      data: {
        name: dto.name,
        slug: generateSlug(dto.name),
        photoUrl: dto.photoUrl,
      },
    });
  }

  async delete(id: string) {
    return this.prisma.actor.delete({
      where: {
        id,
      },
    });
  }
}
