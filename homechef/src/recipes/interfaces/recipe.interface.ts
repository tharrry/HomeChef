import { Ingredient } from "../schemas/recipe.schema";

export interface Recipe {
    recipeId: string;

    author: string;

    userAdded: string;

    dishName: string;

    feeds: number;

    description: string;

    ingredients: Ingredient[];

    steps: string[];

    tags: string[];
}