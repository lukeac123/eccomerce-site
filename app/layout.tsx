import { AppHeader } from "../components";
import { ShoppingCartStateProvider } from "../utils/ShoppingCartState";
import "./layout.css";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <ShoppingCartStateProvider>
          <AppHeader />
          <div className="layoutContent">{children}</div>
        </ShoppingCartStateProvider>
      </body>
    </html>
  );
}
