const orderDatabase = require('./orders.mongo');

 function generateRandomId(){
    return (Math.random() * 1000).toString();
 }
async function createOrder(Order){
    
  const customerData = Order.order.customer
  console.log(customerData)
  const itemList = Order.order.items;
  

  //checking the information of customer
  if (
    customerData.email === null ||
    !customerData.email.includes('@') ||
    customerData.name === null ||
    customerData.name.trim() === '' ||
    customerData.street === null ||
    customerData.street.trim() === '' ||
    customerData['postal-code'] === null ||
    customerData['postal-code'].trim() === '' ||
    customerData.city === null ||
    customerData.city.trim() === ''
  ) {
    return res.status(400).json({
      message:
        'Missing data: Email, name, street, postal code or city is missing.',
    });
  }

  const newOrder = new orderDatabase()
  newOrder.customer.email=customerData.email
  newOrder.customer.name=customerData.name
  newOrder.customer.city=customerData.city
  newOrder.customer.postalCode=customerData['postal-code']
  newOrder.customer.street=customerData.street
  newOrder.id=generateRandomId();

  newOrder.items=itemList;

  const result = await newOrder.save();

   return {status : true};


} 

async function getOrdersByEmail(email){
    try {

        const orders = await orderDatabase.find({ 'customer.email': email });
        
        return {status: true,order:orders};
      } catch (error) {
        // Handle any errors that occur during the database query
        console.error('Error retrieving orders:', error);
        throw error;
      }
}

module.exports={
    createOrder,
    getOrdersByEmail
  }