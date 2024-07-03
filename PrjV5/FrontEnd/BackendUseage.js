var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { addRules, deleteRules, editRules, getRules, getRulesById } from "./frontToBack.js";
import { logVariableValues, mainViewModel, updateButtonColors } from "./changeFilter.js";
var RuleIDs = [];
export function chooseGet() {
    var element = document.getElementById("get");
    if (element)
        element.style.display = 'flex';
    var element = document.getElementById("add");
    if (element)
        element.style.display = 'none';
    var element = document.getElementById("edit");
    if (element)
        element.style.display = 'none';
    var element = document.getElementById("delete");
    if (element)
        element.style.display = 'none';
    RuleIDs = [];
    fetchAndDisplayRules("getOptions", RuleIDs, 'Choose a rule to use');
    console.log(RuleIDs);
}
export function chooseAdd() {
    var element = document.getElementById("add");
    if (element)
        element.style.display = 'flex';
    var element = document.getElementById("get");
    if (element)
        element.style.display = 'none';
    var element = document.getElementById("edit");
    if (element)
        element.style.display = 'none';
    var element = document.getElementById("delete");
    if (element)
        element.style.display = 'none';
}
export function chooseEdit() {
    var element = document.getElementById("edit");
    if (element)
        element.style.display = 'flex';
    var element = document.getElementById("add");
    if (element)
        element.style.display = 'none';
    var element = document.getElementById("get");
    if (element)
        element.style.display = 'none';
    var element = document.getElementById("delete");
    if (element)
        element.style.display = 'none';
    fetchAndDisplayRules("editOptions", RuleIDs, 'Choose a rule to edit');
    console.log(RuleIDs);
}
export function chooseDelete() {
    var element = document.getElementById("delete");
    if (element)
        element.style.display = 'flex';
    var element = document.getElementById("add");
    if (element)
        element.style.display = 'none';
    var element = document.getElementById("edit");
    if (element)
        element.style.display = 'none';
    var element = document.getElementById("get");
    if (element)
        element.style.display = 'none';
    fetchAndDisplayRules("deleteOptions", RuleIDs, 'Choose a rule to delete');
    console.log(RuleIDs);
}
function fetchAndDisplayRules(id, ruleIDs, message) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const rules = yield getRules();
            console.log(rules);
            // Example of how to display the rules
            const rulesList = document.getElementById(id);
            if (rulesList) {
                rulesList.innerHTML = '';
                var defaultOption = document.createElement('option');
                defaultOption.value = '0';
                defaultOption.textContent = message;
                rulesList.appendChild(defaultOption);
                var count = 1;
                rules.forEach((rule) => {
                    const listItem = document.createElement('option');
                    listItem.textContent = JSON.stringify(rule.name); // Adjust based on the properties of Rule
                    ruleIDs.push(rule.id);
                    listItem.value = count.toString();
                    rulesList.appendChild(listItem);
                    count++;
                });
            }
        }
        catch (error) {
            console.error('Error fetching rules:', error);
        }
    });
}
export function getRule() {
    return __awaiter(this, void 0, void 0, function* () {
        var newRules = [];
        var selectedRule = document.getElementById("getOptions");
        if (selectedRule) {
            var selectedValue = selectedRule.value;
            if (parseInt(selectedValue) > 0) {
                // console.log(RuleIDs[parseInt(selectedValue) - 1]);
                yield grabRuleSet(RuleIDs[parseInt(selectedValue) - 1], newRules);
                console.log(newRules);
                const savedButtonSets = newRules;
                console.log(savedButtonSets);
                if (savedButtonSets) {
                    for (let i = 0; i < 10; i++) {
                        const buttonSet = mainViewModel.buttonSets()[i];
                        const value = savedButtonSets[i];
                        buttonSet.variableValue(value);
                        // console.log(buttonSet.variableValue())
                        updateButtonColors(buttonSet);
                    }
                    logVariableValues();
                }
            }
        }
    });
}
function grabRuleSet(id, newRules) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const rules = yield getRulesById(id);
            newRules.push(rules.turnBased);
            newRules.push(rules.playTurns);
            newRules.push(rules.playPoints);
            newRules.push(rules.actionBased);
            newRules.push(rules.energyBased);
            newRules.push(rules.multiEnergy);
            newRules.push(rules.abilities);
            newRules.push(rules.power);
            newRules.push(rules.simoPlay);
            newRules.push(rules.multiLocate);
        }
        catch (error) {
            console.error('Error fetching rules:', error);
        }
    });
}
export function addRule() {
    return __awaiter(this, void 0, void 0, function* () {
        // for(let i = 0; i < mainViewModel.buttonSets().length; i++){
        //     console.log(mainViewModel.buttonSets()[i].variableValue());
        // }
        var RuleName = document.getElementById("ruleName");
        if (RuleName.value != "") {
            let ruleConfig = {
                name: RuleName.value,
                turnBased: mainViewModel.buttonSets()[0].variableValue(),
                playTurns: mainViewModel.buttonSets()[1].variableValue(),
                playPoints: mainViewModel.buttonSets()[2].variableValue(),
                actionBased: mainViewModel.buttonSets()[3].variableValue(),
                energyBased: mainViewModel.buttonSets()[4].variableValue(),
                multiEnergy: mainViewModel.buttonSets()[5].variableValue(),
                abilities: mainViewModel.buttonSets()[6].variableValue(),
                power: mainViewModel.buttonSets()[7].variableValue(),
                simoPlay: mainViewModel.buttonSets()[8].variableValue(),
                multiLocate: mainViewModel.buttonSets()[9].variableValue()
            };
            console.log(JSON.stringify(ruleConfig));
            yield addRules(ruleConfig);
        }
    });
}
export function editRule() {
    return __awaiter(this, void 0, void 0, function* () {
        var selectedRule = document.getElementById("editOptions");
        var RuleName = document.getElementById("editName");
        if (RuleName.value != "") {
            if (selectedRule) {
                var selectedValue = selectedRule.value;
                if (parseInt(selectedValue) > 0) {
                    let ruleConfig = {
                        name: RuleName.value,
                        turnBased: mainViewModel.buttonSets()[0].variableValue(),
                        playTurns: mainViewModel.buttonSets()[1].variableValue(),
                        playPoints: mainViewModel.buttonSets()[2].variableValue(),
                        actionBased: mainViewModel.buttonSets()[3].variableValue(),
                        energyBased: mainViewModel.buttonSets()[4].variableValue(),
                        multiEnergy: mainViewModel.buttonSets()[5].variableValue(),
                        abilities: mainViewModel.buttonSets()[6].variableValue(),
                        power: mainViewModel.buttonSets()[7].variableValue(),
                        simoPlay: mainViewModel.buttonSets()[8].variableValue(),
                        multiLocate: mainViewModel.buttonSets()[9].variableValue()
                    };
                    console.log(JSON.stringify(ruleConfig));
                    yield editRules(ruleConfig, RuleIDs[parseInt(selectedValue) - 1]);
                }
            }
        }
    });
}
export function deleteRule() {
    return __awaiter(this, void 0, void 0, function* () {
        var selectedRule = document.getElementById("deleteOptions");
        if (selectedRule) {
            var selectedValue = selectedRule.value;
            if (parseInt(selectedValue) > 0) {
                yield deleteRules(RuleIDs[parseInt(selectedValue) - 1]);
            }
        }
    });
}
