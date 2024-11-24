import { User } from "@interfaces/user.interface"

export { }

declare module 'express' {
  interface Request {
    user?: User
  }
}
