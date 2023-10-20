import React, { useState } from "react";
import {
  Box,
  Button,
  Flex,
  Grid,
  Text,
  useColorModeValue,
  FormControl,
  FormLabel,
  Input,
  Select,
  Center,
  Portal,
  useDisclosure,
  Link,
} from "@chakra-ui/react";
import routes from "routes.js";
import { SidebarContext } from "contexts/SidebarContext";
import Navbar from "components/navbar/NavbarAdmin.js";
import Sidebar from "components/sidebar/Sidebar.js";
import Footer from "components/footer/FooterAdmin.js";
import axios from "axios";

function AddChallenges(props) {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    challengePoints: "",
    challengeDistance: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const postData = {
        title: formData.title,
        description: formData.description,
        challenge_points: parseInt(formData.challengePoints),
        challenge_distance: parseInt(formData.challengeDistance),
      };

      const response = await fetch(
        "http://manipal-hackathon-2.onrender.com/api/admin/addChallenge",
        {
          method: "POST",
          body: JSON.stringify(postData),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const contentType = response.headers.get("content-type");
      if (!contentType || !contentType.includes("application/json")) {
        throw new Error("Received non-JSON response from the server.");
      }

      const json = await response.json();

      if (!response.ok) {
        throw new Error(json.message || "Error from the server.");
      }

      setFormData({
        title: "",
        description: "",
        challengePoints: "",
        challengeDistance: "",
      });
    } catch (error) {
      console.error("Error adding challenge:", error);
    }
  };

  const { ...rest } = props;
  const [fixed] = useState(false);
  const [toggleSidebar, setToggleSidebar] = useState(false);

  // Chakra Color Mode
  const textColor = useColorModeValue("secondaryGray.900", "white");
  const textColorBrand = useColorModeValue("brand.500", "white");
  const { onOpen } = useDisclosure();

  // ... [Rest of the component logic]

  return (
    <Box>
      <Center>
        <SidebarContext.Provider
          value={{
            toggleSidebar,
            setToggleSidebar,
          }}
        >
          {/* <Sidebar routes={routes} display="none" {...rest} /> */}
          <Flex
            direction="column"
            minHeight="100vh"
            w={{ base: "100%", xl: "calc( 100% - 290px )" }}
            transition="all 0.33s cubic-bezier(0.685, 0.0473, 0.346, 1)"
            float="right"
            height="100%"
            overflow="auto"
            position="relative"
            maxHeight="100%"
            maxWidth={{ base: "100%", xl: "calc( 100% - 290px )" }}
            transitionDuration=".2s, .2s, .35s"
            transitionProperty="top, bottom, width"
            transitionTimingFunction="linear, linear, ease"
          >
            <Portal>
              <Box></Box>
            </Portal>

            <Box pt={{ base: "180px", md: "80px", xl: "80px" }}>
              <Center height="calc(100vh - 260px)">
                {" "}
                <Grid
                  mb="20px"
                  gridTemplateColumns={{
                    xl: "repeat(3, 1fr)",
                    "2xl": "1fr 0.46fr",
                  }}
                  gap={{ base: "20px", xl: "20px" }}
                  display={{ base: "block", xl: "grid" }}
                >
                  <Flex
                    flexDirection="column"
                    gridArea={{ xl: "1 / 1 / 2 / 3", "2xl": "1 / 1 / 2 / 2" }}
                    marginTop="50px"
                  >
                    <Center mt="45px" mb="20px">
                      <Text color={textColor} fontSize="3xl" fontWeight="700">
                        Add a new Challenge
                      </Text>
                    </Center>

                    <form onSubmit={handleSubmit}>
                      <Flex direction="column" maxWidth="800px" margin="0 auto">
                        <FormControl mb={4}>
                          <FormLabel>Challenge Title</FormLabel>
                          <Input
                            name="title"
                            value={formData.title}
                            onChange={handleChange}
                            placeholder="Enter Challenge Title"
                            size="md"
                            boxShadow="sm"
                            _hover={{ boxShadow: "md" }}
                            _focus={{ boxShadow: "lg" }}
                            padding="10px"
                          />
                        </FormControl>

                        <FormControl mb={4}>
                          <FormLabel>Challenge Description</FormLabel>
                          <Input
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            placeholder="Enter Description"
                            size="md"
                            boxShadow="sm"
                            _hover={{ boxShadow: "md" }}
                            _focus={{ boxShadow: "lg" }}
                            padding="10px"
                          />
                        </FormControl>

                        <FormControl mb={4}>
                          <FormLabel>Challenge Distance</FormLabel>
                          <Input
                            name="challengeDistance"
                            value={formData.challengeDistance}
                            onChange={handleChange}
                            type="number"
                            placeholder="Enter Distance"
                            size="md"
                            boxShadow="sm"
                            _hover={{ boxShadow: "md" }}
                            _focus={{ boxShadow: "lg" }}
                            padding="10px"
                          />
                        </FormControl>

                        <FormControl mb={4}>
                          <FormLabel>Green Points</FormLabel>
                          <Input
                            name="challengePoints"
                            value={formData.challengePoints}
                            onChange={handleChange}
                            type="number"
                            placeholder="Enter Green Points"
                            size="md"
                            boxShadow="sm"
                            _hover={{ boxShadow: "md" }}
                            _focus={{ boxShadow: "lg" }}
                            padding="10px"
                            maxWidth="100%"
                            width="400px"
                          />
                        </FormControl>

                        <Button colorScheme="teal" mt={4} type="submit">
                          Submit
                        </Button>
                      </Flex>
                    </form>
                  </Flex>
                </Grid>
              </Center>
            </Box>
            <Flex marginTop="140px">{/* <Footer /> */}</Flex>
          </Flex>
        </SidebarContext.Provider>
      </Center>
    </Box>
  );
}

export default AddChallenges;
