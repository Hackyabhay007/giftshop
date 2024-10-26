import React, { useState, useEffect } from "react";
import ErrorMsg from "../common/error-msg";
import CustomDropdown from './custom-drop-down';

const stateCityData = {
  // States
  "Andhra Pradesh": () => import("./states/Andhra Pradesh.json"),
  "Arunachal Pradesh": () => import("./states/Arunachal Pradesh.json"),
  "Assam": () => import("./states/Assam.json"),
  "Bihar": () => import("./states/Bihar.json"),
  "Chhattisgarh": () => import("./states/Chhattisgarh.json"),
  "Goa": () => import("./states/Goa.json"),
  "Gujarat": () => import("./states/Gujarat.json"),
  "Haryana": () => import("./states/Haryana.json"),
  "Himachal Pradesh": () => import("./states/Himachal Pradesh.json"),
  "Jammu & Kashmir": () => import("./states/Jammu & Kashmir.json"),
  "Jharkhand": () => import("./states/Jharkhand.json"),
  "Karnataka": () => import("./states/Karnataka.json"),
  "Kerala": () => import("./states/Kerala.json"),
  "Madhya Pradesh": () => import("./states/MadhyaPradesh.json"),
  "Maharashtra": () => import("./states/Maharashtra.json"),
  "Manipur": () => import("./states/Manipur.json"),
  "Meghalaya": () => import("./states/Meghalaya.json"),
  "Mizoram": () => import("./states/Mizoram.json"),
  "Nagaland": () => import("./states/Nagaland.json"),
  "Odisha": () => import("./states/Odisha.json"),
  "Punjab": () => import("./states/Punjab.json"),
  "Rajasthan": () => import("./states/Rajasthan.json"),
  "Sikkim": () => import("./states/Sikkim.json"),
  "Tamil Nadu": () => import("./states/Tamil Nadu.json"),
  "Telangana": () => import("./states/Telangana.json"),
  "Tripura": () => import("./states/Tripura.json"),
  "Uttar Pradesh": () => import("./states/Uttar Pradesh.json"),
  "Uttarakhand": () => import("./states/Uttarakhand.json"),
  "West Bengal": () => import("./states/West Bengal.json"),

  // Union Territories
  "Andaman & Nicobar Islands": () => import("./states/Andaman & Nicobar Islands.json"),
  "Chandigarh": () => import("./states/Chandigarh.json"),
  "Dadra & Nagar Haveli": () => import("./states/Dadra & Nagar Haveli.json"),
  "Daman & Diu": () => import("./states/Daman & Diu.json"),
  "Delhi": () => import("./states/Delhi.json"),
  "Lakshadweep": () => import("./states/Lakshadweep.json"),
  "Puducherry": () => import("./states/Puducherry.json")
};


