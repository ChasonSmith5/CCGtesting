import { rulesHandler } from "./SceneBuilder.js";
var exclusiveID = 1;
export function resetID() {
    exclusiveID = 1;
}
export function makeCard(power, cost, abillity, type) {
    this.OGPower = power;
    this.newPower = power;
    this.OGCost = cost;
    this.newCost = cost;
    this.abillity = abillity;
    this.Etype = type;
    this.id = exclusiveID;
    this.canRemove = true;
    if (rulesHandler.action_based == false) {
        this.abillityAvailable = null;
    }
    else {
        this.abillityAvailable = true;
    }
    this.tapped = false;
    exclusiveID++;
    this.ToBePlayed = false;
}
