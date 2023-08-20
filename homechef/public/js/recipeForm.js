let INGREDIENT;

async function getReferenceRecipe() {
    const url = "http://" + window.location.hostname + ":3000/api/recipes/formReference"
    const response = await fetch(url);
    const recipe = await response.json();
    return recipe;
}

function addNextIngredient(fieldset) {
    let outerFieldset = document.querySelector("#ingredients");
    let emptyChildren = 0;

    outerFieldset.childNodes.forEach(childfieldset => {
        if (childfieldset.tagName != 'LEGEND') {
            let allChildrenEmpty = true;
            childfieldset.childNodes.forEach(child => {
                if (child.tagName === 'INPUT') {
                    if (!child.value == '') {
                        allChildrenEmpty = false;
                    }
                }
            });
            if (allChildrenEmpty == true) {
                emptyChildren += 1;
            }
        }
    });

    if (emptyChildren < 1 ) {
        addInputForIngredient(true);
    }
}

function createIngredientLabelAndInput(elem) {
    let input = document.createElement('input');
    input.setAttribute("name", elem);
    
    let label = document.createElement('label');
    label.setAttribute("for",elem);
    label.innerText = elem[0].toUpperCase() + elem.substring(1);
    
    if (typeof(INGREDIENT[elem]) == 'string') {
        input.setAttribute("type", 'text');
    }
    if (typeof(INGREDIENT[elem]) == 'number') {
        input.setAttribute("type", 'number');
    }
    return [label, input];
}

function addInputForIngredient(addDelete) {
    let button = document.createElement('button');

    let outerFieldset = document.querySelector("#ingredients");
    const children = outerFieldset.children.length;

    let legend = document.createElement('legend');
    legend.innerText = `Ingredient:`;
    
    let fieldset = document.createElement('fieldset');
    fieldset.setAttribute('id', `fieldset${children}`);
    fieldset.appendChild(legend);
    
    Object.keys(INGREDIENT).forEach(elem => {
        let [label, input] = createIngredientLabelAndInput(elem);
        
        fieldset.appendChild(label);
        fieldset.appendChild(input);
    });

    outerFieldset.appendChild(fieldset);
    fieldset.addEventListener('change', function () {
        addNextIngredient(fieldset);
    });

    if (addDelete) {
        button.innerText = 'Delete';
        fieldset.appendChild(button);
        button.setAttribute('type', 'button');
        button.addEventListener('click', function(event){
            event.preventDefault();
            console.log('wha');
            fieldset.remove();
        });
    }
}

function addInputForIngredients(form, attrName, recipe) {

    INGREDIENT = recipe[attrName][0];

    let outerLegend = document.createElement('legend');
    outerLegend.innerText = 'Ingredients:';

    let outerFieldset = document.createElement('fieldset');
    outerFieldset.setAttribute('id', 'ingredients');
    outerFieldset.appendChild(outerLegend);
    form.appendChild(outerFieldset);

    addInputForIngredient(false);
}

function moveStep(elem, dir) {
    let fieldset = elem.parentNode;

    if (dir == 'up' && fieldset.previousElementSibling ) {
        let prevFieldset = fieldset.previousElementSibling;
        if (prevFieldset.tagName == 'FIELDSET') {
            let curStep = fieldset.childNodes[1].value;
            fieldset.childNodes[1].value = prevFieldset.childNodes[1].value;
            prevFieldset.childNodes[1].value = curStep;
        }
    }

    if (dir == 'down' && fieldset.nextElementSibling ) {
        let nextFieldset = fieldset.nextElementSibling;
        if (nextFieldset.tagName == 'FIELDSET') {
            let curStep = fieldset.childNodes[1].value;
            fieldset.childNodes[1].value = nextFieldset.childNodes[1].value;
            nextFieldset.childNodes[1].value = curStep;
        }
    }
}

function createTextArrayInputWithLabel (attrName, index) {
    let label = document.createElement('label');
    let labelName = attrName.substring(0, attrName.length - 1) + index;
    label.innerText = 
        `${attrName[0].toUpperCase()}${attrName.substring(1,attrName.length-1)} ${index}: `;
    label.setAttribute("for",labelName);

    let input = document.createElement('input');
    input.setAttribute("type", "text");
    input.setAttribute("id", labelName);
    input.setAttribute("name", labelName);

    return [label, input];
}

