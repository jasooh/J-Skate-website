import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom"

import './App.css';

// components
import Background from './components/Background';
import NavigationBar from './components/NavigationBar';
import Hero from './components/Hero';
import Login from './components/Login';
import Signup from './components/Signup';
import Account from './components/Account';
import Checkout from "./components/Checkout";

// context
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';

function App() {
  return (
    <Router>
      <AuthProvider>
        <CartProvider>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/account" element={<AccountPage />} />
            <Route path="/checkout" element={<CheckoutPage />} />
          </Routes>
        </CartProvider>
      </AuthProvider>
    </Router>
  );
}

function HomePage() {
  return (
    <Background>
      <NavigationBar />
      <Hero />
    </Background>
  );
}

function LoginPage() {
  return (
    <Background>
      <Login />
    </Background>
  );
}

function SignupPage() {
  return (
    <Background>
      <Signup />
    </Background>
  );
}

function AccountPage() {
  return (
    <Background>
      <NavigationBar />
      <Account />
    </Background>
  );
}

function CheckoutPage() {
  return (
    <Background>
      <NavigationBar />
      <Checkout />
    </Background>
  )
}

export default App;
