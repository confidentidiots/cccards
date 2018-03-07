angular.module('cardMakerApp').directive('card', function () {
    return {
        scope: {
            card: '=it'
        },
        templateUrl: 'card.html'
    };
});
