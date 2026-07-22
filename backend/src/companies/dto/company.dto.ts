import { IsNotEmpty, IsString, IsOptional, IsUrl, Matches } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CompanyDto {
  @ApiProperty({ example: 'Eco Waste Solutions' })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({ example: '22AAAAA0000A1Z5' })
  @IsNotEmpty()
  @IsString()
  @Matches(/^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/, {
    message: 'Invalid GST format (India)',
  })
  gstNumber: string;

  @ApiProperty({ example: 'ABCDE1234F' })
  @IsNotEmpty()
  @IsString()
  @Matches(/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/, {
    message: 'Invalid PAN format',
  })
  panNumber: string;

  @ApiProperty({ example: '123 Industrial Area, Phase 1, New Delhi' })
  @IsNotEmpty()
  @IsString()
  address: string;

  @ApiProperty({ example: 'https://ecowaste.com', required: false })
  @IsOptional()
  @IsUrl()
  website?: string;

  @ApiProperty({ example: 'Industrial scrap recycling company', required: false })
  @IsOptional()
  @IsString()
  description?: string;
}
