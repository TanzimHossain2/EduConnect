import { db } from "@/backend/model";
import { IQuizSet } from "@/interface/courses";
import {
  nestedReplaceMongoIdInArray,
  nestedReplaceMongoIdInObject,
} from "@/utils/convertData";

export const getAllQuizSets = async (excludeUnPublished=false) => {
  try {
    let quizSets = [];

    if(excludeUnPublished){
      quizSets = await db.quizSet
      .find({
        active: true
      })
      .lean();
    }else {
      quizSets = await db.quizSet
      .find()
      .lean();
    }
    

    if (!quizSets) {
      return;
    }

    return nestedReplaceMongoIdInArray(quizSets);
  } catch (err) {
    console.error("Error fetching quiz sets", err);
    return null;
  }
};

export const getQuizSetById = async (id: string) => {
  try {
    const quizSet = await db.quizSet
      .findById(id)
      .populate({
        path: "quizIds",
        model: db.quiz,
      })
      .lean();

    if (!quizSet) {
      return;
    }

    return nestedReplaceMongoIdInObject(quizSet) as IQuizSet;
  } catch (err) {
    console.error("Error fetching quiz set", err);

    return null;
  }
}; 


export const createQuiz=async(quizData:any)=>{
  try {
    const quiz = await db.quiz.create(quizData);
    if (!quiz) {
      return null;
    }

    return {
      id: quiz._id
    }
    
  } catch (err) {
    console.error("Error creating quiz", err);
    return null;
  }
}