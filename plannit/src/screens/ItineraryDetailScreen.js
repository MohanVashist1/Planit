import React , { useState, useEffect} from "react";
import { View, StyleSheet, Button, TextInput, ScrollView, FlatList, Alert, TouchableOpacity, StatusBar} from "react-native";
import { Text, Image} from "react-native-elements";
import * as Calendar from 'expo-calendar';
import planitApi from "../api/planitApi";
import getDirections from "react-native-google-maps-directions";


const ItineraryDetailScreen = ({ navigation }) => {
    console.disableYellowBox = true;
    const name = navigation.getParam("name", "NO-ID");
    const email = navigation.getParam("email", "NO-ID");
    const [vicinity,setVicinity] = useState("");
    const [startTime,setStartTime] =  useState("");
    const [endTime,setEndTime] =  useState("");
    const [photo,setPhoto] = useState([]);
    const [currentLatitude, setLatitude] = useState("");
  const [currentLongitude, setLongitude] = useState("");
  const [transport, setTransport] = useState("");
  const [locationLat, setLocalLat] = useState("");
  const [locationLong, setLocalLong] = useState("");
    const details = {
        startDate: new Date(),
        title:"my first event calendar",
        timeZone: "GMT-5",
        status:Calendar.EventStatus.CONFIRMED,
        accessLevel:Calendar.EventAccessLevel.DEFAULT,
        isDetached:true,    
        allDay:true,
        availability:Calendar.Availability.FREE,

    };
    const getItineraryDetailApi = () => {
        const response = planitApi.post("/getDetail",{email, name});
        response.then(result => {
          setVicinity(result.data.vicinity);
          setPhoto(result.data.photos);
          setEndTime(result.data.end_time);
          setStartTime(result.data.start_time);
        })
        return response;
      };
    const DateToString = (time) => {
      let s = time.split("");
      return s;
    }
    const addEventCalender = async () => {
    const hasCalendarPermission = await Calendar.requestPermissionsAsync();
    if (hasCalendarPermission.status === 'granted') {
      const calendar = await Calendar.getDefaultCalendarAsync()
      try {
        const res = await Calendar.createEventAsync(calendar.id, {
          endDate: new Date(endTime),
          startDate: new Date(startTime),
          title: name
        });
        
        Alert.alert('Created event in Calendar');
      } catch (e) {
        console.log({ e });
      }
    } 
    }
  function setLocation(position) {
    var latitude = position.coords.latitude;
    var longitude = position.coords.longitude;
    setLatitude(latitude);
    setLongitude(longitude);
  }
  if (currentLatitude === "") {
    navigator.geolocation.getCurrentPosition(setLocation);
  }
  const getModeOfTransportation = () => {
    const response = planitApi.post("/getFilter", { email });
    response.then(result => {
      setTransport(result.data.transport_method);
    });
    return response;
  };
  const getLatLong = () => {
    const response = planitApi.post("/getLatLong", { vicinity });
    response.then(result => {
      setLocalLat(result.data.latitude);
      setLocalLong(result.data.longitude);
    });
    return response;
  };

  handleGetDirections = () => {
    const data = {
      source: {
        latitude: currentLatitude,
        longitude: currentLongitude
      },
      destination: {
        latitude: locationLat,
        longitude: locationLong
      },
      params: [
        {
          key: "travelmode",
          value: transport
        },
        {
          key: "dir_action",
          value: "navigate" // this instantly initializes navigation using the given travel mode
        }
      ]
    };

    getDirections(data);
  };

  useEffect(() => {
    getItineraryDetailApi();
  }, []);

  return (
    <View style={{ flex: 1, backgroundColor: "black" }}>
      <StatusBar barStyle="light-content"/>
      <View
        style={{
          flex: 2,
          flexDirection: "row",
          justifyContent: "center"
        }}
      >
        <View style={styles.upperBox}>
          <Text h1 style={styles.headline1}>
            Plan
          </Text>
          <Text h1 style={styles.headline2}>
            It
          </Text>
        </View>
      </View>
      <View style={styles.middleBox}>
        <Text style={styles.textStyle}>{name}</Text>
        <Text style={styles.textStyle}>{email}</Text>
        <ScrollView style={styles.containerListStyle} scrollEnabled={true}>
          <Text style={styles.detailStyle}>Location: {vicinity + "\n"}</Text>
          <Text style={styles.detailStyle}>Photo{"\n"}</Text>
          <Image
            source={{
              uri:
                "https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=" +
                photo +
                "&key=AIzaSyCa5EwjgiZ_7HxCM3HebOyOT-YVhVOwVOY"
            }}
            style={{ width: 300, height: 300, alignSelf: "center" }}
          />
        </ScrollView>
        <Button
          style={{ margin: 15 }}
          title="Back to the List"
          onPress={() => {
            navigation.navigate("itinerary", { email , "pressed":true});
          }}
          type="clear"
        />
        <Button
          style={{ margin: 15 }}
          title="Launch Maps Navigation"
          onPress={() => {
            const response = getModeOfTransportation();
            response.then(result => {
              const response_lat_long = getLatLong();
              response_lat_long.then(result => {
                handleGetDirections();
              });
            });
          }}
          type="clear"
        />
        <Button 
          style={{ margin: 15 }}
          title="Create Event"
          onPress={()=>{
            addEventCalender(details);
          }} 
          type="clear"
        />
      </View>  
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#121212"
  },
  middleBox: {
    flex: 4,
    flexDirection: "column",
    justifyContent: "center",
    bottom: 80
  },
  upperBox: {
    flex: 2,
    flexDirection: "row",
    justifyContent: "center"
  },
  headline1: {
    color: "#FFFFFF",
    top: 80,
    fontSize: 40
  },
  headline2: {
    color: "#0092CC",
    top: 80,
    fontSize: 40
  },
  textStyle: {
    fontSize: 25,
    color: "white",
    textAlign: "center"
  },
  detailStyle: {
    fontSize: 25,
    color: "white",
    textAlign: "justify"
  },
  HeaderTwo: {
    fontSize: 30
  },
  textInput: {
    backgroundColor: "#292929",
    color: "white",
    margin: 15,
    height: 50,
    borderWidth: 2,
    borderColor: "#02DAC5",
    borderRadius: 20
  },
  containerListStyle: {
    backgroundColor: "#292929",
    margin: 15,
    textAlign: "center",
    width: "100%"
  }
});

export default ItineraryDetailScreen;
