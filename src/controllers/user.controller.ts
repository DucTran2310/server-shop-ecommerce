import UserModel from '@models/userModel'
import { Request, Response, NextFunction } from 'express'
import bcrypt from 'bcrypt'
import { getAccessToken } from '@utils/getAccessToken'

const register = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const { email, name, password, confirmPassword } = req.body

  try {
    if (password !== confirmPassword) {
      res.status(400).json({ 
        error: true,
        message: 'Mật khẩu và xác nhận mật khẩu không khớp' 
      })
      return
    }

    const user = await UserModel.findOne({ email })
    if (user) {
      res.status(400).json({ 
        error: true,
        message: 'Tài khoản đã tồn tại' })
      return
    }

    const salt = await bcrypt.genSalt(10)
    const hashpassword = await bcrypt.hash(password, salt)

    const newUser: any = new UserModel({
      email,
      name,
      password: hashpassword,
    })

    await newUser.save()

    // Remove password from response
    delete newUser._doc.password

    // Generate token
    const token = await getAccessToken({
      _id: newUser._id,
      email: newUser.email,
      rule: 1,
    })

    // Send success response
    res.status(200).json({
      error: false,
      message: 'Đăng ký thành công',
      data: {
        ...newUser._doc,
        token,
      },
    })
  } catch (error: any) {
    res.status(500).json({
      error: true,
      message: error.message,
    })
  }
}

export { register }
