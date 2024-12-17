import { useState } from "react";
import { GameSelector } from "@/components/GameSelector";
import { NumberGenerator } from "@/components/NumberGenerator";
import { ResultsDisplay } from "@/components/ResultsDisplay";
import { Diamond, Trophy, Star } from "lucide-react";

const Index = () => {
  const [selectedGame, setSelectedGame] = useState<"keno" | "loto">("keno");
  const [generatedNumbers, setGeneratedNumbers] = useState<number[][]>([]);
  const [drawnNumbers, setDrawnNumbers] = useState<number[]>([]);

  const handleDrawnNumbersUpdate = (numbers: number[]) => {
    setDrawnNumbers(numbers);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1A1F2C] via-[#2C2A3C] to-[#1A1F2C] py-12 px-4">
      <div className="max-w-2xl mx-auto space-y-8">
        <div className="text-center space-y-4 animate-fade-in">
          <div className="flex items-center justify-center gap-4 mb-6">
            <Diamond className="w-10 h-10 text-[#9b87f5] animate-pulse" />
            <h1 className="text-5xl font-bold bg-gradient-to-r from-[#D6BCFA] via-[#9b87f5] to-[#D6BCFA] text-transparent bg-clip-text">
              Générateur de Numéros Chance
            </h1>
            <Diamond className="w-10 h-10 text-[#9b87f5] animate-pulse" />
          </div>
          <div className="flex items-center justify-center gap-2">
            <Trophy className="w-6 h-6 text-[#D6BCFA]" />
            <p className="text-[#9F9EA1] text-lg">
              Générez vos numéros pour le Keno ou le Loto avec style
            </p>
            <Star className="w-6 h-6 text-[#D6BCFA]" />
          </div>
        </div>
        <GameSelector selectedGame={selectedGame} onSelect={setSelectedGame} />
        <NumberGenerator 
          gameType={selectedGame} 
          onGenerate={setGeneratedNumbers}
          onDrawnNumbersChange={handleDrawnNumbersUpdate}
        />
        {generatedNumbers.length > 0 && (
          <ResultsDisplay 
            numbers={generatedNumbers}
            drawnNumbers={drawnNumbers}
          />
        )}
      </div>
    </div>
  );
};

export default Index;