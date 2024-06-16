import {z} from "zod";

const issueSchema = z.object({
    title: z.string().min(1, "title is required").max(255),
    description: z.string().min(1, "description is required"),
    status: z.enum(["IN_PROGRESS", "OPEN", "CLOSED"]),
});

export {issueSchema};