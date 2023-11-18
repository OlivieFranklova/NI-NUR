import {Filter} from "@/types/filters/Filter";
import {AttentionNeedEnum, Dog} from "@/types/Dog";
import {StaticImageData} from "next/image";
import  high_interest from '@/resources/icons/Interest=High.png';
import medium_interest from '@/resources/icons/Interest=Medium.png';
import small_interest from '@/resources/icons/Interest=Low.png';


export class NeedForAttentionFilter implements Filter {
    needForAttention?: AttentionNeedEnum = undefined

    constructor(needForAttention?: AttentionNeedEnum) {
        this.needForAttention = needForAttention;
    }

    static filterName = "Potřeba venčení"
    static defaultChoice = { key: undefined, value:{name: NeedForAttentionFilter.filterName,icon_src:undefined} }
    static choices = [
        {
            key: AttentionNeedEnum.Small,
            value: {name:"Malá",icon_src:small_interest}
        }, {
            key: AttentionNeedEnum.Medium,
            value: {name:"Střední",icon_src:medium_interest}
        }, {
            key: AttentionNeedEnum.Large,
            value: {name:"Velká",icon_src:high_interest}
        }
    ]

    apply(dogs: Dog[]): Dog[] {
        if (this.needForAttention === undefined) {
            return dogs
        }

        return dogs.filter((value: Dog) => {
            return value.needForAttention == this.needForAttention
        })
    }

    copy(value: any): Filter {
        if (value !== undefined && typeof value !== "number") {
            throw new Error("Value is not a number.")
        }

        return new NeedForAttentionFilter(value)
    }

    filterName(): String {
        return NeedForAttentionFilter.filterName;
    }

    getChoices(): {
        key: any;
        value: {name:String, icon_src:StaticImageData| undefined}
    }[] {
        return NeedForAttentionFilter.choices;
    }

    getCurrentChoice(): {
        key: any;
        value: {name:String, icon_src:StaticImageData| undefined}
    } {
        if (this.needForAttention=== undefined) {
            return NeedForAttentionFilter.defaultChoice
        }

        return NeedForAttentionFilter.choices.find((choice) => {
            return choice.key == this.needForAttention
        }) ?? NeedForAttentionFilter.defaultChoice
    }
}