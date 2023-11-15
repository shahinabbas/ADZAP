import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import axios from "axios";
import Footer from "./Footer";
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

function Post() {
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [enable, setEnable] = useState(true);
  const [cityEnable, setCityEnable] = useState(true);
  const [countryId, setCountryId] = useState("");
  const [stateId, setStateId] = useState("");

  const [country, setCountry] = useState("");
  const [state, setState] = useState("");
  const [city, setCity] = useState("");
  const [pincode, setPincode] = useState("");
  const [landmark, setLandmark] = useState("");
  const [price, setPrice] = useState("");
  const [validity, setValidity] = useState("");
  const [discription, setDiscription] = useState("");
  const [size, setSize] = useState("");
  const [media, setMedia] = useState("");

  useEffect(() => {
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
  }, [countryId]);

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
    const city = City.getCitiesOfState(e.target.value, stateId);
    setCity(e.target.value);
  };

  const handleSubmit=()=>{

  }

  return (
    <>
      <Navbar />
      <Text textAlign="center" fontSize="30px" fontWeight="bold" mt={5}>
        Post Your AD
      </Text>
      <Container maxW="container.md" border="1px" mt={5}>
        <Box mt="4">
          <form>
            <FormControl>
              <FormLabel>Country</FormLabel>
              <Select
                placeholder="Select country"
                onChange={(e) => handleCountryChange(e)}
              >
                {countries.map((cntry) => (
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
                {states.map((state) => (
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
                {cities.map((city) => (
                  <option key={city.name} value={city.isoCode}>
                    {city.name}
                  </option>
                ))}
              </Select>{" "}
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
                value={media_type}
                onChange={(e) => setMedia(e.target.value)}
                placeholder="Enter media type"
              />
            </FormControl>

            <FormControl mt="4">
              <FormLabel>Image</FormLabel>
              <Input type="file" value={image} accept="image/*" />
            </FormControl>
            <Center mt="4">
              <Button
                w="220px"
                mb={5}
                colorScheme="blue"
                type="submit"
                onClick={handleSubmit}
              >
                Post Now
              </Button>
            </Center>
          </form>
        </Box>
      </Container>
      <br />
      <br />
      <Footer />
    </>
  );
}

export default Post;
