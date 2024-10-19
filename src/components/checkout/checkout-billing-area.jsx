import React, { useState, useEffect } from "react";
import ErrorMsg from "../common/error-msg";
import CustomDropdown from './custom-drop-down';

const stateCityData = {
  "Delhi": () => import("./states/Delhi.json"),
  "Madhya Pradesh": () => import("./states/MadhyaPradesh.json"),
  "Arunachal Pradesh": () => import("./states/Arunachal Pradesh.json"),
  "Haryana": () => import("./states/Haryana.json"),
  "Himachal Pradesh": () => import("./states/Himachal Pradesh.json"),
  "Uttar Pradesh": () => import("./states/Uttar Pradesh.json"),
  "Bihar": () => import("./states/Bihar.json"),
  "West Bengal": () => import("./states/West Bengal.json"),
  "Maharashtra": () => import("./states/Maharashtra.json"),
  "Tamil Nadu": () => import("./states/Tamil Nadu.json"),
  "Karnataka": () => import("./states/Karnataka.json"),
  "Gujarat": () => import("./states/Gujarat.json"),
  "Rajasthan": () => import("./states/Rajasthan.json"),
  "Kerala": () => import("./states/Kerala.json"),
  "Telangana": () => import("./states/Telangana.json"),
  "Andhra Pradesh": () => import("./states/Andhra Pradesh.json"),
  "Odisha": () => import("./states/Odisha.json"),
  "Punjab": () => import("./states/Punjab.json"),
  "Chhattisgarh": () => import("./states/Chhattisgarh.json"),
  "Uttarakhand": () => import("./states/Uttarakhand.json"),
  "Jharkhand": () => import("./states/Jharkhand.json"),
};

const CheckoutBillingArea = ({ register, errors, setError, watch, user, selectedAddress, setSelectedAddress }) => {
  const [addresses, setAddresses] = useState([]);
  const [selectedState, setSelectedState] = useState("");
  const [districts, setDistricts] = useState([]);
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [subDistricts, setSubDistricts] = useState([]);
  const [villages, setVillages] = useState([]);

  useEffect(() => {
    // Fetch user's addresses here
    // For now, let's use a dummy address
    setAddresses([
      {
        id: 1,
        firstName: user?.firstName,
        lastName: user?.lastName,
        address: "123 Main St",
        city: "Example City",
        state: "Example State",
        country: "India",
        zipCode: "12345",
        contactNo: "1234567890",
        email: user?.email
      }
    ]);
  }, [user]);

  const handleAddressSelect = (address) => {
    setSelectedAddress(address);
  };

  const handleStateChange = async (state) => {
    setSelectedState(state);
    if (stateCityData[state]) {
      const data = await stateCityData[state]();
      setDistricts(data.districts || []);
      setSubDistricts([]);
      setVillages([]);
    } else {
      setDistricts([]);
      setSubDistricts([]);
      setVillages([]);
    }
  };

  const handleDistrictChange = (district) => {
    setSelectedDistrict(district);
    const selectedDistrictData = districts.find(d => d.district === district);
    setSubDistricts(selectedDistrictData ? selectedDistrictData.subDistricts : []);
    setVillages([]);
  };

  const handleSubDistrictChange = (subDistrict) => {
    const selectedSubDistrictData = subDistricts.find(sd => sd.subDistrict === subDistrict);
    setVillages(selectedSubDistrictData ? selectedSubDistrictData.villages : []);
  };

  // Log form values on change
  useEffect(() => {
    const subscription = watch((value, { name, type }) => console.log(value, name, type));
    return () => subscription.unsubscribe();
  }, [watch]);

  return (
    <div className="tp-checkout-bill-area">
      <h3 className="tp-checkout-bill-title">Billing Details</h3>

      <div className="tp-checkout-bill-form">
        <div className="tp-checkout-bill-inner">
          <div className="row">
            <div className="col-md-6">
              <div className="tp-checkout-input">
                <label>First Name <span>*</span></label>
                <input
                  {...register("firstName", { required: "First Name is required!" })}
                  type="text"
                  placeholder="First Name"
                  defaultValue={selectedAddress?.firstName || user?.firstName}
                />
                <ErrorMsg msg={errors?.firstName?.message} />
              </div>
            </div>
            <div className="col-md-6">
              <div className="tp-checkout-input">
                <label>Last Name <span>*</span></label>
                <input
                  {...register("lastName", { required: "Last Name is required!" })}
                  type="text"
                  placeholder="Last Name"
                  defaultValue={selectedAddress?.lastName || user?.lastName}
                />
                <ErrorMsg msg={errors?.lastName?.message} />
              </div>
            </div>
            <div className="col-md-12">
              <div className="tp-checkout-input">
                <label>Street address <span>*</span></label>
                <input
                  {...register("address", { required: "Address is required!" })}
                  type="text"
                  placeholder="House number and street name"
                  defaultValue={selectedAddress?.address}
                />
                <ErrorMsg msg={errors?.address?.message} />
              </div>
            </div>
            <div className="col-md-6">
              <CustomDropdown
                options={Object.keys(stateCityData)}
                label="State"
                onChange={(value) => {
                  handleStateChange(value);
                  register("state").onChange({ target: { value: value, name: "state" } });
                }}
                register={register}
                name="state"
                value={selectedState}
              />
              <ErrorMsg msg={errors?.state?.message} />
            </div>
            <div className="col-md-6">
              <CustomDropdown
                options={districts.map(d => d.district)}
                label="City"
                onChange={(value) => {
                  handleDistrictChange(value);
                  register("city").onChange({ target: { value: value, name: "city" } });
                }}
                register={register}
                name="city"
                value={selectedDistrict}
              />
              <ErrorMsg msg={errors?.city?.message} />
            </div>
            {selectedDistrict && (
              <div className="col-md-6">
                <CustomDropdown
                  options={subDistricts.map(sd => sd.subDistrict)}
                  label="Sub-District"
                  onChange={(value) => {
                    handleSubDistrictChange(value);
                    register("subDistrict").onChange({ target: { value: value, name: "subDistrict" } });
                  }}
                  register={register}
                  name="subDistrict"
                />
              </div>
            )}
            {villages.length > 0 && (
              <div className="col-md-6">
                <CustomDropdown
                  options={villages}
                  label="Village (Optional)"
                  onChange={(value) => {
                    register("village").onChange({ target: { value: value, name: "village" } });
                  }}
                  register={register}
                  name="village"
                />
              </div>
            )}
            <div className="col-md-6">
              <div className="tp-checkout-input">
                <label>Postcode ZIP <span>*</span></label>
                <input
                  {...register("zipCode", { required: "Zip Code is required!" })}
                  type="text"
                  placeholder="Postcode ZIP"
                  defaultValue={selectedAddress?.zipCode}
                />
                <ErrorMsg msg={errors?.zipCode?.message} />
              </div>
            </div>
            <div className="col-md-6">
              <div className="tp-checkout-input">
                <label>Phone <span>*</span></label>
                <input
                  {...register("contactNo", { required: "Contact Number is required!" })}
                  type="text"
                  placeholder="Phone"
                  defaultValue={selectedAddress?.contactNo}
                />
                <ErrorMsg msg={errors?.contactNo?.message} />
              </div>
            </div>
            <div className="col-md-12">
              <div className="tp-checkout-input">
                <label>Email address <span>*</span></label>
                <input
                  {...register("email", { required: "Email is required!" })}
                  type="email"
                  placeholder="Email"
                  defaultValue={selectedAddress?.email || user?.email}
                />
                <ErrorMsg msg={errors?.email?.message} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutBillingArea;