import React from 'react';
// Global Components
import Sheet from 'react-modal-sheet';
// Local Components
import { WheelPicker } from './components/WheelPicker';
// Styled Components
import {
  StyledFooter,
  StyledSubmitButton,
  StyledCancelButton,
} from './index.styles';
// Types
import type { PickerProps } from './index.types';
import type { WheelPickerSelectEvent } from './components/WheelPicker/index.types';

const Picker: React.FC<PickerProps> = (props) => {
  const [isOpen, setIsOpen] = React.useState<boolean>(false);
  const [selectedDate, setSelectedDate] =
    React.useState<WheelPickerSelectEvent>();

  React.useEffect(() => {
    setIsOpen(props.isOpen);
  }, [props.isOpen]);

  function handleClose() {
    setIsOpen(false);
    props.onClose?.();
  }

  function handleOnChange(selected: WheelPickerSelectEvent) {
    setSelectedDate(selected);
    props.onChange?.(selected);
  }

  function handleSubmit() {
    handleClose();
    props.onSubmit(selectedDate!);
  }

  return (
    <Sheet
      isOpen={isOpen}
      onClose={() => handleClose()}
      snapPoints={[385 + (props.title ? 55 : 0)]}
      initialSnap={0}
    >
      <Sheet.Container>
        <Sheet.Header />
        <Sheet.Content disableDrag={props.disableSheetDrag}>
          <WheelPicker
            title={props.title}
            value={props.value}
            config={props.config}
            minDate={props.minDate}
            maxDate={props.maxDate}
            endYear={props.endYear}
            onChange={handleOnChange}
            startYear={props.startYear}
            addDayName={props.addDayName}
            initialValue={props.initialValue}
            classNamePrefix={props.classNamePrefix}
            highlightWeekends={props.highlightWeekends}
            highlightHolidays={props.highlightHolidays}
          />

          <StyledFooter>
            {props.showCancelButton && (
              <StyledCancelButton onClick={handleClose}>
                {props.cancelText}
              </StyledCancelButton>
            )}
            <StyledSubmitButton onClick={handleSubmit}>
              {props.submitText}
            </StyledSubmitButton>
          </StyledFooter>
        </Sheet.Content>
      </Sheet.Container>
      <Sheet.Backdrop />
    </Sheet>
  );
};

Picker.displayName = 'PersianTools(Picker)';
Picker.defaultProps = {
  isOpen: false,
  theme: 'android-light',
  classNamePrefix: 'persian-datepicker',
  submitText: 'تایید',
  cancelText: 'انصراف',
  showCancelButton: true,
  disableSheetDrag: true,
  addDayName: false,
};

export { Picker, WheelPicker };
export * from './helpers/date';
export type {
  DatePickerConfig,
  WheelPickerSelectEvent,
  WheelPickerProps,
  PickerColumnCaption,
  RequiredPickerExtraDateInfo,
  DateConfigTypes,
  PickerDateModel,
  DateConfigFormats,
  PickerColumns,
  PickerSelectedDateValue,
  PickerItemModel,
  RequiredPickerDateModel,
  PickerExtraDateInfo,
  DateConfigValuesModel,
} from './components/WheelPicker/index.types';
