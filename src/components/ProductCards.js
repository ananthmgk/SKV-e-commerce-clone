const ProductCards = (props) => {
  return (
    <div className="product-card">
      <div className="discount-badge">{props.discountPercentage}% off</div>
      <img
        src={props.product.product_variants[0].thumbnail}
        alt={props.product.product_variants[0].name}
      />
      <h3>{props.product.product_variants[0].display_name}</h3>
      <p className="price">
        ₹{props.product.product_variants[0].sale_price}
        <span>₹{props.product.product_variants[0].mrp}</span>
      </p>
      <button className="add-to-cart">Add to Cart</button>
    </div>
  );
};

export default ProductCards;
