"use client"

import { getEldersPicture } from "../actions/getEldersPicture";
import { getElders } from "@/lib/actions";

export default function MomentType(props: { label: string, moments: Array<{ label: string, value: string }>, onChange: (moment: string) => void }) {

    const momentChanged = (e: any) => {
        props.onChange(e.target.value)
    }
    return (
        <div>
            <label>{props.label} </label><br></br><br></br>
            <select className="border-2 border-solid rounded-sm" onChange={momentChanged}>
                {props.moments.map((option) => (
                    <option key={option.value} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </select>
        </div>
    );
}