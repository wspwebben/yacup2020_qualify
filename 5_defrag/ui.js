import { 
  goLeft, goDown, goRight, switchFigure, switchColor
} from './game';

import { render } from './map';

const andRender = (action) => {
  return () => {
    action();
    render();
  }
} 

export const initUI = () => {
  const buttonLeft = document.querySelector('.control_action_left')
  const buttonDown = document.querySelector('.control_action_down')
  const buttonRight = document.querySelector('.control_action_right')
  const buttonFigure = document.querySelector('.control_action_switch-figure')
  const buttonColor = document.querySelector('.control_action_switch-color')

  buttonLeft.addEventListener('click', andRender(goLeft));
  buttonDown.addEventListener('click', andRender(goDown));
  buttonRight.addEventListener('click', andRender(goRight));
  buttonFigure.addEventListener('click', andRender(switchFigure));
  buttonColor.addEventListener('click', andRender(switchColor));
};
