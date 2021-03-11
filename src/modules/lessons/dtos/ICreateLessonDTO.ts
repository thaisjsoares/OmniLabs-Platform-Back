export default interface ICreateLessonDTO {
    name: string;
    description: string;
    journey_id: string;
    duration: number;
    video_id: string;
    module_id?: string;
}
