import { Document } from 'mongoose';
import { Ingredient } from '../schemas/recipe.schema';

export interface RecipeDoc extends Document {
  author: string;

  userAdded: string;

  dishName: string;

  feeds: number;

  description: string;

  ingredients: Ingredient[];

  steps: string[];

  tags: string[];
}
