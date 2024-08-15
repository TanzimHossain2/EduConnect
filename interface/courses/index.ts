import { ObjectId } from "mongoose";

export interface ICourse {
  id: string;
  title: string;
  description: string;
  price: number;
  thumbnail: string;
  modules: ObjectId[];
  active: boolean;
  category: ICategory;
  instructor: ObjectId;
  quizzes: ObjectId;
  testimonials: ObjectId[];
}

export interface ICategory {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
}

type role = "admin" | "instructor" | "student";
export interface IUser {
  id: string;
  firstName: string;
  lastName: string;
  password: string;
  email: string;
  phone: string;
  role: role;
  bio: string;
  socialMedia: object;
  profilePicture: string;
}

export interface IModule {
  id: string;
  title: string;
  description: string;
  status: string;
  slug: string;
  course: string;
  lessonIds: string[];
}

export interface ITestimonial {
  id: string;
  content: string;
  user: string;
  courseId: string;
  rating: number;
}
