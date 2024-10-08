import { Document, ObjectId } from "mongoose";

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
  quizSet: ObjectId | null;
  testimonials: ITestimonial[];
  tags: string[];
  createdOn: Date;
  modifiedOn: Date;
}

export interface ICategory {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
}

interface SocialMediaLinks {
  twitter?: string;
  linkedin?: string;
  gitHub?: string;
  facebook?: string;
  website?: string;
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
  socialMedia: {
    [key: string]: string;
  };
  profilePicture: string;
  designation: string;
}

export interface IModule {
  _id: string;
  id: string;
  title: string;
  description: string;
  active: boolean;
  slug: string;
  course: ICourse;
  lessonIds: ILesson[];
  duration: number;
  order: number;
}

export interface ITestimonial {
  _id: string;
  id: string;
  content: string;
  user: IUser;
  courseId: ICourse;
  rating: number;
  studentName?: string;
}

export interface IEnrollment {
  _id: string;
  id: string;
  enrollment_date: Date;
  status: string;
  completion_date: Date;
  method: string;
  course: ICourse;
  student: IUser;
  studentName?: string;
  studentEmail?: string;
  progress?: number;
  quizMark?: number;
}

export interface ILesson extends Document {
  id: string;
  title: string;
  description: string;
  duration: number;
  video_url: string;
  active: boolean;
  slug: string;
  access: "public" | "private";
  order: number;
  state?: string;
}

export interface IAssessment {
  assessments: IAssessments[];
  otherMarks: number;
}

export interface IReport {
  course: ICourse;
  student: IUser;
  totalCompletedLessons: ObjectId[];
  totalCompletedModules: ObjectId[];
  quizAssessment: IAssessment;
  completion_date: Date;
  courseCompletion: boolean;
}

export interface IAssessments {
  quizId: ObjectId;
  options: {
    option: string;
    isCorrect: boolean;
    isSelected: boolean;
  }[];
  attempted: boolean;
}

export interface IQuizSet {
  id: string;
  title: string;
  description: string;
  slug: string;
  active: boolean;
  quizIds: IQuiz[];
}

export interface IQuiz extends Document {
  id: string;
  title: string;
  description: string;
  explanations: string;
  slug: string;
  marks: number;
  options: {
    text: string;
    is_correct: boolean;
    label?: string;
    isCorrect?: boolean;
    id?: string;
  }[];
}

export enum State {
  started = "started",
  completed = "completed",
}
export interface IWatch {
  id: string;
  user: IUser;
  lesson: ILesson;
  lastTime: number;
  state: State;
  module: IModule;
}
