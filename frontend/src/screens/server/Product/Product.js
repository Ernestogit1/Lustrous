import React, { useEffect, useState } from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import { Button, Card, Title } from 'react-native-paper';
import axios from 'axios';

export default function Product({ navigation }) {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    const { data } = await axios.get(`${API_URL}/api/products`);
    setProducts(data);
  };

  return (
    <View style={styles.container}>
      <Button mode="contained" onPress={() => navigation.navigate('CreateProduct')}>
        Add New Product
      </Button>
      <FlatList
        data={products}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <Card style={{ margin: 10 }}>
            <Card.Content>
              <Title>{item.name}</Title>
            </Card.Content>
          </Card>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({ container: { flex: 1, padding: 20 } });
