import * as React from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';


export default class TextAnimator extends React.Component {
  animatedValues = [];
  constructor(props) {
    super(props);
    const wordsArr = props.content.trim().split(' ');
    wordsArr.forEach((_,i) => {
      // For each word in the sentence create a new animated value
      this.animatedValues[i] = new Animated.Value(0);
    });
    this.wordsArr = wordsArr
  }

  componentDidMount() {
    this.animated();
  }

  animated = (toValue=1) => {
    const animations = this.wordsArr.map((_,i) => {
      return Animated.timing(this.animatedValues[i], {
        toValue,
        duration: this.props.duration,
        useNativeDriver: true
      })
    });
    Animated.stagger(this.props.duration/5, toValue === 0? animations.reverse(): animations).start(() => {
      setTimeout(() => {
        this.animated(toValue === 0? 1: 0)
      }, 1000);
      if (this.props.onFinish) {
        this.props.onFinish();
      }
    });
  }

  render() {
    return (
      <View style={[this.props.style, styles.textWrapper]}>
        {
        this.wordsArr.map((word, index) => {
          return (
            <Animated.Text
              key={`${word}-${index}`}
              style={[
                this.props.textStyle,
                {
                    opacity: this.animatedValues[index],
                    transform: [{ translateY: Animated.multiply(this.animatedValues[index], new Animated.Value(-10))}]
                }]}
            >
              {word}
              {`${index < this.wordsArr.length ? ' ': ''} `}
            </Animated.Text>
          )
        })
        }
      </View>
    );
  }
}

const styles = StyleSheet.create({
  textWrapper: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center'
  }
});