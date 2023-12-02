import InputContainer from "@/components/InputContainer";
import ToggleButton from "@/components/ToggleButton";
import { General } from "@/schemas/General";
import useOrderFormDataStore from "@/stores/orderFormDataStore";
import { Loader } from "@googlemaps/js-api-loader";
import { useEffect, useRef } from "react";

export default function AddressInput() {
    const inputRef = useRef<HTMLInputElement>(null);
    const orderFormData = useOrderFormDataStore((state) => state.formData);
    const updateWholeAddress = useOrderFormDataStore((state) => state.updateWholeAddress);
    const updateAddress = useOrderFormDataStore((state) => state.updateAddress);
    const updateAddressRegion = useOrderFormDataStore((state) => state.updateAddressRegion);

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
        fields: ["address_components", "name"],
        strictBounds: false
    };

    function getAddress(addressComponents: google.maps.GeocoderAddressComponent[], addressName: string) {
        const address = General.Address.State;

        for (const component of addressComponents) {
            const componentType = component.types[0];

            switch (componentType) {
                case "subpremise": {
                    address.floor = component.long_name;
                    break;
                }

                case "premise": {
                    address.building = component.long_name;
                    break;
                }

                case "street_number": {
                    address.street = component.long_name;
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
                    if (component.long_name === "香港島") {
                        address.region = component.long_name;
                    } else if (component.long_name === "九龍") {
                        address.region = component.long_name;
                    } else if (component.long_name === "新界") {
                        address.region = component.long_name;
                    }
                    break;
                }
            }
        }

        if (addressName && !address.building?.includes(addressName) && !address.street?.includes(addressName)) {
            address.building = `${addressName} ${address.building}`;
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
                    const addressComponents = place.address_components || [];
                    const addressName = place.name || "";
                    updateWholeAddress(getAddress(addressComponents, addressName));
                });
            }
        })();
    }, []);

    return (
        <>
            <div className="flex gap-4 flex-wrap">
                <InputContainer>
                    <label htmlFor="floor">樓層</label>
                    <input type="text" id="floor" name="floor" required value={orderFormData.address?.floor || ""} onChange={updateAddress} />
                </InputContainer>
                <InputContainer>
                    <label htmlFor="flat">單位</label>
                    <input type="text" id="flat" name="flat" required value={orderFormData.address?.flat || ""} onChange={updateAddress} />
                </InputContainer>
            </div>
            <InputContainer>
                <label htmlFor="building">大廈</label>
                <input ref={inputRef} type="text" id="building" name="building" required value={orderFormData.address?.building || ""} onChange={updateAddress} />
            </InputContainer>
            <InputContainer>
                <label htmlFor="street">街道</label>
                <input type="text" id="street" name="street" required value={orderFormData.address?.street || ""} onChange={updateAddress} />
            </InputContainer>
            <InputContainer>
                <label htmlFor="district">地區</label>
                <input type="text" id="district" name="district" required value={orderFormData.address?.district} onChange={updateAddress} />
            </InputContainer>
            <div className="flex gap-4">
                <ToggleButton on={orderFormData.address?.region === "香港島"} onClick={() => updateAddressRegion("香港島")}>
                    香港島
                </ToggleButton>
                <ToggleButton on={orderFormData.address?.region === "九龍"} onClick={() => updateAddressRegion("九龍")}>
                    九龍
                </ToggleButton>
                <ToggleButton on={orderFormData.address?.region === "新界"} onClick={() => updateAddressRegion("新界")}>
                    新界
                </ToggleButton>
            </div>
        </>
    );
}
