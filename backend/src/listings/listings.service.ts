import {
  Injectable,
  NotFoundException,
  ForbiddenException,
} from '@nestjs/common';
import { PrismaService } from '../database/prisma.service';
import { CreateListingDto } from './dto/create-listing.dto';
import { UpdateListingDto } from './dto/update-listing.dto';
import { ListingStatus } from '@prisma/client';

@Injectable()
export class ListingsService {
  constructor(private prisma: PrismaService) {}

  async create(sellerId: string, createListingDto: CreateListingDto) {
    // Verify user is seller
    const user = await this.prisma.user.findUnique({
      where: { id: sellerId },
      include: { company: true },
    });
    if (user?.role !== 'SELLER') {
      throw new ForbiddenException('Only sellers can create listings');
    }
    if (!user.company) {
      throw new ForbiddenException(
        'Please setup your company profile first before listing',
      );
    }

    const { images, categoryId, ...listingData } = createListingDto;

    // Create listing
    return this.prisma.listing.create({
      data: {
        ...listingData,
        status: ListingStatus.PENDING, // Default status is pending approval
        sellerId,
        categoryId,
        images: images
          ? {
              create: images.map((img) => ({ imageUrl: img })),
            }
          : undefined,
      },
      include: {
        images: true,
        category: true,
      },
    });
  }

  async findAll(filters: {
    search?: string;
    categoryId?: string;
    location?: string;
    minPrice?: number;
    maxPrice?: number;
  }) {
    const { search, categoryId, location, minPrice, maxPrice } = filters;

    const whereClause: any = {};

    if (categoryId) {
      whereClause.categoryId = categoryId;
    }

    if (location) {
      whereClause.location = {
        contains: location,
        mode: 'insensitive',
      };
    }

    if (search) {
      whereClause.OR = [
        { title: { contains: search, mode: 'insensitive' } },
        { description: { contains: search, mode: 'insensitive' } },
      ];
    }

    if (minPrice !== undefined || maxPrice !== undefined) {
      whereClause.price = {};
      if (minPrice !== undefined) {
        whereClause.price.gte = Number(minPrice);
      }
      if (maxPrice !== undefined) {
        whereClause.price.lte = Number(maxPrice);
      }
    }

    return this.prisma.listing.findMany({
      where: whereClause,
      include: {
        images: true,
        category: true,
        seller: {
          select: {
            id: true,
            name: true,
            email: true,
            phone: true,
            company: true,
          },
        },
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  async findOne(id: string) {
    const listing = await this.prisma.listing.findUnique({
      where: { id },
      include: {
        images: true,
        category: true,
        seller: {
          select: {
            id: true,
            name: true,
            email: true,
            phone: true,
            company: true,
          },
        },
      },
    });

    if (!listing) {
      throw new NotFoundException('Listing not found');
    }

    return listing;
  }

  async findMyListings(sellerId: string) {
    return this.prisma.listing.findMany({
      where: { sellerId },
      include: {
        images: true,
        category: true,
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  async update(
    sellerId: string,
    id: string,
    updateListingDto: UpdateListingDto,
  ) {
    const listing = await this.prisma.listing.findUnique({
      where: { id },
    });
    if (!listing) {
      throw new NotFoundException('Listing not found');
    }
    if (listing.sellerId !== sellerId) {
      throw new ForbiddenException('You do not own this listing');
    }

    const { images, categoryId, ...listingData } = updateListingDto;

    // Handle image updates if supplied
    if (images) {
      await this.prisma.listingImage.deleteMany({
        where: { listingId: id },
      });
    }

    return this.prisma.listing.update({
      where: { id },
      data: {
        ...listingData,
        categoryId,
        images: images
          ? {
              create: images.map((img) => ({ imageUrl: img })),
            }
          : undefined,
      },
      include: {
        images: true,
        category: true,
      },
    });
  }

  async delete(sellerId: string, id: string) {
    const listing = await this.prisma.listing.findUnique({
      where: { id },
    });
    if (!listing) {
      throw new NotFoundException('Listing not found');
    }
    if (listing.sellerId !== sellerId) {
      throw new ForbiddenException('You do not own this listing');
    }

    await this.prisma.listing.delete({
      where: { id },
    });

    return { message: 'Listing deleted successfully' };
  }

  async getDashboardStats(sellerId: string) {
    const myListings = await this.prisma.listing.findMany({
      where: { sellerId },
    });

    const total = myListings.length;
    const active = myListings.filter(
      (l) => l.status === ListingStatus.ACTIVE,
    ).length;
    const pending = myListings.filter(
      (l) => l.status === ListingStatus.PENDING,
    ).length;

    return {
      totalListings: total,
      activeListings: active,
      pendingListings: pending,
      views: total * 12, // Mocked views count for MVP
    };
  }
}
