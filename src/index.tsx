import React from 'react';
// Global Components
import Sheet from 'react-modal-sheet';
// Local Components
import { WheelPicker } from './components/WheelPicker';
// Types
import type { PickerProps } from './index.types';
import { SubmitButton, Footer, CancelButton } from './index.styles';
import { setDate } from './helpers/date';

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
      snapPoints={[350]}
      initialSnap={0}
    >
      <Sheet.Container>
        <Sheet.Header />
        <Sheet.Content disableDrag>
          <WheelPicker
            config={props.config}
            prefix={props.classNamePrefix}
            minDate={props.minDate}
            maxDate={props.maxDate}
            defaultValue={props.defaultValue}
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
  isOpen: false,
  theme: 'android-light',
  classNamePrefix: 'persian-datepicker',
};

export { setDate };
export default Picker;
export * from './components/WheelPicker/index.types';
