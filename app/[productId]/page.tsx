// Client side implementation
// "use client";
// import { use } from "react";
// export default function Page({ params }: string) {
//   const { productId } = use(params);
//   return <div>My Post: {productId}</div>;
// }

// Server side implementation
export default function Page({ params }: string) {
  const { productId } = params;
  return <div>My Post: {productId}</div>;
}
