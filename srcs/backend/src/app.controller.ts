import { Controller, Get, Session } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('/logout')
  async logout(@Session() session: Record<string, any>) {
    session.login = false;
    session.intra = null;
    session.name = null;
    return { ok: true };
  }
}
