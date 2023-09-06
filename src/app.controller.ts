import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiResponse } from '@nestjs/swagger';

@Controller()
export class AppController {
  constructor(private appService: AppService) {}

  @Get()
  @ApiResponse({
    status: 200,
    description: 'API handshake',
  })
  getHello(): string {
    return this.appService.getHello();
  }
}
