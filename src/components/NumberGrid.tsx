import { Button } from "@/components/ui/button";
import { Eraser } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface NumberGridProps {
  maxNumber: number;
  selectedNumbers: number[];
  drawnNumbers: number[];
  maxSelectable: number;
  onNumberToggle: (num: number) => void;
  onClearAll: () => void;
}

export const NumberGrid = ({ 
  maxNumber, 
  selectedNumbers, 
  drawnNumbers, 
  maxSelectable, 
  onNumberToggle,
  onClearAll 
}: NumberGridProps) => {
  const { toast } = useToast();

  const getNumberButtonClass = (num: number) => {
    if (drawnNumbers.includes(num) && selectedNumbers.includes(num)) {
      return "bg-green-500/90 text-white border-green-600 shadow-lg shadow-green-500/20"; // Match
    } else if (selectedNumbers.includes(num)) {
      return "bg-[#ea384c]/90 text-white border-[#990000] shadow-lg shadow-[#ea384c]/20"; // Selected
    } else if (drawnNumbers.includes(num)) {
      return "bg-orange-500/90 text-white border-orange-600 shadow-lg shadow-orange-500/20"; // Drawn but not selected
    }
    return "bg-[#1A1F2C]/60 hover:bg-[#ea384c]/20 text-[#F1F1F1] border-[#403E43] hover:border-[#ea384c]"; // Default
  };

  const handleClearAll = () => {
    onClearAll();
    toast({
      title: "Grille effacée",
      description: "Tous les numéros ont été désélectionnés.",
    });
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-10 gap-2">
        {Array.from({ length: maxNumber }, (_, i) => i + 1).map((num) => (
          <Button
            key={num}
            variant="outline"
            className={`w-8 h-8 p-0 text-sm font-medium transition-all duration-300 hover:scale-110 ${getNumberButtonClass(num)}`}
            onClick={() => onNumberToggle(num)}
          >
            {num}
          </Button>
        ))}
      </div>
      <Button
        onClick={handleClearAll}
        variant="outline"
        className="mt-4 border-[#403E43] bg-[#1A1F2C]/60 text-[#F1F1F1] hover:bg-[#ea384c]/20 hover:border-[#ea384c] hover:text-white"
      >
        <Eraser className="mr-2 h-4 w-4" />
        Effacer la grille
      </Button>
    </div>
  );
};