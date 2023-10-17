
enum AttentionNeedEnum{
    small,
    medium,
    large
}
enum SizeEnum{
    small,
    medium,
    large
}
enum SexEnum{
    Female,
    Male
}
export type Dog ={
    photoSrc:String;
    name: String,
    age: Number,
    sex:SexEnum,
    needForAttention: AttentionNeedEnum,
    size : SizeEnum,
    suitableForEveryone: Boolean,
    availability: Date []
}