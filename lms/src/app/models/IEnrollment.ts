import { ICourse } from "./ICourses";

export interface IEnrollment{
    id:string
    userId:number
    courseId:number
    course?: ICourse;
}