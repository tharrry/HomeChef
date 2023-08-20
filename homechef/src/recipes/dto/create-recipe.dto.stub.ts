import { CreateRecipeDto } from "./create-recipe.dto";

export const CreateRecipeDtoStub = (): CreateRecipeDto => {
  return {
    author: "Reference Author",
    userAdded: "Reference User",
    dishName: "Reference Dish",
    feeds: 4,
    description: "Reference description",
    ingredients: [
        {
            name: "Reference ingredient 1",
            quantity: 1,
            unit: "pcs"
        },
        {
            name: "Reference ingredient 2",
            quantity: 2,
            unit: "tbsp"
        }
    ],
    steps: ["Reference step 1","Reference step 2"],
    tags: ["Reference tag 1", "Reference tag 2"]
  };
};