import {Dog} from "@/types/Dog";

export interface Filter {
    apply(dogs: Dog[]): Dog[]
    copy(value: any): Filter
    filterName(): String
    getCurrentChoice(): { key: any, value: String }
    getChoices(): {key: any, value: String}[]
}