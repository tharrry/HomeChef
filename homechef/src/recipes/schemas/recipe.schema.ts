import { Schema, Prop, SchemaFactory } from "@nestjs/mongoose";
import { Schema as MongooseSchema } from 'mongoose';

export type RecipeDocument = Recipe & Document;

@Schema()
export class Recipe {
    @Prop()
    recipeId: string;

    @Prop()
    author: string;

    @Prop()
    userAdded: string;

    @Prop()
    dishName: string;

    @Prop()
    description: string;

    @Prop({ type: MongooseSchema.Types.Array})
    ingredients: Ingredient[];

    @Prop([String])
    steps: string[];

    @Prop([String])
    tags: string[];
  }
  
// Define the Ingredient class (a custom object for ingredients)
export class Ingredient {
    name: string;
    quantity: number;
    unit: string;
}

export const RecipeSchema = SchemaFactory.createForClass(Recipe);