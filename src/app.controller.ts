import { Body, Controller, Delete, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  async getInfo(@Body() key: string): Promise<any> {
    return await this.appService.getInfo(key);
  }

  @Post()
  async createInfo(@Body() { key, value }): Promise<boolean> {
    return await this.appService.createInfo(key,value)
  }

  @Delete()
  async deleteInfo(@Body() key: string): Promise<boolean> {
    return await this.appService.deleteInfo(key)
  }
}
