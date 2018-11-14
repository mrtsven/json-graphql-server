import {
    isRelationalField,
    getReversedCollectionName,
    getRelatedKey,
} from '../nameConverter';
/**
  We get the entities and the all the data belonging to the entity
  We want to send back only the relational data in the following format
  E.g ->
  Data: User: [{}] Comments: [{}]

  Data:
{ users:
   [ { id: 123, name: 'John Doe', email: 'John@doe.com' },
     { id: 456, name: 'Jane Doe' } ],
  comments:
   [ { id: 987,
       post_id: 1,
       body: 'Consectetur adipiscing elit',
       date: 2017-07-03T00:00:00.000Z },
     { id: 995,
       post_id: 1,
       body: 'Nam molestie pellentesque dui',
       date: 2017-08-17T00:00:00.000Z } ] }
 */
export default (entityName, incomingData) => {
    const firstRowData = incomingData[getReversedCollectionName(entityName)][0];

    return Object.keys(firstRowData).reduce((result, key) => {
        if (isRelationalField(key)) {
            const collection = getRelatedKey(key);
            result[collection] = incomingData[collection];
        }

        return result;
    }, {});
};
