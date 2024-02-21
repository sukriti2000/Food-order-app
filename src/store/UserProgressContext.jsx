import { createContext, useState } from "react";
const UserProgressContext= createContext({
    progress:'',
    showcart:()=>{},
    hideCart:()=>{},
    showCheckout:()=>{},
    hideCheckout:()=>{}
});

export function UserProgressContextProvider({children}){
    const [userProgress,setUserProgress] = useState('');
    function showcart(){
      
        setUserProgress('cart');
    }
    function hideCart(){
        setUserProgress('');
    }
    function showCheckout(){
        setUserProgress('checkout');
    }
    function hideCheckout(){
        setUserProgress('');
    }
    const userProgressCtx={
        progress: userProgress,
        showcart,
        hideCart,
        showCheckout,
        hideCheckout
    }
  return (
    <UserProgressContext.Provider value={userProgressCtx}>{children}</UserProgressContext.Provider>
  )
}

export default UserProgressContext;