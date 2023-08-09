import { Ingredient } from "../schemas/recipe.schema";

export class CreateRecipeDto {
    author: string;

    userAdded: string;

    dishName: string;

    description: string;

    ingredients: Ingredient[];

    steps: string[];

    tags: string[];
}