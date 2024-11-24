export type SignUpReqBodyType = {
  name: string;
  email: string;
  password: string;
  confirm_password?: string;
  photoUrl?: string;
};

export type LoginReqBodyType = {
  email: string;
  password: string;
};