export const source = `
const apiKey = secrets.apiKey;
if (!apiKey) {
  throw Error("Missing Lighthouse API key.");
}

const url = "https://api.lighthouse.storage/api/ipns/generate_key";
const lighthouseRequest = Functions.makeHttpRequest({
  url: url,
  method: "GET",
  headers: {
    Authorization: \`Bearer \${apiKey}\`,
  },
});

const lighthouseResponse = await lighthouseRequest;
if (lighthouseResponse.error) {
  console.error(lighthouseResponse.error);
  throw Error("Lighthouse API request failed");
}
const data = lighthouseResponse.data;
if (!data || !data.ipnsId) {
  throw Error("Failed to generate key");
}

return Functions.encodeString(data.ipnsId);

`;
