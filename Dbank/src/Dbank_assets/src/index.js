import { Dbank } from "../../declarations/Dbank";
import { HttpAgent } from "@dfinity/agent";

// 1. Create the agent
const agent = new HttpAgent({ host: "http://127.0.0.1:4943" });

// 2. Add this exact block below your agent creation
if (process.env.DFX_NETWORK !== "ic") {
  agent.fetchRootKey().catch(err => {
    console.warn("Unable to fetch root key. Check if dfx is running.");
    console.error(err);
  });
}

window.addEventListener("load", async function() {
  //console.log("finished loading");
  update();
});

document.querySelector("form").addEventListener("submit", async function(event) {
  event.preventDefault();
  //console.log("submit event");

  const button = event.target.querySelector("#submit-btn");

  const inputAmout = parseFloat(document.getElementById("input-amount").value);
  const outputAmount = parseFloat(document.getElementById("withdrawal-amount").value);

  button.setAttribute("disabled", true);

  if(document.getElementById("input-amount").value.length != 0) {
    await Dbank.topUp(inputAmout);
  }

  if(document.getElementById("withdrawal-amount").value.length != 0) {
    await Dbank.withdraw(outputAmount);
  }
  
  await Dbank.compound();

  update();

  document.getElementById("input-amount").value = "";
  document.getElementById("withdrawal-amount").value = "";

  button.removeAttribute("disabled");
});

async function update() {
  const currentAmount = await Dbank.checkBalance();
  document.getElementById("value").innerText = Math.round(currentAmount * 100) / 100;
};

console.log(process.env.DBANK_CANISTER_ID);