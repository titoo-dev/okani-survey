import { Star } from "lucide-react";
import { cn } from "@/lib/utils";

type StarRatingProps = {
  value: number;
  onChange: (value: number) => void;
  max?: number;
  min?: number;
  size?: "sm" | "md" | "lg";
  readonly?: boolean;
};

export function StarRating({ value, onChange, max = 5, min = 0, size = "md", readonly = false }: StarRatingProps) {
  const sizeClasses = {
    sm: "w-5 h-5",
    md: "w-6 h-6",
    lg: "w-8 h-8"
  };

  const handleClick = (starValue: number) => {
    if (readonly) return;
    if (starValue < min || starValue > max) return;
    if (value === starValue && min === 0) {
      onChange(0);
    } else {
      onChange(starValue);
    }
  };

  return (
    <div className="flex items-center gap-1">
      {Array.from({ length: max }, (_, index) => {
        const starValue = index + 1;
        const isFilled = starValue <= value;
        const isClickable = starValue >= min && starValue <= max;
        
        return (
          <button
            key={starValue}
            type="button"
            onClick={() => handleClick(starValue)}
            disabled={readonly || !isClickable}
            className={cn(
              "transition-all duration-200",
              !readonly && isClickable && "hover:scale-110 cursor-pointer",
              (readonly || !isClickable) && "cursor-not-allowed"
            )}
            aria-label={`${starValue} étoile${starValue > 1 ? 's' : ''}`}
          >
            <Star
              className={cn(
                sizeClasses[size],
                "transition-colors",
                isFilled ? "fill-yellow-400 text-yellow-400" : "text-gray-300",
                (readonly || !isClickable) && "opacity-40"
              )}
            />
          </button>
        );
      })}
      <span className="ml-2 text-sm font-medium text-foreground">
        {value}/{max}
      </span>
    </div>
  );
}

