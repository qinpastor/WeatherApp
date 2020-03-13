import styled from 'styled-components';

export const StyledDiv = styled.div`
  padding: 0.5rem 1rem,
  box-shadow: 0 1px 4px rgba(0,0,0,26);
  width: 100%;
  height: 100%;  
`;

export const StyledLi = styled.li`
  list-style-type: none;
  border-radius: 30px;
  border: 2px solid #73ad21;
  display: inline-block;
  padding: 20px;
  width: 180px;
  height: 200px;
  margin: 5px;
  boxing-shadow: 0 1px 4px rgb(0, 0, 0, 26);
  justify-content: space-between;
  opacity: 1;
  background: linear-gradient(to top left, #33ccff 24%, #66ff99 73%);

  & : hover {
    opacity: 0.5;
  }
`;

export const StyledSpan = styled.span`
  padding: 15px;
  border-radius: 25px;
  margin: 20px 0;
`;

export const StyledSpan2 = styled.span`
   {
    position: absolute;
    right: 0;
    width: 100px;
    height: 120px;
  }
`;

export const StyledSpan3 = styled.span`
   {
    position: absolute;
    left: 0px;
    width: 200px;
    height: 120px;
    border: 0px solid blue;
  }
`;
export const StyledImg = styled.img`
  display: block;
  margin-left: auto;
  margin-right: auto;
  width: 50%;
`;
