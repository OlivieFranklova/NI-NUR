import {Dog, SexEnum,AttentionNeedEnum,SizeEnum} from "@/types/Dog";
import dog1 from "@/resources/dog_images/dog1.jpg"
import dog2 from "@/resources/dog_images/dog2.jpg"
import dog3 from "@/resources/dog_images/dog3.jpg"
import dog4 from "@/resources/dog_images/dog4.jpg"
import dog5 from "@/resources/dog_images/dog5.jpg"
import {Reservation} from "@/types/Reservation";

export var dogs:Dog[]=[  {
    photoSrc:dog1,
    name: 'Rex',
    description: 'Rex je přátelský český pes s hravou povahou.',
    age: 3,
    sex: SexEnum.Male,
    needForAttention: AttentionNeedEnum.Medium,
    size: SizeEnum.Medium,
    suitableForEveryone: true,
    availability: [new Date('2023-10-25'), new Date('2023-10-27')],
},
    {
        photoSrc:dog2  ,
        name: 'Luna',
        description: 'Luna je milý český pes, který rád chodí na procházky.',
        age: 2,
        sex: SexEnum.Female,
        needForAttention: AttentionNeedEnum.Large,
        size: SizeEnum.Large,
        suitableForEveryone: false,
        availability: [new Date('2023-10-26'), new Date('2023-10-28')],
    },
    {
        photoSrc:dog3  ,
        name: 'Rocky',
        description: 'Rocky je aktivní český pes, skvělý pro dobrodružné majitele.',
        age: 4,
        sex: SexEnum.Male,
        needForAttention: AttentionNeedEnum.Small,
        size: SizeEnum.Small,
        suitableForEveryone: true,
        availability: [new Date('2023-10-24'), new Date('2023-10-26')],
    },
    {
        photoSrc:dog4  ,
        name: 'Mia',
        description: 'Mia je český pes plný energie a radosti.',
        age: 1,
        sex: SexEnum.Female,
        needForAttention: AttentionNeedEnum.Medium,
        size: SizeEnum.Small,
        suitableForEveryone: true,
        availability: [new Date('2023-10-25'), new Date('2023-10-27')],
    },
    {
        photoSrc:dog5 ,
        name: 'Fido',
        description: 'Fido je oddaný český pes, který miluje rodinu.',
        age: 6,
        sex: SexEnum.Male,
        needForAttention: AttentionNeedEnum.Large,
        size: SizeEnum.Large,
        suitableForEveryone: true,
        availability: [new Date('2023-10-26'), new Date('2023-10-28')],
    },
    {
        photoSrc:dog1  ,
        name: 'Bára',
        description: 'Bára je česká fenka, která je vždy připravena na dobrodružství.',
        age: 2,
        sex: SexEnum.Female,
        needForAttention: AttentionNeedEnum.Medium,
        size: SizeEnum.Medium,
        suitableForEveryone: false,
        availability: [new Date('2023-10-24'), new Date('2023-10-26')],
    },
    {
        photoSrc:dog1  ,
        name: 'Max',
        description: 'Max je český pes se silným instinktem a lovcem v duši.',
        age: 3,
        sex: SexEnum.Male,
        needForAttention: AttentionNeedEnum.Small,
        size: SizeEnum.Small,
        suitableForEveryone: true,
        availability: [new Date('2023-10-25'), new Date('2023-10-27')],
    },
    {
        photoSrc:dog1  ,
        name: 'Lucie',
        description: 'Lucie je temperamentní česká fenka, která miluje pozornost.',
        age: 2,
        sex: SexEnum.Female,
        needForAttention: AttentionNeedEnum.Medium,
        size: SizeEnum.Medium,
        suitableForEveryone: true,
        availability: [new Date('2023-10-26'), new Date('2023-10-28')],
    },
    {
        photoSrc:dog1  ,
        name: 'Benny',
        description: 'Benny je veselý a hravý český pes, který bude skvělým společníkem.',
        age: 4,
        sex: SexEnum.Male,
        needForAttention: AttentionNeedEnum.Large,
        size: SizeEnum.Large,
        suitableForEveryone: true,
        availability: [new Date('2023-10-24'), new Date('2023-10-26')],
    },
    {
        photoSrc:dog1  ,
        name: 'Sofie',
        description: 'Sofie je česká fenka, která je vždy ochotná pomoci a miluje děti.',
        age: 3,
        sex: SexEnum.Female,
        needForAttention: AttentionNeedEnum.Small,
        size: SizeEnum.Small,
        suitableForEveryone: true,
        availability: [new Date('2023-10-25'), new Date('2023-10-27')],
    },
];
export var reservations:Reservation[]=[
    {dateTime:new Date(1698746240628),dog:dogs[0],id:1},
    {dateTime:new Date(1698746240678),dog:dogs[1],id:2},
    {dateTime: new Date(2018, 0O5, 0O5, 17, 23, 42, 11),dog:dogs[0],id:3}
]