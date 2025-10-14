"use server";
import { cookies } from "next/headers";

export const setPage = async (pageNumber: string) => {
  const cookieStore = await cookies();
  cookieStore.set({
    name: "page",
    value: pageNumber,
    secure: false,
  });
};
