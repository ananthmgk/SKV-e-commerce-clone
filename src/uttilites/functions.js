export function filterProducts(products, searchInput) {
  return products.filter((product) => {
    return product.display_name
      .toLowerCase()
      .includes(searchInput.toLowerCase());
  });
}

export function calculateDiscount(originalPrice, discountedPrice) {
  let discount = originalPrice - discountedPrice;
  let discountPercentage = (discount / originalPrice) * 100;
  return Math.round(discountPercentage);
}
