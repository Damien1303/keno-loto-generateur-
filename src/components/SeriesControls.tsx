import { Slider } from "@/components/ui/slider";

interface SeriesControlsProps {
  seriesSize: number;
  numberOfSeries: number;
  maxSeriesSize: number;
  onSeriesSizeChange: (value: number) => void;
  onNumberOfSeriesChange: (value: number) => void;
}

export const SeriesControls = ({
  seriesSize,
  numberOfSeries,
  maxSeriesSize,
  onSeriesSizeChange,
  onNumberOfSeriesChange,
}: SeriesControlsProps) => {
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h3 className="text-lg font-medium text-center bg-gradient-to-r from-[#F1F1F1] via-[#ea384c] to-[#F1F1F1] text-transparent bg-clip-text">
          Taille des Séries
        </h3>
        <div className="flex items-center gap-4">
          <span className="text-sm text-[#9F9EA1]">1</span>
          <Slider
            value={[seriesSize]}
            onValueChange={(value) => onSeriesSizeChange(value[0])}
            max={maxSeriesSize}
            min={1}
            step={1}
            className="flex-1"
          />
          <span className="text-sm text-[#9F9EA1]">{maxSeriesSize}</span>
        </div>
        <p className="text-center text-sm text-[#9F9EA1]">
          Sélectionné: {seriesSize} numéro{seriesSize > 1 ? "s" : ""}
        </p>
      </div>

      <div className="space-y-2">
        <h3 className="text-lg font-medium text-center bg-gradient-to-r from-[#F1F1F1] via-[#ea384c] to-[#F1F1F1] text-transparent bg-clip-text">
          Nombre de Séries
        </h3>
        <div className="flex items-center gap-4">
          <span className="text-sm text-[#9F9EA1]">1</span>
          <Slider
            value={[numberOfSeries]}
            onValueChange={(value) => onNumberOfSeriesChange(value[0])}
            max={30}
            min={1}
            step={1}
            className="flex-1"
          />
          <span className="text-sm text-[#9F9EA1]">30</span>
        </div>
        <p className="text-center text-sm text-[#9F9EA1]">
          Sélectionné: {numberOfSeries} série{numberOfSeries > 1 ? "s" : ""}
        </p>
      </div>
    </div>
  );
};