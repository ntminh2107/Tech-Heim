import { Product } from "../types/Product";

export type MappingSpecifications = {
  [key: string]: string[];
};

export const mappingSpec = (products: Product[]): MappingSpecifications => {
  // Temporary object to hold Set<string> values
  const tempMappedSpec: { [key: string]: Set<string> } = {};
  const mappedSpec: MappingSpecifications = {};

  products.forEach((product) => {
    product.specifications.forEach((spec) => {
      if (!tempMappedSpec[spec.key]) {
        tempMappedSpec[spec.key] = new Set<string>();
      }
      tempMappedSpec[spec.key].add(spec.value);
    });
  });

  // Convert sets to arrays
  for (const key in tempMappedSpec) {
    if (Object.prototype.hasOwnProperty.call(tempMappedSpec, key)) {
      mappedSpec[key] = Array.from(tempMappedSpec[key]);
    }
  }

  return mappedSpec;
};
