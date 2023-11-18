import React, { useEffect, useState } from "react";
import api from "../../Services/api";
import Navbar from "./Navbar";
import axios from "axios";
import Footer from "./Footer";
import Swal from "sweetalert2";
import {
  Box,
  Container,
  FormControl,
  FormLabel,
  Input,
  Select,
  Textarea,
  Button,
  Text,
  Center,
} from "@chakra-ui/react";
import { Country, State, City } from "country-state-city";
import { Navigate, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

function Post() {
  const [countries, setCountries] = useState([]);
  const [categories, setCategories] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [enable, setEnable] = useState(true);
  const [cityEnable, setCityEnable] = useState(true);
  const [countryId, setCountryId] = useState("");
  const [stateId, setStateId] = useState("");

  const [user, setUser] = useState();
  const [category, setCategory] = useState();
  const [country, setCountry] = useState("");
  const [state, setState] = useState("");
  const [city, setCity] = useState("");
  const [pincode, setPincode] = useState("");
  const [landmark, setLandmark] = useState("");
  const [price, setPrice] = useState("");
  const [validity, setValidity] = useState("");
  const [discription, setDiscription] = useState("");
  const [size, setSize] = useState("");
  const [mediaType, setMediaType] = useState("");
  const [image, setImage] = useState("");

  const [formError, setFormError] = useState([]);
  const navigate = useNavigate();
  const users = useSelector((state) => state.user);

  
  useEffect(() => {
    setUser(users.user.id);
    const fetchCategory = async () => {
      try {
        const response = await api.get(
          `${import.meta.env.VITE_APP_BASE_URL}admins/api/category-list/`
        );
        setCategories(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    const fetchData = async () => {
      setCountries(Country.getAllCountries());
      if (countryId) {
        try {
          const statesOfCountry = await State.getStatesOfCountry(countryId);
          setStates(statesOfCountry);
          setEnable(false);
        } catch (error) {
          console.error("Error fetching states:", error);
        }
      }
    };

    const fetchStateData = async () => {
      if (stateId) {
        try {
          const citiesOfStates = await City.getCitiesOfState(
            countryId,
            stateId
          );
          setCities(citiesOfStates);
          setCityEnable(false);
        } catch (error) {
          console.error("Error fetching states:", error);
        }
      }
    };
    fetchData();
    fetchCategory();
    fetchStateData();
  }, [countryId, stateId]);

  const handleCountryChange = (e) => {
    setCountryId(e.target.value);
    const c = Country.getCountryByCode(e.target.value);
    setCountry(c.name);
    setEnable(false);
  };  

  const handleStateChange = (e) => {
    setStateId(e.target.value);
    const s = State.getStateByCodeAndCountry(e.target.value, countryId);
    setState(s.name);
    setCityEnable(false);
  };

  const handleCityChange = (e) => {
    setCity(e.target.value);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormError([]);
    if (
      !user ||
      !category ||
      !country ||
      !state ||
      !city ||
      !landmark ||
      !pincode ||
      !discription ||
      !validity ||
      !price ||
      !size ||
      !mediaType ||
      !image
    ) {
      setFormError(["All fields are required"]);
      return;
    }

    const formData = new FormData();
    formData.append("user", user);
    formData.append("category", category);
    formData.append("country", country);
    formData.append("state", state);
    formData.append("city", city);
    formData.append("landmark", landmark);
    formData.append("pincode", pincode);
    formData.append("validity", validity);
    formData.append("price", price);
    formData.append("size", size);
    formData.append("media_type", mediaType);
    formData.append("image", image);
    formData.append("discription", discription);

    try {
      const response = await api.post(
        `${import.meta.env.VITE_APP_BASE_URL}admins/api/post/`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      Swal.fire({
        icon: "success",
        title: "New Post added successfully",
        showConfirmButton: false,
        timer: 2000,
      });
      navigate("/profile");
      console.log("success");
    } catch (error) {
      if (error.response) {
        setFormError([error.response.data]);
        console.log(error.response.data);
      } else {
        console.log("Error setting up the request:", error.message);
      }
      setFormError(["Failed to submit the form. Please try again."]);
    }
  };

  return (
    <>
      <Navbar />
      <Text textAlign="center" fontSize="30px" fontWeight="bold" mt="65px">
        Post Your AD
      </Text>
      <Container maxW="container.md" border="1px" mt={5}>
        <Box mt="4">
          <form onSubmit={handleSubmit}>
            {formError.length > 0 && (
              <Box mt="4">
                <ul>
                  {formError.map((error, index) => (
                    <Text color="red" key={index}>
                      {error}
                    </Text>
                  ))}
                </ul>
              </Box>
            )}
            <FormControl>
              <FormLabel>Country</FormLabel>
              <Select
                placeholder="Select country"
                onChange={(e) => handleCountryChange(e)}
              >
                {countries && countries.map((cntry) => (
                  <option key={cntry.isoCode} value={cntry.isoCode}>
                    {cntry.name}
                  </option>
                ))}
              </Select>
            </FormControl>

            <FormControl mt="4">
              <FormLabel>State</FormLabel>
              <Select
                placeholder="Select state"
                onChange={(e) => handleStateChange(e)}
                disabled={enable}
              >
                {states && states.map((state) => (
                  <option key={state.isoCode} value={state.isoCode}>
                    {state.name}
                  </option>
                ))}
              </Select>
            </FormControl>

            <FormControl mt="4">
              <FormLabel>City</FormLabel>
              <Select
                placeholder="Select City"
                onChange={(e) => handleCityChange(e)}
                disabled={cityEnable}
              >
                {cities && cities.map((city) => (
                  <option key={city.name} value={city.isoCode}>
                    {city.name}
                  </option>
                ))}
              </Select>{" "}
            </FormControl>

            <FormControl mt="4">
              <FormLabel>Category</FormLabel>
              <Select
                placeholder="Select Category"
                onChange={(e) => setCategory(e.target.value)}
              >
                {categories.map((ctgry) => (
                  <option key={ctgry.id} value={ctgry.id}>
                    {ctgry.name}
                  </option>
                ))}
              </Select>
            </FormControl>

            <FormControl mt="4">
              <FormLabel>Landmark</FormLabel>
              <Input
                type="text"
                value={landmark}
                onChange={(e) => setLandmark(e.target.value)}
                placeholder="Enter landmark"
              />
            </FormControl>

            <FormControl mt="4">
              <FormLabel>Pincode</FormLabel>
              <Input
                type="text"
                value={pincode}
                onChange={(e) => setPincode(e.target.value)}
                placeholder="Enter pincode"
              />
            </FormControl>

            <FormControl mt="4">
              <FormLabel>Description</FormLabel>
              <Textarea
                placeholder="Enter description"
                onChange={(e) => setDiscription(e.target.value)}
                value={discription}
              />
            </FormControl>

            <FormControl mt="4">
              <FormLabel>Validity</FormLabel>
              <Input
                type="text"
                onChange={(e) => setValidity(e.target.value)}
                value={validity}
                placeholder="Enter validity"
              />
            </FormControl>

            <FormControl mt="4">
              <FormLabel>Size</FormLabel>
              <Input
                type="text"
                onChange={(e) => setSize(e.target.value)}
                value={size}
                placeholder="Enter size"
              />
            </FormControl>

            <FormControl mt="4">
              <FormLabel>Price</FormLabel>
              <Input
                type="text"
                onChange={(e) => setPrice(e.target.value)}
                value={price}
                placeholder="Enter price"
              />
            </FormControl>

            <FormControl mt="4">
              <FormLabel>Media Type</FormLabel>
              <Input
                type="text"
                value={mediaType}
                onChange={(e) => setMediaType(e.target.value)}
                placeholder="Enter media type"
              />
            </FormControl>

            <FormControl mt="4">
              <FormLabel>Image</FormLabel>
              <Input
                type="file"
                onChange={(e) => setImage(e.target.files[0])}
                accept="image/*"
              />
            </FormControl>
            <Center mt="4">
              <Button w="220px" mb={5} colorScheme="blue" type="submit">
                Post Now
              </Button>
            </Center>
          </form>
        </Box>
      </Container>

      <Footer />
    </>
  );
}

export default Post;
