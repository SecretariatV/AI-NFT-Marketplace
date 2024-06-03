export const source = `
const chain = args[0];
const wallet = args[1];
const token = args[2];
const apiKey = secrets.apiKey;
if (!apiKey) {
  throw Error("Missing Covalent API key.");
}
const url = \`https://api.covalenthq.com/v1/\${chain}/address/\${wallet}/balances_v2/?key=\${apiKey}\`;
const covalentRequest = Functions.makeHttpRequest({
  url: url,
});
const covalentResponse = await covalentRequest;
if (covalentResponse.error) {
  console.error(covalentResponse.error);
  throw Error("Covalent API request failed");
}
const data = covalentResponse.data;
let tokenBalance = null;
for (const item of data.data.items) {
  if (item.contract_address.toLowerCase() === token.toLowerCase()) {
    tokenBalance = item.balance;
    break;
  }
}
return Functions.encodeUint256(BigInt(tokenBalance));
`;