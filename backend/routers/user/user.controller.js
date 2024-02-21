const {login,register} = require('../../models/user.model')

const LoginUser=async(req,res)=>{
    try{
        const response= await login(req.body);
        if(response)
        return res.status(200).json(response)
    }catch(error){
        return res.status(500).json({error:'Internal server error can not login user'})
    }
   
}

const ResgisterUser= async (req,res)=>{
    try{
       
        const registerInfo = req.body;
        
        const response= await register(registerInfo)
        console.log(response)
        if(response.token) return res.status(200).json(response)
        else return res.status(500).json(response)
    }catch(error){
        return res.status(500).json({error:'Internal server error can not register'})
    }

}

module.exports={
    LoginUser,
    ResgisterUser
}