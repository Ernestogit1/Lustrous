import React, { useState, useEffect } from "react";
import { 
  View, 
  Text, 
  Image, 
  ScrollView, 
  FlatList, 
  TouchableOpacity,
  ActivityIndicator 
} from "react-native";
import styles, { COLORS } from "../style/client/ProductDetailsScreen.styles";
import { Ionicons } from "@expo/vector-icons";
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../../redux/actions/order.Actions'; 
import { fetchProductReviews } from '../../redux/actions/review.Actions';

const ProductDetailsScreen = ({ route }) => {
  const { product } = route.params;
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const dispatch = useDispatch();
  const userInfo = useSelector((state) => state.userLogin?.userInfo);
  
  const [filterRating, setFilterRating] = useState(0); 
  const [sortBy, setSortBy] = useState('newest'); 
  const { reviews, loading: reviewsLoading } = useSelector(state => state.productReviews || {});
  const [filteredReviews, setFilteredReviews] = useState([]);
  
  useEffect(() => {
    if (product?._id) {
      dispatch(fetchProductReviews(product._id));
    }
  }, [dispatch, product._id]);
  
  // Filter and sort reviews
  useEffect(() => {
    if (!reviews) return;
    
    let filtered = [...reviews];
    
    // Filter by rating
    if (filterRating > 0) {
      filtered = filtered.filter(review => review.rating === filterRating);
    }
    
    // Sort reviews
    if (sortBy === 'newest') {
      filtered.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    } else if (sortBy === 'oldest') {
      filtered.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
    } else if (sortBy === 'highest') {
      filtered.sort((a, b) => b.rating - a.rating);
    } else if (sortBy === 'lowest') {
      filtered.sort((a, b) => a.rating - b.rating);
    }
    
    setFilteredReviews(filtered);
  }, [reviews, filterRating, sortBy]);
  
  const formatDate = (dateString) => {
    if (!dateString) return 'Unknown date';
    
    try {
      const date = new Date(dateString);
      
      if (isNaN(date.getTime())) return 'Invalid date';
      
      return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      });
    } catch (error) {
      return 'Date error';
    }
  };
  
  const calculateAverageRating = () => {
    if (!reviews || reviews.length === 0) return 0;
    
    const total = reviews.reduce((sum, review) => sum + review.rating, 0);
    return (total / reviews.length).toFixed(1);
  };
  
  const getRatingCounts = () => {
    const counts = [0, 0, 0, 0, 0]; 
    
    if (reviews && reviews.length > 0) {
      reviews.forEach(review => {
        if (review.rating >= 1 && review.rating <= 5) {
          counts[5 - review.rating]++;
        }
      });
    }
    
    return counts;
  };

  const handleImagePress = (index) => {
    setCurrentImageIndex(index);
  };

  const handleScroll = (event) => {
    const contentOffsetX = event.nativeEvent.contentOffset.x;
    const index = Math.round(contentOffsetX / styles.mainImage.width);
    setCurrentImageIndex(index);
  };

  const handleAddToCart = () => {
    if (userInfo?._id) {
      dispatch(addToCart(product._id));
    }
  };

  const RatingStars = ({ rating, size = 14, showNumeric = false }) => {
    return (
      <View style={styles.ratingStarsContainer}>
        {[1, 2, 3, 4, 5].map((star) => (
          <Ionicons
            key={star}
            name={rating >= star ? "star" : star - rating < 1 && star - rating > 0 ? "star-half" : "star-outline"}
            size={size}
            color={COLORS.gold}
            style={{ marginRight: 2 }}
          />
        ))}
        {showNumeric && <Text style={styles.numericRating}>({rating})</Text>}
      </View>
    );
  };
  
  const ReviewItem = ({ review }) => {
    return (
      <View style={styles.reviewItem}>
        <View style={styles.reviewHeader}>
          <View style={styles.reviewUser}>
            {/* User Avatar - Profile Image or Initial */}
            {review.user?.avatar ? (
              <Image 
                source={{ uri: review.user.avatar }} 
                style={styles.reviewAvatarImage}
                onError={() => console.log("Error loading profile image")}
              />
            ) : (
              <View style={styles.reviewAvatar}>
                <Text style={styles.reviewAvatarText}>
                  {review.user?.name ? review.user.name.charAt(0).toUpperCase() : "?"}
                </Text>
              </View>
            )}
            <View>
              <Text style={styles.reviewUserName}>{review.user?.name || "Anonymous"}</Text>
              <Text style={styles.reviewDate}>{formatDate(review.createdAt)}</Text>
            </View>
          </View>
          <RatingStars rating={review.rating} size={16} />
        </View>
        
        <Text style={styles.reviewComment}>{review.comment}</Text>
      </View>
    );
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
          <Text style={[
            styles.productStock,
            product.stock === 0 && styles.outOfStockText
          ]}>
            {product.stock > 0
              ? `Stock: ${product.stock}`
              : "Out of stock"}
          </Text>
        </View>
        <Text style={styles.productDescription}>{product.description}</Text>

        {/* Add to Cart Button */}
        <TouchableOpacity
          style={[
            styles.addToCartButton,
            product.stock === 0 && styles.disabledButton,
          ]}
          onPress={handleAddToCart}
          disabled={product.stock === 0}
        >
          <Ionicons name="cart-outline" size={18} color="white" />
          <Text style={styles.addToCartText}>Add to Cart</Text>
        </TouchableOpacity>
      </View>
      
      {/* Reviews Section */}
      <View style={styles.reviewsContainer}>
        <Text style={styles.reviewsTitle}>Customer Reviews</Text>
        
        {/* Average Rating */}
        <View style={styles.averageRatingContainer}>
          <View style={styles.averageRating}>
            <Text style={styles.averageRatingNumber}>{calculateAverageRating()}</Text>
            <Text style={styles.averageRatingMaximum}>/5</Text>
          </View>
          
          <View style={styles.overallRating}>
            <RatingStars rating={parseFloat(calculateAverageRating())} size={20} />
            <Text style={styles.totalReviews}>
              {reviews ? reviews.length : 0} {reviews && reviews.length === 1 ? 'Review' : 'Reviews'}
            </Text>
          </View>
        </View>
        
        {/* Rating Breakdown */}
        <View style={styles.ratingBreakdownContainer}>
          {getRatingCounts().map((count, index) => {
            const starNum = 5 - index;
            const percentage = reviews && reviews.length > 0 
              ? (count / reviews.length) * 100 
              : 0;
              
            return (
              <View key={starNum} style={styles.ratingBreakdownRow}>
                <Text style={styles.ratingBreakdownLabel}>{starNum} star</Text>
                <View style={styles.ratingBar}>
                  <View 
                    style={[
                      styles.ratingBarFill, 
                      { width: `${percentage}%` }
                    ]} 
                  />
                </View>
                <Text style={styles.ratingBreakdownCount}>{count}</Text>
              </View>
            );
          })}
        </View>
        
        {/* Filter and Sort Options */}
        <View style={styles.filterSortContainer}>
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false} 
            style={styles.filterScrollView}
          >
            <TouchableOpacity
              style={[
                styles.filterButton,
                filterRating === 0 && styles.activeFilterButton
              ]}
              onPress={() => setFilterRating(0)}
            >
              <Text style={[
                styles.filterButtonText,
                filterRating === 0 && styles.activeFilterButtonText
              ]}>All</Text>
            </TouchableOpacity>
            
            {[5, 4, 3, 2, 1].map(rating => (
              <TouchableOpacity
                key={rating}
                style={[
                  styles.filterButton,
                  filterRating === rating && styles.activeFilterButton
                ]}
                onPress={() => setFilterRating(rating)}
              >
                <Ionicons name="star" size={14} color={filterRating === rating ? COLORS.white : COLORS.gold} />
                <Text style={[
                  styles.filterButtonText,
                  filterRating === rating && styles.activeFilterButtonText
                ]}>{rating}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
          
          <View style={styles.sortContainer}>
            <Text style={styles.sortLabel}>Sort by: </Text>
            <TouchableOpacity 
              style={styles.sortButton}
              onPress={() => {
                if (sortBy === 'newest') {
                  setSortBy('oldest');
                } else if (sortBy === 'oldest') {
                  setSortBy('highest');
                } else if (sortBy === 'highest') {
                  setSortBy('lowest');
                } else {
                  setSortBy('newest');
                }
              }}
            >
              <Text style={styles.sortButtonText}>
                {sortBy === 'newest' ? 'Newest' : 
                 sortBy === 'oldest' ? 'Oldest' : 
                 sortBy === 'highest' ? 'Highest Rating' : 'Lowest Rating'}
              </Text>
              <Ionicons name="chevron-down" size={16} color={COLORS.textSecondary} />
            </TouchableOpacity>
          </View>
        </View>
        
        {/* Reviews List */}
        {reviewsLoading ? (
          <ActivityIndicator size="large" color={COLORS.primary} style={styles.reviewsLoading} />
        ) : filteredReviews && filteredReviews.length > 0 ? (
          <View style={styles.reviewsList}>
            {filteredReviews.map((review) => (
              <ReviewItem key={review._id} review={review} />
            ))}
          </View>
        ) : (
          <View style={styles.noReviewsContainer}>
            <Ionicons name="chatbox-ellipses-outline" size={40} color={COLORS.grayMedium} />
            <Text style={styles.noReviewsText}>
              {filterRating > 0 
                ? `No ${filterRating}-star reviews yet` 
                : 'No reviews yet for this product'}
            </Text>
          </View>
        )}
      </View>
    </ScrollView>
  );
};

export default ProductDetailsScreen;