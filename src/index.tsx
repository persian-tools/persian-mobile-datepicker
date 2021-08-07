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
  StyledSheet,
  StyledSheetContainer,
  StyledSheetHeader,
  StyledSheetContent,
} from './index.styles';
// Helpers
import { prefixClassName } from './helpers';
// Types
import type { PickerProps, Theme } from './index.types';
import type { WheelPickerSelectEvent } from './components/WheelPicker/index.types';

const Picker: React.FC<PickerProps> = (props) => {
  // Local Variables
  const classNamePrefix = prefixClassName(props.classNamePrefix!);
  // Local States
  const [isOpen, setIsOpen] = React.useState<boolean>(false);
  const [selectedDate, setSelectedDate] =
    React.useState<WheelPickerSelectEvent>();
  const [theme, setTheme] = React.useState<Omit<Theme, 'auto'>>('light');

  React.useEffect(() => {
    if (props.theme === 'auto') {
      // Check for the first initialization
      if (
        window.matchMedia &&
        window.matchMedia('(prefers-color-scheme: dark)').matches
      ) {
        setTheme('dark');
      } else {
        setTheme('light');
      }

      // Watch native system theme changes
      window
        .matchMedia('(prefers-color-scheme: dark)')
        .addEventListener('change', (e) => {
          const newColorScheme = e.matches ? 'dark' : 'light';
          setTheme(newColorScheme);
        });
    } else {
      setTheme(props.theme!);
    }

    return () => {
      window
        .matchMedia('(prefers-color-scheme: dark)')
        .removeEventListener('change', (e) => {
          const newColorScheme = e.matches ? 'dark' : 'light';
          setTheme(newColorScheme);
        });
    };
  }, [props.theme]);

  React.useEffect(() => {
    setIsOpen(props.isOpen);
  }, [props.isOpen]);

  function handleCancel() {
    props.onCancel?.();
    handleClose();
  }

  function handleClose() {
    setIsOpen(false);
    props.onClose?.();
  }

  function handleOnChange(selected: WheelPickerSelectEvent) {
    setSelectedDate(selected);
    props.onChange?.(selected);
  }

  function handleSubmit() {
    props.onSubmit(selectedDate!);
    handleClose();
  }

  return (
    <StyledSheet
      isOpen={isOpen}
      onClose={() => handleCancel()}
      snapPoints={[props.height! + (props.title ? 55 : 0)]}
      initialSnap={0}
      theme={theme}
      className={classNamePrefix('sheet')}
    >
      <StyledSheetContainer className={classNamePrefix('sheet-container')}>
        <StyledSheetHeader
          disableDrag={props.disableSheetHeaderDrag}
          className={classNamePrefix('sheet-header')}
        />
        <StyledSheetContent
          disableDrag={props.disableSheetDrag}
          className={classNamePrefix('sheet-content')}
        >
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

          <StyledFooter className={classNamePrefix('sheet-footer')}>
            {props.showCancelButton && (
              <StyledCancelButton
                className={classNamePrefix('sheet-footer__cancel')}
                onClick={handleCancel}
              >
                {props.cancelText}
              </StyledCancelButton>
            )}
            <StyledSubmitButton
              fullWidth={!props.showCancelButton}
              className={classNamePrefix('sheet-footer__submit')}
              onClick={handleSubmit}
            >
              {props.submitText}
            </StyledSubmitButton>
          </StyledFooter>
        </StyledSheetContent>
      </StyledSheetContainer>
      <Sheet.Backdrop />
    </StyledSheet>
  );
};

Picker.displayName = 'PersianTools(Picker)';
Picker.defaultProps = {
  isOpen: false,
  theme: 'light',
  classNamePrefix: 'persian-datepicker',
  submitText: 'تایید',
  cancelText: 'انصراف',
  showCancelButton: true,
  disableSheetDrag: true,
  disableSheetHeaderDrag: false,
  addDayName: false,
  height: 385,
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
