import * as z from "zod";
export const FormSchema = z.object({
  country: z.string().nonempty("country cannot be empty"),
  duration: z
    .number({ message: "duration must be a number" })
    .min(1, { message: "duration cannot be less than 1" })
    .max(100, { message: "duration cannot be more than 100 days" }),
  groupType: z.string().nonempty("group type cannot be empty"),
  travelStyle: z.string().nonempty("travel style cannot be empty"),
  interests: z.string().nonempty("interests can not be empty"),
  budgetEstimate: z
    .number()
    .min(50, { message: "budget cannot be less than 50$" })
    .max(100000, { message: "budget cannot be more than 100k $" }),
});
