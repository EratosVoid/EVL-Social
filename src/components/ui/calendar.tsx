"use client";

import * as React from "react";
import { DayPicker } from "react-day-picker";
import { cn } from "@/lib/utils";

export type CalendarProps = React.ComponentProps<typeof DayPicker>;

function Calendar({ className, classNames, showOutsideDays = true, ...props }: CalendarProps) {
  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      className={cn("p-3", className)}
      classNames={{
        months: "flex flex-col sm:flex-row gap-4",
        month: "flex flex-col gap-4",
        month_caption: "flex justify-center pt-1 relative items-center",
        caption_label: "text-sm font-medium text-foreground",
        nav: "flex items-center gap-1",
        button_previous: cn(
          "absolute left-1 h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100",
          "inline-flex items-center justify-center rounded-md text-foreground",
          "hover:bg-white/10 transition-colors [&_svg]:h-4 [&_svg]:w-4"
        ),
        button_next: cn(
          "absolute right-1 h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100",
          "inline-flex items-center justify-center rounded-md text-foreground",
          "hover:bg-white/10 transition-colors [&_svg]:h-4 [&_svg]:w-4"
        ),
        month_grid: "w-full border-collapse",
        weekdays: "flex",
        weekday: "text-muted rounded-md w-8 font-normal text-[0.8rem] text-center",
        week: "flex w-full mt-2",
        day: "relative p-0 text-center text-sm",
        day_button: cn(
          "h-8 w-8 p-0 font-normal rounded-md",
          "inline-flex items-center justify-center",
          "text-foreground/70 hover:bg-white/10 hover:text-foreground transition-colors"
        ),
        selected:
          "[&>button]:bg-accent [&>button]:text-background [&>button]:hover:bg-accent [&>button]:hover:text-background [&>button]:font-semibold",
        today: "[&>button]:border [&>button]:border-accent/40 [&>button]:text-accent",
        outside: "[&>button]:text-muted/40 [&>button]:opacity-50",
        disabled: "[&>button]:text-muted/30 [&>button]:opacity-30",
        range_middle:
          "[&>button]:rounded-none [&>button]:bg-accent/10 [&>button]:text-foreground",
        hidden: "invisible",
        ...classNames,
      }}
      {...props}
    />
  );
}

Calendar.displayName = "Calendar";

export { Calendar };
