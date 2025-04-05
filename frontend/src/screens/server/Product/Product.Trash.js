import React, { useEffect, useState } from 'react';
import { View, FlatList, Text, Image, ScrollView, Alert, TouchableOpacity } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { ActivityIndicator, Button } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';
import { useIsFocused } from '@react-navigation/native';
import {
  listTrashedProducts,
  restoreProduct,
  permanentDeleteProduct
} from '../../../redux/actions/product.Actions';
import styles, { COLORS } from '../../style/server/Product.Trash.styles';

export default function ProductTrash() {
  const dispatch = useDispatch();
  const isFocused = useIsFocused();
  const { loading, error, products } = useSelector((state) => state.productList);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    if (isFocused) {
      dispatch(listTrashedProducts());
    }
  }, [dispatch, isFocused]);

  const handleRefresh = () => {
    setRefreshing(true);
    dispatch(listTrashedProducts());
    setRefreshing(false);
  };

  const handleRestore = (id, name) => {
    Alert.alert(
      "Restore Product",
      `Are you sure you want to restore "${name}"?`,
      [
        { text: "Cancel", style: "cancel" },
        { 
          text: "Restore", 
          onPress: () => {
            dispatch(restoreProduct(id));
            setTimeout(() => dispatch(listTrashedProducts()), 500);
          }
        }
      ]
    );
  };

  const handlePermanentDelete = (id, name) => {
    Alert.alert(
      "Permanently Delete Product",
      `Are you sure you want to permanently delete "${name}"? This action cannot be undone.`,
      [
        { text: "Cancel", style: "cancel" },
        { 
          text: "Delete Forever", 
          style: "destructive",
          onPress: () => {
            dispatch(permanentDeleteProduct(id));
            setTimeout(() => dispatch(listTrashedProducts()), 500);
          }
        }
      ]
    );
  };

  const renderItem = ({ item }) => (
    <View style={styles.row}>
      <View style={styles.imageCell}>
        {item.images && item.images.length > 0 ? (
          <Image source={{ uri: item.images[0]?.url }} style={styles.thumbnail} />
        ) : (
          <View style={styles.noImageContainer}>
            <Ionicons name="image-outline" size={20} color={COLORS.grayMedium} />
          </View>
        )}
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.nameText}>{item.name}</Text>
        <Text style={styles.categoryText}>{item.category}</Text>
        <View style={styles.detailsRow}>
          <Text style={styles.priceText}>₱{item.price.toFixed(2)}</Text>
          <Text style={styles.stockText}>Stock: {item.stock}</Text>
        </View>
        <Text style={styles.descriptionText} numberOfLines={1}>{item.description}</Text>
      </View>
      <View style={styles.actionContainer}>
        <TouchableOpacity 
          style={styles.restoreButton} 
          onPress={() => handleRestore(item._id, item.name)}
        >
          <Ionicons name="refresh-outline" size={20} color={COLORS.success} />
          <Text style={styles.restoreText}>Restore</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.deleteButton} 
          onPress={() => handlePermanentDelete(item._id, item.name)}
        >
          <Ionicons name="trash-outline" size={20} color={COLORS.error} />
          <Text style={styles.deleteText}>Delete</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Trash</Text>
        <Text style={styles.headerSubtitle}>Deleted products (recoverable)</Text>
      </View>

      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator animating={true} color={COLORS.primary} size="large" />
          <Text style={styles.loadingText}>Loading products...</Text>
        </View>
      ) : error ? (
        <View style={styles.errorContainer}>
          <Ionicons name="alert-circle-outline" size={32} color={COLORS.error} />
          <Text style={styles.errorText}>{error}</Text>
          <Button 
            mode="outlined" 
            onPress={handleRefresh}
            style={styles.retryButton}
            labelStyle={styles.retryButtonLabel}
          >
            Retry
          </Button>
        </View>
      ) : products && products.length > 0 ? (
        <FlatList
          data={products}
          renderItem={renderItem}
          keyExtractor={(item) => item._id}
          contentContainerStyle={styles.listContainer}
          showsVerticalScrollIndicator={false}
          refreshing={refreshing}
          onRefresh={handleRefresh}
        />
      ) : (
        <View style={styles.emptyContainer}>
          <Ionicons name="trash-bin-outline" size={60} color={COLORS.grayMedium} />
          <Text style={styles.emptyTitle}>Trash is Empty</Text>
          <Text style={styles.emptySubtitle}>There are no deleted products</Text>
        </View>
      )}
    </View>
  );
}