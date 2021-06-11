import React from 'react';
// Global Components
import Sheet from 'react-modal-sheet';
// Local Components
import { WheelPicker } from './components/WheelPicker';
// Styled Components
import {
  StyledSubmitButton,
  StyledFooter,
  StyledCancelButton,
} from './index.styles';
// Types
import type { PickerProps } from './index.types';

const Picker: React.FC<PickerProps> = (props) => {
  const [isOpen, setIsOpen] = React.useState<boolean>(false);

  React.useEffect(() => {
    setIsOpen(props.isOpen);
  }, [props.isOpen]);

  function handleClose() {
    setIsOpen(false);
    props.onClose?.();
  }

  return (
    <Sheet
      isOpen={isOpen}
      onClose={() => handleClose()}
      snapPoints={[380]}
      initialSnap={0}
    >
      <Sheet.Container>
        <Sheet.Header />
        <Sheet.Content disableDrag={props.disableSheetDrag}>
          <WheelPicker
            config={props.config}
            prefix={props.classNamePrefix}
            minDate={props.minDate}
            maxDate={props.maxDate}
            defaultValue={props.defaultValue}
            highlightWeekends={props.highlightWeekends}
            endYear={props.endYear}
            startYear={props.startYear}
            onChange={props.onChange}
            disabled={props.disabled}
          />

          <StyledFooter>
            {props.showCancelButton && (
              <StyledCancelButton>{props.cancelText}</StyledCancelButton>
            )}
            <StyledSubmitButton>{props.submitText}</StyledSubmitButton>
          </StyledFooter>
        </Sheet.Content>
      </Sheet.Container>
      <Sheet.Backdrop />
    </Sheet>
  );
};

Picker.defaultProps = {
  isOpen: false,
  theme: 'android-light',
  classNamePrefix: 'persian-datepicker',
  submitText: 'تایید',
  cancelText: 'انصراف',
  disabled: false,
  showCancelButton: true,
  disableSheetDrag: true,
};

export { Picker, WheelPicker };
export * from './helpers/date';
export type {
  DateConfig,
  WheelPickerSelectEvent,
} from './components/WheelPicker/index.types';
