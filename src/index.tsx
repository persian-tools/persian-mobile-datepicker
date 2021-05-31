import React from 'react';
// Global Components
import Sheet from 'react-modal-sheet';
// Local Components
import { WheelPicker } from './components/WheelPicker';
// Utilities
import { digitsEnToFa } from '@persian-tools/persian-tools';
// Types
import { PickerProps } from './index.types';
import { DateConfig } from './components/WheelPicker/index.types';
import { SubmitButton, Footer, CancelButton } from './index.styles';
import { setDate } from './helpers/date';

const Picker: React.FC<PickerProps> = (props) => {
  const [isOpen, setIsOpen] = React.useState<boolean>(true);
  const pickerConfig = React.useMemo<DateConfig>(
    () => ({
      year: {
        caption: 'سال',
        formatter(value) {
          return value ? digitsEnToFa(value) : value;
        },
        shouldRender: (value) => value === 1400,
      },
      month: {
        caption: 'ماه',
        shouldRender: (value) => value >= 1 && value <= 7,
      },
      day: {
        formatter(value) {
          return value ? digitsEnToFa(value) : value;
        },
        caption: 'روز',
        classname: (value) => {
          if (typeof value === 'number' && (value % 7 === 0 || value % 6 === 0))
            return 'holiday';

          return '';
        },
        shouldRender: (value) => value >= 10 && value <= 30,
      },
    }),
    [],
  );

  return (
    <Sheet
      isOpen={isOpen}
      onClose={() => setIsOpen(false)}
      snapPoints={[350]}
      initialSnap={0}
    >
      <Sheet.Container>
        <Sheet.Header />
        <Sheet.Content disableDrag>
          <WheelPicker
            config={pickerConfig}
            prefix={props.classNamePrefix}
            minDate={props.minDate}
            maxDate={props.maxDate}
          />

          <Footer>
            <CancelButton>انصراف</CancelButton>
            <SubmitButton>تایید</SubmitButton>
          </Footer>
        </Sheet.Content>
      </Sheet.Container>
      <Sheet.Backdrop />
    </Sheet>
  );
};

Picker.defaultProps = {
  theme: 'android-light',
  classNamePrefix: 'persian-datepicker',
};

export { setDate };
export default Picker;
