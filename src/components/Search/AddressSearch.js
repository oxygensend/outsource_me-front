import {Search} from "./Search";
import {Select} from "../Input/Select";
import authAxios from "../../services/authAxios";
import {useState} from "react";
import {API_URL} from "../../config";

export const AddressSearch = ({register, address}) => {

    const postalCodeFormApi = address ? address.postCodes.split(',')[0] : '';
    const [postalCode, setPostalCode] = useState(postalCodeFormApi);
    const [foundAddress, setFoundAddress] = useState(address ? [address] : []);
    const [postalCodeError, setPostalCodeError] = useState();


    const onChangeHandler = async (event) => {

        const search = event.target.value;

        setPostalCode(search);

        if (search === '') {
            setFoundAddress([]);
            return;
        }

        authAxios.get(API_URL + '/addresses?search=' + search).then((response) => {
            setPostalCodeError(null);
            setFoundAddress(response.data['hydra:member'])
        }).catch((e) => {
            setFoundAddress([]);
            setPostalCodeError("Podany kod pocztowy jest niepoprawny");
        });


    }
    return (
        <div>
            <label className={"input-label"}>Kod pocztowy</label>

            <Search
                search={postalCode}
                onChangeHandler={onChangeHandler}
                placeholder={"Podaj kod pocztowy"}
            />
            <span
                className={"font-medium tracking-wide ml-1 text-red-500 text-xs relative bottom-1 "}>
                {postalCodeError ?? postalCodeError}
                    </span>
            {foundAddress.length > 0 ?
                <Select
                    name={"address"}
                    label={"Miejscowość"}
                    register={register}
                    options={foundAddress}
                    property={"city"}
                />
                : null}

        </div>
    );
}