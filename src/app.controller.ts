import { Controller, Delete, Get, Param } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('seed')
  async getHello(): Promise<string> {
    this.appService.seed();
    return 'Seed complete';
  }

  @Get(':id')
  getEmployeeById(@Param('id') id: number) {
    return this.appService.getEmployeeById(id);
  }

  @Delete(':id')
  deleteEmployee(@Param('id') id: number) {
    return this.appService.deleteEmployee(id);
  }
}
