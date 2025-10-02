import { ILesson } from "./ILessons";

export interface ICourse {
  id: number | string;          // Kursun benzersiz kimliği
  title: string;       // Kurs adı
  description: string; // Kurs açıklaması
  instructorId: number; // Eğitmen id'si (user tablosuna referans)
  lessons?: ILesson[];
  
}
// Kurs ekleme (POST) işlemi için ID'yi dışlayan tip
export type ICourseCreate = Omit<ICourse, 'id'>;
