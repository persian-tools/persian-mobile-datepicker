import styled from 'styled-components';

export const SubmitButton = styled.button`
  width: 170px;
  height: 45px;
  color: #fff;
  background-color: #28a745;
  border: 1px solid #28a745;
  display: inline-block;
  font-weight: 400;
  text-align: center;
  vertical-align: middle;
  user-select: none;
  padding: 0.375rem 0.75rem;
  font-size: 1rem;
  line-height: 1.5;
  border-radius: 0.25rem;
  -webkit-appearance: button;
  margin: 0 15px;
`;

export const CancelButton = styled(SubmitButton)`
  color: #fff;
  background-color: #dc3545;
  border-color: #dc3545;
`;

export const Footer = styled.div`
  position: absolute;
  bottom: 0;
  right: 0;
  width: 100%;
  height: 55px;
  display: flex;
  justify-content: space-between;
`;
