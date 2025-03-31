import { ICrypto } from "../types/types";
import Button from "./common/Button";

interface ICryptoItemProps extends ICrypto {
  onDelete: (name: string) => void;
  onUpdate: (name: string) => void;
}

function CryptoItem({
  name,
  price,
  prevPrice,
  onDelete,
  onUpdate,
}: ICryptoItemProps) {
  const priceChange = prevPrice !== undefined ? price - prevPrice : 0;
  const isPriceUp = priceChange > 0;
  const isPriceDown = priceChange < 0;

  return (
    <div className="flex justify-between items-center bg-gray-800 p-3 rounded-lg mb-2 shadow-md">
      <div className="flex items-center gap-10">
        <span className="text-lg font-semibold">{name}</span>
        <div className="flex items-center gap-2">
          <span className="text-green-400">${price.toFixed(2)}</span>
          {isPriceUp && <span className="text-green-500">⬆️</span>}
          {isPriceDown && <span className="text-red-500">⬇️</span>}
        </div>
      </div>

      <div className="flex gap-2">
        <Button onClick={() => onUpdate(name)} variant="primary" label="Update"/>
        <Button onClick={() => onDelete(name)} variant="danger" label="Delete"/>
      </div>
    </div>
  );
}
export default CryptoItem;
