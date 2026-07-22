import { Controller, Get, Post, Put, Delete, Body, Param, Query, UseGuards } from '@nestjs/common';
import { ListingsService } from './listings.service';
import { CreateListingDto } from './dto/create-listing.dto';
import { UpdateListingDto } from './dto/update-listing.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { GetUser } from '../auth/decorators/get-user.decorator';
import { Role } from '@prisma/client';
import { ApiTags, ApiBearerAuth, ApiOperation, ApiQuery } from '@nestjs/swagger';

@ApiTags('Listings')
@Controller('api/v1/listings')
export class ListingsController {
  constructor(private listingsService: ListingsService) {}

  @Get()
  @ApiOperation({ summary: 'Search and filter listings' })
  @ApiQuery({ name: 'search', required: false })
  @ApiQuery({ name: 'categoryId', required: false })
  @ApiQuery({ name: 'location', required: false })
  @ApiQuery({ name: 'minPrice', required: false, type: Number })
  @ApiQuery({ name: 'maxPrice', required: false, type: Number })
  findAll(
    @Query('search') search?: string,
    @Query('categoryId') categoryId?: string,
    @Query('location') location?: string,
    @Query('minPrice') minPrice?: number,
    @Query('maxPrice') maxPrice?: number,
  ) {
    return this.listingsService.findAll({ search, categoryId, location, minPrice, maxPrice });
  }

  @Get('my')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.SELLER)
  @ApiOperation({ summary: 'Get current seller listings (Seller only)' })
  findMyListings(@GetUser('id') sellerId: string) {
    return this.listingsService.findMyListings(sellerId);
  }

  @Get('stats')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.SELLER)
  @ApiOperation({ summary: 'Get seller dashboard statistics (Seller only)' })
  getDashboardStats(@GetUser('id') sellerId: string) {
    return this.listingsService.getDashboardStats(sellerId);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get single listing detail' })
  findOne(@Param('id') id: string) {
    return this.listingsService.findOne(id);
  }

  @Post()
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.SELLER)
  @ApiOperation({ summary: 'Create a new listing (Seller only)' })
  create(@GetUser('id') sellerId: string, @Body() createListingDto: CreateListingDto) {
    return this.listingsService.create(sellerId, createListingDto);
  }

  @Put(':id')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.SELLER)
  @ApiOperation({ summary: 'Update listing details (Seller owner only)' })
  update(
    @GetUser('id') sellerId: string,
    @Param('id') id: string,
    @Body() updateListingDto: UpdateListingDto,
  ) {
    return this.listingsService.update(sellerId, id, updateListingDto);
  }

  @Delete(':id')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.SELLER)
  @ApiOperation({ summary: 'Delete a listing (Seller owner only)' })
  delete(@GetUser('id') sellerId: string, @Param('id') id: string) {
    return this.listingsService.delete(sellerId, id);
  }
}
