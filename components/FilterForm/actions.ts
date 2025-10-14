"use server";
import { cookies } from "next/headers";

export const setNewCategory = async (newCategory: string) => {
  const cookieStore = await cookies();
  cookieStore.set({
    name: "category",
    value: newCategory,
    secure: true,
  });
};
