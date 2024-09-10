import { useParams } from "react-router-dom";

const ProductsMenu = () => {
  const params = useParams();
  console.log(params.ProductId);

  return (
    <div>
      <h1>Products</h1>
    </div>
  );
};

export default ProductsMenu;
