import React from 'react';
import styled from 'styled-components';
import Input from '../../../elements/Input/Input';
import Select from '../../../elements/Input/Select';
import US_STATES from '../../../../constants/US_STATES';

const Row = styled.div`
  display: flex;
  & > div {
    flex: 1;
  }
  & > div:not(:last-child) {
    margin-right: 1rem;
  }
`;

const TextInput = styled(Input)`
  input {
    padding: 0.9rem;
    width: 100%;
    background-color: ${(props) => props.disabled && 'hsl(0, 0%, 95%)'};
  }
  &:not(:last-child) {
    margin-bottom: 1rem;
  }
`;

export default function AddressInput({ address, setAddress, disabled, errors, onClearError }) {
  const { address1, address2, city, state, zipCode } = address;
  const handleChange = (key, value) => {
    if (disabled) return;
    setAddress((prev) => ({ ...prev, [key]: value }));
    onClearError(key);
  };
  return (
    <>
      <TextInput
        label="Address Line 1"
        disabled={disabled}
        value={address1}
        onChange={(e) => handleChange('address1', e.target.value)}
        errors={!disabled && errors.address1}
      />
      <TextInput
        label={disabled ? 'Address Line 2' : 'Address Line 2 (Optional)'}
        disabled={disabled}
        value={address2}
        onChange={(e) => handleChange('address2', e.target.value)}
      />
      <Row>
        <TextInput
          label="City"
          disabled={disabled}
          value={city}
          onChange={(e) => handleChange('city', e.target.value)}
          errors={!disabled && errors.city}
        />
        <Select
          label="State"
          disabled={disabled}
          value={state}
          onChange={(value) => handleChange('state', value)}
          options={US_STATES.map((s) => ({ value: s[0], label: s[0] }))}
          errors={!disabled && errors.state}
        />
        <TextInput
          label="Zip Code"
          disabled={disabled}
          value={zipCode}
          maxLength={5}
          onChange={(e) => handleChange('zipCode', e.target.value)}
          errors={!disabled && errors.zipCode}
        />
      </Row>
    </>
  );
}
