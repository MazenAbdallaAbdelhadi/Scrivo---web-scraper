"use client";
import React from "react";
import { ControllerRenderProps, useFormContext } from "react-hook-form";

import { FormField, FormItem } from "@/components/ui/form";

type Props = {
  name: string;
  children: (field: ControllerRenderProps) => React.ReactNode;
};

export default function RHFField({ name, children }: Props) {
  const { control } = useFormContext();

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => {
        return <FormItem>{children(field)}</FormItem>;
      }}
    />
  );
}
