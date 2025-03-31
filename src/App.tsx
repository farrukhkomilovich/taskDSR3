import { useEffect, useState } from "react";
import { fetchCryptoPrice } from "./services/cryptoService";
import Search from "./components/Search";
import CryptoList from "./components/CryptoList";
import { useOnlineStatus } from "./hooks/useOnlineStatus";
import { ICrypto } from "./types/types";
import Button from "./components/common/Button";

const initialCrypto: ICrypto = {
  name: "DOGE",
  price: 0,
};

export default function App() {
  const [cryptos, setCryptos] = useState<ICrypto[]>([initialCrypto]);
  const [intervalId, setIntervalId] = useState<null | number>(null);
  const isOnline = useOnlineStatus();

  const addCrypto = async (name: string) => {
    if (cryptos.some((crypto) => crypto.name === name)) return;

    const newPrice = await fetchCryptoPrice(name);

    newPrice !== null
      ? setCryptos((prevCryptos) => [
          ...prevCryptos,
          { name, price: newPrice, prevPrice: undefined },
        ])
      : alert("Cryptocurrency not found!");
  };

  const deleteCrypto = (name: string) => {
    setCryptos((prevCryptos) =>
      prevCryptos.filter((crypto) => crypto.name !== name)
    );
  };

  const updateCrypto = async (name: string) => {
    const newPrice = await fetchCryptoPrice(name); // ✅ Narxni olish
    if (newPrice !== null) {
      setCryptos((prevCryptos) =>
        prevCryptos.map((crypto) =>
          crypto.name === name
            ? { ...crypto, prevPrice: crypto.price, price: newPrice }
            : crypto
        )
      );
    }
  };

  const updateAllCryptos = async () => {
    if (intervalId) clearInterval(intervalId); // Eski intervalni to‘xtatish

    // Barcha valyutalarni yangilash
    const updatedCryptos = await Promise.all(
      cryptos.map(async (crypto) => {
        const newPrice = await fetchCryptoPrice(crypto.name);
        return newPrice !== null
          ? { ...crypto, prevPrice: crypto.price, price: newPrice }
          : crypto;
      })
    );
    setCryptos(updatedCryptos);

    startAutoUpdate(); // ✅ Yangi intervalni ishga tushirish
  };

  const startAutoUpdate = () => {
    if (intervalId) clearInterval(intervalId);

    const id = setInterval(async () => {
      setCryptos((prevCryptos) =>
        prevCryptos.map((crypto) => {
          fetchCryptoPrice(crypto.name).then((newPrice) => {
            if (newPrice !== null) {
              setCryptos((prev) =>
                prev.map((c) =>
                  c.name === crypto.name
                    ? { ...c, prevPrice: c.price, price: newPrice }
                    : c
                )
              );
            }
          });
          return crypto;
        })
      );
    }, 10000);

    setIntervalId(id);
  };

  useEffect(() => {
    startAutoUpdate();
    return () => {
      if (intervalId) clearInterval(intervalId);
    };
  }, []);

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center p-10">
      <h1 className="text-3xl font-bold mb-6">Crypto Tracker</h1>

      <p className={isOnline ? "text-green-400" : "text-red-400"}>
        {isOnline ? "Online ✅" : "Offline ❌"}
      </p>

      <Search onSearch={addCrypto} />

      <CryptoList
        cryptos={cryptos}
        onDelete={deleteCrypto}
        onUpdate={updateCrypto}
      />
      <Button 
        label="Update All" 
        onClick={updateAllCryptos}
        className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-lg mt-4 transition"
      />
    </div>
  );
}
