import { Injectable } from '@nestjs/common';
import { RecipeService } from './recipes/recipe.service';

@Injectable()
export class AppService {
  private readonly recipeService: RecipeService;
  getHello(): string {
    return 'Hello World!';
  }
}
