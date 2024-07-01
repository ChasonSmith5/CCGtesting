class settings {
    startingEng: number[];
    numTurns: number;
    numTypes: number;
    p1cards: number;
    p2cards: number;
    p1pwr: number[];
    p2pwr: number[];
    p1abl: number[];
    p2abl: number[];
    p1nrg: number[];
    p2nrg: number[];
    p1typ: number[];
    p2typ: number[];
    ptsToWin: number;
    engInc: number;
    startingAct: number[];
    actInc: number;
    constructor() {
        this.startingEng = [];
        this.numTurns = 0;
        this.numTypes = 0;
        this.p1cards = 0;
        this.p2cards = 0
        this.p1pwr = [];
        this.p2pwr = [];
        this.p1abl = [];
        this.p2abl = [];
        this.p1nrg = [];
        this.p2nrg = [];
        this.p1typ = [];
        this.p2typ = [];
        this.ptsToWin = 0;
        this.engInc = 0;
        this.startingAct = [];
        this.actInc = 0;
      document.addEventListener("DOMContentLoaded", this.loadFormData.bind(this));

    }
  
    loadFormData() {
      const jsonString = localStorage.getItem('formData');
  
      if (jsonString) {
        const form = JSON.parse(jsonString);
        console.log(form); // You can use the rules object as needed here
        try {
          // Destructure the rules object into individual variables
          this.p1cards = form.sceneData.p1c;
          this.p2cards = form.sceneData.p2c;
          this.p1abl = form.sceneData.p1a;
          this.p2abl = form.sceneData.p2a;
          this.p1typ = form.sceneData.p1t;
          this.p2typ = form.sceneData.p2t;
          this.p1nrg = form.sceneData.p1e;
          this.p2nrg = form.sceneData.p2e;
          this.p1pwr = form.sceneData.p1p;
          this.p2pwr = form.sceneData.p2p;
          this.ptsToWin = form.sceneData.ptswin;
          this.numTurns = form.sceneData.turns;
          this.numTypes = form.sceneData.types;
          this.startingEng = form.sceneData.energy;
          this.engInc = form.sceneData.endIncBy;
          this.startingAct = form.sceneData.act;
          this.actInc = form.sceneData.actIncBy;
  
        //   console.log(this.p1cards);
        //   console.log(this.p2cards);
        //   console.log(this.p1abl);
        //   console.log(this.p2abl);
        //   console.log(this.p1typ);
        //   console.log(this.p2typ);
        //   console.log(this.p1nrg);
        //   console.log(this.p2nrg);
        //   console.log(this.p1pwr);
        //   console.log(this.p2pwr);
        //   console.log(this.ptsToWin);
        //   console.log(this.numTurns);
        //   console.log(this.numTypes);
        //   console.log(this.startingEng);
        } catch (error) {
          console.error('Error parsing JSON:', error);
        }
      } else {
        console.error('No JSON data found in localStorage');
      }
    }
  }
  export { settings };
  //const formLoader = new FormLoader();