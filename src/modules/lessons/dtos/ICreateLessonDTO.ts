export default interface ICreateLessonDTO {
    name: string;
    description: string;
    duration: number;
    video_id: string;
    module_id?: string;
}
