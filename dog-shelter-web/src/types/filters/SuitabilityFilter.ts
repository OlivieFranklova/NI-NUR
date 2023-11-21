import {Filter} from "@/types/filters/Filter";
import {Dog} from "@/types/Dog";
import {StaticImageData} from "next/image";


export class SuitabilityFilter implements Filter {
    suitableForEveryone: Boolean = true

    static filterName = "Vhodný pro"
    static choices = [
        {
            key: true,
            value: {name:"Pro všechny",icon_src:undefined}
        }, {
            key: false,
            value: {name:"Pro zkušené",icon_src:undefined}
        }
    ]
    static defaultChoice = SuitabilityFilter.choices[0]

    constructor(suitableForEveryone: Boolean = true) {
        this.suitableForEveryone = suitableForEveryone;
    }

    apply(dogs: Dog[]): Dog[] {
        if (!this.suitableForEveryone) {
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

    getChoices(): { key: any; value: { name: String, icon_src: StaticImageData| undefined } }[] {
        return SuitabilityFilter.choices;
    }

    getCurrentChoice(): {
        key: any;
        value: { name: String, icon_src: StaticImageData| undefined }
    } {
        return SuitabilityFilter.choices.find((value) => {
            return value.key == this.suitableForEveryone
        }) ?? SuitabilityFilter.defaultChoice
    }
}