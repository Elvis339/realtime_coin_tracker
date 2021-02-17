export const mergeEntities = (
  state: { [key: string]: any },
  entities: any[]
) => {
  if (state) {
    entities.forEach((entity) => {
      if (entity && entity.id) {
        state[entity.id] = entity;
      }
    });
  }

  return state;
};
