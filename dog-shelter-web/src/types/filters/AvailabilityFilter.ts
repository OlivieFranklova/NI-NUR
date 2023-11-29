import {Filter} from "@/types/filters/Filter";
import {Dog} from "@/types/Dog";
import {StaticImageData} from "next/image";


export class AvailabilityFilter implements Filter {
    availability?: Date = undefined

    constructor(availability?: Date) {
        this.availability = availability;
    }

    static filterName = "Kdy je dostupný"
    static defaultChoice = { key: undefined, value: {name:AvailabilityFilter.filterName,icon_src:undefined} }

    static dateFormatter = new Intl.DateTimeFormat('cs-CZ', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    })

    apply(dogs: Dog[]): Dog[] {
        if (this.availability === undefined) {
            return dogs
        }

        return dogs.filter((value: Dog) => {
            return value
                .availability
                .map((d) => d.getTime())
                .includes(this.availability!.getTime())
        })
    }

    copy(value: any): Filter {
        if (value !== undefined && !(value instanceof Date)) {
            throw new Error("Value is not a number.")
        }

        return new AvailabilityFilter(value)
    }

    filterName(): string {
        return AvailabilityFilter.filterName;
    }

    getChoices(): {
        key: any;
        value: {name:string, icon_src:StaticImageData| undefined}
    }[] {
        return [];
    }

    getCurrentChoice(): {
        key: any;
        value: {name:string, icon_src:StaticImageData| undefined}
    } {
        if (this.availability === undefined) {
            return AvailabilityFilter.defaultChoice
        }

        const date = AvailabilityFilter.dateFormatter.format(this.availability)
        return { key: date, value: {name:date,icon_src:undefined} }
    }
    resetFilter(): void {
        this.availability= undefined;
    }
}