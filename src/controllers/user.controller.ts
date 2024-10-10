import UserModel from "@models/userModel"
import { Request, Response, NextFunction } from "express"
import bcrypt from "bcrypt"
import { getAccessToken } from "@utils/getAccessToken"
import { ObjectId } from "mongoose"
import { generatorRandomText } from "@utils/generatorRandomText"
import { generateDefaultAvatar } from "@utils/generatorAvatar"

interface User {
  _id: ObjectId
  email: string
  name: string
  password?: string
  rule?: number
}

const register = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const { email, name, password, confirmPassword, photoUrl } = req.body

  try {
    if (password !== confirmPassword) {
      res.status(400).json({
        error: true,
        message: "Mật khẩu và xác nhận mật khẩu không khớp",
        data: null,
      })
      return
    }

    const user = await UserModel.findOne({ email })
    if (user) {
      res.status(400).json({
        error: true,
        message: "Tài khoản đã tồn tại",
        data: null,
      })
      return
    }

    const salt = await bcrypt.genSalt(10)
    const hashpassword = await bcrypt.hash(password, salt)

    const newUser = new UserModel({
      email,
      name,
      password: hashpassword,
      photoUrl: photoUrl ?? generateDefaultAvatar(name)
    })

    await newUser.save()

    const userObject = newUser.toObject() as unknown as Partial<User>

    if (userObject.password) {
      delete userObject.password
    }

    // Generate token
    const token = await getAccessToken({
      _id: newUser._id,
      email: newUser.email,
      rule: 1,
    })

    // Send success response
    res.status(200).json({
      error: false,
      message: "Đăng ký thành công",
      data: {
        ...userObject,
        token,
      },
    })
  } catch (error: any) {
    res.status(500).json({
      error: true,
      message: error.message,
      data: null,
    })
  }
}

const login = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const { email, password } = req.body

  try {
    const user = await UserModel.findOne({ email }).lean() // .lean() makes it a plain JS object

    if (!user) {
      res.status(400).json({
        error: true,
        message: "Tài khoản không tồn tại",
        data: null,
      })
      return
    }

    const isMatchPassword = await bcrypt.compare(password, user.password!)
    if (!isMatchPassword) {
      res.status(401).json({
        error: true,
        message:
          "Đăng nhập thất bại, vui lòng kiểm tra lại Email/Password và thử lại",
        data: null,
      })
      return
    }

    // Type assertion: mark password as optional
    const userCopy: Omit<typeof user, "password"> & { password?: string } = {
      ...user,
    }

    // Safely delete password
    delete userCopy.password

    const token = await getAccessToken({
      _id: user._id,
      email: user.email,
      rule: user.rule ?? 1,
    })

    res.status(200).json({
      error: false,
      message: "Đăng nhập thành công",
      data: {
        ...userCopy,
        token,
      },
    })
  } catch (error: any) {
    res.status(500).json({
      error: true,
      message: error.message,
      data: null,
    })
    return
  }
}

const loginWithGoogle = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
	const body = req.body;
	const { email } = body;
	try {
		const user: any = await UserModel.findOne({ email });

		if (user) {
			await UserModel.findByIdAndUpdate(user._id, body);

			const newUser: any = await UserModel.findById(user._id);

			delete newUser._doc.password;

			res.status(200).json({
        error: false,
				message: 'Đăng nhập thành công',
				data: {
					...newUser._doc,
					token: await getAccessToken({
						_id: newUser._id,
						email: newUser.email,
						rule: newUser.rule ?? 1,
					}),
				},
			});
		} else {
			const salt = await bcrypt.genSalt(10);
			const hashPassword = await bcrypt.hash(generatorRandomText(6), salt);

			body.password = hashPassword;

			const newUser: any = new UserModel(body);
			await newUser.save();

			delete newUser._doc.password;

			res.status(200).json({
				message: 'Đăng ký thành công',
				data: {
					...newUser._doc,
					token: await getAccessToken({
						_id: newUser._id,
						email: newUser.email,
						rule: 1,
					}),
				},
			});
		}
	} catch (error: any) {
		res.status(404).json({
      error: true,
			message: error.message,
      data: null
		});
    return
	}
};

export { register, login, loginWithGoogle }
