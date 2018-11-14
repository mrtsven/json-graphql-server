import getRelationalFieldForEntity from "../../introspection/getRelationFieldForEntity";

export default (entityName, entityData = []) => (_, {}) => {
  const items = getRelationalFieldForEntity(entityName, entityData);

  return items;
};
