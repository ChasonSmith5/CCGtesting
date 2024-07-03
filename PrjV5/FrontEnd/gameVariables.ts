export class gameVar{
    gameOver: number;
    startOver: number;
    roundNum: number;
    p1deck: any[];
    p1played: any[];
    p2deck: any[];
    p2played : any[];
    p1PwrPts: number;
    p2PwrPts: number;
    energyVal1: number[];
    energyVal2: number[];
    act1: number[];
    act2: number[];
    p1hand: any[];
    p2hand: any[];
    constructor(){
        this.gameOver = 0;
        this.startOver = 0;
        this.roundNum = 1;
        this.p1deck = [];
        this.p1played = []
        this.p2deck = [];
        this.p2played = [];
        this.p1PwrPts = 0;
        this.p2PwrPts = 0;
        this.energyVal1 = [];
        this.energyVal2 = [];
        this.act1 = [];
        this.act2 = [];
        this.p1hand = [];
        this.p2hand = [];
    }
}