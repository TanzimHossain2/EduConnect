import { ObjectId } from "mongoose";

export interface ICourse {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  price: number;
  thumbnail: string;
  modules: IModule[];
  learning: [string];
  active: boolean;
  category: ICategory;
  instructor: IUser;
  quizzes: ObjectId;
  testimonials: ITestimonial[];
  createdOn: Date;
  modifiedOn: Date;
}

export interface ICategory {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
}

type role = "admin" | "instructor" | "student";
export interface IUser {
  [x: string]: any;
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
  designation: string;
}

export interface IModule {
  _id: string;
  id: string;
  title: string;
  description: string;
  status: string;
  slug: string;
  course: string;
  lessonIds: string[];
  duration: number;
}

export interface ITestimonial {
  _id: string;
  id: string;
  content: string;
  user: IUser;
  courseId: ICourse;
  rating: number;
}

export interface IEnrollment {
  enrollment_date: Date;
  status: string;
  completion_date: Date;
  method: string;
  course: ICourse;
  student: IUser;
}

export interface ILesson {
  title: string;
  description: string;
  duration: number;
  video_url: string;
  published: boolean;
  slug: string;
  access: string;
}
