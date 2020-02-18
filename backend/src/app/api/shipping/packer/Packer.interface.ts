import DimensionSchema from "src/app/common/model/schema/Dimension.schema";
import WeightSchema from "src/app/common/model/schema/Weight.schema";

export interface Packable {
  dimensions: DimensionSchema;
  weight: WeightSchema;
}

export interface PackInto {
  dimensions: DimensionSchema;
  maxWeight?: WeightSchema;
}
