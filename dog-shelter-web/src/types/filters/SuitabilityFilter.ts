import {Filter} from "@/types/filters/Filter";
import {Dog} from "@/types/Dog";


export class SuitabilityFilter implements Filter {
    suitableForEveryone: Boolean = true

    static filterName = "Vhodný pro"
    static choices = [
        {
            key: true,
            value: "Pro všechny"
        }, {
            key: false,
            value: "Pro náročné"
        }
    ]
    static defaultChoice = SuitabilityFilter.choices[0]

    constructor(suitableForEveryone: Boolean = true) {
        this.suitableForEveryone = suitableForEveryone;
    }

    apply(dogs: Dog[]): Dog[] {
        if (this.suitableForEveryone) {
            return dogs
        }

        return dogs.filter((dog) => {
            return dog.suitableForEveryone == this.suitableForEveryone
        })
    }

    copy(value: any): Filter {
        if (value === undefined) {
            return new SuitabilityFilter()
        }

        return new SuitabilityFilter(!!value);
    }

    filterName(): String {
        return SuitabilityFilter.filterName;
    }

    getChoices(): { key: any; value: String }[] {
        return SuitabilityFilter.choices;
    }

    getCurrentChoice(): {
        key: any;
        value: String
    } {
        return SuitabilityFilter.choices.find((value) => {
            return value.key == this.suitableForEveryone
        }) ?? SuitabilityFilter.defaultChoice
    }
}