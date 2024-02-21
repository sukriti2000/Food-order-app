const {createMeal,getAllMeals} = require('../../models/meals.model')

const postData= async(req,res)=>{
   
    try {
       
        const response = await createMeal(req.body);  
        if (response) {
          return res.status(200).json(response.status);
        }
      } catch (error) {
        // Handle any errors that occur during the meal creation process
        console.error('Error creating meal:', error);
        return res.status(500).json({ error: 'Internal Server Error' });
      }

}

const getAllData= async(req,res)=>{
   
    try {
        const meals = await getAllMeals();  
        if (meals) {
          return res.status(200).json(meals);
        }
      } catch (error) {
        // Handle any errors that occur during the process
        console.error('Error retrieving meals:', error);
        return res.status(500).json({ error: 'Internal Server Error' });
      }
}

module.exports={
    postData,
    getAllData
}