import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Shuffle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Input } from "@/components/ui/input";

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
      <div className="space-y-6">
        <div className="grid grid-cols-10 gap-2">
          {Array.from({ length: maxNumber }, (_, i) => i + 1).map((num) => (
            <Button
              key={num}
              variant="outline"
              className={`w-8 h-8 p-0 text-sm font-medium transition-all duration-300 hover:scale-110 ${getNumberButtonClass(num)}`}
              onClick={() => toggleNumber(num)}
            >
              {num}
            </Button>
          ))}
        </div>

        <div className="space-y-4">
          <div className="space-y-2">
            <h3 className="text-lg font-medium text-center bg-gradient-to-r from-[#F1F1F1] via-[#ea384c] to-[#F1F1F1] text-transparent bg-clip-text">
              Taille des Séries
            </h3>
            <div className="flex items-center gap-4">
              <span className="text-sm text-[#9F9EA1]">1</span>
              <Slider
                value={[seriesSize]}
                onValueChange={(value) => setSeriesSize(value[0])}
                max={maxSeriesSize}
                min={1}
                step={1}
                className="flex-1"
              />
              <span className="text-sm text-[#9F9EA1]">{maxSeriesSize}</span>
            </div>
            <p className="text-center text-sm text-[#9F9EA1]">
              Sélectionné: {seriesSize} numéro{seriesSize > 1 ? "s" : ""}
            </p>
          </div>

          <div className="space-y-2">
            <h3 className="text-lg font-medium text-center bg-gradient-to-r from-[#F1F1F1] via-[#ea384c] to-[#F1F1F1] text-transparent bg-clip-text">
              Nombre de Séries
            </h3>
            <div className="flex items-center gap-4">
              <span className="text-sm text-[#9F9EA1]">1</span>
              <Slider
                value={[numberOfSeries]}
                onValueChange={(value) => setNumberOfSeries(value[0])}
                max={10}
                min={1}
                step={1}
                className="flex-1"
              />
              <span className="text-sm text-[#9F9EA1]">10</span>
            </div>
            <p className="text-center text-sm text-[#9F9EA1]">
              Sélectionné: {numberOfSeries} série{numberOfSeries > 1 ? "s" : ""}
            </p>
          </div>

          <div className="space-y-2">
            <h3 className="text-lg font-medium text-center bg-gradient-to-r from-[#F1F1F1] via-[#ea384c] to-[#F1F1F1] text-transparent bg-clip-text">
              Vérification des Tirages
            </h3>
            <div className="flex gap-2">
              <Input
                placeholder="Entrez les numéros tirés (séparés par des virgules)"
                onChange={handleDrawnNumbersChange}
                className="flex-1 bg-[#1A1F2C]/60 border-[#403E43] text-[#F1F1F1] placeholder-[#8E9196] focus:ring-[#ea384c] focus:border-[#ea384c]"
              />
              <Button 
                onClick={checkMatches} 
                variant="outline" 
                className="border-[#403E43] text-[#F1F1F1] hover:bg-[#ea384c]/20 hover:border-[#ea384c]"
              >
                Vérifier
              </Button>
            </div>
          </div>
        </div>

        <Button
          onClick={generateNumbers}
          className="w-full h-12 text-lg font-medium transition-all duration-300 hover:scale-105 bg-gradient-to-r from-[#ea384c] to-[#990000] hover:from-[#990000] hover:to-[#ea384c] text-white border-none shadow-lg shadow-[#ea384c]/20"
          disabled={selectedNumbers.length < seriesSize}
        >
          <Shuffle className="mr-2 h-5 w-5" />
          Générer les Séries Réduites
        </Button>
      </div>
    </Card>
  );
};
