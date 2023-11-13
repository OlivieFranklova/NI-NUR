import {Dog, SizeEnum} from "@/types/Dog";
import {Filter} from "@/types/filters/Filter";

export class SizeFilter implements Filter {
    size?: SizeEnum = undefined

    constructor(size?: SizeEnum) {
        this.size = size
    }

    static filterName = "Velikost"
    static defaultChoice = { key: undefined, value: SizeFilter.filterName }
    static choices = [
        {
            key: SizeEnum.Small,
            value: "Malá"
        }, {
            key: SizeEnum.Medium,
            value: "Střední"
        }, {
            key: SizeEnum.Large,
            value: "Velká"
        }
    ]

    apply(dogs: Dog[]): Dog[] {
        if (this.size === undefined) {
            return dogs
        }

        return dogs.filter((value: Dog) => {
            return value.size == this.size
        })
    }

    copy(value: any): Filter {
        if (typeof value !== "number") {
            throw new Error("Value is not a number.")
        }

        return new SizeFilter(value)
    }

    getCurrentChoice(): { key: any, value: String } {
        if (this.size === undefined) {
            return SizeFilter.defaultChoice
        }

        return SizeFilter.choices.find((value) => {
            return value.key == this.size
        }) ?? SizeFilter.defaultChoice
    }

    filterName(): String {
        return SizeFilter.filterName
    }

    getChoices(): { key: any; value: String }[] {
        return SizeFilter.choices
    }
}
