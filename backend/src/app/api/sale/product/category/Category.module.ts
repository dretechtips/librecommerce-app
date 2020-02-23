import { Module } from "@nestjs/common";
import CategoryController from "./Category.controller";

@Module({
  controllers: [CategoryController]
})
export class CategoryModule {}

export default CategoryModule;
