"use client";
import { TaskParam } from "@/features/workflow-editor/types";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { useId } from "react";
import { useQuery } from "@tanstack/react-query";
import { GetCredentialsForUser } from "@/server/credentials/actions/get-credentials-for-user";

interface CredentialsParamProps {
  param: TaskParam;
  value?: string;
  updateNodeParamValue: (value: string) => void;
  disabled: boolean;
}

export default function CredentialsParam({
  param,
  value,
  updateNodeParamValue,
  disabled,
}: CredentialsParamProps) {
  const id = useId();
  const query = useQuery({
    queryKey: ["credentials-for-user"],
    queryFn: () => GetCredentialsForUser(),
    refetchInterval: 10 * 1000, // 10 seconds
  });

  return (
    <div className="flex flex-col gap-1 w-full">
      <Label htmlFor={id} className="text-xs flex">
        {param.name}
        {param.required && <p className="text-red-400 px-2">*</p>}
      </Label>
      <Select
        onValueChange={(value) => updateNodeParamValue(value)}
        defaultValue={value}
      >
        <SelectTrigger className="w-full bg-background">
          <SelectValue placeholder="Select an option" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Credentials</SelectLabel>
            {query.data?.map((credential) => (
              <SelectItem key={credential.id} value={credential.id}>
                {credential.name}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
}
