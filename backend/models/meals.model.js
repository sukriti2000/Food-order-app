const mealsDatabase = require('./meals.mongo')

async function createMeal(meal){
    console.log(meal);
    try{
        const newMeal = new mealsDatabase();
        newMeal.id = meal.id
        newMeal.name = meal.name
        newMeal.price = meal.price
        newMeal.description = meal.description
        newMeal.image = meal.image
        const result = await newMeal.save();
        return {status : true};
    }catch(error){
        console.log(error);
        return error.message;
    }
}

async function getAllMeals(){
    const meals = await mealsDatabase.find();
    return meals;
}

module.exports={
    createMeal,
    getAllMeals,
}