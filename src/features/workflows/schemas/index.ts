import * as z from "zod";

export const createWorkflowSchema = z.object({
  name: z.string().max(50),
  description: z.string().max(80).optional(),
});

export type ICreateWorkflowSchema = z.infer<typeof createWorkflowSchema>;

export const duplicateWorkflowSchema = createWorkflowSchema.extend({
  workflowId: z.string(),
});

export type IDuplicateWorkflowSchema = z.infer<typeof duplicateWorkflowSchema>;
