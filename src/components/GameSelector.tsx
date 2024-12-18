import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { DollarSign, Target, Gauge2 } from "lucide-react";

interface GameSelectorProps {
  selectedGame: "keno" | "loto";
  onSelect: (game: "keno" | "loto") => void;
}

export const GameSelector = ({ selectedGame, onSelect }: GameSelectorProps) => {
  return (
    <Card className="p-6 backdrop-blur-sm bg-[#1A1A1A]/90 shadow-2xl animate-fade-in border-[#333333] rounded-xl">
      <div className="space-y-4">
        <div className="flex items-center justify-center gap-2">
          <Gauge2 className="w-6 h-6 text-[#FF0000]" />
          <h2 className="text-2xl font-semibold text-center bg-gradient-to-r from-[#FFFFFF] via-[#FF0000] to-[#FFFFFF] text-transparent bg-clip-text">
            Sélectionnez Votre Mode
          </h2>
          <Gauge2 className="w-6 h-6 text-[#FF0000]" />
        </div>
        <div className="flex gap-4 justify-center">
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button
              variant="outline"
              className={cn(
                "w-32 h-32 rounded-2xl transition-all duration-300 border-2 bg-[#1A1A1A]/60",
                selectedGame === "keno" 
                  ? "ring-2 ring-[#FF0000] border-[#FF0000] text-white" 
                  : "border-[#333333] text-[#8E9196] hover:border-[#FF0000] hover:text-white"
              )}
              onClick={() => onSelect("keno")}
            >
              <div className="flex flex-col items-center gap-2">
                <Target className="w-8 h-8" />
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
                "w-32 h-32 rounded-2xl transition-all duration-300 border-2 bg-[#1A1A1A]/60",
                selectedGame === "loto" 
                  ? "ring-2 ring-[#FF0000] border-[#FF0000] text-white" 
                  : "border-[#333333] text-[#8E9196] hover:border-[#FF0000] hover:text-white"
              )}
              onClick={() => onSelect("loto")}
            >
              <div className="flex flex-col items-center gap-2">
                <DollarSign className="w-8 h-8" />
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