import React, {PureComponent} from 'react';
import {Image, ScrollView} from 'react-native';
import Carousel from 'react-native-snap-carousel';
import styles, {sliderWidth, itemWidth} from './style';

export default class snapCarousel extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      imageList: [
        {
          src: require('../../../assets/image/swiper/1.jpg'),
        },
        {
          src: require('../../../assets/image/swiper/2.jpg'),
        },
        {
          src: require('../../../assets/image/swiper/3.jpg'),
        },
        {
          src: require('../../../assets/image/swiper/4.jpg'),
        },
        {
          src: require('../../../assets/image/swiper/5.jpg'),
        },
      ],
    };
    this.renderItem = this.renderItem.bind(this);
  }

  renderItem({item}, width = itemWidth, height = 200) {
    return <Image style={{width, height}} source={item.src} />;
  }

  render() {
    const {imageList} = this.state;
    return (
      <ScrollView
        style={styles.containerWrapper}
        showsVerticalScrollIndicator={false}>
        <Carousel
          itemWidth={itemWidth}
          sliderWidth={sliderWidth}
          layout={'default'}
          data={imageList}
          renderItem={this.renderItem}
          loop={true}
          loopClonesPerSide={2}
          autoplay={true}
          autoplayDelay={500}
          autoplayInterval={3000}
          inactiveSlideScale={0.84}
          inactiveSlideOpacity={0.7}
          activeAnimationType={'spring'}
          activeAnimationOptions={{
            friction: 4,
            tension: 40,
          }}
          contentContainerCustomStyle={styles.sliderContentContainer}
        />
        <Carousel
          itemWidth={itemWidth}
          sliderWidth={sliderWidth}
          layout={'stack'}
          layoutCardOffset={18}
          data={imageList}
          renderItem={this.renderItem}
          loop={true}
          contentContainerCustomStyle={styles.sliderContentContainer}
        />
        <Carousel
          itemWidth={itemWidth}
          sliderWidth={sliderWidth}
          layout={'tinder'}
          layoutCardOffset={9}
          data={imageList}
          renderItem={this.renderItem}
          loop={true}
          contentContainerCustomStyle={styles.sliderContentContainer}
        />
        <Carousel
          itemWidth={sliderWidth}
          sliderWidth={sliderWidth}
          layout={'default'}
          layoutCardOffset={0}
          inactiveSlideScale={1}
          inactiveSlideOpacity={1}
          data={imageList}
          renderItem={(item) => this.renderItem(item, sliderWidth, 200)}
          loop={true}
          contentContainerCustomStyle={styles.sliderContentContainer}
        />
      </ScrollView>
    );
  }
}
