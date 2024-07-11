import { Button } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../redux/store";
import CollapseCheckbox from "../../molecules/collapse/Collapse";
import Checkbox from "../../atoms/checkbox";

import { useLocation } from "react-router-dom";
import Switch from "../../atoms/switch/Switch";
import { SplitQueryParams } from "../../../utils/convertParams";
import { useEffect } from "react";
import { getFilterProductThunk } from "../../../redux/slice/productSlice";

const FilterOptions = () => {
  const { brandList } = useSelector((state: RootState) => state.product);

  const { colorList } = useSelector((state: RootState) => state.product);
  const location = useLocation();
  const dispatch = useDispatch<AppDispatch>();
  const params = SplitQueryParams(location.search);
  useEffect(() => {
    dispatch(getFilterProductThunk(params));
  }, [dispatch, params]);

  // const filterProduct = useSelector(
  //   (state: RootState) => state.product.filterProduct
  // );
  console.log(params);

  return (
    <div className="flex flex-col flex-1">
      <div className="flex px-4 py-1 items-center ">
        <h5 className="text-xl flex-1 font-semibold ">Filters</h5>
        <Button type="text" size="small" className="text-primary px-12 py-3">
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
          />
        }
      />
      <CollapseCheckbox
        key="Color"
        label="Color"
        children={
          <Checkbox
            queryKey="color"
            options={colorList.map((item) => item.color)}
            basePath={location.pathname}
          />
        }
      />
      <Switch title="discount" basePath={location.pathname} />
    </div>
  );
};

export default FilterOptions;
