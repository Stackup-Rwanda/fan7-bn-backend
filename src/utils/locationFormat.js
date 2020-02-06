
/** Formating location inputs to be used for search */
export default class LocationFormat {

  static location(location) {
    const lowerCaseLocation = location.toLowerCase();
    let newloc = lowerCaseLocation.split(',');
    newloc = newloc.map(obj => obj.replace(/(^\ *)|(\ *$)/g, '').replace(/ +/g, ' '));
    const newLocation = {
      country: newloc[0][0].toUpperCase() + newloc[0].substring(1),
      city: newloc[1][0].toUpperCase() + newloc[1].substring(1),
    };

    return newLocation;
  }
}
