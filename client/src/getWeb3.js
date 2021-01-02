import Web3 from "web3";

/// Find or Inject Web3 Provider
/// Modern dapp browsers...

let getWeb3 = new Promise(function(resolve, reject) {
  // Wait for loading completion to avoid race conditions with web3 injection timing.
  window.addEventListener("load", async function() {
    var results;
    var web3;
    var web3Provider;

    if (window.ethereum) {
      web3Provider = window.ethereum;
      try {
        // Request account access
        await window.ethereum.enable();
        console.log("modern");
      } catch (error) {
        // User denied account access...
        console.error("User denied account access");
      }
    }
    // Legacy dapp browsers...
    else if (window.web3) {
      web3Provider = window.web3.currentProvider;
      console.log("legacy");
    }
    // If no injected web3 instance is detected, fall back to Ganache
    else {
      web3Provider = new Web3.providers.HttpProvider("http://localhost:7545");
      console.log("fallback to local");
    }

    // Checking if Web3 has been injected by the browser (Mist/MetaMask)
    web3 = new Web3(web3Provider);

    results = {
      web3: web3
    };
    resolve(results);
  });
});

export default getWeb3;
