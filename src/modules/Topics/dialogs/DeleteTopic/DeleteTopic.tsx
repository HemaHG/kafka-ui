import React, { useContext, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  Modal,
  ModalVariant,
  Button,
  Text,
  AlertVariant,
  TextInput,
} from "@patternfly/react-core";
import { deleteTopic } from "@app/services";
import { ConfigContext, AlertContext } from "@app/contexts";
import { useRootModalContext } from "@app/components/RootModal";

export const DeleteTopic: React.FC = () => {
  const { store, hideModal } = useRootModalContext();
  const config = useContext(ConfigContext);
  const { t } = useTranslation();
  const { topicName, onDeleteTopic, refreshTopics } = store?.modalProps || {};
  const [verificationText, setVerificationText] = useState<string>("");
  const { addAlert } = useContext(AlertContext);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const onClose = () => {
    hideModal();
  };

  const onDelete = async () => {
    try {
      if (topicName) {
        setIsLoading(true);
        await deleteTopic(topicName, config).then(() => {
          addAlert(
            t("topic.topic_successfully_deleted", { name: topicName }),
            AlertVariant.success
          );
          onDeleteTopic && onDeleteTopic();
          refreshTopics && refreshTopics();
        });
      }
    } catch (err) {
      setIsLoading(false);
      addAlert(err.response.data.error_message, AlertVariant.danger);
    }
    onClose();
  };

  const handleVerificationTextChange = (value) => {
    setVerificationText(value);
  };

  return (
    <Modal
      variant={ModalVariant.small}
      isOpen={true}
      aria-label={t("topic.delete_modal_title")}
      title={t("topic.delete_modal_title")}
      titleIconVariant="warning"
      showClose={true}
      aria-describedby="modal-message"
      onClose={onClose}
      actions={[
        <Button
          variant="danger"
          onClick={onDelete}
          key={1}
          data-testid="modalDeleteTopic-buttonDelete"
          isDisabled={verificationText.toUpperCase() != "DELETE"}
          isLoading={isLoading}
        >
          {t("common.delete")}
        </Button>,
        <Button variant="link" onClick={onClose} key={2}>
          {t("common.cancel")}
        </Button>,
      ]}
    >
      <Text id="modal-message">
        {" "}
        <label
          htmlFor="instance-name-input"
          dangerouslySetInnerHTML={{
            __html: t("common.confirm_delete_modal_text", { name: topicName }),
          }}
        />
      </Text>

      <br />
      <label htmlFor="delete-text-input">{t("common.confirm_delete")}</label>
      <TextInput
        value={verificationText}
        id="delete-text-input"
        name="delete-text-input"
        type="text"
        onChange={handleVerificationTextChange}
        autoFocus={true}
      />
    </Modal>
  );
};
