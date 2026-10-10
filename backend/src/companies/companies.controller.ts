import { Controller, Get, Post, Body, UseGuards } from '@nestjs/common';
import { CompaniesService } from './companies.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { GetUser } from '../auth/decorators/get-user.decorator';
import { CompanyDto } from './dto/company.dto';
import { ApiTags, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';

@ApiTags('Companies')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('api/v1/companies')
export class CompaniesController {
  constructor(private companiesService: CompaniesService) {}

  @Get('my-company')
  @ApiOperation({ summary: 'Get current seller company details' })
  getMyCompany(@GetUser('id') userId: string) {
    return this.companiesService.getMyCompany(userId);
  }

  @Post()
  @ApiOperation({ summary: 'Create or update company profile' })
  createOrUpdateCompany(
    @GetUser('id') userId: string,
    @Body() companyDto: CompanyDto,
  ) {
    return this.companiesService.createOrUpdateCompany(userId, companyDto);
  }
}
