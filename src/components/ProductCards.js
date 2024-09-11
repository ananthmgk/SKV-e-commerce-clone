const ProductCards = (props) => {
  return (
    <div className="product-card">
      <div className="discount-badge">{props.discountPercentage}% off</div>
      <div className="product-image">
        <img
          src={props.product.product_variants[0].thumbnail}
          alt={props.product.product_variants[0].thumbnail}
        />
      </div>
      <div className="product-details">
        <h3>{props.product.product_variants[0].display_name}</h3>
        <p className="price">
          ₹{props.product.product_variants[0].sale_price}
          <span>₹{props.product.product_variants[0].mrp}</span>
        </p>
      </div>
      {props.product.product_variants[0].qty === 0 ? (
        <p>Out of Stock</p>
      ) : (
        <button className="add-to-cart-btn">Add to Cart</button>
      )}
    </div>
  );
};

export default ProductCards;
