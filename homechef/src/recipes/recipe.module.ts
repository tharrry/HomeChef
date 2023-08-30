import { Module } from '@nestjs/common';
import {
  RecipesApiController,
  RecipesViewController,
} from './recipe.controller';
import { RecipeService } from './recipe.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Recipe, RecipeSchema } from './schemas/recipe.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Recipe.name, schema: RecipeSchema }]),
  ],
  controllers: [RecipesApiController, RecipesViewController],
  providers: [RecipeService, Recipe],
})
export class RecipeModule {}
