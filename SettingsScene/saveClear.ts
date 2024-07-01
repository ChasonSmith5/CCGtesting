// scripts.js
import { mainViewModel } from "./systemSetting.js";
import { saveAlwaysVisibleFields } from "./visibleFields.js";
export function ClearEntries(exceptKey: string){
  const exceptValue0 = localStorage.getItem(exceptKey);
  const exceptValue1 = localStorage.getItem("buttonSets")
  // Clear all local storage
  localStorage.clear();

  // Restore the value for the key you want to keep
  if (exceptValue0 !== null) {
      localStorage.setItem(exceptKey, exceptValue0);
  }
  if (exceptValue1 !== null) {
    localStorage.setItem("buttonSets", exceptValue1);
}
    // Select all visible input fields and clear their values
    var visibleInputs = document.querySelectorAll('.hidden-content input[type="number"]');
    visibleInputs.forEach(input => {
      const inputElement = input as HTMLInputElement;
      inputElement.value = '';
  });
    // Select all input fields that are never hidden and clear their values
    mainViewModel.p1Cards("")
    mainViewModel.p2Cards("")
    mainViewModel.ptsNeed("")
    mainViewModel.totalTurn("")
    mainViewModel.numTypes("")
    mainViewModel.p1MadeCards([]);
    mainViewModel.p2MadeCards([]);
    saveAlwaysVisibleFields();
    mainViewModel.EnergyActions();
  }
  