import {Dog} from "@/types/Dog";

export type Reservation ={
    id:number;
    dateTime:Date;
    dog:Dog;
    name: string;
    email:string;
    phone:string;
    note:string;
}
