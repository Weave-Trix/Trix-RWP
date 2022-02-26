import styled from "styled-components";
import Navbar from "../components/Navbar";
import Newsletter from "../components/Newsletter";
import Footer from "../components/Footer";
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DateSelector from "../components/DateSelector";
import EventListAll from '../components/EventListAll';


const Container = styled.div``;

const Title = styled.div`
  font-size: 37px;
  font-weight: bolder;
  margin: 10px;
  margin-top: 30px;
  text-align: center;
`

const FilterContainer = styled.div`
  display: flex;
  justify-content: space-between;
  
`;

const DateContainer = styled.div`
  padding: 10px;
  margin-right: 20px;
  display: flex;
`

const DateSelectorContainer = styled.div`
  padding: 10px;
`

const Filter = styled.div`
  margin: 20px;
`;

const FilterText = styled.span`
  font-size: 20px;
  font-weight: 600;
  margin-right: 20px;
`;

const Select = styled.select`
  padding: 10px;
  margin-right: 20px;
  border-radius: 5%;
`;

const Option = styled.option``;

const Events = () => {
    const currDate = new Date();
    const tillDate = new Date();
    const currYear = currDate.getFullYear();
    tillDate.setFullYear(currYear + 1);
    const fromDateInfo = { title: "FROM", date: currDate };
    const toDateInfo = { title: "TO", date: tillDate };
    return (

        <LocalizationProvider dateAdapter={AdapterDateFns}>
            <Container>
                <Navbar />
                <Title>All Events</Title>
                <FilterContainer>
                    <DateContainer>
                        <DateSelectorContainer>
                            <DateSelector dateInfo={fromDateInfo} />
                        </DateSelectorContainer>
                        <DateSelectorContainer>
                            <DateSelector dateInfo={toDateInfo} />
                        </DateSelectorContainer>
                    </DateContainer>
                    <FilterContainer>
                    <Filter>
                        <FilterText>Sort Events</FilterText>
                        <Select>
                            <Option selected>Latest</Option>
                            <Option>Price (asc)</Option>
                            <Option>Price (desc)</Option>
                        </Select>
                    </Filter>
                    <Filter>
                        <FilterText>By</FilterText>
                        <Select>
                            <Option selected>
                                All Artist
                            </Option>
                            <Option>Yorushika</Option>
                            <Option>Zutomayo</Option>
                            <Option>Inori Minase</Option>
                            <Option>Rie Takahashi</Option>
                            <Option>Miku Itou</Option>
                            <Option>Sora Amamiya</Option>
                        </Select>
                    </Filter>
                    </FilterContainer>
                </FilterContainer>
                <EventListAll />
                <Newsletter />
                <Footer />
            </Container>

        </LocalizationProvider>
    );
};

export default Events;