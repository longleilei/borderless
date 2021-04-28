import React, {useState} from "react";
import { Dropdown } from "semantic-ui-react";

//  buggy css, should be deleted
// import "semantic-ui-css/semantic.min.css";

const countryOptions = [
    { key: "cn", value: "cn", flag: "cn", text: "RMB" },
    { key: "eu", value: "eu", flag: "eu", text: "EUR" },
    { key: "hk", value: "hk", flag: "hk", text: "HKD" },
    { key: "sg", value: "sg", flag: "sg", text: "SGD" },
    { key: "th", value: "th", flag: "th", text: "THB" },
    { key: "us", value: "us", flag: "us", text: "USD" },
    { key: "us", value: "us", flag: "us", text: "USD" },
    { key: "ua", value: "ua", flag: "ua", text: "UAH" },
    { key: "hkdcoin", value: "hkdcoin", flag: "hk", text: "HKD Coin" },
];

const CurrencyDropdown = ({setRegion}) => {
    const [value, setValue] = useState('')

    return (
        <Dropdown
            placeholder="Select Currency"
            search
            selection
            options={countryOptions}
            onChange={(e, {value}) => {
                setValue(value);
                setRegion(value);
            }}
            value={value}
        />
    )
}

export default CurrencyDropdown;
