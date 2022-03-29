import React from "react";

import classNames from 'classnames';

interface Props {
  loading: boolean
  passwordDescription: string;
  guessTimeStatement: string;
  suggestions: string[];
  warning: string;
}

function Footer(props: Props) {
  return (
    <div>
      <h4 className="placeholder-glow">
        <span className={classNames({ "d-none": props.loading })}>
          {props.passwordDescription}
        </span>
        <span className={classNames("placeholder", "col-9", {"d-none": !props.loading})}></span>
      </h4>
      <p className="mt-4 placeholder-glow">
        <span className={classNames({ "d-none": props.loading })}>
          <span>{props.guessTimeStatement} </span>
          <span>{props.warning}</span>
        </span>
        <span className={classNames({ "d-none": !props.loading })}>
          <span className="placeholder col-10"></span>
          <span className="placeholder col-8"></span>
        </span>
      </p>
      <p className="mt-4 placeholder-glow">
        <strong className={classNames({ "d-none": props.loading })}>
          {props.suggestions.map((suggestion, i) => (
            <span className="d-block" key={i}>
              {suggestion}
            </span>
          ))}
        </strong>
        <span className={classNames({ "d-none": !props.loading })}>
          <strong className="placeholder col-9"></strong>
          <strong className="placeholder col-5"></strong>
        </span>
      </p>
    </div>
  );
}

export default Footer;
