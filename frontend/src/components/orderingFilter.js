import React from "react";
import "../stylesheets/orderingFilter.css";
const OrderingFilter = (props) => {
  const { sortScores, setSortScores } = props;
  return (
    <div className="d-flex flex-row-reverse my-5">
      <details className="custom-select golden-text">
        <summary className="radios golden-text">
          <input
            type="radio"
            name="item"
            id="default"
            title={sortScores ? "Best developers" : "Every developer"}
            className="golden-text"
            defaultChecked
          ></input>
          <input
            type="radio"
            name="item"
            id="sorted"
            title="Best developers"
            onClick={() => {
              setSortScores(true);
            }}
            className="golden-text"
          ></input>
          <input
            type="radio"
            name="item"
            id="every"
            title="Every developer"
            onClick={() => {
              setSortScores(false);
            }}
            className="golden-text"
          ></input>
        </summary>
        <ul className="list">
          <li>
            <label htmlFor="sorted" className="golden-text">
              Best developers
            </label>
          </li>
          <li>
            <label htmlFor="every" className="golden-text">
              Every developer
            </label>
          </li>
        </ul>
      </details>
    </div>
  );
};

export default OrderingFilter;
