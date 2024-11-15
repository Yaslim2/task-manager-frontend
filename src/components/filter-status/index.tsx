"use client";

import * as React from "react";
import { Check, ChevronsUpDown } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { StatusEnum } from "../table-tasks";

const options = [
  {
    value: "Pendente",
    label: "Pending",
  },
  {
    value: "Em Andamento",
    label: "In Progress",
  },
  {
    value: "Concluída",
    label: "Completed",
  },
];

export function FilterStatus({
  handleChangeStatus,
  widthFull,
  status,
}: {
  handleChangeStatus: (status?: StatusEnum) => void;
  widthFull?: boolean;
  status?: StatusEnum;
}) {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState(status || "");

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className={cn("justify-between", widthFull ? "w-full" : "w-[200px]")}
        >
          {value
            ? options.find((option) => option.value === value)?.label
            : "Select status..."}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder="Search status..." />
          <CommandList>
            <CommandEmpty>No status found.</CommandEmpty>
            <CommandGroup>
              {options.map((option) => (
                <CommandItem
                  key={option.value}
                  value={option.value}
                  onSelect={(currentValue) => {
                    setValue(currentValue === value ? "" : currentValue);
                    handleChangeStatus(
                      currentValue === value
                        ? undefined
                        : (currentValue as StatusEnum)
                    );
                    setOpen(false);
                  }}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      value === option.value ? "opacity-100" : "opacity-0"
                    )}
                  />
                  {option.label}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
