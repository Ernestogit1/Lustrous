import React, { useState, useEffect, useRef } from 'react';
import { 
  Text, View, ScrollView, TouchableOpacity, 
  SafeAreaView, ImageBackground, Image, 
  Animated, FlatList, ActivityIndicator 
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import styles, { COLORS } from './style/HomeScreen.styles';
import { API_URL } from '@env'; // Make sure this is properly set up

const HomeScreen = () => {
  const navigation = useNavigation();
  
  // State for products data
  const [allProducts, setAllProducts] = useState([]);     // Store all fetched products
  const [products, setProducts] = useState([]);           // Products to display (filtered or all)
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null); // Track selected category
  
  const [currentIndex, setCurrentIndex] = useState(0);
  const fadeAnim = useRef(new Animated.Value(1)).current;
  const flatListRef = useRef(null);
  
  // Fixed categories
  const categories = ["All", "Lip Products", "Foundation", "Palette", "Blush", "Tools"];
  
  // Fetch latest products when component mounts
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${API_URL}/api/products?limit=5&sort=-createdAt`);
        
        // Handle different API response formats
        const productData = response.data.products || response.data;
        setAllProducts(productData);  // Store all products
        setProducts(productData);     // Initially show all products
        setError(null);
      } catch (err) {
        console.error('Error fetching products:', err);
        setError('Failed to load products. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Handle category selection
  const handleCategorySelect = (category, index) => {
    // If already selected, deselect it (show all products)
    if (selectedCategory === category) {
      setSelectedCategory(null);
      setProducts(allProducts);
      return;
    }
    
    setSelectedCategory(category);
    
    if (category === 'All') {
      setProducts(allProducts);
      return;
    }

    const filtered = allProducts.filter(product => {
      const productCategory = (product.category || '').toLowerCase();
      return productCategory === category.toLowerCase() || 
             productCategory.includes(category.toLowerCase());
    });
    
    setProducts(filtered);
  };
 
  const heroImages = [
    require('../../assets/home1.png'),
    require('../../assets/home2.png'),
    require('../../assets/home3.png'),
  ];

  useEffect(() => {
    const fadeOut = () => {
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true,
      }).start(() => {
        const nextIndex = (currentIndex + 1) % heroImages.length;
        flatListRef.current.scrollToIndex({ 
          index: nextIndex, 
          animated: false 
        });
        setCurrentIndex(nextIndex);
        fadeIn();
      });
    };

    const fadeIn = () => {
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }).start();
    };

    const interval = setInterval(() => {
      fadeOut();
    }, 3000);

    return () => clearInterval(interval);
  }, [currentIndex]);


  const handleAddToCart = () => {
    navigation.navigate('Login');
  };

  const renderHeroItem = ({ item }) => {
    return (
      <Animated.View 
        style={[
          styles.heroSlide,
          { opacity: fadeAnim }
        ]}
      >
        <ImageBackground
          source={item}
          style={styles.heroBackground}
        >
          <LinearGradient
            colors={[`${COLORS.lightPurple}40`, `${COLORS.lightPink}80`]}
            style={styles.heroGradient}
          >
            <View style={styles.heroContent}>
              <View style={styles.heroTextContainer}>
                <Text style={styles.heroEyebrow}>NEW COLLECTION</Text>
                <Text style={styles.heroTitle}>Unleash Your Beauty's Aura</Text>
                <Text style={styles.heroSubtitle}>
                  Premium makeup products that enhance your natural glow
                </Text>
                <TouchableOpacity style={styles.heroButton}>
                  <Text style={styles.buttonText}>SHOP NOW</Text>
                </TouchableOpacity>
              </View>
            </View>
          </LinearGradient>
        </ImageBackground>
      </Animated.View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.headerLeft}>
            <Image 
              source={require('../../assets/lustrous.png')} 
              style={styles.headerLogo}
              resizeMode="contain"
            />
          </View>
          <View style={styles.headerRight}>
            <TouchableOpacity style={styles.iconButton}>
              <Ionicons name="search-outline" size={22} color={COLORS.darkPurple} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.iconButton}>
              <Ionicons name="heart-outline" size={22} color={COLORS.darkPurple} />
            </TouchableOpacity>
            <TouchableOpacity 
              style={styles.iconButton}
              onPress={() => navigation.navigate('Register')}
            >
              <Ionicons name="person-outline" size={22} color={COLORS.darkPurple} />
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.heroSection}>
          <FlatList
            ref={flatListRef}
            data={heroImages}
            renderItem={renderHeroItem}
            keyExtractor={(_, index) => index.toString()}
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            scrollEnabled={false}
          />
          
          <View style={styles.carouselIndicators}>
            {heroImages.map((_, index) => (
              <View
                key={index}
                style={[
                  styles.indicator,
                  index === currentIndex ? styles.indicatorActive : {}
                ]}
              />
            ))}
          </View>
        </View>

        <View style={styles.categoriesContainer}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.categoriesScrollView}>
            {categories.map((category, index) => (
              <TouchableOpacity 
                key={index} 
                style={selectedCategory === category ? styles.categoryBtnActive : styles.categoryBtn}
                onPress={() => handleCategorySelect(category, index)}
              >
                <Text 
                  style={selectedCategory === category ? styles.categoryTextActive : styles.categoryText}
                >
                  {category}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        <View style={styles.sectionContainer}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>
              {'New Arrival'}
            </Text>
          </View>
          
          {loading ? (
            <ActivityIndicator size="large" color={COLORS.darkPurple} style={{padding: 20}} />
          ) : error ? (
            <Text style={styles.errorText}>{error}</Text>
          ) : (
            <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.productScroll}>
              {products && products.length > 0 ? (
                products.map((product) => (
                  <TouchableOpacity 
                    key={product._id} 
                    style={styles.productCard}
                    onPress={() => navigation.navigate('ProductDetails', { productId: product._id })}
                  >
                    <View style={styles.productImageContainer}>
                      {product.images && product.images.length > 0 ? (
                        <Image 
                          source={{ uri: product.images[0].url || product.images[0] }} 
                          style={styles.productImage}
                          resizeMode="cover"
                        />
                      ) : (
                        <View style={styles.productImagePlaceholder}>
                          <LinearGradient
                            colors={[COLORS.lightPink, COLORS.mediumPink]}
                            style={styles.productGradient}
                          >
                            <Text style={styles.placeholderText}>Product</Text>
                          </LinearGradient>
                        </View>
                      )}
                      {product.countInStock <= 5 && product.countInStock > 0 && (
                        <View style={styles.productBadge}>
                          <Text style={styles.productBadgeText}>LOW STOCK</Text>
                        </View>
                      )}
                      {product.countInStock === 0 && (
                        <View style={[styles.productBadge, {backgroundColor: '#ff4d4d'}]}>
                          <Text style={styles.productBadgeText}>SOLD OUT</Text>
                        </View>
                      )}
                    </View>
                    <Text style={styles.productName}>{product.name}</Text>
                    <Text style={styles.productDescription} numberOfLines={2}>{product.description}</Text>
                    <View style={styles.productFooter}>
                      <Text style={styles.productPrice}>₱{product.price}</Text>
                      <TouchableOpacity 
                        style={styles.addToCartButton}
                        onPress={handleAddToCart} 
                      >
                        <Ionicons name="add" size={18} color="white" />
                      </TouchableOpacity>
                    </View>
                  </TouchableOpacity>
                ))
              ) : (
                <Text style={styles.noProductsText}>
                  {selectedCategory ? `No ${selectedCategory} products found` : 'No products available'}
                </Text>
              )}
            </ScrollView>
          )}
        </View>

        <View style={styles.benefitsSection}>
          <Text style={styles.sectionTitle}>Why Choose Lustrous?</Text>
          <View style={styles.benefitCards}>
            <View style={styles.benefitItem}>
              <View style={styles.benefitIcon}>
                <Text style={styles.iconPlaceholder}>✨</Text>
              </View>
              <Text style={styles.benefitTitle}>Clean & Safe</Text>
              <Text style={styles.benefitText}>Only natural ingredients</Text>
            </View>
            <View style={styles.benefitItem}>
              <View style={styles.benefitIcon}>
                <Text style={styles.iconPlaceholder}>🌱</Text>
              </View>
              <Text style={styles.benefitTitle}>Cruelty Free</Text>
              <Text style={styles.benefitText}>Never tested on animals</Text>
            </View>
            <View style={styles.benefitItem}>
              <View style={styles.benefitIcon}>
                <Text style={styles.iconPlaceholder}>♻️</Text>
              </View>
              <Text style={styles.benefitTitle}>Zero Waste</Text>
              <Text style={styles.benefitText}>Eco-friendly packaging</Text>
            </View>
          </View>
        </View>

        <View style={styles.sectionContainer}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Collections</Text>
            <TouchableOpacity>
              <Text style={styles.seeAllText}>See All</Text>
            </TouchableOpacity>
          </View>
          
          <View style={styles.newArrivalsGrid}>
            {[1, 2].map((item) => (
              <TouchableOpacity key={item} style={styles.newArrivalCard}>
                <View style={styles.newArrivalImage}>
                  <LinearGradient
                    colors={[COLORS.mediumPink, COLORS.lightPurple]}
                    style={styles.newArrivalGradient}
                  >
                    <Text style={styles.placeholderText}>Collection</Text>
                  </LinearGradient>
                </View>
                <View style={styles.newArrivalContent}>
                  <Text style={styles.newArrivalTitle}>Spring Collection</Text>
                  <Text style={styles.newArrivalSubtitle}>Fresh looks for the season</Text>
                  <TouchableOpacity style={styles.outlineButton}>
                    <Text style={styles.outlineButtonText}>Explore</Text>
                  </TouchableOpacity>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <View style={styles.ctaSection}>
          <LinearGradient
            colors={[COLORS.lightPurple, COLORS.darkPurple]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.ctaGradient}
          >
            <Text style={styles.ctaTitle}>Shop with Us Today!</Text>
            <Text style={styles.ctaText}>
              Register for free and be a part of the Lustrous community!
            </Text>
            <TouchableOpacity style={styles.ctaButton}
            onPress={() => navigation.navigate('Register')}>
              <Text style={styles.ctaButtonText}>SHOP NOW</Text>
            </TouchableOpacity>
          </LinearGradient>
        </View>

        {/* Footer */}
        <View style={styles.footer}>
          <Text style={styles.footerLogo}>LUSTROUS</Text>
          <View style={styles.footerLinks}>
            <Text style={styles.footerLink}>About</Text>
            <Text style={styles.footerLink}>Privacy</Text>
            <Text style={styles.footerLink}>Terms</Text>
            <Text style={styles.footerLink}>Contact</Text>
          </View>
          <View style={styles.socialLinks}>
            <TouchableOpacity style={styles.socialIcon}>
              <Ionicons name="logo-instagram" size={18} color={COLORS.lightPurple} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.socialIcon}>
              <Ionicons name="logo-facebook" size={18} color={COLORS.lightPurple} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.socialIcon}>
              <Ionicons name="logo-twitter" size={18} color={COLORS.lightPurple} />
            </TouchableOpacity>
          </View>
          <Text style={styles.footerText}>© 2025 Lustrous. All rights reserved.</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen;