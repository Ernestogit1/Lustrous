import React, { useEffect, useState } from 'react';
import { View, FlatList, Text, Image, TouchableOpacity, Dimensions } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { listProducts, softDeleteProduct } from '../../../redux/actions/product.Actions';
import { ActivityIndicator } from 'react-native-paper';
import { useIsFocused } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import styles, { COLORS } from '../../style/server/Product.styles';

const { width } = Dimensions.get('window');

export default function Product({ navigation }) {
  const dispatch = useDispatch();
  const isFocused = useIsFocused();
  const { loading, error, products } = useSelector((state) => state.productList);
  const [sortConfig, setSortConfig] = useState({ key: 'name', direction: 'ascending' });

  useEffect(() => {
    if (isFocused) {
      dispatch(listProducts());
    }
  }, [dispatch, isFocused]);

  const sortedProducts = React.useMemo(() => {
    if (!products) return [];
    
    let sortableProducts = [...products];
    if (sortConfig.key) {
      sortableProducts.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? 1 : -1;
        }
        return 0;
      });
    }
    return sortableProducts;
  }, [products, sortConfig]);

  const requestSort = (key) => {
    let direction = 'ascending';
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };

  const renderProductCard = ({ item }) => (
    <View style={styles.card}>
      <View style={styles.cardHeader}>
        <View style={styles.imageContainer}>
          {item.images && item.images[0] ? (
            <Image source={{ uri: item.images[0]?.url }} style={styles.productImage} />
          ) : (
            <View style={styles.placeholderImage}>
              <Ionicons name="image-outline" size={32} color={COLORS.grayMedium} />
            </View>
          )}
        </View>
        <View style={styles.headerInfo}>
          <Text style={styles.productName} numberOfLines={2}>{item.name}</Text>
          <Text style={styles.productPrice}>₱{item.price.toFixed(2)}</Text>
          
          <View style={styles.badges}>
            <Text style={styles.categoryBadge}>{item.category}</Text>
            <Text style={[
              styles.stockBadge, 
              item.stock > 10 ? styles.stockHigh : 
              item.stock > 0 ? styles.stockMedium : 
              styles.stockLow
            ]}>
              Stock: {item.stock}
            </Text>
          </View>
        </View>
      </View>

      <Text style={styles.description} numberOfLines={2}>{item.description}</Text>
      
      <View style={styles.cardActions}>
        <TouchableOpacity 
          style={[styles.actionButton, styles.editButton]}
          onPress={() => navigation.navigate('UpdateProduct', { productId: item._id })}
        >
          <Ionicons name="create-outline" size={18} color={COLORS.white} />
          <Text style={styles.buttonText}>Edit</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[styles.actionButton, styles.deleteButton]}
          onPress={() => dispatch(softDeleteProduct(item._id))}
        >
          <Ionicons name="trash-outline" size={18} color={COLORS.white} />
          <Text style={styles.buttonText}>Delete</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  const renderSortOptions = () => (
    <View style={styles.sortContainer}>
      <Text style={styles.sortLabel}>Sort by:</Text>
      {['name', 'price', 'category', 'stock'].map((option) => (
        <TouchableOpacity 
          key={option}
          style={[
            styles.sortButton, 
            sortConfig.key === option ? styles.sortButtonActive : {}
          ]}
          onPress={() => requestSort(option)}
        >
          <Text style={[
            styles.sortButtonText,
            sortConfig.key === option ? styles.sortButtonTextActive : {}
          ]}>
            {option.charAt(0).toUpperCase() + option.slice(1)}
          </Text>
          {sortConfig.key === option && (
            <Ionicons 
              name={sortConfig.direction === 'ascending' ? 'arrow-up' : 'arrow-down'} 
              size={14} 
              color={COLORS.white} 
              style={styles.sortIcon}
            />
          )}
        </TouchableOpacity>
      ))}
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.pageTitle}>Products</Text>
        <TouchableOpacity 
          style={styles.addButton}
          onPress={() => navigation.navigate('CreateProduct')}
        >
          <Ionicons name="add" size={18} color={COLORS.white} />
          <Text style={styles.addButtonText}>Add Product</Text>
        </TouchableOpacity>
      </View>
      
      {renderSortOptions()}
      
      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator animating={true} color={COLORS.primary} size="large" />
          <Text style={styles.loadingText}>Loading products...</Text>
        </View>
      ) : error ? (
        <View style={styles.errorContainer}>
          <Ionicons name="alert-circle" size={32} color={COLORS.error} />
          <Text style={styles.errorText}>{error}</Text>
        </View>
      ) : (
        <FlatList
          data={sortedProducts}
          renderItem={renderProductCard}
          keyExtractor={(item) => item._id}
          contentContainerStyle={styles.listContainer}
        />
      )}
    </View>
  );
}