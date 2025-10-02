import { ILesson } from "./ILessons";

export interface ICourse {
  id: string;           // Kursun benzersiz kimliği, artık string
  title: string;        // Kurs adı
  description: string;  // Kurs açıklaması
  instructorId: string; // Eğitmen id'si (user tablosuna referans), string
  lessons?: ILesson[];
}

// Kurs ekleme (POST) işlemi için ID'yi dışlayan tip
export type ICourseCreate = Omit<ICourse, 'id'>;
