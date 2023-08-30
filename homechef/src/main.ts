import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { join } from 'path';
import { NestExpressApplication } from '@nestjs/platform-express';
import * as hbs from 'hbs';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.useStaticAssets(join(__dirname, '..', 'public'));
  app.setBaseViewsDir(join(__dirname, '..', 'views'));
  app.setViewEngine('hbs');
  hbs.registerPartials(join(__dirname, '..', '/views/partials'));
  hbs.registerHelper({
    compare: function (variableOne, comparator, variableTwo) {
      if (eval(variableOne + comparator + variableTwo)) {
        return true;
      } else {
        return false;
      }
    },
  });

  app.enableCors({
    origin: 'http://home.chef',
  });

  await app.listen(3000);
}
bootstrap();
