import { ModalWrapper } from './ModalWrapper';
import { getData } from '../../services/utils';
import React, { useEffect, useState } from 'react';
import authAxios from '../../services/authAxios';
import { API_URL } from '../../config';
import { JobOfferForm } from '../Forms/JobOfferForm';
import { useParams } from 'react-router-dom';
import tokenService from '../../services/tokenService';

export const EditJobOfferModal = ({ setShowModals, jobOffer }) => {
    const [formOfEmployments, setFormOfEmployments] = useState([]);
    const [workTypes, setWorkTypes] = useState([]);
    const { slug } = useParams();

    useEffect(() => {
        return () => {
            Promise.all([getData('/static-data/form-of-employments'), getData('/static-data/work-types')]).then(
                ([formOfEmployments, workTypes]) => {
                    setFormOfEmployments(formOfEmployments);
                    setWorkTypes(workTypes);
                },
            );
        };
    }, []);

    const request = async (data) => {
        return authAxios.patch(API_URL + '/job-offers/' + slug, data, {
            headers: {
                'Content-Type': 'application/merge-patch+json',
            },
        });
    };

    const afterSubmit = (data) => {
        window.location.href = '/profil/' + tokenService.getUserId() + '/twoje-oferty/' + data.data.slug;
        window.flash('Pomyślnie edytowano oferte pracy', 'success');
    };

    return (
        <ModalWrapper
            title={'Edytuj informacje o zleceniu'}
            prop={'editOfferModal'}
            setShowModals={setShowModals}
            type={'edit'}
        >
            <JobOfferForm
                employmentOptions={formOfEmployments}
                workTypeOptions={workTypes}
                jobOffer={jobOffer}
                buttonName={'Edytuj'}
                request={request}
                afterSubmit={afterSubmit}
            />
        </ModalWrapper>
    );
};
