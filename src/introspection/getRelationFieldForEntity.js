import {
  isRelationalField,
  getReversedCollectionName,
  getRelatedKey
} from "../nameConverter";

/**
  We get the entities and the all the data belonging to the entity
  We want to send back only the relational data in the following format
  E.g ->
  getRelationaPostData: users: [{}]

  Data:
{ users:
   [ { id: 123, name: 'John Doe', email: 'John@doe.com' },
     { id: 456, name: 'Jane Doe' } ]
 */

export default (entityName, incomingData) => {
  //We get check only the first record if it contains a _id(Foreign Key). This is pretty dumb
  const firstRowData = incomingData[getReversedCollectionName(entityName)][0];

  return Object.keys(firstRowData).reduce((result, key) => {
    if (isRelationalField(key)) {
      const collection = getRelatedKey(key);
      result[collection] = incomingData[collection];
    }

    return result;
  }, {});
};
