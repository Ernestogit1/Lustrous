import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Image, TouchableOpacity, ActivityIndicator } from 'react-native';
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

  const [sortOption, setSortOption] = useState('default'); 

  useEffect(() => {
    if (isFocused) {
      dispatch(getAllProducts());
    }
  }, [isFocused, dispatch]);

  const sortedProducts = products?.slice().sort((a, b) => {
    if (sortOption === 'lowToHigh') {
      return a.price - b.price;
    } else if (sortOption === 'highToLow') {
      return b.price - a.price;
    } else {
      return a.name.localeCompare(b.name); 
    }
  });

  const renderProduct = ({ item }) => (
    <TouchableOpacity
      style={styles.gridProductCard}
      onPress={() => navigation.navigate('ProductDetails', { product: item })}
    >
      <View style={styles.gridProductImageContainer}>
        {item.images && item.images.length > 0 ? (
          <Image
            source={{ uri: item.images[0]?.url || item.images[0] }}
            style={styles.gridProductImage}
            resizeMode="cover"
          />
        ) : (
          <View style={styles.gridProductImagePlaceholder}>
            <Text style={styles.placeholderText}>No Image</Text>
          </View>
        )}
      </View>
      <View style={styles.gridProductContent}>
        <Text style={styles.gridProductName} numberOfLines={1}>
          {item.name}
        </Text>
        <Text style={styles.gridProductPrice}>₱{item.price}</Text>

        {/* Add to Cart Button */}
        <TouchableOpacity
          style={styles.addToCartButton}
          onPress={() => {
            if (userInfo?._id) {
              dispatch(addToCart(item._id));
            } else {
              navigation.navigate('Login'); 
            }
          }}
        >
          <Ionicons name="cart-outline" size={16} color="white" />
          <Text style={styles.addToCartText}>Add to Cart</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {/* Filter Section */}
      <View style={styles.filterContainer}>
        <Text style={styles.filterLabel}>Sort by:</Text>
        <View style={styles.filterButtons}>
          <TouchableOpacity
            style={[
              styles.filterButton,
              sortOption === 'default' && styles.filterButtonActive,
            ]}
            onPress={() => setSortOption('default')}
          >
            <Text
              style={[
                styles.filterButtonText,
                sortOption === 'default' && styles.filterButtonTextActive,
              ]}
            >
              Alphabetical
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.filterButton,
              sortOption === 'lowToHigh' && styles.filterButtonActive,
            ]}
            onPress={() => setSortOption('lowToHigh')}
          >
            <Text
              style={[
                styles.filterButtonText,
                sortOption === 'lowToHigh' && styles.filterButtonTextActive,
              ]}
            >
              Price: Low to High
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.filterButton,
              sortOption === 'highToLow' && styles.filterButtonActive,
            ]}
            onPress={() => setSortOption('highToLow')}
          >
            <Text
              style={[
                styles.filterButtonText,
                sortOption === 'highToLow' && styles.filterButtonTextActive,
              ]}
            >
              Price: High to Low
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      {loading ? (
        <ActivityIndicator size="large" color={COLORS.darkPurple} />
      ) : error ? (
        <Text style={styles.error}>{error}</Text>
      ) : (
        <FlatList
          data={sortedProducts}
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