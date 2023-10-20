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
import Card from "components/card/Card.js";

import routes from "routes.js";
import { SidebarContext } from "contexts/SidebarContext";
import Navbar from "components/navbar/NavbarAdmin.js";
import Sidebar from "components/sidebar/Sidebar.js";
import TableTopCreators from "./TableTopCreators";
import Footer from "components/footer/FooterAdmin.js";
import tableDataTopCreators from "./tableDataTopCreators.json";
import { tableColumnsTopCreators } from "./tableColumnsTopCreators";
import HistoryItem from "./HistoryItem";

import Nft1 from "assets/img/nfts/Nft1.png";
import Nft2 from "assets/img/nfts/Nft2.png";
import Nft3 from "assets/img/nfts/Nft3.png";
import Nft4 from "assets/img/nfts/Nft4.png";
import Nft5 from "assets/img/nfts/Nft5.png";
import Nft6 from "assets/img/nfts/Nft6.png";
import Avatar1 from "assets/img/avatars/avatar1.png";
import Avatar2 from "assets/img/avatars/avatar2.png";
import Avatar3 from "assets/img/avatars/avatar3.png";
import Avatar4 from "assets/img/avatars/avatar4.png";

// ... other imports

function LeaderBoard(props) {
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
      <Center>
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
          <Box pt={{ base: "180px", md: "80px", xl: "80px" }}>
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
                flexDirection="row"
                gridArea={{ xl: "1 / 1 / 4 / 4", "2xl": "1 / 1 / 4 / 4" }}
                marginTop="50px"
              >
                <Flex
                  direction="column"
                  maxWidth="600px"
                  // margin="0 auto"
                  marginRight="80px"
                  marginBottom="140px"
                >
                  <TableTopCreators
                    tableData={tableDataTopCreators}
                    columnsData={tableColumnsTopCreators}
                  />
                </Flex>
                <Card p="0px" marginRight="40px" marginLeft="40px">
                  <Flex
                    align={{ sm: "flex-start", lg: "center" }}
                    justify="space-between"
                    w="100%"
                    px="22px"
                    py="18px"
                  >
                    <Text color={textColor} fontSize="xl" fontWeight="600">
                      Global Leader Board
                    </Text>
                    <Button variant="action">See all</Button>
                  </Flex>

                  <HistoryItem
                    name="Sandeep Rai"
                    //   author=""
                    date="30s ago"
                    image={Nft5}
                    points="910"
                  />
                  <HistoryItem
                    name="Abstract Colors"
                    date="58s ago"
                    image={Nft1}
                    points="890"
                  />
                  <HistoryItem
                    name="ETH AI Brain"
                    date="1m ago"
                    image={Nft2}
                    points="880"
                  />
                  <HistoryItem
                    name="Swipe Circles"
                    date="1m ago"
                    image={Nft4}
                    points="840"
                  />
                  <HistoryItem
                    name="Mesh Gradients "
                    date="2m ago"
                    image={Nft3}
                    points="800"
                  />
                  <HistoryItem
                    name="3D Cubes Art"
                    date="3m ago"
                    image={Nft6}
                    points="790"
                  />
                </Card>
              </Flex>
            </Grid>
          </Box>
        </Flex>
        {/* </SidebarContext.Provider> */}
      </Center>
    </Box>
  );
}

export default LeaderBoard;
