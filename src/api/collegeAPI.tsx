import axios, { AxiosError } from "axios";

type College = {
  id: number;
  name: string;
  state: string;
  city: string;
  admissionRate: number;
  studentSize: number;
  costAttendance: string;
  netPrice: number;
  pellGrantRate: number;
  fedLoanRate: number;
  debt: number;
  url: string;
  calculator: string;
};

// Build the API base URL using the API key
const API_KEY = process.env.VITE_COLLEGE_API_KEY;
const API_BASE_URL = `https://api.data.gov/ed/collegescorecard/v1/schools.json?api_key=${API_KEY}&latest.cost.avg_net_price.overall__not=null&sort=school.name`;

export const fetchColleges = async (
    query: string, 
    page: number, 
    pageSize: number,
    state: string | null = null,
    netPrice: string | null = null,
): Promise<{ colleges: College[], total: number }> => {
    try {
        const queryParams = new URLSearchParams({
            _fields: 
                "id,school.name,school.state,school.city,latest.admissions.admission_rate.overall,latest.student.size,latest.cost.attendance.academic_year,latest.cost.avg_net_price.overall,latest.aid.pell_grant_rate,latest.aid.federal_loan_rate,latest.aid.median_debt_suppressed.overall,latest.school.school_url,latest.school.price_calculator_url",
            per_page: pageSize.toString(),
            page: page.toString(),
        });

        if (query) {
            queryParams.append("school.name", query);
        }

        if (state) {
            queryParams.append("school.state", state);
        }

        if (netPrice) {
            if(netPrice === "Below $5,000") {
                queryParams.append("latest.cost.avg_net_price.overall__range", "0..4999");
            } else if(netPrice === "30,000 & above") {
                queryParams.append("latest.cost.avg_net_price.overall__range", "30000..");
            } else {
                const [minPrice, maxPrice] = netPrice.split("-").map(price => parseInt(price.replace("$", "").replace(",", "")));
                queryParams.append("latest.cost.avg_net_price.overall__range", `${minPrice}..${maxPrice}`);
            }
        }

        // Send a GET request to the API base URL with the query parameters
        const response = await axios.get(API_BASE_URL, { params: queryParams });
        const data = response.data;
            
        // Map the returned data to an array
        const colleges = data.results
            .map((result: any): College => ({
                id: result.id,
                name: result["school.name"],
                state: result["school.state"],
                city: result["school.city"],
                admissionRate: result["latest.admissions.admission_rate.overall"],
                studentSize: result["latest.student.size"],
                costAttendance: result["latest.cost.attendance.academic_year"],
                netPrice: result["latest.cost.avg_net_price.overall"],
                pellGrantRate: result["latest.aid.pell_grant_rate"],
                fedLoanRate: result["latest.aid.federal_loan_rate"],
                debt: result["latest.aid.median_debt_suppressed.overall"],
                url: result["latest.school.school_url"],
                calculator: result["latest.school.price_calculator_url"],
        }));

        return { colleges, total: data.metadata.total };
      
    } catch(error: AxiosError | any) {
        console.log(error.message);
        return { colleges: [], total: 0 };
    }
};
