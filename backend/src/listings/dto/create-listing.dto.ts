import {
  IsNotEmpty,
  IsString,
  IsNumber,
  IsOptional,
  IsArray,
  Min,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateListingDto {
  @ApiProperty({ example: '10 Tons of Scrap PET Bottles' })
  @IsNotEmpty()
  @IsString()
  title: string;

  @ApiProperty({ example: 'Clean, sorted PET bottles ready for recycling.' })
  @IsNotEmpty()
  @IsString()
  description: string;

  @ApiProperty({ example: 10 })
  @IsNumber()
  @Min(0)
  quantity: number;

  @ApiProperty({ example: 'tons' })
  @IsNotEmpty()
  @IsString()
  unit: string;

  @ApiProperty({ example: 250 })
  @IsNumber()
  @Min(0)
  price: number;

  @ApiProperty({ example: 'New Delhi, India' })
  @IsNotEmpty()
  @IsString()
  location: string;

  @ApiProperty({ example: 'category-uuid-here' })
  @IsNotEmpty()
  @IsString()
  categoryId: string;

  @ApiProperty({
    example: ['https://example.com/image1.jpg'],
    type: [String],
    required: false,
  })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  images?: string[];
}
