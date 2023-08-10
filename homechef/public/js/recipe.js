async function getRecipe() {
    const hostname = window.location.hostname;
    const id = window.location.pathname.split('/')[2];
    const response = await fetch("http://" + hostname + ":3000/api/recipes/" + id);
    const recipe = await response.json();
    console.log(recipe)
    return recipe;
}

function displayIngredients(recipe) {
    let table = document.getElementById("ingredients-table");
    recipe.ingredients.forEach(elem => {
        let row = document.createElement("tr");
        let name = document.createElement("th");
        let quantity = document.createElement("th");
        let unit = document.createElement("th");
        name.innerText = elem.name;
        quantity.innerText = elem.quantity;
        unit.innerText = elem.unit;

        row.appendChild(name);
        row.appendChild(quantity);
        row.appendChild(unit);

        table.appendChild(row);
    });
}

function displaySteps(recipe) {
    let steps = document.getElementById("steps-list");
    recipe.steps.forEach(step => {
        const item = document.createElement("li");
        item.innerText = step;
        steps.appendChild(item);
    });
}

function displayTags(recipe) {
    let tags = document.getElementById("tags-list");
    recipe.tags.forEach(tag => {
        const item = document.createElement("li");
        item.innerText = tag;
        tags.appendChild(item);
    });
}

function buildHTMLForRecipe(recipe) {

    console.log(document.getElementById("dishName"))
    
    document.getElementById("dishName").innerHTML = recipe.dishName;
    document.getElementById("author").innerText += recipe.author;
    document.getElementById("userAdded").innerText += recipe.userAdded;
    //document.getElementById("feeds").innerHTML = recipe.feeds;
    document.getElementById("description").innerHTML = recipe.description;

    displayIngredients(recipe);
    displaySteps(recipe);
    displayTags(recipe);
}

async function printRecipe() {

    console.log("Hi")

    const recipe = await getRecipe();
    buildHTMLForRecipe(recipe);

}

printRecipe();