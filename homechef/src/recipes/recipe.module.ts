import { Module } from "@nestjs/common";
import { RecipesApiController, RecipesViewController } from "./recipe.controller";
import { RecipeService } from "./recipe.service";
import { MongooseModule } from "@nestjs/mongoose";
import { Recipe, RecipeSchema } from "./schemas/recipe.schema";
import { RecipeRepository } from "./recipe.repository";

@Module({
    imports: [MongooseModule.forFeature([
        { name: Recipe.name, schema: RecipeSchema}
    ])],
    controllers: [RecipesApiController, RecipesViewController],
    providers: [RecipeService, RecipeRepository]
})

export class RecipeModule {}


//https://www.youtube.com/watch?v=hvbIGDlrGJk