import {Dog, SizeEnum} from "@/types/Dog";
import {Filter} from "@/types/filters/Filter";
import {StaticImageData} from "next/image";

export enum SortField {
    Size,
    SizeReversed,
    Suitability,
    SuitabilityReversed,
    NeedForAttention,
    NeedForAttentionReversed
}

const reversedSorts = [
    SortField.SizeReversed,
    SortField.SuitabilityReversed,
    SortField.NeedForAttentionReversed
]

export class Sort implements Filter {
    sortField?: SortField = undefined

    constructor(sortField?: SortField) {
        this.sortField = sortField
    }

    static filterName = "Seřadit"
    static defaultChoice = { key: undefined, value: {name:Sort.filterName,icon_src:undefined} }
    static choices = [
        {
            key: SortField.Size,
            value: {name:"Od nejmenšího",icon_src:undefined}
}, {
            key: SortField.SizeReversed,
            value: {name:"Od největšího",icon_src:undefined}
}, {
            key: SortField.Suitability,
            value: {name:"Náročnost (vzestupně)",icon_src:undefined}
}, {
            key: SortField.SuitabilityReversed,
            value: {name:"Náročnost (sestupně)",icon_src:undefined}
}, {
            key: SortField.NeedForAttention,
            value: {name:"Potřeba venčení (vzestupně)",icon_src:undefined}
}, {
            key: SortField.NeedForAttentionReversed,
            value: {name:"Potřeba venčení (sestupně)",icon_src:undefined}
}
    ]

    apply(dogs: Dog[]): Dog[] {
        if (this.sortField === undefined) {
            return dogs
        }

        let sortedDogs: Dog[] = []

        switch (this.sortField) {
            case SortField.Size:
            case SortField.SizeReversed:
                sortedDogs = dogs.sort((lhs, rhs) => {
                    return lhs.size - rhs.size
                })
                break
            case SortField.Suitability:
            case SortField.SuitabilityReversed:
                sortedDogs = dogs.sort((lhs, rhs) => {
                    if (lhs.suitableForEveryone && !rhs.suitableForEveryone) return -1
                    if (!lhs.suitableForEveryone && rhs.suitableForEveryone) return 1
                    return 0
                })
                break
            case SortField.NeedForAttention:
            case SortField.NeedForAttentionReversed:
                sortedDogs = dogs.sort((lhs, rhs) => {
                    if (lhs.needForAttention < rhs.needForAttention) return -1
                    if (lhs.needForAttention > rhs.needForAttention) return 1
                    return 0
                })
                break
            default:
                throw new Error("Unknown SortField type.")
        }

        if (reversedSorts.includes(this.sortField)) {
            sortedDogs = sortedDogs.reverse()
        }

        return sortedDogs
    }

    copy(value: any): Filter {
        if (value !== undefined && typeof value !== "number") {
            throw new Error("Value is not a number.")
        }

        return new Sort(value)
    }

    getCurrentChoice(): { key: any, value: {name:string, icon_src:StaticImageData| undefined} } {
        if (this.sortField === undefined) {
            return Sort.defaultChoice
        }

        return Sort.choices.find((value) => {
            return value.key == this.sortField
        }) ?? Sort.defaultChoice
    }

    filterName(): string {
        return Sort.filterName
    }

    getChoices(): { key: any; value: {name:string, icon_src:StaticImageData| undefined} }[] {
        return Sort.choices
    }
    resetFilter(): void {
        this.sortField= undefined;
    }
}
