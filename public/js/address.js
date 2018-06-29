const contractAddress = "0x3539ef0a666e2ebb12dbbd5dc565c35e5091ccb1";
const abi = [{"constant":true,"inputs":[],"name":"owner","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_address","type":"address"}],"name":"setSnowflakeAddress","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"inputs":[],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"name":"tokenId","type":"uint256"},{"indexed":false,"name":"claimedAddress","type":"address"}],"name":"AddressClaimed","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"tokenId","type":"uint256"},{"indexed":false,"name":"unclaimedAddress","type":"address"}],"name":"AddressUnclaimed","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"previousOwner","type":"address"},{"indexed":true,"name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"constant":true,"inputs":[{"name":"tokenId","type":"uint256"}],"name":"ownedAddresses","outputs":[{"name":"","type":"address[]"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"tokenId","type":"uint256"},{"name":"_address","type":"address"}],"name":"ownsAddress","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"sealedClaim","type":"bytes32"}],"name":"initiateClaim","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_address","type":"address"},{"name":"v","type":"uint8"},{"name":"r","type":"bytes32"},{"name":"s","type":"bytes32"},{"name":"secret","type":"bytes32"}],"name":"finalizeClaim","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_address","type":"address"}],"name":"unclaimAddress","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"_address","type":"address"},{"name":"messageHash","type":"bytes32"},{"name":"v","type":"uint8"},{"name":"r","type":"bytes32"},{"name":"s","type":"bytes32"}],"name":"isSigned","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"pure","type":"function"}]
var MyContract = new web3.eth.contract(abi, contractAddress);

function initializeWeb3() {
  if (!window.web3) {
    window.alert('No web3 provider found. Please install MetaMask or visit us on Trust.')
  } else {
    web3 = new Web3(window.web3.currentProvider) // the outer web3 needs to be in a script tag
    web3CheckOnce()
  }
}

async function web3CheckOnce() {
  if (!window.web3.currentProvider.isTrust && !window.web3.currentProvider.isMetaMask) {
    window.alert('Note: the Hydro web wallet is only officially supported on MetaMask or Trust.')
  }

  web3.eth.net.getId()
  .then(async id => {
    if (id === 4) {
      // await initializeContracts('mainnet')
    } else {
      window.alert('You are currently on an unsupported network. Please switch to the mainnet or rinkeby.')
      web3 = undefined
      return
    }
    networkId = String(id)
    web3CheckMany()
  })
  .catch(error => {
    console.error('Could not detect Ethereum network:', error)
    web3 = undefined
  })
}

// function initializeContracts(network) {
//   let contracts = constants.hydroContracts[network]
//
//   hydroWallet.contracts = {}
//   Object.keys(contracts).map(key => {
//     hydroWallet.contracts[key] = new hydroWallet.web3.eth.Contract(contracts[key].ABI, contracts[key].address)
//   })
//
//   hydroWallet.etherscanURLs = constants.etherscan[network]
// }

async function web3CheckMany() {
  // set default account
  await web3.eth.getAccounts()
  .then(accounts => {
    // check for account changes
    if (!accounts[0]) {
      window.alert('Please unlock your MetaMask account and try again.')
      web3 = undefined
      return
    }
    // check for network changes per:
    // https://medium.com/metamask/breaking-change-no-longer-reloading-pages-on-network-change-4a3e1fd2f5e7
    // window.web3.version.getNetwork((error, networkId) => {
    //   if (error) {
    //     window.alert('Error connecting to the Ethereum network.')
    //     web3 = undefined
    //     return
    //   }
    //   if (networkId !== networkId) {
    //     initializeWeb3()
    //   }
    // })
  })
  // schedule repeat every second
  setTimeout(web3CheckMany, 1000)
}

initializeWeb3()

function initiateClaim() {
  web3.eth.getAccounts(function(error, accounts) {
    if (error) {
      console.log(error);
    } else {
      if(accounts.length <= 0) {
        alert("No account is unlocked, please authorize an account on Metamask.")
      } else {
        var MyContract = new web3.eth.Contract(abi, contractAddress);
        var address = document.getElementById("address").value

        values = new Uint32Array(1);
        window.crypto.getRandomValues(values);

        // console.log(values[0])
        var secret = values[0].toString()
        localStorage.setItem("secret", secret)
        // var secret = document.getElementById("secret").value
        var hashedSecret = web3.utils.sha3(secret)
        console.log(hashedSecret)
        var hash = web3.utils.soliditySha3("Link Address to Snowflake", address, hashedSecret)
        MyContract.methods.initiateClaim(hash).send({from: accounts[0]})
      }
    }
  });
}

