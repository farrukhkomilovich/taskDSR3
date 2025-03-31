import { ICrypto } from "../types/types";
import CryptoItem from "./CryptoItem";

interface ICryptoListProps {
  cryptos: ICrypto[];
  onDelete: (name: string) => void;
  onUpdate: (name: string) => void;
}

function CryptoList({ cryptos, onDelete, onUpdate }: ICryptoListProps) {
  return (
    <div className="mt-6 w-full">
      {cryptos.map((crypto, index) => (
        <CryptoItem
          key={index}
          name={crypto.name}
          price={crypto.price}
          prevPrice={crypto.prevPrice}
          onDelete={onDelete}
          onUpdate={onUpdate}
        />
      ))}
    </div>
  );
}

export default CryptoList;
