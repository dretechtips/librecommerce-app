import {
  Product,
  ProductVariation,
  Category
} from "../../interface/routes/Inventory.interface";

export const product: Product = {
  name: "Sun Glasses",
  id: "432kabdsaj4248u9abnbcak",
  categoryID: "tbijbibcaisba432478",
  description:
    "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Minima veniam consequatur dolorum pariatur sapiente enim, perspiciatis expedita necessitatibus rem, nam assumenda reiciendis labore, similique modi cum a repellat amet! Doloribus?",
  imagesURL: ["https://via.placeholder.com/300x300"],
  timestamp: "1/2/2003",
  warning: "This is a large warning sign",
  brand: "Some Randomo Sun Glass Brand",
  directions: ["Put in on", "Put in on", "Put it on"],
  ingredients: ["memem", "meme"],
  benefits: ["None"],
  tags: ["dasndosnd", "dsadobsaos", "adsabdoisbds"]
};

export const variation: ProductVariation = {
  id: "apple",
  name: "apple",
  productID: "apple",
  price: 19.2,
  imagesURL: ["https://via.placeholder.com/300x300"],
  stock: 19,
  size: "Big",
  color: "Brown",
  SKU: "fjadbofhafhabfha",
  UPC: "neiasnofbabnfofba",
  tags: ["adnodn", "dansojnasn", "dnasojnd"]
};

export const category: Category = {
  name: "Outdoor",
  id: "anoubo0uy3280yjo",
  tags: ["apple", "pear"],
  description: "Everything that is outdoor"
};
