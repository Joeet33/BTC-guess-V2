/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getScore = /* GraphQL */ `
  query GetScore($id: ID!) {
    getScore(id: $id) {
      id
      score
      createdAt
      updatedAt
      owner
    }
  }
`;
export const listScores = /* GraphQL */ `
  query ListScores(
    $filter: ModelScoreFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listScores(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        score
        createdAt
        updatedAt
        owner
      }
      nextToken
    }
  }
`;
