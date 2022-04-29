import React from 'react'
import styled from 'styled-components'
import '../../static/css/switch.css'


const Label = styled.label`
@media (max-width: 600px) {
  margin-right: 1rem;
};
@media (min-width: 600px) {
  margin-right: 2rem;
};
@media (min-width: 700px) {
  margin-right: 3rem;
};
@media (min-width: 900px) {
  margin-right: 4rem;
};
@media (min-width: 1200px) {
  margin-right: 1rem;
};
`

const Switch = (props) => {
     const {isChecked, toggleHandler} = props;
     return (
          <div className='switch'>
            <input
              type="checkbox"
              className = 'switch-checkbox'
              checked = {isChecked}
              onChange = {toggleHandler}
              id='switch-input'
            />
            <Label
               className='switch-label'
               htmlFor = 'switch-input'
               >
                 <div className="ball"/>
            </Label>
          </div>
     )
}

export default Switch;