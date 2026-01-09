import { Search } from "lucide-react";
import { cn } from "@/shared/lib/utils";
import { Input } from "@/component/ui/input";

interface InputSearchProps extends React.InputHTMLAttributes<HTMLInputElement> {
  className?: string;
  wrapperClassName?: string;
}

export const InputSearch = ({
  className,
  wrapperClassName,
  ...props
}: InputSearchProps) => {
  return (
    <div className={cn("relative flex items-center", wrapperClassName)}>
      <Search className="absolute left-3 w-4 h-4 text-slate-400 pointer-events-none" />
      <Input
        type="search"
        className={cn(
          "pl-9 pr-4 h-10 w-full rounded-xl border-slate-200 bg-white focus:border-indigo-500 focus:ring-indigo-500/20 text-sm placeholder:text-slate-400",
          className
        )}
        placeholder="Rechercher..."
        {...props}
      />
    </div>
  );
};
