import React from 'react';
import Input from '@mui/material/Input';
import Button from '@mui/material/Button';
import './Menu3.css';

function Menu3() {
    return (
      <div className="App">
        <header className="App-header">
          <div className="form-container">
            <div className="form-header">
              <h1>Form Title</h1>
              <div className="buttons">
                <button>저장</button>
                <button>삭제</button>
              </div>
            </div>
            <form>
              <label>
                CODE ID
                <input type="text" name="codeId" />
              </label>
              <label>
                Order Num
                <input type="number" name="orderNum" />
              </label>
              <label>
                Korean
                <input type="text" name="korean" />
              </label>
              <label>
                English
                <input type="text" name="english" />
              </label>
              <label>
                Description
                <textarea name="description" />
              </label>
            </form>
          </div>
        </header>
      </div>
    );
  }

export default Menu3;