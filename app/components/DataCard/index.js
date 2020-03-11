import styled from 'styled-components';

export const Div = styled.div`
  padding: 0.5rem 1rem,
  box-shadow: 0 1px 4px rgba(0,0,0,26);
  display: flex;
  width: 100%;
  height: 100%;  
`;

export const Li = styled.li`
  list-style-type: none;
  border-radius: 30px;
  border: 2px solid #73ad21;
  padding: 20px;
  width: 250px;
  height: 170px;
  margin: 25px;
  boxing-shadow: 0 1px 4px rgb(0, 0, 0, 26);
  justify-content: space-between;
  opacity: 0.5;
  background: linear-gradient(to top left, #33ccff 24%, #66ff99 73%);

  & : hover {
    opacity: 1;
  }
`;

export const Span = styled.span`
  padding: 15px;
  border-radius: 25px;
  margin: 20px 0;
`;
export const Img = styled.img`
  display: block;
  margin-left: auto;
  margin-right: auto;
  width: 50%;
`;
