import React from "react";
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
];

const CurrencyDropdown = () => (
    <Dropdown
        placeholder="Select Currency"
        search
        selection
        options={countryOptions}
    />
);

export default CurrencyDropdown;
