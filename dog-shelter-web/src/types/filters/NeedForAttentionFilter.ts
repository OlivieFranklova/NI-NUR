import {Filter} from "@/types/filters/Filter";
import {AttentionNeedEnum, Dog} from "@/types/Dog";


export class NeedForAttentionFilter implements Filter {
    needForAttention?: AttentionNeedEnum = undefined

    constructor(needForAttention?: AttentionNeedEnum) {
        this.needForAttention = needForAttention;
    }

    static filterName = "Potřeba venčení"
    static defaultChoice = { key: undefined, value: NeedForAttentionFilter.filterName }
    static choices = [
        {
            key: AttentionNeedEnum.Small,
            value: "Malá"
        }, {
            key: AttentionNeedEnum.Medium,
            value: "Střední"
        }, {
            key: AttentionNeedEnum.Large,
            value: "Velká"
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
        if (typeof value !== "number") {
            throw new Error("Value is not a number.")
        }

        return new NeedForAttentionFilter(value)
    }

    filterName(): String {
        return NeedForAttentionFilter.filterName;
    }

    getChoices(): {
        key: any;
        value: String
    }[] {
        return NeedForAttentionFilter.choices;
    }

    getCurrentChoice(): {
        key: any;
        value: String
    } {
        if (this.needForAttention=== undefined) {
            return NeedForAttentionFilter.defaultChoice
        }

        return NeedForAttentionFilter.choices.find((value) => {
            return value.key == this.needForAttention
        }) ?? NeedForAttentionFilter.defaultChoice
    }
}