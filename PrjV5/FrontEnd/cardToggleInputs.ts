import { rulesHandle, mainViewModel } from "./systemSetting.js";
export function toggleCards(buttonNumber: number | string) {
    var contentId = "hiddenContent" + buttonNumber;
    if(buttonNumber == 1){
        var input = mainViewModel.p1Cards();
    }
    else if(buttonNumber == 2){
        var input = mainViewModel.p2Cards();
    }
    var numTimes = Math.round(Number(input)); // Round to nearest integer
  
    var content = document.getElementById(contentId);
  
    // If the hidden content is currently displayed, save the input values and collapse it
        // Otherwise, generate a label and input fields for each number input
        var output = "";
        for (var i = 0; i < numTimes; i++) {
            if (rulesHandle.abillities == true) {
                output += 'Card ' + (i + 1) + ' Abillity: <input type="number" id="ABL' + buttonNumber + '.' + (i + 1) + '" class="number-input" placeholder="ABL"><br>';
            }
            if (rulesHandle.energy == true) {
                if (rulesHandle.multi_energy == true) {
                    output += 'Card ' + (i + 1) + ' Energy Type: <input type="number" id="TYP' + buttonNumber + '.' + (i + 1) + '" class="number-input" placeholder="TYP"><br>';
                }
                output += 'Card ' + (i + 1) + ' Energy: <input type="number" id="NRG' + buttonNumber + '.' + (i + 1) + '" class="number-input" placeholder="NRG"><br>';
            }
            if (rulesHandle.power == true) {
                output += 'Card ' + (i + 1) + ' Power: <input type="number" id="PWR' + buttonNumber + '.' + (i + 1) + '" class="number-input" placeholder="PWR"><br>';
            }
            output += '<br>';
        }
  
        // Display the output
        if(content){
          content.innerHTML = output;
          content.style.display = "block";
        }
  
        // Restore input values
        restoreInputValues(buttonNumber, numTimes);
  }
  
  var inputField1 = document.getElementById("numberInput1");
//   console.log("huh");
if(inputField1){
  inputField1.addEventListener("input", function(event) {
    //   toggleCards(1);
  });
}

  var inputField2 = document.getElementById("numberInput2");
  if(inputField2){
    inputField2.addEventListener("input", function(event) {
      //   toggleCards(2);
    });
  }

  document.addEventListener("DOMContentLoaded", function() {
    // toggleCards(1);
    // toggleCards(2);
});
  
  function restoreInputValues(buttonNumber: string | number, numTimes: number) {
    for (var i = 0; i < numTimes; i++) {
        var abillityInput = getButton(buttonNumber, i, 'ABL') as HTMLInputElement;
        var energyTypeInput = document.getElementById('TYP' + buttonNumber + '.' + (i + 1)) as HTMLInputElement;
        var energyInput = document.getElementById('NRG' + buttonNumber + '.' + (i + 1)) as HTMLInputElement;
        var powerInput = document.getElementById('PWR' + buttonNumber + '.' + (i + 1)) as HTMLInputElement;
        
        if (abillityInput) abillityInput.value = localStorage.getItem('ABL' + buttonNumber + '.' + (i + 1)) || '';
        if (energyTypeInput) energyTypeInput.value = localStorage.getItem('TYP' + buttonNumber + '.' + (i + 1)) || '';
        if (energyInput) energyInput.value = localStorage.getItem('NRG' + buttonNumber + '.' + (i + 1)) || '';
        if (powerInput) powerInput.value = localStorage.getItem('PWR' + buttonNumber + '.' + (i + 1)) || '';
    }
  }
    
  function getButton(buttonNumber: string | number, i: number, identifier: string) {
    return document.getElementById(identifier + buttonNumber + '.' + (i + 1));
  }