global.Buffer = global.Buffer || require('buffer').Buffer;
import {
  AppRegistry
} from 'react-native';
import App from './src/App';

AppRegistry.registerComponent('scavengerHunt', () => App);
