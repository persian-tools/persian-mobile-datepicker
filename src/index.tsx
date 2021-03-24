import React from 'react';
// Global Components
import Sheet from 'react-modal-sheet';
// Local Components
import { WheelPicker } from './components/WheelPicker';
// Types
import type { PickerProps } from './index.types';

const Picker: React.FC<PickerProps> = (props) => {
  const [isOpen, setIsOpen] = React.useState<boolean>(true);
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
          <WheelPicker prefix={props.classNamePrefix} data={[]} />
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
