import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { ComposedModal, ModalBody, ModalFooter, ModalHeader } from 'carbon-components-react';

import CheckboxList from './CheckboxList';
import { getRenderPropChildren } from './helperFunctions';

const renderDefaultHeader = ({ children, ...props }) => {
  return <ModalHeader {...props}>{children}</ModalHeader>;
};

const renderDefaultBody = ({ data, selectedIds, onChange, isLoading }) => (
  <ModalBody>
    <CheckboxList data={data} selectedIds={selectedIds} onChange={onChange} isLoading={isLoading} />
  </ModalBody>
);

const renderDefaultFooter = (props) => <ModalFooter {...props} />;

export const propTypes = {
  children: PropTypes.func,
  data: PropTypes.arrayOf(PropTypes.object),
  header: PropTypes.shape({
    label: PropTypes.node,
    title: PropTypes.node,
    helpText: PropTypes.node,
  }),
  footer: PropTypes.shape({
    onRequestSubmit: PropTypes.bool,
    onRequestClose: PropTypes.bool,
    primaryButtonText: PropTypes.string,
    primaryButtonDisabled: PropTypes.bool,
    secondaryButtonText: PropTypes.string,
  }),
  isLoading: PropTypes.bool,
  onSubmit: PropTypes.func.isRequired,
};

export const defaultProps = {
  children: undefined,
  data: [],
  footer: {
    secondaryButtonText: 'Cancel',
    primaryButtonText: 'OK',
  },
  header: {
    title: 'I am a default value',
  },
  isLoading: false,
};

const ArchetypeModal = ({
  children,
  data,
  header: headerProps,
  footer: footerProps,
  isLoading,
  onSubmit: onSubmitProp,
}) => {
  const [selectedIds, setSelectedIds] = useState([]);

  const onSubmit = () => {
    // This is done to stay data agnostic
    const selectedDataObjects = selectedIds.map((selectedId) =>
      data.find((dataObj) => JSON.stringify(dataObj) === selectedId)
    );
    onSubmitProp(selectedDataObjects);
  };

  const onCheckboxChange = (check, checkboxValueId) => {
    setSelectedIds((prev) =>
      check ? [...prev, checkboxValueId] : prev.filter((id) => id !== checkboxValueId)
    );
  };

  // CREATE PROPS FOR THE RENDER-PROPS
  // This is a single source of truth to guarantee that the internal
  // and external renderprops can render the same thing
  const modifiedCheckboxListProps = { data, selectedIds, onChange: onCheckboxChange, isLoading };
  const modifiedFooterProps = {
    ...footerProps,
    onRequestSubmit: onSubmit,
    primaryButtonDisabled: !selectedIds.length || isLoading,
  };

  // RENDER THE CHILD RENDER-PROP
  // We render the main child prop and extract the subcomponents based on their positions.
  // We are using the children-prop but could just as well have used normal render
  // props for these sub components.
  const [modalHeader, modalBody, modalFooter] = getRenderPropChildren(
    {
      // These props will be exposed to the child render prop
      checkboxListProps: modifiedCheckboxListProps,
      footerProps: modifiedFooterProps,
      headerProps,
    },
    children
  );

  // The returning JSX stays small and easy to read
  return (
    <ComposedModal open>
      {modalHeader || renderDefaultHeader(headerProps)}
      {modalBody || renderDefaultBody(modifiedCheckboxListProps)}
      {modalFooter || renderDefaultFooter(modifiedFooterProps)}
    </ComposedModal>
  );
};

ArchetypeModal.defaultProps = defaultProps;
ArchetypeModal.propTypes = propTypes;
export { ModalHeader, ModalBody, ModalFooter, ArchetypeModal };
