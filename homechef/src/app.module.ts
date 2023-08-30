import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RecipeModule } from './recipes/recipe.module';
import { MongooseModule } from '@nestjs/mongoose';
import { mongodbURL } from './secret';

@Module({
  imports: [MongooseModule.forRoot(mongodbURL), RecipeModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
