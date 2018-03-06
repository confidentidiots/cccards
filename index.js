import './styles.scss';
import cards from './cards.json';
require('angular');

import html2canvas from 'html2canvas';
import _ from 'lodash';

angular.module('cardMakerApp', []);

angular.module('cardMakerApp').controller('MainController', [function() {
    var vm = this;
    vm.cards = cards;
}]);
angular.module('cardMakerApp').controller('ToolsController', ['$q', function($q) {
    var vm = this;

    var indexedCards = _.keyBy(cards, 'id');
    indexedCards['backface'] = {
        id: 'backface',
        name: 'back face'
    };

    function divToData(cardDiv) {
        var future = $q.defer();
        html2canvas(cardDiv, {logging: false}).then(function(canvas) {
            var imgData = canvas.toDataURL("image/png");
            var cardJson = indexedCards[cardDiv.id];
            cardJson.cardImg = imgData;
            future.resolve(cardJson);
        });
        return future.promise;
    }
    function downloadAsJson(obj) {
        var dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(obj));
        var dlAnchorElem = document.createElement('a');
        dlAnchorElem.setAttribute("href", dataStr);
        dlAnchorElem.setAttribute("download", "carddata.json");
        dlAnchorElem.click();
    }
    function downloadAll() {
        var cardDivs = document.getElementsByClassName('card');
        console.log('found cards', cardDivs.length);
        var promises = [];
        for(var i = 0; i < cardDivs.length; i++) {
            var cardDiv = cardDivs[i];
            var promise = divToData(cardDiv);
            promises.push(promise);
        }
        $q.all(promises).then(function (all) {
            downloadAsJson(all);
        });
    }

    vm.download = function () {
        downloadAll();
    };
}]);
