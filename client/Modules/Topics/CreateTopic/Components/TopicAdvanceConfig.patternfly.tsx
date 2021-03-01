import React from 'react';
import {
  ActionGroup,
  Button,
  Divider,
  Grid,
  GridItem,
  JumpLinks,
  JumpLinksItem,
  PageGroup,
  PageSection,
  Text,
  TextContent,
  TextVariants,
} from '@patternfly/react-core';
import './CreateTopicWizard.patternfly.css';

import { MessageSection } from './MessageSection.patternfly';
import { CoreConfiguration } from './CoreConfiguration.patternfly';
import { LogSection } from './LogSection.patternfly';
import { ReplicationSection } from './ReplicationSection.patternfly';
import { IndexSection } from './IndexSection.patternfly';
import { FlushSection } from './FlushSection.patternfly';
import { CleanupSection } from './CleanupSection.patternfly';

interface ITopicAdvanceConfig {
  isCreate: boolean;
  saveTopic: () => void;
}

export const TopicAdvanceConfig: React.FunctionComponent<ITopicAdvanceConfig> = ({
  isCreate,
  saveTopic,
}) => {
  const actionText = isCreate === true ? 'Create Topic' : 'Save';

  return (
    <>
      <Grid hasGutter>
        <GridItem span={2} style={{ padding: '30px 30px' }}>
          <JumpLinks
            isVertical
            label='JUMP TO SECTION'
            scrollableSelector='#advanced-create-topic'
            style={{ position: 'absolute' }}
          >
            <JumpLinksItem key={0} href='#core-configuration'>
              Core configuration
            </JumpLinksItem>
            <JumpLinksItem key={1} href='#messages'>
              Messages
            </JumpLinksItem>
            <JumpLinksItem key={2} href='#log'>
              Log
            </JumpLinksItem>
            <JumpLinksItem key={3} href='#replication'>
              Replication
            </JumpLinksItem>
            <JumpLinksItem key={4} href='#cleanup'>
              Cleanup
            </JumpLinksItem>
            <JumpLinksItem key={5} href='#index'>
              Index
            </JumpLinksItem>
            <JumpLinksItem key={6} href='#flush'>
              Flush
            </JumpLinksItem>
            {isCreate ? (
              <></>
            ) : (
              <JumpLinksItem key={7} href='#delete'>
                Delete
              </JumpLinksItem>
            )}
          </JumpLinks>
        </GridItem>
        <GridItem span={10} style={{ padding: '30px 30px' }}>
          <div>
            <PageGroup
              hasOverflowScroll
              id='advanced-create-topic'
              className='topics-wizard-content'
            >
              <PageSection>
                <CoreConfiguration />

                <MessageSection />

                <LogSection />

                <ReplicationSection />

                <CleanupSection />

                <IndexSection />

                <FlushSection />

                <ActionGroup>
                  <Button onClick={saveTopic} variant='primary'>
                    {actionText}
                  </Button>
                  <Button variant='link'>Cancel</Button>
                </ActionGroup>

                {isCreate ? (
                  <></>
                ) : (
                  <>
                    <br />
                    <Divider />
                    <br />
                    <br />
                    <TextContent className='section-margin'>
                      <Text
                        component={TextVariants.h2}
                        tabIndex={-1}
                        id='delete'
                      >
                        Delete topic (irreversible)
                      </Text>
                      <Text component={TextVariants.p}>
                        This permanently removes this topic from this instance
                        of Strimzi. Applications will no longer have access to
                        this topic.
                      </Text>
                    </TextContent>
                    <br />
                    <Button variant='danger' className='section-margin'>
                      Delete topic
                    </Button>
                  </>
                )}
              </PageSection>
            </PageGroup>
          </div>
        </GridItem>
      </Grid>
    </>
  );
};
