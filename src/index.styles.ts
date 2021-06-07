import styled from 'styled-components';

export const SubmitButton = styled.button`
  width: 50%;
  height: 45px;
  color: #b7dfff;
  background-color: #1672eb;
  border-radius: 5px;
  border: none;
  display: inline-block;
  text-align: center;
  vertical-align: middle;
  user-select: none;
  padding: 0.375rem 0.75rem;
  font-size: 1rem;
  line-height: 1.5;
  -webkit-appearance: button;
  margin: 0 15px;
`;

export const CancelButton = styled(SubmitButton)`
  color: #626262;
  background-color: transparent;
  border: 1px solid #e6ecee;
`;

export const Footer = styled.div`
  position: absolute;
  bottom: 0;
  right: 2.5%;
  width: 95%;
  height: 55px;
  display: flex;
  justify-content: space-between;
  align-content: space-between;
  align-items: center;
`;
