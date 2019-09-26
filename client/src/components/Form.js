// F O R M - validation and handlers
//parent to this is UserSignUp
import React from "react";

export default props => {
  const { cancel, errors, submit, submitButtonText, elements } = props;

  //handle submit
  function handleSubmit(event) {
    event.preventDefault();
    submit();
  }

  //handle cancel
  function handleCancel(event) {
    event.preventDefault();
    cancel();
  }

  //validation errors
  function ErrorsDisplay({ errors }) {
    let errorsDisplay = null;

    if (errors.length) {
      errorsDisplay = (
        <div>
          <h2 className="validation--errors--label">Validation errors</h2>
          <div className="validation-errors">
            <ul>
              {errors.map((error, i) => (
                <li key={i}>{error.msg}</li>
              ))}
            </ul>
          </div>
        </div>
      );
    }

    return errorsDisplay;
  }

  return (
    <div>
      <ErrorsDisplay errors={errors} />
      <form onSubmit={handleSubmit}>
        {elements()}
        <div className="pad-bottom">
          <button className="button" type="submit">
            {submitButtonText}
          </button>
          <button className="button button-secondary" onClick={handleCancel}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};
