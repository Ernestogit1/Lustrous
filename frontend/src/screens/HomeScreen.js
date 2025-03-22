import React, { useState, useEffect, useRef } from 'react';
import { 
  Text, View, ScrollView, TouchableOpacity, 
  SafeAreaView, ImageBackground, Image, 
  Animated, FlatList 
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import styles, { COLORS } from './style/HomeScreen.styles';

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

export default HomeScreen;