import getRelationalFieldForEntity from '../../introspection/getRelationFieldForEntity';

export default (entityName, entityData = []) => {
    const items = getRelationalFieldForEntity(entityName, entityData);

    return items;
};
