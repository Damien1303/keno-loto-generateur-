import { Card } from "@/components/ui/card";
import { motion } from "framer-motion";

interface ResultsDisplayProps {
  numbers: number[][];
  drawnNumbers?: number[];
}

export const ResultsDisplay = ({ numbers, drawnNumbers = [] }: ResultsDisplayProps) => {
  const getNumberClass = (number: number) => {
    if (drawnNumbers.includes(number)) {
      return "bg-green-500 text-white border-green-600";
    }
    return "bg-purple-100 text-purple-700 border-purple-300";
  };

  return (
    <Card className="p-6 backdrop-blur-sm bg-white/90 shadow-lg animate-fade-in border-purple-200">
      <div className="space-y-6">
        <h3 className="text-lg font-medium text-center text-purple-800">Vos Numéros Chance</h3>
        <div className="space-y-6">
          {numbers.map((series, seriesIndex) => (
            <div key={seriesIndex} className="space-y-2">
              <h4 className="text-sm font-medium text-purple-600">Série {seriesIndex + 1}</h4>
              <div className="flex flex-wrap gap-3 justify-center">
                {series.map((number, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    className={`w-12 h-12 rounded-full flex items-center justify-center font-semibold border-2 transition-colors duration-300 ${getNumberClass(number)}`}
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