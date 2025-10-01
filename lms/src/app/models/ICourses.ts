import { ILesson } from "./ILessons";

export interface ICourse {
  id: number;          // Kursun benzersiz kimliği
  title: string;       // Kurs adı
  description: string; // Kurs açıklaması
  instructorId: number; // Eğitmen id'si (user tablosuna referans)
  lessons?: ILesson[];
  
}
