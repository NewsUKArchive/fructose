module.exports = component => {
  const key = component.props.fructoseID ? component.props.fructoseID : null;
  if (key === null) {
    throw new Error(
      "No fructoseID prop found on the component. Please add a fructoseID prop."
    );
  }
  return key;
};
