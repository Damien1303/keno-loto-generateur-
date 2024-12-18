import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface DrawVerificationProps {
  onDrawnNumbersChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onCheckMatches: () => void;
}

export const DrawVerification = ({
  onDrawnNumbersChange,
  onCheckMatches,
}: DrawVerificationProps) => {
  return (
    <div className="space-y-2 mt-12 pt-6 border-t border-[#403E43]">
      <h3 className="text-lg font-medium text-center bg-gradient-to-r from-[#F1F1F1] via-[#ea384c] to-[#F1F1F1] text-transparent bg-clip-text">
        Vérification des Tirages
      </h3>
      <div className="flex gap-2">
        <Input
          placeholder="Entrez les numéros tirés (séparés par des virgules)"
          onChange={onDrawnNumbersChange}
          className="flex-1 bg-[#1A1F2C]/60 border-[#403E43] text-[#F1F1F1] placeholder-[#8E9196] focus:ring-[#ea384c] focus:border-[#ea384c]"
        />
        <Button 
          onClick={onCheckMatches} 
          variant="outline" 
          className="border-[#403E43] bg-[#1A1F2C]/60 text-[#F1F1F1] hover:bg-[#ea384c]/20 hover:border-[#ea384c] hover:text-white"
        >
          Vérifier
        </Button>
      </div>
    </div>
  );
};