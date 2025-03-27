import React, { useEffect } from "react";
import { View, Text, Image, ScrollView, Dimensions } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { getProductDetails } from "../../redux/actions/user.Actions";
import styles from "../style/client/ProductDetailsScreen.styles";

const { width } = Dimensions.get("window");

const ProductDetailsScreen = ({ route }) => {
  const { productId } = route.params;
  const dispatch = useDispatch();

  const { loading, error, product } = useSelector((state) => state.productDetails);

  useEffect(() => {
    dispatch(getProductDetails(productId));
  }, [dispatch, productId]);

  return (
    <ScrollView style={styles.container}>
      {loading ? (
        <Text style={styles.loadingText}>Loading...</Text>
      ) : error ? (
        <Text style={styles.errorText}>{error}</Text>
      ) : (
        product && (
          <View>
            {/* Custom Carousel */}
            <ScrollView
              horizontal
              pagingEnabled
              showsHorizontalScrollIndicator={false}
              style={styles.carouselContainer}
            >
              {product.images &&
                product.images.map((image, index) => (
                  <Image
                    key={index}
                    source={{ uri: image.url || image }}
                    style={styles.carouselImage}
                  />
                ))}
            </ScrollView>

            {/* Product Details */}
            <Text style={styles.productName}>{product.name}</Text>
            <Text style={styles.productDescription}>{product.description}</Text>
            <Text style={styles.productPrice}>₱{product.price}</Text>
            <Text style={styles.productStock}>
              {product.countInStock > 0 ? "In Stock" : "Out of Stock"}
            </Text>

            {/* Star Ratings */}
            <View style={styles.ratingContainer}>
              <Text style={styles.ratingText}>⭐ {product.rating} / 5</Text>
            </View>
          </View>
        )
      )}
    </ScrollView>
  );
};

export default ProductDetailsScreen;