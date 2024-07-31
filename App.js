import { ScrollView, StyleSheet, Text, ActivityIndicator, TextInput, TouchableOpacity, View } from 'react-native';
import React, { useEffect, useState } from 'react';

export default function App({ navigation }) {
  const [search_text, setsearch_text] = useState('');
  const [loader, setloader] = useState(false);
  const [respData, setrespData] = useState(null);
  var api_key = "e2699e01fa0c77c31ea6acb9a8ae1b6c";
  const callApi = async (city) => {
    setrespData(null)
    setloader(true)
    const resp = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${api_key}`);
    const data = await resp.json();
    if (data.message == 0) {
      setrespData(data.list.map((itm) => {
        return {
          ...itm,
          dt_txt1: new Date(itm.dt_txt).getDate()
        }
      }).filter((v, i, a) => a.findIndex(v2 => ['dt_txt1'].every(k => v2[k] === v[k])) === i));
    } else {
      setrespData({})
    }
    setloader(false)

  };
  // console.log("respData",respData);
  return (
    <View style={{ marginTop: 50,marginBottom:100, marginHorizontal: 10 }}>
      <View style={{ marginBottom: 30, flexDirection: "row" }}>
        <TextInput
          style={{ padding: 5, width: "75%", marginRight: 10, borderWidth: 1, borderColor: "red" }}
          underlineColorAndroid="transparent"
          placeholder="Search "
          placeholderTextColor="grey"
          onChangeText={text => {
            setsearch_text(text)
            console.log("text", text);
          }}
        />
        <TouchableOpacity
          onPress={() => {
            callApi(search_text)
          }}
          style={{ backgroundColor: "red", padding: 5, width: "20%", alignItems: "center" }}>
          <Text >Search</Text>

        </TouchableOpacity>

      </View>
      {loader &&
        <View >
          <ActivityIndicator size="medium" color="red" />
        </View>
      }
      <ScrollView contentContainerStyle={{ flexGrow: 1}}>
        {
          respData != null && (
            Object.keys(respData).length > 0 ? respData.map((w_item,index) => {
              return (
                  <View key={index} style={{ borderWidth: 1, borderColor: "#000", marginBottom: 5 }}>
                    <View style={{ alignItems: "center", padding: 5, backgroundColor: "red", borderBottomWidth: 1 }}>
                      <Text>Date:{new Date(w_item.dt_txt).getDate() + "/" + new Date(w_item.dt_txt).getMonth() + "/" + new Date(w_item.dt_txt).getFullYear()}</Text>
                    </View>
                    <View style={{ alignItems: "center", padding: 5, borderBottomWidth: 1 }}>
                      <Text>Temperature</Text>
                    </View>
                    <View style={{ flexDirection: "row", borderBottomWidth: 1 }}>
                      <View style={{ borderRightWidth: 1, alignItems: "center", width: "50%" }}>
                        <Text >Min</Text>
                      </View>
                      <View style={{ alignItems: "center", width: "50%" }}>
                        <Text>Max</Text>
                      </View>
                    </View>
                    <View style={{ flexDirection: "row", borderBottomWidth: 1 }}>
                      <View style={{ borderRightWidth: 1, alignItems: "center", width: "50%" }}>
                        <Text >Pressure</Text>
                      </View>
                      <View style={{ alignItems: "center", width: "50%" }}>
                        <Text>{w_item.main.pressure}</Text>
                      </View>
                    </View>
                    <View style={{ flexDirection: "row", borderBottomWidth: 1 }}>
                      <View style={{ borderRightWidth: 1, alignItems: "center", width: "50%" }}>
                        <Text >Humidity</Text>
                      </View>
                      <View style={{ alignItems: "center", width: "50%" }}>
                        <Text>{w_item.main.humidity}</Text>
                      </View>
                    </View>
                    <View style={{ flexDirection: "row", borderBottomWidth: 1 }}>
                      <View style={{ borderRightWidth: 1, alignItems: "center", width: "50%" }}>
                        <Text >sea level</Text>
                      </View>
                      <View style={{ alignItems: "center", width: "50%" }}>
                        <Text>{w_item.main.sea_level}</Text>
                      </View>
                    </View>
                  </View>
              )
            })
              :
              <Text style={{ textAlign: "center" }}>no data found</Text>
          )

        }

      </ScrollView>
    </View>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
