import { Controller, Get, Put, Delete, Body, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { GetUser } from '../auth/decorators/get-user.decorator';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { ChangePasswordDto } from './dto/change-password.dto';
import { UpdatePreferencesDto } from './dto/update-preferences.dto';
import { ApiTags, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';

@ApiTags('Users')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('api/v1/users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get('profile')
  @ApiOperation({ summary: 'Get current user profile' })
  getProfile(@GetUser('id') userId: string) {
    return this.usersService.getProfile(userId);
  }

  @Put('profile')
  @ApiOperation({ summary: 'Update user profile info' })
  updateProfile(@GetUser('id') userId: string, @Body() updateProfileDto: UpdateProfileDto) {
    return this.usersService.updateProfile(userId, updateProfileDto);
  }

  @Put('profile/change-password')
  @ApiOperation({ summary: 'Change user password' })
  changePassword(@GetUser('id') userId: string, @Body() changePasswordDto: ChangePasswordDto) {
    return this.usersService.changePassword(userId, changePasswordDto);
  }

  @Put('profile/preferences')
  @ApiOperation({ summary: 'Update notification preferences' })
  updatePreferences(@GetUser('id') userId: string, @Body() updatePreferencesDto: UpdatePreferencesDto) {
    return this.usersService.updatePreferences(userId, updatePreferencesDto);
  }

  @Delete('profile')
  @ApiOperation({ summary: 'Delete user account' })
  deleteAccount(@GetUser('id') userId: string) {
    return this.usersService.deleteAccount(userId);
  }
}
