import { useState, useContext, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import {
  createStyles,
  ScrollArea,
  Center,
  Table,
  Anchor,
  ActionIcon,
  rem,
} from "@mantine/core";
import { IconTrashX } from "@tabler/icons-react";
import { db } from "../utils/firebase";
import { doc, collection, query, getDocs, deleteDoc } from "firebase/firestore";

const useStyles = createStyles((theme) => ({
  header: {
    position: "sticky",
    top: 0,
    backgroundColor: theme.white,
    transition: "box-shadow 150ms ease",

    "&::after": {
      content: '""',
      position: "absolute",
      left: 0,
      right: 0,
      bottom: 0,
      borderBottom: `${rem(1)} solid ${theme.colors.gray[2]}`,
    },
  },

  scrolled: {
    boxShadow: theme.shadows.sm,
  },
}));

export default function SavedColleges() {
  // Style states
  const { classes, cx } = useStyles();
  const [scrolled, setScrolled] = useState(false);

  // User states
  const { currentUser } = useContext(AuthContext);
  const userId = currentUser.uid.toString();

  // College data state
  const [collegeData, setCollegeData] = useState([]);

  const getData = async () => {
    try {
      const q = query(collection(db, "users", userId, "colleges"));
      const querySnapshot = await getDocs(q);

      const data = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setCollegeData(data);
    } catch (error) {
      console.error("Error querying document: ", error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const handleDelete = async (collegeId) => {
    try {
      if (!currentUser) throw new Error("User not authenticated");

      await deleteDoc(doc(db, "users", userId, "colleges", collegeId));

      // Update the collegeData state by filtering out the deleted college
      setCollegeData((prevCollegeData) =>
        prevCollegeData.filter((college) => college.id !== collegeId)
      );
    } catch (error) {
      console.error("Error deleting college: ", error);
    }
  };

  const getClickableLink = (link) => {
    if (!link) {
      return null;
    }

    return link.startsWith("https://") ? link : `https://${link}`;
  };

  return (
    <ScrollArea
      h={600}
      onScrollPositionChange={({ y }) => setScrolled(y !== 0)}
    >
      <Table striped withBorder withColumnBorders verticalSpacing="xs">
        <thead
          className={cx(classes.header, {
            [classes.scrolled]: scrolled,
          })}
        >
          <tr>
            <th>Name</th>
            <th>State</th>
            <th>City</th>
            <th>Average Net Price</th>
            <th>Net Price Calculator</th>
            <th>
              <Center>Delete College</Center>
            </th>
          </tr>
        </thead>
        <tbody>
          {collegeData.map((college) => (
            <tr key={college.id}>
              <td>
                <Anchor
                  href={getClickableLink(college.url)}
                  target="_blank"
                  underline={false}
                >
                  {college.name}
                </Anchor>
              </td>
              <td>{college.state}</td>
              <td>{college.city}</td>
              <td>${college.netPrice}</td>
              <td>
                <Anchor
                  href={getClickableLink(college.calculator)}
                  target="_blank"
                  underline={false}
                >
                  {college.name + "'s Net Price Calculator"}
                </Anchor>
              </td>
              <td>
                <Center>
                  <ActionIcon
                    variant={"outline"}
                    color="red"
                    radius="md"
                    size={24}
                    onClick={() => handleDelete(college.id)}
                  >
                    <IconTrashX size="1.1rem" stroke={1.5} />
                  </ActionIcon>
                </Center>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </ScrollArea>
  );
}
