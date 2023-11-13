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
        // TODO
        throw Error("Not implemented")
    }

    copy(value: any): Filter {
        if (typeof value !== "number") {
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
