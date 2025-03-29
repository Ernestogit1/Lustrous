import React, { useState } from "react";
import { View, Text, Image, ScrollView, FlatList, TouchableOpacity } from "react-native";
import styles, { COLORS } from "../style/client/ProductDetailsScreen.styles";
import { Ionicons } from "@expo/vector-icons";

const ProductDetailsScreen = ({ route }) => {
  const { product } = route.params;
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const handleImagePress = (index) => {
    setCurrentImageIndex(index);
  };

  const handleScroll = (event) => {
    const contentOffsetX = event.nativeEvent.contentOffset.x;
    const index = Math.round(contentOffsetX / styles.mainImage.width);
    setCurrentImageIndex(index);
  };

  const handleAddToCart = () => {

    console.log(`Added ${product.name} to cart`);
  };

  return (
    <ScrollView style={styles.container}>
      {/* Image Carousel */}
      <View style={styles.carouselContainer}>
        <FlatList
          data={product.images}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          keyExtractor={(_, index) => index.toString()}
          onScroll={handleScroll}
          renderItem={({ item }) => (
            <Image
              source={{ uri: item.url || item }}
              style={styles.mainImage}
            />
          )}
        />
        <View style={styles.thumbnailContainer}>
          {product.images.map((item, index) => (
            <TouchableOpacity key={index} onPress={() => handleImagePress(index)}>
              <Image
                source={{ uri: item.url || item }}
                style={[
                  styles.thumbnailImage,
                  currentImageIndex === index && styles.activeThumbnail,
                ]}
              />
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Product Details */}
      <View style={styles.detailsContainer}>
        <Text style={styles.productName}>{product.name}</Text>
        <View style={styles.priceStockContainer}>
          <Text style={styles.productPrice}>₱{product.price}</Text>
          <Text style={styles.productStock}>
            {product.countInStock > 0
              ? `${product.countInStock} in stock`
              : "Out of stock"}
          </Text>
        </View>
        <Text style={styles.productDescription}>{product.description}</Text>

        {/* Add to Cart Button */}
        <TouchableOpacity
          style={[
            styles.addToCartButton,
            product.countInStock === 0 && styles.disabledButton,
          ]}
          onPress={handleAddToCart}
          disabled={product.countInStock === 0}
        >
          <Ionicons name="cart-outline" size={18} color="white" />
          <Text style={styles.addToCartText}>Add to Cart</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default ProductDetailsScreen;