angular.module('cardMakerApp').controller('MainController', ['cards', '_', function(cards, _) {
    var vm = this;
    vm.cards = _.filter(cards, function (it) {
        return !(it.hasOwnProperty('disabled') && it.disabled);
    });
}]);
