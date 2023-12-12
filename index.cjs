const express = require("express");
const axios = require('axios');

const app = express();
const cors = require("cors");
require("dotenv").config();
const port = 3001;


const projectId = process.env.PROJECT_ID;
const projectServerKey = process.env.SERVER_KEY;

app.use(cors());
app.use(express.json());

app.get("/getTokens", async (req, res) => {

  const userAddress = "0x38eb9929B0e7a8d1a27fC3e12166327B666f4138"; 


  const tokens = await axios.post("https://rpc.particle.network/evm-chain", {
    chainId : 137,
    jsonrpc: '2.0',
    id: 1,
    method: 'particle_getTokensAndNFTs',
    params: [
        userAddress
    ],
}, {
    auth: {
        username: projectId,
        password: projectServerKey,
    },
});



const jsonResponse = {
  tokens: tokens
  
}

return res.status(200).json(jsonResponse);
});

app.listen(port, () => {
  console.log("Listening for API Calls");
});