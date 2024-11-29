require('dotenv').config();

const contractAddress = process.env.CONTRACT_ADDRESS;
const contractABI = JSON.parse(process.env.ABI);

// Connect to MetaMask and the contract
window.addEventListener('load', async () => {
    if (window.ethereum) {
        web3 = new Web3(window.ethereum);
        await window.ethereum.request({ method: 'eth_requestAccounts' });
        contract = new web3.eth.Contract(contractABI, contractAddress);
    } else {
        alert("Please install MetaMask to use this DApp!");
    }
});

// Generate bill function
async function generateBill() {
    const accounts = await web3.eth.getAccounts();
    const prevReading = document.getElementById("prevReading").value;
    const currReading = document.getElementById("currReading").value;

    if (!prevReading || !currReading) {
        alert("Please enter valid readings.");
        return;
    }

    try {
        await contract.methods.generateBill(prevReading, currReading)
            .send({ from: accounts[0] });

        const bill = await contract.methods.getBill().call({ from: accounts[0] });
        document.getElementById("billDetails").innerHTML =
            `Units Used: ${bill.unitsUsed}<br>Bill Amount: ${web3.utils.fromWei(bill.billAmount.toString(), 'ether')} Ether`;
    } catch (error) {
        console.error(error);
    }
}
