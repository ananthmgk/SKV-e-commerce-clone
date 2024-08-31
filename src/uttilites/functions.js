export function filterProducts(products, searchInput) {
  return products.filter((product) => {
    return product.display_name
      .toLowerCase()
      .includes(searchInput.toLowerCase());
  });
}
