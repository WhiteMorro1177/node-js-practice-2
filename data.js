const entities = [
    { id: 1, name: "entity_1" },
    { id: 2, name: "entity_2" },
    { id: 3, name: "entity_3" },
    { id: 4, name: "entity_4" },
    { id: 5, name: "entity_5" },
    { id: 6, name: "entity_6" },
    { id: 7, name: "entity_7" },
    { id: 8, name: "entity_8" },
    { id: 9, name: "entity_9" },
    { id: 10, name: "entity_10" },
];

const findById = (entityId) => { return entities.find(item => item.id === entityId).name }

const addEntity = (newEntity) => {
    entities.push(newEntity);
};

const updateEntity = (entityId, newEntityName) => { 
    const entityToUpdateIndex = entities.findIndex(item => item.id === entityId);
    entities.at(entityToUpdateIndex).name = newEntityName;
};

const removeEntity = (entityId) => { 
    const entityToDeleteIndex = entities.findIndex(item => item.id === entityId);
    entities.splice(entityToDeleteIndex, 1);
}



module.exports = {
    data: entities,
    find: findById,
    add: addEntity,
    update: updateEntity,
    remove: removeEntity
};