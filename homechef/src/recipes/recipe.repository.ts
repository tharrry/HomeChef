import { Injectable } from "@nestjs/common";
import { InjectModel} from "@nestjs/mongoose";
import { Recipe, RecipeDocument } from "./schemas/recipe.schema";
import { FilterQuery, Model } from "mongoose";


@Injectable()
export class RecipeRepository {
    constructor(@InjectModel(Recipe.name) private recipeModel: Model<RecipeDocument>) {}

    async findOne(recipeFilterQuery: FilterQuery<Recipe>): Promise<Recipe> {
        return this.recipeModel.findOne(recipeFilterQuery);
    }

    async find(recipeFilterQuery: FilterQuery<Recipe>): Promise<Recipe[]> {
        return this.recipeModel.find(recipeFilterQuery);
    }

    async create(recipe: Recipe): Promise<Recipe> {
        const newRecipe = new this.recipeModel(recipe);
        return newRecipe.save();
    }

    async findOneAndUpdate(recipeFilterQuery: FilterQuery<Recipe>, recipe: Partial<Recipe>): Promise<Recipe> {
        return this.recipeModel.findByIdAndUpdate(recipeFilterQuery, recipe);
    }

    async findOneAndDelete(recipeFilterQuery: FilterQuery<Recipe>): Promise<any> {
        return this.recipeModel.deleteOne(recipeFilterQuery);
    }

}