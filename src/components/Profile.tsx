import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useLocation } from "react-router-dom";
import { fetchColleges } from "../api/collegeAPI";
import Search from "./Search";
import SavedColleges from "./SavedColleges";
import { Container, Title, Text } from "@mantine/core";

export default function Profile() {
  const { currentUser } = useContext(AuthContext);
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const type = searchParams.get("type");

  let content;
  const search = (
    <>
      <Title order={2} mb="md" ta="center">
        Find your dream college without breaking the bank
      </Title>
      <Container size="md" px="lg">
        <Text
          color="dimmed"
          size="sm"
          pb="md"
          ta={{ sm: "left", lg: "center" }}
        >
          Net price is what you pay after your gift aid is subtracted from the
          cost of attendance. A lower net price can mean less student debt after
          graduation. Compare the average net prices of colleges to find your
          best fit.
        </Text>
      </Container>
      <Search fetchColleges={fetchColleges} />
    </>
  );

  if (type === "explore") {
    content = search;
  } else if (type === "saved") {
    content = (
      <>
        <Title order={2} mb="md" ta="center">
          Your Saved Colleges
        </Title>
        <SavedColleges />
      </>
    );
  } else {
    content = search;
  }

  return <>{content}</>;
}
