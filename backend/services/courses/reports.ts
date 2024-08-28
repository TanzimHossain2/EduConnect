import { db } from "@/backend/model";
import { IReport } from "@/interface/courses";
import { replaceMongoIdInObject } from "@/utils/convertData";
import mongoose from "mongoose";


export async function getAReport(filter:any){
    try {
   
        
        const report = await db.report.findOne(filter).populate({
            path: 'quizAssessment',
            model: db.assessment,
        }).lean();


        if (!report) {
            return null;
        }

        //@ts-ignore
        return replaceMongoIdInObject(report) as IReport;


    } catch (err) {
        
    }
}

export const createWatchReport = async (reportData: any) => {
    try {

        let report = await db.report.findOne({
            course: reportData.courseId,
            student: reportData.userId,
        })

        if (!report) {
            report = new db.report({
                course: reportData.courseId,
                student: reportData.userId,
            });
        }

        const foundLesson = report.totalCompletedLessons.find((lessonId) => lessonId.toString() === reportData.lessonId);

        if( ! foundLesson){
            report.totalCompletedLessons.push(new mongoose.Schema.Types.ObjectId(reportData.lessonId));
        }

        const moduleData = await db.module.findById(reportData.moduleId);
        const lessonIdsToCheck = moduleData?.lessonIds || [];




        
    } catch (err) {
        console.log(err);

        
         
    }
}