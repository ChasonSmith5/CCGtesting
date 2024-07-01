import { rulesHandle, mainViewModel } from "./systemSetting.js";
import { abillityInfo } from "./abillity.js";
var AbillitiesAdded = 0;
var abillity0 = new abillityInfo();
export var usersAbillities = [];
export function setUpAbillitiesUI() {
    if (rulesHandle.abillities == false) {
        var element = document.getElementById("leftMostTop");
        element.style.display = 'none';
        element = document.getElementById("leftMostCenter");
        element.style.display = 'none';
    }
    else {
        usersAbillities.push(abillity0);
        var storedAbilities = localStorage.getItem("usersAbl");
        if (storedAbilities) {
            usersAbillities = JSON.parse(storedAbilities);
        }
        AbillitiesAdded = Number(localStorage.getItem("AblAdd"));
        var content = document.getElementById("hiddenContent0");
        if (content) {
            var contentCheck = localStorage.getItem("abillityContent");
            if (contentCheck) {
                content.innerHTML = contentCheck;
            }
            content.style.display = 'block';
        }
        console.log(usersAbillities);
        restoreInputValuesInputs();
        addEvents();
    }
}
function saveInputs() {
    // Get the div containing the input fields
    var contentDiv = document.getElementById("hiddenContent0");
    // Get all input fields within the div
    if (contentDiv) {
        var inputFields = contentDiv.getElementsByTagName("input");
        // Create an array to hold the values
        var inputValues = [];
        // Loop through the input fields and save their values to the array
        for (var i = 0; i < inputFields.length; i++) {
            inputValues.push(inputFields[i].value);
        }
        // Save the array to local storage
        localStorage.setItem("ABLInputValues", JSON.stringify(inputValues));
    }
}
function restoreInputValuesInputs() {
    // Get the div containing the input fields
    var contentDiv = document.getElementById("hiddenContent0");
    // Get all input fields within the div
    if (contentDiv) {
        var inputFields = contentDiv.getElementsByTagName("input");
        // Loop through the input fields and save their values to the array
        var storedFields = localStorage.getItem("ABLInputValues");
        var grabbedValues = [];
        if (storedFields) {
            grabbedValues = JSON.parse(storedFields);
        }
        for (var i = 0; i < inputFields.length; i++) {
            if (grabbedValues == undefined) {
                inputFields[i].value = "";
            }
            else {
                inputFields[i].value = grabbedValues[i];
            }
            // console.log(grabbedValues[i]);
        }
    }
}
function addEvents() {
    const hiddenContent = document.getElementById('hiddenContent0');
    if (hiddenContent) {
        const inputs = hiddenContent.querySelectorAll('input');
        inputs.forEach(input => {
            input.addEventListener('input', () => {
                saveInputs();
                //   console.log("hi")
            });
        });
    }
}
export function addAbillity() {
    var output = "";
    const selectElement = document.getElementById('abillitiesPicker');
    const selectedValue = mainViewModel.selectedOption();
    console.log(selectedValue);
    if ((selectedValue) != 0) {
        AbillitiesAdded += 1;
        const ability = new abillityInfo();
        usersAbillities.push(ability);
        var ablTXT = selectElement.options[(selectedValue)].textContent;
        output += '<br>';
        if (ablTXT) {
            output += 'Abillity ' + AbillitiesAdded + ": " + replaceHashWithInput(ablTXT, AbillitiesAdded.toString());
            output += '<br>';
            set_abillity_variables(ablTXT, selectedValue);
        }
        // 'Card ' + (i + 1) + ' Energy: <input type="number" id="NRG' + buttonNumber + '.' + (i + 1) + '" class="number-input" placeholder="NRG"><br>';
        var content = document.getElementById("hiddenContent0");
        saveInputs();
        if (content) {
            content.innerHTML += output;
            // console.log(content.innerHTML);
            content.style.display = "block";
            localStorage.setItem("abillityContent", content.innerHTML);
            localStorage.setItem("AblAdd", String(AbillitiesAdded));
            localStorage.setItem("usersAbl", JSON.stringify(usersAbillities));
            restoreInputValuesInputs();
            addEvents();
            saveInputs();
        }
    }
}
function replaceHashWithInput(str, ablID) {
    const PWRinputField = '<input type="number" id="ABLPWR' + '.' + (ablID) + '" class="number-input" placeholder="PWR">';
    const TYPinputField = '<input type="number" id="ABLTYP' + '.' + (ablID) + '" class="number-input" placeholder="TYP">';
    const NRGinputField = '<input type="number" id="ABLNRG' + '.' + (ablID) + '" class="number-input" placeholder="NRG">';
    return str.replace(/PWR#/g, PWRinputField).replace(/TYP#/g, TYPinputField).replace(/NRG#/g, NRGinputField);
}
function set_abillity_variables(str, gloablID) {
    if (str.includes("PWR#")) {
        usersAbillities[AbillitiesAdded].powerIsAdded = true;
    }
    if (str.includes("NRG#")) {
        usersAbillities[AbillitiesAdded].costIsAffected = true;
    }
    if (str.includes("TYP#")) {
        usersAbillities[AbillitiesAdded].typeIsAffected = true;
    }
    usersAbillities[AbillitiesAdded].abillityGlobalID = gloablID;
}
export function clearABL() {
    localStorage.removeItem("usersAbl");
    localStorage.removeItem("AblAdd");
    localStorage.removeItem("abillityContent");
    AbillitiesAdded = 0;
    usersAbillities = [];
    usersAbillities.push(abillity0);
    var content = document.getElementById("hiddenContent0");
    if (content === null || content === void 0 ? void 0 : content.innerHTML) {
        content.innerHTML = null;
    }
}
export function setPwrNrgTypValues() {
    for (let i = 0; i < usersAbillities.length; i++) {
        if (usersAbillities[i].powerIsAdded == true) {
            var PwrVal = document.getElementById("ABLPWR." + i);
            if (PwrVal.value == "") {
                PwrVal.value = "0";
            }
            usersAbillities[i].powerAdded = PwrVal.value;
        }
        if (usersAbillities[i].costIsAffected == true) {
            var NrgVal = document.getElementById("ABLNRG." + i);
            if (NrgVal.value == "") {
                NrgVal.value = "0";
            }
            usersAbillities[i].costAffected = NrgVal.value;
        }
        if (usersAbillities[i].typeIsAffected == true) {
            var TypVal = document.getElementById("ABLTYP." + i);
            if (TypVal.value == "") {
                TypVal.value = "0";
            }
            usersAbillities[i].typeAffected = TypVal.value;
        }
        console.log(usersAbillities[i]);
    }
    localStorage.setItem('abilities', JSON.stringify(usersAbillities));
}
