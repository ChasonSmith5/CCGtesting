export function restoreAlwaysVisibleFields() {
  // Restore saved data for always-visible fields
  const alwaysVisibleInputs = document.querySelectorAll('body > input[type="number"], #playToContainer input[type="number"], #turnContainer input[type="number"], #numTypesContainer input[type="number"], #p1in input[type="number"], #p2in input[type="number"]');
  alwaysVisibleInputs.forEach(input => {
    const inputElement = input as HTMLInputElement;
    var contentCheck: string | null  = localStorage.getItem(inputElement.id);
    if(contentCheck){
      contentCheck = localStorage.getItem(inputElement.id);
    }
  });
}
  
export function saveAlwaysVisibleFields() {
  // Save data for always-visible fields to local storage
  const alwaysVisibleInputs = document.querySelectorAll('body > input[type="number"], #playToContainer input[type="number"], #turnContainer input[type="number"], #numTypesContainer input[type="number"], #p1in input[type="number"], #p2in input[type="number"]');
  alwaysVisibleInputs.forEach(input => {
    const inputElement = input as HTMLInputElement;
    localStorage.setItem(inputElement.id, inputElement.value);
  });
}
  
  // Call saveData whenever necessary, for example, before page unload or refresh
  window.addEventListener('beforeunload', function (e) {
    saveAlwaysVisibleFields();
  });

  window.addEventListener('beforeunload', function (e) {
    saveVisibleFields();
  });
  
  function saveVisibleFields() {
    // Select all visible input fields
    const visibleInputs = document.querySelectorAll('.hidden-content input[type="number"]');
    
    // Iterate over each visible input field
    visibleInputs.forEach(input => {
      const inputElement = input as HTMLInputElement;
      localStorage.setItem(inputElement.id, inputElement.value);
  });
}