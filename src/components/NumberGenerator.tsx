import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Shuffle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface NumberGeneratorProps {
  gameType: "keno" | "loto";
  onGenerate: (numbers: number[][]) => void;
}

export const NumberGenerator = ({ gameType, onGenerate }: NumberGeneratorProps) => {
  const { toast } = useToast();
  const [seriesSize, setSeriesSize] = useState(6);
  const [numberOfSeries, setNumberOfSeries] = useState(1);
  const [selectedNumbers, setSelectedNumbers] = useState<number[]>([]);
  const maxNumber = gameType === "keno" ? 70 : 49;

  const toggleNumber = (num: number) => {
    if (selectedNumbers.includes(num)) {
      setSelectedNumbers(selectedNumbers.filter(n => n !== num));
    } else {
      if (selectedNumbers.length < maxNumber) {
        setSelectedNumbers([...selectedNumbers, num]);
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

  return (
    <Card className="p-6 backdrop-blur-sm bg-white/90 shadow-lg animate-fade-in">
      <div className="space-y-6">
        <div className="grid grid-cols-10 gap-2">
          {Array.from({ length: maxNumber }, (_, i) => i + 1).map((num) => (
            <Button
              key={num}
              variant={selectedNumbers.includes(num) ? "default" : "outline"}
              className="w-8 h-8 p-0 text-sm font-medium"
              onClick={() => toggleNumber(num)}
            >
              {num}
            </Button>
          ))}
        </div>

        <div className="space-y-4">
          <div className="space-y-2">
            <h3 className="text-lg font-medium text-center">Taille des Séries</h3>
            <div className="flex items-center gap-4">
              <span className="text-sm text-gray-500">1</span>
              <Slider
                value={[seriesSize]}
                onValueChange={(value) => setSeriesSize(value[0])}
                max={gameType === "keno" ? 10 : 6}
                min={1}
                step={1}
                className="flex-1"
              />
              <span className="text-sm text-gray-500">{gameType === "keno" ? "10" : "6"}</span>
            </div>
            <p className="text-center text-sm text-gray-500">
              Sélectionné: {seriesSize} numéro{seriesSize > 1 ? "s" : ""}
            </p>
          </div>

          <div className="space-y-2">
            <h3 className="text-lg font-medium text-center">Nombre de Séries</h3>
            <div className="flex items-center gap-4">
              <span className="text-sm text-gray-500">1</span>
              <Slider
                value={[numberOfSeries]}
                onValueChange={(value) => setNumberOfSeries(value[0])}
                max={10}
                min={1}
                step={1}
                className="flex-1"
              />
              <span className="text-sm text-gray-500">10</span>
            </div>
            <p className="text-center text-sm text-gray-500">
              Sélectionné: {numberOfSeries} série{numberOfSeries > 1 ? "s" : ""}
            </p>
          </div>
        </div>

        <Button
          onClick={generateNumbers}
          className="w-full h-12 text-lg font-medium transition-all duration-300 hover:scale-105"
          disabled={selectedNumbers.length < seriesSize}
        >
          <Shuffle className="mr-2 h-5 w-5" />
          Générer les Séries Réduites
        </Button>
      </div>
    </Card>
  );
};