import { Moment } from "moment";

export interface Novedad {
    id: string;
    title: string;
    description: string;
    image: string;
    created_at: Moment;
    visible: boolean;
}