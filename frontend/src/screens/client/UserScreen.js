import React, { useEffect, useState, useRef } from "react";
import { 
  View, Text, TouchableOpacity, Image, 
  ActivityIndicator, ScrollView, FlatList, Dimensions, TextInput 
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { logoutUser } from "../../redux/actions/auth.Actions"; 
import { getAllProducts } from "../../redux/actions/user.Actions"; 
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { addToCart } from "../../redux/actions/order.Actions"; 
import { useIsFocused, useRoute } from '@react-navigation/native';
import Toast from "react-native-toast-message";

import styles, { COLORS } from "../style/client/UserScreen.styles";

// Define carousel images
const carouselImages = [
  require("../../../assets/home4.png"),
  require("../../../assets/home5.png"),
  require("../../../assets/home6.png"),
];

const UserScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const route = useRoute();
  const [transactionComplete, setTransactionComplete] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("All"); 
  const [searchQuery, setSearchQuery] = useState(""); 
  const [filteredProducts, setFilteredProducts] = useState([]); 
  const [currentIndex, setCurrentIndex] = useState(0); 
  const carouselRef = useRef(null); 
  const isFocused = useIsFocused();

  const userInfo = useSelector((state) => state.userLogin?.userInfo);
  const { loading, error, products } = useSelector((state) => state.productDetails);

  const [isFirstVisit, setIsFirstVisit] = useState(true);
  const [showedToast, setShowedToast] = useState(false);


  useEffect(() => {
    if (isFocused) {
      // Check for transaction complete params
      const hasCompletedTransaction = route.params?.transactionComplete;
      
      if (hasCompletedTransaction) {
        // Show transaction complete toast
        Toast.show({
          type: 'success',
          text1: 'Transaction Complete! 🎉',
          text2: 'Your order has been placed successfully',
          visibilityTime: 3000,
          position: 'top',
          topOffset: 100
        });
        
        // Clear the navigation params
        navigation.setParams({ transactionComplete: undefined });
        
        // Mark that we showed a toast so welcome toast doesn't show
        setShowedToast(true);
      } 

      else if (isFirstVisit && !showedToast && userInfo) {
        Toast.show({
          type: 'success',
          text1: 'Welcome back 🎉',
          visibilityTime: 3000,
          position: 'top',
          topOffset: 60
        });
        
        // Mark that we've shown the welcome toast
        setIsFirstVisit(false);
        setShowedToast(true);
      }
    }
    
    // Reset toast flag when screen loses focus
    if (!isFocused) {
      setShowedToast(false);
    }
  }, [isFocused, route.params, userInfo]);

  // Fetch products on component mount
  useEffect(() => {
    if (isFocused) {
      dispatch(getAllProducts());
    }
  }, [isFocused, dispatch]);

  const handleLogout = () => {
    dispatch(logoutUser());
  };
  
  // Filter products based on search query and selected category
  useEffect(() => {
    if (!products) return;

    let filtered = products;

    if (selectedCategory !== "All") {
      filtered = filtered.filter((product) => product.category === selectedCategory);
    }

    if (searchQuery.trim() !== "") {
      const lowerCaseQuery = searchQuery.toLowerCase();
      filtered = filtered.filter((product) => {
        const matchesName = product.name.toLowerCase().includes(lowerCaseQuery);
        const matchesCategory = product.category?.toLowerCase().includes(lowerCaseQuery);
        const matchesPrice = product.price.toString().includes(lowerCaseQuery);
        return matchesName || matchesCategory || matchesPrice;
      });
    }

    setFilteredProducts(filtered);
  }, [searchQuery, selectedCategory, products]);

  const categories = ["All", "Lip Products", "Foundation", "Palette", "Blush", "Tools"];

  return (
    <ScrollView style={styles.container}>
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

      {/* Carousel Section */}
      <View style={styles.carouselContainer}>
        <FlatList
          ref={carouselRef}
          data={carouselImages}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          keyExtractor={(_, index) => index.toString()}
          renderItem={({ item }) => (
            <Image source={item} style={styles.carouselImage} />
          )}
        />
      </View>

      {/* Categories Section */}
      {searchQuery.trim() === "" && (
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
      )}

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
                onPress={() => navigation.navigate('ProductDetails', { product })} 
              >
                <View style={styles.gridProductImageContainer}>
                  {product.images && product.images.length > 0 ? (
                    <>
                      <Image 
                        source={{ uri: product.images[0].url || product.images[0] }} 
                        style={styles.gridProductImage}
                        resizeMode="cover"
                      />
                      {/* Out of Stock Overlay */}
                      {product.stock <= 0 && (
                        <View style={styles.outOfStockOverlay}>
                          <Text style={styles.outOfStockText}>Out of Stock</Text>
                        </View>
                      )}
                    </>
                  ) : (
                    <LinearGradient
                      colors={[COLORS.lightPink, COLORS.mediumPink]}
                      style={styles.gridProductImagePlaceholder}
                    >
                      <Text style={styles.placeholderText}>Product</Text>
                      {product.stock <= 0 && (
                        <View style={styles.outOfStockOverlay}>
                          <Text style={styles.outOfStockText}>Out of Stock</Text>
                        </View>
                      )}
                    </LinearGradient>
                  )}
                </View>
                <View style={styles.gridProductContent}>
                  <Text style={styles.gridProductName} numberOfLines={1}>{product.name}</Text>
                  <Text style={styles.gridProductPrice}>₱{product.price}</Text>
                  
                  <TouchableOpacity
                    style={[
                      styles.addToCartButton,
                      product.stock <= 0 && styles.disabledAddToCartButton
                    ]}
                    onPress={() => {
                      if (userInfo?._id && product.stock > 0) {
                        dispatch(addToCart(product._id));
                        // Display toast notification at the top of screen
                        Toast.show({
                          type: 'success',
                          text1: 'Added to cart!',
                          text2: `${product.name} has been added to your cart`,
                          visibilityTime: 2000,
                          position: 'side',
                          topOffset: 100
                        });
                      }
                    }}
                    disabled={product.stock <= 0}
                  >
                <Ionicons 
                  name="cart-outline"  
                  size={16} 
                  color="white" 
                />
                <Text style={[
                  styles.addToCartText,
                  product.stock <= 0 && styles.disabledAddToCartText
                ]}>
                  {product.stock > 0 ? "Add to Cart" : "Add to Cart"}
                </Text>
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