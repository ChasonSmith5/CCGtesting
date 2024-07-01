import { rulesHandle } from "./systemSetting.js";
export function togglePointsNeededVisibility() {
    var container = document.getElementById("playToContainer");
    if (container) {
        if (rulesHandle.Play_to_num == true) {
            container.style.display = "block"; // Show the button
        }
        else {
            container.style.display = "none"; // Hide the button
        }
    }
}
export function toggleNumTurnsVisibility() {
    var container = document.getElementById("turnContainer");
    if (container) {
        if (rulesHandle.play_num_turns == true) {
            container.style.display = "block"; // Show the button
        }
        else {
            container.style.display = "none"; // Hide the button
        }
    }
}
export function toggleNumTypesVisibility() {
    var container = document.getElementById("numTypesContainer");
    if (container) {
        if (rulesHandle.energy == true && rulesHandle.multi_energy == true) {
            container.style.display = "block"; // Show the button
        }
        else {
            container.style.display = "none"; // Hide the button
        }
    }
}
