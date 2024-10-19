import React, { useState, useEffect } from "react";
import ErrorMsg from "../common/error-msg";
import CustomDropdown from "./CustomDropdown";

const stateCityData = {
  "Delhi": () => import("./states/Delhi.json"),
  "Madhya Pradesh": () => import("./states/MadhyaPradesh.json"),
  "Arunachal Pradesh": () => import("./states/Arunachal Pradesh.json"),
  "Haryana": () => import("./states/Haryana.json"),
  "Himachal Pradesh": () => import("./states/Himachal Pradesh.json"),
  // Add other states here
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

  return (
    <div className="tp-checkout-bill-area">
      <h3 className="tp-checkout-bill-title">Billing Details</h3>

      <div className="tp-checkout-bill-form">
        <div className="tp-checkout-bill-inner">
          {addresses.length > 0 && (
            <div className="mb-3">
              <h4>Select an existing address:</h4>
              {addresses.map((address) => (
                <div key={address.id} className="form-check">
                  <input
                    type="radio"
                    id={`address-${address.id}`}
                    name="selectedAddress"
                    className="form-check-input"
                    onChange={() => handleAddressSelect(address)}
                  />
                  <label htmlFor={`address-${address.id}`} className="form-check-label">
                    {address.address}, {address.city}, {address.state}, {address.zipCode}
                  </label>
                </div>
              ))}
            </div>
          )}

          <h4>Or enter a new address:</h4>
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
                <label>Country <span>*</span></label>
                <input
                  {...register("country", { required: "Country is required!" })}
                  type="text"
                  placeholder="India"
                  defaultValue={selectedAddress?.country || "India"}
                />
                <ErrorMsg msg={errors?.country?.message} />
              </div>
            </div>
            <div className="col-md-12">
              <div className="tp-checkout-input">
                <label>Street address</label>
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
                onChange={handleStateChange}
                register={register}
                name="state"
              />
              <ErrorMsg msg={errors?.state?.message} />
            </div>
            <div className="col-md-6">
              <CustomDropdown
                options={districts.map(d => d.district)}
                label="City"
                onChange={handleDistrictChange}
                register={register}
                name="city"
              />
              <ErrorMsg msg={errors?.city?.message} />
            </div>
            {selectedDistrict && (
              <div className="col-md-6">
                <CustomDropdown
                  options={subDistricts.map(sd => sd.subDistrict)}
                  label="Sub-District"
                  onChange={handleSubDistrictChange}
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
                  onChange={() => {}}
                  register={register}
                  name="village"
                />
              </div>
            )}
            <div className="col-md-6">
              <div className="tp-checkout-input">
                <label>Postcode ZIP</label>
                <input
                  {...register("zipCode", { required: "Zip Code is required!" })}
                  type="text"
                  placeholder="Postcode ZIP"
                  defaultValue={selectedAddress?.zipCode}
                />
                <ErrorMsg msg={errors?.zipCode?.message} />
              </div>
            </div>
            <div className="col-md-12">
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
            <div className="col-md-12">
              <div className="tp-checkout-input">
                <label>Order notes (optional)</label>
                <textarea
                  {...register("orderNote", { required: false })}
                  placeholder="Notes about your order, e.g. special notes for delivery."
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutBillingArea;