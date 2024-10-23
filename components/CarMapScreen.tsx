import React, { useEffect, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Map, Marker } from "@vis.gl/react-google-maps"; // Ensure this is compatible with React Native
import storeSession from "../utils/storeSession";
import axios from 'axios';
import io from 'socket.io-client';
import RegVehicle from './RegVehicle';
import CarsTable from './CarsTable';

// Sample car data (moved inside the component)
const SOCKET_SERVER_URL = 'http://localhost:3001'; 

const CarMapScreen = () => {
  const [user, setUser] = useState(null);
  const [tableData, setTableData] = useState([]);
  const [cars, setCars] = useState([
    { id: '3', name: 'Car C', location: { lat: 51.909865, lng: -0.118092 } },
  ]);
  const [markerLocation, setMarkerLocation] = useState({
    lat: 51.909865,
    lng: -0.118092,
  });

  useEffect(() => {
    const initializeSocket = () => {
      const socket = io(SOCKET_SERVER_URL, {
        transports: ['websocket'], // Ensure using websockets
      });

      socket.on('message', (message) => {
        console.log("Message socket: ", message);
        setTableData([message]); // Update tableData if needed
        setMarkerLocation({
          lat: message.latitud,
          lng: message.longitud,
        });
        setCars([
          { id: '1', name: 'Car C', location: { lat: message.latitud, lng: message.longitud } },
        ])
      });

      return socket;
    };

    storeSession.getSession().then(data => {
      const url = "http://localhost:3000/";
      const urlTmp = `${url}cars?role=${data.role}&idUser=${data.id}`;

      const socket = initializeSocket();

      axios.get(urlTmp)
        .then(response => {
          const res = response.data;
          console.log("Res: ", res.data);

          switch (res.code) {
            case 200:
              setUser(data);
              setTableData(res.data);
              break;
            case 300:
              alert("Credenciales no validas");
              break;
            default:
              break;
          }
        })
        .catch(error => {
          console.error('Error fetching data:', error.response ? error.response.data : error.message);
        });

      return () => {
        socket.disconnect(); // Clean up the socket connection
      };
    });

  }, []); // Only run once when the component mounts

  return (
    <View style={styles.container}>
      <CarsTable data={cars}></CarsTable>
      {user && (
        <div>

        <RegVehicle idUser={user.id}></RegVehicle>
        <View style={{ height: "500px", width: "100%", border: "2px solid black", borderRadius: "20px" }}>
          <Map
            style={{ borderRadius: "20px" }}
            defaultZoom={13}
            defaultCenter={markerLocation}
            gestureHandling={"greedy"}
            disableDefaultUI
          >
            {cars.map(data => (
              <Marker key={data.id} position={data.location} />
            ))}
          </Map>
        </View>
        </div>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default CarMapScreen;
