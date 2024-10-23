import { Picker } from '@react-native-picker/picker';
import { useEffect, useState, type PropsWithChildren, type ReactElement } from 'react';
import {StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import storeSession  from "../utils/storeSession";

import axios from 'axios';
import { Link, Route, useNavigate } from 'react-router-dom';
import React from 'react';
import { ScrollView } from 'react-native';

const url = "http://localhost:3000/"

type Props = PropsWithChildren<{
  data: any;
  headerImage: ReactElement;
  headerBackgroundColor: { dark: string; light: string };
}>;

export default function CarsTable({
  data,
  children,
  headerImage,
  headerBackgroundColor,
}: Props) {
 


    

  return (
<ScrollView horizontal>
      <View style={styles.tableContainer}>
        <View style={styles.tableHeader}>
          <Text style={styles.tableHeaderCell}>Id</Text>
          <Text style={styles.tableHeaderCell}>Dueno</Text>
          <Text style={styles.tableHeaderCell}>Marca</Text>
          <Text style={styles.tableHeaderCell}>Color</Text>
          <Text style={styles.tableHeaderCell}>Modelo</Text>
          <Text style={styles.tableHeaderCell}>Ultima Localizacion</Text>
          <Text style={styles.tableHeaderCell}>Creacion</Text>
          <Text style={styles.tableHeaderCell}>Latitud</Text>
          <Text style={styles.tableHeaderCell}>Longitud</Text>
        </View>

        {data.map((row, index) => (
          <View key={index} style={styles.tableRow}>
            <Text style={styles.tableCell}>{row.id}</Text>
            <Text style={styles.tableCell}>{row.username}</Text>
            <Text style={styles.tableCell}>{row.marca}</Text>
            <Text style={styles.tableCell}>{row.color}</Text>
            <Text style={styles.tableCell}>{row.modelo}</Text>
            <Text style={styles.tableCell}>{row.latitud}</Text>
            <Text style={styles.tableCell}> {row.longitud}</Text>
          </View>
        ))}
      </View>
    </ScrollView>
  )
}


const styles = StyleSheet.create({
  tableContainer: {
    flexDirection: 'column',
    borderWidth: 1,
    borderColor: '#ccc',
  },
  tableHeader: {
    flexDirection: 'row',
    backgroundColor: '#f0f0f0',
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
  tableHeaderCell: {
    flex: 1,
    fontWeight: 'bold',
    textAlign: 'center',
    padding: 5,
  },
  tableRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  tableCell: {
    flex: 1,
    textAlign: 'center',
    padding: 10,
  },
});
