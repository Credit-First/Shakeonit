import React from "react";
import Carousel from "./carousel";
import styled from 'styled-components';
import Terms from "./terms"

const Container = styled.div`
    display : flex;
    width : 100%;

    @media only screen and (max-width: 1200px) {
        display : block;
    }
`

const Contain = styled.div`
    width : 40%;

    @media only screen and (max-width : 1200px) {
        margin-right : 0px;
        width : 100%
    }
`
const TermsContain = styled.div`
    width : 60%;
    display : flex;
    align-items : center;
    @media only screen and (max-width : 1200px) {
        width : 100%
    }
    
`

function BuyAndSell() {
    return (
        <Container>
            <Contain>
                <Carousel />
            </Contain>
            <TermsContain>
                <Terms />
            </TermsContain>
        </Container>
    )
}

export default BuyAndSell;