function signHashedSecret() {
  const web3Webpacked = window.Web3Webpacked(window.web3)
  web3.eth.getAccounts(async (error, accounts) => {
    if (error) {
      console.log(error);
    } else {
      if(accounts.length <= 0) {
        alert("No account is unlocked, please authorize an account on Metamask.")
      } else {
        var address = document.getElementById("address").value
        var secret = localStorage.getItem("secret")
        // var secret = document.getElementById("secret").value
        var secret = "1"
        var hashedSecret = web3.utils.sha3(secret)
        // var hash = web3.utils.soliditySha3("Link Address to Snowflake", address, hashedSecret)
        var hash = web3.utils.soliditySha3("Link Address to Snowflake")

        const typedData = [
          {
            type: 'string',                    // Any valid solidity type
            name: 'Permission',                // Any string label you want
            value: 'Link Address to Snowflake' // The value to sign
          },
          {
            type: 'address',
            name: 'Snowflake Account',
            value: accounts[0]
          },
          {
            type: 'bytes32',
            name: 'Secret Value',
            value: hashedSecret
          }
        ]

        console.log("address:", accounts[0])
        console.log("message hash:", web3Webpacked.hashTypedData(typedData))
        var signature = await web3Webpacked.signTypedData(typedData, accounts[0], true)
        console.log("signature:", signature)

        //
        // console.log(hash)
        // console.log(typeof hash)
        // console.log(hash.substring(2))
        // var signedHash = web3.eth.personal.sign(hash, accounts[0]).then(function(message){
        //   localStorage.setItem("r", message.substring(0,66))
        //   localStorage.setItem("s", "0x" + message.substring(66,130))
        //   localStorage.setItem("v", "0x" + message.substring(130))
        //
        // })
      }
    }
  });
}

function finalizeClaim() {
  web3.eth.getAccounts(function(error, accounts) {
    if (error) {
      console.log(error);
    } else {
      if(accounts.length <= 0) {
        alert("No account is unlocked, please authorize an account on Metamask.")
      } else {
        var MyContract = new web3.eth.Contract(abi, contractAddress);

        var address = document.getElementById("address").value
        var secret = localStorage.getItem("secret")
        // var secret = document.getElementById("secret").value
        var hashedSecret = web3.utils.sha3(secret)
        var hash = web3.utils.soliditySha3('Link Address to Snowflake', address, hashedSecret)
        var r = localStorage.getItem("r")
        var s = localStorage.getItem("s")
        var vString = localStorage.getItem("v")
        var v = web3.utils.hexToNumber(vString)
        MyContract.methods.finalizeClaim(address, v, r, s, hashedSecret).send({from: accounts[0]})
        .then(() => {
          localStorage.clear()
        })
      }
    }
  });
}

function ownedAddresses() {
  web3.eth.getAccounts(function(error, accounts) {
    if (error) {
      console.log(error);
    } else {
      if(accounts.length <= 0) {
        alert("No account is unlocked, please authorize an account on Metamask.")
      } else {
        var MyContract = new web3.eth.Contract(abi, contractAddress);

        var tokenId = document.getElementById("snowflakeId").value
        MyContract.methods.ownedAddresses(tokenId).call()
        .then(function(result){
          if (result.length == 0) {
            document.getElementById("address_list").innerHTML = "No addresses found.";
          } else {
            document.getElementById("address_list").innerHTML = "";
            for (var i = 0; i < result.length; i++){
              document.getElementById("address_list").innerHTML += '<span><a href="https://etherscan.io/address/'+result[i]+'" target="_blank">'+result[i]+'</a></span>'
            }
          }
        })
      }
    }
  });
}

function ownsAddress() {
  web3.eth.getAccounts(function(error, accounts) {
    if (error) {
      console.log(error);
    } else {
      if(accounts.length <= 0) {
        alert("No account is unlocked, please authorize an account on Metamask.")
      } else {
        var MyContract = new web3.eth.Contract(abi, contractAddress);

        var tokenId = document.getElementById("snowflakeId_ownsAddress").value
        var address = document.getElementById("address_ownsAddress").value
        MyContract.methods.ownsAddress(tokenId, address).call()
        .then(function(result){
          if (result){
            document.getElementById("address_owned").innerHTML = address + " is owned by snowflake with id " + tokenId
          } else {
            document.getElementById("address_owned").innerHTML = address + " is not owned by snowflake with id " + tokenId
          }
        })
      }
    }
  });
}
