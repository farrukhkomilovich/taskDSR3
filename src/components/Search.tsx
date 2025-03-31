import { useState } from "react";
import Button from "./common/Button";
import Input from "./common/Input";

interface ISearchProps {
  onSearch: (name: string) => void;
}

export default function Search({ onSearch }: ISearchProps) {
  const [cryptoName, setCryptoName] = useState("");

  const handleSearch = () => {
    if (cryptoName.trim() === "") return;
    onSearch(cryptoName.toUpperCase());
    setCryptoName("");
  };

  return (
    <div className="flex justify-between gap-2 mt-4 w-1/2">
      <Input
        type="text"
        placeholder="Enter cryptocurrency name..."
        value={cryptoName}
        onChange={(e) => setCryptoName(e.target.value)}
      />
      <Button onClick={handleSearch} variant="primary" label="Search"/>
    </div>
  );
}
