import React, { useState, useMemo } from "react";
import ProductCard from "./ProductCard";
import SearchBox from "./SearchBox";
import Dropdown from "./Dropdown";

const sortList = ["Popularity", "Price Low to High", "Price High to Low"];

export default function ProductListings({ products }) {
  const [searchText, setSearchText] = useState("");
  const [selectedSort, setSelectedSort] = useState("Popularity");

  const filteredAndSortedProducts = useMemo(() => {
    if (!Array.isArray(products)) {
      return [];
    }

    let filteredProducts = products.filter(
      (product) =>
        product.name.toLowerCase().includes(searchText.toLowerCase()) ||
        product.description.toLowerCase().includes(searchText.toLowerCase()),
    );

    return filteredProducts.slice().sort((a, b) => {
      switch (selectedSort) {
        case "Price Low to High":
          return parseFloat(a.price) - parseFloat(b.price);
        case "Price High to Low":
          return parseFloat(b.price) - parseFloat(a.price);
        case "Popularity":
        default:
          return parseInt(b.popularity) - parseInt(a.popularity);
      }
    });
  }, [products, searchText, selectedSort]);

  function handleSearchChange(inputSearch) {
    setSearchText(inputSearch);
  }

  function handleSortChange(sortType) {
    setSelectedSort(sortType);
  }

  return (
    <div>
      <div className="flex flex-col sm:flex-row justify-between items-center gap-6 pb-8">
        <SearchBox
          label="Search"
          placeholder="Search products..."
          value={searchText}
          handleSearch={(value) => handleSearchChange(value)}
        />
        <Dropdown
          label="Sort by"
          options={sortList}
          value={selectedSort}
          handleSort={(value) => handleSortChange(value)}
        />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-y-10 gap-x-8">
        {filteredAndSortedProducts.length > 0 ? (
          filteredAndSortedProducts.map((product) => (
            <ProductCard key={product.productId} product={product} />
          ))
        ) : (
          <div className="col-span-full text-center py-20">
            <p className="font-primary font-bold text-2xl text-gray-400 dark:text-gray-500">
              No products found
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
