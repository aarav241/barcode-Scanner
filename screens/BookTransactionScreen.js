import React from 'react';
import { Text, View, TouchableOpacity, StyleSheet, Image } from 'react-native';
import * as Permissions from 'expo-permissions';
import { BarCodeScanner } from 'expo-barcode-scanner';
import { TextInput } from 'react-native-gesture-handler';

export default class TransactionScreen extends React.Component {
    constructor(){
      super();
      this.state = {
        hasCameraPermissions: null,
        scanned: false,
        buttonState: 'normal',
        scannedBookId: '',
        scannedStudentId:''
      }
    }

    getCameraPermissions = async (id) =>{
      const {status} = await Permissions.askAsync(Permissions.CAMERA);
      
      this.setState({
        /*status === "granted" is true when user has granted permission
          status === "granted" is false when user has not granted the permission
        */
        hasCameraPermissions: status === "granted",
        buttonState: id,
        scanned: false
      });
    }

    handleBarCodeScanned = async({type, data})=>{
      this.setState({
        scanned: true,
        scannedData: data,
        buttonState: 'normal',
      });
    }

    render() {
      const hasCameraPermissions = this.state.hasCameraPermissions;
      const scanned = this.state.scanned;
      const buttonState = this.state.buttonState;

      if (buttonState !== "normal" && hasCameraPermissions){
        return(
          <BarCodeScanner
            onBarCodeScanned={scanned ? undefined : this.handleBarCodeScanned}
            style={StyleSheet.absoluteFillObject}
          />
        );
      }

      else if (buttonState === "normal"){
        return(
          <View style={styles.container}>
           
           <View>
             <Image source={require('../assets/assets/book.png')} style={{width:200,height:200}}/>
             <Text style={{textAlign:'center',alignSelf:'center',fontSize:35}}>Wily</Text>
           </View>
            <View style={styles.inputView}>

              <TextInput style={styles.inputBox}
            placeholder="Book_Id" 
            value={this.state.scannedBookId }/>

            <TouchableOpacity style={styles.scanButton}
            onPress={()=>{this.getCameraPermissions("BookId")}}>
              <Text style={styles.buttonText}>Scan Me</Text>
            </TouchableOpacity>
            
            </View>

            <View style={styles.inputView}>

              <TextInput style={styles.inputBox}
              placeholder="Student_Id"  
              value={this.state.scannedStudentId}/>

              <TouchableOpacity style={styles.scanButton}
               onPress={()=>{this.getCameraPermissions("StudentId")}}>
                <Text style={styles.buttonText}>Scan Me</Text>
              </TouchableOpacity>

            </View>

          <Text style={styles.displayText}>{
            hasCameraPermissions===true ? this.state.scannedData: "Request Camera Permission"
          }</Text>     

          <TouchableOpacity
            onPress={this.getCameraPermissions}
            style={styles.scanButton}>
            <Text style={styles.buttonText}>Scan QR Code</Text>
          </TouchableOpacity>
        </View>
        );
      }
    }
  }

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center'
    },
    displayText:{
      fontSize: 15,
      textDecorationLine: 'underline'
    },
    scanButton:{
      backgroundColor: '#2196F3',
      padding: 10,
      margin: 10,
      width:50
    },
    buttonText:{
      fontSize: 20,
    },
    inputBox:{
      width:200,
      height:40,
      fontSize:20,
      borderWidth:1.5
    },
    inputView:{
      flexDirection:'row',
      margin:20
    }
  });