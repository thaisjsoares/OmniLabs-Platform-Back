export default interface ICreateLessonDTO {
    type: 'video' | 'link' | 'material';
    group_id: string;
    title: string;
    duration: number;
    description: string;
    resource?: string;
    platform: string;
    name: string;
    link?: string;
}
