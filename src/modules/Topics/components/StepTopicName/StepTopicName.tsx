import React from "react";
import { useTranslation } from "react-i18next";
import {
  Form,
  FormGroup,
  TextContent,
  Text,
  TextVariants,
  TextInput,
  Stack,
} from "@patternfly/react-core";
import "../CreateTopicWizard/CreateTopicWizard.css";
export type StepTopicNameProps = {
  topicData: any;
  setTopicData: (value: any) => void;
  topicNameValidated: "error" | "default";
  setTopicNameValidated: (value: "error" | "default") => void;
  invalidText: string;
  setInvalidText: (value: string) => void;
};

export const StepTopicName: React.FC<StepTopicNameProps> = ({
  topicData,
  setTopicData,
  topicNameValidated,
  setTopicNameValidated,
  invalidText,
  setInvalidText,
}) => {
  const { t } = useTranslation();

  const topicNameInput = topicData && topicData["name"];

  const validationCheck = (topicNameInput) => {
    const regexpInvalid = new RegExp("^[0-9A-Za-z_-]+$");
    if (topicNameInput.length && !regexpInvalid.test(topicNameInput)) {
      setInvalidText(t("topic.topic_name_helper_text"));
      setTopicNameValidated("error");
    } else if (topicNameInput.length > 249) {
      setTopicNameValidated("error");
      setInvalidText(t("topic.cannot_exceed_characters"));
    } else setTopicNameValidated("default");
  };

  const handleTopicNameChange = (value) => {
    validationCheck(value);
    setTopicData({ ...topicData, name: value });
  };

  const preventFormSubmit = (event) => event.preventDefault();

  return (
    <Stack hasGutter className="kafka-ui--wizard-main-body__stack">
      <TextContent>
        <Text component={TextVariants.h2}>{t("topic.topic_name")}</Text>
        <Text component={TextVariants.p}>{t("topic.topic_name_info")}</Text>
        <Text component={TextVariants.small}>
          {t("topic.topic_name_info_note")}
        </Text>
      </TextContent>
      <Form onSubmit={preventFormSubmit}>
        <FormGroup
          label={t("topic.topic_name")}
          fieldId="step-topic-name-form"
          helperText={t("topic.topic_name_helper_text")}
          helperTextInvalid={invalidText}
          validated={topicNameValidated}
          isRequired
        >
          <TextInput
            isRequired
            type="text"
            id="step-topic-name-input"
            name="name"
            value={topicNameInput}
            onChange={handleTopicNameChange}
            placeholder={t("topic.enter_name")}
            validated={topicNameValidated}
          />
        </FormGroup>
      </Form>
    </Stack>
  );
};
