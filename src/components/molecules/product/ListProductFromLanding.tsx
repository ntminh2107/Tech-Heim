import { useEffect, useState } from "react";
import { Product } from "../../../types/Product";
import { cn } from "../../../utils/utils";
import ProductCard from "../../atoms/cards/product/ProductCard";
import { Pagination } from "antd";

type Props = {
  productList: Product[];
  className?: string;
};

const ListProductFromLanding = ({ productList, className }: Props) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const [productPerPage, setProductPerPage] = useState(4);

  const indexOfLastProduct = currentPage * productPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productPerPage;
  const currentProducts = productList.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  useEffect(() => {
    const handleResize = () => {
      const screenWidth = window.innerWidth;
      switch (true) {
        case screenWidth < 1024 && screenWidth >= 768:
          setProductPerPage(3);
          break;
        case screenWidth < 768 && screenWidth >= 360:
          setProductPerPage(3);
          break;
        default:
          setProductPerPage(4);
          break;
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const onPageChange = (page: number) => {
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentPage(page);
      setIsTransitioning(false);
    }, 300); // Match this duration with your CSS transition duration
  };

  return (
    <div>
      <div
        className={cn(
          `grid gap-6 lg:gap-3 transition-opacity duration-300 ${
            isTransitioning ? "opacity-0" : "opacity-100"
          }`,
          className,
          `sm:grid-cols-${productPerPage} md:grid-cols-${productPerPage} grid-cols-4 sm:grid-cols-3`
        )}
      >
        {currentProducts?.map((product) => {
          return (
            <ProductCard
              color={product.color}
              key={product.id}
              name={product.name}
              id={product.id}
              image={product.image}
              price={product.price}
              rating={product.rating}
              favorite={product.favorite}
              percent={product.percent}
              salePrice={product.salePrice}
            />
          );
        })}
      </div>
      <div className="flex justify-center mt-[33px] mb-14">
        <Pagination
          current={currentPage}
          pageSize={productPerPage}
          total={productList.length}
          onChange={onPageChange}
          className="items-center"
        />
      </div>
    </div>
  );
};

export default ListProductFromLanding;
