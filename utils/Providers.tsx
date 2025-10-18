"use client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactNode } from "react";
import { ShoppingCartStateProvider } from "./ShoppingCartState";

const queryClient = new QueryClient();

export const Providers = ({ children }: { children: ReactNode }) => {
  return (
    <ShoppingCartStateProvider>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </ShoppingCartStateProvider>
  );
};
