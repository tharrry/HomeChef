import { Controller, Get, Header, Render } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @Render('index')
  root() {
    return {message: 'Hello there!'}
  }

  //@Get()
  //@Header('Content-Type', 'text/html')
  //getHello(): string {
  //  return this.appService.getHello();
  //}
}
