import {
  Tooltip as TooltipPrimitive,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const Tooltip = ({ children, content }) => {
  return (
    <TooltipProvider>
      <TooltipPrimitive>
        <TooltipTrigger asChild>
          {children}
        </TooltipTrigger>
        <TooltipContent className="bg-green-800 text-white px-3 py-1.5 rounded text-sm">
          {content}
        </TooltipContent>
      </TooltipPrimitive>
    </TooltipProvider>
  );
};

export default Tooltip;