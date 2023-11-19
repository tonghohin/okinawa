import { useOrderFormData, useSetOrderFormData } from "@/contexts/OrderFormContextProvider";
import { General } from "@/types/General";
import { Loader } from "@googlemaps/js-api-loader";
import { useEffect, useRef } from "react";

export default function AddressInput() {
    const inputRef = useRef<HTMLInputElement>(null);
    const orderFormData = useOrderFormData();
    const setOrderFormData = useSetOrderFormData();

    const loader = new Loader({
        apiKey: process.env.NEXT_PUBLIC_GOOGLE_API_KEY || "",
        version: "weekly",
        libraries: ["places"],
        region: "HK",
        language: "zh-HK"
    });

    const options: google.maps.places.AutocompleteOptions = {
        bounds: {
            north: 22.583333,
            south: 22.133333,
            west: 113.816667,
            east: 114.516667
        },
        componentRestrictions: { country: "HK" },
        fields: ["address_components"],
        strictBounds: false
    };

    function getAddress(addressComponents: google.maps.GeocoderAddressComponent[]) {
        const address: General.Address = {
            region: "hongKongIsland",
            district: "",
            street: "",
            building: "",
            floor: "",
            flat: ""
        };

        for (const component of addressComponents) {
            const componentType = component.types[0];

            switch (componentType) {
                case "street_number": {
                    address.street = address.street + ` ${component.long_name}`;
                    break;
                }

                case "premise": {
                    address.building = component.long_name;
                    break;
                }

                case "route": {
                    address.street += ` ${component.long_name}`;
                    break;
                }

                case "neighborhood": {
                    address.district = component.long_name;
                    break;
                }

                case "administrative_area_level_1": {
                    if (component.long_name === "Hong Kong Island") {
                        address.region = "hongKongIsland";
                    } else if (component.long_name === "Kowloon") {
                        address.region = "kowloon";
                    } else if (component.long_name === "New Territories") {
                        address.region = "newTerritories";
                    }
                    break;
                }
            }
        }

        return address;
    }

    useEffect(() => {
        (async () => {
            if (inputRef.current) {
                inputRef.current.addEventListener("keypress", (event) => {
                    if (event.key === "Enter") {
                        event.preventDefault();
                    }
                });

                const googlePlaces = await loader.importLibrary("places");
                const autocomplete = new googlePlaces.Autocomplete(inputRef.current, options);
                autocomplete.addListener("place_changed", () => {
                    const place = autocomplete.getPlace();
                    const addressComponents = place.address_components;
                    console.log("autocomplete.addListener --- addressComponents", addressComponents);

                    if (setOrderFormData && addressComponents) {
                        setOrderFormData((prevOrderFormData) => ({ ...prevOrderFormData, address: getAddress(addressComponents) }));
                    }
                });
            }
        })();
    }, []);

    function handleAddressChange(event: React.ChangeEvent<HTMLInputElement>) {
        if (setOrderFormData) {
            setOrderFormData((prevOrderFormData) => ({
                ...prevOrderFormData,
                address: {
                    ...prevOrderFormData.address,
                    [event.target.name]: event.target.value
                }
            }));
        }
    }

    function handleRegionChange(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
        const { name, value } = e.currentTarget;
        if (setOrderFormData) {
            setOrderFormData((prevOrderFormData) => ({ ...prevOrderFormData, address: { ...prevOrderFormData.address, [name]: value as General.Region } }));
        }
    }

    return (
        <>
            <div className="flex gap-2 flex-wrap">
                <div className="flex flex-col gap-2 flex-1">
                    <label htmlFor="floor">樓層</label>
                    <input type="text" id="floor" name="floor" required value={orderFormData?.address.floor} onChange={handleAddressChange} />
                </div>
                <div className="flex flex-col gap-2 flex-1">
                    <label htmlFor="unit">單位</label>
                    <input type="text" id="unit" name="unit" required value={orderFormData?.address.flat} onChange={handleAddressChange} />
                </div>
            </div>
            <div className="flex flex-col gap-2">
                <label htmlFor="building">大廈</label>
                <input ref={inputRef} type="text" id="building" name="building" required value={orderFormData?.address.building} onChange={handleAddressChange} />
            </div>
            <div className="flex flex-col gap-2">
                <label htmlFor="street">街道</label>
                <input type="text" id="street" name="street" required value={orderFormData?.address.street} onChange={handleAddressChange} />
            </div>
            <div className="flex flex-col gap-2">
                <label htmlFor="district">地區</label>
                <input type="text" id="district" name="district" required value={orderFormData?.address.district} onChange={handleAddressChange} />
            </div>
            <div className="flex gap-2">
                <button type="button" name="region" value="hongKongIsland" className={`rounded-full border border-yellow-500 px-6 py-2 hover:bg-yellow-500 transition-all ${orderFormData?.address.region === "hongKongIsland" && "bg-yellow-500"}`} onClick={handleRegionChange}>
                    {General.Regions.hongKongIsland}
                </button>
                <button type="button" name="region" value="kowloon" className={`rounded-full border border-yellow-500 px-6 py-2 hover:bg-yellow-500 transition-all ${orderFormData?.address.region === "kowloon" && "bg-yellow-500"}`} onClick={handleRegionChange}>
                    {General.Regions.kowloon}
                </button>
                <button type="button" name="region" value="newTerritories" className={`rounded-full border border-yellow-500 px-6 py-2 hover:bg-yellow-500 transition-all ${orderFormData?.address.region === "newTerritories" && "bg-yellow-500"}`} onClick={handleRegionChange}>
                    {General.Regions.newTerritories}
                </button>
            </div>
        </>
    );
}
