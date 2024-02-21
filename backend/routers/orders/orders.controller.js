const {createOrder,getOrdersByEmail} = require('../../models/orders.model')

const postOrder = async(req,res)=>{
    console.log('Received request body:'+ req.body);
    try{
        const response= await createOrder(req.body)

        if(response.status){
            return res.status(200).json(response.status);
        }
    }
    catch (error) {
        // Handle any errors that occur during the order creation process
        console.error('Error creating Order:', error);
        return res.status(500).json({ error: 'Internal Server Error' });
      }
}


const fetchOrderByEmail= async(req,res)=>{
    try{
        const {email} = req.body
        const response= await getOrdersByEmail(email)

        if(response){
            return res.status(200).json(response.order);
        }
    }
    catch (error) {
        // Handle any errors that occur during the order fetching process
        console.error('Error fetching Order:', error);
        return res.status(500).json({ error: 'Internal Server Error' });
      }
}

module.exports={
    postOrder,
    fetchOrderByEmail
}