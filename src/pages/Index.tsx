import { useState } from "react";
import { GameSelector } from "@/components/GameSelector";
import { NumberGenerator } from "@/components/NumberGenerator";
import { ResultsDisplay } from "@/components/ResultsDisplay";
import { Diamond, Trophy, Star, Gauge } from "lucide-react";

const Index = () => {
  const [selectedGame, setSelectedGame] = useState<"keno" | "loto">("keno");
  const [generatedNumbers, setGeneratedNumbers] = useState<number[][]>([]);
  const [drawnNumbers, setDrawnNumbers] = useState<number[]>([]);

  const handleDrawnNumbersUpdate = (numbers: number[]) => {
    setDrawnNumbers(numbers);
  };

  return (
    <div className="min-h-screen bg-[#222222] bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))] py-12 px-4">
      <div className="max-w-2xl mx-auto space-y-8">
        <div className="text-center space-y-4 animate-fade-in">
          <div className="flex items-center justify-center gap-4 mb-6">
            <Gauge className="w-12 h-12 text-[#FF0000] animate-pulse" />
            <h1 className="text-5xl font-bold bg-gradient-to-r from-[#FFFFFF] via-[#FF0000] to-[#FFFFFF] text-transparent bg-clip-text tracking-tighter">
              Performance Numbers
            </h1>
            <Gauge className="w-12 h-12 text-[#FF0000] animate-pulse" />
          </div>
          <div className="flex items-center justify-center gap-2">
            <Trophy className="w-6 h-6 text-[#FF0000]" />
            <p className="text-[#9F9EA1] text-lg font-light tracking-wide">
              Générez vos numéros avec la précision allemande
            </p>
            <Star className="w-6 h-6 text-[#FF0000]" />
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