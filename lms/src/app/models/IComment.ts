export interface IComment {
  id: string;        // Comment ID, string
  courseId: string;  // Hangi kursa ait, string
  userId: string;    // Yorum yapan kullanıcı ID, string
  text: string;      // Yorum içeriği
  date: string;      // Oluşturulma tarihi (ISO string)
  authorName?: string;
}

export type ICommentCreate = Omit<IComment, 'id' | 'date'>;