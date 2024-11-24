import bcrypt from "bcrypt";
import { Request } from "express";
import { Omit } from "lodash";
import { User } from "~/interfaces/user.interface";
import { SignUpReqBodyType } from "~/models/request/userRequest.model";
import UserModel from "~/models/user.model";
import { generateDefaultAvatar } from "~/utils/generatorAvatar";
import { generatorRandomText } from "~/utils/generatorRandomText";
import { getAccessToken } from "~/utils/getAccessToken";

class UsersService {
  //================================================================================================================
  //** PRIVATE */

  //================================================================================================================

  //================================================================================================================
  //** SERVICE LOGIC */

  async checkEmailExist(email: string) {
    const user = await UserModel.findOne({ email })
    return Boolean(user)
  }

  async register(data: SignUpReqBodyType) {
    const { email, name, password, photoUrl } = data;

    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);

    const newUser = new UserModel({
      email,
      name,
      password: hashPassword,
      photoUrl: photoUrl ?? generateDefaultAvatar(name),
    });

    await newUser.save();

    const userObject = newUser.toObject() as Partial<typeof newUser>;
    delete userObject.password; // Xóa password khỏi object

    const token = await getAccessToken({
      _id: newUser._id,
      email: newUser.email,
      rule: 1,
    });

    return {
      ...userObject,
      token,
    };
  };

  async login(user: User) {
    const userCopy: Omit<User, 'password'> & { password?: string } = user.toObject
      ? { ...user.toObject() }
      : { ...user };

    // Safely delete password
    delete userCopy.password

    const token = await getAccessToken({
      _id: user._id,
      email: user.email,
      rule: user.rule ?? 1,
    })

    const data = {
      ...userCopy,
      token,
    }

    return data
  }

  async loginWithGoogle(req: Request) {
    const body = req.body;
    const { email } = body;
    const user: any = await UserModel.findOne({ email });

    if (user) {
      await UserModel.findByIdAndUpdate(user._id, body);

      const newUser: any = await UserModel.findById(user._id);

      delete newUser._doc.password;

      const data = {
        ...newUser._doc,
        token: await getAccessToken({
          _id: newUser._id,
          email: newUser.email,
          rule: newUser.rule ?? 1,
        }),
      }

      return data

    } else {
      const salt = await bcrypt.genSalt(10);
      const hashPassword = await bcrypt.hash(generatorRandomText(6), salt);

      body.password = hashPassword;

      const newUser: any = new UserModel(body);
      await newUser.save();

      delete newUser._doc.password;

      const data = {
        ...newUser._doc,
        token: await getAccessToken({
          _id: newUser._id,
          email: newUser.email,
          rule: 1,
        }),
      }

      return data
    }
  }

  async refreshToken(user: User) {
    const token = await getAccessToken({
      _id: user._id,
      email: user.email,
      rule: user.rule ? user.rule : 1,
    });
    return token;
  }

  //================================================================================================================
}

const usersService = new UsersService()
export default usersService


