let arrOfResearcher = [
  {
    address: "0x123456789abcdef",
    addedRootAmount: "0",
    votingPower: "0",
  },
  {
    address: "0x123456789adef",
    addedRootAmount: "0",
    votingPower: "0",
  },
//   {
//     address: "0x123456789abf",
//     addedRootAmount: "100",
//     votingPower: "49000",
//   },
];

export const addRootAmount = (researcher, amount) => {
  let found = false;

  for (let i = 0; i < arrOfResearcher.length; i++) {
    if (arrOfResearcher[i].address == researcher) {
      let temp = Number(arrOfResearcher[i].addedRootAmount) + Math.sqrt(Number(amount));
      arrOfResearcher[i].addedRootAmount = temp.toString();
      found = true;
      break;
    }
  }

  if (!found) {
    let newRootAmount = 0;
    newRootAmount += Math.sqrt(Number(amount)).toString();
    let newProfile = {
      address: researcher,
      addedRootAmount: newRootAmount,
      votingPower: "0",
    };

    arrOfResearcher.push(newProfile);
  }
};

export const calculateVotingPower = () => {
  for (let i = 0; i < arrOfResearcher.length; i++) {
    let votingPower = Math.pow(Number(arrOfResearcher[i].addedRootAmount), 2);
    arrOfResearcher[i].votingPower = votingPower.toString();
  }
};

export const calculateTotalVP = () => {
  let totalVotingPower = 0;

  for (let i = 0; i < arrOfResearcher.length; i++) {
    totalVotingPower += Number(arrOfResearcher[i].votingPower);
  }

  console.log(totalVotingPower);

  return totalVotingPower;
};

export const calculatePoolContri = (poolAmount) => {
  let poolFractions = [];
  let totalVp = calculateTotalVP();

  for (let i = 0; i < arrOfResearcher.length; i++) {
    let amt = Number(Number(arrOfResearcher[i].votingPower) / totalVp) * poolAmount; // pool --> integer

    console.log(amt);
    poolFractions.push(Number(amt));
  }

  return poolFractions;
};

/*
    1. State Variable with arrOfResearcher
    2. Call addRootAmount(researcher, amount) when someone clicks on fund
    3. Once the funding is completed
        i. calculateVotingPower() 
        ii. calculateTotalVP()
        iii. calculatePoolContri(poolAmount)
    4. Array gets returned with numbers [amt1, amt2, amt3]
    5. Send the array of researcherAddresses[] and amounts[]
*/
