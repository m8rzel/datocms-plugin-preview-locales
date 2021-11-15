import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import Main from './Main';

const Root = ({ plugin }) => {
  const [state, setState] = useState({
    developmentMode: plugin.parameters.global.developmentMode,
    fieldValue: plugin.getFieldValue(plugin.fieldPath),
    previewLinks: plugin.parameters.global.previewLinks,
    fieldName: plugin.parameters.instance.fieldName,
    prefix: plugin.parameters.instance.prefix,
    defaultLink: plugin.parameters.global.defaultLink,
  });

  useEffect(() => {
    const unsubscribe = plugin.addFieldChangeListener(plugin.fieldPath, () => {
      setState({
        developmentMode: plugin.parameters.global.developmentMode,
        fieldValue: plugin.getFieldValue(plugin.fieldPath),
        previewLinks: plugin.parameters.global.previewLinks,
        fieldName: plugin.parameters.instance.fieldName,
        prefix: plugin.parameters.instance.prefix,
        defaultLink: plugin.parameters.global.defaultLink,
      });
    });

    return () => {
      unsubscribe();
    };
  }, []);

  return <Main plugin={plugin} {...state} />;
};

Root.propTypes = {
  plugin: PropTypes.object.isRequired,
};

export default Root;
