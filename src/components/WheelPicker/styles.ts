import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
.wheelpicker {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: none;
  z-index: 77;
}

.wheelpicker-backdrop {
  transform: translateZ(0);
  transition: 0.4s;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  opacity: 0;
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
}

.wheelpicker-panel {
  transition: 0.4s;
  transform: translate3d(0, 100%, 0);
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  background: #f7f7f7;
  font-size: 16px;
  color: #000;
  user-select: none;
}

.wheelpicker-actions {
  overflow: hidden;
  border-bottom: 1px solid #c6c6c6;
}

.wheelpicker-actions button {
  font-size: 14px;
  color: inherit;
  border: none;
  background: none;
  padding: 0 1em;
  height: 44px;
}

.wheelpicker-actions .btn-cancel {
  float: left;
}

.wheelpicker-actions .btn-set {
  float: right;
  color: #1078fc;
  font-weight: bold;
}

.wheelpicker-title {
  text-align: center;
  font-size: 1em;
  line-height: 44px;
  margin: 0;
}

.wheelpicker-main {
  position: relative;
  background: #fff;
}

.wheelpicker-wheels {
  display: flex;
  justify-content: center;
}

.wheelpicker-wheel {
  flex: 1 auto;
  position: relative;
  overflow: hidden;
}

.wheelpicker-wheel-scroller {
  overflow: hidden;
  margin: 0;
  padding: 0;
  list-style: none;
}

.wheelpicker-item {
  cursor: pointer;
  height: 34px;
  line-height: 34px;
  text-align: center;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.wheelpicker-item-disabled {
  cursor: default;
  cursor: not-allowed;
  pointer-events: none;
  opacity: 0.5;
}

.wheelpicker-item-selected {
  cursor: default;
}

.wheelpicker-mask {
  position: absolute;
  left: 0;
  width: 100%;
  pointer-events: none;
  transform: translateZ(0);
}

.wheelpicker-mask-top {
  top: 0;
  height: 50%;
  background: linear-gradient(to bottom, #fff, rgba(255, 255, 255, 0.5) 75%);
}

.wheelpicker-mask-btm {
  bottom: 0;
  height: 50%;
  background: linear-gradient(to top, #fff, rgba(255, 255, 255, 0.5) 75%);
}

.wheelpicker-mask-current {
  height: 34px;
  top: 50%;
  margin-top: -18px;
  border-top: 1px solid #c6c6c6;
  border-bottom: 1px solid #c6c6c6;
}

.wheelpicker.shown .wheelpicker-backdrop {
  opacity: 1;
}

.wheelpicker.shown .wheelpicker-panel {
  transform: none;
}
`;
