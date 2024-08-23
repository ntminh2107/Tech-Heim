import { useEffect, useState } from "react";
import { Button } from "antd";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import CollapseCheckbox from "../../molecules/collapse/Collapse";
import Checkbox from "../../atoms/checkbox";
import { useLocation, useNavigate } from "react-router-dom";
import Switch from "../../atoms/switch/Switch";
import { mappingSpec } from "../../../utils/mappingSpec";
import { Product } from "../../../types/Product";
import queryString from "query-string";

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

  useEffect(() => {
    const savedFilters = localStorage.getItem("filterState");
    if (savedFilters) {
      const { brands, colors, specs, discount } = JSON.parse(savedFilters);
      setCheckedBrands(brands || []);
      setCheckedColors(colors || []);
      setCheckedSpecs(specs || {});
      setSwitched(discount || false);
      filterProducts(brands, colors, specs, discount);
    } else {
      const currentParams = queryString.parse(location.search);

      const brands = currentParams.brand
        ? (currentParams.brand as string).split(",")
        : [];
      const colors = currentParams.color
        ? (currentParams.color as string).split(",")
        : [];
      const discount = currentParams.discount === "true";

      const specs = Object.keys(specProd).reduce((acc, key) => {
        if (currentParams[key]) {
          acc[key] = (currentParams[key] as string).split(",");
        } else {
          acc[key] = [];
        }
        return acc;
      }, {} as { [key: string]: string[] });

      setCheckedBrands(brands);
      setCheckedColors(colors);
      setCheckedSpecs(specs);
      setSwitched(discount);

      filterProducts(brands, colors, specs, discount);
    }
  }, [productCatList]);

  useEffect(() => {
    const handleLocationChange = () => {
      const currentParams = queryString.parse(location.search);

      const brands = currentParams.brand
        ? (currentParams.brand as string).split(",")
        : [];
      const colors = currentParams.color
        ? (currentParams.color as string).split(",")
        : [];
      const discount = currentParams.discount === "true";

      const specs = Object.keys(specProd).reduce((acc, key) => {
        if (currentParams[key]) {
          acc[key] = (currentParams[key] as string).split(",");
        } else {
          acc[key] = [];
        }
        return acc;
      }, {} as { [key: string]: string[] });

      setCheckedBrands(brands);
      setCheckedColors(colors);
      setCheckedSpecs(specs);
      setSwitched(discount);

      filterProducts(brands, colors, specs, discount);
    };

    handleLocationChange();
  }, [location.search, specProd]);

  useEffect(() => {
    saveFiltersToLocalStorage(
      checkedBrands,
      checkedColors,
      checkedSpecs,
      switched
    );
  }, [checkedBrands, checkedColors, checkedSpecs, switched]);

  const saveFiltersToLocalStorage = (
    brands: string[],
    colors: string[],
    specs: { [key: string]: string[] },
    discount: boolean
  ) => {
    const filterState = {
      brands,
      colors,
      specs,
      discount,
    };
    localStorage.setItem("filterState", JSON.stringify(filterState));
  };

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
    localStorage.removeItem("filterState");
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
    const newParams = { ...queryString.parse(location.search) };

    if (queryKey === "brand") {
      setCheckedBrands(values);
      newParams.brand = values.join(",");
    } else if (queryKey === "color") {
      setCheckedColors(values);
      newParams.color = values.join(",");
    } else {
      setCheckedSpecs((prev) => ({
        ...prev,
        [queryKey]: values,
      }));
      newParams[queryKey] = values.join(",");
    }

    const searchString = queryString.stringify(newParams);
    navigate(
      { pathname: location.pathname, search: searchString },
      { replace: true }
    );

    const newCheckedSpecs =
      queryKey !== "brand" && queryKey !== "color"
        ? { ...checkedSpecs, [queryKey]: values }
        : checkedSpecs;

    filterProducts(
      queryKey === "brand" ? values : checkedBrands,
      queryKey === "color" ? values : checkedColors,
      newCheckedSpecs,
      switched
    );

    saveFiltersToLocalStorage(
      queryKey === "brand" ? values : checkedBrands,
      queryKey === "color" ? values : checkedColors,
      newCheckedSpecs,
      switched
    );
  };

  const handleSwitchChange = (checked: boolean) => {
    setSwitched(checked);

    const newParams = { ...queryString.parse(location.search) };
    if (checked) {
      newParams.discount = "true";
    } else {
      delete newParams.discount;
    }

    const searchString = queryString.stringify(newParams);
    navigate(
      { pathname: location.pathname, search: searchString },
      { replace: true }
    );

    filterProducts(checkedBrands, checkedColors, checkedSpecs, checked);

    saveFiltersToLocalStorage(
      checkedBrands,
      checkedColors,
      checkedSpecs,
      checked
    );
  };

  const isProductPage = location.pathname === "/products";

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

      {!isProductPage &&
        Object.keys(specProd).map((key) => (
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
