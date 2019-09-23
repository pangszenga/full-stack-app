// import React from 'react';

const UserSignOut = props => {
  const { context } = props;
  context.actions.signOut();

  props.history.push("/");
  return null;
};

export default UserSignOut;
