import {StaticImageData} from "next/image";

export enum AttentionNeedEnum{
    Small,
    Medium,
    Large
}
export enum SizeEnum{
    Small,
    Medium,
    Large
}
export enum SexEnum{
    Female,
    Male
}
export type Dog ={
    photoSrc:StaticImageData;
    name: String,
    description:String;
    age: Number,
    sex:SexEnum,
    needForAttention: AttentionNeedEnum,
    size : SizeEnum,
    suitableForEveryone: Boolean,
    availability: Date []
}