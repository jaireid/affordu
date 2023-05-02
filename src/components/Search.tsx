import { useState, useEffect } from "react";
import CollegeCard from "./CollegeCard";
import { 
    Text, 
    TextInput, 
    Button, 
    Pagination, 
    Loader, 
    SimpleGrid,
    Container,
    Center,
    Alert,
    Select,
    Switch,
    Group
} from "@mantine/core";
import { IconAlertCircle } from '@tabler/icons-react';

export default function Search({ fetchColleges }) {
    // States for fetching
    const [query, setQuery] = useState("");
    const [colleges, setColleges] = useState([]);
    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState(0);
    const [pageSize, setPageSize] = useState(30);
    const [total, setTotal] = useState(0);

    // States for filters
    const [stateFilter, onStateFilterChange] = useState<string | null>(null);
    const [netPriceFilter, onNetPriceFilterChange] = useState<string | null>(null);

    // States
    const stateOptions = [
        { value: "AL", label: "Alabama" },
        { value: "AK", label: "Alaska" },
        { value: "AZ", label: "Arizona" },
        { value: "AR", label: "Arkansas" },
        { value: "CA", label: "California" },
        { value: "CO", label: "Colorado" },
        { value: "CT", label: "Connecticut" },
        { value: "DE", label: "Delaware" },
        { value: "FL", label: "Florida" },
        { value: "GA", label: "Georgia" },
        { value: "HI", label: "Hawaii" },
        { value: "ID", label: "Idaho" },
        { value: "IL", label: "Illinois" },
        { value: "IN", label: "Indiana" },
        { value: "IA", label: "Iowa" },
        { value: "KS", label: "Kansas" },
        { value: "KY", label: "Kentucky" },
        { value: "LA", label: "Louisiana" },
        { value: "ME", label: "Maine" },
        { value: "MD", label: "Maryland" },
        { value: "MA", label: "Massachusetts" },
        { value: "MI", label: "Michigan" },
        { value: "MN", label: "Minnesota" },
        { value: "MS", label: "Mississippi" },
        { value: "MO", label: "Missouri" },
        { value: "MT", label: "Montana" },
        { value: "NE", label: "Nebraska" },
        { value: "NV", label: "Nevada" },
        { value: "NH", label: "New Hampshire" },
        { value: "NJ", label: "New Jersey" },
        { value: "NM", label: "New Mexico" },
        { value: "NY", label: "New York" },
        { value: "NC", label: "North Carolina" },
        { value: "ND", label: "North Dakota" },
        { value: "OH", label: "Ohio" },
        { value: "OK", label: "Oklahoma" },
        { value: "OR", label: "Oregon" },
        { value: "PA", label: "Pennsylvania" },
        { value: "RI", label: "Rhode Island" },
        { value: "SC", label: "South Carolina" },
        { value: "SD", label: "South Dakota" },
        { value: "TN", label: "Tennessee" },
        { value: "TX", label: "Texas" },
        { value: "UT", label: "Utah" },
        { value: "VT", label: "Vermont" },
        { value: "VA", label: "Virginia" },
        { value: "WA", label: "Washington" },
        { value: "WV", label: "West Virginia" },
        { value: "WI", label: "Wisconsin" },
        { value: "WY", label: "Wyoming" }
    ];

    // Display all colleges when the component mounts
    useEffect(() => {
        const fetchInitialColleges = async () => {
            setLoading(true);
            const result = await fetchColleges(query, page, pageSize, stateFilter, netPriceFilter);
            setColleges(result.colleges);
            setTotal(result.total);
            setLoading(false);
        };

        fetchInitialColleges();
    }, [query, stateFilter, netPriceFilter]);

    const handleSearch = async (e) => {
        e.preventDefault();

        if (query.trim() === "") {
            return;
        }

        setLoading(true);
        setPage(0);
        const result = await fetchColleges(query, 0, pageSize, stateFilter, netPriceFilter);
        setColleges(result.colleges);
        console.log(result.colleges);
        console.log(result.total);
        setTotal(result.total);
        setLoading(false);
    };

    const handlePageChange = async (newPage) => {
        setLoading(true);
        const result = await fetchColleges(query, newPage-1, pageSize, stateFilter, netPriceFilter);
        setColleges(result.colleges);
        setPage(newPage);
        setLoading(false);
    };

    return (
        <>
            <Center>
                <Container 
                    size="lg"
                    p="md"
                    style={{ display: "flex", gap: "20px" }}
                >
                    <TextInput 
                        style={{ width: "400px" }}
                        placeholder="Search for colleges..."
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                    />
                    <Button 
                        onClick={handleSearch} 
                        disabled={loading}>
                        Search
                    </Button>
                </Container>
            </Center>
            
            <Group 
                spacing="lg"
                mx="lg"
            >
                <Select
                    label="State"
                    placeholder="Select State"
                    data={stateOptions}
                    value={stateFilter} 
                    onChange={onStateFilterChange}
                    clearable
                    allowDeselect
                />
                <Select
                    label="Net Price"
                    placeholder="Pick one"
                    data={[
                        "Below $5,000", 
                        "$5000-$9,999", 
                        "$10,000-$14,999", 
                        "$15,000-$19,999", 
                        "$20,000-$24,999", 
                        "$25,000-$29,999", 
                        "30,000 & above"
                    ]}
                    value={netPriceFilter} 
                    onChange={onNetPriceFilterChange}
                    clearable
                    allowDeselect
                />
            </Group>
          
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
                    <SimpleGrid 
                        cols={2} 
                        spacing="lg" 
                        m="lg"
                        breakpoints={[
                            { maxWidth: 'md', cols: 1},
                        ]}
                    >
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
