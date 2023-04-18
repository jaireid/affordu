import { useState } from "react";
import searchColleges from "../api/collegeAPI";
import CollegeCard from "./CollegCard";
import { Text, Box, TextInput, Button, Pagination, Loader } from "@mantine/core";

function SearchComponent({ searchColleges }) {
    const [query, setQuery] = useState("");
    const [colleges, setColleges] = useState([]);
    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [total, setTotal] = useState(0);

    const handleSearch = async () => {
        setLoading(true);
        setPage(1);
        const result = await searchColleges(query, 1, pageSize);
        setColleges(result.colleges);
        setTotal(result.total);
        setLoading(false);
    };

    const handlePageChange = async (newPage) => {
        setLoading(true);
        const result = await searchColleges(query, newPage, pageSize);
        setColleges(result.colleges);
        setPage(newPage);
        setLoading(false);
    };

    return (
        <>
            <Box pb="lg" style={{ display: "flex", gap: "10px" }}>
                <Box flexGrow={1}>
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
            {!loading && colleges.length === 0 && (
                <Text>No colleges found</Text>
            )}
            {!loading && colleges.length > 0 && (
                <>
                    {colleges.map((college) => (
                        <CollegeCard key={college.id} college={college} />
                    ))}
                    <Pagination
                        totalPages={Math.ceil(total / pageSize)}
                        page={page}
                        onChange={handlePageChange}
                    />
                </>
            )}
        </>
    );
}
