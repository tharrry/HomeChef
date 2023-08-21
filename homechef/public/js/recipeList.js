async function getRecipes() {
    const response = await fetch("api/recipes");
    const recipes = await response.json();
    return recipes;
}

function buildHTMLForRecipes(recipes) {
    let recipeDiv = document.querySelector('#recipes');
    
    let list = document.createElement("ul");

    recipes.forEach(elem => {
        let recipe = document.createElement("li");
        let dishName = document.createElement("h2");
        let author = document.createElement("p");
        recipe.classList.add("recipe");
        dishName.classList.add("dishName");
        author.classList.add("author");
        recipe.setAttribute('id', elem._id);

        dishName.innerText = elem.dishName;
        author.innerText = elem.author;

        recipe.appendChild(dishName);
        recipe.appendChild(author);
        list.appendChild(recipe);

        recipe.addEventListener("click", function (event) {
            let link = `http://${window.location.hostname}:3000/recipes/${elem._id}`;
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