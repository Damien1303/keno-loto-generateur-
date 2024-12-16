import { useState } from "react";
import { GameSelector } from "@/components/GameSelector";
import { NumberGenerator } from "@/components/NumberGenerator";
import { ResultsDisplay } from "@/components/ResultsDisplay";

const Index = () => {
  const [selectedGame, setSelectedGame] = useState<"keno" | "loto">("keno");
  const [generatedNumbers, setGeneratedNumbers] = useState<number[][]>([]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-purple-100 py-12 px-4">
      <div className="max-w-2xl mx-auto space-y-8">
        <div className="text-center space-y-2 animate-fade-in">
          <h1 className="text-4xl font-bold text-purple-900">Générateur de Numéros Chance</h1>
          <p className="text-purple-600">Générez vos numéros pour le Keno ou le Loto</p>
        </div>
        <GameSelector selectedGame={selectedGame} onSelect={setSelectedGame} />
        <NumberGenerator gameType={selectedGame} onGenerate={setGeneratedNumbers} />
        {generatedNumbers.length > 0 && <ResultsDisplay numbers={generatedNumbers} />}
      </div>
    </div>
  );
};

export default Index;