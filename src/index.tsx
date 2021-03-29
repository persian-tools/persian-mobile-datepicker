import React from 'react';
// Global Components
import Sheet from 'react-modal-sheet';
// Local Components
import { WheelPicker } from './components/WheelPicker';
// Utilities
import { digitsEnToFa } from '@persian-tools/persian-tools';
// Types
import type { PickerProps } from './index.types';
import { DateConfig } from './components/WheelPicker/index.types';

const Picker: React.FC<PickerProps> = (props) => {
  const [isOpen, setIsOpen] = React.useState<boolean>(true);
  const pickerConfig: DateConfig = {
    jyear: {
      caption: 'سال',
      formatter(value) {
        return value ? digitsEnToFa(value) : value;
      },
    },
    jmonth: {
      caption: 'ماه',
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
    },
  };
  return (
    <Sheet
      isOpen={isOpen}
      onClose={() => setIsOpen(false)}
      snapPoints={[300]}
      initialSnap={0}
    >
      <Sheet.Container>
        <Sheet.Header />
        <Sheet.Content disableDrag>
          <WheelPicker config={pickerConfig} prefix={props.classNamePrefix} />
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

export default Picker;
