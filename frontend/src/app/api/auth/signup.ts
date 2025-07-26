"use server"

import { z } from "zod"
import { redirect } from "next/navigation"

const SignupFormSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters long." }).trim(),
  email: z.string().email({ message: "Please enter a valid email." }).trim(),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters long" })
    .regex(/[a-zA-Z]/, { message: "Password must contain at least one letter." })
    .regex(/[0-9]/, { message: "Password must contain at least one number." })
    .trim(),
})

export type FormState =
  | {
      errors?: {
        name?: string[]
        email?: string[]
        password?: string[]
      }
      message?: string
    }
  | undefined

export async function signup(state: FormState, formData: FormData): Promise<FormState> {
  // Validate form fields
  const validatedFields = SignupFormSchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    password: formData.get("password"),
  })

  // If any form fields are invalid, return early
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    }
  }

  const { name, email, password } = validatedFields.data

  try {
    // Here you would typically:
    // 1. Hash the password
    // 2. Check if user already exists
    // 3. Create user in database
    // 4. Send verification email
    // 5. Create session

    console.log("Creating user:", { name, email })

    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // For demo purposes, we'll just redirect
    // In a real app, you'd create the user and handle the response
  } catch (error) {
    return {
      message: "An error occurred while creating your account.",
    }
  }

  redirect("/login?message=Account created successfully")
}
