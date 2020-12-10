/*
 * Copyright Strimzi authors.
 * License: Apache License 2.0 (see the file LICENSE or http://apache.org/licenses/LICENSE-2.0.html).
 */
import { Then, Fusion } from 'jest-cucumber-fusion';
import { stepWithWorld } from 'test_common/commonServerSteps';
Then(
  'I get the expected mockapi test endpoint response',
  stepWithWorld((world) => {
    const { request } = world;
    return request.expect(418);
  })
);

Fusion('mockapi.feature');
