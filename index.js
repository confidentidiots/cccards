import './styles.scss';
import cards from './cards.json';
require('angular');

import html2canvas from 'html2canvas';
import _ from 'lodash';

angular.module('cardMakerApp', []);

angular.module('cardMakerApp').controller('MainController', [function() {
    var vm = this;
    vm.cards = _.filter(cards, function (it) {
        return !(it.hasOwnProperty('disabled') && it.disabled);
    });
}]);
angular.module('cardMakerApp').controller('ToolsController', ['$q', function($q) {
    var vm = this;
    var html2canvasOpts = {
        logging: false
    };
    if (window.location.href.indexOf('://localhost/') !== -1) {
        html2canvasOpts.useCORS = false;
    }

    var indexedCards = _.keyBy(cards, 'id');
    indexedCards['backface'] = {
        id: 'backface',
        name: 'back face'
    };

    function divToData(cardDiv) {
        var future = $q.defer();
        html2canvas(cardDiv, html2canvasOpts).then(function(canvas) {
            var imgData = canvas.toDataURL("image/png");
            var cardJson = indexedCards[cardDiv.id];
            cardJson.cardImg = imgData;
            future.resolve(cardJson);
        });
        return future.promise;
    }
    function downloadAsJson(obj) {
        var jsStr = JSON.stringify(obj);
        console.log('bytes', jsStr.length);
        var blob = new Blob([jsStr], {type: "application/json"});
        var url  = URL.createObjectURL(blob);
        var a = document.createElement('a');
        a.setAttribute("href", url);
        a.setAttribute("download", "carddata.json");
        a.click();
    }
    function downloadAll() {
        var cardDivs = document.getElementsByClassName('card');
        console.log('downloading', cardDivs.length, 'cards');
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
