import { Card } from "@/components/ui/card";
import { motion } from "framer-motion";
import { Gauge } from "lucide-react";

interface ResultsDisplayProps {
  numbers: number[][];
  drawnNumbers?: number[];
}

export const ResultsDisplay = ({ numbers, drawnNumbers = [] }: ResultsDisplayProps) => {
  const getNumberClass = (number: number) => {
    if (drawnNumbers.includes(number)) {
      return "bg-green-500/90 text-white border-green-600 shadow-lg shadow-green-500/20";
    }
    return "bg-[#ea384c]/90 text-white border-[#990000] shadow-lg shadow-[#ea384c]/20";
  };

  return (
    <Card className="p-6 backdrop-blur-sm bg-[#1A1F2C]/90 shadow-2xl animate-fade-in border-[#333333] rounded-xl">
      <div className="space-y-6">
        <div className="flex items-center justify-center gap-2">
          <Gauge className="w-6 h-6 text-[#ea384c]" />
          <h3 className="text-xl font-medium text-center bg-gradient-to-r from-[#FFFFFF] via-[#ea384c] to-[#FFFFFF] text-transparent bg-clip-text">
            Vos Numéros Performance
          </h3>
          <Gauge className="w-6 h-6 text-[#ea384c]" />
        </div>
        <div className="space-y-6">
          {numbers.map((series, seriesIndex) => (
            <div key={seriesIndex} className="space-y-2">
              <h4 className="text-sm font-medium text-[#9F9EA1]">Série {seriesIndex + 1}</h4>
              <div className="flex flex-wrap gap-3 justify-center">
                {series.map((number, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    className={`w-12 h-12 rounded-full flex items-center justify-center font-semibold border-2 transition-all duration-300 ${getNumberClass(number)}`}
                  >
                    {number}
                  </motion.div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
};