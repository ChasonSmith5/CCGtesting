import { rulesHandle } from "./systemSetting.js";
// Class to represent a row in the seat reservations grid
function Card(abl, typ, nrg, pwr) {
    var self = this;
    self.abl = ko.observable(abl);
    self.typ = ko.observable(typ);
    self.nrg = ko.observable(nrg);
    self.pwr = ko.observable(pwr);
}
function Energy(energyVal) {
    var self = this;
    self.energyVal = ko.observable(energyVal);
}
function turnInfo(act, nrgNeed, actInc, nrgInc, savedEnergy = []) {
    var self = this;
    self.gameEnergy = ko.observableArray([]);
    if (savedEnergy[0]) {
        for (var i = 0; i < nrgNeed; i++) {
            try {
                // console.log(savedEnergy[i].energyVal)
                self.gameEnergy.push(new Energy(savedEnergy[i].energyVal));
            }
            catch (_a) {
                self.gameEnergy.push(new Energy(""));
            }
        }
    }
    else {
        for (var i = 0; i < nrgNeed; i++) {
            self.gameEnergy.push(new Energy(""));
        }
    }
    self.act = ko.observable(act);
    self.actInc = ko.observable(actInc);
    self.nrgInc = ko.observable(nrgInc);
}
export function MainViewModel() {
    var self = this;
    self.p1Cards = ko.observable(localStorage.getItem("numberInput1"));
    self.p2Cards = ko.observable(localStorage.getItem("numberInput2"));
    self.ptsNeed = ko.observable(localStorage.getItem("playToInput"));
    self.totalTurn = ko.observable(localStorage.getItem("turnInput"));
    self.numTypes = ko.observable(localStorage.getItem("numTypesInput"));
    self.warningMessage = ko.observable("");
    self.selectedOption = ko.observable();
    self.selectedOptionText = ko.observable();
    self.selectedCardIndex1 = ko.observable(0);
    self.selectedCardIndex2 = ko.observable(0);
    self.updateSelectedOptionText = function () {
        // Get the select element
        var select = document.getElementById('abillitiesPicker');
        // Get the text of the selected option
        var selectedText = select.options[select.selectedIndex].text;
        // Update the observable with the selected option text
        self.selectedOptionText(selectedText);
    };
    self.selectCard = function (index) {
        self.selectedCardIndex(index);
    };
    self.updateSelectedOptionText();
    self.logVariable = () => {
        console.log(self.p1Cards());
    };
    self.increaseCardIndex1 = function () {
        if (self.selectedCardIndex1() < self.p1Cards() - 1) {
            self.selectedCardIndex1(self.selectedCardIndex1() + 1);
        }
    };
    self.decreaseCardIndex1 = function () {
        if (self.selectedCardIndex1() > 0) {
            self.selectedCardIndex1(self.selectedCardIndex1() - 1);
        }
    };
    self.increaseCardIndex2 = function () {
        if (self.selectedCardIndex2() < self.p2Cards() - 1) {
            self.selectedCardIndex2(self.selectedCardIndex2() + 1);
        }
    };
    self.decreaseCardIndex2 = function () {
        if (self.selectedCardIndex2() > 0) {
            self.selectedCardIndex2(self.selectedCardIndex2() - 1);
        }
    };
    // Function to save data to localStorage
    self.saveData = function () {
        var data = ko.toJS(self.p1MadeCards);
        localStorage.setItem('p1CardData', JSON.stringify(data));
        data = ko.toJS(self.p2MadeCards);
        localStorage.setItem('p2CardData', JSON.stringify(data));
        data = ko.toJS(self.turn);
        localStorage.setItem('turnData', JSON.stringify(data));
        data = ko.toJS(self.p1Cards);
        localStorage.setItem('numberInput1', data);
        data = ko.toJS(self.p2Cards);
        localStorage.setItem('numberInput2', data);
    };
    self.p1MadeCards = ko.observableArray([]);
    self.p2MadeCards = ko.observableArray([]);
    self.turn = ko.observableArray([]);
    self.addCards1 = function (data, value) {
        var saved_data = localStorage.getItem('p1CardData');
        // console.log(saved_data)
        self.p1MadeCards([]);
        var cardToAdd = parseInt(value);
        // console.log(cardToAdd)
        if (saved_data) {
            var parsedData = JSON.parse(saved_data);
            if (parsedData) {
                for (var i = 0; i < cardToAdd; i++) {
                    var item = parsedData[i];
                    // console.log(item)
                    if (item) {
                        self.p1MadeCards.push(new Card(item.abl, item.typ, item.nrg, item.pwr));
                    }
                    else {
                        self.p1MadeCards.push(new Card("", "", "", ""));
                    }
                }
            }
            else {
                for (var i = 0; i < cardToAdd; i++) {
                    self.p1MadeCards.push(new Card("", "", "", ""));
                }
            }
        }
        else {
            for (var i = 0; i < cardToAdd; i++) {
                self.p1MadeCards.push(new Card("", "", "", ""));
            }
        }
        self.checkRules();
    };
    self.addCards2 = function (data, value) {
        var saved_data = localStorage.getItem('p2CardData');
        // console.log(saved_data)
        self.p2MadeCards([]);
        var cardToAdd = parseInt(value);
        // console.log(cardToAdd)
        if (saved_data) {
            var parsedData = JSON.parse(saved_data);
            if (parsedData) {
                for (var i = 0; i < cardToAdd; i++) {
                    var item = parsedData[i];
                    // console.log(item)
                    if (item) {
                        self.p2MadeCards.push(new Card(item.abl, item.typ, item.nrg, item.pwr));
                    }
                    else {
                        self.p2MadeCards.push(new Card("", "", "", ""));
                    }
                }
            }
            else {
                for (var i = 0; i < cardToAdd; i++) {
                    self.p2MadeCards.push(new Card("", "", "", ""));
                }
            }
        }
        else {
            for (var i = 0; i < cardToAdd; i++) {
                self.p2MadeCards.push(new Card("", "", "", ""));
            }
        }
        self.checkRules();
    };
    self.totalTurn.subscribe(function (newValue) {
        if (self.totalTurn() < 0 || self.totalTurn == "") {
            self.totalTurn(0);
        }
        else {
            self.EnergyActions(newValue, self.numTypes());
        }
    });
    self.numTypes.subscribe(function (newValue) {
        if (self.numTypes() > 6) {
            self.numTypes(6);
        }
        else {
            self.EnergyActions(self.totalTurn(), newValue);
        }
    });
    self.EnergyActions = function (turns, types) {
        var saved_data = localStorage.getItem('turnData');
        self.turn([]);
        if (saved_data) {
            var parsedData = JSON.parse(saved_data);
            if (parsedData) {
                console.log(parsedData);
                if (rulesHandle.multi_energy == false && self.numTypes() != 1) {
                    self.numTypes(1);
                    return;
                }
                var EnergyToAdd = parseInt(types);
                var turnsToDo = parseInt(turns);
                if (rulesHandle.energy == true) {
                    if (rulesHandle.play_num_turns == true) {
                        for (var i = 0; i < turnsToDo; i++) {
                            if (parsedData[i]) {
                                console.log(parsedData[i].gameEnergy);
                                self.turn.push(new turnInfo(parsedData[i].act, EnergyToAdd, parsedData[i].actInc, parsedData[i].nrgInc, parsedData[i].gameEnergy));
                            }
                            else {
                                self.turn.push(new turnInfo("", EnergyToAdd, "", ""));
                            }
                        }
                    }
                    else {
                        if (parsedData[0]) {
                            console.log(parsedData[0].gameEnergy);
                            self.turn.push(new turnInfo(parsedData[0].act, EnergyToAdd, parsedData[0].actInc, parsedData[0].nrgInc, parsedData[0].gameEnergy));
                        }
                        else {
                            self.turn.push(new turnInfo("", EnergyToAdd, "", ""));
                        }
                    }
                }
                else {
                    if (rulesHandle.play_num_turns == true) {
                        for (var i = 0; i < turnsToDo; i++) {
                            if (parsedData[i]) {
                                console.log(parsedData[i].gameEnergy);
                                self.turn.push(new turnInfo(parsedData[i].act, 0, parsedData[i].actInc, parsedData[i].nrgInc));
                            }
                            else {
                                self.turn.push(new turnInfo("", 0, "", ""));
                            }
                        }
                    }
                    else {
                        if (parsedData[0]) {
                            console.log(parsedData[0].gameEnergy);
                            self.turn.push(new turnInfo(parsedData[0].act, 0, parsedData[0].actInc, parsedData[0].nrgInc));
                        }
                        else {
                            self.turn.push(new turnInfo("", 0, "", ""));
                        }
                    }
                }
            }
            else {
                if (rulesHandle.multi_energy == false && self.numTypes() != 1) {
                    self.numTypes(1);
                    return;
                }
                var EnergyToAdd = parseInt(types);
                var turnsToDo = parseInt(turns);
                if (rulesHandle.energy == true) {
                    if (rulesHandle.play_num_turns == true) {
                        for (var i = 0; i < turnsToDo; i++) {
                            self.turn.push(new turnInfo("", EnergyToAdd, "", ""));
                        }
                    }
                    else {
                        self.turn.push(new turnInfo("", EnergyToAdd, "", ""));
                    }
                }
                else {
                    if (rulesHandle.play_num_turns == true) {
                        for (var i = 0; i < turnsToDo; i++) {
                            self.turn.push(new turnInfo("", 0, "", ""));
                        }
                    }
                    else {
                        self.turn.push(new turnInfo("", 0, "", ""));
                    }
                }
            }
        }
        else {
            if (rulesHandle.multi_energy == false && self.numTypes() != 1) {
                self.numTypes(1);
                return;
            }
            var EnergyToAdd = parseInt(types);
            var turnsToDo = parseInt(turns);
            if (rulesHandle.energy == true) {
                if (rulesHandle.play_num_turns == true) {
                    for (var i = 0; i < turnsToDo; i++) {
                        self.turn.push(new turnInfo("", EnergyToAdd, "", ""));
                    }
                }
                else {
                    self.turn.push(new turnInfo("", EnergyToAdd, "", ""));
                }
            }
            else {
                if (rulesHandle.play_num_turns == true) {
                    for (var i = 0; i < turnsToDo; i++) {
                        self.turn.push(new turnInfo("", 0, "", ""));
                    }
                }
                else {
                    self.turn.push(new turnInfo("", 0, "", ""));
                }
            }
        }
        self.checkRules();
    };
    self.checkRules = function () {
        // console.log(rulesHandle);
        // console.log(self.p1MadeCards());
        // console.log(self.p2MadeCards());
        // console.log(rulesHandle.abillities)
        if (rulesHandle.abillities == false) {
            var ablTXT = document.querySelectorAll('[id="abl"]');
            ablTXT.forEach(function (element) {
                element.style.display = 'none'; // Cast element to HTMLElement
            });
            for (var i = 0; i < self.p1MadeCards().length; i++) {
                // console.log(self.p1MadeCards()[i])
                // console.log(self.p1MadeCards()[i].abl());
                self.p1MadeCards()[i].abl(0);
            }
            for (var i = 0; i < self.p2MadeCards().length; i++) {
                self.p2MadeCards()[i].abl(0);
            }
        }
        if (rulesHandle.multi_energy == false) {
            var typTXT = document.querySelectorAll('[id="typ"]');
            typTXT.forEach(function (element) {
                element.style.display = 'none'; // Cast element to HTMLElement
            });
            for (var i = 0; i < self.p1MadeCards().length; i++) {
                self.p1MadeCards()[i].typ(5);
            }
            for (var i = 0; i < self.p2MadeCards().length; i++) {
                self.p2MadeCards()[i].typ(5);
            }
        }
        if (rulesHandle.energy == false) {
            var nrgTXT = document.querySelectorAll('[id="nrg"]');
            nrgTXT.forEach(function (element) {
                element.style.display = 'none'; // Cast element to HTMLElement
            });
            for (var i = 0; i < self.p1MadeCards().length; i++) {
                self.p1MadeCards()[i].nrg(0);
            }
            for (var i = 0; i < self.p2MadeCards().length; i++) {
                self.p2MadeCards()[i].nrg(0);
            }
            nrgTXT = document.querySelectorAll('[id="EnergyGame"]');
            nrgTXT.forEach(function (element) {
                element.style.display = 'none'; // Cast element to HTMLElement
            });
        }
        if (rulesHandle.power == false) {
            var pwrTXT = document.querySelectorAll('[id="pwr"]');
            pwrTXT.forEach(function (element) {
                element.style.display = 'none'; // Cast element to HTMLElement
            });
            for (var i = 0; i < self.p1MadeCards().length; i++) {
                self.p1MadeCards()[i].pwr(0);
            }
            for (var i = 0; i < self.p2MadeCards().length; i++) {
                self.p2MadeCards()[i].pwr(0);
            }
        }
        if (rulesHandle.play_num_turns == false) {
            var TrnTXT = document.querySelectorAll('[id="TurnGame"]');
            TrnTXT.forEach(function (element) {
                element.style.display = 'none'; // Cast element to HTMLElement
            });
        }
        else if (rulesHandle.play_num_turns == true) {
            var nonTrnTXT = document.querySelectorAll('[id="NonTurnGame"]');
            nonTrnTXT.forEach(function (element) {
                element.style.display = 'none'; // Cast element to HTMLElement
            });
        }
        if (rulesHandle.action_based == false) {
            var actTXT = document.querySelectorAll('[id="ActGame"]');
            actTXT.forEach(function (element) {
                element.style.display = 'none'; // Cast element to HTMLElement
            });
        }
    };
}
