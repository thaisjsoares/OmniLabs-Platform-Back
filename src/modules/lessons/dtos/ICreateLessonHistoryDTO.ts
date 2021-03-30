export default interface ICreateLessonHistoryDTO {
    lesson_id: string;
    group_id: string;
    title: string;
    duration: number;
    description: string;
    resource?: string;
    released_at: string;
    platform: string;
    name: string;
    link?: string;
}
