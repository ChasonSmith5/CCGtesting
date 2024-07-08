import { addRules, deleteRules, editRules, getRules, getRulesById, getRulesByUserExtension } from "./frontToBack.js";
import { logVariableValues, mainViewModel, updateButtonColors, variableValues } from "./changeFilter.js";

var RuleIDs: number[] = [];
export function chooseGet(){
    var element = document.getElementById("get");
    if(element)
    element.style.display = 'flex';
    var element = document.getElementById("add");
    if(element)
    element.style.display = 'none';
    var element = document.getElementById("edit");
    if(element)
    element.style.display = 'none';
    var element = document.getElementById("delete");
    if(element)
    element.style.display = 'none';
    RuleIDs = [];
    fetchAndDisplayRules("getOptions", RuleIDs, 'Choose a rule to use');
    console.log(RuleIDs);
}

export function chooseAdd(){
    var element = document.getElementById("add");
    if(element)
    element.style.display = 'flex';
    var element = document.getElementById("get");
    if(element)
    element.style.display = 'none';
    var element = document.getElementById("edit");
    if(element)
    element.style.display = 'none';
    var element = document.getElementById("delete");
    if(element)
    element.style.display = 'none';
}

export function chooseEdit(){
    var element = document.getElementById("edit");
    if(element)
    element.style.display = 'flex';
    var element = document.getElementById("add");
    if(element)
    element.style.display = 'none';
    var element = document.getElementById("get");
    if(element)
    element.style.display = 'none';
    var element = document.getElementById("delete");
    if(element)
    element.style.display = 'none';
    fetchAndDisplayRules("editOptions", RuleIDs, 'Choose a rule to edit');
    console.log(RuleIDs);
}

export function chooseDelete(){
    var element = document.getElementById("delete");
    if(element)
    element.style.display = 'flex';
    var element = document.getElementById("add");
    if(element)
    element.style.display = 'none';
    var element = document.getElementById("edit");
    if(element)
    element.style.display = 'none';
    var element = document.getElementById("get");
    if(element)
    element.style.display = 'none';
    fetchAndDisplayRules("deleteOptions", RuleIDs, 'Choose a rule to delete');
    console.log(RuleIDs);
}

async function fetchAndDisplayRules(id: string, ruleIDs: number[], message: string) {
    try {
        const rules = await getRulesByUserExtension(window.location.hash.slice(1));
        console.log(rules);
        // Example of how to display the rules
        const rulesList = document.getElementById(id);
        if(rulesList){
            rulesList.innerHTML = '';
            var defaultOption = document.createElement('option');
                defaultOption.value = '0';
                defaultOption.textContent = message;
                rulesList.appendChild(defaultOption);
            var count = 1;
            rules.forEach((rule: any) => {
                const listItem = document.createElement('option');
                listItem.textContent = JSON.stringify(rule.name); // Adjust based on the properties of Rule
                ruleIDs.push(rule.id);
                listItem.value = count.toString();
                rulesList.appendChild(listItem);
                count++;
            });
        }
    } catch (error) {
        console.error('Error fetching rules:', error);
    }
}

export async function getRule(){
    var newRules: boolean[] = [];
    var selectedRule = document.getElementById("getOptions") as HTMLSelectElement;
    if(selectedRule){
        var selectedValue = selectedRule.value;
        if(parseInt(selectedValue) > 0){
            // console.log(RuleIDs[parseInt(selectedValue) - 1]);
            await grabRuleSet(RuleIDs[parseInt(selectedValue) - 1], newRules)
            console.log(newRules);
            const savedButtonSets = newRules;
            console.log(savedButtonSets);
            if (savedButtonSets) {
                for(let i = 0; i < 10; i++){
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
}


async function grabRuleSet(id: number, newRules: boolean[]) {
    try {
        const rules = await getRulesById(id);
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
    } catch (error) {
        console.error('Error fetching rules:', error);
    }
}


export async function addRule(){
    // for(let i = 0; i < mainViewModel.buttonSets().length; i++){
    //     console.log(mainViewModel.buttonSets()[i].variableValue());
    // }
    var RuleName = document.getElementById("ruleName") as HTMLInputElement;
    if(RuleName.value != ""){
        let ruleConfig = {
            userExtension: window.location.hash.slice(1),
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
        await addRules(ruleConfig);
    }
}

export async function editRule(){
    var selectedRule = document.getElementById("editOptions") as HTMLSelectElement;
    var RuleName = document.getElementById("editName") as HTMLInputElement;
    if(RuleName.value != ""){
        if(selectedRule){
            var selectedValue = selectedRule.value;
            if(parseInt(selectedValue) > 0){
                let ruleConfig = {
                    userExtension: window.location.hash.slice(1),
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
                await editRules(ruleConfig, RuleIDs[parseInt(selectedValue) - 1]);
            }
        }
    }
}

export async function deleteRule(){
    var selectedRule = document.getElementById("deleteOptions") as HTMLSelectElement;
    if(selectedRule){
        var selectedValue = selectedRule.value;
        if(parseInt(selectedValue) > 0){
            await deleteRules(RuleIDs[parseInt(selectedValue) - 1]);
        }
    }
}