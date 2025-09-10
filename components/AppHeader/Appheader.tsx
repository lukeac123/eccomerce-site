import { ShoppingCart } from "../ShoppingCart";
import "./Appheader.css";
export const AppHeader = () => {
  return (
    <header className="header">
      <h1 className="headerTitle">Eccomerce Product Page</h1>
      <ShoppingCart />
    </header>
  );
};
