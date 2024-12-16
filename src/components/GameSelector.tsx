import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface GameSelectorProps {
  selectedGame: "keno" | "loto";
  onSelect: (game: "keno" | "loto") => void;
}

export const GameSelector = ({ selectedGame, onSelect }: GameSelectorProps) => {
  return (
    <Card className="p-6 backdrop-blur-sm bg-white/90 shadow-lg animate-fade-in border-purple-200">
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold text-center text-purple-800">Select Game Type</h2>
        <div className="flex gap-4 justify-center">
          <Button
            variant="outline"
            className={cn(
              "w-32 h-32 rounded-2xl transition-all duration-300 hover:scale-105 border-2",
              selectedGame === "keno" 
                ? "ring-2 ring-purple-500 bg-purple-50 border-purple-500 text-purple-700" 
                : "hover:border-purple-300 hover:text-purple-600"
            )}
            onClick={() => onSelect("keno")}
          >
            <div className="flex flex-col items-center gap-2">
              <span className="text-xl font-semibold">Keno</span>
              <span className="text-sm text-purple-500">70 numbers</span>
            </div>
          </Button>
          <Button
            variant="outline"
            className={cn(
              "w-32 h-32 rounded-2xl transition-all duration-300 hover:scale-105 border-2",
              selectedGame === "loto" 
                ? "ring-2 ring-purple-500 bg-purple-50 border-purple-500 text-purple-700" 
                : "hover:border-purple-300 hover:text-purple-600"
            )}
            onClick={() => onSelect("loto")}
          >
            <div className="flex flex-col items-center gap-2">
              <span className="text-xl font-semibold">Loto</span>
              <span className="text-sm text-purple-500">49 numbers</span>
            </div>
          </Button>
        </div>
      </div>
    </Card>
  );
};