function getInputOfTextFieldset(fieldset) {
    let input = undefined;
    fieldset.childNodes.forEach(child => {
        if (child.tagName === 'INPUT') {
            input = child;
        }
    });
    return input;
}

function addUpDownButtons(fieldset) {
    let buttonUp = document.createElement('button');
    buttonUp.setAttribute('type', 'button');
    buttonUp.setAttribute('value', 'Up');
    buttonUp.innerText = 'Up';
    let buttonDown = document.createElement('button');
    buttonDown.setAttribute('type', 'button');
    buttonDown.setAttribute('value', 'Down');
    buttonDown.innerText = 'Down';
    fieldset.appendChild(buttonUp);
    fieldset.appendChild(buttonDown);
    buttonUp.addEventListener('click', function(event){
        event.preventDefault();
        moveStep(event.target, 'up');
    });
    buttonDown.addEventListener('click', function(event){
        event.preventDefault();
        moveStep(event.target, 'down');
    });
}

function addTextInput(outerFieldset, attrName) {
    let fieldset = document.createElement('fieldset');

    let [label, input] = createTextArrayInputThings(attrName, outerFieldset.childNodes.length);

    fieldset.appendChild(label);
    fieldset.appendChild(input);

    if (attrName != 'tags') {
        addUpDownButtons(fieldset)
        
    }
    
    outerFieldset.appendChild(fieldset);

    input.addEventListener("input", (event) => {
        const outer = event.target.parentNode.parentNode;
        const lastSet = outer.childNodes[outer.childNodes.length-1];
        if (event.target == getInputOfTextFieldset(lastSet)) {
            if (event.target.value != '') {
                addTextInput(outerFieldset, attrName);
            }
        }
    });
}

function addInputForStringArray(form, attrName) {
    let legend = document.createElement('legend');
    legend.innerText = attrName[0].toUpperCase() + attrName.substring(1);
    
    let fieldset = document.createElement('fieldset');
    fieldset.setAttribute('id', attrName);

    fieldset.appendChild(legend);

    addTextInput(fieldset, attrName);

    form.appendChild(fieldset);
}

function addInputForComplexAttr(form, attrName, recipe) {
    let attrValue = recipe[attrName];
    if (attrName == 'ingredients') {
        addInputForIngredients(form, attrName, recipe);
    }
    if (typeof(attrValue[0]) == 'string') {
        addInputForStringArray(form, attrName);
    }
}

function addInputForSimpleAttr(form, attrName, recipe) {
    let attrValue = recipe[attrName];

    let label = document.createElement('label');
    label.setAttribute("for",attrName);
    label.innerText = attrName[0].toUpperCase() + attrName.substring(1);

    let input = document.createElement('input');
    input.setAttribute("id", attrName);
    input.setAttribute("name", attrName);

    if (typeof(attrValue) == 'string') {
        input.setAttribute("type", "text");
    }
    if (typeof(attrValue) == 'number') {
        input.setAttribute("type", "number");
    }

    form.appendChild(label);
    form.appendChild(input);
}

function addInputForAttr(form, attrName, recipe) {

    let attrValue = recipe[attrName];

    if (typeof(attrValue) == 'string' || typeof(attrValue) == 'number') {
        addInputForSimpleAttr(form, attrName, recipe);
    }
    
    if (typeof(attrValue) == 'object') {
        addInputForComplexAttr(form, attrName, recipe);
    }
}

function addSubmitButton(form) {
    let input = document.createElement('input');
    input.setAttribute('type', 'submit');
    input.setAttribute('name', 'submit');
    input.setAttribute('value', 'Add Recipe');
    form.appendChild(input);
}

function buildForm(form, recipe) {
    Object.keys(recipe).forEach(elem => {
        addInputForAttr(form, elem, recipe);
    });
    addSubmitButton(form);
}

async function prepareForm() {
    let form = document.querySelector('#createrecipeform');
    const reference = await getReferenceRecipe();
    buildForm(form, reference);
}

prepareForm()