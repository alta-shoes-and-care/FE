import React from "react";
import Image from "next/image";
import Service from "../../components/Service";

export default function services() {

    return (
        <section>
            <div ClassName="grid grid-cols-1">
                Service Detail
            </div>
            <div>
                <Service />
            </div>
        </section>
    );
}
