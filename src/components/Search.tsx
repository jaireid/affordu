import { useState, useEffect } from "react";
import CollegeCard from "./CollegeCard";
import { 
    Text, 
    Box, 
    TextInput, 
    Button, 
    Pagination, 
    Loader, 
    SimpleGrid,
    Container,
    Center,
    Alert
} from "@mantine/core";
import { IconAlertCircle } from '@tabler/icons-react';

export default function Search({ fetchColleges }) {
    const [query, setQuery] = useState("");
    const [colleges, setColleges] = useState([]);
    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState(0);
    const [pageSize, setPageSize] = useState(20);
    const [total, setTotal] = useState(0);

    // Display all colleges when the component mounts
    useEffect(() => {
        const fetchInitialColleges = async () => {
            setLoading(true);
            const result = await fetchColleges(query, page, pageSize);
            setColleges(result.colleges);
            setTotal(result.total);
            setLoading(false);
        };

        fetchInitialColleges();
    }, [query]);

    const handleSearch = async (e) => {
        e.preventDefault();

        if (query.trim() === "") {
            return;
        }

        setLoading(true);
        setPage(0);
        const result = await fetchColleges(query, 0, pageSize);
        setColleges(result.colleges);
        console.log(result.colleges);
        console.log(result.total);
        setTotal(result.total);
        setLoading(false);
    };

    const handlePageChange = async (newPage) => {
        setLoading(true);
        const result = await fetchColleges(query, newPage-1, pageSize);
        setColleges(result.colleges);
        setPage(newPage);
        setLoading(false);
    };

    return (
        <>
            <Container 
                size="xs"
                p="md"
                style={{ display: "flex", gap: "20px" }}
            >
                <TextInput 
                    style={{ width: "400px" }}
                    placeholder="Search for colleges"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                />
                <Button onClick={handleSearch} disabled={loading}>
                    Search
                </Button>
            </Container>
          
            {loading && <Center mt="100px"><Loader /></Center>}
            {!loading && (!colleges || colleges.length === 0) && (
                <Center mt="100px">
                     <Alert 
                          icon={<IconAlertCircle size="1rem" />}
                          title="Bummer!"
                          style={{ width: "200px" }}
                      >
                          No Colleges Found
                      </Alert>
                </Center>
            )}
            {!loading && (!colleges || colleges.length > 0) && (
                <>
                    <SimpleGrid cols={2} spacing="lg" m="lg">
                        {colleges?.map((college) => (
                            <CollegeCard key={college.id} college={college} />
                        ))}
                    </SimpleGrid>
                    <Pagination
                        mx="lg"
                        total={Math.ceil(total / pageSize)}
                        value={page}
                        onChange={handlePageChange}
                    />       
                </>
            )}
        </>
    );
}
