import { StatusBar } from 'expo-status-bar';
import { Button, StyleSheet, Text, View } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { ForceTrimMode, Tool, VESDK, VideoCodec, VideoFormat } from 'react-native-videoeditorsdk';

export default function App() {
  const openVideoFromCameraRollExample = async () => {
    try {
      // Select a video from the camera roll.
      let pickerResult = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Videos,
      });

      // Return if the video selection has been cancelled.
      if (pickerResult.canceled) {
        return;
      }

      // Open the video editor and handle the export as well as any occuring errors.
      const result = await VESDK.openEditor(pickerResult.assets[0].uri,
        {
          tools: [Tool.COMPOSITION, Tool.TRIM, Tool.TRANSFORM, Tool.STICKER, Tool.TEXT],
          trim: {maximumDuration: 14, forceMode: ForceTrimMode.ALWAYS},
          theme: 'light',
          export: {video: {format: VideoFormat.MP4, codec: VideoCodec.H264}},
          transform: {
            items: [{height: 16, width: 9, name: '16:9', toggleable: false}],
            allowFreeCrop: false,
          },
        })

      if (result != null) {
        // The user exported a new video successfully and the newly generated video is located at `result.video`.
        console.log(result?.video);
      } else {
        // The user tapped on the cancel button within the editor.
        return;
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={styles.container}>
      <Text>Open up App.js to start working on your app!</Text>
      <Button title="Open Video Editor" onPress={openVideoFromCameraRollExample}/>
      <StatusBar style="auto"/>
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
