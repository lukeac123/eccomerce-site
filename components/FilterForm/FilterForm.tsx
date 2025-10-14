"use client";
import { useState, useEffect, startTransition } from "react";
import "./FilterForm.css";
import { setNewCategory } from "./actions";

export const FilterForm = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>("");

  const [categories, setCategories] = useState<[] | null>();

  useEffect(() => {
    async function getCategories() {
      try {
        const response = await fetch(
          "https://dummyjson.com/products/categories"
        );
        if (!response.ok) {
          console.error(`Error loading categories ${response.status}`);
        }
        const data = await response.json();
        setCategories(data);
      } catch (error: unknown) {
        if (error instanceof Error) {
          console.error(
            `Error in categories fetch, ProductGrid.tsx, ${error.message}`
          );
        }
      }
    getCategories();
  }, []);

  const handleFilterChange = (selectedCategory: string) => {
    setSelectedCategory(selectedCategory);
    startTransition(() => {
      setNewCategory(selectedCategory);
    });
  };

  return (
    <>
      <div>
        {categories &&
          categories.map((category: { name: string; slug: string }) => {
            return (
              <div key={category.name}>
                <input
                  id={category.slug}
                  name={category.slug}
                  value={category.slug}
                  type="checkbox"
                  checked={selectedCategory === category.slug}
                  onChange={(event) => handleFilterChange(event.target.value)}
                />
                <label htmlFor={category.name}>{category.name}</label>
              </div>
            );
          })}
        <button onClick={() => handleFilterChange("")}>Reset</button>
      </div>
    </>
  );
};
