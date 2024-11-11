import { z } from "zod";

const formSchema = z.object({
  id: z.string().min(9, "The ID number must be at least of 9 characters"),
  firstName: z.string().min(2, "name must be at least 2 characters"),
  lastName: z.string().min(2, "name must be at least 2 characters"),
  birthDate: z.date().refine((date) => date <= new Date(), {
    message: "Date cannot be in the future",
  }),
  email: z.string().email("Invalid email address"),
});

export default formSchema;

// type FormData = z.infer<typeof formSchema>;
