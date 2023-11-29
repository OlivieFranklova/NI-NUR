import {Dog} from "@/types/Dog";
import {StaticImageData} from "next/image";

export interface Filter {
    apply(dogs: Dog[]): Dog[]
    copy(value: any): Filter
    filterName(): string
    getCurrentChoice(): { key: any, value: {name:string,icon_src:StaticImageData| undefined} }
    getChoices(): {key: any, value: {name:string,icon_src:StaticImageData| undefined}}[]
    resetFilter():void
}