import React, { useEffect } from 'react';
import { View, FlatList, StyleSheet, Text, Image, ScrollView } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { listProducts } from '../../../redux/actions/product.Actions';
import { ActivityIndicator, MD3Colors  } from 'react-native-paper';

import { Ionicons } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native-gesture-handler';

export default function Product({ navigation }) {
  const dispatch = useDispatch();
  const { loading, error, products } = useSelector((state) => state.productList);

  useEffect(() => {
    dispatch(listProducts());
  }, [dispatch]);

  const renderItem = ({ item }) => (
    <View style={styles.row}>
      <View style={styles.cell}>
        <Image source={{ uri: item.images[0]?.url }} style={styles.thumbnail} />
      </View>
      <Text style={styles.cell}>{item.name}</Text>
      <Text style={styles.cell}>{item.category}</Text>
      <Text style={styles.cell}>₱{item.price}</Text>
      <Text style={styles.cell}>{item.stock}</Text>
      <Text style={styles.cell} numberOfLines={1}>{item.description}</Text>
      <View style={styles.cell}>
        <TouchableOpacity onPress={() => navigation.navigate('UpdateProduct', { productId: item._id })}>
          <Ionicons name="create-outline" size={20} color="blue" />
        </TouchableOpacity>
      </View>
    </View>
  );
  

  return (
    <ScrollView style={styles.container} horizontal>
      <View style={{ minWidth: 800 }}>
        <View style={[styles.row, styles.headerRow]}>
        <Text style={[styles.cell, styles.headerText]}>Image</Text>
          <Text style={[styles.cell, styles.headerText]}>Name</Text>
          <Text style={[styles.cell, styles.headerText]}>Category</Text>
          <Text style={[styles.cell, styles.headerText]}>Price</Text>
          <Text style={[styles.cell, styles.headerText]}>Stock</Text>
          <Text style={[styles.cell, styles.headerText]}>Description</Text>
          <Text style={[styles.cell, styles.headerText]}>Action</Text>

        </View>

        {loading ? (
<ActivityIndicator animating={true} color={MD3Colors.primary70} />
        ) : error ? (
          <Text style={{ color: 'red' }}>{error}</Text>
        ) : (
          <FlatList
            data={products}
            renderItem={renderItem}
            keyExtractor={(item) => item._id}
          />
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 15 },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomColor: '#ddd',
    borderBottomWidth: 1,
    paddingVertical: 10,
  },
  headerRow: {
    backgroundColor: '#f5f5f5',
    borderBottomWidth: 2,
  },
  headerText: {
    fontWeight: 'bold',
    fontSize: 14,
  },
  cell: {
    flex: 1,
    paddingHorizontal: 8,
    justifyContent: 'center',
  },
  thumbnail: {
    width: 40,
    height: 40,
    borderRadius: 5,
    resizeMode: 'cover',
  },
});
