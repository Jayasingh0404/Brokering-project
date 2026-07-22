import { Injectable, ConflictException } from '@nestjs/common';
import { PrismaService } from '../database/prisma.service';
import { CategoryDto } from './dto/category.dto';

@Injectable()
export class CategoriesService {
  constructor(private prisma: PrismaService) {}

  async getAll() {
    return this.prisma.category.findMany({
      orderBy: { name: 'asc' },
    });
  }

  async create(categoryDto: CategoryDto) {
    const existing = await this.prisma.category.findUnique({
      where: { name: categoryDto.name },
    });
    if (existing) {
      throw new ConflictException('Category already exists');
    }
    return this.prisma.category.create({
      data: categoryDto,
    });
  }

  async seed() {
    const defaultCategories = [
      { name: 'Plastic', description: 'Recyclable plastics like PET, HDPE, PVC' },
      { name: 'Metal', description: 'Ferrous and non-ferrous scrap metals' },
      { name: 'Glass', description: 'Glass jars, bottles, and cullet' },
      { name: 'Paper', description: 'Cardboard, newspapers, office paper' },
      { name: 'Wood', description: 'Pallets, timber scrap, sawdust' },
      { name: 'E-Waste', description: 'Discarded electronic appliances and components' },
    ];

    for (const cat of defaultCategories) {
      await this.prisma.category.upsert({
        where: { name: cat.name },
        update: {},
        create: cat,
      });
    }
    return { message: 'Database seeded with default categories' };
  }
}
