import { Controller, Get, Header, Render } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService
    ) {}


    
  @Get()
  @Render('index')
  @Header('content-type', 'text/html')
  async root() {
    return {
      isRecipesView: false,
      isHomeView: true
    }
  }
}
