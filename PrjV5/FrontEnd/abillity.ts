export class abillityInfo{
    abillityText: string;
    powerAdded: number;
    typeAffected: number;
    costAffected: number;
    powerIsAdded: boolean;
    typeIsAffected: boolean;
    costIsAffected: boolean;
    abillityGlobalID: number;
    constructor(){
        this.abillityText = "";
        this.powerAdded = 0;
        this.typeAffected = 0;
        this.costAffected = 0;
        this.costIsAffected = false;
        this.typeIsAffected = false;
        this.powerIsAdded = false;
        this.abillityGlobalID = 0;
    }
}