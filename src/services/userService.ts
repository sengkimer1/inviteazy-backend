import {
  IUser,
  IUserService,
  IUserRepository,
  IUserWithoutPassword,
} from "../interfaces/userInterface";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

export class UserService implements IUserService {
  constructor(private userRepository: IUserRepository) {}

  async getAllUsers(): Promise<IUserWithoutPassword[]> {
    return this.userRepository.findAll();
  }

  async getUserById(id: string): Promise<IUserWithoutPassword> {
    const user = await this.userRepository.findById(id);
    if (!user) {
      throw Object.assign(new Error("User not found"), { status: 404 });
    }
    return user;
  }

  async createUser(user: Omit<IUser, "id">): Promise<{ user: IUserWithoutPassword; token: string }> {
    const existingUser = await this.userRepository.findByEmail(user.email);
    if (existingUser) {
      throw Object.assign(new Error("User already exists"), { status: 400 });
    }
    const newUser = await this.userRepository.create(user);

    const token = jwt.sign({ id: newUser.id }, process.env.JWT_SECRET!, {
      expiresIn: "1h",
    });

    return { user: newUser, token };
  }

  async login(email: string, password: string) {
    const user = await this.userRepository.findByEmail(email);
    if (!user) {
      throw Object.assign(new Error("User not found"), { status: 404 });
    }

    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      throw Object.assign(new Error("Invalid password"), { status: 400 });
    }

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET!, {
      expiresIn: "1h",
    });

    const { password: _, ...userWithoutPassword } = user;

    return {
      user: userWithoutPassword,
      token,
    };
  }
}
