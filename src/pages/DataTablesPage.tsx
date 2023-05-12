import React from 'react';
import { useTranslation } from 'react-i18next';
import { Tables } from '@app/components/tables/Tables/Tables';
import { PageTitle } from '@app/components/common/PageTitle/PageTitle';
import { BaseUpload } from '@app/components/common/BaseUpload/BaseUpload';
import { BaseButton } from '@app/components/common/BaseButton/BaseButton';
import { InboxOutlined, UploadOutlined } from '@ant-design/icons';
import { notificationController } from '@app/controllers/notificationController';
import styled from 'styled-components';
import { FONT_SIZE, FONT_WEIGHT } from '@app/styles/themes/constants';
import * as S from '@app/pages/uiComponentsPages//UIComponentsPage.styles';

const DraggerIconWrapper = styled.div`
  font-size: 4rem;
  color: var(--primary-color);
`;
const DraggerTitle = styled.div`
  font-size: ${FONT_SIZE.xl};
  font-weight: ${FONT_WEIGHT.bold};
`;
const DraggerDescription = styled.div`
  font-size: ${FONT_SIZE.md};
  padding: 0 1rem;
`;

const DataTablesPage: React.FC = () => {
  const uploadProps = {
    name: 'file',
    multiple: true,
    action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
    onChange: (info: any) => {
      const { status } = info.file;
      if (status !== 'uploading') {
        console.log(info.file, info.fileList);
      }
      if (status === 'done') {
        notificationController.success({ message: t('uploads.successUpload', { name: info.file.name }) });
      } else if (status === 'error') {
        notificationController.error({ message: t('uploads.failedUpload', { name: info.file.name }) });
      }
    },
  };

  const { t } = useTranslation();
  return (
    <>
      <PageTitle>{t('common.report')}</PageTitle>
      <S.Card title={'File Upload'} style={{ height: '40%' }}>
        <BaseUpload {...uploadProps}>
          <BaseButton icon={<UploadOutlined />}>{t('uploads.clickToUpload')}</BaseButton>
        </BaseUpload>
        <BaseUpload.Dragger {...uploadProps}>
          <DraggerIconWrapper>
            <InboxOutlined />
          </DraggerIconWrapper>
          <DraggerTitle>{t('uploads.dragUpload')}</DraggerTitle>
          <DraggerDescription>{t('uploads.bulkUpload')}</DraggerDescription>
        </BaseUpload.Dragger>
      </S.Card>
      <Tables />
    </>
  );
};

export default DataTablesPage;
