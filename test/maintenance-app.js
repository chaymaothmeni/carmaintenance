let web3;
let account;
let contract;

const address = "0xE6B612D3a36171ce0157A8822115e99D6302eCBF";

const abi = [{
"inputs": [],
"stateMutability": "nonpayable",
"type": "constructor"
},
{
"anonymous": false,
"inputs": [
{
"indexed": true,
"internalType": "string",
"name": "matricule",
"type": "string"
},
{
"indexed": false,
"internalType": "uint256",
"name": "date",
"type": "uint256"
},
{
"indexed": false,
"internalType": "uint256",
"name": "kilometrage",
"type": "uint256"
},

{
"indexed": false,
"internalType": "string",
"name": "typeIntervention",
"type": "string"
},
{
"indexed": false,
"internalType": "address",
"name": "garage",
"type": "address"
}
],
"name": "InterventionAjoutee",
"type": "event"
},
{
"inputs": [
{
"internalType": "address",
"name": "",
"type": "address"
}
],
"name": "garagesAutorises",
"outputs": [
{
"internalType": "bool",

"name": "",
"type": "bool"
}
],
"stateMutability": "view",
"type": "function",
"constant": true
},
{
"inputs": [
{
"internalType": "string",
"name": "",
"type": "string"
},
{
"internalType": "uint256",
"name": "",
"type": "uint256"
}
],
"name": "historiqueVehicules",
"outputs": [
{
"internalType": "uint256",
"name": "date",
"type": "uint256"
},

{
"internalType": "uint256",
"name": "kilometrage",
"type": "uint256"
},
{
"internalType": "string",
"name": "typeIntervention",
"type": "string"
},
{
"internalType": "address",
"name": "garage",
"type": "address"
}
],
"stateMutability": "view",
"type": "function",
"constant": true
},
{
"inputs": [],
"name": "proprietaire",
"outputs": [
{
"internalType": "address",
"name": "",
"type": "address"

}
],
"stateMutability": "view",
"type": "function",
"constant": true
},
{
"inputs": [
{
"internalType": "address",
"name": "_garage",
"type": "address"
}
],
"name": "autoriserGarage",
"outputs": [],
"stateMutability": "nonpayable",
"type": "function"
},
{
"inputs": [
{
"internalType": "string",
"name": "_matricule",
"type": "string"
},
{
"internalType": "uint256",

"name": "_kilometrage",
"type": "uint256"
},
{
"internalType": "string",
"name": "_typeIntervention",
"type": "string"
}
],
"name": "addIntervention",
"outputs": [],
"stateMutability": "nonpayable",
"type": "function"
},
{
"inputs": [
{
"internalType": "string",
"name": "_matricule",
"type": "string"
}
],
"name": "getHistory",
"outputs": [
{
"components": [
{
"internalType": "uint256",

"name": "date",
"type": "uint256"
},
{
"internalType": "uint256",
"name": "kilometrage",
"type": "uint256"
},
{
"internalType": "string",
"name": "typeIntervention",
"type": "string"
},
{
"internalType": "address",
"name": "garage",
"type": "address"
}
],
"internalType": "struct CarMaintenance.Intervention[]",
"name": "",
"type": "tuple[]"
}
],
"stateMutability": "view",
"type": "function",
"constant": true
}

];


// 🔗 CONNECT AUTO
window.addEventListener("load", async () => {
  if (window.ethereum) {
    web3 = new Web3(window.ethereum);
    await window.ethereum.request({ method: "eth_requestAccounts" });

    let accounts = await web3.eth.getAccounts();
    account = accounts[0];

    contract = new web3.eth.Contract(abi, address);

    console.log("Connected:", account);
  } else {
    alert("Install MetaMask");
  }
});


// 🔍 GET HISTORY
async function getHistory(matricule) {
  try {
    let data = await contract.methods.getHistory(matricule).call();
    console.log(data);

    return data;
  } catch (err) {
    console.error(err);
  }
}


// ➕ ADD INTERVENTION
async function addIntervention(mat, km, type) {
  try {
    await contract.methods.addIntervention(mat, km, type)
      .send({ from: account });

    alert("Intervention ajoutée !");
  } catch (err) {
    console.error(err);
  }
}