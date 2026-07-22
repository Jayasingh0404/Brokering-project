import { Injectable, ForbiddenException } from '@nestjs/common';
import { PrismaService } from '../database/prisma.service';
import { CompanyDto } from './dto/company.dto';

@Injectable()
export class CompaniesService {
  constructor(private prisma: PrismaService) {}

  async getMyCompany(userId: string) {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      select: { role: true },
    });
    if (user?.role !== 'SELLER') {
      throw new ForbiddenException('Only sellers can have a company profile');
    }

    return this.prisma.company.findUnique({
      where: { ownerId: userId },
    });
  }

  async createOrUpdateCompany(userId: string, companyDto: CompanyDto) {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      select: { role: true },
    });
    if (user?.role !== 'SELLER') {
      throw new ForbiddenException('Only sellers can manage a company profile');
    }

    return this.prisma.company.upsert({
      where: { ownerId: userId },
      update: companyDto,
      create: {
        ...companyDto,
        ownerId: userId,
      },
    });
  }
}
