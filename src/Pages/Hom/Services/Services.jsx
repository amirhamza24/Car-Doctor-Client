import { useEffect, useRef, useState } from "react";
import ServiceCard from "./ServiceCard";

const Services = () => {

    const [services, setServices] = useState([]);
    const [asc, setAsc] = useState(true);
    const searchRef = useRef(null);
    const [search, setSearch] = useState('')

    useEffect( () => {
        fetch(`http://localhost:5000/services?search=${search}&sort=${asc ? 'asc' : 'desc'}`)
        .then(res => res.json())
        .then(data => setServices(data))
    }, [asc, search])

    const handleSearch = () => {
        console.log(searchRef.current.value);
        setSearch(searchRef.current.value);
    }


    return (
        <div className="mt-4">
            <div className="text-center space-y-3">
                <h3 className="text-2xl text-orange-600 font-bold">Services</h3>
                <h3 className="text-5xl font-semibold">Our Service Area</h3>

                <p className="text-gray-500">
                    The majority have suffered alteration in some form, by
                    injected humour, or randomised <br /> words which do not look even
                    slightly believable.
                </p>

                <div className="text-left">
                    <input type="text" ref={searchRef} name="search" id="" className="border px-3 py-1" />
                    <input onClick={handleSearch} type="submit" value="Search" className="btn btn-primary" />
                </div>

                <button className="btn btn-primary" onClick={() => setAsc(!asc)}>
                    { asc ? "Price High to Low" : "Price Low to High" }
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {
                    services.map(service => <ServiceCard
                        key={service._id}
                        service={service}
                    ></ServiceCard>)
                }
            </div>
        </div>
    );
};

export default Services;
