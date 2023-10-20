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

// ... other imports

function AddProductPage(props) {
  const { ...rest } = props;
  const [fixed] = useState(false);
  const [toggleSidebar, setToggleSidebar] = useState(false);

  // Chakra Color Mode
  const textColor = useColorModeValue("secondaryGray.900", "white");
  const textColorBrand = useColorModeValue("brand.500", "white");
  const { onOpen } = useDisclosure();
  const getActiveNavbar = (routes) => {
    let activeNavbar = false;
    for (let i = 0; i < routes.length; i++) {
      if (routes[i].collapse) {
        let collapseActiveNavbar = getActiveNavbar(routes[i].items);
        if (collapseActiveNavbar !== activeNavbar) {
          return collapseActiveNavbar;
        }
      } else if (routes[i].category) {
        let categoryActiveNavbar = getActiveNavbar(routes[i].items);
        if (categoryActiveNavbar !== activeNavbar) {
          return categoryActiveNavbar;
        }
      } else {
        if (
          window.location.href.indexOf(routes[i].layout + routes[i].path) !== -1
        ) {
          return routes[i].secondary;
        }
      }
    }
    return activeNavbar;
  };
  const getActiveNavbarText = (routes) => {
    let activeNavbar = false;
    for (let i = 0; i < routes.length; i++) {
      if (routes[i].collapse) {
        let collapseActiveNavbar = getActiveNavbarText(routes[i].items);
        if (collapseActiveNavbar !== activeNavbar) {
          return collapseActiveNavbar;
        }
      } else if (routes[i].category) {
        let categoryActiveNavbar = getActiveNavbarText(routes[i].items);
        if (categoryActiveNavbar !== activeNavbar) {
          return categoryActiveNavbar;
        }
      } else {
        if (
          window.location.href.indexOf(routes[i].layout + routes[i].path) !== -1
        ) {
          return routes[i].messageNavbar;
        }
      }
    }
    return activeNavbar;
  };
  const getActiveRoute = (routes) => {
    let activeRoute = "MarketPlace";
    for (let i = 0; i < routes.length; i++) {
      if (routes[i].collapse) {
        let collapseActiveRoute = getActiveRoute(routes[i].items);
        if (collapseActiveRoute !== activeRoute) {
          return collapseActiveRoute;
        }
      } else if (routes[i].category) {
        let categoryActiveRoute = getActiveRoute(routes[i].items);
        if (categoryActiveRoute !== activeRoute) {
          return categoryActiveRoute;
        }
      } else {
        if (
          window.location.href.indexOf(routes[i].layout + routes[i].path) !== -1
        ) {
          return routes[i].name;
        }
      }
    }
    return activeRoute;
  };

  return (
    <Box>
      <SidebarContext.Provider
        value={{
          toggleSidebar,
          setToggleSidebar,
        }}
      >
        <Sidebar routes={routes} display="none" {...rest} />
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
            <Box>
              <Navbar
                onOpen={onOpen}
                logoText={"Horizon UI Dashboard PRO"}
                brandText={getActiveRoute(routes)}
                secondary={getActiveNavbar(routes)}
                message={getActiveNavbarText(routes)}
                fixed={fixed}
                {...rest}
              />
            </Box>
          </Portal>

          <Box pt={{ base: "180px", md: "80px", xl: "80px" }}>
            <Center height="calc(100vh - 260px)">
              {" "}
              {/* Adjusted height to account for padding */}
              {/* Main Fields */}
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
                      Add Product
                    </Text>
                  </Center>

                  <Flex direction="column" maxWidth="600px" margin="0 auto">
                    <FormControl mb={4}>
                      <FormLabel>Product Name</FormLabel>
                      <Input
                        placeholder="Enter product name"
                        size="md"
                        boxShadow="sm"
                        _hover={{ boxShadow: "md" }}
                        _focus={{ boxShadow: "lg" }}
                        padding="10px"
                        maxWidth="100%"
                        width="400px"
                      />
                    </FormControl>

                    <Flex direction="column" maxWidth="600px" margin="0 auto">
                    <FormControl mb={4}>
                      <FormLabel>Product Description</FormLabel>
                      <Input
                        placeholder="Enter Description"
                        size="md"
                        boxShadow="sm"
                        _hover={{ boxShadow: "md" }}
                        _focus={{ boxShadow: "lg" }}
                        padding="10px"
                        maxWidth="100%"
                        width="400px"
                      />
                    </FormControl>

                    <FormControl mb={4}>
                      <FormLabel>Image</FormLabel>
                      <Input
                        type="file"
                        size="lg"
                        boxShadow="sm"
                        _hover={{ boxShadow: "md" }}
                        _focus={{ boxShadow: "lg" }}
                        padding="10px"
                        maxWidth="100%"
                        width="400px"
                      />
                    </FormControl>

                    <FormControl mb={4}>
                      <FormLabel>Price(₹)</FormLabel>
                      <Input
                        type="number"
                        placeholder="Enter price"
                        size="md"
                        boxShadow="sm"
                        _hover={{ boxShadow: "md" }}
                        _focus={{ boxShadow: "lg" }}
                        padding="10px"
                        maxWidth="100%"
                        width="400px"
                      />
                    </FormControl>

                    <FormControl mb={4}>
                      <FormLabel>Category</FormLabel>
                      <Select placeholder="Select category">
                        <option value="electronics">Electronics</option>
                        <option value="clothing">Clothing</option>
                        <option value="home">Home</option>
                      </Select>
                    </FormControl>

                    <Button colorScheme="teal" mt={4} type="submit">
                      Submit
                    </Button>
                  </Flex>
                </Flex>
              </Grid>
            </Center>
          </Box>
          <Flex marginTop="120px">
            <Footer />
          </Flex>
        </Flex>
      </SidebarContext.Provider>
    </Box>
  );
}

export default AddProductPage;
