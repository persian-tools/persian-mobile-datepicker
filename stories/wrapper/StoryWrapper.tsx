import React, { PropsWithChildren } from 'react';
import './StoryWrapper.css';
import '../assets/fonts/vazir.css';

const StoryWrapper = ({ children }: PropsWithChildren<{}>): JSX.Element => (
  <div className="story-wrapper">{children}</div>
);

export default StoryWrapper;
