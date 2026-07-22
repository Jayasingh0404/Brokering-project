import { IsOptional, IsString, IsNumber, IsArray, IsEnum, Min } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { ListingStatus } from '@prisma/client';

export class UpdateListingDto {
  @ApiProperty({ example: '10 Tons of Scrap PET Bottles', required: false })
  @IsOptional()
  @IsString()
  title?: string;

  @ApiProperty({ example: 'Clean, sorted PET bottles ready for recycling.', required: false })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({ example: 10, required: false })
  @IsOptional()
  @IsNumber()
  @Min(0)
  quantity?: number;

  @ApiProperty({ example: 'tons', required: false })
  @IsOptional()
  @IsString()
  unit?: string;

  @ApiProperty({ example: 250, required: false })
  @IsOptional()
  @IsNumber()
  @Min(0)
  price?: number;

  @ApiProperty({ example: 'New Delhi, India', required: false })
  @IsOptional()
  @IsString()
  location?: string;

  @ApiProperty({ example: 'category-uuid-here', required: false })
  @IsOptional()
  @IsString()
  categoryId?: string;

  @ApiProperty({ example: 'ACTIVE', enum: ListingStatus, required: false })
  @IsOptional()
  @IsEnum(ListingStatus)
  status?: ListingStatus;

  @ApiProperty({ example: ['https://example.com/image1.jpg'], type: [String], required: false })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  images?: string[];
}
