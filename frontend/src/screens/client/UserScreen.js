import React, { useEffect, useState } from "react";
import { 
  View, Text, TouchableOpacity, Image, 
  ActivityIndicator, ScrollView
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { logoutUser } from "../../redux/actions/auth.Actions"; 
import { getAllProducts } from "../../redux/actions/user.Actions"; 
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import styles, { COLORS } from "../style/client/UserScreen.styles";

const UserScreen = ({ navigation }) => {
  const dispatch = useDispatch();

  const [selectedCategory, setSelectedCategory] = useState("All"); 

  const userInfo = useSelector((state) => state.userLogin?.userInfo);
  const { loading, error, products } = useSelector((state) => state.productDetails);

  // Fetch products on component mount
  useEffect(() => {
    dispatch(getAllProducts());
  }, [dispatch]);

  // Handle logout
  const handleLogout = () => {
    dispatch(logoutUser());
  };

  // Filter products based on selected category
  const filteredProducts = selectedCategory === "All"
    ? products
    : products.filter((product) => product.category === selectedCategory);

  const categories = ["All", "Lip Products", "Foundation", "Palette", "Blush", "Tools"];

  return (
    <ScrollView style={styles.container}>

      {/* Categories Section */}
      <View style={styles.categoriesContainer}>
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false} 
          style={styles.categoriesScrollView}
        >
          {categories.map((category) => (
            <TouchableOpacity
              key={category}
              style={[
                styles.categoryBtn,
                selectedCategory === category && styles.categoryBtnActive,
              ]}
              onPress={() => setSelectedCategory(category)}
            >
              <Text
                style={[
                  styles.categoryText,
                  selectedCategory === category && styles.categoryTextActive,
                ]}
              >
                {category}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* Featured Products Section */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Featured Products</Text>
        </View>

        {loading ? (
          <View style={styles.loaderContainer}>
            <ActivityIndicator size="large" color={COLORS.darkPurple} />
          </View>
        ) : error ? (
          <View style={styles.errorContainer}>
            <Text style={styles.errorText}>{error}</Text>
          </View>
        ) : filteredProducts && filteredProducts.length > 0 ? (
          <View style={styles.productsGrid}>
            {filteredProducts.map((product) => (
              <TouchableOpacity
                key={product._id}
                style={styles.gridProductCard}
                onPress={() => navigation.navigate('ProductDetails', { productId: product._id })}
              >
                <View style={styles.gridProductImageContainer}>
                  {product.images && product.images.length > 0 ? (
                    <Image 
                      source={{ uri: product.images[0].url || product.images[0] }} 
                      style={styles.gridProductImage}
                      resizeMode="cover"
                    />
                  ) : (
                    <LinearGradient
                      colors={[COLORS.lightPink, COLORS.mediumPink]}
                      style={styles.gridProductImagePlaceholder}
                    >
                      <Text style={styles.placeholderText}>Product</Text>
                    </LinearGradient>
                  )}
                </View>
                <View style={styles.gridProductContent}>
                  <Text style={styles.gridProductName} numberOfLines={1}>{product.name}</Text>
                  <Text style={styles.gridProductPrice}>₱{product.price}</Text>
                  
                  {/* Add to Cart button */}
                  <TouchableOpacity
                    style={styles.addToCartButton}
                    onPress={() => {
                      console.log("Add to cart (not implemented):", product._id);
                    }}
                  >
                    <Ionicons name="cart-outline" size={16} color="white" />
                    <Text style={styles.addToCartText}>Add to Cart</Text>
                  </TouchableOpacity>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        ) : (
          <Text style={styles.noProductsText}>No products available</Text>
        )}
      </View>
    </ScrollView>
  );
};

export default UserScreen;