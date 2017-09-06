module.exports = component => {
  console.log('------------------------------------');
  console.log('COMPONENT: ', component);
  console.log('------------------------------------');

  const stringified = JSON.stringify(component);
  const removeTypeof = s => s.replace(/"\$\$typeof":.*?,/g, "");
  const removeStyleCode = s => s.replace(/"style":.*?,/g, "");
  const removeStyleObject = s => s.replace(/"style":{.*?},/g, "");
  return removeTypeof(removeStyleCode(removeStyleObject(stringified)));
};
