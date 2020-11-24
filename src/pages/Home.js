import { StatusBar } from 'expo-status-bar';
import React,{useState} from 'react';
import { StyleSheet, Text,Image, View,ScrollView, TextInput } from 'react-native';
import { Header,Card,Button } from 'react-native-elements';
import { Dropdown } from 'react-native-material-dropdown';

export function Home() {
    const [fType, setFType] = useState('');
    const [pType, setPType] = useState('');
    const [rBulk, setRBulk] = useState('');
    const [rShock, setRShock] = useState('');
    const [unit, setUnit] = useState('');
    const [volume, setVolume] = useState('');
    // const [unit, setUnit] = useState('');
    // const [count, setCount] = useState('');
    // const [count1, setCount1] = useState('');
    const [products, setProducts] = useState([]);
    const [Bulk, setBulk] = useState('');
    const [Shock, setShock] = useState('');
    const [Bulk2, setBulk2] = useState('');
    const [Shock2, setShock2] = useState('');
    const [unit1,setUnit1]=useState('');
    const [unit2,setUnit2]=useState('');
    // const [value, onChangeText] = React.useState('Useless Placeholder');

    function calculate() {
      // console.log(typeof rBulk.substring(2))
      // console.log(rShock)
      let bulkRatio=parseFloat(rBulk.substring(2).replace(/,/g, ''));
      let shockRatio=parseFloat(rShock.substring(2).replace(/,/g, ''));
      console.log(bulkRatio)
      console.log(shockRatio)
        switch (unit) {
          case 'Liters':
            console.log(parseFloat(volume))
            setBulk((parseFloat(volume)/bulkRatio).toFixed(2))
            setShock((parseFloat(volume)/shockRatio).toFixed(2))
            setBulk2((parseFloat(volume)/(bulkRatio/1000)).toFixed(2))
            setShock2((parseFloat(volume)/(shockRatio/1000)).toFixed(2))
            setUnit1('Litres')
            setUnit2('Millilitres')
            break;
          case 'Metric Tonnes':
            console.log(parseFloat(volume))
            let inLitter=parseFloat(volume)*1000;
            setBulk((parseFloat(inLitter)/bulkRatio).toFixed(2))
            setShock((parseFloat(inLitter)/shockRatio).toFixed(2))
            setBulk2('')
            setShock2('')
            setUnit1('Litres')
            setUnit2('')
            break;
          case 'Gallons':
            console.log(parseFloat(volume))
            let inLitters=parseFloat(volume)*3.78;
            // let gln=
            setBulk(((inLitters/bulkRatio)/3.78).toFixed(2))
            setShock(((inLitters/shockRatio)/3.78).toFixed(2))
            setBulk2((((inLitters/(bulkRatio))/3.78)*128).toFixed(2))
            setShock2((((inLitters/(shockRatio))/3.78)*128).toFixed(2))
            setUnit1('Gallons')
            setUnit2('fluid ounces')
            break;
        
          default:
            break;
        }
    }

    function validateVolume(number) {
      setVolume(number.match(/^-?\d*(\.\d+)?$/))
    }
    let fuelType = [{
        value: 'ULSD Diesel Fuel',
      }, {
        value: 'Bio Diesel (up to B10)',
      }, {
        value: 'Unleaded Fuel',
      },{
        value: 'MGO/MDO',
      },{
        value: 'Low Sulfur Fuel Oil (180/380)',
      },{
        value: 'IFO 180 Bunker',
      },{
        value: 'IFO 380 Bunker',
      }
    ];
    // let products = [{
    //     value: 'ProActive',
    //   }, {
    //     value: '2.8K',
    //   }, {
    //     value: '15K with anti-freeze',
    //   },{
    //     value: '30K Concentrate',
    //   }
    // ];
    let units = [{
        value: 'Gallons',
      }, {
        value: 'Liters',
      }, {
        value: 'Metric Tonnes'
      }
    ];

    function handleFtypeChange(params) {
      setFType(params)
      switch (params) {
        case 'ULSD Diesel Fuel':
        case 'Bio Diesel (up to B10)':
          let products=[{
            value: 'ProActive',
          }, {
            value: '2.8K Winterizing Additive',
          }, {
            value: '15K with anti-freeze',
          },{
            value: '30K Concentrate',
          }
        ];
        setProducts(products)
        // setPType(products[0].value)
        // getRBulk(products[0].value)
          break;
        case 'Unleaded Fuel':
        case 'MGO/MDO':
          products=[{
            value: 'ProActive',
          }, {
            value: '15K with anti-freeze',
          },{
            value: '30K Concentrate',
          }
        ];
        setProducts(products)
        // setPType(products[0].value)
        // getRBulk(products[0].value)
          break;
        case 'Low Sulfur Fuel Oil (180/380)':
          case 'IFO 180 Bunker':
            case 'IFO 380 Bunker':
          products=[{
            value: '15K with anti-freeze',
          },{
            value: '30K Concentrate',
          }
        ];
        setProducts(products)
        // setPType(products[0].value)
        // getRBulk(products[0].value)
          break;
      
        default:
          break;
      }
    }
    
    function getRBulk(value) {
      setPType(value)
      console.log(pType)
      switch (value) {
        case 'ProActive':
              setRBulk('1:10,000')
              setRShock('1:4,000')
            break;
        case '2.8K Winterizing Additive':
              setRBulk('1:2,800')
              setRShock('1:2,800')
            break;
        case '15K with anti-freeze':
              setRShock('1:6,000')
              if (fType=='ULSD Diesel Fuel'||fType=='Bio Diesel (up to B10)'||fType=='Unleaded Fuel'||fType=='MGO/MDO') {
                setRBulk('1:15,000')
                // setRShock('1:4,000')
              }else{
                setRBulk('1:10,000')
              }
            break;
        case '30K Concentrate':
          setRShock('1:12,000')
          if (fType=='ULSD Diesel Fuel'||fType=='Bio Diesel (up to B10)'||fType=='Unleaded Fuel') {
            setRBulk('1:30,000')
            // setRShock('1:4,000')
          }else{
            setRBulk('1:20,000')
          }
        break;
      
        default:
          break;
      }
    }

    function headerImg() {
      return(
        <Image
          style={{width: 70, height: 40}}
          source={require('../../assets/FuelRight_Logo_black.png')}
         />
      );
    }

    function headerImgRight() {
      return(
        <Image
        resizeMode={'contain'} 
          style={{width: 200, height: 15}}
          source={require('../../assets/rcrs.png')}
         />
      );
    }
  return (
    <View style={styles.container}>
      <Header
        // placement="left"
        leftComponent={() => headerImg()}
        // centerComponent={{ text: 'Fuel Right', style: { color: '#fff',fontSize:20,fontWeight:'700' } }}
        // centerComponent={() => headerImg()}
        rightComponent={()=>headerImgRight()}
        containerStyle={{
          backgroundColor: 'white',
          justifyContent: 'space-around',
          shadowColor: '#000',
          shadowOffset: { width: 1, height: 5 },
          shadowOpacity:  0.09,
          shadowRadius: 5,
          elevation: 10,
          height:90
        }}
      />
      {/* <View style={styles.container}> */}
    <ScrollView vertical={true} style={{padding:15,paddingTop:20,paddingBottom:10}}>
      {/* <View style={{width:'100%'}}> */}
      <Text style={{fontSize:15,marginBottom:5,color:'#4c4c4c'}}>Select Fueltype</Text>
        <Dropdown
        // style={{backgroundColor:'#fff'}}
        containerStyle={styles.dropdown}
        inputContainerStyle={{ borderBottomColor: 'transparent',paddingTop:5 }}
        dropdownOffset={{top: 0, left: 0}}
        rippleInsets={{top: 0, bottom: 0, right: 0, left: 0}}
        pickerStyle={{height:'auto'}}
        // label='Favorite Fruit'
        data={fuelType}
        // value={}
        onChangeText={(value) => handleFtypeChange(value)}
      />
      <Text style={{fontSize:15,marginBottom:5,color:'#4c4c4c'}}>Select Product</Text>
        <Dropdown
        // style={{backgroundColor:'#fff'}}
        containerStyle={styles.dropdown}
        inputContainerStyle={{ borderBottomColor: 'transparent',paddingTop:5 }}
        dropdownOffset={{top: 0, left: 0}}
        rippleInsets={{top: 0, bottom: 0, right: 0, left: 0}}
        // label='Favorite Fruit'
        value={pType}
        data={products}
        pickerStyle={{height:'auto'}}
        onChangeText={(value) => getRBulk(value)}
      />
      {/* </View> */}
      {/* <View style={{color:'#040404',height:50,width:'40%'}}>
      </View> */}

      <View style={{ flexDirection:"row",marginBottom: 15 }}>
        <Card containerStyle={styles.leftCard} >
        <Text style={{color:'#4c4c4c',textAlign: 'center'}}>
            Recommended Bulk Dose Rate 
        </Text>
        <Card.Divider/>
        <Text style={{fontSize:20,color:'#4c4c4c',fontWeight:'bold',textAlign: 'center',}}>{rBulk}</Text>
        </Card>
        <Card containerStyle={styles.leftCard}>
        <Text style={{color:'#4c4c4c',textAlign: 'center',}}>
            Recommended Shock Dose Rate
        </Text>
        <Card.Divider/>
        <Text style={{fontSize:20,color:'#4c4c4c',fontWeight:'bold',textAlign: 'center',}}>{rShock}</Text>
        </Card>
      </View>
      {/* <Text style={{fontSize:15,marginBottom:5,color:'#040404'}}>Recommended Bulk Dose Rate</Text>
      <Text
          style={styles.input}
        >{rBulk}</Text>
        <Text style={{fontSize:15,marginBottom:5,color:'#040404'}}>Recommended Shock Dose Rate</Text>
        <Text
          style={styles.input}
        >{rShock}</Text> */}
        <Text style={{fontSize:15,marginBottom:5,color:'#4c4c4c'}}>Preferred Units of Measure</Text>
        <Dropdown
        // style={{backgroundColor:'#fff'}}
        containerStyle={styles.dropdown}
        inputContainerStyle={{ borderBottomColor: 'transparent',paddingTop:5 }}
        dropdownOffset={{top: 0, left: 0}}
        rippleInsets={{top: 0, bottom: 0, right: 0, left: 0}}
        pickerStyle={{height:'auto'}}
        // label='Favorite Fruit'
        data={units}
        onChangeText={(value) => setUnit(value)}
      />
      <Text style={{fontSize:15,marginBottom:5,color:'#4c4c4c'}}>Total Volume to be Treated</Text>
      <View style={{flexDirection:"row",width:'100%'}}>
      <TextInput
          value={volume}
          onChangeText={(count) => validateVolume(count)}
          // onChangeText={text => onChangeText(text)}
          placeholder={''}
          keyboardType='numeric'
          style={styles.volumeInput}
        />
        <Button
          containerStyle={styles.btnContainer}
          buttonStyle={styles.btnCalculate}
          title="Calculate"
          onPress={()=>calculate()}
        />
        </View>
        {/* <Card containerStyle={styles.resultContainer}>
        <Text style={{color:'#fff',textAlign: 'center',fontWeight:'700',fontSize:18}}>
            Recommended
        </Text> */}
        <View style={{ flexDirection:"row",marginBottom: 15 }}>
        <Card containerStyle={styles.leftCard} >
        <Text style={{color:'#4c4c4c',textAlign: 'center'}}>
          Recommended Bulk Dose
        </Text>
        <Card.Divider/>
        <Text style={{fontSize:22,color:'#3399ff',fontWeight:'bold',textAlign: 'center',}}>{Bulk}<Text style={{fontSize:12}}>{unit1}</Text></Text>
        <Text style={{fontSize:22,color:'#3399ff',fontWeight:'bold',textAlign: 'center',}}>{Bulk2}<Text style={{fontSize:12}}>{unit2}</Text></Text>
        </Card>
        <Card containerStyle={styles.leftCard}>
        <Text style={{color:'#4c4c4c',textAlign: 'center'}}>
          Recommended Shock Dose
        </Text>
        <Card.Divider/>
        <Text style={{fontSize:22,color:'#3399ff',fontWeight:'bold',textAlign: 'center',}}>{Shock}<Text style={{fontSize:12}}>{unit1}</Text></Text>
        <Text style={{fontSize:22,color:'#3399ff',fontWeight:'bold',textAlign: 'center',}}>{Shock2}<Text style={{fontSize:12}}>{unit2}</Text></Text>
        </Card>
      </View>
      {/* </Card> */}
      {/* <Text style={{fontSize:15,marginBottom:5,color:'#040404'}}>Recommended Bulk Dose</Text>
        <TextInput
          value={rShock}
          onChangeText={(count) => setCount(count)}
          placeholder={''}
          style={styles.input}
        />

      <Text style={{fontSize:15,marginBottom:5,color:'#040404'}}>Recommended Shock Dose</Text>
        <TextInput
          value={count1}
          onChangeText={(count) => setCount1(count)}
          placeholder={''}
          style={styles.input}
        /> */}
        <Image
          resizeMode={'contain'} 
          style={{ width: '100%', height: 70,flex: 1, alignSelf: 'stretch',marginBottom:10 }}
          source={require('../../assets/Pro_Active_Logo.png')}
         />
        <View style={{marginBottom:20}}></View>
      </ScrollView>
      </View>
      // </View>
  );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      // alignItems: 'center',
      // justifyContent: 'center',
      // backgroundColor: '#F2F2F3',
      backgroundColor:'#FFFFFF'
      // height:'100%',
      // padding:10
    },
    input: {
      width: '100%',
      height: 44,
      padding: 10,
      borderWidth: 0,
      borderRadius:4,
      // borderColor: '#3399ff',
      // borderBottomColor:'#000080',
      backgroundColor:'#FFFFFF',
      marginBottom: 15,
      shadowColor: '#000000',
      shadowOffset: { width: 0, height: 2 },
      shadowRadius: 5,
      shadowOpacity: 0.05,
      elevation: 5,
    },

    volumeInput:{
      width: '70%',
      height: 44,
      padding: 10,
      borderWidth: 1,
      borderRadius:4,
      borderColor: '#3399ff',
      borderBottomRightRadius:0,
      borderTopRightRadius:0,
      // borderBottomColor:'#000080',
      backgroundColor:'#FFFFFF',
      marginBottom: 15,
      shadowColor: '#000000',
      shadowOffset: { width: 0, height: 2 },
      shadowRadius: 5,
      shadowOpacity: 0.05,
      elevation: 5,
    },

    btnContainer:{
      width:'30%',
      // elevation: 5,s
      // marginBottom: 15,
    },

    btnCalculate:{
      // width: '66%',
      height: 44,
      padding: 10,
      borderWidth: 0,
      borderRadius:4,
      // borderColor: '#3399ff',
      borderTopLeftRadius:0,
      borderBottomLeftRadius:0,
      // borderBottomColor:'#000080',
      backgroundColor:'#3399ff',
      marginBottom: 15,
      // marginLeft:10,
      // shadowColor: '#000000',
      // shadowOffset: { width: 0, height: 4 },
      // shadowRadius: 10,
      // shadowOpacity: 0.9,
      // elevation: 10,
    },
    dropdown:{
      width: '100%',
      height: 44,
      // padding: 10,
      paddingLeft:10,
      paddingRight:10,
      borderWidth: 1,
      borderRadius:4,
      borderColor: '#3399ff',
      // borderBottomColor:'#000080',
      backgroundColor:'#FFFFFF',
      marginBottom: 15,
      shadowColor: '#000000',
      shadowOffset: { width: 0, height: 2 },
      shadowRadius: 5,
      shadowOpacity: 0.05,
      elevation: 5,
    },
    leftCard:{
      width:'49%',
      margin:6,
      marginRight:'1%',
      // borderColor: '#56C596',
      // backgroundColor:'#009a00',
      backgroundColor:'#fff',
      marginLeft:0,
      borderRadius:5,
      borderColor:'#3399ff',
      shadowColor: '#000000',
      shadowOffset: { width: 0, height: 2 },
      shadowRadius: 5,
      shadowOpacity: 0.05,
      elevation: 5,
      // marginRight:5
    },
    resultContainer:{
      backgroundColor:'#009a00',
      margin:0,
      borderRadius:8,
      marginBottom:15,
      padding:8
      // borderColor:'#000'
    },
    resultCard:{
      width:'49%',
      // borderColor:'#000'
      margin:6,
      borderColor: '#56C596',
      // backgroundColor:'#009a00',
      backgroundColor:'#fff',
      marginLeft:0,
      borderRadius:5,
      
      // borderColor:'#009a00'
      // marginRight:5
    },

    // rightCard:{
    //   width:'49%',
    //   borderRadius:5,
    //   margin:6,
    //   // marginLeft:,
    //   // borderColor: '#56C596',
    //   backgroundColor:'#fff',
    //   marginRight:0
    // }
  });