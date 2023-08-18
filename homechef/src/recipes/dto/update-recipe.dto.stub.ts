import { UpdateRecipeDto } from "./update-recipe.dto";

export const UpdateRecipeDtoStub = (): UpdateRecipeDto => {
  return {
    author: "Test Author",
    userAdded: "Test User",
    dishName: "Test Dish",
    feeds: 4,
    description: "Test description",
    ingredients: [
        {
            name: "Test ingredient 1",
            quantity: 1,
            unit: "pcs"
        },
        {
            name: "Test ingredient 2",
            quantity: 2,
            unit: "tbsp"
        }
    ],
    steps: ["Test step 1","Test step 2"],
    tags: ["Test tag 1", "Test tag 2"]
  };
};