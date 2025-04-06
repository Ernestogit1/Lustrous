import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Image, TouchableOpacity, ActivityIndicator, TextInput, ScrollView, Animated } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { getAllProducts } from '../../redux/actions/user.Actions';
import { addToCart } from '../../redux/actions/order.Actions';
import { Ionicons } from '@expo/vector-icons';
import { useIsFocused } from '@react-navigation/native';
import styles, { COLORS } from '../style/client/ProductsScreen.styles';

const ProductsScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const isFocused = useIsFocused(); 
  const { loading, products, error } = useSelector((state) => state.productDetails);
  const userInfo = useSelector((state) => state.userLogin?.userInfo);

  const [searchQuery, setSearchQuery] = useState(''); 
  const [filteredProducts, setFilteredProducts] = useState([]); 
  const [minPrice, setMinPrice] = useState(''); 
  const [maxPrice, setMaxPrice] = useState(''); 
  const [categories, setCategories] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState({});
  
  const [isPriceDropdownOpen, setIsPriceDropdownOpen] = useState(false);
  const [isCategoryDropdownOpen, setIsCategoryDropdownOpen] = useState(false);
  
  useEffect(() => {
    if (isFocused) {
      dispatch(getAllProducts());
    }
  }, [isFocused, dispatch]);

  useEffect(() => {
    if (products && products.length > 0) {
      const uniqueCategories = [...new Set(products
        .filter(product => product.category)
        .map(product => product.category))];
      setCategories(uniqueCategories);
      
      const initialSelectedCategories = {};
      uniqueCategories.forEach(category => {
        initialSelectedCategories[category] = false;
      });
      setSelectedCategories(initialSelectedCategories);
    }
  }, [products]);

  useEffect(() => {
    if (!products) return;

    let filtered = [...products];

    if (searchQuery.trim() !== '') {
      const lowerCaseQuery = searchQuery.toLowerCase();
      filtered = filtered.filter((product) => {
        const matchesName = product.name.toLowerCase().includes(lowerCaseQuery);
        const matchesCategory = product.category?.toLowerCase().includes(lowerCaseQuery);
        const matchesPrice = product.price.toString().includes(lowerCaseQuery);
        return matchesName || matchesCategory || matchesPrice;
      });
    }

    if (minPrice !== '' || maxPrice !== '') {
      const min = parseFloat(minPrice) || 0;
      const max = parseFloat(maxPrice) || Infinity;
      filtered = filtered.filter((product) => product.price >= min && product.price <= max);
    }

    const activeCategories = Object.keys(selectedCategories).filter(
      category => selectedCategories[category]
    );
    
    if (activeCategories.length > 0) {
      filtered = filtered.filter(product => 
        product.category && activeCategories.includes(product.category)
      );
    }

    setFilteredProducts(filtered);
  }, [searchQuery, minPrice, maxPrice, selectedCategories, products]);

  const handleClearPriceFilter = () => {
    setMinPrice('');
    setMaxPrice('');
  };

  const handleClearCategoryFilter = () => {
    const clearedCategories = {...selectedCategories};
    Object.keys(clearedCategories).forEach(key => {
      clearedCategories[key] = false;
    });
    setSelectedCategories(clearedCategories);
  };

  const toggleCategory = (category) => {
    setSelectedCategories(prev => ({
      ...prev,
      [category]: !prev[category]
    }));
  };

  const renderProduct = ({ item }) => (
    <TouchableOpacity
      style={styles.gridProductCard}
      onPress={() => navigation.navigate('ProductDetails', { product: item })}
    >
      <View style={styles.gridProductImageContainer}>
        {item.images && item.images.length > 0 ? (
          <>
            <Image
              source={{ uri: item.images[0]?.url || item.images[0] }}
              style={styles.gridProductImage}
              resizeMode="cover"
            />
            {/* Out of stock overlay */}
            {item.stock <= 0 && (
              <View style={styles.outOfStockOverlay}>
                <Text style={styles.outOfStockText}>Out of Stock</Text>
              </View>
            )}
          </>
        ) : (
          <View style={styles.gridProductImagePlaceholder}>
            <Text style={styles.placeholderText}>No Image</Text>
            {/* Out of stock overlay on placeholder */}
            {item.stock <= 0 && (
              <View style={styles.outOfStockOverlay}>
                <Text style={styles.outOfStockText}>Out of Stock</Text>
              </View>
            )}
          </View>
        )}
      </View>
      <View style={styles.gridProductContent}>
        <Text style={styles.gridProductName} numberOfLines={1}>
          {item.name}
        </Text>
        <Text style={styles.gridProductPrice}>₱{item.price}</Text>

        <TouchableOpacity
          style={[
            styles.addToCartButton,
            item.stock <= 0 && styles.disabledAddToCartButton
          ]}
          onPress={() => {
            if (userInfo?._id && item.stock > 0) {
              dispatch(addToCart(item._id));
            } else if (!userInfo?._id) {
              navigation.navigate('Login'); 
            }
          }}
          disabled={item.stock <= 0}
        >
          <Ionicons name="cart-outline" size={16} color="white" />
          <Text style={styles.addToCartText}>Add to Cart</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );

  const Checkbox = ({ checked, onPress, label }) => (
    <TouchableOpacity 
      style={styles.checkboxContainer} 
      onPress={onPress}
    >
      <View style={[styles.checkbox, checked && styles.checkboxChecked]}>
        {checked && (
          <Ionicons name="checkmark" size={14} color={COLORS.white} />
        )}
      </View>
      <Text style={styles.checkboxLabel}>{label}</Text>
    </TouchableOpacity>
  );

  const activePriceFilter = minPrice !== '' || maxPrice !== '';
  const activeCategoryFilters = Object.values(selectedCategories).filter(Boolean).length;

  return (
    <View style={styles.container}>
      {/* Search Bar Section */}
      <View style={styles.searchBarContainer}>
        <Ionicons name="search" size={20} color={COLORS.gray} style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Search by name, category, or price"
          placeholderTextColor={COLORS.gray}
          value={searchQuery}
          onChangeText={(text) => setSearchQuery(text)}
        />
      </View>

      {/* Filters Container */}
      <View style={styles.allFiltersContainer}>
        {/* Price Range Filter Section */}
        <TouchableOpacity 
          style={styles.filterHeader}
          onPress={() => setIsPriceDropdownOpen(!isPriceDropdownOpen)}
        >
          <View style={styles.filterHeaderLeft}>
            <Text style={styles.filterLabel}>Filter by Price</Text>
          </View>
          <View style={styles.filterHeaderRight}>
            {activePriceFilter > 0 && (
              <TouchableOpacity 
                style={styles.clearFilterButton} 
                onPress={handleClearPriceFilter}
              >
                <Text style={styles.clearButtonText}>Clear</Text>
              </TouchableOpacity>
            )}
            <Ionicons 
              name={isPriceDropdownOpen ? "chevron-up" : "chevron-down"} 
              size={20} 
              color={COLORS.gray} 
              style={styles.filterIcon}
            />
          </View>
        </TouchableOpacity>

        {isPriceDropdownOpen && (
          <View style={styles.dropdownContent}>
            <View style={styles.priceRangeContainer}>
              <TextInput
                style={styles.priceInput}
                placeholder="Min"
                placeholderTextColor={COLORS.gray}
                keyboardType="numeric"
                value={minPrice}
                onChangeText={(text) => setMinPrice(text)}
              />
              <Text style={styles.priceRangeSeparator}>-</Text>
              <TextInput
                style={styles.priceInput}
                placeholder="Max"
                placeholderTextColor={COLORS.gray}
                keyboardType="numeric"
                value={maxPrice}
                onChangeText={(text) => setMaxPrice(text)}
              />
            </View>
          </View>
        )}

        {/* Category Filter Section */}
        {categories.length > 0 && (
          <>
            <TouchableOpacity 
              style={styles.filterHeader}
              onPress={() => setIsCategoryDropdownOpen(!isCategoryDropdownOpen)}
            >
              <View style={styles.filterHeaderLeft}>
                <Text style={styles.filterLabel}>Filter by Category</Text>
              </View>
              <View style={styles.filterHeaderRight}>
                {activeCategoryFilters > 0 && (
                  <TouchableOpacity 
                    style={styles.clearFilterButton} 
                    onPress={handleClearCategoryFilter}
                  >
                    <Text style={styles.clearButtonText}>Clear</Text>
                  </TouchableOpacity>
                )}
                <Ionicons 
                  name={isCategoryDropdownOpen ? "chevron-up" : "chevron-down"} 
                  size={20} 
                  color={COLORS.gray} 
                  style={styles.filterIcon}
                />
              </View>
            </TouchableOpacity>

            {isCategoryDropdownOpen && (
              <View style={styles.dropdownContent}>
                <ScrollView 
                  style={styles.categoriesContainer}
                  contentContainerStyle={styles.categoriesContentContainer}
                >
                  {categories.map((category, index) => (
                    <Checkbox
                      key={index}
                      checked={selectedCategories[category]}
                      onPress={() => toggleCategory(category)}
                      label={category}
                    />
                  ))}
                </ScrollView>
              </View>
            )}
          </>
        )}
      </View>

      {/* Products List */}
      {loading ? (
        <ActivityIndicator size="large" color={COLORS.darkPurple} />
      ) : error ? (
        <Text style={styles.error}>{error}</Text>
      ) : filteredProducts.length === 0 ? (
        <View style={styles.noProductsContainer}>
          <Ionicons name="search-outline" size={48} color={COLORS.gray} />
          <Text style={styles.noProductsText}>No products match your filters</Text>
        </View>
      ) : (
        <FlatList
          data={filteredProducts}
          keyExtractor={(item) => item._id}
          renderItem={renderProduct}
          numColumns={2} 
          columnWrapperStyle={styles.row} 
          contentContainerStyle={styles.productsGrid}
        />
      )}
    </View>
  );
};

export default ProductsScreen;