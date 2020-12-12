import React, {PureComponent} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
} from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';
import CustomSafeAreaView from '../../../components/CustomSafeAreaView/CustomSafeAreaView';
import commonStyles from '../../../styles/commonStyles';
import {getAsyncStorage} from '../../../utils/storage/index';
import Video from 'react-native-video';
@CustomSafeAreaView()
class croperImage extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      image: null,
      images: null,
      imageStyle: {},
    };
    this.renderAsset = this.renderAsset.bind(this);
  }

  componentDidMount() {
    getAsyncStorage('@systemInfo').then((res) => {
      this.windowWidth = res.width;
      this.setState({
        imageStyle: {
          width: this.windowWidth / 2,
          resizeMode: 'contain',
          height: this.windowWidth / 3,
        },
      });
    });
  }

  _handleImagePicker(config = {}) {
    const {
      isCrop = false,
      multiple = false,
      mediaType = 'photo',
      type = 'gallery', // 'camera'
    } = config;
    const eventName = type === 'gallery' ? 'openPicker' : 'openCamera';
    console.log(eventName, mediaType, isCrop, multiple);
    ImagePicker[eventName]({
      width: 300,
      height: 400,
      mediaType,
      cropping: isCrop,
      multiple,
      cropperToolbarTitle: '图片裁剪',
      cropperChooseText: '确认',
      cropperCancelText: '取消',
      includeExif: true,
    })
      .then((res) => {
        if (multiple) {
          const result = res.map((item) => {
            const {path, width, height, mime} = item;
            return {
              uri: path,
              width: width,
              height: height,
              mime: mime,
            };
          });
          this.setState({
            image: null,
            images: result,
          });
        } else {
          const {path, width, height, mime} = res;
          this.setState({
            image: {
              uri: path,
              width: width,
              height: height,
              mime: mime,
            },
            images: null,
          });
        }
        console.log(multiple);
      })
      .catch((err) => {
        console.log('err: ', err);
      });
  }

  renderAsset(media) {
    if (media.mime && media.mime.toLowerCase().indexOf('video/') !== -1) {
      return this.renderVideo(media);
    }

    return this.renderImage(media);
  }

  renderVideo(media) {
    return (
      <View style={styles.videoWrapper}>
        <Video
          source={{uri: media.uri, type: media.mime}}
          style={styles.video}
          rate={1}
          paused={false}
          volume={1}
          muted={false}
          resizeMode={'cover'}
          onError={(e) => console.log('video err:', e)}
          onLoad={(load) => console.log(load)}
          repeat={true}
          controls={true}
        />
      </View>
    );
  }

  renderImage(media) {
    return (
      <Image style={[styles.image, this.state.imageStyle]} source={media} />
    );
  }

  render() {
    const {image, images} = this.state;
    return (
      <>
        <ScrollView style={[commonStyles.container]}>
          <View style={styles.wrapper}>
            {image ? this.renderAsset(image) : null}
            {images
              ? images.map((i) => (
                  <View key={i.uri}>{this.renderAsset(i)}</View>
                ))
              : null}
          </View>
        </ScrollView>
        <View style={styles.operateWrapper}>
          <TouchableOpacity
            onPress={() => {
              this._handleImagePicker();
            }}>
            <View style={styles.btnWrapper}>
              <Text style={styles.btnText}> 相册图片（原图）</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              this._handleImagePicker({
                isCrop: true,
              });
            }}>
            <View style={styles.btnWrapper}>
              <Text style={styles.btnText}> 相册图片（裁剪） </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              this._handleImagePicker({
                multiple: true,
              });
            }}>
            <View style={styles.btnWrapper}>
              <Text style={styles.btnText}> 多图上传 </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              this._handleImagePicker({
                type: 'camera',
              });
            }}>
            <View style={styles.btnWrapper}>
              <Text style={styles.btnText}> 拍照</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              this._handleImagePicker({
                type: 'camera',
                mediaType: 'video',
              });
            }}>
            <View style={styles.btnWrapper}>
              <Text style={styles.btnText}> 录像</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              this._handleImagePicker({
                mediaType: 'video',
              });
            }}>
            <View style={styles.btnWrapper}>
              <Text style={styles.btnText}> 选择视屏</Text>
            </View>
          </TouchableOpacity>
        </View>
      </>
    );
  }
}

const styles = StyleSheet.create({
  operateWrapper: {
    paddingHorizontal: 10,
    flexDirection: 'row',
    marginTop: 10,
    flexWrap: 'wrap',
  },
  btnWrapper: {
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#3eaf7c',
    borderRadius: 4,
    paddingHorizontal: 10,
    marginBottom: 10,
    marginRight: 5,
  },
  btnText: {
    fontSize: 16,
    color: '#fff',
  },
  wrapper: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  videoWrapper: {
    height: 300,
    flex: 1,
    backgroundColor: '#eee',
  },
  video: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
});

export default croperImage;
