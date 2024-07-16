import { Button } from "antd";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import CollapseCheckbox from "../../molecules/collapse/Collapse";
import Checkbox from "../../atoms/checkbox";
import { useLocation, useNavigate } from "react-router-dom";
import Switch from "../../atoms/switch/Switch";
import { useEffect, useState } from "react";
import { mappingSpec } from "../../../utils/mappingSpec";
import { Product } from "../../../types/Product";

type FilterOptionsProps = {
  setFilteredProducts: (products: Product[]) => void;
};

const FilterOptions = ({ setFilteredProducts }: FilterOptionsProps) => {
  const { brandList, colorList, productCatList } = useSelector(
    (state: RootState) => state.product
  );
  const location = useLocation();
  const navigate = useNavigate();

  const [checkedBrands, setCheckedBrands] = useState<string[]>([]);
  const [checkedColors, setCheckedColors] = useState<string[]>([]);
  const [checkedSpecs, setCheckedSpecs] = useState<{ [key: string]: string[] }>(
    {}
  );
  const [switched, setSwitched] = useState<boolean>(false);

  const specProd = mappingSpec(productCatList);

  const clearAllFilters = () => {
    navigate({
      pathname: location.pathname,
      search: "",
    });
    setCheckedBrands([]);
    setCheckedColors([]);
    setCheckedSpecs({});
    setSwitched(false);
    setFilteredProducts(productCatList);
  };

  const filterProducts = (
    brands: string[],
    colors: string[],
    specs: { [key: string]: string[] },
    discount: boolean
  ) => {
    let filtered = productCatList;

    if (brands.length > 0) {
      filtered = filtered.filter((product) => brands.includes(product.brand));
    }

    if (colors.length > 0) {
      filtered = filtered.filter((product) => colors.includes(product.color));
    }

    if (discount) {
      filtered = filtered.filter((product) => product.discount);
    }

    Object.keys(specs).forEach((key) => {
      const values = specs[key];
      if (values.length > 0) {
        filtered = filtered.filter((product) =>
          product.specifications.some(
            (spec) => spec.key === key && values.includes(spec.value)
          )
        );
      }
    });

    setFilteredProducts(filtered);
  };

  const handleCheckedValuesChange = (queryKey: string, values: string[]) => {
    if (queryKey === "brand") {
      setCheckedBrands(values);
    } else if (queryKey === "color") {
      setCheckedColors(values);
    } else {
      setCheckedSpecs((prev) => ({
        ...prev,
        [queryKey]: values,
      }));
    }
    filterProducts(
      queryKey === "brand" ? values : checkedBrands,
      queryKey === "color" ? values : checkedColors,
      queryKey !== "brand" && queryKey !== "color"
        ? { ...checkedSpecs, [queryKey]: values }
        : checkedSpecs,
      switched
    );
  };

  const handleSwitchChange = (checked: boolean) => {
    setSwitched(checked);
    filterProducts(checkedBrands, checkedColors, checkedSpecs, checked);
  };

  return (
    <div className="flex flex-col flex-1">
      <div className="flex px-4 py-1 items-center">
        <h5 className="text-xl flex-1 font-semibold">Filters</h5>
        <Button
          type="text"
          size="small"
          className="text-primary px-12 py-3"
          onClick={clearAllFilters}
        >
          Clear all
        </Button>
      </div>
      <CollapseCheckbox
        key="brand"
        label="Brand"
        children={
          <Checkbox
            queryKey="brand"
            options={brandList.map((item) => item.name)}
            basePath={location.pathname}
            checkedValues={checkedBrands}
            onCheckedValuesChange={handleCheckedValuesChange}
          />
        }
      />
      <CollapseCheckbox
        key="color"
        label="Color"
        children={
          <Checkbox
            queryKey="color"
            options={colorList.map((item) => item.color)}
            basePath={location.pathname}
            checkedValues={checkedColors}
            onCheckedValuesChange={handleCheckedValuesChange}
          />
        }
      />
      <Switch
        title="Discount"
        basePath={location.pathname}
        checked={switched}
        onCheckedChange={handleSwitchChange}
      />

      {Object.keys(specProd).map((key) => (
        <CollapseCheckbox
          key={key}
          label={key}
          children={
            <Checkbox
              queryKey={key}
              options={specProd[key]}
              basePath={location.pathname}
              checkedValues={checkedSpecs[key] || []}
              onCheckedValuesChange={handleCheckedValuesChange}
            />
          }
        />
      ))}
    </div>
  );
};

export default FilterOptions;
