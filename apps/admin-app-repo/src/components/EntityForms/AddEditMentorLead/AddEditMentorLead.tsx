// @ts-nocheck
import React, { useState, useEffect, useRef } from 'react';
import Form from '@rjsf/mui';
import validator from '@rjsf/validator-ajv8';
import axios from 'axios';
import DynamicForm from '@/components/DynamicForm/DynamicForm';
import Loader from '@/components/Loader';
import { useTranslation } from 'react-i18next';
import { showToastMessage } from '../../Toastify';
import { TelemetryEventType } from '@/utils/app.constant';
import { telemetryFactory } from '@/utils/telemetry';
import { createUser, updateUser } from '@/services/CreateUserService';

const AddEditMentorLead = ({
  SuccessCallback,
  schema,
  uiSchema,
  editPrefilledFormData,
  isEdit,
  editableUserId,
  UpdateSuccessCallback,
}) => {
  const [isLoading, setIsLoading] = useState(false);

  const [prefilledFormData, setPrefilledFormData] = useState(
    editPrefilledFormData
  );

  const { t, i18n } = useTranslation();
  const extraFieldsUpdate = {};
  const extraFields = {
    tenantCohortRoleMapping: [
      {
        tenantId: '6c8b810a-66c2-4f0d-8c0c-c025415a4414',
        roleId: 'c4454929-954e-4c51-bb7d-cca834ab9375',
      },
    ],
    username: 'youthnetmentorlead',
    password: Math.floor(10000 + Math.random() * 90000),
  };

  const FormSubmitFunction = async (formData: any, payload: any) => {
    setPrefilledFormData(formData);
    if (isEdit) {
      try {
        // console.log('Payload', payload);
        const splitUserData = (payload) => {
          const { customFields, ...userData } = payload;
          return { userData, customFields };
        };
        const { userData, customFields } = splitUserData(payload);
        delete userData?.email;
        // console.log('userData', userData);
        // console.log('customFields', customFields);
        const object = {
          userData: userData,
          customFields: customFields,
        };
        const updateUserResponse = await updateUser(editableUserId, object);
        // console.log('updatedResponse', updateUserResponse);

        if (
          updateUserResponse &&
          updateUserResponse?.data?.params?.err === null
        ) {
          showToastMessage(
            t('MENTOR.MENTOR_LEAD_UPDATED_SUCCESSFULLY'),
            'success'
          );

          const windowUrl = window.location.pathname;
          const cleanedUrl = windowUrl.replace(/^\//, '');
          const env = cleanedUrl.split('/')[0];

          const telemetryInteract = {
            context: {
              env: env,
              cdata: [],
            },
            edata: {
              id: 'youthnet-mentor-lead-updated-successfully',
              type: TelemetryEventType.CLICK,
              subtype: '',
              pageid: cleanedUrl,
            },
          };

          telemetryFactory.interact(telemetryInteract);
          UpdateSuccessCallback();
          // localStorage.removeItem('BMGSData');
        } else {
          showToastMessage(t('MENTOR.NOT_ABLE_UPDATE_MENTOR_LEAD'), 'error');
        }
      } catch (error) {
        console.error('Error update mentor lead:', error);
        showToastMessage(t('MENTOR.NOT_ABLE_UPDATE_MENTOR_LEAD'), 'error');
      }
    } else {
      //Manually setting userName as a email
      payload.username = formData.email;

      try {
        const mentorLeadData = await createUser(payload, t);

        if (mentorLeadData && mentorLeadData?.userData?.userId) {
          showToastMessage(
            t('MENTOR.MENTOR_LEAD_CREATED_SUCCESSFULLY'),
            'success'
          );

          const windowUrl = window.location.pathname;
          const cleanedUrl = windowUrl.replace(/^\//, '');
          const env = cleanedUrl.split('/')[0];

          const telemetryInteract = {
            context: {
              env: env,
              cdata: [],
            },
            edata: {
              id: 'youthnet-mentor-lead-created-successfully',
              type: TelemetryEventType.CLICK,
              subtype: '',
              pageid: cleanedUrl,
            },
          };

          telemetryFactory.interact(telemetryInteract);
          SuccessCallback();
          // localStorage.removeItem('BMGSData');
        } else {
          showToastMessage(t('MENTOR.NOT_ABLE_CREATE_MENTOR_LEAD'), 'error');
        }
      } catch (error) {
        console.error('Error creating mentor lead:', error);
        showToastMessage(t('MENTOR.NOT_ABLE_CREATE_MENTOR_LEAD'), 'error');
      }
    }
  };

  return (
    <>
      {isLoading ? (
        <>
          <Loader />
        </>
      ) : (
        schema &&
        uiSchema && (
          <DynamicForm
            schema={schema}
            uiSchema={uiSchema}
            t={t}
            FormSubmitFunction={FormSubmitFunction}
            prefilledFormData={prefilledFormData || {}}
            extraFields={isEdit ? extraFieldsUpdate : extraFields}
          />
        )
      )}
    </>
  );
};

export default AddEditMentorLead;
