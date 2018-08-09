var RecipeApp = function () {

    var recipes = [
        { 
            id: 1,
            name: 'Best Chicken Soup!', 
            image: 'https://static01.nyt.com/images/2016/11/29/dining/recipelab-chick-noodle-still/recipelab-chick-noodle-still-master675.jpg',
            ingredients: [
                { name: 'whole chicken' },
                { name: 'medium carrots'},
                { name: 'onions' },
            ] 
        }
    ];

    var $recipes = $('.recipes');

    //id's for recipes
    var recId = 2;

    //id's for ingredients
    var ingId = 0;

    var createRecipe = function(name, image){
        var recipe = {
            name: name,
            image: image, 
            ingredients: [],
            id: recId
        };

        //keeps recipe ids unique 
        recId ++; 
        ingId = 0; //updating IngId with New Recipe
        recipes.push(recipe);
    };

    var createIngredients = function(){
        var recipe = {
            id: ingId,
            name: name
        };

        //keeps recipe ids unique 
        ingId ++; 

        recipes.ingredients.push(ingredient);
    };



    var renderRecipes = function () {
        //empty recipes div
        $recipes.empty();
        var source = $('#recipes-template').html();
        var template = Handlebars.compile(source);
        var newHTML = template(this);
        this.$('.recipes row').append(newHTML); 
        bindEvents();
        }

    return {
        recipes: recipes,
        createRecipe: createRecipe,
        renderRecipes: renderRecipes,
        createIngredients: createIngredients,
    }
};

var app = RecipeApp();
//--------EVENTS
//add a recipe
// function bindEvents() {
//     $('.close').off();
//     debugger;
//     $('.close').click("click",function () {
//      
//     });
// }

$('.add-recipe').on('click',function () {
    var name = $('#recipe-name').val();
    var image = $('#recipe-image').val();
    //add recipe to array and render
    app.createRecipe(name, image);
    app.renderRecipes();
});

$('body').on('click', '.close', function () {
    console.log("delete");
    app.removeIngredient(this);
});


