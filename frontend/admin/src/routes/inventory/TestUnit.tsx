import {
  Product,
  ProductVariation
} from "../../interface/routes/Inventory.interface";

export const product: Product = {
  name: "Sun Glasses",
  id: "432kabdsaj4248u9abnbcak",
  categoryID: "tbijbibcaisba432478",
  description:
    "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Minima veniam consequatur dolorum pariatur sapiente enim, perspiciatis expedita necessitatibus rem, nam assumenda reiciendis labore, similique modi cum a repellat amet! Doloribus?",
  imagesURL: ["https://via.placeholder.com/300x300"]
};

export const variation: ProductVariation = {
  id: "apple",
  name: "apple",
  productID: "apple",
  price: 19.2,
  imagesURL: ["https://via.placeholder.com/300x300"],
  stock: 19
};
