export interface ILesson{
  id:number ;
  title:string;
  content:string;
  courseId:number | string;
}  

// Ders ekleme (POST) işlemi için ID'yi dışlayan tip
export type ILessonCreate = Omit<ILesson, 'id'>;
