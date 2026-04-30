import { z } from "zod";

export const CreateUserSchema = z.object({
  id: z.string().optional(),
  email: z.email(),
  firstName: z.string().min(2).max(100),
  lastName: z.string().min(2).max(100),
  middleName: z.string().optional(),
  birthDate: z.string().refine(
    (date) => {
      const parsedDate = Date.parse(date);
      return !isNaN(parsedDate) && new Date(parsedDate) < new Date();
    },
    {
      message: "Birthdate must be a valid date in the past",
    },
  ),
});

export const UpdateUserSchema = z.object({
  email: z.email(),
  firstName: z.string().min(2).max(100).optional(),
  lastName: z.string().min(2).max(100).optional(),
  middleName: z.string().optional(),
  birthDate: z
    .string()
    .refine(
      (date) => {
        const parsedDate = Date.parse(date);
        return !isNaN(parsedDate) && new Date(parsedDate) < new Date();
      },
      {
        message: "Birthdate must be a valid date in the past",
      },
    )
    .optional(),
});

export const UpdateAvatarSchema = z.object({
  avatarUrl: z.url(),
});

export const DeleteManySchema = z.object({
  ids: z.array(z.uuid()),
});

export const SearchUserSchema = z.object({
  filter: z.object({
    firstName: z.string().min(2).max(100).optional(),
    lastName: z.string().min(2).max(100).optional(),
    middleName: z.string().optional(),
    email: z.email().optional(),
    birthDate: z
      .string()
      .refine(
        (date) => {
          const parsedDate = Date.parse(date);
          return !isNaN(parsedDate) && new Date(parsedDate) < new Date();
        },
        {
          message: "Birthdate must be a valid date in the past",
        },
      )
      .optional(),
  }),
  orderBy: z
    .object({
      field: z.enum(["firstName", "lastName", "email", "birthDate"]),
      order: z.enum(["asc", "desc"]),
    })
    .optional(),
  cursor: z.object({
    before: z.string().optional(),
    after: z.string().optional(),
  }),
  take: z.number().int().positive().max(100).optional(),
});

export type DeleteManyDTO = z.infer<typeof DeleteManySchema>;
export type SearchUserDTO = z.infer<typeof SearchUserSchema>;
export type CreateUserDTO = z.infer<typeof CreateUserSchema>;
export type UpdateUserDTO = z.infer<typeof UpdateUserSchema>;
export type UpdateAvatarDTO = z.infer<typeof UpdateAvatarSchema>;
