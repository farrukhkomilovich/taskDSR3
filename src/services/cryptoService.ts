const API_URL = import.meta.env.VITE_CRYPTO_API_URL;
const API_KEY = import.meta.env.VITE_CRYPTO_API_KEY;

export async function fetchCryptoPrice(name: string) {
  try {
    const response = await fetch(`${API_URL}?fsym=${name}&tsyms=USD&api_key=${API_KEY}`);
    const data = await response.json();
    return data.USD;
  } catch (error) {
    console.error("Error fetching crypto price:", error);
    return null;
  }
}