const CheckoutBillingArea = ({ 
  register, 
  errors, 
  setError, 
  watch, 
  user, 
  selectedAddress, 
  setSelectedAddress,
  setValue, // Add this prop from react-hook-form
  reset    // Add this prop from react-hook-form
}) => {
  const [addresses, setAddresses] = useState([]);
  const [selectedState, setSelectedState] = useState(selectedAddress?.state || "");
  const [districts, setDistricts] = useState([]);
  const [selectedDistrict, setSelectedDistrict] = useState(selectedAddress?.city || "");
  const [subDistricts, setSubDistricts] = useState([]);
  const [villages, setVillages] = useState([]);

  // Initialize form with user data
  useEffect(() => {
    if (user || selectedAddress) {
      const initialData = {
        firstName: selectedAddress?.firstName || user?.firstName || '',
        lastName: selectedAddress?.lastName || user?.lastName || '',
        address: selectedAddress?.address || '',
        state: selectedAddress?.state || '',
        city: selectedAddress?.city || '',
        subDistrict: selectedAddress?.subDistrict || '',
        village: selectedAddress?.village || '',
        zipCode: selectedAddress?.zipCode || '',
        contactNo: selectedAddress?.contactNo || '',
        email: selectedAddress?.email || user?.email || ''
      };

      Object.entries(initialData).forEach(([field, value]) => {
        setValue(field, value);
      });
    }
  }, [user, selectedAddress, setValue]);

  // Load state data when selected state changes
  useEffect(() => {
    if (selectedAddress?.state) {
      handleStateChange(selectedAddress.state);
    }
  }, [selectedAddress]);

  const handleStateChange = async (state) => {
    setSelectedState(state);
    setValue('state', state);
    setValue('city', '');
    setValue('subDistrict', '');
    setValue('village', '');
    
    if (stateCityData[state]) {
      try {
        const data = await stateCityData[state]();
        setDistricts(data.districts || []);
        setSubDistricts([]);
        setVillages([]);
      } catch (error) {
        console.error("Error loading state data:", error);
        setDistricts([]);
      }
    } else {
      setDistricts([]);
      setSubDistricts([]);
      setVillages([]);
    }
  };

  const handleDistrictChange = (district) => {
    setSelectedDistrict(district);
    setValue('city', district);
    setValue('subDistrict', '');
    setValue('village', '');
    
    const selectedDistrictData = districts.find(d => d.district === district);
    setSubDistricts(selectedDistrictData ? selectedDistrictData.subDistricts : []);
    setVillages([]);
  };

  const handleSubDistrictChange = (subDistrict) => {
    setValue('subDistrict', subDistrict);
    setValue('village', '');
    
    const selectedSubDistrictData = subDistricts.find(sd => sd.subDistrict === subDistrict);
    setVillages(selectedSubDistrictData ? selectedSubDistrictData.villages : []);
  };

  const handleClearForm = () => {
    // Reset all form fields
    reset({
      firstName: '',
      lastName: '',
      address: '',
      state: '',
      city: '',
      subDistrict: '',
      village: '',
      zipCode: '',
      contactNo: '',
      email: ''
    });

    // Reset all state variables
    setSelectedState("");
    setSelectedDistrict("");
    setDistricts([]);
    setSubDistricts([]);
    setVillages([]);
    setSelectedAddress(null);
  };

  return (
    <div className="tp-checkout-bill-area">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h3 className="tp-checkout-bill-title">Billing Details</h3>
        <button 
          type="button"
          onClick={handleClearForm}
          className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors"
        >
          Clear Form
        </button>
      </div>

      <div className="tp-checkout-bill-form">
        <div className="tp-checkout-bill-inner">
          <div className="row">
            {/* First Name */}
            <div className="col-md-6">
              <div className="tp-checkout-input">
                <label>First Name <span className="text-red-500">*</span></label>
                <input
                  {...register("firstName", { 
                    required: "First Name is required!",
                    pattern: {
                      value: /^[A-Za-z\s]+$/,
                      message: "Please enter a valid name"
                    }
                  })}
                  type="text"
                  placeholder="First Name"
                  className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-red-500"
                  autoComplete="given-name"
                />
                <ErrorMsg msg={errors?.firstName?.message} />
              </div>
            </div>

            {/* Last Name */}
            <div className="col-md-6">
              <div className="tp-checkout-input">
                <label>Last Name <span className="text-red-500">*</span></label>
                <input
                  {...register("lastName", { 
                    required: "Last Name is required!",
                    pattern: {
                      value: /^[A-Za-z\s]+$/,
                      message: "Please enter a valid name"
                    }
                  })}
                  type="text"
                  placeholder="Last Name"
                  className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-red-500"
                  autoComplete="family-name"
                />
                <ErrorMsg msg={errors?.lastName?.message} />
              </div>
            </div>

            {/* Street Address */}
            <div className="col-md-12">
              <div className="tp-checkout-input">
                <label>Street address <span className="text-red-500">*</span></label>
                <input
                  {...register("address", { 
                    required: "Address is required!",
                    minLength: {
                      value: 10,
                      message: "Address must be at least 10 characters"
                    }
                  })}
                  type="text"
                  placeholder="House number and street name"
                  className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-red-500"
                  autoComplete="street-address"
                />
                <ErrorMsg msg={errors?.address?.message} />
              </div>
            </div>

            {/* State Dropdown */}
            <div className="col-md-6">
              <CustomDropdown
                options={Object.keys(stateCityData)}
                label="State"
                required={true}
                onChange={(value) => handleStateChange(value)}
                register={register}
                name="state"
                value={selectedState}
                error={errors?.state?.message}
              />
            </div>

            {/* City Dropdown */}
            <div className="col-md-6">
              <CustomDropdown
                options={districts.map(d => d.district)}
                label="City"
                required={true}
                onChange={(value) => handleDistrictChange(value)}
                register={register}
                name="city"
                value={selectedDistrict}
                error={errors?.city?.message}
                disabled={!selectedState}
              />
            </div>

            {/* Sub-District Dropdown */}
            {selectedDistrict && (
              <div className="col-md-6">
                <CustomDropdown
                  options={subDistricts.map(sd => sd.subDistrict)}
                  label="Sub-District"
                  onChange={(value) => handleSubDistrictChange(value)}
                  register={register}
                  name="subDistrict"
                  value={selectedAddress?.subDistrict}
                  disabled={!selectedDistrict}
                />
              </div>
            )}

            {/* Village Dropdown */}
            {villages.length > 0 && (
              <div className="col-md-6">
                <CustomDropdown
                  options={villages}
                  label="Village (Optional)"
                  onChange={(value) => setValue('village', value)}
                  register={register}
                  name="village"
                  value={selectedAddress?.village}
                  disabled={!subDistricts.length}
                />
              </div>
            )}

            {/* Zip Code */}
            <div className="col-md-6">
              <div className="tp-checkout-input">
                <label>Postcode ZIP <span className="text-red-500">*</span></label>
                <input
                  {...register("zipCode", { 
                    required: "Zip Code is required!",
                    pattern: {
                      value: /^\d{6}$/,
                      message: "Please enter a valid 6-digit zip code"
                    }
                  })}
                  type="text"
                  placeholder="Postcode ZIP"
                  className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-red-500"
                  autoComplete="postal-code"
                />
                <ErrorMsg msg={errors?.zipCode?.message} />
              </div>
            </div>

            {/* Phone */}
            <div className="col-md-6">
              <div className="tp-checkout-input">
                <label>Phone <span className="text-red-500">*</span></label>
                <input
                  {...register("contactNo", { 
                    required: "Contact Number is required!",
                    pattern: {
                      value: /^[0-9]{10}$/,
                      message: "Please enter a valid 10-digit phone number"
                    }
                  })}
                  type="tel"
                  placeholder="Phone"
                  className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-red-500"
                  autoComplete="tel"
                />
                <ErrorMsg msg={errors?.contactNo?.message} />
              </div>
            </div>

            {/* Email */}
            <div className="col-md-12">
              <div className="tp-checkout-input">
                <label>Email address <span className="text-red-500">*</span></label>
                <input
                  {...register("email", { 
                    required: "Email is required!",
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: "Please enter a valid email address"
                    }
                  })}
                  type="email"
                  placeholder="Email"
                  className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-red-500"
                  autoComplete="email"
                />
                <ErrorMsg msg={errors?.email?.message} />
                <p className="text-sm text-gray-500 mt-1">
                  Order details and updates will be sent to this email address
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutBillingArea;

