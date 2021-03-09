import React from 'react';
// Styles
import { GlobalStyle } from './styles';
// Types
import type { WheelPickerProps } from './index.types';

export const WheelPicker: React.FC<WheelPickerProps> = () => {
  return (
    <React.Fragment>
      <div className="wheelpicker shown" style={{ display: 'block' }}>
        <div className="wheelpicker-backdrop"></div>
        <div className="wheelpicker-panel">
          <div className="wheelpicker-actions">
            <button type="button" className="btn-cancel">
              بستن
            </button>
            <button type="button" className="btn-set">
              تایید
            </button>
            <h4 className="wheelpicker-title"></h4>
          </div>
          <div className="wheelpicker-main">
            <div className="wheelpicker-wheels">
              <div className="wheelpicker-wheel" style={{ height: 170 }}>
                <ul
                  className="wheelpicker-wheel-scroller"
                  style={{
                    transform: 'translate3d(0px, 0px, 0px)',
                    marginTop: 68,
                  }}
                >
                  <li className="wheelpicker-item ">1400</li>
                  <li className="wheelpicker-item wheelpicker-item-selected">
                    1399
                  </li>
                  <li className="wheelpicker-item">1398</li>
                  <li className="wheelpicker-item">1397</li>
                  <li className="wheelpicker-item">1396</li>
                  <li className="wheelpicker-item">1395</li>
                  <li className="wheelpicker-item">1394</li>
                  <li className="wheelpicker-item">1393</li>
                  <li className="wheelpicker-item">1392</li>
                  <li className="wheelpicker-item">1391</li>
                  <li className="wheelpicker-item">1390</li>
                </ul>
              </div>
              <div className="wheelpicker-wheel" style={{ height: 170 }}>
                <ul
                  className="wheelpicker-wheel-scroller"
                  style={{
                    transform: 'translate3d(0px, 0px, 0px)',
                    marginTop: 68,
                  }}
                >
                  <li className="wheelpicker-item wheelpicker-item-selected">
                    اسفند
                  </li>
                </ul>
              </div>
              <div className="wheelpicker-wheel" style={{ height: 170 }}>
                <ul
                  className="wheelpicker-wheel-scroller"
                  style={{
                    transform: 'translate3d(0px, 0px, 0px)',
                    marginTop: 68,
                  }}
                >
                  <li className="wheelpicker-item wheelpicker-item-selected">
                    19
                  </li>
                  <li className="wheelpicker-item">20</li>
                  <li className="wheelpicker-item">21</li>
                  <li className="wheelpicker-item">22</li>
                  <li className="wheelpicker-item">23</li>
                  <li className="wheelpicker-item">24</li>
                  <li className="wheelpicker-item">25</li>
                  <li className="wheelpicker-item">26</li>
                  <li className="wheelpicker-item">27</li>
                  <li className="wheelpicker-item">28</li>
                  <li className="wheelpicker-item">29</li>
                  <li className="wheelpicker-item">30</li>
                </ul>
              </div>
            </div>
            <div
              className="wheelpicker-mask wheelpicker-mask-top"
              style={{ height: 67 }}
            ></div>
            <div className="wheelpicker-mask wheelpicker-mask-current"></div>
            <div
              className="wheelpicker-mask wheelpicker-mask-btm"
              style={{ height: 67 }}
            ></div>
          </div>
        </div>
      </div>
      <GlobalStyle />
    </React.Fragment>
  );
};

WheelPicker.defaultProps = {
  data: [],
  visibleRows: 5,
  rowHeight: 34,
  parseValue(value) {
    return value.split(' ');
  },
  formatValue(value) {
    return value.join(' ');
  },
};
