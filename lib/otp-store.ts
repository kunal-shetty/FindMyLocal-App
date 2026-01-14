export const otpStore = new Map<
  string,
  { otp: string; expiresAt: number }
>()

export const userStore = new Map<
  string,
  { email: string; role: "user" | "provider" }
>()
