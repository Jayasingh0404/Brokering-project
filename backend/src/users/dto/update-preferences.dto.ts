import { IsBoolean } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdatePreferencesDto {
  @ApiProperty({ example: true })
  @IsBoolean()
  emailNotifications: boolean;

  @ApiProperty({ example: true })
  @IsBoolean()
  pushNotifications: boolean;
}
