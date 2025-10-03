

import { ChangeEvent, ChangeEventHandler, HtmlHTMLAttributes } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface Props {
  minPrice?: string | null;
  maxPrice?: string | null;
  onMinPricechange: (value: string) => void;
  onMaxPricechange: (value: string) => void;
}
export const formatAsCurrency = (value: string) => {
  const numericValue = value.replace(/[^0-9.]/g, "");
  const parts = numericValue.split(".");
  const formattedValue =
    parts[0] + (parts.length > 1 ? "." + parts[1]?.slice(0, 2) : "");
  if (!formattedValue) return "";

  const numberValue = parseFloat(formattedValue);
  if (isNaN(numberValue)) return "";

  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(numberValue);
};

export
 const PriceFilter = ({
  minPrice,
  maxPrice,
  onMinPricechange,
  onMaxPricechange,
}: Props) => {
  const handleMinPriceChange =(e: ChangeEvent<HTMLInputElement>)=>{
    const numericValue = e.target.value.replace(/[^0-9.]/g, "");
    onMinPricechange(numericValue);
  };

  const handleMaxPriceChange =(e: ChangeEvent<HTMLInputElement>)=>{
    const numericValue = e.target.value.replace(/[^0-9.]/g, "");
    onMaxPricechange(numericValue);
  };

  return (
    <div className="flex flex-col gap-2">
      <div className="flex flex-col gap-2">
        <Label className=" font-medium text-base">minimum Price</Label>
        <Input
          type="text"
          placeholder="$o"
          value={minPrice ? formatAsCurrency(minPrice) : ""}
          onChange={handleMinPriceChange}
        />
      </div>
      <div className="flex flex-col gap-2">
        <Label className=" font-medium text-base">maximum Price</Label>
        <Input
          type="text"
          placeholder="∞"
          value={maxPrice ? formatAsCurrency(maxPrice) : ""}
          onChange={handleMaxPriceChange}
        />
      </div>
    </div>
  );
};
