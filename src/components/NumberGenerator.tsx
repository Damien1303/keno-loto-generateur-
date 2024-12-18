import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Shuffle } from "lucide-react";
import { NumberGrid } from "./NumberGrid";
import { SeriesControls } from "./SeriesControls";
import { DrawVerification } from "./DrawVerification";

interface NumberGeneratorProps {
  gameType: "keno" | "loto";
  onGenerate: (numbers: number[][]) => void;
  onDrawnNumbersChange: (numbers: number[]) => void;
}

export const NumberGenerator = ({ gameType, onGenerate, onDrawnNumbersChange }: NumberGeneratorProps) => {
  const { toast } = useToast();
  const [seriesSize, setSeriesSize] = useState(6);
  const [numberOfSeries, setNumberOfSeries] = useState(1);
  const [selectedNumbers, setSelectedNumbers] = useState<number[]>([]);
  const [drawnNumbers, setDrawnNumbers] = useState<number[]>([]);
  
  const maxNumber = gameType === "keno" ? 70 : 49;
  const maxSelectable = gameType === "keno" ? 60 : 35;
  const maxSeriesSize = gameType === "keno" ? 55 : 40;

  useEffect(() => {
    onDrawnNumbersChange(drawnNumbers);
  }, [drawnNumbers, onDrawnNumbersChange]);

  const toggleNumber = (num: number) => {
    if (selectedNumbers.includes(num)) {
      setSelectedNumbers(selectedNumbers.filter(n => n !== num));
    } else {
      if (selectedNumbers.length < maxSelectable) {
        setSelectedNumbers([...selectedNumbers, num]);
      } else {
        toast({
          title: "Limite atteinte",
          description: `Vous ne pouvez pas sélectionner plus de ${maxSelectable} numéros en ${gameType === "keno" ? "Keno" : "Loto"}.`,
          variant: "destructive"
        });
      }
    }
  };

  const clearAllNumbers = () => {
    setSelectedNumbers([]);
  };

  const generateNumbers = () => {
    if (selectedNumbers.length < seriesSize) {
      toast({
        title: "Erreur",
        description: `Veuillez sélectionner au moins ${seriesSize} numéros pour générer les séries.`,
        variant: "destructive"
      });
      return;
    }

    const allSeries: number[][] = [];
    
    for (let i = 0; i < numberOfSeries; i++) {
      const numbers: number[] = [];
      const availableNumbers = [...selectedNumbers];
      
      while (numbers.length < seriesSize) {
        const randomIndex = Math.floor(Math.random() * availableNumbers.length);
        numbers.push(availableNumbers[randomIndex]);
        availableNumbers.splice(randomIndex, 1);
      }
      
      numbers.sort((a, b) => a - b);
      allSeries.push(numbers);
    }
    
    onGenerate(allSeries);
    toast({
      title: "Séries Générées",
      description: `${numberOfSeries} série${numberOfSeries > 1 ? 's' : ''} de ${seriesSize} numéros générée${numberOfSeries > 1 ? 's' : ''} !`,
    });
  };

  const handleDrawnNumbersChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const numbers = event.target.value.split(',').map(n => parseInt(n.trim())).filter(n => !isNaN(n) && n > 0 && n <= maxNumber);
    setDrawnNumbers(numbers);
  };

  const checkMatches = () => {
    if (drawnNumbers.length === 0) {
      toast({
        title: "Erreur",
        description: "Veuillez entrer les numéros tirés pour vérifier les correspondances.",
        variant: "destructive"
      });
      return;
    }

    const matches = selectedNumbers.filter(num => drawnNumbers.includes(num));
    toast({
      title: "Correspondances trouvées",
      description: `${matches.length} numéro${matches.length > 1 ? 's' : ''} correspondent au tirage : ${matches.join(', ')}`,
    });
  };

  return (
    <Card className="p-6 backdrop-blur-sm bg-[#1A1F2C]/80 shadow-xl animate-fade-in border-[#403E43] rounded-xl">
      <NumberGrid
        maxNumber={maxNumber}
        selectedNumbers={selectedNumbers}
        drawnNumbers={drawnNumbers}
        maxSelectable={maxSelectable}
        onNumberToggle={toggleNumber}
        onClearAll={clearAllNumbers}
      />

      <div className="space-y-6 mt-8">
        <SeriesControls
          seriesSize={seriesSize}
          numberOfSeries={numberOfSeries}
          maxSeriesSize={maxSeriesSize}
          onSeriesSizeChange={setSeriesSize}
          onNumberOfSeriesChange={setNumberOfSeries}
        />

        <DrawVerification
          onDrawnNumbersChange={handleDrawnNumbersChange}
          onCheckMatches={checkMatches}
        />
      </div>

      <Button
        onClick={generateNumbers}
        className="w-full h-12 mt-8 text-lg font-medium transition-all duration-300 hover:scale-105 bg-gradient-to-r from-[#ea384c] to-[#990000] hover:from-[#990000] hover:to-[#ea384c] text-white border-none shadow-lg shadow-[#ea384c]/20"
        disabled={selectedNumbers.length < seriesSize}
      >
        <Shuffle className="mr-2 h-5 w-5" />
        Générer les Séries Réduites
      </Button>
    </Card>
  );
};