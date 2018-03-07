import './styles.scss';
import cards from './cards.json';
require('angular');

import html2canvas from 'html2canvas';
import _ from 'lodash';

angular.module('cardMakerApp', []);
angular.module('cardMakerApp').constant('cards', cards);
angular.module('cardMakerApp').constant('_', _);
