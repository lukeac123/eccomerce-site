import "./globals.css";
import { AppHeader } from "../components";
import { ShoppingCartStateProvider } from "../utils/ShoppingCartState";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <title>Eccomerce Website</title>
      </head>
      <body>
        <ShoppingCartStateProvider>
          <AppHeader />
          {children}
        </ShoppingCartStateProvider>
      </body>
    </html>
  );
}
