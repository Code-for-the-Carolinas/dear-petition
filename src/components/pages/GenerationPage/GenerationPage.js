import React, { useState } from 'react';
import styled from 'styled-components';
import { GenerationPageStyled, GenerationContentStyled } from './GenerationPage.styled';
import { colorGrey } from '../../../styles/colors';
import { smallerThanTabletLandscape } from '../../../styles/media';

// Router
import { useParams } from 'react-router-dom';

import { useGetBatchQuery } from '../../../service/api';

// Children
import AttorneyInput from './GenerationInput/AttorneyInput';
import PetitionerInput from './GenerationInput/PetitionerInput';
import PetitionList from './PetitionList';

const DEFAULT_STATE_LABEL = { label: 'NC', value: 'NC' };

const REQUIRED_FIELDS = ['name', 'address1', 'city', 'state', 'zipCode'];

const GenerationSection = styled.div`
  padding: 2rem 0;
  margin-bottom: 2rem;

  & > h2 {
    user-select: none;
    margin-bottom: 2rem;
  }

  & > p {
    font-size: 1.6rem;
    margin-bottom: 2rem;
  }

  & > div > h3 {
    user-select: none;
    margin-bottom: 1rem;
  }
`;

const InputSectionStyled = styled(GenerationSection)`
  display: flex;
  border-bottom: 1px solid ${colorGrey};

  & > div:first-child {
    flex: 1 0 33%;
  }

  & > div:last-child {
    flex: 1 0 66%;
  }

  @media (${smallerThanTabletLandscape}) {
    flex-flow: column;
  }
`;

const InputSection = ({ children, label }) => (
  <InputSectionStyled>
    <div>
      <h3>{label}</h3>
    </div>
    <div>{children}</div>
  </InputSectionStyled>
);

function GenerationPage() {
  const { batchId } = useParams();
  const [attorney, setAttorney] = useState('');
  const [petitionerData, setPetitionerData] = useState({
    name: '',
    address1: '',
    address2: '',
    city: '',
    state: DEFAULT_STATE_LABEL,
    zipCode: '',
  });
  const [formErrors, setFormErrors] = useState({});
  const { data, isLoading } = useGetBatchQuery({ id: batchId });

  const validateInput = () => {
    let hasErrors = false;
    if (!attorney) {
      setFormErrors((oldErrors) => ({
        ...oldErrors,
        attorney: ['Please select an attorney'],
      }));
      hasErrors = true;
    }
    REQUIRED_FIELDS.forEach((key) => {
      if (!petitionerData[key]) {
        setFormErrors((oldErrors) => ({ ...oldErrors, [key]: ['This field is required'] }));
        hasErrors = true;
      }
    });
    return !hasErrors;
  };

  const clearError = (key) => {
    if (formErrors[key]) {
      setFormErrors((oldErrors) => ({ ...oldErrors, [key]: [] }));
    }
  };

  return (
    <GenerationPageStyled>
      {isLoading ? (
        <h3>Loading...</h3>
      ) : (
        <GenerationContentStyled>
          <InputSection label="Attorney Information">
            <AttorneyInput
              attorney={attorney}
              setAttorney={setAttorney}
              errors={formErrors}
              onClearError={clearError}
            />
          </InputSection>
          <InputSection label="Petitioner Information">
            <PetitionerInput
              petitionerData={petitionerData}
              setPetitionerData={setPetitionerData}
              errors={formErrors}
              onClearError={clearError}
            />
          </InputSection>
          <GenerationSection>
            <h2>Petition List</h2>
            <p>
              Click on the buttons below to generate petition forms and their attachments. Click on
              the &rsquo;View&rsquo; button to reveal a list of offense records.
            </p>
            {data && (
              <PetitionList
                petitions={data?.petitions || []}
                attorney={attorney}
                petitionerData={petitionerData}
                validateInput={validateInput}
                setFormErrors={setFormErrors}
              />
            )}
          </GenerationSection>
        </GenerationContentStyled>
      )}
    </GenerationPageStyled>
  );
}

export default GenerationPage;
