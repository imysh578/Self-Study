const fs = require("fs");


const ABI = fs.readFileSync("./contracts_gacha_sol_Gacha.abi", "utf-8");
const BYTECODE = fs. readFileSync("./contracts_gacha_sol_Gacha.bin", "utf-8");

const data = {"abi": JSON.parse(ABI), "bytecode": BYTECODE}
fs.writeFileSync("./gacha.json", JSON.stringify(data));