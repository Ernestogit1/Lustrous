import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Image, TouchableOpacity, ActivityIndicator, TextInput } from 'react-native';
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

  useEffect(() => {
    if (isFocused) {
      dispatch(getAllProducts());
    }
  }, [isFocused, dispatch]);

  // Filter products based on search query
  useEffect(() => {
    if (!products) return;

    let filtered = products;

    if (searchQuery.trim() !== '') {
      const lowerCaseQuery = searchQuery.toLowerCase();
      filtered = filtered.filter((product) => {
        const matchesName = product.name.toLowerCase().includes(lowerCaseQuery);
        const matchesCategory = product.category?.toLowerCase().includes(lowerCaseQuery);
        const matchesPrice = product.price.toString().includes(lowerCaseQuery);
        return matchesName || matchesCategory || matchesPrice;
      });
    }

    setFilteredProducts(filtered);
  }, [searchQuery, products]);

  const handlePriceFilter = () => {
    if (!products) return;

    const min = parseFloat(minPrice) || 0;
    const max = parseFloat(maxPrice) || Infinity;

    const filtered = products
      .filter((product) => product.price >= min && product.price <= max)
      .sort((a, b) => a.price - b.price); 

    setFilteredProducts(filtered);
  };


  const handleClearFilter = () => {
    setMinPrice('');
    setMaxPrice('');
    setFilteredProducts(products); 
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

      {/* Price Range Filter Section */}
      <View style={styles.filterContainer}>
        <Text style={styles.filterLabel}>Filter by Price Range:</Text>
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
          <TouchableOpacity
            style={styles.filterButton}
            onPress={handlePriceFilter}
          >
            <Text style={styles.filterButtonText}>Filter</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.clearButton}
            onPress={handleClearFilter}
          >
            <Text style={styles.clearButtonText}>Clear</Text>
          </TouchableOpacity>
        </View>
      </View>

      {loading ? (
        <ActivityIndicator size="large" color={COLORS.darkPurple} />
      ) : error ? (
        <Text style={styles.error}>{error}</Text>
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