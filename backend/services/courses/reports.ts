import { db } from "@/backend/model";
import { IReport } from "@/interface/courses";
import { replaceMongoIdInObject } from "@/utils/convertData";
import mongoose from "mongoose";
import { getCourseModulesDetails } from "./courses";

/** 
 *  Get a report by filter here filter is an object that contains course and student id or ...
 * @param filter 
 * @returns  
 */
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
        console.log(err);
        return null;
    }
}

/**
 * Create a report for a student
 * @param reportData  report data
 * @returns  
 */
export const createWatchReport = async (reportData: any) => {
    try {

        let report = await db.report.findOne({
            course: reportData.courseId,
            student: reportData.userId,
        })

        // if report is not found then create a new report
        if (!report) {
            report = new db.report({
                course: reportData.courseId,
                student: reportData.userId,
            });
        }

        // check if lesson is already
        const foundLesson = report.totalCompletedLessons.find((lessonId) => lessonId.toString() === reportData.lessonId);
        console.log('foundLesson: ', foundLesson);
        

        // if lesson is not found then add it to the list
        if( ! foundLesson){
            report.totalCompletedLessons.push(new mongoose.Types.ObjectId(reportData.lessonId) as unknown as mongoose.Schema.Types.ObjectId);
        }

        const moduleData = await db.module.findById(reportData.moduleId);
        const lessonIdsToCheck = moduleData?.lessonIds || [];
        const completedLessonsIds = report.totalCompletedLessons;

        console.log("lessonIdsToCheck:-", lessonIdsToCheck, "\tcompletedLessonsIds:-", completedLessonsIds, "\tmoduleData"  ,  moduleData ,"\treportData:-", reportData);
        
      
        const isModuleComplete = lessonIdsToCheck.every((lessonId) => {
            return completedLessonsIds.includes(lessonId as any);
        } );

        console.log("\n isModuleComplete:-", isModuleComplete);
        

        if(isModuleComplete){
            const foundModule = report.totalCompletedModules.find(module => module.toString() === reportData.moduleId);
            console.log("foundModule ", foundModule);
            
            if(!foundModule){
                report.totalCompletedModules.push(new mongoose.Types.ObjectId(reportData.moduleId) as unknown as mongoose.Schema.Types.ObjectId);
            }
        }

        // Check if the course has completed
        // If so, add the completion time.

        const course = await getCourseModulesDetails(reportData.courseId);
        const modulesInCourse = course?.modules || [];
        const moduleCount = modulesInCourse?.length ?? 0;

        const completedModule = report.totalCompletedModules || [];
        const completedModuleCount = completedModule?.length ?? 0;

        if (completedModuleCount >= 1 && completedModuleCount === moduleCount) {
            report.completion_date = new Date(Date.now());
            report.courseCompletion = true;
        }



        
        console.log("report:-", report);
        await report.save();
 
    } catch (err) {
        console.log("Error creating report", err);

        
         
    }
}


export const createAssessmentReport = async (reportData: any) => {
    try {
        let report = await db.report.findOne({
            course: reportData.courseId,
            student: reportData.userId,
        });

        if(!report){
            report = await db.report.create({
                course: reportData.courseId,
                student: reportData.userId,
                quizAssessment: reportData.quizAssessment
            });
        } else {
            if(!report.quizAssessment){
                report.quizAssessment = reportData.quizAssessment;
                await report.save();
            }
        }

    } catch (err) {
        console.log("Error creating assessment report", err);
        return null;
    }
}