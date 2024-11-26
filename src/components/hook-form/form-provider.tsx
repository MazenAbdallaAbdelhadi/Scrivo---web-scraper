import { FieldValues, SubmitHandler, UseFormReturn } from "react-hook-form";

import { Form } from "@/components/ui/form";

// ----------------------------------------------------------------------

type Props<T extends FieldValues> = {
  children: React.ReactNode;
  methods: UseFormReturn<T>;
  onSubmit: SubmitHandler<T>;
};

export default function FormProvider<T extends FieldValues>({
  children,
  methods,
  onSubmit,
}: Props<T>) {
  return (
    <Form {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)} className="w-full">
        {children}
      </form>
    </Form>
  );
}
