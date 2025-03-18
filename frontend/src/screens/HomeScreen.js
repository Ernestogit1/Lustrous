import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, SafeAreaView, ImageBackground, Dimensions, Image, Animated, FlatList } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const { width } = Dimensions.get('window');


const COLORS = {
  lightPink: '#FFE6E6',
  mediumPink: '#E1AFD1',
  lightPurple: '#AD88C6',
  darkPurple: '#7469B6',
};

const HomeScreen = () => {
  const navigation = useNavigation();
  const [currentIndex, setCurrentIndex] = useState(0);
  const fadeAnim = useRef(new Animated.Value(1)).current;
  const flatListRef = useRef(null);
  
 
  const heroImages = [
    require('../../assets/home1.png'),
    require('../../assets/home2.png'),
    require('../../assets/home3.png'),
  ];

  // Auto scroll carousel
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

  // Sample products data with more realistic information
  const featuredProducts = [
    {
      id: 1,
      name: "Radiant Serum",
      price: "$49.99",
      description: "24-hour hydration",
      badge: "BESTSELLER"
    },
    {
      id: 2,
      name: "Glow Essence",
      price: "$38.99",
      description: "Brightening formula",
      badge: "NEW"
    },
    {
      id: 3,
      name: "Petal Lip Tint",
      price: "$24.99",
      description: "Long-lasting color",
      badge: ""
    }
  ];

  // Render hero item for carousel
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

        {/* Hero Section with ImageBackground Carousel */}
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
          
          {/* Carousel Indicators */}
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

        {/* Categories Scrollable Row */}
        <View style={styles.categoriesContainer}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.categoriesScrollView}>
            {["Lip Products", "Palette", "Foundation", "Blush", "Tools"].map((category, index) => (
              <TouchableOpacity key={index} style={index === 0 ? styles.categoryBtnActive : styles.categoryBtn}>
                <Text style={index === 0 ? styles.categoryTextActive : styles.categoryText}>{category}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Featured Products */}
        <View style={styles.sectionContainer}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>New Arrival</Text>
            <TouchableOpacity>
              <Text style={styles.seeAllText}>See All</Text>
            </TouchableOpacity>
          </View>
          
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.productScroll}>
            {featuredProducts.map((product) => (
              <TouchableOpacity key={product.id} style={styles.productCard}>
                <View style={styles.productImageContainer}>
                  <View style={styles.productImagePlaceholder}>
                    <LinearGradient
                      colors={[COLORS.lightPink, COLORS.mediumPink]}
                      style={styles.productGradient}
                    >
                      <Text style={styles.placeholderText}>Product</Text>
                    </LinearGradient>
                  </View>
                  {product.badge && (
                    <View style={styles.productBadge}>
                      <Text style={styles.productBadgeText}>{product.badge}</Text>
                    </View>
                  )}
                  <TouchableOpacity style={styles.favoriteButton}>
                    <Ionicons name="heart-outline" size={18} color={COLORS.lightPurple} />
                  </TouchableOpacity>
                </View>
                <Text style={styles.productName}>{product.name}</Text>
                <Text style={styles.productDescription}>{product.description}</Text>
                <View style={styles.productFooter}>
                  <Text style={styles.productPrice}>{product.price}</Text>
                  <TouchableOpacity style={styles.addToCartButton}>
                    <Ionicons name="add" size={18} color="white" />
                  </TouchableOpacity>
                </View>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Benefits Section with Enhanced Design */}
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

        {/* New Arrivals Section */}
        <View style={styles.sectionContainer}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>New Arrivals</Text>
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

        {/* Call to Action */}
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
            <TouchableOpacity style={styles.ctaButton}>
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollView: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 25,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.lightPink,
  },
  headerLeft: {
    justifyContent: 'center',
  },
  headerLogo: {
    width: 100,
    height: 85,
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconButton: {
    marginLeft: 18,
    position: 'relative',
  },
  cartBadge: {
    position: 'absolute',
    right: -6,
    top: -6,
    backgroundColor: COLORS.lightPurple,
    width: 16,
    height: 16,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,
  },
  cartBadgeText: {
    color: 'white',
    fontSize: 10,
    fontFamily: 'Poppins-Medium',
  },
  heroSection: {
    height: 480,
    overflow: 'hidden',
    position: 'relative',
  },
  heroSlide: {
    width,
    height: 480,
  },
  heroBackground: {
    width: '100%',
    height: '100%',
  },
  heroGradient: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  heroContent: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'flex-end',
    paddingBottom: 40,
  },
  heroTextContainer: {
    width: '90%',
    alignItems: 'center',
  },
  carouselIndicators: {
    position: 'absolute',
    bottom: 15,
    flexDirection: 'row',
    justifyContent: 'center',
    width: '100%',
  },
  indicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    margin: 3,
  },
  indicatorActive: {
    backgroundColor: COLORS.darkPurple,
    width: 12,
  },
  heroEyebrow: {
    fontSize: 12,
    fontFamily: 'Poppins-SemiBold',
    color: '#fff',
    backgroundColor: COLORS.darkPurple,
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 20,
    marginBottom: 16,
    letterSpacing: 1,
  },
  heroTitle: {
    fontSize: 32,
    fontFamily: 'Poppins-Bold',
    color: COLORS.darkPurple,
    textAlign: 'center',
    marginBottom: 16,
  },
  heroSubtitle: {
    fontSize: 16,
    fontFamily: 'Poppins-Regular',
    color: '#333',
    textAlign: 'center',
    marginBottom: 32,
  },
  heroButton: {
    backgroundColor: COLORS.darkPurple,
    paddingHorizontal: 30,
    paddingVertical: 15,
    borderRadius: 30,
  },
  buttonText: {
    color: 'white',
    fontSize: 14,
    fontFamily: 'Poppins-SemiBold',
    letterSpacing: 1,
  },
  categoriesContainer: {
    marginVertical: 16,
  },
  categoriesScrollView: {
    paddingHorizontal: 16,
    paddingVertical: 6,
  },
  categoryBtn: {
    paddingHorizontal: 18,
    paddingVertical: 10,
    borderRadius: 25,
    marginRight: 12,
    backgroundColor: COLORS.lightPink,
  },
  categoryBtnActive: {
    paddingHorizontal: 18,
    paddingVertical: 10,
    borderRadius: 25,
    marginRight: 12,
    backgroundColor: COLORS.darkPurple,
  },
  categoryText: {
    fontSize: 14,
    fontFamily: 'Poppins-Medium',
    color: COLORS.darkPurple,
  },
  categoryTextActive: {
    fontSize: 14,
    fontFamily: 'Poppins-Medium',
    color: 'white',
  },
  sectionContainer: {
    padding: 16,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontFamily: 'Poppins-Bold',
    color: COLORS.darkPurple,
  },
  seeAllText: {
    fontSize: 14,
    fontFamily: 'Poppins-Medium',
    color: COLORS.lightPurple,
  },
  productScroll: {
    paddingRight: 16,
  },
  productCard: {
    width: width * 0.4,
    marginRight: 16,
    borderRadius: 12,
    backgroundColor: '#FFFFFF',
    padding: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 2,
  },
  productImageContainer: {
    position: 'relative',
  },
  productImagePlaceholder: {
    width: '100%',
    aspectRatio: 1,
    borderRadius: 8,
    overflow: 'hidden',
    marginBottom: 10,
  },
  productGradient: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  placeholderText: {
    color: COLORS.darkPurple,
    opacity: 0.6,
    fontFamily: 'Poppins-Medium',
  },
  productBadge: {
    position: 'absolute',
    top: 8,
    left: 8,
    backgroundColor: COLORS.lightPurple,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  productBadgeText: {
    color: 'white',
    fontSize: 10,
    fontFamily: 'Poppins-Medium',
  },
  favoriteButton: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: 'white',
    width: 30,
    height: 30,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 1,
  },
  productName: {
    fontSize: 14,
    fontFamily: 'Poppins-SemiBold',
    marginBottom: 2,
  },
  productDescription: {
    fontSize: 12,
    color: '#666',
    fontFamily: 'Poppins-Regular',
    marginBottom: 10,
  },
  productFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  productPrice: {
    fontSize: 14,
    fontFamily: 'Poppins-Medium',
    color: COLORS.darkPurple,
  },
  addToCartButton: {
    backgroundColor: COLORS.lightPurple,
    width: 30,
    height: 30,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  benefitsSection: {
    padding: 20,
    backgroundColor: COLORS.lightPink,
    marginVertical: 10,
  },
  benefitCards: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 16,
  },
  benefitItem: {
    flex: 1,
    alignItems: 'center',
    padding: 10,
    backgroundColor: 'white',
    borderRadius: 12,
    marginHorizontal: 4,
    paddingVertical: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 2,
  },
  benefitIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: COLORS.lightPink,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  iconPlaceholder: {
    fontSize: 24,
  },
  benefitTitle: {
    fontSize: 12,
    fontFamily: 'Poppins-SemiBold',
    marginBottom: 5,
    color: COLORS.darkPurple,
    textAlign: 'center',
  },
  benefitText: {
    fontSize: 12,
    fontFamily: 'Poppins-Regular',
    textAlign: 'center',
    color: '#666',
  },
  newArrivalsGrid: {
    flexDirection: 'column',
  },
  newArrivalCard: {
    flexDirection: 'row',
    backgroundColor: 'white',
    borderRadius: 12,
    overflow: 'hidden',
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 2,
  },
  newArrivalImage: {
    width: '40%',
    height: 120,
  },
  newArrivalGradient: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  newArrivalContent: {
    flex: 1,
    padding: 16,
    justifyContent: 'center',
  },
  newArrivalTitle: {
    fontSize: 16,
    fontFamily: 'Poppins-SemiBold',
    marginBottom: 4,
  },
  newArrivalSubtitle: {
    fontSize: 13,
    fontFamily: 'Poppins-Regular',
    color: '#666',
    marginBottom: 10,
  },
  outlineButton: {
    borderWidth: 1,
    borderColor: COLORS.lightPurple,
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 6,
    alignSelf: 'flex-start',
  },
  outlineButtonText: {
    fontSize: 12,
    fontFamily: 'Poppins-Medium',
    color: COLORS.lightPurple,
  },
  ctaSection: {
    marginVertical: 16,
    paddingHorizontal: 16,
  },
  ctaGradient: {
    padding: 30,
    alignItems: 'center',
    borderRadius: 16,
  },
  ctaTitle: {
    fontSize: 22,
    fontFamily: 'Poppins-Bold',
    color: '#FFF',
    marginBottom: 10,
  },
  ctaText: {
    fontSize: 14,
    fontFamily: 'Poppins-Regular',
    color: '#FFF',
    textAlign: 'center',
    marginBottom: 20,
    opacity: 0.9,
  },
  ctaButton: {
    backgroundColor: '#FFF',
    paddingHorizontal: 30,
    paddingVertical: 12,
    borderRadius: 30,
  },
  ctaButtonText: {
    color: COLORS.darkPurple,
    fontSize: 14,
    fontFamily: 'Poppins-SemiBold',
  },
  footer: {
    padding: 30,
    alignItems: 'center',
    backgroundColor: COLORS.lightPink,
  },
  footerLogo: {
    fontSize: 18,
    fontFamily: 'Poppins-Bold',
    color: COLORS.darkPurple,
    marginBottom: 16,
  },
  footerLinks: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  footerLink: {
    fontSize: 14,
    fontFamily: 'Poppins-Medium',
    color: '#333',
    marginHorizontal: 10,
  },
  socialLinks: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  socialIcon: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#FFF',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 8,
  },
  footerText: {
    color: '#888',
    fontSize: 12,
    fontFamily: 'Poppins-Regular',
  },
});

export default HomeScreen;