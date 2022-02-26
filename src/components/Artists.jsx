import { Grid, ListItem } from "@mui/material";
import styled from "styled-components";
import { categories } from "../data";
import ArtistCard from "./ArtistCard";
import { style } from '@mui/system';

const Container = styled.div`
  padding-left: 9vw;
  padding-right: 9vw;
  padding-bottom: 140px;
`;

const TitleContainer = styled.div`
  margin-top: 100px;
  padding: 0.5vw;
  text-align: center;
  display: flex;
  flex-direction: column; 
`

const Title = styled.text`
  font-size: 37px;
  font-weight: bolder;
  padding: 10px;
`

const Description = styled.text`
  font-size: 20px;
  padding: 4px;
`

const Artists = () => {
  return (
    <Container>
      <TitleContainer>
        <Title>
          Verified Artists
        </Title>
        <Description>
          These artists are VERIFIED by nobody.
        </Description>
        <Description>
          Feel FREE to get scammed  :)
        </Description>
      </TitleContainer>
      <Grid container spacing={{ xs: 2, md: 1 }} columns={{ xs: 4, sm: 8, md: 12 }} style={{ marginTop: "30px", view: "flex", justifyContent: "center" }}>
        {categories.map((item) => (
          <Grid item xs={4} sm={4} md={4} key={item.id} style={{ display: "flex", justifyContent: "center" }}>
            <ArtistCard item={item} key={item.id} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default Artists;