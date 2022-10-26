import shakeonitABI from '../config/abi/shakeonit.json';

export const contractAbi = shakeonitABI;
export const contractAddress = "0x2ADf76Cdd3D404414B7d850DE0208541EaA2974e";

// 0xd8b934580fcE35a11B58C6D73aDeE468a2833fa8

// web3 instantiation
// export const web3 = new Web3(new Web3.providers.HttpProvider('https://ropsten.infura.io/v3/1ed0db279080490bb5a02a515d51213e'));

// contract instantiation for method calls
// export const contract = new web3.eth.Contract(contractAbi, contractAddress);

// READ OPERATIONS
// getActiveOrderLength 
// export const orderListLength = contract.methods.getActiveOrderLength().call();

// getFromActiveOrderSet
// export const orderActiveSet = contract.methods.getFromActiveOrderSet().call()


// WRITE OPERATIONS

// Cancel Sale
// export const cancelSale = async () => {

//     const cancelByAdmin = await contract.methods.cancelOrderByAdmin(orderListLength).call();

//     cancelSale(cancelByAdmin)
// }
