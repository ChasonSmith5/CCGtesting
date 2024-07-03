class rules {
    localStorageKey: any;
    turn_based: null;
    Play_to_num: null;
    play_num_turns: null;
    action_based: null;
    energy: null;
    multi_energy: null;
    simo_turn: null;
    multi_locate: null;
    abillities: null;
    power: null;
    constructor(localStorageKey: string) {
      this.localStorageKey = localStorageKey;
      
      // Initialize class variables
      this.turn_based = null;
      this.Play_to_num = null;
      this.play_num_turns = null;
      this.action_based = null;
      this.energy = null;
      this.multi_energy = null;
      this.simo_turn = null;
      this.multi_locate = null;
      this.abillities = null;
      this.power = null;
  
      document.addEventListener("DOMContentLoaded", this.init.bind(this));
    }
  
    init() {
      const jsonData = localStorage.getItem(this.localStorageKey);
      
      if (jsonData) {
        try {
          const rulesJ = JSON.parse(jsonData);
          console.log(rulesJ);
  
          this.parseRules(rulesJ);
        } catch (error) {
          console.error('Error parsing JSON:', error);
        }
      } else {
        console.error('No JSON data found in localStorage');
      }
    }
  
    parseRules(rules: any) {
      // console.log(rules);
        const turn_based = rules[1];
        const Play_to_num = rules[2];
        const play_num_turns = rules [3];
        const action_based = rules [4];
        const energy = rules [5];
        const multi_energy = rules [6];
        const simo_turn = rules [7];
        const multi_locate = rules [8];
        const abillities = rules [9];
        const power = rules [10];

  
        // Assign to class variables
        this.turn_based = turn_based;
        this.Play_to_num = Play_to_num;
        this.play_num_turns = play_num_turns;
        this.action_based = action_based;
        this.energy = energy;
        this.multi_energy = multi_energy;
        this.simo_turn = simo_turn;
        this.multi_locate = multi_locate;
        this.abillities = abillities;
        this.power = power;
  
        // Now you can use these variables in your code
        // console.log(this.turn_based);
        // console.log(this.Play_to_num);
        // console.log(this.play_num_turns);
        // console.log(this.action_based);
        // console.log(this.energy);
        // console.log(this.multi_energy);
        // console.log(this.simo_turn);
        // console.log(this.non_simo);
        // console.log(this.abillities);
        // console.log(this.power);
    }
  }
  
  // Usage
  export { rules };
//   const rulesHandler = new rules('rulesData');