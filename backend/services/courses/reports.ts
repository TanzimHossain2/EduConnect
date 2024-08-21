import { db } from "@/backend/model";
import { IReport } from "@/interface/courses";
import { replaceMongoIdInObject } from "@/utils/convertData";


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