import Web3 from 'web3'
import shakeonitABI from '../abis/shakeonit.json'

export const contractAbi = shakeonitABI;
export const contractAddress = "0xd8b934580fcE35a11B58C6D73aDeE468a2833fa8";

// web3 instantiation
export const web3 = new Web3(new Web3.providers.HttpProvider('https://mainnet.infura.io/v3/138a070a8c734e448e46beaa2c244861'));

// contract instantiation for method calls
export const contract = new web3.eth.Contract(contractAbi, contractAddress);

// READ OPERATIONS
// getActiveOrderLength 
export const orderListLength = contract.methods.getActiveOrderLength().call();

// getFromActiveOrderSet
// export const orderActiveSet = contract.methods.getFromActiveOrderSet().call()


// WRITE OPERATIONS

// Cancel Sale
// export const cancelSale = async () => {

//     const cancelByAdmin = await contract.methods.cancelOrderByAdmin(orderListLength).call();

//     cancelSale(cancelByAdmin)
// }
