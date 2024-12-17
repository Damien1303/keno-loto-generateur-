import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

interface GameSelectorProps {
  selectedGame: "keno" | "loto";
  onSelect: (game: "keno" | "loto") => void;
}

export const GameSelector = ({ selectedGame, onSelect }: GameSelectorProps) => {
  return (
    <Card className="p-6 backdrop-blur-sm bg-[#222222]/80 shadow-xl animate-fade-in border-[#403E43] rounded-xl">
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold text-center bg-gradient-to-r from-[#D6BCFA] via-[#9b87f5] to-[#D6BCFA] text-transparent bg-clip-text">
          Sélectionnez Votre Jeu
        </h2>
        <div className="flex gap-4 justify-center">
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button
              variant="outline"
              className={cn(
                "w-32 h-32 rounded-2xl transition-all duration-300 border-2 bg-[#1A1F2C]/60",
                selectedGame === "keno" 
                  ? "ring-2 ring-[#9b87f5] border-[#9b87f5] text-[#D6BCFA]" 
                  : "border-[#403E43] text-[#8E9196] hover:border-[#9b87f5] hover:text-[#D6BCFA]"
              )}
              onClick={() => onSelect("keno")}
            >
              <div className="flex flex-col items-center gap-2">
                <span className="text-xl font-semibold">Keno</span>
                <span className="text-sm opacity-80">70 numéros</span>
              </div>
            </Button>
          </motion.div>
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button
              variant="outline"
              className={cn(
                "w-32 h-32 rounded-2xl transition-all duration-300 border-2 bg-[#1A1F2C]/60",
                selectedGame === "loto" 
                  ? "ring-2 ring-[#9b87f5] border-[#9b87f5] text-[#D6BCFA]" 
                  : "border-[#403E43] text-[#8E9196] hover:border-[#9b87f5] hover:text-[#D6BCFA]"
              )}
              onClick={() => onSelect("loto")}
            >
              <div className="flex flex-col items-center gap-2">
                <span className="text-xl font-semibold">Loto</span>
                <span className="text-sm opacity-80">49 numéros</span>
              </div>
            </Button>
          </motion.div>
        </div>
      </div>
    </Card>
  );
};