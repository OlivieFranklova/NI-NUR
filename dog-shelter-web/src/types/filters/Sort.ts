import {Dog, SizeEnum} from "@/types/Dog";
import {Filter} from "@/types/filters/Filter";

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
    static defaultChoice = { key: undefined, value: Sort.filterName }
    static choices = [
        {
            key: SortField.Size,
            value: "Od nejmenšího"
        }, {
            key: SortField.SizeReversed,
            value: "Od největšího"
        }, {
            key: SortField.Suitability,
            value: "Náročnost (vzestupně)"
        }, {
            key: SortField.SuitabilityReversed,
            value: "Náročnost (sestupně)"
        }, {
            key: SortField.NeedForAttention,
            value: "Potřeba venčení (vzestupně)"
        }, {
            key: SortField.NeedForAttentionReversed,
            value: "Potřeba venčení (sestupně)"
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

    getCurrentChoice(): { key: any, value: String } {
        if (this.sortField === undefined) {
            return Sort.defaultChoice
        }

        return Sort.choices.find((value) => {
            return value.key == this.sortField
        }) ?? Sort.defaultChoice
    }

    filterName(): String {
        return Sort.filterName
    }

    getChoices(): { key: any; value: String }[] {
        return Sort.choices
    }
}
