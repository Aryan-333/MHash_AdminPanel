import {
  Avatar,
  Box,
  Flex,
  FormLabel,
  Icon,
  Select,
  SimpleGrid,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
// Assets
// import Usa from "assets/img/dashboards/usa.png";
// Custom components
import myImage from "assets/img/dashboards/greencoin.png";
import MiniCalendar from "components/calendar/MiniCalendar";
import MiniStatistics from "components/card/MiniStatistics";
// import HSeparator from "../../../components/separator/HSeparator";
import IconBox from "components/icons/IconBox";
import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  MdAddTask,
  MdAttachMoney,
  MdBarChart,
  MdFileCopy,
} from "react-icons/md";
import { LiaCoinsSolid } from "react-icons/lia";
import { FaWalking, FaBicycle } from "react-icons/fa";
import { FaTrainSubway } from "react-icons/fa6";
import CheckTable from "views/admin/default/components/CheckTable";
import ComplexTable from "views/admin/default/components/ComplexTable";
import DailyTraffic from "views/admin/default/components/DailyTraffic";
import PieCard from "views/admin/default/components/PieCard";
import Tasks from "views/admin/default/components/Tasks";
import TotalSpent from "views/admin/default/components/TotalSpent";
import WeeklyRevenue from "views/admin/default/components/WeeklyRevenue";
import {
  columnsDataCheck,
  columnsDataComplex,
} from "views/admin/default/variables/columnsData";
import tableDataCheck from "views/admin/default/variables/tableDataCheck.json";
import tableDataComplex from "views/admin/default/variables/tableDataComplex.json";

export default function UserReports() {
  const [totalPoints, setTotalPoints] = useState(0);

  useEffect(() => {
    fetch("http://manipal-hackathon-2.onrender.com/api/user/globalLeaderboard")
      .then((response) => response.json())
      .then((data) => {
        if (
          data.globalLeaderboard &&
          data.globalLeaderboard[0] &&
          data.globalLeaderboard[0].profile
        ) {
          setTotalPoints(
            data.globalLeaderboard[1].profile.progress.totalPoints
          );
        }
      })
      .catch((error) => {
        console.error("Error fetching totalPoints:", error);
      });
  }, []);

  // Chakra Color Mode
  const brandColor = useColorModeValue("brand.500", "white");
  const boxBg = useColorModeValue("secondaryGray.300", "whiteAlpha.100");
  return (
    <Box pt={{ base: "130px", md: "80px", xl: "80px" }}>
      <SimpleGrid
        columns={{ base: 1, md: 2, lg: 3, "2xl": 6 }}
        gap="20px"
        mb="40px"
      >
        <MiniStatistics
          startContent={
            <IconBox
              w="56px"
              h="56px"
              bg={boxBg}
              icon={
                <Icon w="32px" h="32px" as={MdBarChart} color={brandColor} />
              }
            />
          }
          name="Redeemed Points"
          value="35000"
        />
        <MiniStatistics
          startContent={
            <IconBox
              w="56px"
              h="56px"
              bg={boxBg}
              icon={
                <Icon w="32px" h="32px" as={LiaCoinsSolid} color={brandColor} />
              }
            />
          }
          name="Total Green Points"
          value={totalPoints}
        />
        <MiniStatistics growth="+23%" name="Growth this month" value="5666" />
        <MiniStatistics
          textAlign="center"
          name="Total Distance Traveled"
          value="5743 km"
        />
        <Flex h="1px" w="0%" bg="rgba(135, 140, 189, 0.3)"></Flex>;
        <Flex h="1px" w="1100%" bg="rgba(135, 140, 189, 0.3)"></Flex>;
        <Text
          fontSize="3xl"
          fontWeight="700"
          marginLeft="-350px"
          marginTop="10px"
        >
          Progress Statistics
        </Text>
        <MiniStatistics
          startContent={
            <IconBox
              w="56px"
              h="56px"
              bg="linear-gradient(90deg, #4481EB 0%, #04BEFE 100%)"
              icon={<Icon w="28px" h="28px" as={FaWalking} color="white" />}
            />
          }
          name="Walking"
          value="154"
        />
        <MiniStatistics
          startContent={
            <IconBox
              w="56px"
              h="56px"
              bg="linear-gradient(90deg, #4481EB 0%, #04BEFE 100%)"
              icon={<Icon w="28px" h="28px" as={FaBicycle} color="white" />}
            />
          }
          name="Cycling"
          value="154"
        />
        <MiniStatistics
          startContent={
            <IconBox
              w="56px"
              h="56px"
              bg="linear-gradient(90deg, #4481EB 0%, #04BEFE 100%)"
              icon={<Icon w="28px" h="28px" as={FaTrainSubway} color="white" />}
            />
          }
          name="Public Transport"
          value="154"
        />
      </SimpleGrid>

      <SimpleGrid columns={{ base: 1, md: 2, xl: 2 }} gap="20px" mb="20px">
        <TotalSpent />
        <WeeklyRevenue />
      </SimpleGrid>
    </Box>
  );
}
