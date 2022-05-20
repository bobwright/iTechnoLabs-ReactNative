import React, {useState, useEffect} from 'react';
// import all the components we are going to use
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableHighlight,
  ScrollView,
  Dimensions,
  PermissionsAndroid,
  TextInput,
  TouchableOpacity,
  Linking
} from 'react-native';
import RNFetchBlob from 'rn-fetch-blob';
import SendIntentAndroid from "react-native-send-intent";
var Sound = require('react-native-sound');
Sound.setCategory('Playback');
function Audiodownload(props) {
  const { navigation, route } = props;
  const [fileUrl, setfileurl] = React.useState("https://file-examples.com/storage/feb04797b46286b5ea5f061/2017/11/file_example_MP3_1MG.mp3");
 

  const [audioLists, setaudioLists] = useState([]);
  const [playing, setPlaying] = useState();
  let sound1;

  useEffect(() => {
    listfiles()

  }, []);
  const listfiles = async () => {
   let RootDir1 = RNFetchBlob.fs.dirs.PictureDir;
 RNFetchBlob.fs.ls(RootDir1+'/AudioTest/')
    // files will an array contains filenames
    .then((files) => {
        console.log(files)
        setaudioLists(files)
    })
  }
  const checkPermission = async () => {
    // Function to check the platform
    // If Platform is Android then check for permissions.
    if (Platform.OS === 'ios') {
      downloadFile();
    } else {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
          {
            title: 'Storage Permission Required',
            message:
              'Application needs access to your storage to download File',
          }
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          // Start downloading
          downloadFile();
          console.log('Storage Permission Granted.');
        } else {
          // If permission denied then show alert
          Alert.alert('Error', 'Storage Permission Not Granted');
        }
      } catch (err) {
        // To handle permission related exception
        console.log("++++" + err);
      }
    }
  };

  const downloadFile = () => {

    // Get today's date to add the time suffix in filename
    let date = new Date();
    // File URL which we want to download
    let FILE_URL = fileUrl;
    // Function to get extention of the file url
    let file_ext = getFileExtention(FILE_URL);

    file_ext = '.' + file_ext[0];

    // config: To get response by passing the downloading related options
    // fs: Root directory path to download
    const { config, fs } = RNFetchBlob;
    let RootDir = fs.dirs.PictureDir;
    let options = {
      fileCache: true,
      addAndroidDownloads: {
        path:
          RootDir +
          '/AudioTest/file_' +
          Math.floor(date.getTime() + date.getSeconds() / 2) +
          file_ext,
        description: 'downloading file...',
        notification: true,
        // useDownloadManager works with Android only
        useDownloadManager: true,
      },
    };
    config(options)
      .fetch('GET', FILE_URL)
      .then(res => {
        // Alert after successful downloading
        console.log('res -> ', JSON.stringify(res.data));
        listfiles()
        alert('File Downloaded Successfully.');
      });
  };

  const getFileExtention = fileUrl => {
    // To get the file extension
    return /[.]/.exec(fileUrl) ?
      /[^.]+$/.exec(fileUrl) : undefined;
  };
  const play = (url) => {
    let RootDir3 = RNFetchBlob.fs.dirs.PictureDir;
    console.log(RootDir3+'/AudioTest/'+url)
   let audio=  new Sound(
     RootDir3+'/AudioTest/'+url,
      null,
      error => {
        if (error) {
          console.log('failed to load the sound', error);
          return;
        }
        // if loaded successfully
        console.log(
          'duration in seconds: ' +
            audio.getDuration() +
            'number of channels: ' +
            audio.getNumberOfChannels(),
        );
        audio.setVolume(0.3);
        return () => {
          audio.release();
          //playPause()
        };
        
      }
 )
  }

  const playPause = () => {
 
    if (sound1.isPlaying()) {
      sound1.pause();
      setPlaying(false);
    } else {
      setPlaying(true);
      sound1.play(success => {
        if (success) {
          setPlaying(false);
          console.log('successfully finished playing');
        } else {
          setPlaying(false);
          console.log('playback failed due to audio decoding errors');
        }
      });
    }
  };
  //var oldindex='';
  const clickSound = (item, index) => {
    if(sound1)
    {
    stopSound(item, index)
    }
    playSound(item, index)
  }
  const playSound = (item, index) => {
    let RootDir122 = RNFetchBlob.fs.dirs.PictureDir+'/AudioTest/'+item;
    
        sound1= new Sound(RootDir122, '', (error, _sound) => {
        if (error) {
          alert('error' + error.message);
          return;
        }
        sound1.setVolume(30);
        sound1.play(() => {
          sound1.release();
        });
      });
      sound1.stop();
      sound1.pause();
    };
  
  const stopSound = (item, index) => {
    sound1.stop();
    sound1.pause();
    sound1.stop(() => {
    });
  };
  const ItemView = (item, index) => {
    return (
      <View style={styles.feature} key={index}>
        <Text style={styles.textStyle}>{item}</Text>
        <TouchableOpacity onPress={() => clickSound(item, index)}>
          <Text style={styles.buttonPlay}>Play</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => stopSound(item, index)}>
          <Text style={styles.buttonStop}>Stop</Text>
        </TouchableOpacity>
      </View>
    );
  };
  return (
    
    <SafeAreaView style={styles.container}>
      <View style={styles.container}>
       
      <TextInput
        style={styles.input}
        onChangeText={setfileurl}
        value={fileUrl}
        placeholder="Enter Audio Url"
      />
      <TouchableOpacity
        style={styles.button}
        onPress={checkPermission}>
        <Text style={styles.buttonTextStyle}>
          Download File
        </Text>
      </TouchableOpacity>
      <ScrollView>
        <View style={{width:Dimensions.get('window').width-20}}>
            {
            audioLists.length>0 ?
            audioLists.map(ItemView)
            :
            null
            } 
            </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};
 

export default Audiodownload;
 
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    padding: 5,
  },
  input: {
    height: 50,
   borderWidth: 1,
   borderRadius:8,
    padding: 10,
   width:Dimensions.get('window').width-20
},

button: {
 // flex: 1,
  justifyContent: 'center',
  marginTop: 15,
  marginBottom:10,
  padding: 10,
  backgroundColor: '#8ad24e',
  marginRight: 2,
  marginLeft: 2,
},
buttonTextStyle: {
  color: '#fff',
  textAlign: 'center',
},

titleText: {
  fontSize: 22,
  textAlign: 'center',
  fontWeight: 'bold',
},
textStyle: {
  flex: 1,
  padding: 5,
  
},
buttonPlay: {
  fontSize: 16,
  margin:1,
  color: 'white',
  backgroundColor: 'rgba(00,80,00,1)',
  borderWidth: 1,
  borderColor: 'rgba(80,80,80,0.5)',
  overflow: 'hidden',
  paddingHorizontal: 15,
  paddingVertical: 7,
},
buttonStop: {
  margin:1,
  fontSize: 16,
  color: 'white',
  backgroundColor: 'rgba(80,00,00,1)',
  borderWidth: 1,
  borderColor: 'rgba(80,80,80,0.5)',
  overflow: 'hidden',
  paddingHorizontal: 15,
  paddingVertical: 7,
},
feature: {
  flexDirection: 'row',
  padding: 5,
  marginTop: 7,
  alignSelf: 'stretch',
  alignItems: 'center',
  borderTopWidth: 1,
  borderTopColor: 'rgb(180,180,180)',
},
});