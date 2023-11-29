import {Dog, SizeEnum} from "@/types/Dog";
import {Filter} from "@/types/filters/Filter";

import small_size from '@/resources/icons/small.png';
import medium_size from '@/resources/icons/medium.png';
import large_size from '@/resources/icons/big.png';
import {StaticImageData} from "next/image";

export class SizeFilter implements Filter {
    size?: SizeEnum = undefined

    constructor(size?: SizeEnum) {
        this.size = size
    }

    static filterName = "Velikost"
    static defaultChoice = {key: undefined, value: {name: SizeFilter.filterName, icon_src: small_size}}
    static choices = [
        {
            key: SizeEnum.Small,
            value: {
                name: "Malá",
                icon_src: small_size,
            }
        }, {
            key: SizeEnum.Medium,
            value: {
                name: "Střední",
                icon_src: medium_size,
            }
        }, {
            key: SizeEnum.Large,
            value: {
                name: "Velká",
                icon_src: large_size,
            }
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
        if (value !== undefined && typeof value !== "number") {
            throw new Error("Value is not a number.")
        }

        return new SizeFilter(value)
    }

    getCurrentChoice(): { key: any, value: { name: string, icon_src: StaticImageData| undefined } } {
        if (this.size === undefined) {
            return SizeFilter.defaultChoice
        }

        return SizeFilter.choices.find((choice) => {
            return choice.key == this.size
        }) ?? SizeFilter.defaultChoice
    }

    filterName(): string {
        return SizeFilter.filterName
    }

    getChoices(): { key: any; value: { name: string, icon_src: StaticImageData| undefined } }[] {
        return SizeFilter.choices
    }
    resetFilter(): void {
        this.size= undefined;
    }
}
