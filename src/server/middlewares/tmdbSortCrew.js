/**
 * Sort crew by departments
 * Assume input is the result of normalize(json, schemas.credits)
 */

module.exports = (credits) => {
  const crewIds = credits.result.crew;
  const crewResults = {};

  for (let id of crewIds) {
    let crew = credits.entities.crew[id];
    let department = crew.department;
    
    if (!department) continue;

    department = department.toLowerCase();

    if (crewResults[department]) {
      crewResults[department].push(id);
    } else {
      crewResults[department] = [id];
    }
  }

  return Object.assign({}, {
    entities: credits.entities,
    result: Object.assign({
      id: credits.result.id,
      cast: credits.result.cast,
    }, crewResults)
  });
};