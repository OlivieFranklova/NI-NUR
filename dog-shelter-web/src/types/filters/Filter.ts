import {Dog} from "@/types/Dog";
import {StaticImageData} from "next/image";

export interface Filter {
    apply(dogs: Dog[]): Dog[]
    copy(value: any): Filter
    filterName(): String
    getCurrentChoice(): { key: any, value: {name:String,icon_src:StaticImageData| undefined} }
    getChoices(): {key: any, value: {name:String,icon_src:StaticImageData| undefined}}[]
}