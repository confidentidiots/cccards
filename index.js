import './styles.scss';
import cards from './cards.json';
require('angular');

angular.module('cardMakerApp', []);

angular.module('cardMakerApp').controller('MainController', [function() {
    var vm = this;
    vm.cards = cards;
}]);
