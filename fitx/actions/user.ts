'use server'

import { prisma } from '@/lib/prisma'
import bcrypt from 'bcryptjs'

export async function signupAction(formData: {
  name: string,
  email: string 
  password: string
}) {

  const existingUser = await prisma.user.findUnique({
    where: { email: formData.email },
  })

  if (existingUser) {
    return { error: "User already exists"}
  }

  const hashedPassword = await bcrypt.hash(formData.password, 12)

  const user = await prisma.user.create({
    data: {
      name: formData.name,
      email: formData.email,
      password: hashedPassword,
    },
  })

  return { success: true, user }
}