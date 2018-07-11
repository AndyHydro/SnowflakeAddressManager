var addressOwnershipContract
const addressOwnershipAddress = '0x22Ce9233e196685FDCF08A9F29b409D14F3E5249'
const addressOwnershipABI = [{"constant":false,"inputs":[{"name":"_address","type":"address"},{"name":"v","type":"uint8"},{"name":"r","type":"bytes32"},{"name":"s","type":"bytes32"},{"name":"secret","type":"bytes32"}],"name":"finalizeClaim","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"sealedClaim","type":"bytes32"}],"name":"initiateClaim","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"snowflakeDescription","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"hydroId","type":"string"},{"name":"owned","type":"address"}],"name":"ownsAddress","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"_address","type":"address"},{"name":"messageHash","type":"bytes32"},{"name":"v","type":"uint8"},{"name":"r","type":"bytes32"},{"name":"s","type":"bytes32"}],"name":"isSigned","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"pure","type":"function"},{"constant":true,"inputs":[],"name":"snowflakeName","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"owner","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_address","type":"address"}],"name":"setSnowflakeAddress","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_address","type":"address"}],"name":"unclaimAddress","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"hydroId","type":"string"}],"name":"ownedAddresses","outputs":[{"name":"","type":"address[]"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"snowflakeAddress","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"inputs":[],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"name":"ownerAddress","type":"address"},{"indexed":false,"name":"hydroId","type":"string"},{"indexed":false,"name":"claimedAddress","type":"address"}],"name":"AddressClaimed","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"ownerAddress","type":"address"},{"indexed":false,"name":"hydroId","type":"string"},{"indexed":false,"name":"unclaimedAddress","type":"address"}],"name":"AddressUnclaimed","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"previousOwner","type":"address"},{"indexed":true,"name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"}] // eslint-disable-line

var snowflakeContract
const snowflakeAddress = '0x1F4Ef597aDEbB2da12B199077D46A0eeF4Cc46AC'
const snowflakeABI = [{"constant":true,"inputs":[{"name":"hydroId","type":"string"}],"name":"getDetails","outputs":[{"name":"owner","type":"address"},{"name":"fieldsAttestedTo","type":"bytes32[]"},{"name":"resolversFor","type":"address[]"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"clientRaindropAddress","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"hydroId","type":"string"},{"name":"resolver","type":"address"}],"name":"getDetails","outputs":[{"name":"withdrawAllowance","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"resolver","type":"address"}],"name":"isWhitelisted","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"dateOrder","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"field","type":"string"},{"name":"entry","type":"string"}],"name":"removeFieldEntry","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"field","type":"string"},{"name":"entry","type":"string"},{"name":"saltedHash","type":"bytes32"}],"name":"addFieldEntry","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"resolvers","type":"address[]"},{"name":"withdrawAllowances","type":"uint256[]"}],"name":"changeResolverAllowances","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"hydroTokenAddress","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"hydroId","type":"string"},{"name":"resolver","type":"address"}],"name":"hasResolver","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"from","type":"address"},{"name":"to","type":"address"},{"name":"amount","type":"uint256"}],"name":"transferOnBehalfOf","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"resolvers","type":"address[]"},{"name":"withdrawAllowances","type":"uint256[]"}],"name":"addResolvers","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"owner","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_sender","type":"address"},{"name":"amount","type":"uint256"},{"name":"_tokenAddress","type":"address"},{"name":"","type":"bytes"}],"name":"receiveApproval","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"clientRaindrop","type":"address"},{"name":"hydroToken","type":"address"}],"name":"setAddresses","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"hydroId","type":"string"},{"name":"field","type":"string"}],"name":"getDetails","outputs":[{"name":"entriesAttestedTo","type":"bytes32[]"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"_address","type":"address"}],"name":"getHydroId","outputs":[{"name":"hydroId","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"_address","type":"address"}],"name":"hasToken","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"to","type":"address"},{"name":"amount","type":"uint256"}],"name":"transferSnowflakeBalance","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"resolvers","type":"address[]"}],"name":"removeResolvers","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"fee","type":"uint256"}],"name":"setResolverWhitelistFee","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"amount","type":"uint256"}],"name":"withdrawSnowflakeBalance","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"resolver","type":"address"}],"name":"whitelistResolver","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"names","type":"bytes32[6]"},{"name":"dateOfBirth","type":"bytes32[3]"}],"name":"mintIdentityToken","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"fieldOrder","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"hydroId","type":"string"},{"name":"field","type":"string"},{"name":"entryLookup","type":"bytes32"}],"name":"getDetails","outputs":[{"name":"entryName","type":"string"},{"name":"saltedHash","type":"bytes32"},{"name":"blockNumber","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"resolverWhitelistFee","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"nameOrder","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"}],"name":"deposits","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"inputs":[],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"name":"depositor","type":"address"},{"indexed":false,"name":"amount","type":"uint256"}],"name":"SnowflakeDeposit","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"from","type":"address"},{"indexed":true,"name":"to","type":"address"},{"indexed":false,"name":"amount","type":"uint256"}],"name":"SnowflakeTransfer","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"depositor","type":"address"},{"indexed":false,"name":"amount","type":"uint256"}],"name":"SnowflakeWithdraw","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"hydroId","type":"string"},{"indexed":false,"name":"minter","type":"address"}],"name":"SnowflakeMinted","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"resolver","type":"address"},{"indexed":false,"name":"sponsor","type":"address"}],"name":"ResolverWhitelisted","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"hydroId","type":"string"},{"indexed":false,"name":"resolvers","type":"address[]"},{"indexed":false,"name":"withdrawAllowances","type":"uint256[]"}],"name":"ResolversAdded","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"hydroId","type":"string"},{"indexed":false,"name":"resolvers","type":"address[]"},{"indexed":false,"name":"withdrawAllowances","type":"uint256[]"}],"name":"ResolversAllowanceChanged","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"hydroId","type":"string"},{"indexed":false,"name":"resolvers","type":"address[]"}],"name":"ResolversRemoved","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"hydroId","type":"string"},{"indexed":false,"name":"resolver","type":"address"},{"indexed":false,"name":"currentAllowance","type":"uint256"},{"indexed":false,"name":"requestedWithdraw","type":"uint256"}],"name":"InsufficientAllowance","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"previousOwner","type":"address"},{"indexed":true,"name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"}] // eslint-disable-line

