import { Box, Grid, GridItem } from "@chakra-ui/react";
import { Actions } from "../components/profile/Actions";
import { PastBookings } from "../components/profile/PastBookings";
import { UserInfo } from "../components/profile/UserInfo";

import "./profilepage.module.css";



export const ProfilePage = ({ mode }: { mode: string }) => {
  const renderContent = () => {
    switch (mode) {
      case "past-bookings":
        return <PastBookings />;
      case "me":
        return <UserInfo />;
      default:
        return null;
    }
  };

  return (
    <Box className="flex justify-center h-full bg-slate-100 py-8">
      <Grid
        minH={"100%"}
        maxH={"100%"}
        templateRows="repeat(1, 1fr)"
        templateColumns="repeat(5, 1fr)"
        gap={4}
        w="70%"
      >
        <GridItem colSpan={1} overflow="hidden">
          <Actions />
        </GridItem>
        <GridItem colSpan={4}>{renderContent()}</GridItem>
      </Grid>
    </Box>
  );
};
