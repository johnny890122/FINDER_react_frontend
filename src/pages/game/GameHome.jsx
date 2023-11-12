import { useState } from "react";
import styled from "@emotion/styled";
import { Button } from "@mui/material";
import { ForceGraph } from "./ForceGraph";

export const GameHome = () => {
  const [sessionInformation, setSessionInformation] = useState(null);

  const handleClick = async ({ difficulty }) => {
    // on local host: https://otree-react-a8c786bd154f.herokuapp.com to http://localhost:8000
    await fetch(
      "https://finder-django-backend-6331eb96b282.herokuapp.com/session/create",
      {
        method: "POST",
        body: JSON.stringify({ difficulty }),
      }
    ).then(async (res) => {
      const data = await res.json();
      setSessionInformation(data);
    });
  };

  if (!sessionInformation) {
    return (
      <StyledButtonsContainer>
        <Button onClick={() => handleClick({ difficulty: "easy" })}>
          Easy
        </Button>
        <Button onClick={() => handleClick({ difficulty: "medium" })}>
          Medium
        </Button>
        <Button onClick={() => handleClick({ difficulty: "hard" })}>
          Hard
        </Button>
      </StyledButtonsContainer>
    );
  }

  return (
    <StyledGamePageContainer>
      <StyledSessionInformationContainer>
        Difficulty: {sessionInformation.difficulty}
        <br />
        Session ID: {sessionInformation.sessionId}
      </StyledSessionInformationContainer>
      <StyledQuitButton onClick={() => setSessionInformation(null)}>
        Quit
      </StyledQuitButton>
      <ForceGraph />
    </StyledGamePageContainer>
  );
};

const StyledButtonsContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  height: 100vh;
`;
const StyledGamePageContainer = styled.div`
  padding: 2rem 4rem;
  position: relative;
`;
const StyledSessionInformationContainer = styled.div`
  font-size: 1.25rem;
  line-height: 2rem;
`;
const StyledQuitButton = styled(Button)`
  position: absolute;
  right: 4rem;
`;