const w3wConfig = {
  handlers: {
    noWeb3Handler: () => {
      console.error('Browser does not have web3 support.')

      window.alert('No web3 instance detected.')
    },
    web3Ready: () => {
      let web3js = window.w3w.getWeb3js()
      addressOwnershipContract = new web3js.eth.Contract(addressOwnershipABI, addressOwnershipAddress)
      snowflakeContract = new web3js.eth.Contract(snowflakeABI, snowflakeAddress)

      console.log('web3 successfully initialized.')
    },
    web3ErrorHandler: (error) => {
      console.error(`web3 error: ${error}`)

      if (error.name === window.w3w.networkErrorName) {
        window.alert(`This dApp is currently only supported on Rinkeby. Please switch networks.`)
      } else {
        window.alert(`web3 Error: ${error}`)
      }
    },
    web3AccountChangeHandler: (account, oldAccount) => {
      if (account === null) {
        window.alert('Please unlock your Ethereum account.')
      } else {
        console.log(`Primary account switched from ${oldAccount} to ${account}.`)
      }
    }
  },
  supportedNetworks: [4]
}

window.addEventListener('load', () => {
  console.log('Initializing web3 upon page load.')
  window.w3w.initializeWeb3(w3wConfig)
})

async function initiateClaim () { // eslint-disable-line
  var account = window.w3w.getAccount()

  // ensure that the sender has a snowflake
  let hydroId = await snowflakeContract.methods.getHydroId(account).call()
    .then(hydroId => { return hydroId })
    .catch(() => { return null })
  if (hydroId == null) {
    console.error(`Address '${account}' does not have a HydroID.`)
    return
  }
  sessionStorage.setItem('account', account)

  let addressToClaim = document.getElementById('address').value
  addressToClaim = window.w3w.libraries['ethereumjs-util'].toChecksumAddress(addressToClaim)
  sessionStorage.setItem('addressToClaim', addressToClaim)

  // get a secret value
  var randomValues = new Uint32Array(1)
  window.crypto.getRandomValues(randomValues)
  var hashedSecret = window.w3w.getWeb3js().utils.sha3(randomValues[0].toString())
  sessionStorage.setItem('hashedSecret', hashedSecret)

  var submissionHash = window.w3w.getWeb3js().utils.soliditySha3(
    'Link Address to Snowflake', addressToClaim, hashedSecret
  )

  window.alert(`You are claiming '${addressToClaim}' with your Snowflake '${account}'.`)
  addressOwnershipContract.methods.initiateClaim(submissionHash).send({ from: account })
}

async function signHashedSecret () { // eslint-disable-line
  var addressToClaim = sessionStorage.getItem('addressToClaim')
  var hashedSecret = sessionStorage.getItem('hashedSecret')

  var submissionHash = window.w3w.getWeb3js().utils.soliditySha3(
    'Link Address to Snowflake', addressToClaim, hashedSecret
  )

  if (addressToClaim !== window.w3w.getAccount()) {
    window.alert('Please switch accounts to the address you wish to claim.')
  } else {
    var signature = await window.w3w.signPersonal(submissionHash)
    sessionStorage.setItem('signature', JSON.stringify(signature))
  }
}

function finalizeClaim () { // eslint-disable-line
  var account = sessionStorage.getItem('account')

  if (account !== window.w3w.getAccount()) {
    window.alert('Please switch accounts to your Snowflake address.')
    return
  }

  var addressToClaim = sessionStorage.getItem('addressToClaim')
  var hashedSecret = sessionStorage.getItem('hashedSecret')
  var signature = JSON.parse(sessionStorage.getItem('signature'))

  addressOwnershipContract.methods.finalizeClaim(addressToClaim, signature.v, signature.r, signature.s, hashedSecret)
    .send({ from: account })
    .then(() => {
      sessionStorage.clear()
    })
}

function ownedAddresses() { // eslint-disable-line
  var tokenId = document.getElementById('snowflakeId').value
  addressOwnershipContract.methods.ownedAddresses(tokenId).call()
    .then(result => {
      if (result.length === 0) {
        document.getElementById('address_list').innerHTML = 'No addresses found.'
      } else {
        document.getElementById('address_list').innerHTML = ''
        var entry, url
        for (var i = 0; i < result.length; i++) {
          url = window.w3w.etherscanFormat('address', result[i])
          entry = `<span><a href="${url}" target="_blank">${result[i]}</a></span>`
          document.getElementById('address_list').innerHTML += entry
        }
      }
    })
}

function ownsAddress() { // eslint-disable-line
  var tokenId = document.getElementById('snowflakeId_ownsAddress').value
  var address = document.getElementById('address_ownsAddress').value
  addressOwnershipContract.methods.ownsAddress(tokenId, address).call()
    .then(result => {
      if (result) {
        document.getElementById('address_owned').innerHTML = `${address} is owned by snowflake with id ${tokenId}`
      } else {
        document.getElementById('address_owned').innerHTML = `${address} is not owned by snowflake with id ${tokenId}`
      }
    })
}
