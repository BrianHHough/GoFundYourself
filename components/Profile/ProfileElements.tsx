import styled from "styled-components"

export const ColumnCon = styled.div`
    display: flex;
`;

export const ColumnLeft = styled.div`
    width: 30%;
    /* min-height: 700px; */
    max-height: 1000px;
`;

export const ProgressStepper = styled.div`
    margin-left: 20px;
`;

export const ColumnRight = styled.div`
    width: 70%;
    /* min-height: 500px; */
    max-height: 1000px;
`;

export const ProfileEditsCon = styled.div`
    width: 600px;
    height: 400px;
    /* max-height: 600px; */
    border: 3px solid black;
    border-radius: 20px;
`;

export const ProfileEditsTitle = styled.div`
    font-size: 25pt;
    font-weight: 700;
    text-align: center;
`;

export const SaveProfileInformationCon = styled.div`
    width: 100%;

`;

export const SaveProfileInformation = styled.input`
    margin-left: 10px;
    margin-right: 10px;
    border: 4px solid black;
    padding: 10px 10px 10px 10px;
    width: 175px;
    border-radius: 20px;
    cursor: pointer;
    transition: all 0.2s ease-in-out;
    position: relative;
    left: 195px;
    top: 41px;
    text-align: center;
    &:hover {
      background: #e6e6e6;
      transition: all 0.2s ease-in-out;
      transform: scale(1.1);
    }
`;