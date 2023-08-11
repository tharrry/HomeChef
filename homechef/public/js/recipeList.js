async function getRecipes() {
    const response = await fetch("api/recipes");
    const recipes = await response.json();
    return recipes;
}

function buildHTMLForRecipes(recipes) {

    let recipeDiv = document.querySelector('#recipes');
    
    let list = document.createElement("ul");
    let recipe;
    let dishName;
    let author;
    let link;

    recipes.forEach(elem => {
        recipe = document.createElement("li");
        dishName = document.createElement("h2");
        author = document.createElement("p");
        recipe.classList.add("recipe");
        dishName.classList.add("dishName");
        author.classList.add("author");

        dishName.innerText = elem.dishName;
        author.innerText = elem.author;

        recipe.appendChild(dishName);
        recipe.appendChild(author);
        list.appendChild(recipe);

        link = "http://"
        + window.location.hostname
        + ":3000/recipes/"
        + elem.recipeId;

        recipe.addEventListener("click", function () {
            window.location.assign(link);
        });

        recipe.style.cursor = "pointer";
    });
    recipeDiv.appendChild(list);
}

async function printRecipes() {
    const recipes = await getRecipes();
    buildHTMLForRecipes(recipes);
}

printRecipes();