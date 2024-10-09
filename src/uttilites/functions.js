// Function to filter products based on search input
export function filterProducts(products, searchInput) {
  return products.filter((product) => {
    return product.display_name
      .toLowerCase()
      .includes(searchInput.toLowerCase());
  });
}

// Function to calculate discount percentage
export function calculateDiscount(originalPrice, discountedPrice) {
  let discount = originalPrice - discountedPrice;
  let discountPercentage = (discount / originalPrice) * 100;
  return Math.round(discountPercentage);
}

// Function to handle adding products to cart
export const addToCart = (product) => {
  const storedCart = JSON.parse(localStorage.getItem("cart")) || [];

  // Check if the product is already in the cart
  const findProduct = storedCart.findIndex(
    (item) => item.prod_sku === product.prod_sku
  );

  if (findProduct !== -1) {
    // Check for stock availability
    if (storedCart[findProduct].quantity >= product.qty) {
      return storedCart; // Return the same cart if quantity exceeds available stock
    } else {
      storedCart[findProduct].quantity += 1; // If product exists, increase quantity
    }
  } else {
    // If product is new, add it with a quantity property
    product.quantity = 1;
    storedCart.push(product);
  }

  // Update the cart in local storage
  localStorage.setItem("cart", JSON.stringify(storedCart));
  return storedCart;
};

// Function to get product quantity from cart
export const getProductQuantity = (prod_sku) => {
  const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
  const productInCart = storedCart.find((item) => item.prod_sku === prod_sku);
  return productInCart ? productInCart.quantity : 0;
};
