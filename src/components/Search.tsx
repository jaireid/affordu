import { useState, useEffect } from "react";
import CollegeCard from "./CollegeCard";
import { 
    Text, 
    Box, 
    TextInput, 
    Button, 
    Pagination, 
    Loader, 
    SimpleGrid 
} from "@mantine/core";

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
            <Box pb="lg" style={{ display: "flex", gap: "10px" }}>
                <Box>
                    <TextInput
                        placeholder="Search for colleges"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                    />
                </Box>
                <Box>
                    <Button onClick={handleSearch} disabled={loading}>
                        Search
                    </Button>
                </Box>
            </Box>
          
            {loading && <Loader />}
            {!loading && (!colleges || colleges.length === 0) && (
                <Text>No colleges found</Text>
            )}
            {!loading && (!colleges || colleges.length > 0) && (
                <>
                    <SimpleGrid cols={2} spacing="lg" m="lg">
                        {colleges?.map((college) => (
                            <CollegeCard key={college.id} college={college} />
                        ))}
                    </SimpleGrid>
                    <Pagination
                        total={Math.ceil(total / pageSize)}
                        value={page}
                        onChange={handlePageChange}
                    />       
                </>
            )}
        </>
    );
}
