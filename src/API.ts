/* tslint:disable */
/* eslint-disable */
//  This file was automatically generated and should not be edited.

export type CreateScoreInput = {
  id?: string | null,
  score: number,
};

export type ModelScoreConditionInput = {
  score?: ModelIntInput | null,
  and?: Array< ModelScoreConditionInput | null > | null,
  or?: Array< ModelScoreConditionInput | null > | null,
  not?: ModelScoreConditionInput | null,
};

export type ModelIntInput = {
  ne?: number | null,
  eq?: number | null,
  le?: number | null,
  lt?: number | null,
  ge?: number | null,
  gt?: number | null,
  between?: Array< number | null > | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
};

export enum ModelAttributeTypes {
  binary = "binary",
  binarySet = "binarySet",
  bool = "bool",
  list = "list",
  map = "map",
  number = "number",
  numberSet = "numberSet",
  string = "string",
  stringSet = "stringSet",
  _null = "_null",
}


export type Score = {
  __typename: "Score",
  id: string,
  score: number,
  createdAt: string,
  updatedAt: string,
  owner?: string | null,
};

export type UpdateScoreInput = {
  id: string,
  score?: number | null,
};

export type DeleteScoreInput = {
  id: string,
};

export type ModelScoreFilterInput = {
  id?: ModelIDInput | null,
  score?: ModelIntInput | null,
  and?: Array< ModelScoreFilterInput | null > | null,
  or?: Array< ModelScoreFilterInput | null > | null,
  not?: ModelScoreFilterInput | null,
};

export type ModelIDInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
  size?: ModelSizeInput | null,
};

export type ModelSizeInput = {
  ne?: number | null,
  eq?: number | null,
  le?: number | null,
  lt?: number | null,
  ge?: number | null,
  gt?: number | null,
  between?: Array< number | null > | null,
};

export type ModelScoreConnection = {
  __typename: "ModelScoreConnection",
  items:  Array<Score | null >,
  nextToken?: string | null,
};

export type CreateScoreMutationVariables = {
  input: CreateScoreInput,
  condition?: ModelScoreConditionInput | null,
};

export type CreateScoreMutation = {
  createScore?:  {
    __typename: "Score",
    id: string,
    score: number,
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
  } | null,
};

export type UpdateScoreMutationVariables = {
  input: UpdateScoreInput,
  condition?: ModelScoreConditionInput | null,
};

export type UpdateScoreMutation = {
  updateScore?:  {
    __typename: "Score",
    id: string,
    score: number,
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
  } | null,
};

export type DeleteScoreMutationVariables = {
  input: DeleteScoreInput,
  condition?: ModelScoreConditionInput | null,
};

export type DeleteScoreMutation = {
  deleteScore?:  {
    __typename: "Score",
    id: string,
    score: number,
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
  } | null,
};

export type GetScoreQueryVariables = {
  id: string,
};

export type GetScoreQuery = {
  getScore?:  {
    __typename: "Score",
    id: string,
    score: number,
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
  } | null,
};

export type ListScoresQueryVariables = {
  filter?: ModelScoreFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListScoresQuery = {
  listScores?:  {
    __typename: "ModelScoreConnection",
    items:  Array< {
      __typename: "Score",
      id: string,
      score: number,
      createdAt: string,
      updatedAt: string,
      owner?: string | null,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type OnCreateScoreSubscriptionVariables = {
  owner?: string | null,
};

export type OnCreateScoreSubscription = {
  onCreateScore?:  {
    __typename: "Score",
    id: string,
    score: number,
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
  } | null,
};

export type OnUpdateScoreSubscriptionVariables = {
  owner?: string | null,
};

export type OnUpdateScoreSubscription = {
  onUpdateScore?:  {
    __typename: "Score",
    id: string,
    score: number,
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
  } | null,
};

export type OnDeleteScoreSubscriptionVariables = {
  owner?: string | null,
};

export type OnDeleteScoreSubscription = {
  onDeleteScore?:  {
    __typename: "Score",
    id: string,
    score: number,
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
  } | null,
};
