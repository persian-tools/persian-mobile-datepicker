import styled from 'styled-components';
import Sheet from 'react-modal-sheet';
import { Theme } from './index.types';

export const StyledFooter = styled.div`
  position: absolute;
  bottom: 0;
  right: 0;
  width: 100%;
  height: 45px;
  padding: 15px 0;
  display: flex;
  justify-content: space-between;
  align-content: center;
  align-items: center;
  border-top: 1px solid #e0e0e0;
`;
StyledFooter.displayName = 'PersianTools(Picker)(Footer)';

const StyledButton = styled.button`
  height: 45px;
  color: #c5dcfa;
  background: #1672ec;
  border-radius: 8px;
  border: none;
  text-align: center;
  vertical-align: middle;
  user-select: none;
  padding: 0.375rem 0.75rem;
  font-size: 1rem;
  line-height: 1.5;
  -webkit-appearance: button;
  margin-right: 15px;
  margin-left: 15px;
`;
export const StyledSubmitButton = styled(StyledButton)<{ fullWidth: boolean }>`
  width: ${(props) => (props.fullWidth ? '100%' : '140px')};
  display: ${(props) => (props.fullWidth ? 'block' : 'inline-block')};
`;
StyledSubmitButton.displayName = 'PersianTools(Picker)(SubmitButton)';

export const StyledCancelButton = styled(StyledButton)`
  width: 140px;
  display: inline-block;
  color: #616161;
  background-color: transparent;
  border: 1px solid #c0c0c0;
  margin-left: 15px;
`;
StyledCancelButton.displayName = 'PersianTools(Picker)(CancelButton)';

export const StyledSheet = styled(Sheet)<{ theme: Theme }>`
  ${(props) => {
    if (props.theme === 'dark') {
      return `
        .react-modal-sheet-container {
          background-color: #222 !important;
        }
        .react-modal-sheet-backdrop {
          background-color: rgba(0, 0, 0, 0.3) !important;
        }
        .react-modal-sheet-drag-indicator {
          background-color: #666 !important;
        }
        .rmc-picker-mask {
          background-image: linear-gradient(
              to bottom,
              rgba(34, 34, 34, 0.95),
              rgba(34, 34, 34, 0.6)
            ),
            linear-gradient(to top, rgba(34, 34, 34, 0.95), rgba(34, 34, 34, 0.6));
        }
        .rmc-column-item-content {
          background: #313133;
          height: 30px;
          font-size: 15px;
          line-height: 30px;
          border-radius: 5px;
          color: #fff;
        }
        .rmc-picker-item-selected .rmc-column-item-content {
          background: #7048ec;
        }
        .sheet-footer {
          border-top: none;
          
          &__cancel {
            background: #313133;
            color: #fff;
            border: none;
          }
        }
      `;
    }

    return ``;
  }}
`;
StyledSheet.displayName = 'PersianTools(Picker)(Sheet)';

export const StyledSheetContainer = styled(Sheet.Container)<{
  className: string;
}>``;
StyledSheetContainer.displayName = 'PersianTools(Picker)(SheetContainer)';

export const StyledSheetHeader = styled(Sheet.Header)<{ className: string }>``;
StyledSheetHeader.displayName = 'PersianTools(Picker)(SheetHeader)';

export const StyledSheetContent = styled(Sheet.Content)<{
  className: string;
}>``;
StyledSheetContent.displayName = 'PersianTools(Picker)(SheetContent)';
