import { gameVariables } from "./SceneBuilder.js";
// Class to represent a row in the seat reservations grid
function handCard(card) {
    var self = this;
    self.abillity = ko.observable(card.abillity);
    self.Etype = ko.observable(card.Etype);
    self.newCost = ko.observable(card.newCost);
    self.newPower = ko.observable(card.newPower);
    self.id = ko.observable(card.id);
    self.OGPower = ko.observable(card.OGPower);
    self.OGCost = ko.observable(card.OGCost);
    self.canRemove = ko.observable(card.canRemove);
    self.abillityAvailable = ko.observable(card.abillityAvailable);
    self.tapped = ko.observable(card.tapped);
    self.ToBePlayed = ko.observable(card.ToBePlayed);
}
export function GameViewModel() {
    var self = this;
    self.logVariable = () => {
        console.log();
    };
    self.p1HandCards = ko.observableArray([]);
    self.p2HandCards = ko.observableArray([]);
    self.p1PlayedCards = ko.observableArray([]);
    self.p2PlayedCards = ko.observableArray([]);
    self.addP1Hand = function (data, fromWhere, index) {
        if (fromWhere == "deck") {
            index = 0;
            self.p1HandCards.push(new handCard(gameVariables.p1deck[index]));
            gameVariables.p1deck.shift();
        }
        else if (fromWhere == "played") {
            self.p1HandCards.push(new handCard(self.p1PlayedCards[index]));
            //remove p1Played function
        }
    };
    self.addP2Hand = function (data, fromWhere, index) {
        if (fromWhere == "deck") {
            index = 0;
            self.p2HandCards.push(new handCard(gameVariables.p2deck[index]));
            gameVariables.p2deck.shift();
        }
        else if (fromWhere == "played") {
            self.p2HandCards.push(new handCard(self.p2PlayedCards[index]));
            //remove p2Played function
        }
    };
    self.addP1Played = function (data, fromWhere, index) {
        if (fromWhere == "deck") {
            index = 0;
            self.p1PlayedCards.push(new handCard(gameVariables.p1deck[index]));
            gameVariables.p1deck.shift();
        }
        else if (fromWhere == "hand") {
            self.p1PlayedCards.push(new handCard(self.p1HandCards[index]));
            //remove p1Hand function
        }
    };
    self.addP2Played = function (data, fromWhere, index) {
        if (fromWhere == "deck") {
            index = 0;
            self.p2PlayedCards.push(new handCard(gameVariables.p2deck[index]));
            gameVariables.p2deck.shift();
        }
        else if (fromWhere == "hand") {
            self.p2PlayedCards.push(new handCard(self.p2HandCards[index]));
            //remove p1Hand function
        }
    };
}
