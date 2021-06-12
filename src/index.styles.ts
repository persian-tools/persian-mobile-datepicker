import styled from 'styled-components';

export const StyledSubmitButton = styled.button`
  width: 140px;
  height: 48px;
  color: #c5dcfa;
  background: #1672ec;
  border-radius: 8px;
  border: none;
  display: inline-block;
  text-align: center;
  vertical-align: middle;
  user-select: none;
  padding: 0.375rem 0.75rem;
  font-size: 1rem;
  line-height: 1.5;
  -webkit-appearance: button;
  margin-right: 15px;
`;
StyledSubmitButton.displayName = 'PersianTools(Picker)(SubmitButton)';

export const StyledCancelButton = styled(StyledSubmitButton)`
  color: #616161;
  background-color: transparent;
  border: 1px solid #c0c0c0;
  margin-left: 15px;
`;
StyledCancelButton.displayName = 'PersianTools(Picker)(CancelButton)';

export const StyledFooter = styled.div`
  position: absolute;
  bottom: 0;
  right: 0;
  width: 100%;
  height: 70px;
  padding: 15px 0;
  display: flex;
  justify-content: space-between;
  align-content: center;
  align-items: center;
  border-top: 1px solid #e0e0e0;
`;
StyledFooter.displayName = 'PersianTools(Picker)(Footer)';
