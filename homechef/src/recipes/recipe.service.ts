import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
//import { v4 as uuidv4 } from 'uuid';
import { Recipe } from './schemas/recipe.schema';
import { UpdateRecipeDto } from './dto/update-recipe.dto';
import mongoose from 'mongoose';

@Injectable()
export class RecipeService {
  constructor(
    @InjectModel(Recipe.name) private recipeModel: mongoose.Model<Recipe>,
  ) {}

  async getRecipeByID(recipeId: string): Promise<Recipe> {
    const isValidId = mongoose.isValidObjectId(recipeId);
    if (!isValidId) {
      throw new BadRequestException('Incorrect recipeId.');
    }

    const recipe = await this.recipeModel.findById(recipeId);

    if (!recipe) {
      throw new NotFoundException('Recipe not found.');
    }

    return recipe;
  }

  async getRecipes(): Promise<Recipe[]> {
    const recipes = await this.recipeModel.find({});
    return recipes;
  }

  async createRecipe(recipe: Recipe): Promise<Recipe> {
    const result = await this.recipeModel.create(recipe);
    return result;
  }

  async updateRecipe(
    recipeId: string,
    recipe: UpdateRecipeDto,
  ): Promise<Recipe> {
    return await this.recipeModel.findByIdAndUpdate(recipeId, recipe, {
      new: true,
      runValidators: true,
    });
  }

  async deleteRecipe(recipeId: string): Promise<any> {
    return await this.recipeModel.findByIdAndDelete(recipeId);
  }
}
