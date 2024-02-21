import { CartContextProvider } from "./store/CartContext";
import { UserProgressContextProvider } from "./store/UserProgressContext";
import { UserAuthenticationContextProvider } from "./store/userAuthenticationContext";
import * as React from "react";
import Router from "./routes/Router";
import { BrowserRouter } from "react-router-dom";

function App() {
  return (
    <UserProgressContextProvider>
      <CartContextProvider>
        <UserAuthenticationContextProvider>
          <BrowserRouter>
            <Router />
          </BrowserRouter>
        </UserAuthenticationContextProvider>
      </CartContextProvider>
    </UserProgressContextProvider>
  );
}

export default App;
