import { IsNotEmpty, IsString, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CategoryDto {
  @ApiProperty({ example: 'Plastic' })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({ example: 'All kinds of plastic wastes', required: false })
  @IsOptional()
  @IsString()
  description?: string;
}
